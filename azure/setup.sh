#!/usr/bin/env bash
# Erstellt die Laufzeitumgebung auf Azure (einmalig, z.B. in der Azure Cloud Shell):
#   bash azure/setup.sh
# Ergebnis: Web App (Node 22) + PostgreSQL-Datenbank, Verbindung über App Settings.
set -euo pipefail

RG=razayou-lb324-rg
LOC=switzerlandnorth
PLAN=razayou-plan
APP=razayou-notizen
DB=razayou-db
DBNAME=notizen
DBUSER=notizenadmin
# Zufälliges Passwort: wird nur in den App Settings gespeichert, nie im Code
DBPASS="$(openssl rand -hex 16)Aa1!"

echo "1/5 Ressourcengruppe"
az group create -n "$RG" -l "$LOC" -o none

echo "2/5 App Service Plan + Web App (Node 22)"
az appservice plan create -g "$RG" -n "$PLAN" --is-linux --sku F1 -o none
az webapp create -g "$RG" -p "$PLAN" -n "$APP" --runtime "NODE:22-lts" -o none
az webapp config set -g "$RG" -n "$APP" --startup-file "node server/index.js" -o none

echo "3/5 PostgreSQL (dauert ca. 5-10 Minuten)"
az postgres flexible-server create -g "$RG" -n "$DB" -l "$LOC" \
  --tier Burstable --sku-name Standard_B1ms --storage-size 32 --version 16 \
  --admin-user "$DBUSER" --admin-password "$DBPASS" \
  --public-access 0.0.0.0 --yes -o none
az postgres flexible-server db create -g "$RG" -s "$DB" -d "$DBNAME" -o none

echo "4/5 Verbindung als App Settings (Geheimnisse) eintragen"
az webapp config appsettings set -g "$RG" -n "$APP" -o none --settings \
  DBHOST="$DB.postgres.database.azure.com:5432" DBNAME="$DBNAME" \
  DBUSER="$DBUSER" DBPASS="$DBPASS" DBSSL=require

echo "5/5 Publish-Profil für GitHub Actions erlauben"
SUB=$(az account show --query id -o tsv)
az resource update -o none --set properties.allow=true \
  --ids "/subscriptions/$SUB/resourceGroups/$RG/providers/Microsoft.Web/sites/$APP/basicPublishingCredentialsPolicies/scm"

echo "Fertig"
echo "URL: https://$(az webapp show -g "$RG" -n "$APP" --query defaultHostName -o tsv)"

#!/usr/bin/env bash
# Erstellt die Laufzeitumgebung auf Azure (Infrastruktur als Code).
# Ausführen in der Azure Cloud Shell:  bash azure/setup.sh
# Das Skript ist wiederholbar: bestehende Ressourcen werden aktualisiert.
set -euo pipefail

RG=razayou-lb324-rg
LOC=switzerlandnorth
PLAN=razayou-plan
APP=razayou-notizen
DB=razayou-db
DBNAME=notizen
DBUSER=notizenadmin
# Zufälliges Passwort: landet nur in den App Settings, nie im Code
DBPASS="$(openssl rand -hex 16)Aa1!"

echo "1/5 Ressourcengruppe"
az group create -n "$RG" -l "$LOC" -o none

echo "2/5 App Service (Linux, Python 3.12, gunicorn)"
az appservice plan create -g "$RG" -n "$PLAN" --is-linux --sku F1 -o none
az webapp create -g "$RG" -p "$PLAN" -n "$APP" --runtime "PYTHON:3.12" -o none
az webapp config set -g "$RG" -n "$APP" --linux-fx-version "PYTHON|3.12" \
  --startup-file "gunicorn --bind=0.0.0.0 --timeout 600 main:app" -o none

echo "3/5 PostgreSQL Flexible Server (beim ersten Mal 5-10 Minuten)"
az provider register --namespace Microsoft.DBforPostgreSQL --wait
if ! az postgres flexible-server show -g "$RG" -n "$DB" -o none 2>/dev/null; then
  az postgres flexible-server create -g "$RG" -n "$DB" -l "$LOC" \
    --tier Burstable --sku-name Standard_B1ms --storage-size 32 --version 16 \
    --admin-user "$DBUSER" --admin-password "$DBPASS" --public-access 0.0.0.0 --yes -o none
fi
az postgres flexible-server update -g "$RG" -n "$DB" --admin-password "$DBPASS" -o none
az postgres flexible-server db create -g "$RG" -s "$DB" -n "$DBNAME" -o none

echo "4/5 Geheimnisse als App Settings"
az webapp config appsettings set -g "$RG" -n "$APP" -o none --settings \
  DBHOST="$DB.postgres.database.azure.com:5432" DBNAME="$DBNAME" \
  DBUSER="$DBUSER" DBPASS="$DBPASS" DBSSL=require SCM_DO_BUILD_DURING_DEPLOYMENT=true

echo "5/5 Publish-Profil für GitHub Actions erlauben"
SUB=$(az account show --query id -o tsv)
az resource update -o none --set properties.allow=true --ids \
  "/subscriptions/$SUB/resourceGroups/$RG/providers/Microsoft.Web/sites/$APP/basicPublishingCredentialsPolicies/scm"

echo "Fertig: https://$(az webapp show -g "$RG" -n "$APP" --query defaultHostName -o tsv)"

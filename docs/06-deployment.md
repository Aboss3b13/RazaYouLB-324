# Automatisches Deployment

## Wie funktioniert es? (Erklärung)

Ein automatisierter Deploymentprozess bringt die Anwendung **ohne manuelle Schritte**
zum Benutzer. Sobald eine neue Version (Tag) erstellt wird und alle Tests grün sind,
wird die App gebaut und auf Azure geladen. Niemand muss Dateien von Hand kopieren.

```
git tag v2.0.0 → Tests mit PostgreSQL → ✅ → Build → Azure Web App → Health-Check → Live
                                        └→ Release (ZIP) + Docker-Image (ghcr.io)
```

## Laufzeitumgebung auf Azure (Infrastruktur als Code)

Datei: `azure/setup.sh` – einmalig in der Azure Cloud Shell ausführen:

```bash
bash azure/setup.sh
```

Das Skript erstellt:

| Ressource | Name | Zweck |
| --- | --- | --- |
| Ressourcengruppe | `razayou-lb324-rg` | Ordner für alles |
| App Service Plan | `razayou-plan` (Linux, F1) | Server |
| Web App | `razayou-notizen` (Node 22) | Unsere App |
| PostgreSQL Flexible Server | `razayou-db` | Datenbank `notizen` |

Die Zugangsdaten zur Datenbank werden als **App Settings** gespeichert
(`DBHOST`, `DBNAME`, `DBUSER`, `DBPASS`, `DBSSL`). Das Passwort wird zufällig erzeugt
und steht **nie** im Code. Lokal kommen dieselben Werte aus der `.env`.

URL: https://razayou-notizen.azurewebsites.net

## Automatische Auslieferung

Datei: `.github/workflows/azure-deploy.yml`

1. Startet bei jedem Tag `v*`
2. Job **test**: alle Tests gegen eine echte PostgreSQL-Datenbank
3. Job **deploy** (nur wenn test grün): Build, nur Laufzeit-Abhängigkeiten, Upload auf Azure
4. **Health-Check**: ruft `/api/health` auf, bis die App antwortet

**Einmalig einrichten:** Azure Portal → Web App → *Download publish profile* →
GitHub → *Settings* → *Secrets and variables* → *Actions* → neues Secret
`AZURE_WEBAPP_PUBLISH_PROFILE` mit dem Inhalt der Datei.

## Release und Docker

Datei: `.github/workflows/release.yml` (ebenfalls bei Tag `v*`):

- ZIP der gebauten App im GitHub Release
- Docker-Image (Node + App) in `ghcr.io` (GitHub Packages)

Lokal testen:

```bash
docker compose up --build
```

→ http://localhost:3000

# Automatisierte Auslieferung auf Azure

## Erklärung (Beginner)

Ein automatisierter Deploymentprozess bringt jede neue Version ohne Handarbeit auf den Server:
Sobald eine Version etikettiert wird (`git tag v2.0.0`), werden die Tests ausgeführt.
Nur wenn sie grün sind, wird der Code auf Azure geladen, dort installiert und gestartet.
Zum Schluss prüft ein Health-Check, ob die App wirklich antwortet.

```
git push origin v2.0.0
  └─ azure.yml:  test (pytest gegen PostgreSQL) ──✅──> deploy (Azure) ──> Health-Check /health
  └─ release.yml: Release (Quellcode + .exe) + Docker-Image (ghcr.io)
```

## Laufzeitumgebung: Installation und Konfiguration (Advanced)

`azure/setup.sh` erstellt und konfiguriert alles per Azure CLI (Infrastruktur als Code,
wiederholbar). Ausführen in der Azure Cloud Shell: `bash azure/setup.sh`

| Ressource | Name | Konfiguration |
| --- | --- | --- |
| Ressourcengruppe | `razayou-lb324-rg` | Switzerland North |
| App Service Plan | `razayou-plan` | Linux, F1 |
| Web App | `razayou-notizen` | Python 3.12, Start: `gunicorn … main:app` |
| PostgreSQL | `razayou-db` | Flexible Server, Datenbank `notizen` |
| App Settings | `DBHOST`, `DBNAME`, `DBUSER`, `DBPASS`, `DBSSL` | Geheimnisse, zufälliges Passwort |

Beim Deployment installiert Azure (Oryx) die `requirements.txt` automatisch
(`SCM_DO_BUILD_DURING_DEPLOYMENT=true`). Lokal kommen dieselben Werte aus der `.env`.

## Workflow (LZ 5.1)

Datei `.github/workflows/azure.yml`:

1. Auslöser: neue Etikette `v*` (oder manuell)
2. Job **test**: pytest gegen PostgreSQL
3. Job **deploy** (nur nach grünem test): `azure/webapps-deploy` mit dem Secret
   `AZURE_WEBAPP_PUBLISH_PROFILE`
4. **Health-Check**: `curl https://razayou-notizen.azurewebsites.net/health`

Einmalig: Azure Portal → `razayou-notizen` → *Download publish profile* →
GitHub → *Settings → Secrets and variables → Actions* → `AZURE_WEBAPP_PUBLISH_PROFILE`.

## Weitere Auslieferungsarten

- **Docker**: `docker run -p 8000:8000 ghcr.io/aboss3b13/razayoulb-324:latest`
- **Windows-Exe**: `notizen.exe` aus dem Release
- **Lokal mit Datenbank**: `docker compose up --build`

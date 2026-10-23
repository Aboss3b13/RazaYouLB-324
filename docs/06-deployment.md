# Automatisches Deployment

## Wie funktioniert es? (Erklärung)

Ein automatisierter Deploymentprozess bringt die Anwendung **ohne manuelle Schritte**
zum Benutzer. Sobald Code in `main` kommt und alle Tests grün sind, wird die App
gebaut und auf den Server geladen. Niemand muss Dateien von Hand kopieren.

```
Push auf main → CI (Lint, Test, Build) → ✅ → Deploy auf GitHub Pages → Live
```

## Deployment 1: GitHub Pages (Website)

Datei: `.github/workflows/deploy.yml`

- Startet automatisch, wenn der **CI-Workflow auf `main` erfolgreich** war.
- Baut die App und lädt `dist/` auf GitHub Pages.
- URL: https://aboss3b13.github.io/RazaYouLB-324/

**Einmalig einrichten:** GitHub → *Settings* → *Pages* → *Source*: **GitHub Actions**.

## Deployment 2: Docker (Laufzeitumgebung)

Datei: `Dockerfile`, `.github/workflows/release.yml`

- Bei einem Tag `v*` wird ein Docker-Image (nginx + App) gebaut und in `ghcr.io` veröffentlicht.
- Die Laufzeitumgebung (Webserver nginx) wird dabei automatisch mit installiert und konfiguriert.

Lokal testen:

```bash
docker build -t notizen-app .
docker run -p 8080:80 notizen-app
```

→ http://localhost:8080

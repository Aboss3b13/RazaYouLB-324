# Notizen-App – LB M324

[![CI](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/ci.yml/badge.svg)](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/ci.yml)
[![Deploy Azure](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/azure-deploy.yml/badge.svg)](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/azure-deploy.yml)
![Node](https://img.shields.io/badge/node-22-green)
![Datenbank](https://img.shields.io/badge/db-PostgreSQL-blue)

Einfache Notizen-App: Notizen erstellen, bearbeiten, löschen und suchen.
Die Notizen werden über eine REST-API in einer PostgreSQL-Datenbank gespeichert.

**Live (Azure):** https://razayou-notizen.azurewebsites.net

**Team:** Abbas Raza ([@Aboss3b13](https://github.com/Aboss3b13)) & Yucan You ([@mikepro100223](https://github.com/mikepro100223))

## Schnellstart

```bash
npm install
npm run server   # API auf :3000
npm run dev      # Oberfläche auf :5173
```

Oder alles inkl. Datenbank: `docker compose up --build` → http://localhost:3000

## Technik

HTML, CSS, JavaScript · Vite · Express · PostgreSQL · Vitest + Supertest + jsdom ·
ESLint · Git Hooks · GitHub Actions · Docker · Azure App Service

```
Browser ──fetch──> Express (server/app.js) ──> Speicher (server/store.js) ──> PostgreSQL
```

## Dokumentation (Bewertungsraster)

| Kompetenz | Thema | Dokument |
| --- | --- | --- |
| – | Glossar | [00-glossar.md](docs/00-glossar.md) |
| A1 | DevOps, Anforderungen, RMP, Tool-Vergleich | [01-devops.md](docs/01-devops.md), [02-anforderungen.md](docs/02-anforderungen.md) |
| B1 | Entwicklungsumgebung, Git Hooks | [03-entwicklungsumgebung.md](docs/03-entwicklungsumgebung.md) |
| C1 | Git-Workflow, Versionierung, Artefakte | [04-git-workflow.md](docs/04-git-workflow.md) |
| D1 | Tests und CI | [05-ci-tests.md](docs/05-ci-tests.md) |
| E1 | Automatisches Deployment (Azure) | [06-deployment.md](docs/06-deployment.md) |

## Projektstruktur

```
src/                Oberfläche (main.js = UI, storage.js = API-Aufrufe, notes.js = Suche)
server/             REST-API (app.js), Speicher (store.js), Start (index.js)
tests/              Unit-, Datenbank- und Integrationstests
docs/               Dokumentation
azure/setup.sh      Azure-Ressourcen erstellen (Infrastruktur als Code)
.github/            Workflows, Issue- und PR-Vorlagen
.githooks/          Git Hooks (pre-commit, commit-msg)
.devcontainer/      Dev Container
Dockerfile          Docker-Image
docker-compose.yml  App + PostgreSQL lokal
```

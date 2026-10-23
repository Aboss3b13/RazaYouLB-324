# Notizen-App – LB M324

[![CI](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/ci.yml/badge.svg)](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/ci.yml)
[![Deploy](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/deploy.yml/badge.svg)](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/deploy.yml)

Einfache Notizen-App: Notizen erstellen, bearbeiten, löschen und suchen.
Die Notizen werden im Browser (`localStorage`) gespeichert.

**Live:** https://aboss3b13.github.io/RazaYouLB-324/

**Team:** Abbas Raza, Y. You

## Schnellstart

```bash
npm install
npm run dev
```

## Technik

HTML, CSS, JavaScript · Vite (Build) · Vitest + jsdom (Tests) · ESLint ·
GitHub Actions (CI/CD) · GitHub Pages · Docker

## Dokumentation (Bewertungsraster)

| Kompetenz | Thema | Dokument |
| --- | --- | --- |
| A1 | DevOps, Anforderungen, Tool-Vergleich | [01-devops.md](docs/01-devops.md), [02-anforderungen.md](docs/02-anforderungen.md) |
| B1 | Entwicklungsumgebung | [03-entwicklungsumgebung.md](docs/03-entwicklungsumgebung.md) |
| C1 | Git-Workflow, Artefakte | [04-git-workflow.md](docs/04-git-workflow.md) |
| D1 | Tests und CI | [05-ci-tests.md](docs/05-ci-tests.md) |
| E1 | Automatisches Deployment | [06-deployment.md](docs/06-deployment.md) |

## Projektstruktur

```
src/            App (notes.js = Logik, storage.js = Speicher, main.js = UI)
tests/          Unit- und Integrationstests
docs/           Dokumentation
.github/        Workflows, Issue- und PR-Vorlagen
.devcontainer/  Dev Container
Dockerfile      Docker-Image (nginx)
```

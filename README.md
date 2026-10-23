# Notizen-App – LB M324

[![CI](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/ci.yml/badge.svg)](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/ci.yml)
[![Deploy Azure](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/azure.yml/badge.svg)](https://github.com/Aboss3b13/RazaYouLB-324/actions/workflows/azure.yml)
![Python](https://img.shields.io/badge/python-3.12-blue)
![Datenbank](https://img.shields.io/badge/db-PostgreSQL-336791)

Einfache Notizen-App: Notizen erstellen, bearbeiten, löschen, suchen und als CSV herunterladen.
Gespeichert wird in einer Datenbank (lokal SQLite, auf Azure PostgreSQL).

**Live:** https://razayou-notizen.azurewebsites.net

**Team:** Abbas Raza ([@Aboss3b13](https://github.com/Aboss3b13)) und Yucan You ([@mikepro100223](https://github.com/mikepro100223))

## Schnellstart

```bash
py -3.12 -m venv .venv
.venv\Scripts\activate
pip install -r requirements-dev.txt
pre-commit install
python main.py            # http://localhost:5000
pytest                    # Tests
```

Mit PostgreSQL: `docker compose up --build` → http://localhost:8000

## Technik

Python 3.12 · Flask · SQLAlchemy · PostgreSQL · pytest · black · flake8 · pre-commit ·
GitHub Actions · Docker / GitHub Packages · PyInstaller · Azure App Service

## Ablauf (CI/CD)

```
Issue -> Branch -> Commit (pre-commit: black, flake8, pytest, #Issue)
      -> Pull Request (CI: black, flake8, pytest gegen PostgreSQL) -> Review -> main
      -> Tag vX.Y.Z -> Release (Quellcode + .exe) + Docker-Image (ghcr.io)
                    -> Tests -> Deploy auf Azure -> Health-Check
```

## Dokumentation zum Bewertungsraster

| Kompetenz | Thema | Dokument |
| --- | --- | --- |
| A1 | DevOps, Glossar | [01-devops-glossar.md](docs/01-devops-glossar.md) |
| A1 | Anforderungen, RMP, Werkzeug-Vergleich | [02-anforderungen.md](docs/02-anforderungen.md) |
| B1 | Entwicklungsumgebung | [03-entwicklungsumgebung.md](docs/03-entwicklungsumgebung.md) |
| C1 | Git-Workflow, Versionierung, Artefakte | [04-git-und-artefakte.md](docs/04-git-und-artefakte.md) |
| D1 | Tests und automatisierte Integration | [05-ci.md](docs/05-ci.md) |
| E1 | Automatisierte Auslieferung (Azure) | [06-deployment.md](docs/06-deployment.md) |

## Projektstruktur

```
main.py             Controller (Flask-Routen)
helper.py           Model + Logik (SQLAlchemy)
database.py         Datenbank-Objekt
templates/ static/  Oberfläche
tests/              Komponenten- und Integrationstests
azure/setup.sh      Azure-Ressourcen erstellen (Infrastruktur als Code)
.github/            Workflows, Issue- und PR-Vorlagen
docs/               Dokumentation
```

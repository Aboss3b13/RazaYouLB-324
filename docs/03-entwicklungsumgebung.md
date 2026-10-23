# Entwicklungsumgebung

## Möglichkeiten (LZ 2.1)

| Variante | Wann sinnvoll |
| --- | --- |
| Lokal (Python + venv) | schnell, für die tägliche Arbeit |
| Docker Compose (App + PostgreSQL) | gleiche Datenbank wie auf Azure |
| Dev Container / Codespaces | ganze Umgebung für alle gleich, ohne Installation |

## Anleitung lokal (LZ 2.2)

1. Python 3.12, Git und VS Code installieren.
2. Repository holen und Umgebung einrichten:
   ```bash
   git clone https://github.com/Aboss3b13/RazaYouLB-324.git
   cd RazaYouLB-324
   py -3.12 -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements-dev.txt
   pre-commit install
   ```
3. Optional `.env.example` nach `.env` kopieren (PostgreSQL). Ohne `.env` → SQLite.
4. Starten: `python main.py` oder in VS Code **F5** („Flask starten“).
5. Tests: `pytest` oder im Test-Explorer von VS Code.

## Selbst erweitert (Advanced)

| Datei | Zweck |
| --- | --- |
| `.vscode/extensions.json` | empfohlene Extensions (Python, black, flake8, Actions, Docker, Azure) |
| `.vscode/settings.json` | venv, pytest, Formatieren beim Speichern mit black |
| `.vscode/launch.json` | Flask mit Debugger starten |
| `.devcontainer/devcontainer.json` | fertige Umgebung inkl. `pre-commit install` |
| `docker-compose.yml` | App + PostgreSQL lokal |
| `.pre-commit-config.yaml` | Hooks: black, flake8, pytest, Issue-Nummer |
| `.editorconfig`, `.flake8`, `pyproject.toml` | gleiche Formatierung für alle |
| `.env.example` | Vorlage für Geheimnisse (`.env` ist in `.gitignore`) |

## pre-commit Hooks

| Hook | Prüft |
| --- | --- |
| `black` | Formatierung (korrigiert automatisch) |
| `flake8` | Code-Qualität |
| `pytest` | alle Tests müssen grün sein |
| `needs-issue` (commit-msg) | Commit-Message enthält `#<Issue>` |
| `end-of-file-fixer`, `trailing-whitespace`, `mixed-line-ending` | saubere Dateien |

**Grenze:** Hooks laufen nur lokal und lassen sich mit `git commit --no-verify` umgehen.
Darum laufen dieselben Prüfungen nochmals in der CI auf GitHub (siehe [CI](05-ci.md)).

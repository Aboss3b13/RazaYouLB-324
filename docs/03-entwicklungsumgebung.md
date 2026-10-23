# Entwicklungsumgebung

## Möglichkeiten

- **Lokal installiert:** Node.js + Editor direkt auf dem PC.
- **Docker Compose:** App + PostgreSQL mit einem Befehl (`docker-compose.yml`).
- **Dev Container:** Docker-Container mit allen Tools (`.devcontainer/`).
- **Cloud:** GitHub Codespaces (nutzt den gleichen Dev Container).

## Anleitung (lokal)

1. [Node.js 22](https://nodejs.org) und [Git](https://git-scm.com) installieren.
2. [VS Code](https://code.visualstudio.com) installieren.
3. Repository klonen:
   ```bash
   git clone https://github.com/Aboss3b13/RazaYouLB-324.git
   cd RazaYouLB-324
   ```
4. Abhängigkeiten installieren: `npm install` (aktiviert auch die Git Hooks)
5. Optional Datenbank: `.env.example` nach `.env` kopieren und anpassen.
   Ohne `.env` speichert der Server nur im Arbeitsspeicher.
6. Zwei Terminals:
   - `npm run server` → API auf http://localhost:3000
   - `npm run dev` → Oberfläche auf http://localhost:5173 (leitet `/api` an den Server weiter)

## Anleitung (Docker Compose)

```bash
docker compose up --build
```

→ http://localhost:3000 (App + PostgreSQL, Daten bleiben im Volume `db-data`)

## Anleitung (Dev Container)

1. Docker Desktop und die VS Code Extension *Dev Containers* installieren.
2. Projekt in VS Code öffnen → *Reopen in Container*.
3. `npm install` läuft automatisch.

## Integration der Tools

| Datei | Zweck |
| --- | --- |
| `.vscode/extensions.json` | Empfohlene Extensions (ESLint, Vitest, GitHub Actions, Docker) |
| `.vscode/settings.json` | Formatieren und ESLint-Fix beim Speichern |
| `.editorconfig` | Gleiche Einrückung / Zeilenenden für alle |
| `.devcontainer/devcontainer.json` | Gleiche Umgebung für alle im Team |
| `eslint.config.js` | Code-Qualität prüfen |
| `.githooks/` | Git Hooks: Lint + Tests vor jedem Commit, Issue-Nummer in der Commit-Message |
| `.env.example` | Vorlage für Geheimnisse (die echte `.env` ist in `.gitignore`) |

## Git Hooks (Auftrag 1620)

`npm install` führt das Skript `prepare` aus und setzt `git config core.hooksPath .githooks`.

| Hook | Was passiert |
| --- | --- |
| `pre-commit` | `npm run lint` und `npm test` – Commit nur, wenn alles grün ist |
| `commit-msg` | Commit-Message muss ein Issue nennen, z.B. `#6` |

**Grenze:** Hooks laufen nur lokal und lassen sich mit `git commit --no-verify` umgehen.
Darum laufen dieselben Prüfungen zusätzlich in der CI auf GitHub (siehe [CI und Tests](05-ci-tests.md)).

## Wichtige Befehle

| Befehl | Was passiert |
| --- | --- |
| `npm run dev` | Oberfläche (Vite) starten |
| `npm run server` | API-Server mit Auto-Neustart starten |
| `npm start` | Produktionsserver (liefert auch `dist/` aus) |
| `npm test` | Alle Tests ausführen |
| `npm run coverage` | Tests mit Testabdeckung |
| `npm run lint` | Code prüfen |
| `npm run build` | Produktions-Build in `dist/` |

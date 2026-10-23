# Entwicklungsumgebung

## Möglichkeiten

- **Lokal installiert:** Node.js + Editor direkt auf dem PC.
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
4. Abhängigkeiten installieren: `npm install`
5. VS Code öffnen (`code .`) und die empfohlenen Extensions installieren.
6. App starten: `npm run dev` → http://localhost:5173

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

## Wichtige Befehle

| Befehl | Was passiert |
| --- | --- |
| `npm run dev` | Entwicklungsserver starten |
| `npm test` | Alle Tests ausführen |
| `npm run test:watch` | Tests bei jeder Änderung neu ausführen |
| `npm run lint` | Code prüfen |
| `npm run build` | Produktions-Build in `dist/` |

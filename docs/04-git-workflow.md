# Versionierung und Git-Workflow

## Werkzeuge der Versionierung

| Werkzeug | Art | Kurz |
| --- | --- | --- |
| **Git** | verteilt | Standard heute, jeder hat das ganze Repository |
| **SVN** | zentral | ein zentraler Server, älter |
| **Mercurial** | verteilt | ähnlich wie Git, weniger verbreitet |

Plattformen für Git: **GitHub**, GitLab, Bitbucket, Azure Repos.

## Grundbefehle

| Befehl | Was passiert |
| --- | --- |
| `git status` / `git status -s` | Zeigt geänderte Dateien |
| `git add datei` | Datei in die Staging Area |
| `git commit -m "..."` | Staging Area als Commit ins Repository |
| `git commit -am "..."` | Alle geänderten (bekannten) Dateien direkt committen |
| `git push` / `git pull` | Mit GitHub abgleichen |

## Unser Workflow (GitHub Flow)

Wir arbeiten zu zweit: **Abbas Raza** (`Aboss3b13`, Besitzer) und **Yucan You** (`mikepro100223`, Collaborator).

1. Issue auswählen oder erstellen (z.B. #6).
2. Branch mit Issue-Nummer erstellen:
   ```bash
   git checkout main
   git pull
   git checkout -b feature/6-datenbank
   ```
3. Zuerst den Test, dann den Code schreiben. Kleine Commits mit Issue-Nummer:
   ```bash
   git commit -m "REST-API mit PostgreSQL #6"
   ```
   Der `pre-commit`-Hook prüft Lint und Tests, der `commit-msg`-Hook die Issue-Nummer.
4. Branch pushen: `git push -u origin feature/6-datenbank`
5. **Pull Request** auf GitHub erstellen (`Closes #6`).
6. CI läuft automatisch → muss grün sein.
7. Die **andere Person** macht das Review (kommentieren, gutheissen).
8. **Merge pull request** in `main`, Branch wird automatisch gelöscht.

Bauen PRs aufeinander auf (z.B. #6 braucht die Hooks aus #8), zeigt der zweite PR auf den
Branch des ersten (*gestapelte PRs*). Nach dem Merge stellt GitHub die Basis automatisch auf `main` um.

### Einstellungen im Repository (Auftrag 2031)

- Issues aktiviert
- Pull Requests: *Merge commits* erlaubt (für gestapelte PRs), *Automatically delete head branches*
- Branch-Schutz für `main`: *Require a pull request before merging*, *Do not allow bypassing*,
  Status-Check **CI** muss grün sein

### Merge-Konflikte

Wenn zwei PRs dieselbe Stelle ändern, zeigt GitHub einen Konflikt. Lösen:
im Browser mit *Resolve conflicts* oder lokal:

```bash
git checkout feature/x
git pull --rebase origin main
# Konflikt in der Datei bereinigen, dann:
git add datei
git rebase --continue
git push --force-with-lease
```

## Semantische Versionierung

Versionen heissen `vMAJOR.MINOR.PATCH`:

- **MAJOR** – inkompatible Änderung (z.B. `v2.0.0`: Umstieg auf Server + Datenbank)
- **MINOR** – neue Funktion, kompatibel
- **PATCH** – Fehlerbehebung

## Artefaktverwaltung

Ein **Artefakt** ist das Ergebnis vom Build.

| Artefakt | Wo | Wann |
| --- | --- | --- |
| `dist/` als Build-Artefakt | GitHub Actions (Tab *Actions*) | bei jedem CI-Lauf |
| ZIP-Datei | GitHub **Releases** | bei jedem Tag `v*` |
| Docker-Image | GitHub **Packages** (`ghcr.io`) | bei jedem Tag `v*` |
| Laufende App | **Azure** Web App | bei jedem Tag `v*` |

Neue Version erstellen:

```bash
git tag -a v2.0.0 -m "Server und Datenbank"
git push origin v2.0.0
```

Das Docker-Image starten:

```bash
docker run -p 3000:3000 ghcr.io/aboss3b13/razayoulb-324:latest
```

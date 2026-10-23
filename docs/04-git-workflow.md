# Versionierung und Git-Workflow

## Werkzeuge der Versionierung

| Werkzeug | Art | Kurz |
| --- | --- | --- |
| **Git** | verteilt | Standard heute, jeder hat das ganze Repository |
| **SVN** | zentral | ein zentraler Server, älter |
| **Mercurial** | verteilt | ähnlich wie Git, weniger verbreitet |

Plattformen für Git: **GitHub**, GitLab, Bitbucket.

## Unser Workflow (Feature-Branch)

1. Issue / User Story auswählen (z.B. US-03).
2. Neuen Branch erstellen:
   ```bash
   git checkout main
   git pull
   git checkout -b feature/us-03-bearbeiten
   ```
3. Code + Test schreiben, kleine Commits machen:
   ```bash
   git commit -m "US-03: Notiz bearbeiten"
   ```
4. Branch pushen: `git push -u origin feature/us-03-bearbeiten`
5. **Pull Request** auf GitHub erstellen (`Closes #<Issue>`).
6. CI läuft automatisch → muss grün sein.
7. Teampartner macht ein **Review**.
8. Merge in `main` → automatisches Deployment.

## Commit-Regeln

- Kurz und klar, auf Deutsch.
- Mit ID der User Story, wenn möglich: `US-05: Suche`.

## Artefaktverwaltung

Ein **Artefakt** ist das Ergebnis vom Build (z.B. `dist/`-Ordner, ZIP, Docker-Image).

| Artefakt | Wo | Wann |
| --- | --- | --- |
| `dist/` als Build-Artefakt | GitHub Actions (Tab *Actions*) | bei jedem CI-Lauf |
| ZIP-Datei | GitHub **Releases** | bei jedem Tag `v*` |
| Docker-Image | GitHub **Packages** (`ghcr.io`) | bei jedem Tag `v*` |

Neue Version erstellen:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Das Docker-Image kann dann so gestartet werden:

```bash
docker run -p 8080:80 ghcr.io/aboss3b13/razayoulb-324:latest
```

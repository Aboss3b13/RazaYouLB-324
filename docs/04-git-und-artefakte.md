# Versionierung, Workflow und Artefakte

## Werkzeuge der Versionierung (LZ 3.1)

| Werkzeug | Art | Bemerkung |
| --- | --- | --- |
| Git | verteilt | Standard, jeder hat die ganze Geschichte |
| SVN | zentral | älter, ein Server |
| Mercurial | verteilt | ähnlich Git, selten |

Plattformen: GitHub (bei uns), GitLab, Bitbucket, Azure Repos.

Grundbefehle: `git status`, `git add`, `git commit -m "… #12"`, `git push`, `git pull`.

## Unser Arbeitsablauf: GitHub Flow (LZ 3.2, 3.3)

Wir arbeiten zu zweit: **Abbas Raza** (Besitzer) und **Yucan You** (Collaborator).

1. **Issue** wählen, z.B. #16.
2. **Branch** erstellen: `git checkout -b feature/16-csv`
3. Erst **Test**, dann Code. Kleine **Commits** mit Issue-Nummer:
   `git commit -m "CSV-Download #16"` (pre-commit prüft black, flake8, pytest, #).
4. **Push**: `git push -u origin feature/16-csv`
5. **Pull Request** mit `Closes #16` → CI läuft automatisch.
6. Die **andere Person reviewt** (kommentiert, genehmigt).
7. **Merge** in `main`, Branch wird gelöscht.

Repository-Einstellungen: `main` geschützt (*Require a pull request*, CI muss grün sein),
*Automatically delete head branches*.

**Merge-Konflikt:** Ändern zwei Branches dieselbe Zeile, zeigt GitHub einen Konflikt.
Lösen im Browser (*Resolve conflicts*) oder lokal mit `git pull origin main`,
Datei bereinigen, `git add`, `git commit`, `git push`.

## Semantische Versionierung

`vMAJOR.MINOR.PATCH` – z.B. `v2.0.0`: MAJOR = nicht kompatibel, MINOR = neue Funktion, PATCH = Fehlerbehebung.

```bash
git tag -a v2.0.0 -m "Notizen mit Datenbank auf Azure"
git push origin v2.0.0
```

## Artefaktverwaltung (LZ 3.4)

Bei jeder Etikette `v*` erstellt `.github/workflows/release.yml` automatisch:

| Artefakt | Ablage | Herunterladen / Starten |
| --- | --- | --- |
| Quellcode (zip/tar.gz) | GitHub **Releases** | Release-Seite |
| `notizen.exe` (PyInstaller, Windows) | GitHub **Releases** | Doppelklick → http://localhost:5000 |
| Docker-Image | GitHub **Packages** (`ghcr.io`) | `docker run -p 8000:8000 ghcr.io/aboss3b13/razayoulb-324:latest` |

Die Artefakte tragen dieselbe Version wie der Tag → jede Version ist eindeutig dem Quellcode zugeordnet.

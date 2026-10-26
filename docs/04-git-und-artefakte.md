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

### So ist es tatsächlich gelaufen

| Phase | Ablauf | Nachweis |
| --- | --- | --- |
| Aufbau (v2.0.0) | Feature-Branches mit Issue-Nummer, **lokal** mit `--no-ff` in `main` gemerged (noch ohne PR) | Merge-Commits `Merge feature/… #<Issue>` |
| Erster Entwurf | JavaScript-Version, verworfen und durch Flask ersetzt | PRs #11–#15, Titel „[Verworfen] …“ |
| Ab v2.1.0 | Jede Änderung als **Pull Request**, CI grün, **Review durch den Partner**, dann Merge | PR #17 (Review + Merge durch Yucan), PR für #18 |

Den Branch-Schutz für `main` (*Require a pull request*, *Require approvals*, Status-Check **CI**)
richtet der Besitzer unter *Settings → Branches* ein. Bis dahin ist der Ablauf eine Team-Regel,
die wir seit PR #17 einhalten.

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

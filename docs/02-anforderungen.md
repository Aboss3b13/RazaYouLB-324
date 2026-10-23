# Anforderungen verwalten

## Grundbegriffe (LZ 1.3)

- **Anforderung**: was das System können muss – bei uns als **User Story**.
- **Akzeptanzkriterien**: wann die Anforderung erfüllt ist.
- **Backlog**: alle offenen Anforderungen.
- **Meilenstein**: Version, in der Anforderungen umgesetzt werden (`v2.0.0`).
- **Rückverfolgbarkeit**: jede Anforderung ist mit Code und Test verknüpft.

## Werkzeug: GitHub Issues (LZ 1.4)

### Unser RMP (Requirements Management Plan)

1. Neue Anforderung über die Vorlage **User story**, Fehler über **Bug report**
   (`.github/ISSUE_TEMPLATE/`). Die Vorlage setzt automatisch `type: …` und `status: new issue`.
2. Der Product Manager prüft neue Issues (`status: new issue`) und weist eine Person zu
   → Workflow `remove-new-issue-label.yml` entfernt `status: new issue`.
3. Issue wird einem **Meilenstein** zugeordnet
   → Workflow `add-in-progress-label.yml` setzt `status: in progress`.
4. Umsetzung im Branch `feature/<issue>-<name>`, Pull Request mit `Closes #<issue>`.
5. Beim Merge wird das Issue automatisch geschlossen.

| Label | Bedeutung |
| --- | --- |
| `status: new issue` | Neu, muss eingeordnet werden |
| `status: in progress` | Wird bearbeitet |
| `status: backlog` | Später |
| `type: user story` | Neue Anforderung |
| `type: bug` | Fehler |
| `type: epic` | Fasst mehrere User Stories zusammen |
| `good first issue` | Gut für Neue |

### User Stories

| ID | Issue | User Story | Testfälle |
| --- | --- | --- | --- |
| US-01 | #1 | Als Benutzer möchte ich eine Notiz mit Titel und Text erstellen, damit ich Ideen festhalte. | `test_add_us01`, `test_create_and_show_us01` |
| US-02 | #2 | Als Benutzer möchte ich, dass Notizen gespeichert bleiben, damit sie nach dem Neuladen noch da sind. | `test_saved_in_database_us02` |
| US-03 | #3 | Als Benutzer möchte ich eine Notiz bearbeiten, damit ich Fehler korrigieren kann. | `test_update_us03`, `test_edit_us03` |
| US-04 | #4 | Als Benutzer möchte ich eine Notiz löschen, damit die Liste übersichtlich bleibt. | `test_delete_us04` |
| US-05 | #5 | Als Benutzer möchte ich Notizen durchsuchen, damit ich sie schnell finde. | `test_search_us05` |
| US-06 | #6 | Als Benutzer möchte ich, dass Notizen in einer Datenbank liegen, damit ich sie überall sehe. | alle Tests laufen in der CI gegen PostgreSQL |
| US-07 | #9 | Als Team möchten wir jede Version automatisch auf Azure ausliefern. | Workflow `azure.yml` mit Health-Check |
| US-08 | #16 | Als Benutzer möchte ich meine Notizen als CSV herunterladen, damit ich sie weiterverwenden kann. | `test_csv_us08`, `test_download_csv_us08` |

## Nachvollziehbare Entwicklung (LZ 1.5, 1.6)

- **Issue ↔ Commit**: jede Commit-Message nennt das Issue (`#6`) – der pre-commit-Hook
  `needs-issue` lehnt Commits ohne Issue-Nummer ab.
- **Issue ↔ Pull Request**: `Closes #6` schliesst das Issue beim Merge automatisch.
- **Issue ↔ Test**: Testnamen enden mit der Story (`test_delete_us04`).
- **Issue ↔ Version**: Meilenstein `v2.0.0` = Tag `v2.0.0` = Release + Azure-Deployment.

## Vergleich von RM-Werkzeugen (LZ 1.7)

| Kriterium | GitHub Issues | Jira | Azure DevOps Boards |
| --- | --- | --- | --- |
| Kosten | gratis | gratis bis 10 User | gratis bis 5 User |
| Verknüpfung mit Code | direkt (Commits, PRs, `Closes #`) | über GitHub-App | über GitHub-App / Azure Repos |
| Akzeptanzkriterien | Text in der Vorlage | eigenes Feld | eigenes Feld |
| Planung (Sprints, Burndown) | einfach (Projects, Meilensteine) | sehr umfangreich | umfangreich |
| Automatisierung | GitHub Actions | Jira Automation | Azure Pipelines |
| Einarbeitung | einfach | aufwändig | mittel |

| GitHub | Jira | Azure DevOps |
| --- | --- | --- |
| Issue | Issue / Story | Work Item |
| Label | Label | Tag |
| Assignee | Assignee | Assigned To |
| Milestone | Fix Version / Sprint | Iteration |
| Acceptance criteria | Acceptance Criteria | Acceptance Criteria |

**Fazit:** Für ein kleines Team, dessen Code auf GitHub liegt, ist **GitHub Issues** am
tauglichsten: Anforderungen, Code, CI/CD und Releases sind am gleichen Ort verknüpft.
Jira lohnt sich bei grossen Teams mit komplexer Planung, Azure DevOps wenn alles bei Microsoft läuft.

# Anforderungen

## Begriffe

Siehe auch [Glossar](00-glossar.md).

| Begriff | Bedeutung |
| --- | --- |
| **Anforderung** | Was das System können muss. |
| **User Story** | Anforderung aus Sicht des Benutzers: *Als … möchte ich … damit …* |
| **Akzeptanzkriterien** | Bedingungen, wann eine Story erfüllt ist. |
| **Backlog** | Liste aller offenen Anforderungen. |
| **Issue** | Eine Aufgabe / Anforderung im Tool (z.B. GitHub Issue). |
| **Priorität** | Wie wichtig eine Anforderung ist. |
| **Rückverfolgbarkeit** | Verknüpfung von Anforderung → Code → Test. |

## User Stories

| ID | Issue | User Story | Test |
| --- | --- | --- | --- |
| US-01 | #1 | Als Benutzer möchte ich eine Notiz mit Titel und Text erstellen, damit ich Ideen festhalten kann. | `store.test.js`, `api.integration.test.js`, `app.integration.test.js` |
| US-02 | #2 | Als Benutzer möchte ich, dass meine Notizen gespeichert bleiben, damit sie nach dem Neuladen noch da sind. | `store.test.js` (PostgreSQL), `app.integration.test.js` |
| US-03 | #3 | Als Benutzer möchte ich eine Notiz bearbeiten, damit ich Fehler korrigieren kann. | `store.test.js`, `api.integration.test.js`, `app.integration.test.js` |
| US-04 | #4 | Als Benutzer möchte ich eine Notiz löschen, damit die Liste übersichtlich bleibt. | `store.test.js`, `api.integration.test.js`, `app.integration.test.js` |
| US-05 | #5 | Als Benutzer möchte ich Notizen durchsuchen, damit ich sie schnell finde. | `notes.test.js`, `app.integration.test.js` |
| US-06 | #6 | Als Benutzer möchte ich, dass meine Notizen in einer Datenbank gespeichert werden, damit ich sie auf jedem Gerät sehe. | `store.test.js`, `api.integration.test.js` |
| US-07 | #9 | Als Team möchten wir, dass jede neue Version automatisch auf Azure ausgeliefert wird. | Workflow `azure-deploy.yml` (Health-Check) |

## Unser RMP (Requirements Management Plan)

1. Neue Anforderung über die Vorlage **User story** erfassen (`.github/ISSUE_TEMPLATE/user-story.md`).
   Fehler über die Vorlage **Bug report**.
2. Die Vorlage setzt automatisch die Labels `type: user story` bzw. `type: bug` und `status: new issue`.
3. Wer das Issue übernimmt, trägt sich als **Assignee** ein → der Workflow
   `remove-new-issue-label.yml` entfernt `status: new issue`.
4. Das Issue wird einem **Meilenstein** (z.B. `v2.0.0`) zugeordnet → der Workflow
   `add-in-progress-label.yml` setzt `status: in progress`.
5. Umsetzung im Feature-Branch, Pull Request mit `Closes #<Issue>` → Issue wird beim Merge geschlossen.

### Labels

| Label | Bedeutung |
| --- | --- |
| `status: new issue` | Neu, muss noch eingeordnet werden |
| `status: in progress` | Jemand arbeitet daran |
| `status: backlog` | Später |
| `type: bug` | Fehler |
| `type: user story` | Neue Anforderung |
| `type: epic` | Fasst mehrere User Stories zusammen |
| `good first issue` | Gut für neue Mitarbeitende |

## Nachvollziehbare Entwicklung

- Jeder Commit nennt das Issue, z.B. `REST-API mit PostgreSQL #6` – das prüft der Git Hook `commit-msg`.
- Jede Änderung kommt über einen **Feature-Branch** und einen **Pull Request** mit `Closes #<Issue>`.
- Die Testnamen enthalten die ID der User Story (`it('US-03: ...')`).

So ist sichtbar: **Anforderung → Branch/PR → Commit → Test → Deployment**.

## Vergleich von Werkzeugen (Auftrag 1613)

| Kriterium | GitHub Issues/Projects | Jira | Azure DevOps Boards |
| --- | --- | --- | --- |
| Kosten | gratis | gratis bis 10 User | gratis bis 5 User |
| Verknüpfung mit Code | direkt (Commits, PRs) | über GitHub-App | über GitHub-App / Azure Repos |
| Einarbeitung | einfach | eher aufwändig | mittel |
| Agile Features (Sprints, Reports) | Basis | sehr umfangreich | umfangreich |
| Geeignet für | kleine Teams, Schulprojekte | grosse Firmen-Projekte | Firmen mit Microsoft/Azure |

So heissen die GitHub-Begriffe in den anderen Werkzeugen:

| GitHub | Jira | Azure DevOps |
| --- | --- | --- |
| Issue | Issue / Story | Work Item (User Story) |
| Label | Label | Tag |
| Assignee | Assignee | Assigned To |
| Milestone | Fix Version / Sprint | Iteration |
| Acceptance criteria (Text) | Acceptance Criteria (Feld) | Acceptance Criteria (Feld) |

**Fazit:** Für unser kleines Projekt ist **GitHub Issues + Projects** am besten,
weil Code, Anforderungen und CI/CD am gleichen Ort sind.

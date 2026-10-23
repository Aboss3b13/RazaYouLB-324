# Anforderungen

## Begriffe

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

| ID | User Story | Test |
| --- | --- | --- |
| US-01 | Als Benutzer möchte ich eine Notiz mit Titel und Text erstellen, damit ich Ideen festhalten kann. | `notes.test.js`, `app.integration.test.js` |
| US-02 | Als Benutzer möchte ich, dass meine Notizen gespeichert bleiben, damit sie nach dem Neuladen noch da sind. | `app.integration.test.js` |
| US-03 | Als Benutzer möchte ich eine Notiz bearbeiten, damit ich Fehler korrigieren kann. | `notes.test.js`, `app.integration.test.js` |
| US-04 | Als Benutzer möchte ich eine Notiz löschen, damit die Liste übersichtlich bleibt. | `notes.test.js`, `app.integration.test.js` |
| US-05 | Als Benutzer möchte ich Notizen durchsuchen, damit ich sie schnell finde. | `notes.test.js`, `app.integration.test.js` |

Jede User Story wird als **GitHub Issue** (Vorlage: `.github/ISSUE_TEMPLATE/user-story.md`)
erfasst und auf dem **GitHub Project Board** (To Do → In Arbeit → Erledigt) verwaltet.

## Nachvollziehbare Entwicklung

- Jeder Commit nennt die User Story, z.B. `US-03: Notiz bearbeiten`.
- Jede Änderung kommt über einen **Feature-Branch** und einen **Pull Request** mit `Closes #<Issue>`.
- Die Testnamen enthalten die ID der User Story (`describe('US-03 ...')`).

So ist sichtbar: **Anforderung → Branch/PR → Commit → Test → Deployment**.

## Vergleich von Werkzeugen

| Kriterium | GitHub Issues/Projects | Jira | Trello |
| --- | --- | --- | --- |
| Kosten | gratis | gratis bis 10 User | gratis (Basis) |
| Verknüpfung mit Code | direkt (Commits, PRs) | über Integration | kaum |
| Einarbeitung | einfach | eher aufwändig | sehr einfach |
| Agile Features (Sprints, Reports) | Basis | sehr umfangreich | wenig |
| Geeignet für | kleine Teams, Schulprojekte | grosse Firmen-Projekte | einfache To-do-Listen |

**Fazit:** Für unser kleines Projekt ist **GitHub Issues + Projects** am besten,
weil Code, Anforderungen und CI/CD am gleichen Ort sind.

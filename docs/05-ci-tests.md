# Continuous Integration und Tests

## Testfälle zu Anforderungen

Zu jeder User Story gibt es Tests (siehe [Anforderungen](02-anforderungen.md)).

| Datei | Art | Was wird getestet |
| --- | --- | --- |
| `tests/notes.test.js` | Unit-Test | Suche (US-05) |
| `tests/store.test.js` | Unit- + Datenbanktest | Erstellen, Bearbeiten, Löschen – einmal im Arbeitsspeicher, einmal gegen **echte PostgreSQL** (US-01 bis US-04, US-06) |
| `tests/api.integration.test.js` | Integrationstest | REST-API über HTTP (Express + Speicher) |
| `tests/app.integration.test.js` | Integrationstest | Ganze Kette: Oberfläche (jsdom) → fetch → echter Express-Server → Speicher |

Beispiel US-04:

```js
it('US-04: löscht eine Notiz', async () => {
  await submitNote('Weg', '');
  document.querySelector('.delete').click();
  await vi.waitFor(() => expect(titles()).toEqual([]));
});
```

## Automatische Ausführung

Datei: `.github/workflows/ci.yml`

Bei jedem **Pull Request auf `main`** und jedem **Push auf `main`**:

1. PostgreSQL-Datenbank als Service-Container starten
2. Code auschecken, Node.js 22 installieren
3. `npm ci` – Abhängigkeiten installieren
4. `npm run lint` – Code-Qualität prüfen
5. `npm run coverage` – alle Tests (inkl. Datenbanktests) mit Testabdeckung
6. Testabdeckung in der Zusammenfassung des Laufs anzeigen
7. `npm run build` – Oberfläche bauen
8. `dist/` als Artefakt hochladen

Schlägt ein Schritt fehl, wird der Pull Request rot markiert und kann nicht gemerged werden.

## Lokal vs. Server

| | Git Hooks (lokal) | CI (GitHub) |
| --- | --- | --- |
| Wo | eigener PC | GitHub-Server |
| Wann | vor jedem Commit | bei jedem PR / Push |
| Umgehbar | ja (`--no-verify`) | nein (Branch-Schutz) |
| Vorteil | schnelle Rückmeldung | garantiert für alle |

## Aufbau einer Workflow-Datei

```yaml
on:            # Wann? z.B. pull_request, push, Tag
jobs:          # Jeder Job läuft in einer eigenen virtuellen Maschine
  build-test:
    runs-on: ubuntu-latest
    services:  # Zusätzliche Container, z.B. Datenbank
    steps:     # Schritte nacheinander: uses = fertige Action, run = eigener Befehl
```

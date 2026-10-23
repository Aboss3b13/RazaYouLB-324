# Continuous Integration und Tests

## Testfälle zu Anforderungen

Zu jeder User Story gibt es einen Test (siehe [Anforderungen](02-anforderungen.md)).

- **Unit-Tests** (`tests/notes.test.js`): testen die Logik (erstellen, bearbeiten, löschen, suchen).
- **Integrationstests** (`tests/app.integration.test.js`): testen die ganze App zusammen
  (HTML + JavaScript + Speicherung im `localStorage`) in einem simulierten Browser (jsdom).

Beispiel US-04:

```js
it('US-04: löscht eine Notiz', () => {
  submitNote('Weg', '');
  document.querySelector('.delete').click();
  expect(titles()).toEqual([]);
});
```

## Automatische Ausführung

Datei: `.github/workflows/ci.yml`

Bei jedem **Push auf `main`** und bei jedem **Pull Request**:

1. Code auschecken
2. Node.js 22 installieren
3. `npm ci` – Abhängigkeiten installieren
4. `npm run lint` – Code-Qualität prüfen
5. `npm test` – alle Unit- und Integrationstests
6. `npm run build` – App bauen
7. `dist/` als Artefakt hochladen

Schlägt ein Schritt fehl, wird der Pull Request rot markiert und nicht deployed.

Lokal: `npm test` oder `npm run test:watch`.

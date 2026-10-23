import { describe, it, expect, beforeAll, beforeEach, afterAll, vi } from 'vitest';
import html from '../index.html?raw';
import { createApp } from '../server/app.js';
import { memoryStore } from '../server/store.js';

// Ganze Kette: Oberfläche (jsdom) -> fetch -> echter Express-Server -> Speicher
window.__TEST__ = true;
const { initApp } = await import('../src/main.js');

let server;
let store;
const realFetch = globalThis.fetch;

beforeAll(async () => {
  const app = createApp({
    all: (...a) => store.all(...a),
    create: (...a) => store.create(...a),
    update: (...a) => store.update(...a),
    remove: (...a) => store.remove(...a),
  });
  await new Promise((resolve) => (server = app.listen(0, resolve)));
  const base = `http://127.0.0.1:${server.address().port}/`;
  vi.stubGlobal('fetch', (url, options) => realFetch(base + url, options));
});

afterAll(() => {
  vi.unstubAllGlobals();
  server.close();
});

async function setup() {
  document.documentElement.innerHTML = html;
  await initApp(document);
}

async function submitNote(title, text) {
  document.getElementById('note-title').value = title;
  document.getElementById('note-text').value = text;
  const event = new Event('submit', { cancelable: true });
  document.getElementById('note-form').dispatchEvent(event);
  await vi.waitFor(() => expect(titles()).toContain(title));
}

const titles = () => [...document.querySelectorAll('.note h2')].map((h) => h.textContent);

describe('Integration: Oberfläche + Server', () => {
  beforeEach(async () => {
    store = memoryStore();
    await setup();
  });

  it('US-01: erstellt eine Notiz und zeigt sie an', async () => {
    await submitNote('Test', 'Hallo');
    expect(titles()).toEqual(['Test']);
    expect(document.getElementById('empty').hidden).toBe(true);
  });

  it('US-02: Notizen bleiben nach Neuladen erhalten', async () => {
    await submitNote('Bleibt', '');
    await setup();
    expect(titles()).toEqual(['Bleibt']);
  });

  it('US-03: bearbeitet eine Notiz', async () => {
    await submitNote('Alt', '');
    document.querySelector('.edit').click();
    await submitNote('Neu', '');
    expect(titles()).toEqual(['Neu']);
  });

  it('US-04: löscht eine Notiz', async () => {
    await submitNote('Weg', '');
    document.querySelector('.delete').click();
    await vi.waitFor(() => expect(titles()).toEqual([]));
    expect(document.getElementById('empty').hidden).toBe(false);
  });

  it('US-05: filtert mit der Suche', async () => {
    await submitNote('Einkauf', 'Milch');
    await submitNote('Schule', 'M324');
    const search = document.getElementById('search');
    search.value = 'milch';
    search.dispatchEvent(new Event('input'));
    expect(titles()).toEqual(['Einkauf']);
  });
});

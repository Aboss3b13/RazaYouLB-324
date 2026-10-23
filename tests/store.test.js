// @vitest-environment node
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { memoryStore, pgStore } from '../server/store.js';

// Dieselben Tests laufen gegen den Arbeitsspeicher und – falls vorhanden – gegen PostgreSQL (CI).
const dbUrl = process.env.TEST_DATABASE_URL;
const stores = [['Arbeitsspeicher', async () => memoryStore()]];
if (dbUrl) stores.push(['PostgreSQL', () => pgStore(dbUrl)]);

describe.each(stores)('Speicher: %s', (name, makeStore) => {
  let store;
  const opened = [];

  beforeEach(async () => {
    store = await makeStore();
    opened.push(store);
    await store.clear?.();
  });

  afterAll(async () => {
    for (const s of opened) await s.close();
  });

  it('US-01: erstellt eine Notiz', async () => {
    const note = await store.create(' Einkauf ', 'Milch');
    expect(note).toMatchObject({ title: 'Einkauf', text: 'Milch' });
    expect(await store.all()).toHaveLength(1);
  });

  it('US-01: lehnt leeren Titel ab', async () => {
    await expect(store.create('   ', 'x')).rejects.toThrow('Titel');
  });

  it('US-03: bearbeitet eine Notiz', async () => {
    const note = await store.create('Alt', 'a');
    const updated = await store.update(note.id, 'Neu', 'b');
    expect(updated).toMatchObject({ id: note.id, title: 'Neu', text: 'b' });
  });

  it('US-03: unbekannte ID gibt null', async () => {
    expect(await store.update(9999, 'x', '')).toBeNull();
  });

  it('US-04: löscht eine Notiz', async () => {
    const note = await store.create('Weg', '');
    expect(await store.remove(note.id)).toBe(true);
    expect(await store.all()).toEqual([]);
  });

  it.runIf(name === 'PostgreSQL')('US-02: Daten bleiben nach neuer Verbindung erhalten', async () => {
    await store.create('Bleibt', '');
    const second = await makeStore();
    opened.push(second);
    expect((await second.all()).map((n) => n.title)).toEqual(['Bleibt']);
  });
});

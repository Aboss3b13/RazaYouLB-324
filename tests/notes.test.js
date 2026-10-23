import { describe, it, expect } from 'vitest';
import { createNote, updateNote, deleteNote, searchNotes } from '../src/notes.js';

describe('US-01 Notiz erstellen', () => {
  it('fügt eine neue Notiz oben ein', () => {
    const notes = createNote([], 'Einkauf', 'Milch', 1);
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({ id: '1', title: 'Einkauf', text: 'Milch' });
  });

  it('wirft einen Fehler bei leerem Titel', () => {
    expect(() => createNote([], '   ', 'x')).toThrow();
  });
});

describe('US-03 Notiz bearbeiten', () => {
  it('ändert Titel und Text', () => {
    const notes = createNote([], 'Alt', 'a', 1);
    const updated = updateNote(notes, '1', 'Neu', 'b', 2);
    expect(updated[0]).toMatchObject({ title: 'Neu', text: 'b', updated: 2 });
  });
});

describe('US-04 Notiz löschen', () => {
  it('entfernt die Notiz', () => {
    const notes = createNote([], 'Weg', '', 1);
    expect(deleteNote(notes, '1')).toEqual([]);
  });
});

describe('US-05 Notizen suchen', () => {
  const notes = [
    { id: '1', title: 'Einkauf', text: 'Milch' },
    { id: '2', title: 'Schule', text: 'M324 LB' },
  ];

  it('findet nach Titel und Text (ohne Gross/Klein)', () => {
    expect(searchNotes(notes, 'schule')).toHaveLength(1);
    expect(searchNotes(notes, 'milch')[0].id).toBe('1');
  });

  it('gibt bei leerer Suche alles zurück', () => {
    expect(searchNotes(notes, '')).toHaveLength(2);
  });
});

import { describe, it, expect } from 'vitest';
import { searchNotes } from '../src/notes.js';

describe('US-05 Notizen suchen', () => {
  const notes = [
    { id: 1, title: 'Einkauf', text: 'Milch' },
    { id: 2, title: 'Schule', text: 'M324 LB' },
  ];

  it('findet nach Titel und Text (ohne Gross/Klein)', () => {
    expect(searchNotes(notes, 'schule')).toHaveLength(1);
    expect(searchNotes(notes, 'milch')[0].id).toBe(1);
  });

  it('gibt bei leerer Suche alles zurück', () => {
    expect(searchNotes(notes, '')).toHaveLength(2);
  });
});

// Suche in Titel und Text (ohne Gross-/Kleinschreibung)
export function searchNotes(notes, query) {
  const q = query.trim().toLowerCase();
  if (!q) return notes;
  return notes.filter(
    (n) => n.title.toLowerCase().includes(q) || n.text.toLowerCase().includes(q),
  );
}

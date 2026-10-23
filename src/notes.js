// Reine Logik für Notizen (ohne DOM), damit sie einfach testbar ist.

function checkTitle(title) {
  const clean = title.trim();
  if (!clean) {
    throw new Error('Titel darf nicht leer sein');
  }
  return clean;
}

export function createNote(notes, title, text, now = Date.now()) {
  const note = { id: String(now), title: checkTitle(title), text: text.trim(), updated: now };
  return [note, ...notes];
}

export function updateNote(notes, id, title, text, now = Date.now()) {
  const clean = checkTitle(title);
  return notes.map((n) =>
    n.id === id ? { ...n, title: clean, text: text.trim(), updated: now } : n,
  );
}

export function deleteNote(notes, id) {
  return notes.filter((n) => n.id !== id);
}

export function searchNotes(notes, query) {
  const q = query.trim().toLowerCase();
  if (!q) return notes;
  return notes.filter(
    (n) => n.title.toLowerCase().includes(q) || n.text.toLowerCase().includes(q),
  );
}

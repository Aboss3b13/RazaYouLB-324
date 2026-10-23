const KEY = 'notizen';

export function loadNotes(storage = localStorage) {
  try {
    return JSON.parse(storage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function saveNotes(notes, storage = localStorage) {
  storage.setItem(KEY, JSON.stringify(notes));
}

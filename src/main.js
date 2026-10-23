import { createNote, updateNote, deleteNote, searchNotes } from './notes.js';
import { loadNotes, saveNotes } from './storage.js';

export function initApp(doc = document) {
  const form = doc.getElementById('note-form');
  const idInput = doc.getElementById('note-id');
  const titleInput = doc.getElementById('note-title');
  const textInput = doc.getElementById('note-text');
  const cancelBtn = doc.getElementById('cancel-btn');
  const search = doc.getElementById('search');
  const list = doc.getElementById('note-list');
  const empty = doc.getElementById('empty');

  let notes = loadNotes();

  function resetForm() {
    form.reset();
    idInput.value = '';
    cancelBtn.hidden = true;
  }

  function button(label, className, onClick) {
    const btn = doc.createElement('button');
    btn.textContent = label;
    btn.className = className;
    btn.addEventListener('click', onClick);
    return btn;
  }

  function render() {
    const visible = searchNotes(notes, search.value);
    list.innerHTML = '';

    for (const note of visible) {
      const li = doc.createElement('li');
      li.className = 'card note';

      const h2 = doc.createElement('h2');
      h2.textContent = note.title;
      const p = doc.createElement('p');
      p.textContent = note.text;
      const small = doc.createElement('small');
      small.className = 'muted';
      small.textContent = new Date(note.updated).toLocaleString('de-CH');

      const row = doc.createElement('div');
      row.className = 'row';
      row.append(
        button('Bearbeiten', 'secondary edit', () => {
          idInput.value = note.id;
          titleInput.value = note.title;
          textInput.value = note.text;
          cancelBtn.hidden = false;
          titleInput.focus();
        }),
        button('Löschen', 'danger delete', () => {
          notes = deleteNote(notes, note.id);
          saveNotes(notes);
          render();
        }),
      );

      li.append(h2, p, small, row);
      list.append(li);
    }
    empty.hidden = visible.length > 0;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (idInput.value) {
      notes = updateNote(notes, idInput.value, titleInput.value, textInput.value);
    } else {
      notes = createNote(notes, titleInput.value, textInput.value);
    }
    saveNotes(notes);
    resetForm();
    render();
  });

  cancelBtn.addEventListener('click', resetForm);
  search.addEventListener('input', render);

  render();
}

if (!window.__TEST__) {
  initApp();
}

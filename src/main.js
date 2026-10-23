import { searchNotes } from './notes.js';
import { loadNotes, addNote, editNote, removeNote } from './storage.js';

export async function initApp(doc = document) {
  const form = doc.getElementById('note-form');
  const idInput = doc.getElementById('note-id');
  const titleInput = doc.getElementById('note-title');
  const textInput = doc.getElementById('note-text');
  const cancelBtn = doc.getElementById('cancel-btn');
  const search = doc.getElementById('search');
  const list = doc.getElementById('note-list');
  const empty = doc.getElementById('empty');
  const error = doc.getElementById('error');

  let notes = [];

  async function run(action) {
    try {
      error.hidden = true;
      await action();
      notes = await loadNotes();
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
    }
    render();
  }

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
        button('Löschen', 'danger delete', () => run(() => removeNote(note.id))),
      );

      li.append(h2, p, small, row);
      list.append(li);
    }
    empty.hidden = visible.length > 0;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = idInput.value;
    const title = titleInput.value;
    const text = textInput.value;
    resetForm();
    return run(() => (id ? editNote(id, title, text) : addNote(title, text)));
  });

  cancelBtn.addEventListener('click', resetForm);
  search.addEventListener('input', render);

  await run(async () => {});
}

if (!window.__TEST__) {
  initApp();
}

// Speicher für Notizen: im Arbeitsspeicher (Tests/lokal) oder in PostgreSQL (Azure).
import pg from 'pg';

function checkTitle(title) {
  const clean = String(title ?? '').trim();
  if (!clean) {
    throw new Error('Titel darf nicht leer sein');
  }
  return clean;
}

export function memoryStore() {
  let notes = [];
  let nextId = 1;

  return {
    async all() {
      return [...notes].sort((a, b) => b.updated - a.updated || b.id - a.id);
    },
    async create(title, text = '') {
      const note = { id: nextId++, title: checkTitle(title), text: String(text).trim(), updated: Date.now() };
      notes.push(note);
      return note;
    },
    async update(id, title, text = '') {
      const note = notes.find((n) => n.id === Number(id));
      if (!note) return null;
      Object.assign(note, { title: checkTitle(title), text: String(text).trim(), updated: Date.now() });
      return note;
    },
    async remove(id) {
      const before = notes.length;
      notes = notes.filter((n) => n.id !== Number(id));
      return notes.length < before;
    },
    async close() {},
  };
}

function toNote(row) {
  return { id: row.id, title: row.title, text: row.text, updated: Number(row.updated) };
}

export async function pgStore(connectionString) {
  const ssl = /sslmode=require/.test(connectionString) ? { rejectUnauthorized: false } : false;
  const pool = new pg.Pool({ connectionString, ssl });

  await pool.query(`CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL DEFAULT '',
    updated BIGINT NOT NULL
  )`);

  return {
    async all() {
      const { rows } = await pool.query('SELECT * FROM notes ORDER BY updated DESC, id DESC');
      return rows.map(toNote);
    },
    async create(title, text = '') {
      const { rows } = await pool.query(
        'INSERT INTO notes (title, text, updated) VALUES ($1, $2, $3) RETURNING *',
        [checkTitle(title), String(text).trim(), Date.now()],
      );
      return toNote(rows[0]);
    },
    async update(id, title, text = '') {
      const { rows } = await pool.query(
        'UPDATE notes SET title = $1, text = $2, updated = $3 WHERE id = $4 RETURNING *',
        [checkTitle(title), String(text).trim(), Date.now(), Number(id)],
      );
      return rows[0] ? toNote(rows[0]) : null;
    },
    async remove(id) {
      const { rowCount } = await pool.query('DELETE FROM notes WHERE id = $1', [Number(id)]);
      return rowCount > 0;
    },
    async clear() {
      await pool.query('DELETE FROM notes');
    },
    async close() {
      await pool.end();
    },
  };
}

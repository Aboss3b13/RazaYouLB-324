// Zugriff auf die REST-API des Servers
async function request(path, options = {}) {
  const res = await fetch(`api/notes${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error((await res.json().catch(() => ({}))).error || 'Fehler beim Speichern');
  }
  return res.status === 204 ? null : res.json();
}

export const loadNotes = () => request('');

export const addNote = (title, text) =>
  request('', { method: 'POST', body: JSON.stringify({ title, text }) });

export const editNote = (id, title, text) =>
  request(`/${id}`, { method: 'PUT', body: JSON.stringify({ title, text }) });

export const removeNote = (id) => request(`/${id}`, { method: 'DELETE' });

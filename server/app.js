import express from 'express';

// REST-API für Notizen. Der Speicher wird übergeben, damit Tests einen eigenen verwenden können.
export function createApp(store, staticDir) {
  const app = express();
  app.use(express.json());

  const wrap = (fn) => (req, res) =>
    fn(req, res).catch((err) => res.status(400).json({ error: err.message }));

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

  app.get('/api/notes', wrap(async (req, res) => {
    res.json(await store.all());
  }));

  app.post('/api/notes', wrap(async (req, res) => {
    res.status(201).json(await store.create(req.body.title, req.body.text));
  }));

  app.put('/api/notes/:id', wrap(async (req, res) => {
    const note = await store.update(req.params.id, req.body.title, req.body.text);
    if (!note) return res.status(404).json({ error: 'Nicht gefunden' });
    res.json(note);
  }));

  app.delete('/api/notes/:id', wrap(async (req, res) => {
    const ok = await store.remove(req.params.id);
    res.status(ok ? 204 : 404).end();
  }));

  if (staticDir) {
    app.use(express.static(staticDir));
  }

  return app;
}

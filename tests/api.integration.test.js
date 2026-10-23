// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../server/app.js';
import { memoryStore } from '../server/store.js';

describe('Integration: REST-API', () => {
  let app;

  beforeEach(() => {
    app = createApp(memoryStore());
  });

  it('Health-Check antwortet', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('US-01: POST erstellt eine Notiz', async () => {
    const res = await request(app).post('/api/notes').send({ title: 'Test', text: 'Hallo' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test');
  });

  it('US-01: POST ohne Titel gibt 400', async () => {
    const res = await request(app).post('/api/notes').send({ title: '' });
    expect(res.status).toBe(400);
  });

  it('US-02: GET liefert gespeicherte Notizen', async () => {
    await request(app).post('/api/notes').send({ title: 'A' });
    const res = await request(app).get('/api/notes');
    expect(res.body.map((n) => n.title)).toEqual(['A']);
  });

  it('US-03: PUT ändert eine Notiz', async () => {
    const { body } = await request(app).post('/api/notes').send({ title: 'Alt' });
    const res = await request(app).put(`/api/notes/${body.id}`).send({ title: 'Neu' });
    expect(res.body.title).toBe('Neu');
  });

  it('US-04: DELETE löscht eine Notiz', async () => {
    const { body } = await request(app).post('/api/notes').send({ title: 'Weg' });
    expect((await request(app).delete(`/api/notes/${body.id}`)).status).toBe(204);
    expect((await request(app).delete(`/api/notes/${body.id}`)).status).toBe(404);
  });
});

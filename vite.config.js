import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    // API-Aufrufe im Entwicklungsmodus an den Express-Server weiterleiten
    proxy: { '/api': 'http://localhost:3000' },
  },
  test: {
    environment: 'jsdom',
    coverage: { include: ['src', 'server'], reporter: ['text', 'json-summary'] },
  },
});

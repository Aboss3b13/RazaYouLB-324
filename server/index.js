import 'dotenv/config';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';
import { memoryStore, pgStore } from './store.js';

// Verbindung aus .env (lokal) oder den App Settings (Azure) lesen
function databaseUrl() {
  const { DATABASE_URL, DBUSER, DBPASS, DBHOST, DBNAME, DBSSL } = process.env;
  if (DATABASE_URL) return DATABASE_URL;
  if (DBHOST) {
    const ssl = DBSSL === 'require' ? '?sslmode=require' : '';
    return `postgres://${encodeURIComponent(DBUSER)}:${encodeURIComponent(DBPASS)}@${DBHOST}/${DBNAME}${ssl}`;
  }
  return null;
}

const url = databaseUrl();
const store = url ? await pgStore(url) : memoryStore();
const dist = fileURLToPath(new URL('../dist', import.meta.url));
const port = process.env.PORT || 3000;

createApp(store, dist).listen(port, () => {
  console.log(`Notizen-App läuft auf http://localhost:${port} (${url ? 'PostgreSQL' : 'Arbeitsspeicher'})`);
});

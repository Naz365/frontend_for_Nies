import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.join(__dirname, 'backend', 'database');
const dbFile = path.join(dbDir, 'database.sqlite');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, '');
  console.log('Created SQLite database file at backend/database/database.sqlite');
} else {
  console.log('SQLite database file already exists.');
}

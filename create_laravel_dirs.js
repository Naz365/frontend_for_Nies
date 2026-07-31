import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = [
  path.join(__dirname, 'backend', 'bootstrap', 'cache'),
  path.join(__dirname, 'backend', 'storage', 'framework', 'views'),
  path.join(__dirname, 'backend', 'storage', 'framework', 'sessions'),
  path.join(__dirname, 'backend', 'storage', 'framework', 'cache', 'data'),
  path.join(__dirname, 'backend', 'storage', 'logs'),
  path.join(__dirname, 'backend', 'storage', 'app', 'public'),
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('Created all required Laravel storage & cache directories.');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'public', 'wp-content');
const destDir = path.join(__dirname, 'backend', 'public', 'wp-content');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.readdirSync(src).forEach((childItemName) => {
    const srcPath = path.join(src, childItemName);
    const destPath = path.join(dest, childItemName);
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyRecursiveSync(srcDir, destDir);
console.log('Successfully mirrored wp-content logos into backend/public/wp-content.');

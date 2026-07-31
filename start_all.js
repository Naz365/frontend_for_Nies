import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const BACKEND_DIR = path.join(__dirname, 'backend');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

console.log(`\n=======================================================================`);
console.log(`🚀 LAUNCHING N.I. ENGINEERING SERVICES ECOSYSTEM (BOTH SERVERS)`);
console.log(`=======================================================================\n`);

// 1. Start Public Static Marketing Site Server (Port 4321)
const staticServer = http.createServer((req, res) => {
  let urlPath = req.url || '/';

  if (urlPath.endsWith('/')) {
    urlPath += 'index.html';
  } else if (!path.extname(urlPath)) {
    urlPath += '/index.html';
  }

  let filePath = path.join(DIST_DIR, urlPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

staticServer.listen(4321, '0.0.0.0', () => {
  console.log(`✅ [1/2] Public Marketing Site  --> http://localhost:4321`);
});

// 2. Start Laravel Filament CMS Server (Port 8080)
const artisanProcess = spawn('php', ['artisan', 'serve', '--host=127.0.0.1', '--port=8080'], {
  cwd: BACKEND_DIR,
  stdio: 'pipe',
  shell: true
});

artisanProcess.stdout.on('data', (data) => {
  const msg = data.toString();
  if (msg.includes('Server running')) {
    console.log(`✅ [2/2] Private CMS Portal     --> http://localhost:8080/admin`);
    console.log(`\n=======================================================================\n`);
  }
});

artisanProcess.stderr.on('data', (data) => {
  // console.error(`CMS Error: ${data}`);
});

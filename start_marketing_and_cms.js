import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');

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

function serveStaticFile(req, res, targetPage) {
  let urlPath = req.url || '/';

  if (targetPage) {
    if (urlPath === '/' || urlPath === '') {
      urlPath = targetPage;
    }
  }

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
}

function createServerOnPort(port, targetPage, name, subdomain) {
  const server = http.createServer((req, res) => serveStaticFile(req, res, targetPage));
  server.listen(port, '0.0.0.0', () => {
    console.log(`✅ [Port ${port}] ${name} -> http://localhost:${port} | http://${subdomain}:${port}`);
  });
  return server;
}

console.log(`\n=======================================================================`);
console.log(`🚀 STARTING DEDICATED MARKETING SITE & PRIVATE CMS PORTAL SERVERS`);
console.log(`=======================================================================\n`);

// 1. Public Static Marketing Site -> Port 4321
createServerOnPort(4321, '/index.html', 'Public Static Marketing Site', 'localhost');

// 2. Private CMS Portal -> Port 8000
createServerOnPort(8000, '/subdomains/manage/index.html', 'Private CMS Portal (Laravel/Filament)', 'manage.localhost');

console.log(`\n=======================================================================\n`);

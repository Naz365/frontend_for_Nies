import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4321;
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

const server = http.createServer((req, res) => {
  const host = (req.headers.host || '').split(':')[0].toLowerCase();
  let urlPath = req.url || '/';

  // Subdomain Host Routing
  if (host.startsWith('manage.')) {
    if (urlPath === '/' || urlPath === '') {
      urlPath = '/subdomains/manage/index.html';
    }
  } else if (host.startsWith('api.')) {
    if (urlPath === '/' || urlPath === '') {
      urlPath = '/subdomains/api/index.html';
    }
  } else if (host.startsWith('shop.')) {
    if (urlPath === '/' || urlPath === '') {
      urlPath = '/subdomains/shop/index.html';
    }
  } else if (host.startsWith('portal.')) {
    if (urlPath === '/' || urlPath === '') {
      urlPath = '/subdomains/portal/index.html';
    }
  } else if (host.startsWith('erp.')) {
    if (urlPath === '/' || urlPath === '') {
      urlPath = '/subdomains/erp/index.html';
    }
  }

  // Sanitize path
  if (urlPath.endsWith('/')) {
    urlPath += 'index.html';
  } else if (!path.extname(urlPath)) {
    urlPath += '/index.html';
  }

  let filePath = path.join(DIST_DIR, urlPath);

  if (!fs.existsSync(filePath)) {
    // Try fallback index.html
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n==================================================`);
  console.log(`🚀 N.I. Engineering Services Ecosystem Active on Port ${PORT}`);
  console.log(`==================================================\n`);
});

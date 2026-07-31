import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('====================================================');
console.log('🚀 PREPARING N.I. ENGINEERING PRODUCTION BUILD BUNDLE');
console.log('====================================================\n');

try {
  console.log('1. Building Astro Static Production Site (dist/)...');
  execSync('npx astro build', { cwd: __dirname, stdio: 'inherit' });

  console.log('\n2. Mirroring WP Content Assets into backend/public/wp-content...');
  execSync('node copy_backend_assets.js', { cwd: __dirname, stdio: 'inherit' });

  console.log('\n====================================================');
  console.log('✅ PRODUCTION BUILD BUNDLE COMPLETED SUCCESSFULLY!');
  console.log('====================================================');
  console.log('Frontend Static Files Directory: dist/');
  console.log('Backend Application Directory:   backend/');
  console.log('====================================================\n');
} catch (err) {
  console.error('Build Error:', err.message);
}

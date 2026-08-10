import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://niengineeringbd.com',
  base: '/',
  outDir: './dist',
  trailingSlash: 'always',
  integrations: [tailwind()],
  output: 'static'
});

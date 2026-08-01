import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://naz365.github.io',
  base: '/frontend_for_Nies/',
  outDir: './docs',
  integrations: [tailwind()],
  output: 'static'
});

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Replace with the final domain before launch.
export default defineConfig({
  site: 'https://www.example.com',
  integrations: [sitemap()],
  build: { format: 'directory' },
});

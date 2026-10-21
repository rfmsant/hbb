import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL / BASE_PATH are set by the GitHub Pages workflow. On Cloudflare with the real domain, leave them empty.
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.example.com',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
  build: { format: 'directory' },
});

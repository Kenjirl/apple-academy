// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Published at https://kenjirl.github.io/apple-academy/ (repo: Kenjirl/apple-academy)
export default defineConfig({
  site: 'https://kenjirl.github.io',
  base: '/apple-academy',
  trailingSlash: 'always',
  // Code blocks are plain architecture diagrams; styled in global.css.
  markdown: { syntaxHighlight: false },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});

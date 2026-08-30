import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblastudio.it';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  integrations: [],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    css: { devSourcemap: true },
  },
});

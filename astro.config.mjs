import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const site = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblastudio.it';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  integrations: [react()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    css: { devSourcemap: true },
  },
});

import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblastudio.vercel.app';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  build: {
    // CSS inline: niente file che blocca il rendering, primo paint subito
    inlineStylesheets: 'always',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});

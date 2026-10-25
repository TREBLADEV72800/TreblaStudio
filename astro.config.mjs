import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblastudio.pages.dev';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  // Cloudflare Pages serve le directory con slash finale: allineo dev e build.
  trailingSlash: 'always',
  build: {
    // CSS inline: niente file che blocca il rendering, primo paint subito
    inlineStylesheets: 'always',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});

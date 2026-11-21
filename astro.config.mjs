import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblastudio.pages.dev';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  // Cloudflare Pages serve le directory con slash finale: allineo dev e build.
  trailingSlash: 'always',
  // Astro 7 usa compressHTML 'jsx' di default, che rimuove gli spazi tra elementi inline.
  // true mantiene il comportamento precedente e la resa visibile invariata.
  compressHTML: true,
  build: {
    // CSS inline: niente file che blocca il rendering, primo paint subito
    inlineStylesheets: 'always',
  },
});

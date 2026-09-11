import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblatest.vercel.app';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});

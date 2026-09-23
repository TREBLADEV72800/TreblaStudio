# Trebla Studio — Astro

Sito statico in italiano (Astro, `output: static`), responsive e live su https://treblastudio.vercel.app.

## Avvio

```bash
npm install
npm run dev
```

## Build / Deploy

```bash
npm run build
vercel --prod --yes
```

Struttura: `src/pages` (route), `src/components`, `src/layouts`, `src/data` (site, prezzi, faq, configuratore), `public` (asset). Dati reali solo in `src/data`.

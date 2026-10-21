# Trebla Studio — Astro

Sito statico in italiano (Astro, `output: static`), responsive e live su https://treblastudio.vercel.app.

## Avvio

```bash
npm install
npm run dev
```

## Build / Deploy

```bash
npm run check   # astro check: deve stare a 0 errori
npm run build
vercel --prod --yes
```

## Struttura

- `src/data/` — dati reali, unica fonte di verità: `site.ts` (dominio),
  `contatti.ts` (frammenti di numero ed email), `prezzi.ts` (catalogo
  commerciale), `faq.ts`, `configuratore.ts` (voci su misura per tipo).
- `src/lib/` — logica condivisa: `catalogo.ts` unisce catalogo generico e
  voci su misura per concetto, `tracking.ts` scrive sul dataLayer.
- `src/scripts/wizard.ts` — logica del configuratore, tipizzata.
- `src/components/` — `Head` (testata), `Header`, `Footer`, `Contatti`
  (link e tracking), `Faq`, `Capitolo`.
- `src/layouts/Layout.astro` — pagina normale.
- `src/styles.css`, `src/styles/tokens.css`, `src/styles/wizard.css` —
  design system, token condivisi, css del configuratore.
- `src/pages/` — route.
- `public/` — asset.

`comecreare.md` è il playbook: stack, design system, SEO, performance e
come lavorare sul sito senza rovinare le regole.

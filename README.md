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

- `src/data/` — dati reali, unica fonte di verità: `sito.ts` (dominio),
  `contatti.ts` (frammenti di numero ed email), `prezzi.ts` (catalogo
  commerciale), `domande-frequenti.ts`, `configuratore.ts` (voci su misura
  per tipo di attività).
- `src/lib/` — logica condivisa: `catalogo.ts` unisce catalogo generico e
  voci su misura per concetto.
- `src/scripts/configuratore-preventivo.ts` — logica del configuratore, tipizzata.
- `src/components/` — `MetaDocumento` (testata e JSON-LD), `Intestazione`,
  `Piede`, `ContattiDinamici` (link e tracking), `ElencoDomande`,
  `TestataSezione`.
- `src/layouts/LayoutPagina.astro` — pagina normale.
- `src/stili-globali.css`, `src/styles/variabili.css`,
  `src/styles/configuratore.css` — design system, token condivisi e CSS del
  configuratore.
- `src/pages/` — route.
- `public/` — asset.

`comecreare.md` è il playbook: stack, design system, SEO, performance e
come lavorare sul sito senza rovinare le regole.

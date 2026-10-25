# Trebla Studio — Astro

Sito statico in italiano (Astro, `output: static`), responsive e live su https://treblastudio.pages.dev.

## Avvio

```bash
npm install
npm run dev
```

## Build / Deploy

```bash
npm run check   # astro check: deve stare a 0 errori
npm run build
npm run deploy  # build + wrangler pages deploy
```

Deploy Cloudflare Pages: progetto `treblastudio`, output `dist`.
`public/_redirects` e `public/_headers` vengono copiati nel build e letti da
Pages. URL di produzione: https://treblastudio.pages.dev

Le pagine sono servite con lo slash finale (`/servizi/`, `/preventivo/`):
canonical, sitemap e link interni usano quella forma. `/servizi` risponde 308.

Il progetto Pages esiste già. Se va ricreato una volta sola:
`npx wrangler pages project create treblastudio --production-branch main --force`
(senza `--force` la CLI delega a Workers e non crea `*.pages.dev`).

Il deploy automatico è in `.github/workflows/deploy-pages.yml`: ogni push su
`main` esegue check, build e `wrangler pages deploy`. Richiede il secret GitHub
`CLOUDFLARE_API_TOKEN` (token Cloudflare con permesso Cloudflare Pages: Edit).

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

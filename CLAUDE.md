# Trebla Studio (TreblaStudio)

## Panoramica
Sito statico in italiano dello studio Trebla, indipendente ad Asti, che realizza siti web, grafiche e social per piccole attività locali (ristoranti, negozi, artigiani, professionisti). Il sito vende servizi e raccoglie richieste tramite un configuratore di preventivo a `/preventivo/`. Produzione: https://treblastudio.pages.dev. Il sito non ha backend: tutti i dati stanno in file TypeScript.

## Stack
- Linguaggio: TypeScript (`tsconfig.json` estende `astro/tsconfigs/strictest`) + Astro (`.astro`) + CSS custom
- Framework: Astro 4 (`astro` in `package.json`), `output: 'static'` in `astro.config.mjs`, `trailingSlash: 'always'`, CSS inline (`inlineStylesheets: 'always'`)
- Database: Non applicabile (nessun DB, nessun CMS: dati in `src/data/`)
- Librerie chiave:
  - `@fontsource/archivo`, `@fontsource/fraunces`, `@fontsource/ibm-plex-mono`: font self-hosted, usati solo come file woff2 in `src/components/MetaDocumento.astro`
  - `sharp`: servizio immagini di Astro (`astro.config.mjs`)
  - `wrangler`: deploy su Cloudflare Pages (`package.json`, script `deploy*`)
  - `@astrojs/check`, `typescript`: controllo tipi (`npm run check`)
- Nessun framework UI, nessun framework CSS.

## Comandi
| Azione | Comando |
|---|---|
| Installare dipendenze | `npm ci` (usato in CI) oppure `npm install` (README) |
| Avvio sviluppo | `npm run dev` (porta: DA VERIFICARE, `sito.md` indica 4321) |
| Build | `npm run build` (`astro build`, output in `dist/`, verificato: 16 pagine HTML) |
| Test | Non applicabile: nessun framework di test nel repo |
| Lint/format | Non applicabile: nessun linter o formatter. Controllo tipi: `npm run check` (`astro check`, verificato: 0 errori) |
| Preview build | `npm run preview` |
| Deploy produzione | `npm run deploy` (build + `wrangler pages deploy dist --project-name treblastudio --branch main`) |
| Deploy anteprima | `npm run deploy:preview` (senza branch esplicito) |
| Deploy test | `npm run deploy:test` (branch `test`) |

Verifica obbligatoria prima di consegnare: `npm run check` poi `npm run build`. In CI (`.github/workflows/deploy-pages.yml`) il push su `main` esegue check, build e deploy. `deploy-test.yml` fa lo stesso sul branch `test`.

## Struttura
- `src/pages/`: route (file `index.astro` per ogni cartella). Presenti: `/`, `/servizi/` (+ `siti-web/`, `grafiche/`, `social/`), `/lavori/`, `/metodo/`, `/garanzie/`, `/accessibilita/`, `/prezzi/`, `/preventivo/`, `/chi-siamo/`, `/contatti/`, `/faq/`, `/note-legali/`, `404.astro`, più gli endpoint `robots.txt.ts` e `sitemap.xml.ts`
- `src/layouts/LayoutPagina.astro`: layout delle pagine normali (header, footer, contatti, script di reveal inline)
- `src/components/`: `MetaDocumento.astro` (meta, Open Graph, font, JSON-LD), `Intestazione.astro` (header e menu mobile), `Piede.astro` (footer), `ContattiDinamici.astro` (link contatto e tracking), `ElencoDomande.astro` (FAQ), `TestataSezione.astro` (titolo di sezione)
- `src/data/`: dati reali, fonte unica. `sito.ts` (nome, URL, `canonicalUrl()`), `contatti.ts` (frammenti di contatto), `prezzi.ts` (catalogo commerciale), `configuratore.ts` (voci per tipo di attività), `domande-frequenti.ts` (FAQ)
- `src/lib/catalogo.ts`: unisce catalogo generico e voci su misura (`unione()`, `concetto()`), tipo `Voce`
- `src/scripts/configuratore-preventivo.ts`: logica completa del configuratore (1026 righe, TypeScript tipizzato)
- `src/stili-globali.css`: design system completo, sezioni numerate. `src/styles/variabili.css`: token (colori, font, misure). `src/styles/configuratore.css`: CSS caricato solo su `/preventivo/`
- `public/`: asset statici e file Cloudflare (`_headers`, `_redirects`), `llms.txt`, `site.webmanifest`, logo e immagine Open Graph
- `.github/workflows/`: `deploy-pages.yml` (produzione, branch `main`), `deploy-test.yml` (branch `test`)
- `.opencode/skills/anti-ai-slop/SKILL.md`: regole di revisione grafica e copy, da leggere prima di modificare UI o testi
- `sito.md`: manuale operativo del repo (docs, tenere aggiornato). `comecreare.md`: playbook storico del design system (tono e regole, non dettagli aggiornati). `README.md`: avvio rapido
- Generate o da ignorare (vedi `.gitignore`): `dist/`, `.astro/`, `node_modules/`, `.wrangler/`, `piketelabel/`

## Architettura
- Entry point build: `astro.config.mjs` (config). Entry point home: `src/pages/index.astro`. Entry point configuratore: `src/pages/preventivo/index.astro`, che importa `src/scripts/configuratore-preventivo.ts`
- Flusso pagina normale: le pagine in `src/pages/` → `src/layouts/LayoutPagina.astro` → `MetaDocumento`, `Intestazione`, slot contenuto, `Piede`, `ContattiDinamici` → HTML statico in `dist/` → Cloudflare Pages (con `public/_headers` e `public/_redirects`)
- Flusso configuratore: `preventivo/index.astro` → `configuratore-preventivo.ts` → dati da `src/data/prezzi.ts` e `src/data/configuratore.ts`, uniti da `src/lib/catalogo.ts`. Stato unico `S`; un flusso dichiarativo `flusso()` e rendering per passo `renderizza()`. Nessun header/footer su `/preventivo/`
- Contatti: `src/data/contatti.ts` → assemblati a runtime in `ContattiDinamici.astro` e nel configuratore (attributi `data-wa`, `data-tel`, `data-mail`)
- Moduli: `data` → `lib/catalogo.ts` → `scripts/configuratore-preventivo.ts`. Componenti e pagine importano da `data/`
- Endpoint: `src/pages/sitemap.xml.ts` e `src/pages/robots.txt.ts` sono GET statici che leggono `site.url`

## Dove fare cosa
| Per... | Vai in / crea in | File di esempio da copiare |
|---|---|---|
| Aggiungere una pagina/rotta | Nuova cartella in `src/pages/` con dentro `index.astro` (nome cartella = slug). Poi: URL in `pagine` di `src/pages/sitemap.xml.ts`, voce in `src/components/Intestazione.astro` solo se è una pagina principale | `src/pages/faq/index.astro` |
| Aggiungere un componente | Nuovo file `.astro` in `src/components/`, con `interface Props` | `src/components/TestataSezione.astro` |
| Aggiungere un endpoint API | Non applicabile: sito statico senza API. Solo endpoint GET statici in `src/pages/` | `src/pages/robots.txt.ts` |
| Modificare il database/modelli | Non applicabile: nessun DB. Modelli TypeScript in `src/data/` e tipo `Voce` in `src/lib/catalogo.ts` | `src/data/domande-frequenti.ts` (interfaccia `Faq`) |
| Aggiungere una configurazione | Dominio: `src/data/sito.ts` e `astro.config.mjs` (`PUBLIC_SITE_URL`, vedi sezione Configurazione) | `.env.example` |
| Aggiungere un prezzo o una voce del configuratore | Generica: `src/data/prezzi.ts` (`SITE_EXTRAS`, `SOCIAL_OPTIONS`, `DESIGN_OPTIONS`). Per tipo di attività: `src/data/configuratore.ts` | `src/data/prezzi.ts` |
| Aggiungere una FAQ | `src/data/domande-frequenti.ts` (oggetto `{ q, a, cta? }`) | `src/data/domande-frequenti.ts` |
| Modificare la logica del configuratore | `src/scripts/configuratore-preventivo.ts` | stesso file |
| Aggiungere uno stile o un token | Token in `src/styles/variabili.css`. Classi in `src/stili-globali.css`. CSS del configuratore in `src/styles/configuratore.css` | `src/stili-globali.css` (classi `.btn`, `.btn-mattone`) |
| Scrivere un test | Non applicabile: nessun framework di test. Verifica con `npm run check` e `npm run build` | Non applicabile |

## Convenzioni
- Naming (file, variabili, funzioni, componenti):
  - File e cartelle di pagina: kebab-case in italiano (`note-legali/`, `configuratore-preventivo.ts`, `domande-frequenti.ts`)
  - Componenti Astro: PascalCase in italiano (`MetaDocumento.astro`, `ElencoDomande.astro`)
  - Costanti esportate dai dati: UPPER_SNAKE_CASE (`BASE_PRICES`, `OFFERTA_SITO`, `SITE_EXTRAS`); oggetti e liste: camelCase (`businessTypes`, `featuresByType`)
  - Classi CSS: kebab-case in italiano (`pagina-titolo`, `btn-mattone`, `wizard-barra`)
  - Nomi interni in italiano; le route pubbliche restano stabili (vedi Attenzioni)
- Struttura tipica di un file:
  - Pagine: frontmatter `---` con import, poi `<LayoutPagina title description canonical>`, poi `<section>` con H1 in `pagina-titolo`. Esempio: `src/pages/servizi/social/index.astro`
  - Componenti: frontmatter con `interface Props` e `Astro.props`, poi markup. Esempio: `src/layouts/LayoutPagina.astro`
  - Dati: commento di intestazione, poi `export const`, tipizzato. Esempio: `src/data/prezzi.ts`
- Gestione errori:
  - Script inline della pagina: `try/catch` che fa comparire tutto il contenuto se il JS fallisce. Esempio: `src/layouts/LayoutPagina.astro`
  - Configuratore: validazione per passo con messaggio in `#w-errore`, con `role="alert"`. Vedi `src/pages/preventivo/index.astro`
- Import/alias: nessun alias. `tsconfig.json` non definisce `paths`. Import relativi (`../data/prezzi`, `../lib/catalogo`). Import del CSS dalla pagina: `../../stili-globali.css`
- Stile (formatter, regole lint): nessun formatter o linter configurato. Stile contenuti (da `comecreare.md` e `sito.md`): italiano semplice, nessun trattino lungo nel copy del sito, titoli senza punto finale, prezzi con `€` attaccato (`200€`) tranne la stima finale (`€ 490`)

## Dati
Nessun database. Tutti i dati sono costanti TypeScript in `src/data/`:
- `src/data/prezzi.ts`: `BASE_PRICES` (pagina singola, multipagina), `OFFERTA_SITO` (nome, prezzo, revisioni), `ANTICIPO`, `RATE_SALDO`, liste `SITE_EXTRAS`, `SOCIAL_OPTIONS`, `DESIGN_OPTIONS`, `CHANNELS`, `GOALS`, `TIMINGS`
- `src/data/configuratore.ts`: `businessTypes`, `businessCategories` (una categoria per tipo), `featuresByType`, `extendedFeatures`, `pageOptions`, `photoPrices`, `socialByType`, `designByType`
- `src/data/domande-frequenti.ts`: `FAQS: Faq[]` (`q`, `a`, `cta?`, `ctaAccapo?`). Le FAQ della home si selezionano per testo esatto (`HOME_FAQS` in `src/pages/index.astro`)
- `src/lib/catalogo.ts`: tipo `Voce` (`name`, `price`, `hint?`, `concept?`). Due voci con lo stesso `concept` sono la stessa cosa: la voce su misura ha precedenza
- `src/data/sito.ts`: `site` (nome, URL, lingua `it`, descrizione) e `canonicalUrl()`
- `src/scripts/configuratore-preventivo.ts`: stato `Stato` / `S` (nome, categoria, tipo, servizi, struttura, funzioni, pagine, foto, canali, obiettivi, tempi, privacy)

## Configurazione
- `PUBLIC_SITE_URL`: dominio del sito. Letta in build da `astro.config.mjs` e `src/data/sito.ts`. Se assente, il default è `https://treblastudio.pages.dev`. Serve un nuovo deploy dopo ogni cambio. Esempio in `.env.example`
- `CLOUDFLARE_API_TOKEN`: secret GitHub Actions per il deploy Pages (permesso Cloudflare Pages: Edit). Usato in `.github/workflows/deploy-pages.yml` e `deploy-test.yml`. Non va scritto nel repo
- `CLOUDFLARE_ACCOUNT_ID`: impostato come variabile d'ambiente nei due workflow (non è un secret)
- Autenticazione Wrangler in locale per `npm run deploy*`: DA VERIFICARE (non è documentata nel repo; `.dev.vars` e `.wrangler/` sono in `.gitignore`)
- Node: 22 nei workflow (`actions/setup-node`). Versione locale: DA VERIFICARE (`sito.md` riporta Node 24)

## Attenzioni
- Contatti: numero WhatsApp ed email mai in chiaro nell'HTML e mai scritti in altri file. Modificare solo `src/data/contatti.ts`
- Tracking duplicato: la funzione `traccia` esiste in `src/components/ContattiDinamici.astro` e in `src/scripts/configuratore-preventivo.ts`. Cambiarne una significa cambiare anche l'altra. Solo `dataLayer` con eventi `trebla_*`, niente pixel
- Prezzi: una sola fonte (`src/data/prezzi.ts` e `configuratore.ts`). Nelle pagine e in `src/pages/` non risultano prezzi scritti a mano (grep verificato per 399 e 490). `sito.md` (sezioni 13.1 e 14) descrive copy hardcoded che non ho trovato: controllare prima di crederlo
- Route pubbliche stabili: `/servizi/`, `/prezzi/`, `/chi-siamo/`, `/preventivo/`, `/contatti/`, `/faq/`, `/note-legali/`. Non cambiarle. Redirect in `public/_redirects`
- Slash finale: `trailingSlash: 'always'`. Canonical, sitemap e link interni usano `/servizi/`, non `/servizi`
- Sitemap manuale: la lista `pagine` in `src/pages/sitemap.xml.ts` non si aggiorna da sola
- `public/llms.txt` contiene 9 righe con il dominio scritto a mano: va aggiornato a mano se cambia il dominio. Anche `urlOfferta` in `src/pages/prezzi/index.astro` contiene il dominio fisso
- Font: solo woff2, `@font-face` scritta in `MetaDocumento.astro`. Non importare i CSS di Fontsource (trascinano anche `.woff`)
- Script inline: `<script is:inline>` in `LayoutPagina.astro` e nei componenti. Non convertirli in script processati da Astro: creano chunk esterni
- `/preventivo/` non ha header e footer (non importa `Intestazione` né `Piede`): non aggiungerli senza decisione di design. Importa anche `configuratore.css`
- `src/pages/note-legali/index.astro` è `noindex` e fuori dalla sitemap. `404.astro` è `noindex` di proposito
- Configuratore: `setTipo()` azzera molte scelte; se aggiungi un campo, azzeralo anche lì. Il passo `funzioni` appare solo se il tipo ha voci (`funzioniPerTipo()`)
- `--wizard-barra` è misurata a runtime: non sostituirla con un numero fisso
- `npm run check` ha completato in pochi secondi con 0 errori nella verifica di questo file (`sito.md` avverte che può restare appeso). La verifica affidabile resta `npm run build`
- `sito.md` dice "9 pagine HTML": è superato. La build produce 16 pagine (verificato)
- `sito.md` è la fonte operativa dichiarata, ma è in parte datato: il codice in `src/` vince sempre
- Deploy: il push su `main` deploya via GitHub Actions. In locale usare `npm run deploy` solo dopo build pulita
- Non creare `dist/`, `.astro/` o `node_modules/` a mano: sono generati e ignorati da Git

## Manutenzione
Aggiorna questo file quando cambiano struttura, comandi, dipendenze o convenzioni.

# Come creare (metodo Trebla)

Regole e stack per creare un sito fatto come TreblaStudio: veloce,
onesto e riconoscibile. Niente template travestiti.

## 1. Stack

- Astro 4, output statico (`output: "static"`), TypeScript stretto.
- Deploy Vercel con `vercel.json` (redirect, header di sicurezza, cache asset).
- Font self-hosted via Fontsource: solo pesi usati, solo `woff2`,
  `@font-face` scritta a mano (i CSS di fontsource trascinano anche i `.woff`).
- Immagini ottimizzate con Sharp, dimensioni reali dichiarate
  (`width`/`height` + `aspect-ratio` in CSS), `fetchpriority` e preload
  solo per LCP.
- Zero dipendenze runtime salvo motivo vero. Niente framework CSS.

## 2. Design system "Quaderno di bottega"

- Token CSS in un solo file: carta, inchiostro, mattone, linea, raggio.
- Titoli serif (Fraunces), corpo sans (Archivo), prezzi ed etichette mono.
- Righe ledger con bordi inchiostro da 1px, niente ombre morbide,
  niente gradienti, niente glass, niente neon.
- Bottoni come righe grandi (min 58px) con quadratino ○/● stato.
- Una sola animazione sobria (reveal), con `prefers-reduced-motion`.
- Mobile-first, `overflow-x: clip`, touch target min 44px.

## 3. Contenuti e tono

- Italiano semplice e concreto. Mai il trattino lungo —.
- Titoli senza punto finale. Prezzi con € attaccato (300€), tranne la
  cifra finale della stima che resta staccata (€ 590).
- Solo dati veri in `src/data/` (prezzi, faq, configuratore): mai clienti,
  recensioni, classifiche ("il più scelto") o numeri inventati.
- Esempi e mockup riconoscibili come tali, mai spacciati per clienti.
- Ogni prezzo, tempo e limite scritto prima di iniziare. Termini e
  condizioni che proteggono chi vende: anticipo non rimborsabile, niente
  pubblicazione senza saldo, revisioni definite, foro competente.

## 4. Privacy e contatti

- Telefono ed email mai in chiaro nell'HTML: assemblati via JS con
  `data-wa`, `data-mail`, `data-tel`.
- Pagina note legali con privacy, cookie e termini. `noindex`.
- Tracking solo tramite `dataLayer` con eventi propri, niente pixel.

## 5. SEO

- Title/description unici per pagina, canonical, Open Graph + Twitter card,
  `og:image` 1200×630, favicon SVG, `site.webmanifest`.
- JSON-LD coerente (Organization, Service + Offerte, FAQPage dalla stessa
  fonte dati delle FAQ visibili).
- `sitemap.xml` e `robots.txt` generati, `public/llms.txt` aggiornato.

## 6. Performance (Lighthouse 100)

- CSS inline (`inlineStylesheets: 'always'`), preload ordinati LCP-first,
  niente pesi font inutilizzati, niente `.woff`/`.ttf` nel build.
- HTML sotto controllo: niente nodi inutili, niente JS che legge geometrie.
- Testi LCP senza `data-reveal` sopra: dipingono subito, senza aspettare JS.

## 7. Wizard / configuratore

- Un passo, una domanda. Liste intere, mai paginate. Reset sempre da zero.
- Stima live coerente tra riepilogo, messaggio WhatsApp (con UTM) ed email.
- Validazione per passo con messaggi concreti. Passi saltabili solo se
  dichiarati tali. Deep link con query (`?offerta=1`) per ingressi diretti.
- Stati e prezzi mai duplicati: una sola fonte in `src/data/`.

## 8. Flusso di lavoro

1. Modifica, `npm run build` pulita (9 pagine, zero errori).
2. `git add` solo i file voluti, commit con messaggio chiaro, push.
3. `vercel --prod --yes`, verifica READY.
4. Mai commit di file altrui per sbaglio: kit locali in `.gitignore`.

## 9. Anti-AI-slop (revisione obbligatoria)

- Direzione artistica in una riga prima del codice. Tre scelte concrete
  che rendono il sito riconoscibile, o ci si ferma.
- Divieti: hero centrati generici, griglie di card identiche, badge senza
  prove, superlativi vuoti, sezioni riempitive, decorazioni senza funzione.
- Punteggio genericità 0-30 dopo ogni modifica visiva; top-3 problemi con
  file e riga, corretti e ricontrollati.
- Non dichiarare verificato ciò che non si è verificato (qui niente
  screenshot browser: verifica su build + codice).
- Dettagli completi in `.opencode/skills/anti-ai-slop/SKILL.md`.

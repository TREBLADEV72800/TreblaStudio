# TreblaStudio · guida per agenti

Sito vetrina di **Trebla** (studio web di Asti, solo sul posto ad Asti).
Astro 4 statico, deploy su Vercel. Produzione: https://treblastudio.vercel.app

Regola d'oro: non taxo il design e i testi a modifica non esplicitamente chiesta.
Leggi prima `.opencode/skills/anti-ai-slop/SKILL.md`.

## Stack e comandi

- Astro 4 (`output: static`), TypeScript, zero framework UI, zero dipendenze oltre ai font.
- CSS custom inline nel build (`inlineStylesheets: 'always'`): niente file CSS che blocca il rendering.
- Verifica affidabile: `npm run build` (9 pagine, deve finire senza errori).
  `npm run check` può rimanere appeso dopo aver dato output corretto: non è un errore.
- Deploy: `vercel --prod --yes`. Il push su main NON auto-deploya.
- Dominio sovrascrivibile: `PUBLIC_SITE_URL` (astro.config.mjs e data/site.ts lo leggono in patterns identici).

## Struttura

```
src/
  data/           dati reali, unica fonte di verità
    site.ts         nome, url, lang, description, canonicalUrl()
    contatti.ts     frammenti numero WhatsApp/email (mai in chiaro nell'HTML)
    prezzi.ts       catalogo commerciale: BASE_PRICES (300/400), OFFERTA_SITO (590€,
                    3 revisioni), SITE_EXTRAS (tutti 0€ = "incluso"), SOCIAL_OPTIONS,
                    DESIGN_OPTIONS, CHANNELS, VIDEO_PRICE (20€), GOALS, TIMINGS
    configuratore.ts voci su misura per tipo di attività; funzioni/pagine a 0€
    faq.ts          FAQS (question/answer + cta opzionali)
  lib/
    catalogo.ts     tipo Voce + CONCETTI + concetto() + unione() (filtro doppioni)
  components/
    Head.astro      meta, OG, twitter, JSON-LD (Organization + ProfessionalService
                    + WebSite), @font-face woff2 (solo latin, preloaded), favicon, manifest
    Header.astro    sticky, logo, nav desktop, CTA "Preventivo in 2 minuti",
                    menu mobile overlay + script (blocca scroll iOS, trap focus, ESC)
    Footer.astro    notte, logo invertito, contatti (link data-*), legale, "Torna su"
    Contatti.astro  script che assembla contatti runtime → link data-wa/data-tel/data-mail;
    Faq.astro       <details>/<summary> da Faq[]
    Capitolo.astro  testata sezione: numero · titolo (set:html, em = corsivo mattone) + nota
  layouts/Layout.astro   pagina normale: skip-link, Header, main, Footer, Contatti,
                         reveal con IntersectionObserver (fallbacks: reduced motion,
                         no IO, errori → tutto visibile)
  pages/
    index.astro           hero + mockup scheda, ticker settori, benefici, servizi (indice),
                          metodo (5 passi), prezzi (3 card, evidenziata offerta), studio,
                          FAQ (5 selezionate da FAQS), cta finale WhatsApp
    servizi/index.astro   3 articoli servizio con ancore #sito #grafiche #social
    prezzi/index.astro    listino + offerta (usa OFFERTA_SITO) + extra ( disbelief loop
                          su DESIGN_OPTIONS / SOCIAL_OPTIONS) + JSON-LD Service
    preventivo/index.astro pagina a sé, non usa Layout: usa Head e importa
                          styles.css + wizard.css + scripts/wizard.ts
    chi-siamo/index.astro  Albert (sviluppo), Gabriel (design/social), un lavoro: Pikete Label
    contatti/index.astro, faq/index.astro (JSON-LD FAQPage), note-legali/index.astro, 404.astro
    robots.txt.ts, sitemap.xml.ts   endpoint generati
  styles.css        design system completo (sezioni numerate nei commenti)
  styles/tokens.css token: carta/inchiostro/mattone/notte, --serif Fraunces,
                    --sans Archivo, --mono IBM Plex Mono, dimensioni
  styles/wizard.css solo per il configuratore (schermo intero, barra fissa)
```

`dist/` build. `public/` favicon.svg, trebla-logo.webp (header, chiara su carta),
trebla-logo-transparent.png (footer, invertita su notte), og-trebla.jpg, llms.txt, site.webmanifest.
`comecreare.md` è il playbook storico del design system.

## Roba da non rompere (le insidie)

- Contatti mai in chiaro nel markup: i frammenti viaggiano in un JSON (tag script
  + id `trebla-contatti`), assemblato a runtime dallo script inline di
  `components/Contatti.astro` con i data-* attributes. Anche note-legali lo usa.
- Tracking (dataLayer, eventi `trebla_*`, niente pixel): la funzione è riscalata
  in DUE copie gemelle, `components/Contatti.astro` e `scripts/wizard.ts`: essere
  in un file importato crea un chunk separato → catena di caricamento a 3 livelli
  nel Lighthouse (albero delle dipendenze). Cambiare una copia cambia l'altra.
- Script di base (menu header, reveal, contatti, torna-su) sono `is:inline` con
  JS puro (niente TS) in IIFE: **zero chunk JS esterni** sulle pagine normali;
  l'unico chunk resta wizard.ts, solo su /preventivo, flat. Non riconvertirl
  in `<script>` processati: ricreerebbe il nesting del bundler.
- Offerta Tutto incluso 590€: nel wizard, la scelta `struttura: 'offerta'` toglie
  passi e voci (logo, foto, funzioni, pagine) e libro il logo dalle grafiche
  (`designVisibili`). Il deep-link `?offerta=1` preseleziona tutto
  (`offertaDiretta` corto il flusso). FAQ linka `?offerta=1`.
- Regola "una voce, un prezzo": le voci generiche il cui concetto è già coperto da
  una voce per tipo non si ripetono (lib/catalogo.ts `unione`, concetti extra come
  prenotazioni dedotti con una regex su nomi funzioni).
- Funzioni/pagine del sito hanno prezzo 0 → `euro()` mostra "incluso".
  Grafica/social/video/foto restano a pagamento.
- Prezzi: pagina singola 300€ esatti (non "da 300€"), multipagina 400€, anticipo 30€.
  Cambiare i prezzi significa toccare: data/prezzi.ts → data/configuratore.ts →
  la copia di pagina (index, prezzi, servizi, faq) → JSON-LD in prezzi/index.astro.
- Fonts in Head.astro importati a mano come woff2 con unicode-range latin;
  gli import fontsource nativi trascinavano anche .woff nel build: non eliminare.
- Header menu mobile: body fissato con position:fixed + restore scroll; iOS quirk.
- Altezza barra fissa del wizard pubblicata in `--wizard-barra` con ResizeObserver
  (safe-area, rotazione). wizard.css la usa come padding-block-end.
- Nella nota legale (noindex) `styles/tokens.css` è importato da solo, senza styles.css.
- `prefers-reduced-motion` coperto ovunque (reveal, ticker, scroll, menu).
- vercel.json: redirect /privacy /cookie /termini → note-legali, header di
  sicurezza globali, cache immutabile per /_astro/* e immagini.
- llms.txt in public/ descrive il sito in linguaggio agent: ideal coherence.

## Wizard (`scripts/wizard.ts`): i fatti in 6 righe

1. `flusso()` calcola i passi invisibili esistenti per stato e tipologia ("Altro" ha un flusso USPS dipendente).
2. `renderizza()` distruttivo: un passo un `if`, markup creato in DOM con helpers `el()` / `opzione()` / `listaOpzioni()`.
3. `sincronizza()` legge i checked visibili del gruppo e aggiorna S (mantiene le scelte ancora visibili).
4. `stima()` e `messaggio()` ricostruiscono tutto da S: prezzi e testo WhatsApp/derivati mail.
5. Validazione in `valido()` per passo + `mancantiRiepilogo()` per l'invio finale (obbligatori privacy e complementarietà).
6. Preselezione da querystring `?servizi=sito,grafiche,social` e `?offerta=1`.

## Convenzioni

- Commenti in italiano, brevi, solo dove serve capire il perché.
- Niente codice morto: selettore, export o asset non usati si cancellano e si verifica con grep + build.
- Classi in italiano (sopra, piede, capitolo, involucro...), =="Quaderno di bottega"==: leggi la skill.
- Mai il trattino lungo — nei contenuti del sito. Titoli senza punto.
- aria-labelled-by + `Capitolo id` legano sezioni/titoli; focus visible AA ovunque.

## Checklist modifica → live

1. `npm run build` pulito (9 pagine). Convenzioni da proteggere: zero chunk JS
   esterni sulle pagine normali (script di base `is:inline`), wizard.ts verso
   unico chunk (spesso flusso flat, no import annidati in `dist/_astro/*.js`).
2. `vercel --prod --yes`.
3. Controllare live: home, preventivo (menu mobile, flusso completo, invio),
   nota legale se toccata.

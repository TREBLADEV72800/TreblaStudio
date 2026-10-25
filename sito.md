# TreblaStudio: manuale operativo per agenti

Questo file è la fonte di verità operativa del repository. Serve a lavorare senza rileggere tutto il progetto: qui trovi mappa dei file, dati, flussi, regole SEO, CSS, performance, deploy e ricette per le modifiche più comuni.

Gerarchia delle fonti:

1. Il codice e i dati in `src/` vincono su qualsiasi documento.
2. Questo `sito.md` è il manuale operativo da tenere aggiornato.
3. `README.md` è una scorciatoia di avvio.
4. `comecreare.md` è il playbook storico del design system: utile per il tono, non per i dettagli aggiornati.
5. `.opencode/skills/anti-ai-slop/SKILL.md` va letto prima di modificare UI o copy.

Ultimo aggiornamento: 25 ottobre 2026.

---

## 1. Identità, stack e stato

| Voce | Valore |
|---|---|
| Progetto | Trebla, studio web indipendente ad Asti |
| Sito live | https://treblastudio.pages.dev |
| Dominio .it | `treblastudio.it` non risolve e non risulta registrato al 24/10/2026. Non usarlo in canonical, sitemap o JSON-LD |
| Lingua | Italiano |
| Stack | Astro 4.16.19, `output: 'static'`, TypeScript `strictest` |
| Node verificato | 24.19.0 |
| npm verificato | 12.0.2 |
| Framework UI | Nessuno |
| CSS | CSS custom, inline nel build |
| Dati | File TypeScript in `src/data/`, nessun CMS |
| Deploy | Cloudflare Pages, progetto `treblastudio`, comando `npm run deploy` |
| Pagine HTML | 9 |
| JS esterno | Solo `/preventivo`, un unico chunk piatto |
| Test automatici | Nessuno: la verifica è build + controllo manuale |
| Lint/formatter | Nessun linter o formatter configurato |

Stato del repository:

- Branch: `main`.
- Ultimo commit noto: `3df05b7 Perf reale: script di base inline (is:inline), zero chunk JS su pagine normali`.
- Le modifiche di rinomina file, SEO e fix sono state deployate ma non tutte committate. `git status` mostra rinomine staged e modifiche unstaged.
- Ultimo deploy produzione verificato: `b38fdbe0-2d90-4bad-9348-76e8ab2e516f`, ambiente Production su `https://treblastudio.pages.dev`.
- La produzione è pubblica. Le preview Cloudflare Pages vivono su URL `*.pages.dev` del deployment e non sono protette da password salvo configurazione esplicita.

Comandi principali:

| Comando | Quando | Cosa aspettarsi |
|---|---|---|
| `npm install` | Prima volta o dopo modifiche a `package.json` | Installa Astro, fontsource, sharp, TypeScript |
| `npm run dev` | Sviluppo locale | Server su `http://localhost:4321` |
| `npm run build` | Verifica obbligatoria prima di consegnare | 9 pagine HTML, `robots.txt`, `sitemap.xml` |
| `npm run preview` | Controllo del build statico | Serve `dist/` in locale |
| `npm run check` | Controllo tipi | Può restare appeso dopo aver stampato 0 errori: non è un errore del codice |
| `npm run deploy` | Deploy in produzione | Build + `wrangler pages deploy` su Cloudflare Pages; il push su Git non deploya da solo |

`npm run check` è utile ma non è la verifica che sblocca la consegna. La verifica affidabile è `npm run build`. Se `check` resta appeso dopo l'output corretto, non uccidere processi a caso e non dichiarare errori inesistenti.

---

## 2. Regole non negoziabili

Queste regole spiegano il perché di molte scelte. Se una modifica le viola, probabilmente sta rompendo il progetto.

1. **Solo dati veri.** Niente clienti, recensioni, numeri, classifiche, premi o credenziali inventate. L'unico lavoro pubblicato è Pikete Label. I mockup della home sono esempi dichiarati, non clienti.
2. **Una voce, un prezzo.** Il catalogo commerciale sta in `src/data/prezzi.ts`; le voci su misura per tipo di attività stanno in `src/data/configuratore.ts`. Si uniscono in `src/lib/catalogo.ts`. Non duplicare prezzi in altri file dati.
3. **Contatti mai in chiaro nell'HTML.** Numero WhatsApp ed email sono frammenti in `src/data/contatti.ts`. Vengono assemblati a runtime da `ContattiDinamici.astro` e dal configuratore. Non scrivere `mailto:`, `tel:` o `wa.me/` con valori reali nel markup.
4. **Script di base inline.** Menu, reveal, contatti e torna-su sono `<script is:inline>` con JS puro. Non convertirli in script processati da Astro: creerebbero chunk esterni e catene di caricamento sulle pagine normali.
5. **Tracking in due copie gemelle.** La funzione `traccia` esiste in `ContattiDinamici.astro` e in `configuratore-preventivo.ts`. Se cambi una, cambia l'altra. Solo `dataLayer`, eventi `trebla_*`, niente pixel o analytics esterni.
6. **Offerta Tutto incluso.** Nel configuratore la struttura `offerta` vale 590€, include tutte le funzioni, tutti gli extra, tutte le pagine, foto scattate da Trebla, logo nuovo o rinnovato e 3 modifiche gratuite. Con l'offerta il logo non va riproposto a pagamento.
7. **Font solo woff2.** `MetaDocumento.astro` importa cinque file woff2 e scrive `@font-face` a mano. Non importare i CSS di Fontsource: trascinano anche `.woff` e appesantiscono il build.
8. **Copy italiano, concreto, senza trattino lungo.** Non usare il trattino lungo nei contenuti del sito. Titoli SEO senza punto finale; l'H1 della home chiude con un punto per scelta editoriale. Prezzi con `€` attaccato al numero (`300€`), tranne la cifra finale della stima che resta staccata (`€ 590`).
9. **URL pubblici stabili.** Non cambiare `/servizi`, `/prezzi`, `/chi-siamo`, `/preventivo`, `/contatti`, `/faq`, `/note-legali`. I nomi dei file interni possono essere descrittivi, gli slug pubblici no. Cloudflare Pages li serve con lo slash finale (`/servizi/`, `/prezzi/`): canonical, sitemap e link interni usano quella forma.
10. **Dominio build-time.** `PUBLIC_SITE_URL` viene letto in build da `astro.config.mjs` e `src/data/sito.ts`. Canonical, sitemap e JSON-LD dipendono da quel valore: dopo averlo cambiato serve un nuovo deploy.
11. **Build pulita con 9 pagine.** Se il build non arriva a 9 pagine HTML, manca una route o una pagina è stata rotta.
12. **Non reinventare il design.** Prima di una modifica UI leggi la skill anti-ai-slop. Il sistema è "Quaderno di bottega": carta, inchiostro, mattone, righe da 1px, Fraunces, Archivo, IBM Plex Mono.
13. **Accessibilità e movimento ridotto.** Focus visibile, contrasto AA, landmark, testi alternativi, `prefers-reduced-motion` ovunque. Non rimuovere outline o fallback.
14. **Deploy solo dopo verifica.** Modifica codice: build, deploy, controllo live. Modifica solo documentazione: nessun deploy necessario.

---

## 3. Mappa completa del repository

```text
TreblaStudio/
  package.json                  Script npm e dipendenze
  package-lock.json             Lockfile npm
  astro.config.mjs              Config Astro: site, output static, CSS inline, sharp
  tsconfig.json                 TypeScript strictest + tipi Astro
  .env.example                  Esempio PUBLIC_SITE_URL
  .gitignore                    Esclude dist, node_modules, .astro, .wrangler, piketelabel/
  README.md                     Avvio rapido e struttura, secondario
  comecreare.md                 Playbook storico del design system, secondario
  sito.md                       Questo manuale operativo

  public/
    _headers                    Header sicurezza e cache (Cloudflare Pages)
    _redirects                  Redirect legali (Cloudflare Pages)
    favicon.svg                 Favicon SVG
    og-trebla.jpg               Immagine Open Graph 1200x630
    site.webmanifest            Manifest PWA
    trebla-logo.webp            Logo header, 200x113
    trebla-logo-transparent.png Logo footer, 240x136
    llms.txt                    Descrizione del sito per agenti, URL assoluti hardcoded

  src/
    env.d.ts                    Tipi Astro + Window.dataLayer
    stili-globali.css           Design system completo, sezioni numerate
    styles/
      variabili.css             Token: colori, font, tipografia, misure
      configuratore.css         Solo CSS del configuratore

    data/
      sito.ts                   Nome, URL, lingua, descrizione, canonicalUrl()
      contatti.ts               Frammenti WhatsApp ed email
      prezzi.ts                 Catalogo commerciale canonico
      configuratore.ts          Voci su misura per tipo di attività
      domande-frequenti.ts      FAQS con CTA opzionali

    lib/
      catalogo.ts               Tipo Voce, concetti, unione e deduplica

    components/
      MetaDocumento.astro       Meta, OG, font, JSON-LD, manifest
      Intestazione.astro        Header sticky, nav desktop, menu mobile
      Piede.astro               Footer, contatti, legale, torna su
      ContattiDinamici.astro    Assemblaggio contatti + tracking
      ElencoDomande.astro       FAQ con details/summary
      TestataSezione.astro      Testata numero + titolo + nota

    layouts/
      LayoutPagina.astro        Layout delle pagine normali + reveal

    pages/
      index.astro               Home
      servizi/index.astro       Servizi
      prezzi/index.astro        Prezzi
      preventivo/index.astro    Configuratore a schermo intero
      chi-siamo/index.astro     Studio e lavori
      contatti/index.astro      Contatti
      faq/index.astro           Tutte le FAQ
      note-legali/index.astro   Privacy, cookie, termini, noindex
      404.astro                 Pagina non trovata
      robots.txt.ts             Endpoint robots
      sitemap.xml.ts            Endpoint sitemap

    scripts/
      configuratore-preventivo.ts  Logica completa del configuratore
```

Cartelle generate o fuori scope:

- `dist/`: build statico. Non modificare a mano.
- `.astro/`: tipi generati da Astro.
- `node_modules/`: dipendenze.
- `.wrangler/`: stato locale di Wrangler, ignorato da Git.
- `piketelabel/`: cartella ignorata da Git, contiene solo un README di un kit separato. Non fa parte del sito.
- `.opencode/`: skill e configurazione dell'agente.

### 3.1 Nomi vecchi e nuovi

I file sono stati rinominati in italiano descrittivo. Se un documento o un errore cita un nome vecchio, la mappa è questa:

| Vecchio nome | Nuovo nome |
|---|---|
| `src/components/Head.astro` | `src/components/MetaDocumento.astro` |
| `src/components/Header.astro` | `src/components/Intestazione.astro` |
| `src/components/Footer.astro` | `src/components/Piede.astro` |
| `src/components/Contatti.astro` | `src/components/ContattiDinamici.astro` |
| `src/components/Faq.astro` | `src/components/ElencoDomande.astro` |
| `src/components/Capitolo.astro` | `src/components/TestataSezione.astro` |
| `src/layouts/Layout.astro` | `src/layouts/LayoutPagina.astro` |
| `src/data/site.ts` | `src/data/sito.ts` |
| `src/data/faq.ts` | `src/data/domande-frequenti.ts` |
| `src/scripts/wizard.ts` | `src/scripts/configuratore-preventivo.ts` |
| `src/styles.css` | `src/stili-globali.css` |
| `src/styles/tokens.css` | `src/styles/variabili.css` |
| `src/styles/wizard.css` | `src/styles/configuratore.css` |

I nomi vecchi non esistono più. Non ricrearli e non aggiornare solo un import: cerca eventuali riferimenti residui con `Select-String` o `rg`.

---

## 4. Modello dati

Tutti i dati reali stanno in `src/data/`. Nessun dato va inventato fuori da questi file.

### 4.1 `src/data/sito.ts`

Contiene:

```ts
export const site = {
  name: 'Trebla',
  url: import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblastudio.pages.dev',
  lang: 'it',
  locale: 'it_IT',
  description: 'Trebla è uno studio indipendente ad Asti. Costruiamo siti web chiari per piccole attività: ristoranti, negozi, artigiani, professionisti. Da 300€, senza canone obbligatorio.',
  twitterCard: 'summary_large_image',
};

export function canonicalUrl(path: string) { ... }
```

Regole:

- `site.url` non ha slash finale. `canonicalUrl()` lo toglie comunque.
- `canonicalUrl('/prezzi')` restituisce `https://dominio/prezzi/`: Cloudflare Pages serve le directory con lo slash finale (`/prezzi` risponde 308).
- `canonicalUrl('/')` restituisce `https://dominio/`.
- `canonicalUrl('/404')` resta `https://dominio/404`: è la pagina di errore, `noindex`.
- `site.description` è il fallback usato da `LayoutPagina` se una pagina non passa una description.
- `site.name` è usato in OG e JSON-LD; nel `<title>` basta la stringa `Trebla`.
- `PUBLIC_SITE_URL` è letto in build, non a runtime. Cambiarlo richiede un nuovo build e deploy.

Cambiare dominio:

1. Aggiorna `.env.example` e `PUBLIC_SITE_URL` nelle variabili di build di Cloudflare Pages.
2. Aggiorna `src/data/sito.ts` solo se vuoi cambiare il fallback locale.
3. Aggiorna `public/llms.txt` (URL assoluti hardcoded).
4. Aggiorna il link di condivisione in `src/pages/prezzi/index.astro` (contiene `treblastudio.pages.dev`).
5. Cerca eventuali altri riferimenti con `rg "treblastudio\.pages\.dev|treblastudio\.it"`.
6. Fai build e deploy, poi verifica canonical, sitemap, robots, OG e JSON-LD live.

### 4.2 `src/data/contatti.ts`

Contiene i frammenti:

```ts
export const contatti = {
  whatsapp: ['...', '...', '...', '...'],
  email: ['...', '...', '...', '@', '...', '...'],
} as const;

export const numeroWhatsapp = () => contatti.whatsapp.join('');
export const indirizzoEmail = () => contatti.email.join('');
```

Regole:

- Non duplicare numero o email in altri file.
- Non scrivere il numero o l'email uniti nel markup.
- `ContattiDinamici.astro` serializza i frammenti in un JSON con id `trebla-contatti`, poi uno script inline costruisce i link `data-wa`, `data-tel`, `data-mail`.
- Il configuratore importa `numeroWhatsapp()` e `indirizzoEmail()` e li usa per WhatsApp e mail.
- I link partono da `href="#"` e vengono riempiti a runtime. Senza JavaScript restano inattivi: è una scelta accettata per non mettere i contatti in chiaro.
- `data-mostra` fa scrivere l'email nel testo del link. `data-soggetto` aggiunge un subject alla mail.
- Cambiare i contatti: modifica solo questo file. Non toccare i componenti.

### 4.3 `src/data/prezzi.ts`

È il catalogo commerciale canonico. Tutti i prezzi sono interi in euro.

| Export | Tipo | Valore |
|---|---|---|
| `BASE_PRICES` | oggetto | `singola: 300`, `multi: 400` |
| `OFFERTA_SITO` | oggetto | `nome: 'Offerta Tutto incluso'`, `prezzo: 590`, `revisioni: 3` |
| `SITE_EXTRAS` | `Voce[]` | 5 funzioni del sito, tutte a 0€ (incluse) |
| `SOCIAL_OPTIONS` | `Voce[]` | 3 voci generiche: profili 20€, video 20€, storie 10€ |
| `DESIGN_OPTIONS` | `Voce[]` | 8 voci generiche da 10€ o 20€ |
| `CHANNELS` | tupla | `Instagram`, `Facebook`, `TikTok` |
| `VIDEO_PRICE` | numero | `20` |
| `GOALS` | tupla | 4 obiettivi |
| `TIMINGS` | tupla | 3 tempi |

`SITE_EXTRAS`:

- Prenotazioni e ordini su WhatsApp, 0€, concetto `prenotazioni`.
- Copywriting completo, 0€, concetto `copy`.
- Versione inglese essenziale, 0€, concetto `inglese`.
- SEO locale: Google Business + mappe, 0€, concetto `seo`.
- Feed Instagram integrato nel sito, 0€, concetto `feed`.

`SOCIAL_OPTIONS`:

- Profili sistemati da zero, 20€, concetto `profili`.
- Filmati e brevi video, 20€, concetto `video`.
- Grafiche per post e storie, 10€, concetto `storie`.

`DESIGN_OPTIONS`:

- Logo creato o rinnovato, 20€, concetto `logo`.
- Biglietti da visita pronti per la stampa, 10€, concetto `biglietti`.
- Volantini, locandine o menu cartaceo, 20€, concetto `volantini`.
- Grafiche promozionali per il web, 10€, concetto `promo-web`.
- Identità completa: colori + font + regole, 20€, concetto `identita`.
- Modelli post social coordinati, 20€, concetto `modelli`.
- Design adesivi / packaging (solo grafica), 20€, concetto `adesivi`.
- Design maglietta / divisa (solo grafica), 20€, concetto `maglietta`.

Regole:

- `SITE_EXTRAS` e le pagine del sito hanno prezzo 0: `euro(0)` restituisce `incluso`.
- Le voci generiche possono essere filtrate se una voce su misura copre lo stesso concetto.
- `OFFERTA_SITO.revisioni` è l'unico dato sulle revisioni. Le 2 revisioni dei pacchetti base sono solo nel copy, non in una costante: se cambi la policy, cerca `due revisioni`, `2 revisioni`, `due giri`, `revisioni` in pagine, FAQ, note legali e `llms.txt`.
- L'anticipo di 30€ non è una costante: è scritto nel copy del configuratore, delle FAQ e delle note legali. Cerca `30€` prima di cambiarlo.
- La cifra finale della stima usa `€ ${stima()}` con lo spazio, per leggibilità. I prezzi nel corpo usano `300€`, `+20€`, `incluso`.

### 4.4 `src/data/configuratore.ts`

Contiene solo le voci su misura per tipo di attività. Il catalogo generico resta in `prezzi.ts`.

| Export | Tipo | Dimensione al 24/10/2026 |
|---|---|---|
| `businessTypes` | `string[]` | 30 tipi |
| `businessCategories` | `Record<string, string[]>` | 6 categorie, 29 tipi categorizzati |
| `featuresByType` | `Record<string, Voce[]>` | 29 chiavi, da 2 a 6 funzioni, tutte 0€ |
| `extendedFeatures` | `Record<string, Voce[]>` | 1 chiave: Agriturismo / Cantina, 1 voce |
| `pageOptions` | `Voce[]` | 6 pagine, tutte 0€ |
| `photoPrices` | `Record<string, number>` | 3 opzioni |
| `socialByType` | `Record<string, Voce[]>` | 29 chiavi, 3 contenuti per tipo, 10€ o 20€ |
| `designByType` | `Record<string, Voce[]>` | 29 chiavi, da 1 a 3 materiali, 10€ o 20€ |

Categorie e tipi:

| Categoria | Tipi |
|---|---|
| Ristorazione | Ristorante o bar, Rosticceria o asporto, Pizzeria / Paninoteca, Gelateria / Pasticceria, Macelleria / Gastronomia, Enoteca / Vini sfusi |
| Ospitalità | Hotel o B&B, Struttura ricettiva, Agriturismo / Cantina |
| Bellezza e benessere | Salone di bellezza o parrucchiere, Barbiere, Centro estetico, Palestra / Centro fitness |
| Commercio | Negozio o bottega, Abbigliamento / Boutique, Fioraio / Vivaio, Ferramenta / Colorificio, Erboristeria / Agricola, Cartoleria / Copisteria |
| Artigiani e officine | Falegnameria, Artigiano o impresa, Impresa edile / Idraulico / Elettricista, Autofficina / Carrozzeria, Gommista / Autolavaggio, Lavanderia / Stireria |
| Servizi e professioni | Noleggio bici / Escursioni, Professionista, Associazione / Pro Loco, Fotografo / Videomaker |

`Altro` è il trentesimo tipo, fuori dalle categorie. Ha una lista `featuresByType` di 4 voci, ma non ha liste `socialByType` o `designByType`: in quei passi vede solo le voci generiche.

`pageOptions`:

- Pagina Principale
- Chi Siamo: storia e team
- Servizi, Prodotti o Menu
- Eventi e galleria fotografica
- Contatti e prenotazioni
- Domande Frequenti

`photoPrices`:

- Ho già le foto: 0€
- Servono le foto (le scattate voi): 20€
- Parto da zero: 10€

`extendedFeatures` serve per voci che non stanno nella lista principale del tipo. Oggi contiene solo `Agriturismo / Cantina` con `Camere e disponibilità su richiesta` a 0€.

Regole:

- Una voce su misura ha la precedenza su una generica con lo stesso concetto.
- Non inserire due volte la stessa voce con nomi diversi: usa `concept` o la mappa `CONCETTI`.
- Le funzioni e le pagine del sito sono incluse: prezzo 0.
- Foto, grafiche, social e video sono extra a pagamento.
- `Fotografo / Videomaker` non ha una lista `featuresByType`: il passo `funzioni` viene saltato e si passa direttamente a `funzioni-extra`.
- Se aggiungi un tipo, aggiornalo in `businessTypes` e in una categoria. Se non lo metti in una categoria, non comparirà nel flusso normale: solo `Altro` è fuori categoria per scelta.

### 4.5 `src/data/domande-frequenti.ts`

Interfaccia:

```ts
export interface Faq {
  q: string;
  a: string;
  cta?: { href: string; label: string }[];
  ctaAccapo?: boolean;
}
```

Ci sono 11 FAQ. Le domande esatte sono:

1. Offerta Tutto incluso da 590€?
2. Quanto costa un sito?
3. In quanto tempo è online?
4. Come funziona, in pratica?
5. Non ho foto né testi. È un problema?
6. Fate anche grafiche e social media?
7. Devo pagare un canone ogni anno?
8. Come funziona l'anticipo di 30€?
9. Chiedo modifiche dopo che è online?
10. Lavorate solo ad Asti?
11. Fate siti con login o pagamenti online?

La home mostra solo 5 FAQ, selezionate per testo esatto in `src/pages/index.astro`:

- Quanto costa un sito?
- In quanto tempo è online?
- Non ho foto né testi. È un problema?
- Devo pagare un canone ogni anno?
- Come funziona, in pratica?

Se cambi la formulazione di una di queste domande, aggiorna anche `HOME_FAQS`, altrimenti la home resta senza quella FAQ.

La pagina `/faq` mostra tutte le FAQ e genera il JSON-LD `FAQPage` dalla stessa lista. Il CTA della prima FAQ punta a `/preventivo?offerta=1`.

### 4.6 `src/lib/catalogo.ts`

Contiene il tipo condiviso e la deduplica:

```ts
export interface Voce {
  name: string;
  price: number;
  hint?: string;
  concept?: string;
}

export function concetto(v: Voce): string | undefined
export function unione(generiche: Voce[], concettiExtra?: Set<string>): Voce[]
```

`CONCETTI` mappa i nomi delle voci su misura ai concetti generici:

- `biglietti da visita` -> `biglietti`
- `menu cartaceo coordinato` -> `volantini`
- `creazione o rinnovamento del logo` -> `logo`
- `creazione profili da zero` -> `profili`
- `creazione filmati e brevi video` -> `video`
- `grafiche personalizzate per le storie` -> `storie`

Regole:

- `concetto()` usa prima `v.concept`, poi la mappa `CONCETTI` normalizzando il nome.
- `unione()` elimina doppioni di nome e voci il cui concetto è già coperto.
- Nel configuratore c'è una regola extra: se le funzioni del tipo contengono `prenot` o `ordin`, il concetto `prenotazioni` è considerato coperto e la voce generica `Prenotazioni e ordini su WhatsApp` non viene mostrata.
- Se aggiungi una voce generica con un concetto già coperto, non comparirà. È voluto: una voce, un prezzo.

---

## 5. Rotte e pagine

### 5.1 Matrice rotte e metadati

| Rotta | File | Layout | Indicizzabile | Canonical | JSON-LD extra |
|---|---|---|---|---|---|
| `/` | `src/pages/index.astro` | `LayoutPagina` | Sì | `/` | Nessuno oltre `WebPage` |
| `/servizi` | `src/pages/servizi/index.astro` | `LayoutPagina` | Sì | `/servizi` | Nessuno oltre `WebPage` |
| `/prezzi` | `src/pages/prezzi/index.astro` | `LayoutPagina` | Sì | `/prezzi` | `Service` |
| `/preventivo` | `src/pages/preventivo/index.astro` | Nessuno | Sì | `/preventivo` | Nessuno oltre `WebPage` |
| `/chi-siamo` | `src/pages/chi-siamo/index.astro` | `LayoutPagina` | Sì | `/chi-siamo` | Nessuno oltre `WebPage` |
| `/contatti` | `src/pages/contatti/index.astro` | `LayoutPagina` | Sì | `/contatti` | Nessuno oltre `WebPage` |
| `/faq` | `src/pages/faq/index.astro` | `LayoutPagina` | Sì | `/faq` | `FAQPage` |
| `/note-legali` | `src/pages/note-legali/index.astro` | Nessuno | No | Assente | Nessuno |
| `/404` | `src/pages/404.astro` | `LayoutPagina` | No | `/404` | Nessuno |

`/preventivo` è indicizzabile e presente in sitemap. `/note-legali` e `/404` sono `noindex, nofollow` e fuori sitemap.

Le rotte nel browser finiscono con lo slash (`/servizi/`, `/preventivo/`): è la forma che Cloudflare Pages serve con 200. La colonna Canonical indica lo slug logico; `canonicalUrl()` aggiunge lo slash.

### 5.2 Home `/`

File: `src/pages/index.astro`.

Titolo: `Siti web chiari per attività locali ad Asti | Trebla` (52 caratteri).

Description: `Studio web ad Asti: siti chiari e veloci per ristoranti, negozi e artigiani. Prezzi da 300€, senza canone obbligatorio. Preventivo in 2 minuti.` (143 caratteri).

Struttura:

1. Hero con H1 `Un sito chiaro per far scegliere la tua attività.` (con punto finale nell'ultima riga) e mockup scheda attività.
2. Ticker settori, decorativo, con copia `aria-hidden` per l'animazione.
3. `01 · Benefici`, 4 righe numerate.
4. `02 · Cosa facciamo`, 3 indici: Sito web, Grafiche, Social media.
5. `03 · Come funziona`, 5 passi del metodo.
6. `04 · Prezzi`, 3 card: 300€, da 400€, 590€.
7. `05 · Lo studio`, Albert e Gabriel.
8. `06 · Domande`, 5 FAQ selezionate.
9. `07 · Contatto`, CTA preventivo + WhatsApp.

Ancore e ID importanti:

- `#titolo`: H1 della hero.
- `#h-benefici`, `#h-servizi`, `#h-metodo`, `#h-prezzi`, `#h-studio`, `#h-domande`, `#h-contatto`: contenitori delle sezioni.
- `#t-benefici`, `#t-servizi`, `#t-metodo`, `#t-prezzi`, `#t-studio`, `#t-domande`, `#t-contatto`: heading passati a `TestataSezione`.
- `#h-servizi` è usato dal CSS `.sezione:has(#h-servizi)` per togliere il padding finale. Non rimuoverlo senza aggiornare il CSS.
- Il ticker duplica i settori: la seconda copia ha `aria-hidden="true"`. Con `prefers-reduced-motion` la copia sparisce via CSS.

La home non ha JSON-LD specifico oltre al `WebPage` generato da `MetaDocumento`.

### 5.3 Servizi `/servizi`

File: `src/pages/servizi/index.astro`.

Titolo: `Servizi: siti web, grafiche e social ad Asti | Trebla` (53).

Description: `Sito web da 300€, grafiche coordinate e social media: tre servizi combinabili per la tua attività ad Asti. Parti da quello che ti serve.` (136).

Contenuto:

- H1 `Tre cose, fatte sul serio`.
- Tre articoli con ancore:
  - `#sito`: sito web, 300€ pagina singola, 400€ più pagine.
  - `#grafiche`: solo design, logo +20€, biglietti +10€, volantini +20€. Non stampano nulla.
  - `#social`: profili, foto, video, grafiche, pubblicazioni. Niente follower comprati o viralità garantita.
- CTA trasversale al preventivo.
- Nessun JSON-LD extra.

### 5.4 Prezzi `/prezzi`

File: `src/pages/prezzi/index.astro`.

Titolo: `Prezzi: siti web da 300€, senza canone | Trebla` (47).

Description: `Pagina singola 300€, sito a più pagine 400€, offerta Tutto incluso 590€. Due revisioni incluse, nessun canone, il sito è tuo.` (125).

Contenuto:

- H1 `Due prezzi di partenza Niente sorprese`, con `#titolo-prezzi`.
- Due card base: Pagina singola 300€, Sito a più pagine 400€.
- Una card offerta con id `#offerta`, prezzo da `OFFERTA_SITO.prezzo`, 590€.
- Condizioni in 4 righe: sito tuo, due revisioni, tempi concordati, modifiche dopo.
- Extra grafiche da `DESIGN_OPTIONS` e social da `SOCIAL_OPTIONS`, con prezzi generati dai dati.
- Link di condivisione WhatsApp hardcoded con `treblastudio.pages.dev`: da aggiornare se cambia dominio.
- JSON-LD `Service` con tre `Offer`: 300, 400, 590. I primi due sono stringhe hardcoded, il terzo usa `OFFERTA_SITO.prezzo`.

### 5.5 Preventivo `/preventivo`

File: `src/pages/preventivo/index.astro`.

Titolo: `Preventivo sito web in 2 minuti | Trebla` (40).

Description: `Configura il sito della tua attività e vedi subito la stima: tipo di attività, funzioni, pagine, foto e social. Senza impegno.` (126).

Caratteristiche:

- Non usa `LayoutPagina`: niente header, footer o skip link.
- Usa `MetaDocumento` per head, canonical e `WebPage`.
- Importa `src/stili-globali.css` e `src/styles/configuratore.css`.
- Il body ha `class="cfg-lock"` e il contenitore `wizard cfg-schermo`.
- La barra di avanzamento è `#w-barra` con `role="progressbar"` e `aria-valuenow`.
- Il contenuto del passo è `#w-corpo`, la domanda `#w-domanda`, il sottotitolo `#w-sotto`, l'errore `#w-errore`.
- La barra fissa in basso contiene Home, Indietro, Avanti.
- Lo script è importato con `<script> import '../../scripts/configuratore-preventivo'; </script>`: è l'unico chunk JS esterno del sito.

### 5.6 Chi siamo `/chi-siamo`

File: `src/pages/chi-siamo/index.astro`.

Titolo: `Chi siamo: Albert e Gabriel, studio web ad Asti | Trebla` (56).

Description: `Trebla è uno studio indipendente ad Asti: Albert allo sviluppo, Gabriel a design e social. Un lavoro pubblicato: Pikete Label.` (126).

Contenuto:

- H1 `Due persone, un metodo chiaro`.
- Albert: sviluppo e progetto.
- Gabriel: design e social.
- Sezione `#lavori` con Pikete Label, link esterno `https://piketelabel.vercel.app`.
- Nessun numero, recensione o cliente inventato.

### 5.7 Contatti `/contatti`

File: `src/pages/contatti/index.astro`.

Titolo: `Contatti: WhatsApp, email e studio ad Asti | Trebla` (51).

Description: `Scrivici su WhatsApp o via email. Ti risponde una persona, in genere entro la giornata. Studio ad Asti, su appuntamento.` (120).

Contenuto:

- H1 `Parliamone davvero`.
- Due celle: WhatsApp e email.
- Link con `data-wa`, `data-mail`, `data-tel`, `data-mostra`, `data-soggetto`.
- Nessun form.
- Prosa con rimando al preventivo e indicazione "Asti, su appuntamento. Veniamo sul posto, in città."

### 5.8 FAQ `/faq`

File: `src/pages/faq/index.astro`.

Titolo: `Domande frequenti sui siti web | Trebla` (39).

Description: `Quanto costa un sito, in quanto tempo è online, serve un canone, cosa serve per iniziare: risposte chiare alle domande più comuni.` (130).

Contenuto:

- H1 `Domande frequenti`.
- Tutte le 11 FAQ con `ElencoDomande`.
- JSON-LD `FAQPage` generato da `FAQS`.
- CTA preventivo.

### 5.9 Note legali `/note-legali`

File: `src/pages/note-legali/index.astro`.

Caratteristiche:

- Pagina standalone, non usa `LayoutPagina` né `MetaDocumento`.
- Titolo `<title>Note legali | Trebla</title>`, `noindex, nofollow`, nessuna canonical, nessun OG, nessun JSON-LD.
- Importa solo `styles/variabili.css` e `ContattiDinamici.astro`.
- CSS inline minimale nel frontmatter.
- Sezioni: `#privacy`, `#cookie`, `#termini`.
- Data "Ultimo aggiornamento: ottobre 2026" hardcoded.
- I redirect `/privacy`, `/cookie`, `/termini` arrivano qui da `public/_redirects`.

Se cambi i termini, aggiorna la data e verifica che il configuratore continui a linkare `/note-legali#termini`.

### 5.10 404 `/404`

File: `src/pages/404.astro`.

Titolo: `Pagina non trovata | Trebla` (27).

Description: `Questa pagina non esiste. Torna alla homepage o fai il preventivo in 2 minuti.` (78).

Caratteristiche:

- Usa `LayoutPagina` con `noindex={true}`.
- Canonical `/404`.
- H1 `Qui non c'è niente`.
- CTA homepage e preventivo.
- Cloudflare Pages serve `404.html` per le rotte inesistenti.

### 5.11 Endpoint generati

`src/pages/robots.txt.ts`:

```text
User-agent: *
Allow: /

Sitemap: https://dominio/sitemap.xml
```

`src/pages/sitemap.xml.ts`:

- Array `pagine`: `/`, `/servizi/`, `/prezzi/`, `/preventivo/`, `/chi-siamo/`, `/contatti/`, `/faq/` (forma servita con 200 da Pages).
- Esclude `/note-legali` e `/404`.
- Ogni URL ha `lastmod` pari alla data del build.
- Se aggiungi una pagina indicizzabile, aggiungila qui.
- Se cambi dominio, non toccare il file: legge `site.url`.

---

## 6. Componenti e layout

### 6.1 `MetaDocumento.astro`

Props:

| Prop | Tipo | Note |
|---|---|---|
| `title` | `string` | Obbligatorio |
| `description` | `string` | Obbligatorio |
| `canonical` | `string` | Percorso, non URL assoluto |
| `noindex` | `boolean` | Default `false` |
| `jsonLd` | oggetto o array | JSON-LD extra della pagina |

Comportamento:

- `canonicalHref = canonicalUrl(canonical)`.
- `titleFull`: se `title` contiene già `Trebla`, resta com'è; altrimenti aggiunge ` · Trebla`.
- Genera `<title>`, description, canonical, robots, OG, Twitter, favicon, manifest, theme-color.
- `og:type` è sempre `website`.
- `og:image` è sempre `${site.url}/og-trebla.jpg`, 1200x630, con alt `Trebla, studio web ad Asti`.
- Precarica 5 font woff2 e il logo header.
- Genera un solo `<script type="application/ld+json">` con array composto da:
  - `Organization` con `@id` `${site.url}/#studio`.
  - `ProfessionalService` con `@id` `${site.url}/#servizio`.
  - `WebSite` con `@id` `${site.url}/#sito`.
  - `WebPage` con `@id` `${canonicalHref}#pagina`, solo se `noindex` è falso.
  - Eventuali `jsonLd` passati dalla pagina.
- `Organization.logo` dichiara 1360x768; il file reale è 200x113, stesso rapporto. Se sostituisci il logo, aggiorna file e dimensioni.
- Il logo header ha `width="1360" height="768"` e `fetchpriority="high"`; il file webp è 200x113.
- `noscript` forza `[data-reveal]` visibile.
- `<slot name="head" />` permette a una pagina di aggiungere tag head, oggi non usato.

Non aggiungere qui meta specifici di una pagina: passa `title`, `description`, `canonical` e `jsonLd` dalla pagina.

### 6.2 `LayoutPagina.astro`

Props:

| Prop | Default |
|---|---|
| `title` | `Trebla: Siti web chiari per piccole attività \| Asti` |
| `description` | `site.description` |
| `canonical` | `/` |
| `noindex` | `false` |
| `jsonLd` | assente |

Struttura:

- Importa `stili-globali.css`, `MetaDocumento`, `Intestazione`, `Piede`, `ContattiDinamici`.
- `<html lang={site.lang}>`.
- Skip link `.salto` verso `#contenuto`.
- Header, `<main id="contenuto">`, footer, contatti.
- Script inline di reveal con `IntersectionObserver`:
  - `rootMargin: '0px 0px -8% 0px'`, `threshold: 0.08`.
  - Se `prefers-reduced-motion`, niente observer e tutto visibile.
  - Se manca `IntersectionObserver` o c'è un errore, tutto visibile.
  - `[data-reveal]` parte a opacity 0 e translateY 18px; `.visibile` lo riporta a posto.

Nessuna pagina normale deve avere altri script esterni. Se aggiungi JS, valuta se può stare inline e senza dipendenze.

### 6.3 `Intestazione.astro`

- Header sticky `.sopra`, id `cima`.
- Logo `trebla-logo.webp`, alt `Trebla, Studio web ad Asti`.
- Nav desktop: Home, Servizi, Prezzi, Studio (`/chi-siamo`), FAQ, Contatti.
- CTA `Preventivo in 2 minuti`.
- `aria-current="page"` calcolato da `Astro.url.pathname`:
  - `/` attivo solo sulla home.
  - Le altre voci sono attive con `path.startsWith(href)`.
- Menu mobile `#menu-mobile`, bottone `#menu-bottone` con `aria-expanded`, `aria-controls`, `aria-label`.
- Script inline:
  - Blocca lo scroll con `position: fixed` sul body e ripristina `scrollY`.
  - Focus trap tra i link del menu.
  - Chiude con Escape e riporta il focus al bottone.
  - Chiude al click di un link.
  - Chiude al resize sopra 960px.
- Il menu mobile è nascosto sopra 960px via CSS.

### 6.4 `Piede.astro`

- Footer `.piede`.
- Logo `trebla-logo-transparent.png`, alt `Trebla`, `loading="lazy"`.
- Anno e mese calcolati a build con `new Date()`.
- Contatti: WhatsApp, telefono, email, "Asti, su appuntamento."
- Link legali: Privacy, Cookie, Termini verso `/note-legali#...`.
- Torna su `#torna-su` con scroll smooth, disattivato con `prefers-reduced-motion`.
- Nessun dato hardcoded oltre a testi e link.

### 6.5 `ContattiDinamici.astro`

- Serializza `contatti` in `<script type="application/json" id="trebla-contatti">`, con `<` escapato.
- Script inline:
  - `a[data-wa]` -> `https://wa.me/<numero>?text=<data-wa encoded>`.
  - `a[data-tel]` -> `tel:+<numero>`.
  - `a[data-mail]` -> `mailto:<email>` più `?subject=` se c'è `data-soggetto`.
  - `data-mostra` scrive l'email nel testo del link.
- Tracking:
  - Delegato sul click di `a[data-wa]`, `a[data-mail]`, `a[data-tel]`.
  - Eventi `trebla_whatsapp`, `trebla_email`, `trebla_telefono`.
  - `window.dataLayer.push({ event })` e `CustomEvent('trebla:track')`.
- La funzione `traccia` è una copia gemella di quella nel configuratore. Modificarle insieme.

### 6.6 `ElencoDomande.astro`

Props: `faqs: Faq[]`.

- Renderizza `<div class="faq" data-reveal>` con `<details>` e `<summary>`.
- La risposta è in `.risposta`.
- Se `f.cta` esiste, aggiunge i link dopo la risposta.
- `ctaAccapo` inserisce `<br />` prima dei CTA.
- I CTA hanno classe `link-freccia`.
- Non genera JSON-LD: lo fa la pagina che lo usa.

### 6.7 `TestataSezione.astro`

Props:

| Prop | Tipo | Note |
|---|---|---|
| `numero` | `string` | Etichetta mono, es. `01 · Benefici` |
| `titolo` | `string` | HTML ammesso, es. `Cosa cambia <em>in pratica</em>` |
| `nota` | `string` opzionale | Nota laterale |
| `id` | `string` opzionale | ID del titolo per `aria-labelledby` |

- Renderizza `.capitolo` con `data-reveal`.
- `titolo` passa da `set:html`, quindi può contenere `<em>`.
- Il titolo è sempre `h2`: non usarlo per l'H1 di pagina.
- Se la sezione ha `aria-labelledby`, passa `id` e usa lo stesso valore.

---

## 7. Configuratore preventivo: guida completa

File: `src/scripts/configuratore-preventivo.ts`.

### 7.1 Architettura

- Un solo stato `S` di tipo `Stato`.
- `flusso()` calcola i passi effettivi in base a tipo, servizi, struttura e offerta diretta.
- `renderizza()` è distruttivo: svuota `#w-corpo` e ricostruisce un passo con `if`.
- `sincronizza()` legge gli input visibili e aggiorna `S`.
- `stima()` ricostruisce il prezzo da `S`.
- `messaggio()` ricostruisce il testo WhatsApp/email da `S`.
- `valido()` valida il passo corrente.
- `mancantiRiepilogo()` valida i dati minimi prima dell'invio.
- `aggiornaCromo()` aggiorna barra, pulsanti e focus.
- `vaiAvanti()` e `indietro` gestiscono la navigazione.

Non esiste routing, non esiste backend, non esiste salvataggio: uscendo dalla pagina si ricomincia da zero.

### 7.2 Stato `S`

| Campo | Tipo | Significato |
|---|---|---|
| `nome` | `string` | Nome attività, max 80 |
| `categoria` | `string` | Una delle 6 categorie |
| `tipo` | `string` | Uno dei 30 tipi o `Altro` |
| `tipoAltro` | `string` | Descrizione libera, max 80 |
| `altroMsg` | `string` | Messaggio libero per il flusso Altro, max 300 |
| `servizi` | `Servizio[]` | `sito`, `grafiche`, `social` |
| `struttura` | `Struttura` | `singola`, `multi`, `offerta`, `''` |
| `funzioni` | `string[]` | Nomi delle funzioni scelte |
| `pagine` | `string[]` | Nomi delle pagine scelte |
| `foto` | `string` | Opzione foto scelta |
| `canali` | `string[]` | Instagram, Facebook, TikTok |
| `socialExtra` | `string[]` | Contenuti social scelti |
| `videoQty` | `number` | 0-30 |
| `graficheExtra` | `string[]` | Materiali grafici scelti |
| `obiettivi` | `string[]` | Obiettivi scelti |
| `tempi` | `string` | Timing scelto |
| `privacy` | `boolean` | Accettazione termini |

### 7.3 Flusso dei passi

Flusso normale:

```text
nome
  -> categoria
  -> tipo
  -> servizi
  -> sito
  -> funzioni (solo se il tipo ha funzioni su misura)
  -> funzioni-extra
  -> pagine (solo se struttura multi)
  -> foto (solo se non offerta)
  -> grafiche-materiali (solo se servizio grafiche)
  -> social-tutto (solo se servizio social)
  -> obiettivi-tempi
  -> riepilogo
  -> invia
```

Flusso `Altro`:

```text
nome
  -> categoria
  -> tipo
  -> altro-descrivi
  -> servizi
  -> altro-invia
```

Il flusso `Altro` si ferma a `altro-invia`: non calcola stima, non chiede grafiche/social, non arriva a riepilogo. Il CTA invia un messaggio libero su WhatsApp o email.

Flusso `?offerta=1`:

```text
nome
  -> categoria
  -> tipo
  -> obiettivi-tempi
  -> riepilogo
  -> invia
```

Con `offertaDiretta = true`, `S.servizi = ['sito']` e `S.struttura = 'offerta'`. Il passo `servizi` e il passo `sito` vengono saltati. Non ci sono funzioni, pagine o foto: l'offerta include tutto.

Regole del flusso:

- `servizi` è sempre presente tranne con `?offerta=1`.
- `sito` è presente solo se `sito` è tra i servizi e non è offerta diretta.
- `funzioni` appare solo se `funzioniPerTipo()` non è vuoto.
- `pagine` appare solo con struttura `multi`.
- `foto` appare solo con sito e struttura diversa da `offerta`.
- `grafiche-materiali` appare solo se il servizio `grafiche` è selezionato.
- `social-tutto` appare solo se il servizio `social` è selezionato.
- `obiettivi-tempi`, `riepilogo` e `invia` ci sono sempre, tranne nel flusso `Altro`.
- Se con `?offerta=1` scegli `Altro`, il ramo `Altro` ha la precedenza: il flusso si ferma a `altro-invia` e l'offerta non viene applicata.

### 7.4 Passo per passo

| Passo | Domanda | Controllo | Dati | Validazione |
|---|---|---|---|---|
| `nome` | Come si chiama la tua attività? | Input testo, max 80, `autocomplete="organization"` | `nome` | Almeno 2 caratteri |
| `categoria` | In quale settore sei? | 6 pulsanti, avanzano al click | `categoria` | Obbligatoria |
| `tipo` | Che tipo di attività è? | Pulsanti del settore + Altro; i tipi normali avanzano al click | `tipo`, `tipoAltro` | Tipo obbligatorio; con Altro serve descrizione di almeno 2 caratteri |
| `altro-descrivi` | Descrivi la tua azienda | Input testo, max 80 | `tipoAltro` | Almeno 2 caratteri |
| `servizi` | Di cosa hai bisogno? | Checkbox: Sito web, Grafiche, Social media | `servizi` | Almeno uno |
| `sito` | Com'è fatto il sito? | Radio: Pagina singola 300€, Più pagine 400€, Offerta Tutto incluso 590€ | `struttura` | Obbligatoria |
| `funzioni` | Funzioni per il tipo | Checkbox dalle voci su misura | `funzioni` | Facoltativo |
| `funzioni-extra` | Funzioni extra per il sito? | Checkbox da `SITE_EXTRAS` filtrato | `funzioni` | Facoltativo |
| `pagine` | Quali pagine vuoi nel sito? | Checkbox da `pageOptions` | `pagine` | Facoltativo |
| `foto` | E le foto da mettere sul sito? | Radio da `photoPrices` | `foto` | Obbligatoria se sito e non offerta |
| `grafiche-materiali` | Quali materiali? | Checkbox da `designByType` + generiche | `graficheExtra` | Almeno un materiale se il servizio è selezionato |
| `social-tutto` | Dove ti facciamo vedere? | Bottoni canali, checkbox contenuti, contatore video 0-30 | `canali`, `socialExtra`, `videoQty` | Almeno un canale, un contenuto o un video |
| `obiettivi-tempi` | Cosa vuoi ottenere? / Quando vorresti iniziare? | Checkbox obiettivi + radio tempi | `obiettivi`, `tempi` | Facoltativo, il bottone dice "Salta →" |
| `riepilogo` | Controlla i dati | Lista definition | Nessun nuovo dato | Nessuna, si passa a invia |
| `invia` | Ecco la tua stima. Invia | Totale, CTA WhatsApp/email, checkbox privacy | `privacy` | Privacy obbligatoria e dati minimi completi |

Dettagli:

- `categoria` e `tipo` avanzano da soli al click. Il pulsante `Altro` porta a `altro-descrivi` senza validare subito la descrizione; il tasto `Avanti` su `tipo` invece la valida.
- Cambiare categoria può azzerare il tipo se non appartiene alla nuova categoria.
- `setTipo()` azzera funzioni, pagine, foto, canali, contenuti social, video e grafiche. È voluto: cambiando tipo cambiano le opzioni.
- `sincronizza()` conserva le scelte precedenti che non sono più tra le opzioni visibili; quando un servizio viene tolto, azzera i dati dipendenti.
- `obiettivi` e `tempi` non sono obbligatori e non entrano in `mancantiRiepilogo()`.

### 7.5 Prezzi e stima

Formula:

```text
se sito:
  se offerta: 590
  altrimenti:
    300 se singola, 400 se multi
    + somma prezzi funzioni scelte
    + somma prezzi pagine scelte
    + prezzo foto scelto
+ somma prezzi contenuti social scelti
+ videoQty * 20
+ somma prezzi materiali grafici scelti
```

Dettagli:

- `stima()` fa `Math.max(0, Math.round(t))`.
- Le funzioni del sito e le pagine hanno prezzo 0, quindi non aumentano la stima.
- Le foto sono 0, 20 o 10.
- I contenuti social sono 10 o 20.
- I materiali grafici sono 10 o 20.
- I video sono 20 l'uno, massimo 30.
- `euro(0)` restituisce `incluso`; `euro(20)` restituisce `+20€`.
- Il totale finale è mostrato come `€ 590`, con lo spazio.
- Con l'offerta, il logo è escluso dalle grafiche visibili perché già incluso.

### 7.6 Riepilogo e invio

`riepilogo` mostra:

- Attività e tipo.
- Servizi scelti.
- Sito: struttura e prezzo, oppure dettagli offerta.
- Funzioni, pagine, foto.
- Grafiche scelte o "Da decidere insieme".
- Social: canali e contenuti, video con prezzo.
- Obiettivi, tempi.
- Nel passo `invia`: totale, nota sul prezzo concordato, nota sull'anticipo di 30€, CTA WhatsApp e CTA email.
- Il link `Termini e condizioni` nel checkbox privacy punta a `/note-legali#termini`.

`mancantiRiepilogo()` controlla solo:

- `nome` almeno 2 caratteri.
- `categoria`.
- `tipo`, e `tipoAltro` se è Altro.
- Almeno un servizio.
- `struttura` se il sito è selezionato.
- `foto` se il sito è selezionato e non è offerta.

Non controlla grafiche, social, obiettivi o tempi: la validazione dei singoli passi lo fa prima. Se aggiungi un campo obbligatorio, aggiorna anche questa funzione.

`aggiornaInvia()`:

- Se manca la privacy o un dato, il CTA WhatsApp diventa un link di aiuto a WhatsApp con testo "Non so cosa scegliere per il preventivo, mi aiutate su WhatsApp?" e `aria-disabled="true"`, opacità 0.55.
- Se mancano dati, il testo del CTA dice `Manca: ...`.
- Se manca la privacy, dice `Accetta i termini per inviare`.
- Il CTA email resta `href="#"` e disabilitato finché i dati non sono completi.
- Quando tutto è valido, il CTA WhatsApp contiene `messaggio()` e il CTA email contiene `mailto:` con oggetto `Richiesta sito web`.

### 7.7 Messaggio WhatsApp ed email

`messaggio()` costruisce un testo con:

- `*Ciao Trebla!*`
- Attività, tipo, servizi.
- Sezione `*SITO*` con struttura o offerta, funzioni, pagine, foto.
- Sezione `*GRAFICHE*` con materiali.
- Sezione `*SOCIAL MEDIA*` con canali, contenuti, video.
- Obiettivi, tempi, eventuale fonte UTM.
- `*Anticipo:* 30€ compresi nella stima`.
- `*STIMA INDICATIVA:* N €`.

Dettagli:

- Gli asterischi sono il grassetto di WhatsApp.
- Se il testo supera 1800 caratteri, viene tagliato a 1780 e chiuso con `...(continua a voce)`.
- La mail usa lo stesso testo senza asterischi.
- Il desktop è rilevato con `(hover: hover) and (pointer: fine)`.
- Su desktop il bottone email si chiama `Copia email`: copia il testo e mostra `Copiato! Scrivici a: <email>` per 3 secondi. Se il clipboard non è disponibile, mostra comunque l'email.
- Su mobile il bottone email apre `mailto:` e copia il testo, perché una mail lunga a volte non parte.
- Nel flusso `Altro`, su desktop il CTA è `Invia via email`, su mobile è `Invia su WhatsApp`.

### 7.8 Tracking e UTM

Eventi:

- `trebla_preventivo-avvio` al primo passaggio avanti.
- `trebla_preventivo-invia` al click del CTA WhatsApp finale.
- `trebla_preventivo-invia-email` al click del CTA email.
- `trebla_whatsapp`, `trebla_telefono`, `trebla_email` dai link contatti.
- `trebla_utm` al caricamento se ci sono `utm_source`, `utm_medium`, `utm_campaign`.

Regole:

- `window.dataLayer` è dichiarato in `src/env.d.ts`.
- Non ci sono pixel, non c'è GA, non c'è consenso cookie perché non c'è profilazione.
- La funzione `traccia` è duplicata in `ContattiDinamici.astro` e nel configuratore. Se cambi il formato dell'evento, cambia entrambe.
- Il click delegato su `[data-track]` manda `trebla_` + valore.
- I valori UTM sono tagliati a 60 caratteri e aggiunti al messaggio come `Fonte: ...`.

### 7.9 Deep link e preselezioni

`?servizi=sito,grafiche,social`:

- Preseleziona i servizi.
- Alias accettati: `sito`, `site`, `siti-web`, `sito-web`, `siti`; `social`, `social-media`; `grafiche`, `design`, `grafica`.
- Valori sconosciuti vengono ignorati.
- Non salta il passo `servizi`: l'utente può modificare.

`?offerta=1`:

- Forza `servizi = ['sito']`.
- Forza `struttura = 'offerta'`.
- Attiva `offertaDiretta`.
- Salta `servizi` e `sito` e tutti i passi interni del sito.
- È il link usato dalla prima FAQ e dalla pagina Prezzi.

`?offerta=1` vince su `?servizi=...`. Non combinare i due parametri aspettandoti grafiche o social.

### 7.10 Barra fissa e `--wizard-barra`

- `.wizard-barra-fissa` è `position: fixed` in basso.
- Lo script misura `offsetHeight` e scrive `--wizard-barra` su `document.documentElement`.
- `configuratore.css` usa `padding-block-end: var(--wizard-barra, 79px)` su `.cfg-schermo`.
- `ResizeObserver` aggiorna la misura su rotazione e safe-area.
- Non rimuovere questa logica: l'ultima riga del configuratore finirebbe sotto la barra.

### 7.11 Aggiungere o cambiare un passo

Se aggiungi un passo:

1. Aggiungi il campo a `Stato` e inizializzalo in `S`.
2. Aggiungi il passo a `flusso()` nella posizione giusta.
3. Aggiungi un `if (id === '...')` in `renderizza()`.
4. Se il passo ha input, gestisci `sincronizza()` e `setTipo()` se serve.
5. Aggiungi la validazione in `valido()`.
6. Se il passo influisce sul prezzo, aggiorna `stima()`.
7. Se il passo deve comparire nel messaggio, aggiorna `messaggio()`.
8. Se il passo deve comparire nel riepilogo, aggiorna `riepilogo`.
9. Se è obbligatorio per l'invio, aggiorna `mancantiRiepilogo()`.
10. Verifica il flusso normale, `Altro`, `?offerta=1`, mobile e desktop.

Se aggiungi un'opzione a un passo esistente:

- Aggiungi la voce al data file giusto.
- Se ha un prezzo, mettilo nel campo `price`.
- Se copre un concetto già presente, aggiungi `concept` o aggiorna `CONCETTI`.
- Verifica che non compaia due volte nel wizard e nel riepilogo.

---

## 8. SEO

### 8.1 Regole generali

- Ogni pagina indicizzabile ha title e description unici.
- I title attuali sono tra 39 e 56 caratteri; le description tra 120 e 143.
- I title finiscono con `| Trebla` e non hanno punto finale.
- `MetaDocumento` evita `Trebla · Trebla`.
- Canonical sempre assoluta, generata da `site.url` + percorso.
- Ogni pagina indicizzabile ha un `WebPage` JSON-LD con `@id` `<canonical>#pagina`.
- Le pagine `noindex` non generano `WebPage`.
- Non inventare indirizzi, telefoni, email, recensioni o valutazioni nel JSON-LD.
- `ProfessionalService` dichiara solo `addressLocality: Asti`, `addressCountry: IT`, `areaServed: Asti`, `priceRange: €€`. Non c'è un indirizzo civico.

### 8.2 Matrice metadati

| Rotta | Title | Caratteri | Description | Caratteri | Robots |
|---|---|---|---|---|---|
| `/` | Siti web chiari per attività locali ad Asti \| Trebla | 52 | Studio web ad Asti: siti chiari e veloci per ristoranti, negozi e artigiani. Prezzi da 300€, senza canone obbligatorio. Preventivo in 2 minuti. | 143 | index, follow |
| `/servizi` | Servizi: siti web, grafiche e social ad Asti \| Trebla | 53 | Sito web da 300€, grafiche coordinate e social media: tre servizi combinabili per la tua attività ad Asti. Parti da quello che ti serve. | 136 | index, follow |
| `/prezzi` | Prezzi: siti web da 300€, senza canone \| Trebla | 47 | Pagina singola 300€, sito a più pagine 400€, offerta Tutto incluso 590€. Due revisioni incluse, nessun canone, il sito è tuo. | 125 | index, follow |
| `/preventivo` | Preventivo sito web in 2 minuti \| Trebla | 40 | Configura il sito della tua attività e vedi subito la stima: tipo di attività, funzioni, pagine, foto e social. Senza impegno. | 126 | index, follow |
| `/chi-siamo` | Chi siamo: Albert e Gabriel, studio web ad Asti \| Trebla | 56 | Trebla è uno studio indipendente ad Asti: Albert allo sviluppo, Gabriel a design e social. Un lavoro pubblicato: Pikete Label. | 126 | index, follow |
| `/contatti` | Contatti: WhatsApp, email e studio ad Asti \| Trebla | 51 | Scrivici su WhatsApp o via email. Ti risponde una persona, in genere entro la giornata. Studio ad Asti, su appuntamento. | 120 | index, follow |
| `/faq` | Domande frequenti sui siti web \| Trebla | 39 | Quanto costa un sito, in quanto tempo è online, serve un canone, cosa serve per iniziare: risposte chiare alle domande più comuni. | 130 | index, follow |
| `/note-legali` | Note legali \| Trebla | 20 | Assente | 0 | noindex, nofollow |
| `/404` | Pagina non trovata \| Trebla | 27 | Questa pagina non esiste. Torna alla homepage o fai il preventivo in 2 minuti. | 78 | noindex, nofollow |

Se cambi un title o una description, aggiorna questo file. Se aggiungi una pagina, aggiorna la matrice e la sitemap.

### 8.3 JSON-LD

`MetaDocumento` genera sempre i primi tre nodi:

- `Organization`, `@id` `#studio`, nome `Trebla`, URL, description, logo, image, areaServed Asti.
- `ProfessionalService`, `@id` `#servizio`, nome `Trebla, Studio web ad Asti`, URL, image, logo, priceRange `€€`, address Asti/IT, areaServed Asti, currenciesAccepted EUR.
- `WebSite`, `@id` `#sito`, nome, URL, description, inLanguage `it`, publisher `#studio`.

Poi:

- `WebPage` per ogni pagina indicizzabile: `@id` `<canonical>#pagina`, URL, name, description, inLanguage, isPartOf `#sito`, about `#studio`, publisher `#studio`.
- `/prezzi` aggiunge `Service` con nome, URL `${site.url}/prezzi`, provider `#studio`, areaServed Asti, tre offerte: 300, 400, 590.
- `/faq` aggiunge `FAQPage` con `mainEntity` costruito da `FAQS`.

Non aggiungere `Review`, `AggregateRating`, `LocalBusiness` con indirizzo inventato o `BreadcrumbList` se non hai i dati reali.

### 8.4 Sitemap, robots, llms, manifest

- Sitemap: 7 URL, tutte indicizzabili, `lastmod` del build.
- Robots: permette tutto, punta alla sitemap.
- `public/llms.txt`: descrizione per agenti, prezzi, pagine e contatti. Contiene URL assoluti hardcoded: aggiornalo se cambia dominio. Non è generato dal build.
- `public/site.webmanifest`: nome `Trebla, Studio web ad Asti`, short name `Trebla`, start `/`, display standalone, colori carta e inchiostro, icona `favicon.svg`.
- `public/og-trebla.jpg`: 1200x630, usata da OG e Twitter.
- `favicon.svg`: unica icona.

### 8.5 Cambiare dominio

1. Imposta `PUBLIC_SITE_URL` nelle variabili di build del progetto Cloudflare Pages.
2. Aggiorna `.env.example` se vuoi che il repository documenti il nuovo valore.
3. Aggiorna il fallback in `src/data/sito.ts` se non vuoi dipendere dalla variabile.
4. Aggiorna `public/llms.txt`.
5. Aggiorna il link di condivisione in `src/pages/prezzi/index.astro`.
6. Cerca altri riferimenti con `rg "treblastudio\\.pages\\.dev|treblastudio\\.it"`.
7. Build, deploy, verifica canonical, sitemap, robots, OG e JSON-LD.

Il dominio deve risolvere. Canonical e sitemap non devono mai puntare a un dominio morto.

---

## 9. Design system e CSS

### 9.1 Token

File: `src/styles/variabili.css`.

| Token | Valore | Uso |
|---|---|---|
| `--carta` | `#f7f2e8` | Sfondo principale |
| `--carta-2` | `#efe7d3` | Sfondo hover, righe |
| `--carta-3` | `#fffdf7` | Superfici chiare |
| `--inchiostro` | `#1d1712` | Testo e linee forti |
| `--morbido` | `#6c6054` | Testo secondario |
| `--linea` | `#d9cdb9` | Linee leggere |
| `--linea-scura` | `#3a3129` | Bordi scuri |
| `--mattone` | `#b23a12` | Accento principale |
| `--mattone-fondo` | `#932d0c` | Accento scuro |
| `--mattone-chiaro` | `#e89a6b` | Focus su fondo scuro |
| `--notte` | `#201913` | Footer, card scure |
| `--notte-carta` | `#f4eee1` | Testo su notte |
| `--notte-morbido` | `#b7ab98` | Testo secondario su notte |
| `--wa` | `#157f3d` | WhatsApp |
| `--wa-fondo` | `#0f5f2d` | WhatsApp scuro |
| `--focus` | `var(--mattone)` | Anello di focus |
| `--serif` | Fraunces, Georgia, serif | Titoli |
| `--sans` | Archivo, system-ui, sans-serif | Corpo |
| `--mono` | IBM Plex Mono, monospace | Prezzi, etichette |
| `--t-display` | `clamp(2.9rem, 7.2vw, 5.6rem)` | H1 |
| `--t-h2` | `clamp(2rem, 4.6vw, 3.4rem)` | H2 |
| `--t-h3` | `clamp(1.3rem, 2.4vw, 1.7rem)` | H3 |
| `--t-lead` | `clamp(1.1rem, 1.9vw, 1.3rem)` | Lead |
| `--larghezza` | `1160px` | Larghezza massima |
| `--margine` | `clamp(20px, 5vw, 56px)` | Margine laterale |
| `--sezione` | `clamp(44px, 6vw, 84px)` | Padding sezioni |
| `--raggio` | `12px` | Raggio bottoni e card |
| `--transizione` | `0.18s ease` | Transizioni brevi |

Su fondo scuro `--focus` viene sovrascritto con `--mattone-chiaro` su `.piede`, `.prezzo-evidenza`, `.wizard-totale-finale`, `.wizard-barra-fissa`.

### 9.2 `src/stili-globali.css`

Sezioni, nell'ordine dei commenti:

1. Variabili: importa `styles/variabili.css`.
2. Base: reset, body, focus, skip link.
3. Struttura: `.involucro`, `.sezione`, `.sezione-flush`, `.capitolo`.
4. Intestazione: header sticky, nav, menu mobile.
5. Bottoni: `.btn`, `.btn-mattone`, `.btn-fantasma`, `.btn-wa`, `.btn-piccolo`, `.link-freccia`.
6. Hero: griglia, titolo, lead, mockup scheda.
7. Ticker dei settori.
8. Righe editoriali.
8b. Chiusura home.
9. Servizi: titolo e contenuto.
9b. Servizi in home: indice editoriale.
10. Metodo.
11. Prezzi.
12. Azioni CTA.
13. Studio.
14. FAQ.
15. Piede compatto.
16. Pagine interne.
17. Configuratore preventivo (pagina intera).
19. Movimento ridotto.
20. Dettagli mobile/tablet.
21. Sicurezza layout e stampa.

La sezione 18 non esiste: la numerazione salta da 17 a 19. Non è un errore da correggere se non stai riordinando il file.

Classi chiave:

| Classe | Ruolo |
|---|---|
| `.involucro` | Contenitore max 1160px con margini |
| `.sezione` | Padding verticale standard |
| `.sezione-flush` | Nessun padding superiore |
| `.capitolo` | Testata con numero, titolo e nota |
| `.pagina-titolo` | Testata delle pagine interne |
| `.hero`, `.hero-griglia`, `.hero-azioni`, `.hero-lead` | Home |
| `.scheda` | Mockup attività nella hero |
| `.ticker`, `.ticker-pista` | Striscia settori |
| `.righe`, `.righe-num` | Liste editoriali numerate |
| `.indice`, `.indice-corpo`, `.indice-lista` | Servizi in home |
| `.metodo` | Passi del metodo |
| `.prezzi-griglia`, `.prezzo`, `.prezzo-evidenza`, `.prezzo-cifra` | Prezzi |
| `.persone`, `.persona` | Studio |
| `.faq`, `.risposta` | FAQ |
| `.piede`, `.piede-riga`, `.piede-fondo` | Footer |
| `.servizio`, `.servizio-testa`, `.due-colonne` | Pagina Servizi |
| `.contatti-griglia`, `.contatto-cella`, `.contatto-grande` | Contatti |
| `.lavoro`, `.lavoro-mock` | Lavori |
| `.prosa` | Testo lungo |
| `.solo-pc` | Visibile solo su desktop |
| `[data-reveal]`, `.visibile` | Animazione reveal |

Breakpoint usati: 380, 400, 640, 700, 900, 960, 1000, 1100. Non aggiungere breakpoint nuovi se uno esistente basta.

### 9.3 `src/styles/configuratore.css`

Solo per `/preventivo`:

- Blocco scroll della pagina, `.cfg-lock`.
- `.cfg-schermo` a tutta altezza con `padding-block-end: var(--wizard-barra)`.
- `.wizard-corpo` scrollabile internamente.
- Righe compatte per far stare tutto nello schermo.
- Canali social con loghi toccabili.
- Contatore video.
- Link per tornare alla home.

Il CSS del configuratore non deve essere importato da `LayoutPagina` o dalle altre pagine: appesantirebbe 8 pagine su 9.

### 9.4 Regole visuali

- Niente ombre morbide, gradienti, glass, neon.
- Righe da 1px, bordi netti, carta e inchiostro.
- Bottoni grandi, minimo 44px di area toccabile, nel wizard minimo 58px.
- Focus sempre visibile.
- Titoli con `text-wrap: balance`, paragrafi con `text-wrap: pretty`.
- `overflow-x: clip` su html e body.
- `scroll-padding-top` per l'header sticky.
- Stampa: nasconde header, footer, ticker, CTA e barra wizard; forza `[data-reveal]` visibile.

---

## 10. Performance, JavaScript e asset

### 10.1 Regole

- CSS inline nel build: `inlineStylesheets: 'always'`. Non aggiungere un file CSS globale esterno.
- Pagine normali: zero chunk JS esterni. Gli script di base sono inline.
- `/preventivo`: un solo chunk esterno, quello del configuratore. Non deve diventare una catena di chunk.
- Font: solo 5 woff2, preload, `font-display: swap`, `unicode-range` latin.
- Immagini: dimensioni dichiarate, `loading="lazy"` sotto la piega, `fetchpriority="high"` solo per il logo header.
- Niente analytics, pixel, framework o librerie runtime.
- `sharp` è una devDependency e serve al servizio immagini di Astro; non aggiungere immagini non ottimizzate.
- La cache Cloudflare Pages è immutabile per `/_astro/*` e per immagini, font, SVG, impostata in `public/_headers`.

### 10.2 Verifica JS

Dopo il build:

```powershell
Get-ChildItem dist -Recurse -Filter *.html | ForEach-Object { $_.FullName }
Select-String -Path dist\index.html -Pattern '<script[^>]+src='
Select-String -Path dist\preventivo\index.html -Pattern '_astro/.*\.js'
```

Atteso:

- 9 file HTML.
- Nessun `<script src=...>` in `dist/index.html` e nelle altre pagine normali.
- Un solo riferimento JS in `dist/preventivo/index.html` (il chunk `hoisted.*.js`).
- `dist/_astro/` contiene solo il chunk e i 5 woff2.

### 10.3 Font

File preload:

- `fraunces-latin-600-normal.woff2`
- `fraunces-latin-600-italic.woff2`
- `archivo-latin-400-normal.woff2`
- `archivo-latin-700-normal.woff2`
- `ibm-plex-mono-latin-700-normal.woff2`

Non importare `@fontsource/.../index.css` o varianti: il build trascinerebbe anche `.woff`. Se aggiungi un peso, aggiungilo a mano in `MetaDocumento.astro` e verifica che il file sia woff2.

### 10.4 Immagini

| File | Dimensioni | Uso |
|---|---|---|
| `public/trebla-logo.webp` | 200x113 | Header, preload, `fetchpriority="high"` |
| `public/trebla-logo-transparent.png` | 240x136 | Footer, lazy, invertito via CSS |
| `public/og-trebla.jpg` | 1200x630 | Open Graph e Twitter |
| `public/favicon.svg` | SVG | Favicon e manifest |

Il markup header e footer dichiara `width="1360" height="768"`, stesso rapporto dei file reali. Non cambiare questi attributi senza cambiare anche il file e il JSON-LD.

---

## 11. Accessibilità

- Skip link `.salto` verso `#contenuto`.
- Header, nav, main, footer e nav mobile hanno label ARIA.
- `aria-current="page"` sulle voci attive.
- Un solo H1 per pagina.
- `TestataSezione` genera H2; le card usano H2 o H3 in base alla gerarchia.
- Focus visible: `outline: 2px solid var(--focus)` con offset 3px.
- Su fondo scuro il focus usa `--mattone-chiaro`.
- Menu mobile: focus trap, Escape, blocco scroll, ripristino posizione.
- Wizard:
  - Il titolo del passo riceve il focus e non mostra outline.
  - `#w-errore` è `role="alert"`.
  - La barra è `role="progressbar"` con `aria-valuenow`.
  - Ogni input ha `aria-label`.
  - I gruppi hanno `role="group"` e label.
  - I pulsanti opzione hanno `aria-pressed`.
  - Il campo privacy è un checkbox nativo.
- FAQ native con `<details>` e `<summary>`.
- `prefers-reduced-motion`: reveal, ticker, smooth scroll e transizioni.
- Touch target: bottoni almeno 44px, wizard 58px.
- Non usare `aria-hidden` su elementi focusabili.

---

## 12. Deploy, ambiente e verifica

### 12.1 File di configurazione

`astro.config.mjs`:

- `site` da `PUBLIC_SITE_URL` o fallback.
- `output: 'static'`.
- `build.inlineStylesheets: 'always'`.
- `image.service` sharp.

`public/_redirects`:

- Redirect permanenti:
  - `/privacy` -> `/note-legali#privacy`
  - `/cookie` -> `/note-legali#cookie`
  - `/termini` -> `/note-legali#termini`

`public/_headers`:

- Header globali:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- Cache immutabile per `/_astro/*` e per immagini, font, SVG.

`tsconfig.json`: estende `astro/tsconfigs/strictest`, tipi `astro/client`.

`.env.example`: `PUBLIC_SITE_URL=https://treblastudio.pages.dev`.

### 12.2 Build

```powershell
npm run build
```

Atteso:

- 9 pagine HTML.
- `dist/robots.txt`.
- `dist/sitemap.xml`.
- `dist/_astro/hoisted.*.js` unico chunk.
- 5 woff2.
- Nessun errore TypeScript o Astro.

Se il build fallisce, leggi l'errore completo. Non ignorare warning su import mancanti o tipi.

### 12.3 Deploy

```powershell
npm run deploy
```

- `npm run deploy` esegue `npm run build` e poi `wrangler pages deploy dist --project-name treblastudio --branch main`.
- Il progetto Pages `treblastudio` esiste già. Se va ricreato da zero, usare una sola volta `npx wrangler pages project create treblastudio --production-branch main --force`: senza `--force` la CLI 4.152 delega a Cloudflare Workers e non crea un `*.pages.dev`.
- Il deploy va fatto dalla root del progetto.
- Il deploy automatico da GitHub è descritto in §12.3.1.
- La produzione è pubblica su `https://treblastudio.pages.dev`.
- Dopo il deploy, Wrangler stampa l'URL di produzione e l'URL del deployment.
- Primo deploy automatico verificato: run GitHub Actions `40179445680`, commit `62ef1d5`, ambiente Production, branch `main`.

#### 12.3.1 Deploy automatico da GitHub

Una volta impostato il secret, ogni push su `main` deploya in produzione con GitHub Actions, workflow `.github/workflows/deploy-pages.yml`.

- Il progetto Pages è nato in **Direct Upload** (Wrangler) e Cloudflare non permette di convertirlo a Git integration. L'automazione resta quindi in Direct Upload, eseguita da CI.
- Il workflow esegue `npm ci`, `npm run check`, `npm run build` e `npx wrangler pages deploy dist --project-name treblastudio --branch main`.
- Serve un solo secret GitHub, `CLOUDFLARE_API_TOKEN`: token API Cloudflare con permesso **Account → Cloudflare Pages → Edit**, limitato all'account `384f57dcfcbabf74d7869d18319d56e7`.
- `CLOUDFLARE_ACCOUNT_ID` è scritto nel workflow: non è un segreto.
- Il token si crea da [My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens); il secret si imposta in repository → **Settings → Secrets and variables → Actions → New repository secret**.
- Per ruotare o revocare il token: Cloudflare → My Profile → API Tokens.
- Il deploy manuale resta disponibile con `npm run deploy`.

### 12.4 Controlli live

Dopo un deploy che tocca codice o contenuti:

1. Home: title, canonical, H1, menu mobile, CTA.
2. `/servizi`: tre articoli e ancore.
3. `/prezzi`: 300, 400, 590, JSON-LD `Service`.
4. `/preventivo`: flusso completo, `?offerta=1`, `?servizi=sito,grafiche,social`, invio WhatsApp/email, privacy.
5. `/chi-siamo`: link Pikete Label.
6. `/contatti`: link WhatsApp, email, telefono.
7. `/faq`: tutte le domande, JSON-LD `FAQPage`.
8. `/note-legali`: sezioni e noindex.
9. `/404`: pagina personalizzata.
10. `/robots.txt` e `/sitemap.xml`.
11. Header di sicurezza e cache con `curl.exe -I`.
12. Mobile: menu, tap target, configuratore.

Comandi utili:

```powershell
curl.exe -s https://treblastudio.pages.dev/robots.txt
curl.exe -s https://treblastudio.pages.dev/sitemap.xml
curl.exe -I https://treblastudio.pages.dev/
```

Le preview Cloudflare Pages sono pubbliche su URL `*.pages.dev` del deployment.

### 12.5 Docs-only

Una modifica solo a `sito.md`, `README.md` o `comecreare.md` non cambia il sito e non richiede deploy. Non deployare per far vedere un file Markdown che non è in `public/`.

---

## 13. Ricette operative

### 13.1 Cambiare un prezzo

1. Aggiorna `src/data/prezzi.ts` per il catalogo e il configuratore.
2. Aggiorna `src/data/configuratore.ts` solo se il prezzo è di una voce su misura.
3. Cerca il vecchio prezzo in tutto il repository:
   ```powershell
   rg "300€|400€|590€|30€|20€|10€"
   ```
4. Aggiorna il copy hardcoded in:
   - `src/pages/index.astro`
   - `src/pages/servizi/index.astro`
   - `src/pages/prezzi/index.astro`
   - `src/pages/faq/index.astro` e `src/data/domande-frequenti.ts`
   - `src/pages/note-legali/index.astro`
   - `public/llms.txt`
5. Aggiorna il JSON-LD `Service` in `src/pages/prezzi/index.astro` (i 300 e 400 sono stringhe hardcoded).
6. Verifica il wizard: `/preventivo` e `/preventivo?offerta=1`.
7. Build, deploy, controllo live.

### 13.2 Aggiungere un tipo di attività

1. Apri `src/data/configuratore.ts`.
2. Aggiungi il nome a `businessTypes`.
3. Aggiungilo alla categoria giusta in `businessCategories` (una sola).
4. Se vuoi funzioni su misura, aggiungi una chiave a `featuresByType` con voci a 0€.
5. Se vuoi contenuti social, aggiungi una chiave a `socialByType` con prezzi 10/20.
6. Se vuoi materiali grafici, aggiungi una chiave a `designByType` con prezzi 10/20.
7. Verifica che il tipo compaia nel wizard e che il passo `funzioni` appaia solo se ha voci.
8. Build e test del flusso.

### 13.3 Aggiungere una funzione del sito

1. Se è generica, aggiungila a `SITE_EXTRAS` in `src/data/prezzi.ts` con `price: 0` e un `concept`.
2. Se è specifica di un tipo, aggiungila a `featuresByType` in `src/data/configuratore.ts`.
3. Se copre un concetto già presente, usa lo stesso `concept`.
4. Verifica che non compaia due volte nel passo `funzioni` o `funzioni-extra`.
5. Verifica il riepilogo e il messaggio.

### 13.4 Aggiungere una voce grafica o social

1. Generica: aggiungi a `DESIGN_OPTIONS` o `SOCIAL_OPTIONS` in `src/data/prezzi.ts`.
2. Specifica: aggiungi a `designByType` o `socialByType` in `src/data/configuratore.ts`.
3. Imposta `price` 10 o 20 e `concept` se serve.
4. La pagina `/prezzi` mostra automaticamente le voci generiche.
5. Il wizard mostra le voci specifiche del tipo più le generiche non coperte.
6. Con l'offerta, il logo è nascosto dalle grafiche: non riproporlo.

### 13.5 Aggiungere una pagina

1. Crea `src/pages/nome/index.astro`.
2. Usa `LayoutPagina` con `title`, `description`, `canonical`.
3. Aggiungi H1 e sezioni con `TestataSezione` se serve.
4. Aggiungi la rotta all'array `pagine` in `src/pages/sitemap.xml.ts` se è indicizzabile.
5. Aggiungi la voce alla nav in `Intestazione.astro` solo se è una pagina principale.
6. Aggiorna `public/llms.txt` se vuoi che gli agenti la vedano.
7. Aggiorna questa matrice in `sito.md`.
8. Build, deploy, verifica canonical e sitemap.

### 13.6 Aggiungere una FAQ

1. Apri `src/data/domande-frequenti.ts`.
2. Aggiungi `{ q, a, cta? }`.
3. Se deve apparire in home, aggiungi la domanda esatta a `HOME_FAQS` in `src/pages/index.astro`.
4. La pagina `/faq` e il JSON-LD `FAQPage` si aggiornano da soli.
5. Se il CTA è lungo, valuta `ctaAccapo: true`.
6. Build e verifica.

### 13.7 Cambiare i contatti

1. Modifica solo `src/data/contatti.ts`.
2. Non scrivere il numero o l'email in altri file.
3. Verifica i link `data-wa`, `data-tel`, `data-mail` su home, contatti, footer, chi-siamo e note-legali.
4. Verifica il configuratore: link WhatsApp, mailto, copia email.
5. Build, deploy, test.

### 13.8 Cambiare il dominio

Segui la sezione 8.5. Ricorda che `PUBLIC_SITE_URL` è build-time e che `llms.txt` e il link di condivisione Prezzi sono hardcoded.

### 13.9 Aggiungere un evento di tracking

1. Decidi il nome evento, prefisso `trebla_`.
2. Se è un click su un link, aggiungi `data-track="nome-evento"` e usa il listener delegato nel configuratore.
3. Se è un link contatto, il listener di `ContattiDinamici` lo copre già.
4. Se aggiungi una nuova funzione `traccia`, aggiorna entrambe le copie.
5. Non aggiungere pixel o librerie.
6. Verifica in console che `window.dataLayer` riceva l'evento.

### 13.10 Modificare il design

1. Leggi `.opencode/skills/anti-ai-slop/SKILL.md`.
2. Parti dai token in `src/styles/variabili.css`.
3. Riusa classi e componenti esistenti.
4. Non aggiungere framework CSS, ombre, gradienti o animazioni nuove senza motivo.
5. Verifica mobile, focus, reduced motion e stampa.
6. Build e controllo visivo.

### 13.11 Modificare le note legali

1. Modifica `src/pages/note-legali/index.astro`.
2. Aggiorna la data "Ultimo aggiornamento".
3. Ricorda che la pagina è `noindex, nofollow` e non usa `MetaDocumento`.
4. Verifica i link `/note-legali#privacy`, `#cookie`, `#termini`.
5. Verifica che il configuratore linki ancora `/note-legali#termini`.
6. Build e deploy.

---

## 14. Trappole note

1. **Non esistono più i nomi vecchi.** Se un import fallisce, controlla la tabella 3.1.
2. **`npm run check` può appendersi.** Se l'output è corretto, non è un errore. La build è la verifica affidabile.
3. **`treblastudio.it` non è attivo.** Non usarlo in canonical, sitemap, JSON-LD o `llms.txt`.
4. **`llms.txt` ha URL assoluti.** Non è generato: va aggiornato a mano se cambia il dominio.
5. **Il link di condivisione in Prezzi è hardcoded.** Cerca `treblastudio.pages.dev` prima di cambiare dominio.
6. **I prezzi nel copy sono hardcoded.** `BASE_PRICES` non alimenta automaticamente home, servizi, FAQ e note legali. Cerca i numeri.
7. **Il JSON-LD `Service` ha 300 e 400 hardcoded.** L'offerta usa `OFFERTA_SITO.prezzo`, gli altri no.
8. **`note-legali` non usa `MetaDocumento`.** Non aspettarti canonical, OG o JSON-LD lì.
9. **`404` ha canonical `/404` ma è noindex.** È voluto.
10. **`/preventivo` non ha header e footer.** Non aggiungerli senza una decisione di design.
11. **`?offerta=1` salta servizi e sito.** Non aggiungere passi che presuppongono una struttura scelta.
12. **Il flusso `Altro` si ferma prima della stima.** Non aspettarti un totale.
13. **`setTipo()` azzera molte scelte.** È voluto, ma se aggiungi un campo ricordati di azzerarlo.
14. **`mancantiRiepilogo()` non controlla tutto.** Se aggiungi un obbligatorio, aggiornalo.
15. **Il CTA WhatsApp "disabilitato" resta cliccabile.** Porta a un messaggio di aiuto, non a un link rotto.
16. **Il desktop usa "Copia email", il mobile usa mailto.** Non unificare senza test su entrambi.
17. **`--wizard-barra` è misurata a runtime.** Non sostituirla con un numero fisso.
18. **I loghi dichiarano 1360x768.** Il file reale è 200x113, stesso rapporto. Non cambiare solo gli attributi.
19. **Il logo footer è invertito via CSS.** Non creare un secondo file solo per il footer.
20. **Le FAQ della home sono selezionate per testo esatto.** Cambiare `q` può svuotare la home.
21. **Il ticker duplica i settori.** La copia è `aria-hidden` e sparisce con reduced motion.
22. **`dist/` può essere vecchio.** Fai sempre build prima di controllare.
23. **Il push su `main` deploya con GitHub Actions.** In locale usa `npm run deploy`.
24. **Le preview Pages sono pubbliche.** La produzione è `treblastudio.pages.dev`.
25. **Le pagine finiscono con lo slash.** Pages risponde 308 su `/servizi` e 200 su `/servizi/`. Canonical, sitemap e link interni devono usare `/servizi/`.
26. **`piketelabel/` è ignorata.** Non fa parte del sito.

### 14.1 Incoerenze note nei contenuti

Queste non vanno corrette senza richiesta esplicita, ma vanno sapute:

- `public/llms.txt` dice "Sito web pagina singola: da €300"; il sito pubblico dice 300€ esatti.
- La card multipagina della home dice "da 400€"; la pagina Prezzi dice 400€.
- L'opzione foto in `configuratore.ts` dice "Servono le foto (le scattate voi)"; il resto del sito dice "le scattiamo noi".
- La skill anti-ai-slop cita il push su `main` tra i comandi; il deploy reale è il push su `main` (GitHub Actions), oppure `npm run deploy` in locale.

Se il titolare chiede di allineare il copy, correggi questi punti e aggiorna questa sezione.

---

## 15. Tono di voce e regole editoriali

- Italiano semplice e concreto, rivolto al titolare dell'attività con il "tu".
- Frasi brevi. Niente gergo tecnico non spiegato.
- Niente superlativi vuoti, promesse di viralità, numeri inventati.
- Niente trattino lungo nei contenuti.
- Titoli SEO e titoli di sezione senza punto finale; l'H1 della home è l'eccezione.
- Prezzi con `€` attaccato: `300€`, `+20€`, `incluso`.
- La cifra finale della stima resta `€ 590`, con lo spazio.
- "Da 300€" solo se il prezzo è davvero una soglia. La pagina singola è 300€ esatti.
- "Offerta Tutto incluso" è il nome completo; non abbreviarlo in modi diversi.
- "Asti" è il territorio. Non inventare indirizzi o zone.
- I mockup sono esempi, non clienti.
- Le grafiche sono solo design: non si stampa nulla.
- I social non promettono follower o viralità.
- Il sito è vetrina: niente login, aree riservate o pagamenti online.

---

## 16. Checklist prima di consegnare

- [ ] Ho letto la sezione pertinente di `sito.md`.
- [ ] Ho modificato solo ciò che era richiesto.
- [ ] I dati sono reali e coerenti con `src/data/`.
- [ ] I contatti non sono in chiaro.
- [ ] Non ho usato il trattino lungo nei contenuti.
- [ ] I title SEO e le description restano unici e sensati, senza punto finale nei title.
- [ ] La canonical usa il dominio giusto.
- [ ] Se ho aggiunto una pagina indicizzabile, è in sitemap.
- [ ] Se ho cambiato un prezzo, ho cercato tutti i riferimenti.
- [ ] Se ho toccato il wizard, ho provato flusso normale, `Altro` e `?offerta=1`.
- [ ] Ho provato mobile e desktop.
- [ ] Focus, tastiera e reduced motion funzionano.
- [ ] `npm run build` arriva a 9 pagine senza errori.
- [ ] Le pagine normali non hanno chunk JS esterni.
- [ ] `/preventivo` ha un solo chunk JS.
- [ ] Se ho cambiato codice, ho deployato e verificato live.
- [ ] Se ho cambiato l'architettura, ho aggiornato `sito.md`.

---

## 17. Cronologia e stato

- I file sorgente sono stati rinominati in italiano descrittivo; gli slug pubblici sono rimasti invariati.
- La SEO è stata rifinita: title e description unici, canonical corretto, JSON-LD `WebPage` per pagina, `Service` su Prezzi, `FAQPage` su FAQ, `Organization`/`ProfessionalService`/`WebSite` condivisi.
- Il dominio di produzione è `https://treblastudio.pages.dev`; `treblastudio.it` non è attivo.
- `PUBLIC_SITE_URL` è impostata in produzione e in `.env.example`.
- Il sito è ospitato su Cloudflare Pages ed è stato verificato sulle 7 pagine indicizzabili, robots, sitemap, menu mobile e wizard.
- Primo deploy automatico GitHub Actions: `033a599c-9bef-4840-a4f9-9a0e068f1a01`, commit `62ef1d5`, su `https://treblastudio.pages.dev`.
- Le modifiche sono committate su `main`; ogni push attiva il deploy automatico.
- `README.md` e `comecreare.md` restano come documentazione secondaria. Se contraddicono questo file o il codice, vincono questo file e il codice.

Prossimi passi possibili, solo se richiesti:

1. Registrare `treblastudio.it` e aggiornare `PUBLIC_SITE_URL`, `llms.txt` e il link di condivisione Prezzi.
2. Committare le rinomine e le modifiche SEO.
3. Allineare le incoerenze di copy elencate nella sezione 14.1.
4. Aggiungere una pagina solo se serve davvero e con dati reali.

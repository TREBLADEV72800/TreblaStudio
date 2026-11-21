# Piano di chiusura del redesign

Stato al 21/11/2026: redesign completato su tutte le pagine nel branch `claude/optimistic-knuth-20jaxv` (ultimo commit del redesign: d5d547e). Check senza errori, build da 16 pagine. Non unito a `main`: il push su `main` pubblica in produzione.

Regole: lavoro eseguito da agent con modello Haiku 5.5 ed effort xhigh. Non unire a `main`, non aprire PR, non fare deploy senza conferma del proprietario.

## Passo 1 — Pulizia e ritocchi (un agent)
1. Eliminare `src/pages/stile/` (pagina vetrina dei componenti, noindex).
2. Eliminare `src/styles/legacy.css`:
   - fare la build e controllare, selettore per selettore, se la classe compare ancora in `dist` (HTML e JS del configuratore);
   - spostare solo le regole ancora usate (`body.menu-aperto` in `Intestazione.astro` o `base.css`; regole del wizard in `configuratore.css`);
   - togliere gli import del legacy da `LayoutPagina.astro`, `preventivo/index.astro` e ovunque compaiano;
   - togliere il blocco ALIAS LEGACY da `tokens.css` e il blocco LEGACY da `base.css`, dopo aver verificato con grep che nessuno usa più quei nomi (`--notte`, `--carta-3`, `--serif`, `--t-display`, `--raggio`, ...);
   - togliere i workaround scoped scritti per neutralizzare il legacy (`.prosa` in morbido, `.sezione + .sezione`) se diventano inutili.
3. Eliminare `public/trebla-logo-transparent.png` se non è più referenziato.
4. Ritocchi:
   - Contatti, riga email: su mobile non deve andare a capo a metà parola (corpo più piccolo per l'email, per esempio `clamp(22px, 6vw, 44px)`; `overflow-wrap: anywhere` solo come ultima difesa).
   - Hero a 1440px: le due CTA vanno affiancate (colonne 7-12 o `flex-wrap`).
   - `TestataPagina`: `max-inline-size` del titolo h2 da 14ch a 18ch.
   - `Prosa`: media query della tabella in `min-width`.
5. `public/llms.txt`: prezzi allineati a `src/data/prezzi.ts` (200€, 399€, 490€) ed elenco delle pagine esistenti (senza `/lavori/`). Nessun altro testo nuovo.
6. Verifica:
   - check senza errori, build con 15 pagine;
   - screenshot Playwright a pagina intera di tutte le pagine a 390 e 1440px, prima e dopo la pulizia; le uniche differenze ammesse sono i 4 ritocchi;
   - console senza errori, nessun overflow.
7. Commit e push solo se la verifica è OK.

## Passo 2 — QA tecnico e Lighthouse (un agent, solo report)
- Build e server locale: `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist`.
- Controlli su tutte le pagine a 390, 768, 1024 e 1440px:
  - console, pageerror, richieste con status >= 400, overflow, testi tagliati;
  - link interni (crawl) e redirect da `/lavori` a `/`;
  - menu mobile (apertura, chiusura, Escape);
  - preventivo fino all'href `wa.me`;
  - con reduced motion e con JS disabilitato, tutto il contenuto resta visibile.
- Lighthouse 13.5.0 con `CHROME_PATH=/opt/pw-browsers/chromium` e chrome-flags `--headless=new --no-sandbox --proxy-server=$HTTPS_PROXY --proxy-bypass-list=127.0.0.1;localhost`:
  - 3 run mobile e 3 run desktop su `http://127.0.0.1:4173/`;
  - mediane di Performance, Accessibility, Best Practices, SEO, FCP, LCP, CLS e TBT;
  - le 5 opportunità principali.
- Baseline locale prima del redesign:
  - mobile: Performance, Accessibility, Best Practices e SEO a 100; LCP 1805 ms, CLS 0, TBT 24 ms;
  - desktop: tutte e quattro a 100; LCP 442 ms.

## Passo 3 — Correzioni (solo se necessarie)
Se il passo 2 trova problemi bloccanti (errori, link rotti, overflow, Accessibility sotto 100, CLS sopra 0,1): un agent li corregge, poi un controllo mirato, poi commit e push.

## Passo 4 — Decisioni del proprietario
- Testi aggiunti nel redesign, da confermare o togliere: "Studio indipendente ad Asti." sopra il titolo della hero, l'etichetta "24 domande" nella FAQ, i nomi dei canali (WhatsApp, Email, Telefono, Sede) in Contatti.
- Cloudflare Pages: verificare quale deploy è Production. Il sito online mostra prezzi (190/390/690 €) che non corrispondono a nessun commit.
- `sito.md` e `comecreare.md` non sono aggiornati dopo il redesign.
- Note legali: mancano ragione sociale e P.IVA del titolare (da verificare con un consulente).
- Merge del branch su `main`, cioè la pubblicazione.

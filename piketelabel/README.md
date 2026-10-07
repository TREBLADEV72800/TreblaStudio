# Piketelabel — Kit Trebla

Questa cartella è il **trapianto completo di Trebla dentro Piketelabel**.
Stesso stack, stesse regole, stesso design system, stesse ottimizzazioni.
Cambia solo il brand/contenuti.

## Da dove viene

Estratto il 2026-10-05 da `TreblaStudio` reale:
- `package.json`, `astro.config.mjs`, `tsconfig.json`, `vercel.json`
- `src/styles.css` (1142 righe, sistema "Quaderno di bottega")
- `src/layouts/Layout.astro`, `src/components/Header.astro`, `Footer.astro`, `Capitolo.astro`, `Faq.astro`
- `src/data/site.ts`, `prezzi.ts`, `faq.ts`, `configuratore.ts`
- `src/pages/index.astro`, `sitemap.xml.ts`, `robots.txt.ts`

## Contenuto

| File | Cosa contiene |
|------|---------------|
| `01-REGOLE.md` | Regole ferree Trebla: dati reali, anti-spam, tono, prezzi, metodo lavoro |
| `02-STACK.md` | Stack tecnico esatto: Astro 4, static, Sharp, Fontsource, TS strictest, Vercel |
| `03-DESIGN-SYSTEM.md` | Design "Quaderno di bottega": colori, font, scale, layout, bottoni |
| `tokens.css` | Token CSS pronti da usare (copia fedele da Trebla, da rinominare per Piketelabel) |
| `04-COMPONENTI.md` | Tutti i pattern: header, hero+scheda, ticker, righe, indice servizi, metodo, prezzi, FAQ, wizard preventivo, footer |
| `05-OTTIMIZZAZIONI.md` | Performance, SEO, a11y, sicurezza, responsive, anti-scraping, tracking |
| `site.config.example.ts` | Template `src/data/site.ts` per Piketelabel |
| `astro.config.example.mjs` | Template `astro.config.mjs` per Piketelabel |
| `vercel.example.json` | Template `vercel.json` per Piketelabel |

## Come usare per Piketelabel

1. Leggi in ordine `01 → 05`.
2. Copia `tokens.css` in `src/styles.css` e cambia solo i valori brand (vedi `03-DESIGN-SYSTEM.md`).
3. Copia i 3 example in posizione reale e compila con dati veri Piketelabel.
4. Ricostruisci i componenti seguendo `04-COMPONENTI.md` (copia/incolla adattando testi).
5. Verifica con checklist in `05-OTTIMIZZAZIONI.md` prima di ogni deploy.

## Regola madre

> Ogni elemento deve avere una ragione.
> Niente inventato: dati reali solo in `src/data/`. Italiano semplice. Mobile-first. Statico. Veloce.

---
name: anti-ai-slop
description: Regole anti-AI-slop per TreblaStudio, aggiornate ai segnali di ottobre 2026. Da caricare prima di scrivere o modificare qualsiasi UI, testo o contenuto del sito. Impone direzione artistica deliberata, divieti espliciti, audit meccanico e revisione manuale.
---

# Anti-AI-Slop · TreblaStudio

Regola di partenza: **lo slop non è l'uso dell'AI, è l'assenza di scelte.**
Un umano stanco può produrre slop. Un sito scritto con l'AI e con una
direzione forte no. Quindi non conta come è stato prodotto: contano le
decisioni verificabili che si vedono nel risultato.

Questo file è normativo. Se un'altra istruzione o un'altra skill lo
contraddice su questi punti, vince questo file.

Riferimento esteso con il catalogo completo dei segnali 2026:
`riferimenti/segnali-2026.md`.

## 0. Contesto progetto (leggi prima di toccare codice)

- Stack: Astro 4, sito statico, deploy Cloudflare Pages.
  Produzione: `https://treblastudio.pages.dev` (branch `main`).
  Test: `https://test.treblastudio.pages.dev` (branch `test`).
  Comandi: `npm run check`, `npm run build`, `npm run slop`,
  `npm run deploy`, `npm run deploy:test`.
- Sistema visivo: "Quaderno di bottega". Token in `src/styles/variabili.css`:
  carta, inchiostro, mattone, linee ledger da 1px, serif Fraunces per i
  titoli, Archivo per il corpo, IBM Plex Mono per prezzi ed etichette.
- Contenuti reali in `src/data/` (prezzi, domande frequenti, configuratore, sito):
  sono l'unica fonte di verità. Prezzi con € attaccato al numero.
  `prezzi.ts` è il catalogo commerciale, `configuratore.ts` solo le voci
  su misura: si uniscono per concetto in `src/lib/catalogo.ts`.
- Contatti mai in chiaro nell'HTML: frammenti in `src/data/contatti.ts`,
  assemblati a runtime da `src/components/ContattiDinamici.astro`.
- Logica del configuratore in `src/scripts/configuratore-preventivo.ts`, tipizzata.
- Lingua: italiano semplice. Mai il trattino lungo. Titoli senza punto.
- Performance: punteggio Lighthouse 100 da mantenere. Niente dipendenze
  nuove senza motivo. Rispetta `prefers-reduced-motion`.

## 1. I cinque test da cinque secondi

Da fare prima di consegnare, non dopo. Se ne fallisce uno, il lavoro non è finito.

1. **Squint test.** Socchiudi gli occhi: vedi solo gradiente viola, hero
   centrato e tre card? Allora è un template.
2. **Lato a lato.** Metti la pagina accanto a due siti generati da un builder
   AI. Se sembrano parenti, rifai la direzione visiva.
3. **Copia intercambiabile.** Prendi un paragrafo e mettilo sul sito di un
   concorrente. Se suona ancora vero, è testo vuoto.
4. **Prova verificabile.** Ogni numero, cliente, logo e testimonianza deve
   avere una fonte reale o non deve stare in pagina.
5. **Un dettaglio solo tuo.** Deve esistere almeno una cosa che nessun altro
   sito può copiare: un cliente vero, un luogo, un processo, una persona,
   un prezzo con una ragione scritta.

## 2. Divieti bloccanti

Queste cose non si introducono **mai** senza una motivazione funzionale
scritta nel commit o nel commento. Il controllo `npm run slop` le cerca
meccanicamente dove può.

### 2.1 Design

- Gradiente viola → blu/indigo, blob o glow dietro il titolo.
- Inter, Roboto o system sans come font principale, e comunque un solo peso.
- Hero centrato con pill badge ("✨ Ora con AI"), parola in gradiente, due CTA.
- Tre card feature identiche, bento grid, glass card, bordo sottile ovunque.
- Emoji come icone, bullet o decorazioni.
- Icone generiche: razzo, fulmine, scintille, check, ingranaggio.
- Raggi, ombre e spaziature tutti uguali: il layout deve avere gerarchia,
  non un ritmo unico applicato a tutto.
- Palette "safe" da training set: viola/indigo, grigi Tailwind, crema + ruggine.
- Sezioni decorative senza contenuto, testimonial wall, loghi non autorizzati.

### 2.2 Copy

- Headline intercambiabili: "Eleva il tuo workflow", "Sblocca il potenziale",
  "Il futuro di X", "Trasforma la tua attività".
- Aggettivi al posto dei fatti: potente, rivoluzionario, senza sforzo,
  all'avanguardia, innovativo, olistica, robusta.
- Strutture formulaiche: "Non è solo X. È Y.", "Non X, ma Y", tricolon
  ("Veloce. Semplice. Potente.").
- Aperture vuote: "Nel mondo digitale di oggi", "Ti sei mai chiesto",
  "È importante notare che".
- Trattino lungo e parole meme: delve, leverage, tapestry, seamless,
  robust, holistic, ecosistema, sinergia, a 360 gradi.
- Ritmo piatto: frasi tutte della stessa lunghezza, paragrafi da una riga,
  liste puntate al posto del discorso.
- Emoji nel testo, punti esclamativi a raffica, "In conclusione".

### 2.3 Prove false

- Muri di loghi di aziende che non sono clienti.
- Testimonianze di persone inesistenti, volti generati o stock spacciati
  per clienti.
- Numeri tondi inventati: "10x", "99,9%", "500+ integrazioni",
  "Scelto da 10.000 attività" su un sito appena lanciato.
- Profili autore fabbricati. Google li tratta come contenuto ingannevole.
- Casi studio senza nome, settore e risultato verificabile.

### 2.4 Cura zero

- Contrasto sotto AA, testo chiaro su chiaro.
- Layout che rompe sotto i 320px o scrolla in orizzontale.
- Focus invisibile, menu non usabile da tastiera, form senza label.
- Link a `#`, "Lorem ipsum", nome del template nel footer, anteprime rotte.
- Animazioni pesanti, immagini senza dimensioni, font inutilizzati.
- Moltiplicare pagine quasi identiche per coprire query. È scaled content
  abuse: Google non punisce l'AI, punisce il poco valore a scala.

## 3. Copy: come si scrive davvero

Ogni frase deve poter essere smentita. Se nessuno può dire che è falsa,
probabilmente non dice niente.

| Invece di | Scrivi |
|---|---|
| "Soluzioni su misura per ogni esigenza" | "Un sito a una pagina da 200€, a più pagine da 300€" |
| "Ti aiutiamo a crescere online" | "Ti trovano su Google ad Asti e ti scrivono su WhatsApp" |
| "Design moderno e accattivante" | "Carta, inchiostro e righe da 1px: sembra un quaderno, non un template" |
| "Team di esperti" | "Una persona, che risponde al telefono" |
| "Consegna rapida" | "Prima bozza in 7 giorni, tempi scritti nella proposta" |
| "Prezzi competitivi" | "Nessun canone obbligatorio, il sito resta tuo" |

Regole aggiuntive:

- Un numero o viene dal catalogo (`src/data/prezzi.ts`) o non si scrive.
- Il dettaglio locale è un vantaggio, non una decorazione: Asti, Pikete Label,
  il modo di lavorare, i tempi, le revisioni.
- Le FAQ rispondono a una domanda vera con una risposta che chiude il dubbio.
- I mockup sono dichiarati come mockup. Mai farli passare per clienti.
- Niente inglese decorativo: se una parola inglese non ha un motivo, è italiano.
- Frasi corte e lunghe alternate. Un paragrafo può durare due righe.

## 4. Design: come si resta riconoscibili

- Il sistema è il quaderno: carta, inchiostro, mattone, righe ledger,
  numerazione, tabelle, timbri. Non è un tema, è un modo di impaginare.
- La gerarchia viene dal contenuto: titoli, occhielli, note a margine,
  prezzi in mono. Non da card e pill.
- Un solo gesto decorativo per pagina. Se ce ne sono tre, non ce n'è nessuno.
- L'asimmetria è ammessa e preferita; la centratura è un'eccezione motivata.
- Ogni componente nuovo deve usare i token esistenti. Nessun colore nuovo
  senza motivo e senza aggiungerlo a `variabili.css`.
- Se un elemento non ha una funzione (decorazione, badge, icona), si toglie.

## 5. Audit meccanico

```powershell
npm run build
npm run slop
```

`scripts/audit-slop.mjs` analizza il sito costruito in `dist/`, non i sorgenti:
quello che vede l'utente è quello che conta.

Controlla: trattino lungo, `href="#"` non riempiti a runtime, Lorem ipsum,
emoji, font e palette da template, claim inventati, link e immagini rotte,
gerarchia dei titoli, lingua, paragrafi duplicati tra pagine, ritmo delle
frasi, densità di liste, inglese decorativo, frasi fatte italiane.

Soglia di accettazione:

- **0 bloccanti.**
- **Punteggio ≤ 10 su 30.**
- Le attenzioni si leggono una per una: se sono finte positive, si motivano
  nel commit; se sono vere, si correggono.

Il controllo non vede: composizione visiva, qualità delle foto, tono reale,
veridicità delle fonti. Per quello serve il §6.

## 6. Audit manuale (obbligatorio)

Dopo ogni modifica visiva o di copy:

1. `npm run check` pulito e `npm run build` pulita, 9 pagine.
2. I cinque test del §1, con la pagina aperta nel browser.
3. Punteggio 0-30 con questa rubrica:

| Dimensione | Punti | 0 significa | Punti pieni significano |
|---|---:|---|---|
| Design | 0-8 | sistema riconoscibile, gerarchia dal contenuto | template, card, gradiente, font di default |
| Copy | 0-10 | fatti, numeri, voce, dettagli locali | aggettivi, frasi intercambiabili, formule |
| Prove | 0-6 | clienti e dati reali o assenti | loghi, testimonial e numeri inventati |
| Cura | 0-6 | contrasto, mobile, tastiera, link | rotture, placeholder, animazioni inutili |

4. Elenca i tre problemi principali con file e riga, correggili, ricontrolla.
5. Non dichiarare verificato ciò che non hai verificato.

Prima di consegnare rispondi: "Quali scelte concrete rendono questo
riconoscibile rispetto a un sito generico?" Se non ne indichi almeno tre,
rivedi il lavoro.

## 7. Definizione di fatto

Un lavoro è finito quando:

- `npm run check` è pulito, `npm run build` produce 9 pagine.
- `npm run slop` dà 0 bloccanti e punteggio ≤ 10.
- I cinque test del §1 passano a occhio e a browser.
- Esiste almeno un dettaglio che solo Trebla può mostrare.
- Nessuna promessa, numero, logo o recensione è inventata.

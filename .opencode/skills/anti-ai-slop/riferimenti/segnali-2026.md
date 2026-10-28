# Segnali AI-slop 2026 · catalogo di riferimento

Materiale di consultazione per `SKILL.md`. Serve a riconoscere lo slop e a
motivare un divieto quando qualcuno lo propone. Non è una lista di mode da
seguire: è una lista di cose da cui stare lontani.

Definizione di lavoro: **slop** è contenuto digitale di bassa qualità,
prodotto in quantità, spesso con AI, senza revisione umana. Non è "fatto con
l'AI": è **generico, senza decisioni, prodotto in bulk, non controllato**.

I modelli e i builder convergono sul centro statistico dei dati di training.
Per questo due siti fatti da strumenti diversi si somigliano. L'unico modo
per non finirci dentro è decidere cose che il modello non sceglierebbe da solo.

---

## 1. Design: il "look AI"

### 1.1 Segnali forti

- Gradiente viola → blu/indigo. È il tell più riconoscibile e deriso.
- Blob sfocato o glow dietro il titolo.
- Font Inter (o Roboto/system sans) ovunque, spesso un solo peso.
- Hero centrato: badge pill, titolo grande, parola in gradiente,
  sottotitolo generico, due bottoni.
- Tre card feature identiche: icona in alto, angoli arrotondati, ombra morbida.
- Bento grid usata come riempitivo.
- Glass card: sfondo semitrasparente, blur, bordo sottile.
- Icone segnaposto: razzo, fulmine, scintille, check, ingranaggio.
- Tutto a card, bordi 1px grigi, whitespace abbondante, raggi identici.
- Palette "safe": viola/indigo, grigi Tailwind, crema + ruggine.
- Layout intercambiabile: potrebbe essere qualsiasi prodotto.

### 1.2 Il problema della lista

Bandire il viola e Inter non basta: il centro statistico si sposta.
Togli il viola e arriva Instrument Serif con le caption mono. Togli Inter e
arriva Geist. La lista dei font "giusti" cambia ogni sei mesi.

Quindi la regola non è "usa un altro font". È: **il sistema visivo deve
nascere dal contenuto e dal mestiere**, non dalla moda. Per Trebla è il
quaderno di bottega: carta, inchiostro, mattone, righe da 1px, numerazione,
tabelle, timbri. Non lo si cambia per sembrare aggiornati.

### 1.3 Cosa guardare invece

- La gerarchia viene dal contenuto (titoli, occhielli, note, prezzi)?
- Esiste una griglia riconoscibile o solo un flex centrato?
- Ci sono almeno due tipi di impaginazione diversi nella stessa pagina?
- Il sito regge senza ombre, senza raggi, senza gradienti?
- Se togli il logo, si capisce ancora di chi è?

---

## 2. Copy: il "suono AI"

Testo corretto, sicuro di sé e vuoto. Nessuna posizione, nessun dettaglio,
nessuna verifica.

### 2.1 Segnali

- Headline generiche: "Eleva il tuo workflow", "Sblocca il potenziale",
  "Costruito per il futuro del lavoro", "Trasforma la tua attività".
- Aggettivi al posto dei fatti: seamless, powerful, stunning, next-level,
  revolutionary, robust, holistic.
- Strutture formulaiche: "Non è solo uno strumento. È un movimento."
  "Non X, ma Y."
- Tricolon: "Veloce. Semplice. Potente."
- Aperture vuote: "Nel mondo digitale di oggi", "È importante notare che",
  "Ti sei mai chiesto".
- Trattino lungo ovunque.
- Parole meme: delve, leverage, tapestry, seamless, robust, holistic.
- Ritmo piatto: frasi della stessa lunghezza, paragrafi da una riga,
  elenchi puntati al posto del discorso.
- Nessun esempio concreto, nessun nome, nessun dato verificabile.
- Emoji come bullet.
- Chiusure: "In conclusione", "In sintesi", "Ricapitolando".

### 2.2 Parole italiane che tradiscono il testo generato

Non sono vietate in assoluto: sono vietate **quando sostituiscono un fatto**.

| Formula vuota | Perché è vuota | Sostituzione |
|---|---|---|
| soluzioni su misura per ogni esigenza | non dice cosa fai | "un sito a una pagina da 200€" |
| all'avanguardia | non è verificabile | "senza canone, il sito resta tuo" |
| trasforma la tua attività | promessa non misurabile | "ti trovano su Google ad Asti" |
| eleva la tua presenza online | metafora senza contenuto | "una pagina che si apre in meno di un secondo" |
| potenzia il tuo business | gergo | "più richieste su WhatsApp" |
| ecosistema / sinergia / a 360 gradi | gergo aziendale | il fatto specifico |
| pensato per / progettato per | riempitivo | il soggetto che fa la cosa |
| il futuro di X | slogan | la cosa che fai oggi |
| esperienza senza sforzo | aggettivo | il numero di passaggi |
| azienda leader nel settore | classifica non verificabile | il cliente vero, se esiste |

### 2.3 Ritmo

Il testo generato tende a una lunghezza media costante. Un testo umano
alterna: una frase di tre parole, poi una di venti. Se tutte le frasi
misurano 12-18 parole, il testo suona piatto anche se è corretto.

Controllo meccanico: deviazione standard / media delle lunghezze.
Sotto 0,28 con almeno 8 frasi, il ritmo è sospetto.

---

## 3. Prove false

- Muri di loghi di aziende che non ti conoscono.
- Testimonial di persone inesistenti, headshot generati.
- Numeri tondi inventati: "10x faster", "99,9% uptime", "500+ integrazioni",
  "Scelto da 10.000 team" su un sito lanciato ieri.
- Profili autore fabbricati: nome inventato, foto AI o stock alterato.
  Google li considera contenuto ingannevole.
- Casi studio senza cliente, settore, problema e risultato.
- Recensioni senza fonte, voti senza piattaforma.

Regola Trebla: **se non è successo, non si scrive.** Un sito senza
testimonial è più credibile di un sito con testimonial finti.

Cosa si può mostrare al posto delle prove finte:

- il proprio lavoro, dichiarato come tale (Pikete Label);
- il processo (prima bozza, revisioni, consegna);
- i prezzi e cosa includono;
- i tempi e i limiti;
- la persona che risponde.

---

## 4. Cura zero

- Testo grigio chiaro su bianco, contrasto sotto AA.
- Layout che rompe su mobile o scrolla di lato.
- Nessun focus visibile, menu inutilizzabile da tastiera.
- Link a `#`, "Lorem ipsum", nome del template nel footer.
- Anteprime social rotte, favicon mancante, canonical sbagliato.
- Animazioni pesanti che ritardano il primo paint.
- Molte pagine quasi identiche per coprire query.

Nel 2026 Google tratta queste cose come **scaled content abuse**: non punisce
l'AI in sé, punisce il poco valore prodotto a scala. Un sito piccolo e curato
non ha questo problema. Un sito con 200 pagine generate sì.

---

## 5. Come si riconosce in cinque secondi

1. Squint test: blurri gli occhi e vedi gradiente + tre card + hero centrato.
2. Lato a lato con due siti generati da builder: sembrano parenti.
3. Copia intercambiabile: il testo funziona anche su un concorrente.
4. Claim non verificabili e foto sospette.
5. Sensazione di template non personalizzato, zero dettagli unici.

Se anche solo due dei cinque sono veri, il lavoro va rifatto, non ritoccato.

---

## 6. Come si evita

- Fai le decisioni che l'AI non può fare: cliente, luogo, processo, prezzo,
  tono, cosa rifiuti.
- Riscrivi il copy con fatti specifici e voce tua.
- Usa foto reali o nessuna foto.
- Scegli palette e font per una ragione, non per moda.
- Elimina le sezioni che esistono solo per riempire.
- Aggiungi una cosa sola tua, e falla vedere.
- Controlla accessibilità, mobile, contrasti, link, claim.
- Non pubblicare il primo draft.

---

## 7. Fonti e orizzonte

Sintesi dei segnali diffusi tra settembre e ottobre 2026: articoli di settore
sul "look AI" dei builder, discussioni su Reddit e Hacker News, guidance
Google su spam e scaled content abuse, analisi sulla struttura del testo
commerciale generato. "Slop" è parola dell'anno 2025 per Merriam-Webster.

Questa lista invecchia. La regola che non invecchia è quella del §6:
**decidere cose che il modello non sceglierebbe da solo.** Se tra sei mesi
il viola non va più di moda, il quaderno di bottega resta comunque nostro.

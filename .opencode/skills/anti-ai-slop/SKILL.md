---
name: anti-ai-slop
description: Regole anti-AI-slop per TreblaStudio. Da caricare prima di scrivere o modificare qualsiasi UI del sito. Impone direzione artistica deliberata, divieti sui pattern generici e revisione obbligatoria.
---

# Anti-AI-Slop · TreblaStudio

Agisci come senior product designer, art director e frontend engineer.
Il tuo compito non è produrre "un'interfaccia moderna": è estendere il
sistema esistente con scelte deliberate e verificabili.

## 0. Contesto progetto (leggi prima di toccare codice)

- Stack: Astro 4, sito statico, deploy Vercel (`treblastudio.vercel.app`).
  Comandi: `npm run check`, `npm run build`, push su `main`,
  `vercel --prod --yes`.
- Sistema visivo: "Quaderno di bottega". Token in `src/styles/tokens.css`:
  carta, inchiostro, mattone, linee ledger da 1px, serif Fraunces per i
  titoli, Archivo per il corpo, IBM Plex Mono per prezzi ed etichette.
- Contenuti reali in `src/data/` (prezzi, faq, configuratore, site):
  sono l'unica fonte di verità. Prezzi con € attaccato al numero.
  `prezzi.ts` è il catalogo commerciale, `configuratore.ts` solo le voci
  su misura: si uniscono per concetto in `src/lib/catalogo.ts`.
- Contatti mai in chiaro nell'HTML: frammenti in `src/data/contatti.ts`,
  assemblati a runtime da `src/components/Contatti.astro`.
- Logica del configuratore in `src/scripts/wizard.ts`, tipizzata.
- Lingua: italiano semplice. Mai il trattino lungo —. Titoli senza punto.
- Performance: punteggio Lighthouse 100 da mantenere. Niente dipendenze
  nuove senza motivo. Rispetta `prefers-reduced-motion`.

## 1. Prima di scrivere codice

- Leggi pagine, componenti e CSS esistenti. Non reinventare componenti.
- Definisci la direzione artistica in una riga, coerente col quaderno.
- Elenca almeno tre scelte concrete che rendono riconoscibile il risultato
  rispetto a un template generico. Se non le trovi, fermati.
- Controlla che ogni testo sia concreto e verificabile: niente clienti,
  recensioni, numeri, classifiche ("il più scelto") o credenziali inventate.
  Esempi e mockup devono essere riconoscibili come tali.

## 2. Divieti

Non usare automaticamente, salvo funzione precisa e motivata:

- Gradienti viola/blu, glassmorphism, neon, glow, ombre morbide casuali.
- Hero centrati con titolo enorme + sottotitolo generico + due pulsanti.
- Griglie di tre card identiche, card arrotondate ovunque, badge decorativi.
- Emoji, illustrazioni astratte, stock senza relazione col progetto.
- Fade-up ripetuti, animazioni senza scopo.
- Font, palette e componenti predefiniti senza motivazione progettuale.
- Testi promozionali generici, superlativi vuoti, sezioni riempitive.

## 3. Qualità implementazione

- HTML semantico, contrasto AA, focus visibile, navigazione da tastiera.
- Ogni pulsante, link e form deve funzionare davvero.
- Niente duplicazioni CSS, valori casuali, codice o file morti: se un
  selettore, export o asset non è più usato, cancellalo e verifica con
  build + grep prima di consegnare.
- Statico e veloce: niente JS che legge geometrie, niente pesi font
  inutilizzati, immagini ridotte al necessario con dimensioni dichiarate.

## 4. Revisione obbligatoria (audit)

Dopo ogni modifica visiva:

1. `npm run check` pulito (0 errori) e `npm run build` pulita, 9 pagine,
   nessun errore.
2. Cerca pattern generici, gerarchie deboli, spaziature incoerenti,
   testi vaghi, decorazioni senza funzione.
3. Dai un punteggio di genericità 0-30 (0 distintivo, 30 stereotipo).
4. Elenca i tre problemi principali con file e riga, correggili, ricontrolla.
5. Non dichiarare verificato ciò che non hai verificato.

Prima di consegnare rispondi: "Quali scelte concrete rendono questo
riconoscibile rispetto a un sito generico?" Se non ne indichi almeno tre,
rivedi il lavoro.

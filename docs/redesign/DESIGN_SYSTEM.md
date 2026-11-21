# Design system Trebla (redesign 2026)

Principio: struttura rigorosa (griglia, filetti da 1px, metadati in mono maiuscolo, un solo accento, niente ombre) unita a una tipografia display gigante e a un movimento curato (fasce scure alternate, titoli che si rivelano parola per parola, micro-interazioni, transizioni tra pagine). Nessuna foto: il design è tipografico.

## Colori (token su :root)
- --carta #EEECE7: fondo principale
- --carta-2 #E3E0D9: superfici, hover leggeri
- --inchiostro #141210: testo, fasce scure
- --grafite #1F1C19: fascia di chiusura
- --morbido #5E5A53: testo secondario su carta (5,8:1)
- --morbido-scuro #A39E95: testo secondario su scuro (7,0:1)
- --linea rgba(20,18,16,.14): filetti su carta
- --linea-scura rgba(238,236,231,.16): filetti su scuro
- --mattone #E8401C: accento. Fondo dei CTA (con testo inchiostro), testi display grandi (da 24px in su), puntini, barre. MAI per testo piccolo su carta
- --mattone-testo #B23A12: accento per testo piccolo su carta (5,1:1)
- --verde #157F3D: WhatsApp, puntino "disponibili"
Regole: niente gradienti, niente box-shadow, niente blur. Angoli vivi (radius 0) su card e superfici; forma a pillola (999px) solo per bottoni e chip. Accento al massimo una volta per schermata. Le fasce scure (inchiostro e grafite) si alternano a quelle color carta.

## Tipografia
- Display: Archivo variabile con asse larghezza. font-stretch 64%, font-weight 800, MAIUSCOLO, line-height .88, letter-spacing -0.01em. Serve per H1, H2, numeri di prezzo, voci grandi di menu e footer, marquee, wordmark.
- Testo: Archivo a larghezza 100%, pesi 400, 500 e 600.
- Mono: IBM Plex Mono 400 e 500, MAIUSCOLO, per etichette, numeri di sezione, metadati, nav, chip.
- Scala:
  - --fs-hero clamp(60px, min(12vw, 17svh), 196px), lh .88
  - --fs-h2 clamp(44px, 7.6vw, 124px), lh .9
  - --fs-h2-s clamp(36px, 4.8vw, 72px), lh .92 (sottosezioni e pagine interne)
  - --fs-h3 clamp(21px, 1.7vw, 28px), Archivo 600, lh 1.15, ls -0.02em
  - --fs-lead clamp(18px, 1.5vw, 22px), lh 1.45, max 52ch
  - --fs-body 16px → 17px da 960px, lh 1.55, max 62ch
  - --fs-small 14px, lh 1.45
  - --fs-label 12px mono 500, ls .08em
  - --fs-micro 10.5px mono 400, ls .1em
  - --fs-wordmark clamp(110px, 26vw, 440px)
- Titoli: di default in un solo colore. Gli H2 lunghi possono essere a due toni (prima parte inchiostro, seconda morbido). L'accento mattone nei titoli SOLO nella hero e nella fascia di chiusura. VIETATO il corsivo e la formula "ultima parte del titolo in corsivo colorato". Fraunces è eliminato.

## Spaziature e griglia
- --pad: max(clamp(16px, 2.6vw, 40px), (100vw - 1680px) / 2), margine laterale
- --gap: clamp(16px, 1.7vw, 24px)
- Griglia: 4 colonne sotto 640px, 6 colonne da 640px, 12 colonne da 960px
- --sezione: clamp(64px, 8.4vw, 128px), padding verticale delle sezioni
- Scala: --s-1 4px, --s-2 8px, --s-3 12px, --s-4 16px, --s-5 24px, --s-6 32px, --s-7 48px, --s-8 64px, --s-9 96px, --s-10 128px
- Header: --hh 72px (64px sotto 960px)

## Movimento
- --ease-out cubic-bezier(.16,1,.3,1): reveal e ingressi
- --ease-expo cubic-bezier(.19,1,.22,1): sottolineature e roll
- --ease-in-out cubic-bezier(.65,0,.35,1): menu e transizioni tra pagine
- --ease-std cubic-bezier(.4,0,.2,1): cambi di colore
- Durate: --t-1 150ms, --t-2 300ms, --t-3 600ms, --t-4 900ms, --t-5 1100ms. Stagger 60ms tra parole, 80ms tra elementi.

## Catalogo animazioni (solo transform/opacity; con reduced motion tutto visibile e fermo)
- A1 Ingresso hero: le parole dell'H1 salgono da una maschera (translateY 105% → 0), --t-5 --ease-out, stagger 60ms. CSS puro, parte al caricamento. Il lead non è animato. Etichetta e CTA: fade-up 24px, --t-4, con ritardo 300-500ms.
- A2 Reveal allo scroll [data-reveal]: opacity 0 → 1 e translateY 24px → 0, --t-4 --ease-out, ritardo var(--d). Un titolo rivelato dentro [data-reveal] anima le parole come A1.
- A4 Marquee: 2 righe in direzioni opposte, inclinazione fino a ±5° in base alla velocità di scroll, pausa fuori schermo.
- A5 Header: si nasconde scorrendo verso il basso (translateY -100%) e riappare scorrendo verso l'alto; il fondo color carta appare (opacity) dopo 40px.
- A6 Barra di avanzamento: 2px mattone in alto, scaleX con animation-timeline: scroll().
- A7 Menu mobile: il pannello inchiostro scende (translateY -100% → 0), --t-4 --ease-in-out; le voci display salgono dalla maschera con stagger 60ms.
- A8 Hover sulla nav: il testo "rotola" (due copie, translateY -100%), --t-3 --ease-expo.
- A9 Hover sui bottoni pill: un velo entra da sinistra (scaleX 0 → 1), il testo cambia colore, la freccia esce in alto a destra e rientra dal basso a sinistra.
- A10 Hover sui link testuali: doppia sottolineatura; quella di riposo esce a destra (scaleX → 0, origine destra), la nuova entra da sinistra, --t-3 --ease-expo.
- A11 Hover sulle righe (servizi): riempimento mattone dal basso (scaleY), testo inchiostro, indice +12px, il "+" ruota di 45°.
- A12 Hover sulle card dei prezzi: bordo → mattone (--t-2 --ease-std), la freccia si sposta di 4px.
- A13 Cursore che segue (solo hover:hover e pointer:fine): cerchio di 84px inchiostro con etichetta mono, visibile solo sopra [data-cursore="Etichetta"], con lerp 0,18. Altrove resta il cursore nativo.
- A14 Accordion: details/summary; il "+" ruota di 45° (--t-2); il contenuto fa fade-up di 12px (--t-3) all'apertura; l'altezza cambia istantaneamente.
- A15 Transizioni tra pagine: View Transitions cross-document in CSS. La pagina uscente va in opacity 0 e translateY -3vh (350ms); quella entrante passa da translateY 6vh a 0 e da opacity 0 a 1 (600ms --ease-out); l'header resta fermo.
- A16 Puntino "pulse": scala da 1 a 2,2 e opacity da .5 a 0, in 2s, all'infinito.

## Componenti condivisi
Bottone pill (primario, secondario, chiaro su scuro, WhatsApp) con freccia in un cerchio; link sottolineato; link roll; etichetta mono con puntino; chip; testata di sezione (numero mono più etichetta più filetto più H2 display); titolo rivelato (parole in maschera); accordion; scheda con bordo da 1px; fascia scura e fascia grafite.

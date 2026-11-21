# Piano di rifinitura (skill frontend-design)

Soggetto: Trebla, studio di due persone ad Asti. Fa siti, grafiche e social per attività locali (pizzerie, officine, trattorie, botteghe). Pubblico: titolari pratici, che usano soprattutto il telefono e diffidano delle agenzie. Compito del sito: far partire il preventivo o un messaggio WhatsApp. Perché scelgono Trebla: prezzi chiari, il sito resta loro, due persone che rispondono.

## Colore (palette invariata, uso disciplinato)

- Carta #EEECE7: fondo. Carta-2 #E3E0D9: fondo secondario e hover.
- Inchiostro #141210: testo e fasce scure. Grafite #1F1C19: fascia di chiusura e footer.
- Morbido #5E5A53: testo secondario su carta. Morbido-scuro #A39E95: testo secondario su scuro.
- Mattone #E8401C: SOLO riempimento del bottone primario e parola che cicla nella hero. Mai su puntini, trattini, numeri, bordi o separatori.
- Mattone-testo #B23A12: solo anello di focus.
- Verde #157F3D: solo WhatsApp.
- Linea rgba(20,18,16,.14): filetti solo tra voci di un elenco.

## Tipografia: una sola famiglia, Archivo variabile

- Display: font-stretch 64%, peso 800, MAIUSCOLO (scelta del proprietario), interlinea 0.88-0.92. Ruoli: hero, H1 di pagina, H2 di sezione, prezzi grandi, wordmark.
- Testo: larghezza 100%, peso 400, frase normale. Corpo 16/17px con interlinea 1.55; lead 18/21px con interlinea 1.45; small 14px.
- Interfaccia (nav, bottoni, breadcrumb, etichette utili): Archivo 600, 15px, frase normale, nessun letter-spacing, MAI maiuscolo.
- H3: Archivo 600, 21/24px.
- Cifre dei prezzi: tabular-nums lining-nums.
- IBM Plex Mono eliminato.
- Misura: prosa al massimo 34em (circa 70-75 caratteri).

## Impaginazione

- Tutto allineato a sinistra, griglia a 12 colonne.
- Testata di sezione: solo l'H2, più una nota breve a destra su desktop. Niente eyebrow, niente "NN ·", niente filetto in testa.
- Un solo ritmo tra le sezioni (--sezione) in tutte le pagine.
- Numeri solo dove c'è una sequenza vera: Metodo e configuratore.

```
[logo]   Servizi Metodo Prezzi Chi siamo Domande Contatti   [Fai il preventivo]
UN SITO CHIARO
PER FAR SCEGLIERE
LA TUA PIZZERIA.            lead (2-3 righe)      [Fai il preventivo →] [Vedi i servizi]
Il sito è tuo · ecc. diventa una riga di testo semplice
──────── ticker su una riga: pizzerie, officine, trattorie… ────────
COSA CAMBIA                    4 voci in 2×2, senza numeri
IL SITO AL CENTRO…             righe dei servizi, prezzo in display a destra
COME LAVORIAMO                 1→5 lungo un filo verticale (sequenza vera)
PREZZI                         200 / 399 / 490 in display, confronto leggibile
DUE PERSONE                    Albert, Gabriel
DOMANDE                        5 domande
[fascia grafite] COMINCIAMO…   [Fai il preventivo →] [Scrivici su WhatsApp]
```

## Principi

1. Un solo gesto audace: la parola che cicla nella hero. Tutto il resto è quieto.
2. Il prezzo è un oggetto tipografico.
3. Ogni struttura deve portare informazione. Niente etichette di riempimento, niente numerazioni finte, niente puntini colorati, niente titoli a due toni.
4. Un nome per ogni azione:
   - "Fai il preventivo"
   - "Scrivici su WhatsApp"
   - "Vedi i prezzi"
   - "Leggi le domande frequenti"
   - "Scrivi un'email"
   - "Chiama"

   Niente frecce nel testo.
5. Movimento, "via di mezzo".
   - Restano: l'ingresso della hero, la parola che cicla, lo svelamento dei titoli di sezione, le View Transitions, il menu, le FAQ, l'hover dei bottoni e il cursore personalizzato (solo su servizi e prezzi).
   - Spariscono: il reveal sui blocchi, il pulse, lo skew del ticker, la barra di avanzamento e l'animazione delle lettere del wordmark.
6. Base di qualità: 390px, focus visibile, reduced motion, contrasti AA.

## Revisione rispetto al brief

- La palette resta per scelta del proprietario, ma il mattone è limitato a due usi.
- Il movimento non viene azzerato, perché il brief chiedeva fluidità.
- Il display maiuscolo resta (scelta del proprietario). Il maiuscolo sparisce solo dalle etichette.
- Cosa resta specifico di Trebla: i mestieri dei clienti nel titolo e nel ticker, i prezzi come oggetto, due persone con nome.

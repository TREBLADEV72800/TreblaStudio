# Design system Trebla (rifinitura 2026)

Principio: tipografia di una sola famiglia (Archivo variabile), un gesto audace (la parola che cicla nella hero) e tutto il resto quieto. Struttura rigorosa, senza decorazioni che non portano informazione. Nessuna foto: il design è tipografico. Il piano completo e le ragioni sono in `PIANO-RIFINITURA.md`.

## Colori (token su :root in src/styles/tokens.css)

| Token | Valore | Uso |
|---|---|---|
| `--carta` | #EEECE7 | fondo principale |
| `--carta-2` | #E3E0D9 | fondo secondario, hover |
| `--inchiostro` | #141210 | testo, fasce scure, sottolineature della voce corrente |
| `--grafite` | #1F1C19 | fascia di chiusura e footer |
| `--morbido` | #5E5A53 | testo secondario su carta (5,8:1) |
| `--morbido-scuro` | #A39E95 | testo secondario su scuro (7,0:1) |
| `--linea` | rgba(20,18,16,.14) | filetti tra le voci di un elenco, su carta |
| `--linea-scura` | rgba(238,236,231,.16) | filetti su scuro |
| `--mattone` | #E8401C | SOLO riempimento del bottone primario e parola che cicla nella hero |
| `--mattone-testo` | #B23A12 | SOLO anello di focus su superfici chiare |
| `--verde` | #157F3D | SOLO WhatsApp |
| `--su-verde` | #FFFFFF | testo sul verde WhatsApp |

Regole:
- Il mattone non va mai su puntini, trattini, numeri, bordi, separatori o testo.
- Il verde è solo del bottone WhatsApp.
- Niente gradienti, niente box-shadow, niente blur.
- Le fasce scure (`.fascia-scura`, inchiostro; `.fascia-grafite`, grafite) ridefiniscono filetti, testo secondario e focus. Il footer è grafite.

## Tipografia

Una sola famiglia: Archivo variabile (`--font-display`, `--font-testo`, `--font-ui`). IBM Plex Mono è eliminato.

Ruoli:
- **Display**: font-stretch 64%, peso 800, maiuscolo (scelta del proprietario), interlinea 0.88-0.92. Solo per: hero (`.display--hero`), H1 di pagina, H2 di sezione (`.display--h2`, `.display--h2-s`), prezzi grandi (`.display--prezzo`), wordmark.
- **Testo**: font-stretch 100%, peso 400, frase normale. Corpo 16px, 17px da 960px, interlinea 1.55. Lead 18/21px, interlinea 1.45. Small 14px.
- **Interfaccia** (nav, bottoni, breadcrumb, menu): Archivo 600, `--fs-ui` 15px, frase normale, nessun letter-spacing, MAI maiuscolo. Il breadcrumb è 14px (`--fs-small`).
- **Etichette** (`.etichetta`): Archivo 600, 14px, frase normale, morbido. Nessun puntino.
- **H3**: Archivo 600, da 21 a 24px (`--fs-h3`).
- **Cifre dei prezzi**: `tabular-nums lining-nums`.
- **Misura**: p e liste al massimo 34em (circa 70-75 caratteri).

Scala (token):
- `--fs-hero` clamp(60px, min(12vw, 17svh), 196px), lh .88
- `--fs-h2` clamp(44px, 7.6vw, 124px), lh .9
- `--fs-h2-s` clamp(34px, 4.8vw, 72px), lh .92 (sottosezioni e pagine interne; 34px a 390px, per restare sopra `--fs-h2-xs`)
- `--fs-h2-xs` clamp(26px, 2.4vw, 40px), lh .92 (h2 dentro la prosa)
- `--fs-prezzo` clamp(56px, 7vw, 120px), lh .88
- `--fs-h3` clamp(21px, 1.7vw, 24px), Archivo 600
- `--fs-lead` clamp(18px, 1.5vw, 21px), lh 1.45
- `--fs-body` 16px, 17px da 960px, lh 1.55
- `--fs-ui` 15px
- `--fs-small` 14px, lh 1.4
- `--fs-wordmark` clamp(110px, 26vw, 440px)

## Impaginazione

- Tutto allineato a sinistra, griglia a 12 colonne (4 sotto 640px, 6 da 640px, 12 da 960px).
- **Testata di sezione** (`TestataSezione`): solo l'H2, più una nota breve a destra su desktop. Niente eyebrow, niente numero, niente filetto in testa.
- **Un solo ritmo**: `.sezione` ha `padding-block: var(--sezione)`, sopra e sotto, in tutte le pagine e in tutte le fasce (chiare, scure, grafite). Due sezioni di carta consecutive hanno uno spazio solo di `--sezione`: la seconda perde il padding alto (regola in `layout.css`).
- Numeri solo dove c'è una sequenza vera: metodo e configuratore.
- Spaziature: `--pad` (margine laterale), `--gap`, `--sezione`, scala `--s-1` … `--s-10`. Header `--hh` 64px (72px da 960px).

## Bottoni

Componente `Bottone` (src/components/ui/Bottone.astro), testo Archivo 600, frase normale.
- Varianti: `primario` (mattone), `secondario` (bordo inchiostro 1px), `chiaro` (per le fasce scure), `wa` (verde, testo `--su-verde`).
- **Freccia**: prop `freccia`. Default sì sul primario, no sulle altre varianti. Per un primario senza freccia (header, menu) passare `freccia={false}`.
- Il testo del bottone non contiene mai "→".
- Il focus da tastiera mostra lo stato dell'hover, su ogni dispositivo.

## Link

- Link di testo (`.link-sottolineato`): sottolineatura, mai una freccia.
- Nelle risposte e nella prosa: link sottolineati in inchiostro. L'hover ispessisce la sottolineatura.
- Nav dell'header: roll del testo (`.link-roll`). La voce corrente ha una sottolineatura inchiostro di 2px.
- Footer: un solo hover per link, la sottolineatura che entra da sinistra.

## Frasi e azioni

Un nome per ogni azione, frasi brevi, niente frecce nel testo:
- "Fai il preventivo"
- "Scrivici su WhatsApp"
- "Vedi i prezzi"
- "Leggi le domande frequenti"
- "Scrivi un'email"
- "Chiama"

Nel piede e nei contatti: "Chiama +39 …" compare solo a runtime (ContattiDinamici). Nell'HTML statico il link dice "Chiama". L'email è mostrata come indirizzo a runtime; nell'HTML statico dice "Scrivi un'email".

## Componenti di struttura

- **Intestazione**: logo a sinistra; nav Servizi, Metodo, Prezzi, Chi siamo, Domande, Contatti; bottone "Fai il preventivo" senza freccia. Sotto 960px: bottone Menu che apre il pannello, senza numeri.
- **Piede**: fascia grafite. Blocchi "Studio", "Pagine", "Contatti", "Note legali". Senza filetti sopra i blocchi: le linee separano solo le voci degli elenchi. Le etichette dei blocchi sono h3. Riga finale con copyright su due righe e "Torna su" come link di testo. Wordmark statico.
- **Testata di pagina** (`TestataPagina`): percorso in Archivo 14px (con `aria-label` "Percorso di navigazione"), prop `codice` facoltativa (testo morbido 14px sopra l'H1), H1 display. Slot `oggetto` facoltativo: da 960px accanto al titolo (colonne 8-12), sotto il lead su schermi piccoli.
- **Prosa** (`Prosa`): p e liste 34em, h2 display a `--fs-h2-xs`, h3 Archivo 600, trattini degli elenchi morbidi, tabelle con `.num` a cifre tabulari.
- **Domande** (`ElencoDomande`): fisarmonica con filetti, "+" di due linee che ruota. Nessuno spostamento all'hover.
- **Titolo rivelato** (`TitoloRivelato`): un solo tono. Le prop `tenue` e `accento` sono accettate ma non cambiano il colore.

## Movimento

Solo `transform` e `opacity`. Il colore può cambiare in transizione (`--ease-std`). Con `prefers-reduced-motion: reduce` tutto è visibile e fermo.

Restano:
- Ingresso della hero e delle testate (`.entra`), fade-up.
- Parole dei titoli in maschera: all'avvio (`titolo-rivelato--immediato`) o allo scroll (`data-reveal` sul titolo, classe `visibile` aggiunta dallo script).
- Parola che cicla nella hero (a carico della hero).
- Menu mobile: pannello che scende, voci che salgono.
- View Transitions tra pagine.
- Hover dei bottoni (velo che entra da sinistra).
- Cursore personalizzato: solo sugli elementi con `data-cursore` e con puntatore fine.

Spariscono: reveal sui blocchi (`[data-reveal]` su non-titoli è inerte), puntino pulsante, barra di avanzamento, animazione delle lettere del wordmark, skew del marquee.

Durate: solo token. `--t-1` 150ms, `--t-2` 300ms, `--t-3` 600ms, `--t-4` 900ms, `--t-5` 1100ms. Scorrimento del ticker: `--t-scorrimento` (40s). Specifiche: `--t-velo`, `--t-colore`, `--t-header`, `--t-menu`, `--t-menu-chiudi`, `--t-parola`, `--t-cursore`, `--t-uscita`, `--t-ritardo-vt`, `--t-ritardo-menu`, `--t-ritardo-menu-cta`. Sfasamenti: `--stagger-parola` 60ms, `--stagger-elemento` 80ms, `--stagger-chiusura` 25ms.

Curve: `--ease-out` (ingressi, reveal), `--ease-expo` (sottolineature e roll), `--ease-in-out` (menu, pagine), `--ease-std` (cambi di colore).

## Qualità

- Base di qualità: 390px senza scroll orizzontale, focus visibile sempre, reduced motion, contrasti AA.
- Focus: anello `--focus` (mattone-testo su chiaro, mattone su scuro), 2px, sfalsato di 3px.
- Il contenuto non è mai nascosto da CSS: un elemento senza JS è sempre leggibile.

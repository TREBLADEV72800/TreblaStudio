import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const whatsapp = '393518924471';
const email = 'trebla.dev.simoni@gmail.com';

const businessTypes = [
  'Ristorante o bar',
  'Rosticceria o asporto',
  'Pizzeria / Paninoteca',
  'Gelateria / Pasticceria',
  'Macelleria / Gastronomia',
  'Enoteca / Vini sfusi',
  'Hotel o B&B',
  'Struttura ricettiva',
  'Agriturismo / Cantina',
  'Palestra / Centro fitness',
  'Salone di bellezza o parrucchiere',
  'Barbiere',
  'Centro estetico',
  'Negozio o bottega',
  'Abbigliamento / Boutique',
  'Fioraio / Vivaio',
  'Ferramenta / Colorificio',
  'Erboristeria / Agricola',
  'Cartoleria / Copisteria',
  'Falegnameria',
  'Artigiano o impresa',
  'Impresa edile / Idraulico / Elettricista',
  'Autofficina / Carrozzeria',
  'Gommista / Autolavaggio',
  'Noleggio bici / Escursioni',
  'Lavanderia / Stireria',
  'Professionista',
  'Associazione / Pro Loco',
  'Fotografo / Videomaker',
  'Altro',
];

const businessCategories = {
  'Ristorazione': ['Ristorante o bar','Rosticceria o asporto','Pizzeria / Paninoteca','Gelateria / Pasticceria','Macelleria / Gastronomia','Enoteca / Vini sfusi'],
  'Ospitalità': ['Hotel o B&B','Struttura ricettiva','Agriturismo / Cantina'],
  'Bellezza e benessere': ['Salone di bellezza o parrucchiere','Barbiere','Centro estetico','Palestra / Centro fitness'],
  'Commercio': ['Negozio o bottega','Abbigliamento / Boutique','Fioraio / Vivaio','Ferramenta / Colorificio','Erboristeria / Agricola','Cartoleria / Copisteria'],
  'Artigiani e officine': ['Falegnameria','Artigiano o impresa','Impresa edile / Idraulico / Elettricista','Autofficina / Carrozzeria','Gommista / Autolavaggio','Lavanderia / Stireria'],
  'Servizi e professioni': ['Noleggio bici / Escursioni','Professionista','Associazione / Pro Loco','Fotografo / Videomaker'],
};

const extendedFeatures = {
  'Pizzeria / Paninoteca': [
    { name: 'Menu pizze e panini con prezzi', price: 0 },
    { name: 'Ordini da asporto su WhatsApp', price: 15 },
    { name: 'Galleria forno e locale', price: 10 },
    { name: 'Promo serata pizza', price: 10 },
  ],
  'Gelateria / Pasticceria': [
    { name: 'Vetrina gusti e torte', price: 10 },
    { name: 'Ordini e prenotazioni torte su WhatsApp', price: 15 },
    { name: 'Orari e stagione — incluso', price: 0 },
  ],
  'Macelleria / Gastronomia': [
    { name: 'Vetrina tagli e specialità', price: 15 },
    { name: 'Ordini e prenotazioni su WhatsApp', price: 15 },
    { name: 'Offerte del giorno', price: 10 },
  ],
  'Enoteca / Vini sfusi': [
    { name: 'Catalogo vini e degustazioni', price: 15 },
    { name: 'Prenotazione visita in cantina', price: 15 },
    { name: 'Storia della cantina e vigneti', price: 10 },
  ],
  'Struttura ricettiva': [
    { name: 'Schede camere con foto', price: 15 },
    { name: 'Richiesta disponibilità su WhatsApp', price: 15 },
    { name: 'Servizi e colazione inclusa', price: 10 },
  ],
  'Agriturismo / Cantina': [
    { name: 'Camere e disponibilità su richiesta', price: 20 },
    { name: 'Menu agriturismo e prodotti tipici', price: 10 },
    { name: 'Degustazioni ed eventi vendemmia', price: 15 },
  ],
  'Palestra / Centro fitness': [
    { name: 'Corsi e orari settimanali', price: 10 },
    { name: 'Iscrizione e contatto su WhatsApp', price: 15 },
    { name: 'Galleria sala e attrezzature', price: 10 },
  ],
  'Barbiere': [
    { name: 'Listino tagli e barba', price: 10 },
    { name: 'Prenotazione appuntamento rapida', price: 15 },
    { name: 'Galleria tagli', price: 10 },
  ],
  'Centro estetico': [
    { name: 'Listino trattamenti', price: 10 },
    { name: 'Prenotazione trattamenti', price: 15 },
    { name: 'Galleria risultati', price: 10 },
  ],
  'Abbigliamento / Boutique': [
    { name: 'Catalogo collezione', price: 15 },
    { name: 'Novità e promozioni', price: 10 },
    { name: 'Contatti e orari — incluso', price: 0 },
  ],
  'Fioraio / Vivaio': [
    { name: 'Catalogo composizioni', price: 15 },
    { name: 'Ordini e consegne su WhatsApp', price: 15 },
    { name: 'Occasioni speciali (matrimoni, eventi)', price: 10 },
  ],
  'Ferramenta / Colorificio': [
    { name: 'Catalogo reparti e marchi', price: 15 },
    { name: 'Richiesta disponibilità su WhatsApp', price: 15 },
    { name: 'Consigli e guide fai-da-te', price: 10 },
  ],
  'Erboristeria / Agricola': [
    { name: 'Catalogo prodotti naturali', price: 15 },
    { name: 'Consigli e rimedi su WhatsApp', price: 10 },
    { name: 'Eventi e degustazioni', price: 10 },
  ],
  'Cartoleria / Copisteria': [
    { name: 'Servizi stampa e copie', price: 10 },
    { name: 'Catalogo articoli scuola/ufficio', price: 15 },
    { name: 'Ordini su WhatsApp', price: 15 },
  ],
  'Impresa edile / Idraulico / Elettricista': [
    { name: 'Galleria cantieri e lavori', price: 15 },
    { name: 'Richiesta intervento rapido', price: 15 },
    { name: 'Servizi e certificazioni', price: 10 },
  ],
  'Autofficina / Carrozzeria': [
    { name: 'Servizi officina e tagliandi', price: 10 },
    { name: 'Prenotazione intervento su WhatsApp', price: 15 },
    { name: 'Galleria lavori', price: 10 },
  ],
  'Gommista / Autolavaggio': [
    { name: 'Servizi gomme e lavaggio', price: 10 },
    { name: 'Prenotazione su WhatsApp', price: 15 },
    { name: 'Offerte stagionali', price: 10 },
  ],
  'Noleggio bici / Escursioni': [
    { name: 'Catalogo bici e percorsi', price: 15 },
    { name: 'Prenotazione noleggio su WhatsApp', price: 15 },
    { name: 'Guida al territorio', price: 10 },
  ],
  'Lavanderia / Stireria': [
    { name: 'Listino lavaggio e stiratura', price: 10 },
    { name: 'Ritiro e consegna su WhatsApp', price: 15 },
    { name: 'Servizi speciali (tappeti, piumoni)', price: 10 },
  ],
  'Associazione / Pro Loco': [
    { name: 'Chi siamo e attività', price: 10 },
    { name: 'Eventi e calendario', price: 10 },
    { name: 'Modulo iscrizione e contatti', price: 10 },
  ],
  'Fotografo / Videomaker': [
    { name: 'Portfolio lavori', price: 15 },
    { name: 'Richiesta preventivo su WhatsApp', price: 15 },
    { name: 'Servizi e pacchetti', price: 10 },
  ],
};

const featuresByType = {
  'Ristorante o bar': [
    { name: 'Menu digitale (pagina sul sito, no QR)', price: 0 },
    { name: 'Menu con codice QR stampabile', price: 15 },
    { name: 'Prenotazione tavoli su WhatsApp', price: 15 },
    { name: 'Orari di apertura e mappa — incluso', price: 0 },
    { name: 'Storia del locale e filosofia in cucina', price: 10 },
    { name: 'Sezione eventi e serate speciali', price: 10 },
  ],
  'Rosticceria o asporto': [
    { name: 'Menu del giorno sempre aggiornato', price: 0 },
    { name: 'Ordini da asporto su WhatsApp', price: 15 },
    { name: 'Vetrina specialità e piatti tipici', price: 10 },
    { name: 'Promozioni e offerte del giorno', price: 10 },
    { name: 'Orari di apertura e mappa — incluso', price: 0 },
  ],
  'Hotel o B&B': [
    { name: 'Modulo richiesta disponibilità camere', price: 20 },
    { name: 'Schede camere con foto e servizi inclusi', price: 15 },
    { name: 'Listino prezzi e offerte stagionali', price: 10 },
    { name: 'Guida al territorio e cosa visitare', price: 15 },
    { name: 'Orari e mappa — incluso', price: 0 },
  ],
  'Salone di bellezza o parrucchiere': [
    { name: 'Listino trattamenti e prezzi', price: 15 },
    { name: 'Prenotazione appuntamenti rapida', price: 15 },
    { name: 'Galleria lavori (prima e dopo)', price: 15 },
    { name: 'Presentazione del personale e qualifiche', price: 10 },
    { name: 'Offerte e pacchetti speciali', price: 10 },
    { name: 'Orari e mappa — incluso', price: 0 },
  ],
  'Negozio o bottega': [
    { name: 'Vetrina e catalogo dei prodotti', price: 20 },
    { name: 'Ordini veloci su WhatsApp e ritiro in negozio', price: 15 },
    { name: 'Sezione novità del mese e promozioni', price: 10 },
    { name: 'Orari di apertura e mappa — incluso', price: 0 },
    { name: 'Storia del negozio e marchi trattati', price: 10 },
  ],
  'Falegnameria': [
    { name: 'Galleria dei lavori su misura', price: 15 },
    { name: 'Modulo richiesta preventivo rapido', price: 15 },
    { name: 'Materiali, lavorazioni e finiture', price: 10 },
    { name: "Storia dell'officina e recensioni", price: 10 },
  ],
  'Artigiano o impresa': [
    { name: 'Galleria fotografica dei lavori realizzati', price: 15 },
    { name: 'Modulo richiesta preventivo rapido', price: 15 },
    { name: 'Descrizione lavorazioni e materiali', price: 10 },
    { name: 'Anni di esperienza, storia e certificazioni', price: 10 },
  ],
  'Professionista': [
    { name: 'Prenotazione prima consulenza o appuntamento', price: 15 },
    { name: 'Aree di competenza e servizi offerti', price: 10 },
    { name: 'Biografia, titoli di studio ed esperienza', price: 10 },
    { name: 'Casi reali e testimonianze di clienti', price: 10 },
  ],
  'Altro': [
    { name: 'Presentazione dell\'attività e dei servizi', price: 10 },
    { name: 'Galleria fotografica', price: 10 },
    { name: 'Modulo contatti e collegamento WhatsApp diretto', price: 10 },
    { name: 'Storia e valori aziendali', price: 10 },
  ],
  ...extendedFeatures,
};

const pageOptions = [
  { name: 'Pagina Principale', price: 0 },
  { name: 'Chi Siamo e la nostra storia', price: 10 },
  { name: 'Servizi, Prodotti o Menu', price: 10 },
  { name: 'Galleria Fotografica', price: 10 },
  { name: 'Modulo Contatti e Mappa', price: 10 },
  { name: 'Recensioni dei Clienti', price: 10 },
  { name: 'Domande Frequenti', price: 10 },
];

// Scheda Google My Business è INCLUSA nella realizzazione del sito, non è un extra social
const socialPlatforms = ['Instagram', 'TikTok'];
const socialNeedsList = [
  { name: 'Creazione profili da zero', price: 20 },
  { name: 'Piano con pubblicazioni regolari', price: 25 },
  { name: 'Creazione filmati e brevi video', price: 25 },
  { name: 'Grafiche personalizzate per le storie', price: 15 },
  { name: 'Gestione promozioni locali', price: 20 },
];

const designNeedsList = [
  { name: 'Creazione o rinnovamento del Logo', price: 25 },
  { name: 'Biglietti da visita pronti per la stampa', price: 15 },
  { name: 'Volantini, locandine o menu cartaceo', price: 20 },
  { name: 'Grafiche promozionali per il web', price: 15 },
];

const socialByType = {
  'Ristorante o bar': [{ name: 'Reel piatti e cucina in azione', price: 25 },{ name: 'Stories menu del giorno', price: 15 },{ name: 'Promo serate ed eventi', price: 20 }],
  'Rosticceria o asporto': [{ name: 'Video specialità sfornate', price: 25 },{ name: 'Stories offerte del giorno', price: 15 },{ name: 'Promo asporto', price: 20 }],
  'Pizzeria / Paninoteca': [{ name: 'Reel pizze sfornate', price: 25 },{ name: 'Stories promo serata', price: 15 },{ name: 'Menu in stories', price: 15 }],
  'Gelateria / Pasticceria': [{ name: 'Reel gusti e preparazioni', price: 25 },{ name: 'Stories novità', price: 15 },{ name: 'Promo torte', price: 20 }],
  'Macelleria / Gastronomia': [{ name: 'Reel tagli e preparati', price: 25 },{ name: 'Stories offerte', price: 15 },{ name: 'Ricette in video', price: 20 }],
  'Enoteca / Vini sfusi': [{ name: 'Reel degustazioni', price: 25 },{ name: 'Schede vini in stories', price: 15 },{ name: 'Eventi cantina', price: 20 }],
  'Hotel o B&B': [{ name: 'Reel camere e colazione', price: 25 },{ name: 'Stories territorio', price: 15 },{ name: 'Offerte stagionali', price: 20 }],
  'Struttura ricettiva': [{ name: 'Reel camere', price: 25 },{ name: 'Stories servizi', price: 15 },{ name: 'Promo weekend', price: 20 }],
  'Agriturismo / Cantina': [{ name: 'Reel vendemmia e cucina', price: 25 },{ name: 'Stories natura', price: 15 },{ name: 'Eventi in agriturismo', price: 20 }],
  'Palestra / Centro fitness': [{ name: 'Reel allenamenti', price: 25 },{ name: 'Stories corsi', price: 15 },{ name: 'Trasformazioni clienti', price: 20 }],
  'Salone di bellezza o parrucchiere': [{ name: 'Reel prima/dopo', price: 25 },{ name: 'Stories trattamenti', price: 15 },{ name: 'Promo pacchetti', price: 20 }],
  'Barbiere': [{ name: 'Reel tagli in time-lapse', price: 25 },{ name: 'Stories look del giorno', price: 15 },{ name: 'Promo barba', price: 15 }],
  'Centro estetico': [{ name: 'Reel trattamenti', price: 25 },{ name: 'Stories risultati', price: 15 },{ name: 'Promo estetica', price: 20 }],
  'Negozio o bottega': [{ name: 'Reel prodotti in vetrina', price: 25 },{ name: 'Stories novità', price: 15 },{ name: 'Promo bottega', price: 20 }],
  'Abbigliamento / Boutique': [{ name: 'Reel outfit del giorno', price: 25 },{ name: 'Stories collezione', price: 15 },{ name: 'Promo saldi', price: 20 }],
  'Fioraio / Vivaio': [{ name: 'Reel composizioni', price: 25 },{ name: 'Stories occasioni', price: 15 },{ name: 'Consigli piante', price: 15 }],
  'Ferramenta / Colorificio': [{ name: 'Reel fai-da-te', price: 25 },{ name: 'Stories prodotti', price: 15 },{ name: 'Consigli tecnici', price: 15 }],
  'Erboristeria / Agricola': [{ name: 'Reel rimedi naturali', price: 25 },{ name: 'Stories prodotti', price: 15 },{ name: 'Consigli benessere', price: 15 }],
  'Cartoleria / Copisteria': [{ name: 'Reel articoli scuola', price: 20 },{ name: 'Stories offerte', price: 15 },{ name: 'Servizi stampa', price: 15 }],
  'Falegnameria': [{ name: 'Reel lavorazioni legno', price: 25 },{ name: 'Stories prima/dopo mobili', price: 15 },{ name: 'Fasi di costruzione', price: 20 }],
  'Artigiano o impresa': [{ name: 'Reel cantieri', price: 25 },{ name: 'Stories lavorazioni', price: 15 },{ name: 'Prima/dopo', price: 20 }],
  'Impresa edile / Idraulico / Elettricista': [{ name: 'Reel interventi', price: 25 },{ name: 'Stories cantieri', price: 15 },{ name: 'Consigli manutenzione', price: 15 }],
  'Autofficina / Carrozzeria': [{ name: 'Reel riparazioni', price: 25 },{ name: 'Stories prima/dopo auto', price: 15 },{ name: 'Consigli manutenzione', price: 15 }],
  'Gommista / Autolavaggio': [{ name: 'Reel cambio gomme', price: 20 },{ name: 'Stories promo stagionale', price: 15 },{ name: 'Cura auto', price: 15 }],
  'Noleggio bici / Escursioni': [{ name: 'Reel percorsi', price: 25 },{ name: 'Stories noleggi', price: 15 },{ name: 'Guida territorio', price: 15 }],
  'Lavanderia / Stireria': [{ name: 'Reel cura capi', price: 20 },{ name: 'Stories servizi', price: 15 },{ name: 'Promo lavaggio', price: 15 }],
  'Professionista': [{ name: 'Reel consigli utili', price: 25 },{ name: 'Stories casi pratici', price: 15 },{ name: 'Approfondimenti', price: 20 }],
  'Associazione / Pro Loco': [{ name: 'Reel eventi', price: 20 },{ name: 'Stories attività', price: 15 },{ name: 'Racconti associati', price: 15 }],
  'Fotografo / Videomaker': [{ name: 'Reel backstage', price: 25 },{ name: 'Stories portfolio', price: 15 },{ name: 'Prima/dopo scatti', price: 20 }],
  'Altro': socialNeedsList,
};

const designByType = {
  'Ristorante o bar': [{ name: 'Menu cartaceo coordinato', price: 20 },{ name: 'Tovagliette e insegna', price: 15 },{ name: 'Biglietti da visita', price: 15 }],
  'Rosticceria o asporto': [{ name: 'Menu asporto coordinato', price: 20 },{ name: 'Vetrofanie e insegna', price: 15 },{ name: 'Sacchetti personalizzati', price: 15 }],
  'Pizzeria / Paninoteca': [{ name: 'Menu pizzeria coordinato', price: 20 },{ name: 'Cartoni pizza personalizzati', price: 15 },{ name: 'Insegna luminosa', price: 20 }],
  'Gelateria / Pasticceria': [{ name: 'Menu gusti coordinato', price: 20 },{ name: 'Confezioni personalizzate', price: 15 },{ name: 'Vetrina e insegna', price: 15 }],
  'Macelleria / Gastronomia': [{ name: 'Listino tagli coordinato', price: 15 },{ name: 'Etichette e sacchetti', price: 15 },{ name: 'Insegna macelleria', price: 15 }],
  'Enoteca / Vini sfusi': [{ name: 'Etichetta e listino vini', price: 20 },{ name: 'Insegna cantina', price: 15 },{ name: 'Biglietti degustazione', price: 15 }],
  'Hotel o B&B': [{ name: 'Brochure camere', price: 20 },{ name: 'Insegna e segnaletica', price: 15 },{ name: 'Card benvenuto', price: 15 }],
  'Struttura ricettiva': [{ name: 'Brochure camere', price: 20 },{ name: 'Segnaletica', price: 15 },{ name: 'Card servizi', price: 15 }],
  'Agriturismo / Cantina': [{ name: 'Menu agriturismo coordinato', price: 20 },{ name: 'Etichetta prodotti', price: 15 },{ name: 'Insegna rustica', price: 15 }],
  'Palestra / Centro fitness': [{ name: 'Tessera e braccialetto', price: 15 },{ name: 'Poster corsi', price: 15 },{ name: 'Insegna palestra', price: 15 }],
  'Salone di bellezza o parrucchiere': [{ name: 'Listino trattamenti da banco', price: 15 },{ name: 'Card fedeltà', price: 15 },{ name: 'Vetrina', price: 15 }],
  'Barbiere': [{ name: 'Listino barbiere da banco', price: 15 },{ name: 'Card fedeltà barba', price: 10 },{ name: 'Insegna barbiere', price: 15 }],
  'Centro estetico': [{ name: 'Listino estetica', price: 15 },{ name: 'Card fedeltà', price: 10 },{ name: 'Brochure trattamenti', price: 15 }],
  'Negozio o bottega': [{ name: 'Sacchetti e etichette', price: 15 },{ name: 'Vetrina coordinata', price: 15 },{ name: 'Biglietti', price: 15 }],
  'Abbigliamento / Boutique': [{ name: 'Shopper personalizzate', price: 15 },{ name: 'Etichette e cartellini', price: 15 },{ name: 'Vetrina boutique', price: 15 }],
  'Fioraio / Vivaio': [{ name: 'Biglietti auguri coordinati', price: 15 },{ name: 'Etichette piante', price: 15 },{ name: 'Insegna fioraio', price: 15 }],
  'Ferramenta / Colorificio': [{ name: 'Catalogo reparti', price: 15 },{ name: 'Etichette scaffali', price: 15 },{ name: 'Insegna', price: 15 }],
  'Erboristeria / Agricola': [{ name: 'Etichette prodotti naturali', price: 15 },{ name: 'Sacchetti e confezioni', price: 15 },{ name: 'Insegna naturale', price: 15 }],
  'Cartoleria / Copisteria': [{ name: 'Listino servizi stampa', price: 15 },{ name: 'Biglietti e buste', price: 15 },{ name: 'Insegna', price: 15 }],
  'Falegnameria': [{ name: 'Catalogo finiture', price: 15 },{ name: 'Biglietti artigiano', price: 15 },{ name: 'Insegna legno', price: 15 }],
  'Artigiano o impresa': [{ name: 'Catalogo lavorazioni', price: 15 },{ name: 'Mezzo brandizzato', price: 20 },{ name: 'Biglietti', price: 15 }],
  'Impresa edile / Idraulico / Elettricista': [{ name: 'Divisa e mezzo brandizzato', price: 20 },{ name: 'Preventivo cartaceo coordinato', price: 15 },{ name: 'Biglietti', price: 15 }],
  'Autofficina / Carrozzeria': [{ name: 'Preventivo e fattura coordinati', price: 15 },{ name: 'Insegna officina', price: 15 },{ name: 'Adesivi auto', price: 15 }],
  'Gommista / Autolavaggio': [{ name: 'Listino gomme coordinato', price: 15 },{ name: 'Insegna gommista', price: 15 },{ name: 'Card lavaggio', price: 10 }],
  'Noleggio bici / Escursioni': [{ name: 'Mappa percorsi brandizzata', price: 15 },{ name: 'Card noleggio', price: 10 },{ name: 'Insegna noleggio', price: 15 }],
  'Lavanderia / Stireria': [{ name: 'Sacchettini e etichette bucato', price: 15 },{ name: 'Insegna lavanderia', price: 15 },{ name: 'Card ritiro', price: 10 }],
  'Professionista': [{ name: 'Carta intestata e buste', price: 15 },{ name: 'Biglietti professionali', price: 15 },{ name: 'Timbro e firma', price: 10 }],
  'Associazione / Pro Loco': [{ name: 'Tessera associati', price: 15 },{ name: 'Locandine eventi', price: 15 },{ name: 'Striscione', price: 15 }],
  'Fotografo / Videomaker': [{ name: 'Portfolio stampato', price: 20 },{ name: 'Biglietti fotografici', price: 15 },{ name: 'Watermark e preset', price: 15 }],
  'Altro': designNeedsList,
};

const goals = [
  'Farmi trovare su internet e nella mia zona',
  'Mostrare i miei servizi e prodotti',
  'Ricevere più contatti e prenotazioni',
  'Rinnovare e modernizzare la mia immagine',
];

const faqs = [
  {
    q: 'E se in futuro voglio una modifica? E i bug?',
    a: 'Le modifiche future costano 15 € a modifica e verranno usate come prova nel portfolio Trebla Studio.\nI bug li sistemiamo gratis, previa nostra valutazione che si tratti effettivamente di un bug.',
  },
  {
    q: 'Quanto tempo ci vuole per realizzare il sito?',
    a: 'Per i progetti essenziali, circa 10 giorni lavorativi dopo aver ricevuto tutti i materiali (testi, foto, logo) e le tue approvazioni. Se i contenuti arrivano a scaglioni o servono più revisioni, i tempi si allungano di conseguenza.',
  },
  {
    q: "C'è un abbonamento mensile da pagare?",
    a: 'No, nessun abbonamento obbligatorio a Trebla. Il sito è di tua proprietà (codice, testi e grafiche consegnate). Restano a parte i costi tecnici ricorrenti: dominio (pagato direttamente a Vercel/hosting, ~10-20 €/anno variabile) e hosting se scegli di mantenerlo su Vercel. Backup, aggiornamenti e modifiche future sono su richiesta (vedi Assistenza).',
  },
  {
    q: "L'acconto è incluso nel prezzo?",
    a: "Sì, l'acconto del 10% è incluso nel prezzo finale e serve solo a bloccare le tempistiche. Il resto lo paghi alla consegna.",
  },
  {
    q: 'Il dominio è incluso nel prezzo?',
    a: "No, il dominio (per esempio www.tuaattività.it) non è incluso nel preventivo. Se non ce l'hai già, ti aiutiamo a sceglierlo e registrarlo a tuo nome: il costo annuale del dominio varia in base al tipo di dominio scelto e viene pagato direttamente a Vercel, la piattaforma su cui pubblichiamo il sito, quindi non passa da noi.",
  },
  {
    q: 'Fate siti anche per chi ne ha già uno?',
    a: 'No, lavoriamo solo con attività che non hanno ancora un sito web: il nostro punto di forza è proprio partire da zero e costruire insieme la tua presenza online, senza rifacimenti di progetti fatti da altri.',
  },
  {
    q: 'Se non ho le foto come facciamo?',
    a: 'Nessun problema: possiamo venire direttamente presso la tua attività a scattare foto professionali.',
  },
  {
    q: 'Potete aiutarci a organizzare un evento?',
    a: 'Sì! Tramite la nostra etichetta discografica possiamo organizzare piccoli eventi con artisti per inaugurazioni, serate a tema o per sponsorizzare la tua attività.',
  },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

const INITIAL_FORM = {
  name: '',
  type: '',
  typeOther: '',
  services: [],
  structure: '',
  features: [],
  pages: [],
  photos: '',
  socialPlatforms: [],
  socialNeeds: [],
  designNeeds: [],
  musicEvent: '',
  goals: [],
  timing: '',
  notes: '',
  bannerDiscount: false,
  privacy: false,
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [quickContactOpen, setQuickContactOpen] = useState(false);
  const [quickName, setQuickName] = useState('');
  const [estimateRevealed, setEstimateRevealed] = useState(false);
  const [typeSearch, setTypeSearch] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const revealTime = useRef(0);

  const revealEstimate = () => {
    revealTime.current = Date.now();
    setEstimateRevealed(true);
  };

  useEffect(() => {
    const handlePageShow = () => {
      setForm(structuredClone(INITIAL_FORM));
      setEstimateRevealed(false);
      setMenuOpen(false);
      setOpenFaq(null);
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const sendQuickMessage = (event) => {
    event.preventDefault();
    if (!quickName.trim()) return;
    const message = `Ciao Trebla Studio! La mia attività si chiama: ${quickName.trim()}. Vorrei farla conoscere, parliamone!`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setQuickContactOpen(false);
    setQuickName('');
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const [form, setForm] = useState(INITIAL_FORM);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const toggle = (key, value) =>
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value],
    }));

  const handleTypeChange = (type) => {
    setForm((current) => ({
      ...current,
      type,
      features: [],
      pages: [],
    }));
  };

  const handleServiceToggle = (serviceId) => {
    if (serviceId === 'site') {
      if (form.services.includes('site')) {
        setForm((current) => ({ ...current, services: [] }));
      } else {
        setForm((current) => ({ ...current, services: ['site'] }));
      }
      return;
    }
    // Social/Design consigliati con sito (cuore del progetto) ma non bloccati — se cliente vuole solo social/design può selezionarli e parleremo del percorso migliore
    setForm((current) => {
      const exists = current.services.includes(serviceId);
      const updated = exists ? current.services.filter((s) => s !== serviceId) : [...current.services, serviceId];
      return { ...current, services: updated };
    });
  };

  const hasSite = form.services.includes('site');
  const hasSocial = form.services.includes('social');
  const hasDesign = form.services.includes('design');
  const isAltro = form.type === 'Altro';

  // Calcolo prezzo dinamico — se solo social/design senza sito, stima i soli servizi selezionati (consigliato con sito ma non bloccato)
  const currentTotal = useMemo(() => {
    let total = 0;
    if (hasSite) {
      total = form.structure === 'Sito completo a più pagine' ? 420 : form.structure === 'Pagina singola' ? 370 : 370;
      // se non ha scelto struttura ma ha sito, consideriamo base 350 rivista (pagina singola) per stima
      if (!form.structure) total = 350;
    }

    // Funzionalità, pagine e foto incluse nel prezzo base — solo struttura + social/design a pagamento

    // Social Media
    if (hasSocial) {
      total += form.socialPlatforms.length * 10;
      const list = socialByType[form.type] || socialNeedsList;
      form.socialNeeds.forEach((needName) => {
        const found = list.find((s) => s.name === needName);
        if (found) total += found.price;
      });
    }

    // Grafiche & Design (solo opzioni selezionate)
    if (hasDesign) {
      const list = designByType[form.type] || designNeedsList;
      form.designNeeds.forEach((desName) => {
        const found = list.find((d) => d.name === desName);
        if (found) total += found.price;
      });
    }

    if (form.bannerDiscount) total = Math.max(0, total - 20);
    return total;
  }, [isAltro, hasSite, hasSocial, hasDesign, form.bannerDiscount, form.structure, form.photos, form.features, form.type, form.pages, form.socialPlatforms, form.socialNeeds, form.designNeeds]);

  const quoteLabel = (hasSite || hasSocial || hasDesign) ? `Stima: ${currentTotal} €` : 'Seleziona un servizio per la stima';

  const missingFields = [];
  if (form.name.trim().length < 2) missingFields.push('il nome della tua attività');
  if (!form.type) missingFields.push('il tipo di attività');
  if (isAltro && form.typeOther.trim().length < 2) missingFields.push('la descrizione della tua attività');
  if (!hasSite && !hasSocial && !hasDesign) missingFields.push('un servizio (Sito, Social o Design)');
  if (hasSite && !isAltro && !form.structure) missingFields.push('la struttura del sito');
  if (hasSite && !isAltro && !form.photos) missingFields.push('le foto');
  if (hasSocial && !(form.socialPlatforms.length > 0 && form.socialNeeds.length > 0)) missingFields.push('le scelte Social Media');
  if (hasDesign && form.designNeeds.length === 0) missingFields.push('i materiali grafici');

  const canReveal = missingFields.length === 0 && form.privacy;

  const sendQuote = (event) => {
    event.preventDefault();
    if (!estimateRevealed) {
      if (canReveal) revealEstimate();
      return;
    }
    if (Date.now() - revealTime.current < 1000) return;
    if (!hasSite && !hasSocial && !hasDesign) {
      alert('Seleziona almeno un servizio (Sito, Social o Design). Consigliamo il sito come cuore del progetto, ma possiamo partire anche da social/design.');
      return;
    }

    const selectedServices = form.services
      .map((id) => (id === 'site' ? 'Sito Web' : id === 'social' ? 'Social Media' : 'Design e Grafiche'))
      .join(' + ');

    const messageLines = [
      '*Ciao Trebla Studio!*',
      'Vorrei richiedere un preventivo per la mia attività.',
      '',
      '━━━━━━━━━━━━━━━━━━━',
      '*DATI ATTIVITÀ*',
      `• *Nome:* ${form.name || 'Non specificato'}`,
      `• *Settore:* ${form.type === 'Altro' && form.typeOther.trim() ? `Altro (${form.typeOther.trim()})` : form.type}`,
      `• *Servizi scelti:* ${selectedServices}`,
      '━━━━━━━━━━━━━━━━━━━',
    ];

    if (hasSite) {
      messageLines.push(
        '',
        '*SITO WEB*',
        `• *Struttura:* ${form.structure}`
      );
      if (isAltro) {
        messageLines.push('• *Esigenze specifiche:* da definire insieme');
      } else {
        messageLines.push(
          `• *Funzioni:* ${form.features.length ? form.features.join(', ') : 'Standard'}`,
          `• *Pagine:* ${form.pages.length ? form.pages.join(', ') : 'Standard'}`,
          `• *Foto:* ${form.photos}`
        );
      }
    }

    if (hasSocial) {
      messageLines.push(
        '',
        '*SOCIAL MEDIA*',
        `• *Canali:* ${form.socialPlatforms.join(', ') || 'Da decidere'}`,
        `• *Opzioni:* ${form.socialNeeds.join(', ') || 'Da decidere'}`
      );
    }

    if (hasDesign) {
      messageLines.push(
        '',
        '*DESIGN & GRAFICHE*',
        `• *Materiali:* ${form.designNeeds.join(', ') || 'Da decidere'}`
      );
    }

    if (form.musicEvent && form.musicEvent !== 'Non al momento') {
      messageLines.push(
        '',
        '*EVENTO MUSICALE (LABEL)*',
        `• ${form.musicEvent}`
      );
    }

    messageLines.push(
      '',
      '━━━━━━━━━━━━━━━━━━━',
      '*PIANIFICAZIONE*'
    );

    if (!isAltro) {
      messageLines.push(`• *Obiettivi:* ${form.goals.join(', ')}`);
    }

    messageLines.push(
      `• *Tempi desiderati:* ${form.timing || 'Da definire'}`,
      '',
      `*STIMA CALCOLATA:* ${currentTotal} €`,
      '━━━━━━━━━━━━━━━━━━━'
    );

    if (form.notes && form.notes.trim()) {
      messageLines.push(
        '',
        '*NOTE AGGIUNTIVE:*',
        form.notes.trim()
      );
    }

    const message = messageLines.join('\n');
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const currentFeatureList = featuresByType[form.type] || [];

  return (
    <>
      <header className="header">
        <a className="logo" href="#top" aria-label="Trebla Studio - torna in cima">
          <picture><source srcSet="/trebla-logo.webp" type="image/webp" /><img src="/trebla-logo-transparent.png" alt="Trebla Studio — Siti web per piccole imprese in Piemonte" width="123" height="70" loading="eager" decoding="async" fetchPriority="high" /></picture>
        </a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navigazione principale">
          <a href="#servizi" onClick={() => setMenuOpen(false)}>Servizi</a>
          <a href="#lavori" onClick={() => setMenuOpen(false)}>Lavori</a>
          <a href="#chi-siamo" onClick={() => setMenuOpen(false)}>Chi siamo</a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>Metodo</a>
          <a href="#prezzi" onClick={() => setMenuOpen(false)}>Prezzi</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#contatti" onClick={() => setMenuOpen(false)}>Contatti</a>
          <a className="nav-mobile-cta" href="#preventivo" onClick={() => setMenuOpen(false)}>Fai un preventivo</a>
        </nav>
        <button
          type="button"
          className="header-cta"
          onClick={() => setQuickContactOpen(true)}
        >
          Parliamone
        </button>
        <button
          className={menuOpen ? 'menu menu-active' : 'menu'}
          aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero">
          <div className="hero-copy">
            <h1>
              La tua attività<br />
              <em>merita di essere vista.</em>
            </h1>
            <p>Realizziamo siti web chiari e curati per piccole attività di Asti e Piemonte, pronti a farti ricevere richieste, prenotazioni e contatti. Lavoriamo senza uffici e intermediari: così manteniamo prezzi più accessibili e ti mostriamo prima cosa è incluso.</p>
            <div className="hero-actions">
              <a className="button button-main" href="#preventivo">
                Fai un preventivo
              </a>
              <a className="button button-quiet" href="#servizi">
                Vedi i servizi
              </a>
            </div>
          </div>
          <div className="hero-card">
            <span className="card-kicker">Trebla Studio</span>
            <strong>
              Un passo concreto<br />
              <em>verso il digitale.</em>
            </strong>
            <p>Per rendere la tua attività più visibile, più chiara e più facile da contattare.</p>
          </div>
        </section>

        {/* Audience */}
        <section className="audience">
          <p>Per chi ha qualcosa di valido da dimostrare</p>
          <div>
            <span>Ristoranti</span>
            <span>Hotel & B&B</span>
            <span>Saloni di bellezza</span>
            <span>Negozi</span>
            <span>Artigiani</span>
            <span>Professionisti</span>
            <span>Piccole imprese</span>
          </div>
        </section>

        {/* Servizi */}
        <section id="servizi" className="section services-section">
          <p className="section-label">Servizi</p>
          <div className="section-intro">
            <h2>
              Il digitale,<br />
              <em>fatto semplice.</em>
            </h2>
            <p>Una presenza online chiara per uscire dal passaparola e arrivare davanti a potenziali clienti.</p>
          </div>
          <div className="service-grid">
            <article className="service-card service-main">
              <span>01</span>
              <h3>Sito web</h3>
              <p>Una presenza su internet chiara, curata e facile da usare per trasformare chi ti cerca in un cliente reale.</p>
            </article>
            <article className="service-card">
              <span>02</span>
              <h3>Social media</h3>
              <p>Contenuti e gestione per rendere la tua presenza attiva e coerente ogni settimana.</p>
            </article>
            <article className="service-card">
              <span>03</span>
              <h3>Design e grafiche</h3>
              <p>Logo, grafiche promozionali e materiali coordinati che rendono la tua attività riconoscibile.</p>
            </article>
          </div>
        </section>

        {/* Portfolio — nello stile del sito */}
        <section id="lavori" className="section portfolio-section">
          <p className="section-label">Un esempio concreto</p>
          <div className="section-intro">
            <h2>
              Lo abbiamo<br />
              <em>già fatto.</em>
            </h2>
            <p>Lo stesso team che realizza il tuo sito ha realizzato anche il sito di Pikete Label e ne cura la gestione, stessa cura anche per gli eventi della tua attività.</p>
          </div>
          <a className="portfolio-feature" href="https://piketelabel.vercel.app" target="_blank" rel="noopener noreferrer">
            <span className="portfolio-kicker">Sito realizzato da noi — caso studio</span>
            <strong>Pikete Label</strong>
            <span className="portfolio-sub">etichetta musicale</span>
            <p><strong style={{ color: '#fff' }}>Problema:</strong> presenza online assente / <strong style={{ color: '#fff' }}>Obiettivo:</strong> vetrina catalogo artisti / <strong style={{ color: '#fff' }}>Soluzione:</strong> sito vetrina responsive con catalogo, <strong style={{ color: '#fff' }}>Ruolo Trebla:</strong> design + sviluppo + gestione — <strong style={{ color: '#fff' }}>Risultato:</strong> [DA AGGIUNGERE: traffico/richieste/feedback reale — non inventato] <span style={{ opacity: 0.8 }}>(link verificabile)</span></p>
            <span className="portfolio-cta"><span>Scopri la musica dei nostri artisti</span><span>sito realizzato da noi →</span></span>
          </a>
          <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '16px', background: '#fff' }}>
              <strong style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2d6685' }}>[Prossimo caso — placeholder]</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>[Settore: es. Ristorante/B&B/Artigiano — Asti] — Aggiungeremo qui problema/obiettivo/soluzione/pagine/funzioni/risultato con link reale. Non presentiamo mai concept come clienti reali.</p>
            </div>
            <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '16px', background: '#fff' }}>
              <strong style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2d6685' }}>[Prossimo caso — placeholder]</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>[Settore] — scheda filtrabile per settore, con immagini desktop/mobile, testimonianza e metriche (richieste, prenotazioni) quando disponibili.</p>
            </div>
            <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '16px', background: '#fff' }}>
              <strong style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2d6685' }}>[Prossimo caso — placeholder]</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>[Settore] — in attesa di autorizzazione cliente. Spazio riservato per portfolio filtrabile.</p>
            </div>
          </div>
          <div style={{ marginTop: '22px', border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
            <strong style={{ fontSize: '14px', display: 'block', marginBottom: '12px' }}>Prova sociale — [DA COMPLETARE: servono 3 testimonianze reali con autorizzazione]</strong>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5', borderLeft: '3px solid var(--blue)', paddingLeft: '12px' }}>“[Testimonianza 1 — nome, attività, città, link/recensione Google verificabile — DA INSERIRE]”</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5', borderLeft: '3px solid var(--blue)', paddingLeft: '12px' }}>“[Testimonianza 2 — DA INSERIRE]”</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5', borderLeft: '3px solid var(--blue)', paddingLeft: '12px' }}>“[Testimonianza 3 — DA INSERIRE]”</div>
            </div>
            <p style={{ marginTop: '12px', fontSize: '12px', color: '#6d8894' }}>Mostreremo solo recensioni autentiche con fonte (Google, link) e loghi autorizzati. Niente invettive inventate. Invia screenshot/link.</p>
          </div>
          <div style={{ marginTop: '14px', border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
            <strong style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>Perché ci scelgono (in attesa di numeri reali)</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '13px' }}>
              <span style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '8px 12px', background: '#fff' }}>[N progetti — DA INSERIRE]</span>
              <span style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '8px 12px', background: '#fff' }}>[Rating Google — DA INSERIRE]</span>
              <span style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '8px 12px', background: '#fff' }}>[Tempo medio risposta — DA INSERIRE]</span>
              <span style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '8px 12px', background: '#fff' }}>Consegna 10gg* · 1 revisione · Bug fix valutato</span>
            </div>
          </div>
        </section>

        {/* Chi siamo — P0 placeholder senza inventare dati */}
        <section id="chi-siamo" className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
          <p className="section-label">Chi siamo</p>
          <div className="section-intro">
            <h2>Il team dietro<br /><em>Trebla Studio.</em></h2>
            <p>Studio digitale agile per piccole attività di Asti e Piemonte. Qui sotto trovi le informazioni autentiche su chi lavora al progetto — [DA COMPLETARE con dati reali, vedi domande sotto].</p>
          </div>
          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
              <strong style={{ fontSize: '14px' }}>[Foto reale]</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>[Nome e ruolo — es. Founder / Design & Dev] — [Breve bio, anni esperienza, competenze: design, sviluppo, SEO base, foto] — [DA INSERIRE]</p>
            </div>
            <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
              <strong style={{ fontSize: '14px' }}>[Foto reale]</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>[Nome e ruolo — es. Contenuti / Relazione clienti] — [Competenze,エリア Piemonte/Asti, modalità collaborazione] — [DA INSERIRE]</p>
            </div>
            <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
              <strong style={{ fontSize: '14px' }}>Come lavoriamo, dove operiamo</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>• Sede operativa: [Città/Asti — DA INSERIRE, non inventiamo indirizzo]<br/>• Area servita: Asti e Piemonte (anche remoto)<br/>• Partner: Pikete Label (musica) — ruolo: fornitura artisti per eventi<br/>• Responsabilità progetto: [DA INSERIRE]</p>
            </div>
          </div>
          <p style={{ marginTop: '14px', fontSize: '12px', color: '#6d8894' }}>Nota: mostriamo solo volti/nomi reali con consenso. Nessun nome inventato. Invia le info e sostituiamo i placeholder.</p>
        </section>

        {/* Come lavoriamo */}
        <section id="metodo" className="section method-section">
          <p className="section-label">Come lavoriamo</p>
          <div className="section-intro">
            <h2>
              Dall'idea<br />
              <em>alla presenza online.</em>
            </h2>
            <p>Un percorso concreto, con passaggi chiari e una conversazione vera sulle necessità della tua attività.</p>
          </div>
          <div className="method-grid">
            <article>
              <span>01</span>
              <h3>Ascolto e Obiettivi</h3>
              <p>Parliamo di cosa fai, di chi sono i tuoi clienti e di come presentare al meglio la tua attività.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Creazione su misura</h3>
              <p>Realizziamo il tuo sito, i testi e le grafiche curando ogni singolo dettaglio per renderlo veloce e chiaro.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Pubblicazione in 10 giorni</h3>
              <p>Mettiamo online il sito, colleghiamo WhatsApp, Google Business e tutto ciò che serve per farti trovare subito. Include 1 giro di revisioni + garanzia bug previa valutazione. Vedi “Cosa ricevi” e FAQ.</p>
            </article>
          </div>
        </section>

        {/* Prezzi */}
        <section id="prezzi" className="section price-section">
          <p className="section-label">Prezzi chiari</p>
          <div className="price-grid">
            <div>
              <h2>
                Una proposta<br />
                <em>alla tua portata.</em>
              </h2>
              <p>
                Niente uffici e niente intermediari: parli direttamente con chi costruisce il tuo sito. Lavoriamo con struttura leggera così manteniamo prezzi accessibili — la cifra la vedi prima di iniziare, con elenco chiaro di cosa è incluso ed escluso (vedi dettagli sotto). Prezzi IVA esclusa.
              </p>
              <a className="button button-light" href="#preventivo">
                Fai un preventivo
              </a>
            </div>
            <ul>
              <li>
                <b>Prima conversazione gratuita</b>
                <span>Parliamo insieme delle necessità della tua attività, senza impegno e senza costi: ci racconti cosa ti serve, ti diciamo come possiamo realizzarlo.</span>
              </li>
              <li>
                <b>Prezzo trasparente prima di iniziare</b>
                <span>Stima immediata nel configuratore con dettaglio di cosa è incluso (pagine, funzioni standard, Google Business inclusa) e cosa è extra. Prezzi IVA esclusa.</span>
              </li>
              <li>
                <b>Consegna in 10 giorni lavorativi*</b>
                <span>*Per progetti essenziali, dopo aver ricevuto tutti i materiali (testi, foto, logo) e le tue approvazioni. Se mancano contenuti i tempi si allungano.</span>
              </li>
              <li>
                <b>Zero abbonamenti mensili</b>
                <span>Nessun canone fisso obbligatorio: il sito web è di tua proprietà.</span>
              </li>
            </ul>
          </div>
          <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', fontSize: '13px', lineHeight: '1.6' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Cosa include “da 350 €”*</strong>
              <span style={{ color: '#d5e4e9' }}>
                • 1 pagina singola fluida (o sito multi-pagina da 400 €)<br/>
                • Design responsive, testi base, SEO di base (title/meta/H1), form contatti + WhatsApp<br/>
                • Scheda Google Business inclusa, collegamenti mappa/orari, ottimizzazione performance base<br/>
                • 1 giro di revisioni incluso, consegna file e proprietà sito<br/>
                • *Prezzi IVA esclusa. Dominio/hosting esclusi.
              </span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Extra a scelta</strong>
              <span style={{ color: '#d5e4e9' }}>
                • Pagine aggiuntive (+10 € cad.), funzioni per settore (vedi configuratore)<br/>
                • Social/Design solo se selezionati (vedi prezzi nel configuratore)<br/>
                • Foto sul posto (+20 €) o immagini archivio gratuite<br/>
                • Modifiche future: 15 € cad. (usate come prova portfolio, previo consenso)
              </span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Cosa ricevi alla consegna</strong>
              <span style={{ color: '#d5e4e9' }}>
                • Sito pubblicato su Vercel, dominio intestato a te<br/>
                • Accessi, proprietà codice/contenuti, guida rapida modifica testi<br/>
                • Garanzia bug: fix gratis previa nostra valutazione che sia bug<br/>
                • Assistenza a richiesta (vedi FAQ/Assistenza)
              </span>
            </div>
          </div>
          <p style={{ marginTop: '16px', fontSize: '11px', color: '#8fb8c9', lineHeight: '1.5' }}>* Fascia “da 350 €” per pagina singola essenziale; i progetti con più pagine/funzioni/social/design salgono in base alle scelte nel configuratore. Tutti i prezzi indicati sono IVA esclusa.</p>
        </section>

        {/* Preventivo Interattivo */}
        <section id="preventivo" className="section quote-section">
          <p className="section-label">La tua proposta</p>
          <div className="section-intro">
            <h2>
              Costruiamo<br />
              <em>la tua proposta.</em>
            </h2>
            <p>Il sito web è il punto di partenza principale. Rispondi alle domande per vedere la tua proposta aggiornarsi ad ogni scelta.</p>
          </div>

          <form className="quote-form" onSubmit={sendQuote}>
            {/* 1. Nome dell'attività */}
            <div className={missingFields.includes('il nome della tua attività') ? 'form-block pending' : 'form-block'}>
              <p className="form-title">La tua attività {missingFields.includes('il nome della tua attività') && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
              <label>
                Come si chiama la tua attività?
                <input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Inserisci il nome dell'attività" />
              </label>
            </div>

            {/* 2. Che tipo di attività è */}
            <div className={(!form.type || (isAltro && form.typeOther.trim().length < 2)) ? 'form-block pending' : 'form-block'}>
              <p className="form-title">Che tipo di attività è? {(!form.type || (isAltro && form.typeOther.trim().length < 2)) && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
              <input
                value={typeSearch}
                onChange={(e) => setTypeSearch(e.target.value)}
                placeholder="Cerca la tua attività... (es. pizzeria, barbiere)"
                style={{ marginBottom: '14px' }}
              />
              {typeSearch.trim() ? (
                <div className="choice-grid">
                  {businessTypes.filter(t => t.toLowerCase().includes(typeSearch.toLowerCase())).map((type) => (
                    <button type="button" className={form.type === type ? 'choice selected' : 'choice'} onClick={() => handleTypeChange(type)} key={type}>{type === 'Professionista' ? <><span style={{ fontWeight: 700 }}>Professionista</span><span style={{ fontWeight: 400, marginLeft: 6, color: 'var(--muted)' }}>— geometra, commercialista...</span></> : type}</button>
                  ))}
                  {businessTypes.filter(t => t.toLowerCase().includes(typeSearch.toLowerCase())).length === 0 && <p className="form-help">Nessun risultato — seleziona Altro.</p>}
                </div>
              ) : (
                <>
                  {Object.entries(businessCategories).map(([cat, types]) => (
                    <details key={cat} open={openCategory === cat} onToggle={(e) => setOpenCategory(e.target.open ? cat : null)} style={{ borderBottom: '1px solid var(--line)', padding: '10px 0' }}>
                      <summary style={{ cursor: 'pointer', font: '700 13px var(--mono)', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink)' }}>{cat} — {types.length}</summary>
                      <div className="choice-grid" style={{ marginTop: '10px' }}>
                        {types.map((type) => (
                          <button type="button" className={form.type === type ? 'choice selected' : 'choice'} onClick={() => handleTypeChange(type)} key={type}>{type === 'Professionista' ? <><span style={{ fontWeight: 700 }}>Professionista</span><span style={{ fontWeight: 400, marginLeft: 6, color: 'var(--muted)' }}>— geometra, commercialista...</span></> : type}</button>
                        ))}
                      </div>
                    </details>
                  ))}
                  <button type="button" className={form.type === 'Altro' ? 'choice selected' : 'choice'} onClick={() => handleTypeChange('Altro')} style={{ marginTop: '12px' }}>Altro</button>
                </>
              )}
              {form.type === 'Altro' && (
                <label className="type-other">
                  Che attività fai? Descrivici la tua attività
                  <input
                    required
                    value={form.typeOther}
                    onChange={(event) => update('typeOther', event.target.value)}
                    placeholder="Es. venditori ambulanti, associazione, negozio online..."
                  />
                </label>
              )}
            </div>

            {/* Progress */}

            {/* 3. Di cosa hai bisogno */}
            <div className={!hasSite ? 'form-block pending' : 'form-block'}>
              <p className="form-title">Di cosa hai bisogno? {!hasSite && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
              <p className="form-help">
                {hasSite
                  ? 'Perfetto — Sito Web incluso (cuore del progetto). Aggiungi Social o Design solo se ti servono davvero.'
                  : hasSocial || hasDesign
                    ? 'Hai selezionato Social/Design senza sito: il sito è il cuore consigliato, ma possiamo iniziare anche da brand/social se è la priorità corretta — parliamone su WhatsApp.'
                    : 'Il sito è il cuore del progetto (consigliato). Puoi aggiungere Social/Design subito oppure iniziare anche solo da quelli se è la priorità corretta.'}
              </p>
              <div className="service-choice-grid">
                {/* Sito Web */}
                <button
                  type="button"
                  className={hasSite ? 'service-choice selected' : 'service-choice'}
                  onClick={() => handleServiceToggle('site')}
                >
                  <span>{hasSite ? '✓' : '+'}</span>
                  <b>Sito Web</b>
                  <small>Presenza online completa, veloce e visibile su tutti i dispositivi.</small>
                    <small style={{ marginTop: '10px', color: 'var(--blue)', fontWeight: '800' }}>
                      Da 350 € <span style={{ fontWeight: 400, fontSize: '11px' }}>IVA escl.</span>
                    </small>
                </button>

                {/* Social Media */}
                <button
                  type="button"
                  className={hasSocial ? 'service-choice selected' : 'service-choice'}
                  onClick={() => handleServiceToggle('social')}
                >
                  <span>{hasSocial ? '✓' : '+'}</span>
                  <b>Social Media</b>
                  <small>Gestione profili, pubblicazioni e grafiche su misura.</small>
                  {!hasSite && hasSocial && (
                    <small style={{ marginTop: '10px', color: '#b35a00', fontWeight: '800' }}>
                      Consigliato con Sito Web
                    </small>
                  )}
                </button>

                {/* Design e Grafiche */}
                <button
                  type="button"
                  className={hasDesign ? 'service-choice selected' : 'service-choice'}
                  onClick={() => handleServiceToggle('design')}
                >
                  <span>{hasDesign ? '✓' : '+'}</span>
                  <b>Design e Grafiche</b>
                  <small>Logo, locandine, volantini e materiali coordinati.</small>
                  {!hasSite && hasDesign && (
                    <small style={{ marginTop: '10px', color: '#b35a00', fontWeight: '800' }}>
                      Consigliato con Sito Web
                    </small>
                  )}
                </button>
              </div>
              <div className="form-escape-block">
                <p className="escape-kicker">Hai dubbi?</p>
                <p>
                  Non sai cosa scegliere per il tuo sito?<br />
                  <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla Studio! Non so bene cosa scegliere per il mio sito, possiamo parlarne direttamente?')}`} target="_blank" rel="noopener noreferrer">
                    Parliamone direttamente su WhatsApp <span>→</span>
                  </a>
                </p>
              </div>
            </div>

            {/* SEZIONE SITO WEB */}
            {hasSite && form.type && (
              <>
                {/* 4. Struttura del sito - solo per tipi specifici */}
                {!isAltro && (
                <div className="form-block">
                  <p className="form-title">Struttura del sito web</p>
                  <p className="form-help">Scegli tra una pagina singola fluida (350 € IVA escl.) o un sito completo a più pagine (400 € IVA escl.). Include responsive, SEO base e 1 revisione.</p>
                  <div className="choice-grid">
                    {[
                      { id: 'Pagina singola', label: 'Pagina singola (350 €)' },
                      { id: 'Sito completo a più pagine', label: 'Sito completo a più pagine (400 €)' },
                    ].map((str) => (
                      <button
                        type="button"
                        className={form.structure === str.id ? 'choice selected' : 'choice'}
                        onClick={() => update('structure', str.id)}
                        key={str.id}
                      >
                        {str.label}
                      </button>
                    ))}
                  </div>
                </div>
                )}

                {/* 5. Funzionalità strategiche - SEMPRE visibile (anche per Altro) */}
                <div className="form-block">
                  <p className="form-title">Cosa serve per il tuo sito ({form.type})?</p>
                  <p className="form-help">Seleziona le funzioni utili per la tua attività.</p>
                  <div className="choice-grid">
                    {currentFeatureList.map((feat) => (
                      <button
                        type="button"
                        className={form.features.includes(feat.name) ? 'choice selected' : 'choice'}
                        onClick={() => toggle('features', feat.name)}
                        key={feat.name}
                      >
                        {feat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {!isAltro && (
                <>
                {/* 6. Pagine & Sezioni con prezzi visibili */}
                <div className="form-block">
                  <p className="form-title">Pagine e sezioni desiderate</p>
                  <div className="choice-grid">
                    {pageOptions.map((page) => (
                      <button
                        type="button"
                        className={form.pages.includes(page.name) ? 'choice selected' : 'choice'}
                        onClick={() => toggle('pages', page.name)}
                        key={page.name}
                      >
                        {page.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 7. Foto e immagini con prezzi visibili */}
                <div className={!isAltro && !form.photos ? 'form-block pending' : 'form-block'}>
                  <p className="form-title">Foto e immagini {!isAltro && !form.photos && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
                  <p className="form-help">
                    Le immagini sono fondamentali per un sito efficace. Dicci come stai messo con le foto della tua attività: se non ne hai, veniamo noi a scattarle direttamente sul posto.
                  </p>
                  <div className="choice-grid">
                    {[
                      { id: 'Ho già le foto', label: 'Ho già le foto (le invio io)' },
                      { id: 'Servono le foto (le scattate voi)', label: 'Scattate voi sul posto' },
                      { id: 'Parto da zero', label: 'Non ho niente, usiamo immagini di archivio' },
                    ].map((photo) => (
                      <button
                        type="button"
                        className={form.photos === photo.id ? 'choice selected' : 'choice'}
                        onClick={() => update('photos', photo.id)}
                        key={photo.id}
                      >
                        {photo.label}
                      </button>
                    ))}
                  </div>
                </div>
                </>
                )}
              </>
            )}

            {/* SEZIONE SOCIAL MEDIA con prezzi visibili */}
            {hasSite && hasSocial && (
              <>
                <div className="form-block">
                  <p className="form-title">Social Media: su quali canali vuoi puntare?</p>
                  <p className="form-help">
                    <strong>Scheda Google My Business inclusa</strong> nel sito web — non è un extra. Qui scegli i canali social aggiuntivi.
                  </p>
                  <div className="choice-grid">
                    {socialPlatforms.map((plat) => (
                      <button
                        type="button"
                        className={form.socialPlatforms.includes(plat) ? 'choice selected' : 'choice'}
                        onClick={() => toggle('socialPlatforms', plat)}
                        key={plat}
                      >
                        {plat} (+10 €)
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-block">
                  <p className="form-title">Di cosa hai bisogno per i tuoi Social?</p>
                  <p className="form-help">Contenuti su misura per {form.type}.</p>
                  <div className="choice-grid">
                    {(socialByType[form.type] || socialNeedsList).map((opt) => (
                      <button
                        type="button"
                        className={form.socialNeeds.includes(opt.name) ? 'choice selected' : 'choice'}
                        onClick={() => toggle('socialNeeds', opt.name)}
                        key={opt.name}
                      >
                        {opt.name} (+{opt.price} €)
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* SEZIONE DESIGN E GRAFICHE con prezzi visibili */}
            {hasSite && hasDesign && (
              <div className="form-block">
                <p className="form-title">Design e Materiali Grafici</p>
                <p className="form-help">Materiali su misura per {form.type}.</p>
                <div className="choice-grid">
                  {(designByType[form.type] || designNeedsList).map((des) => (
                    <button
                      type="button"
                      className={form.designNeeds.includes(des.name) ? 'choice selected' : 'choice'}
                      onClick={() => toggle('designNeeds', des.name)}
                      key={des.name}
                    >
                      {des.name} (+{des.price} €)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* OPZIONE EVENTO CON MUSICA DAL VIVO (In collaborazione con la label musicale) */}
            <div className="form-block">
              <p className="form-title">Sconto partner Trebla — 20 €</p>
              <p className="form-help">Aggiungi un piccolo banner discreto “Realizzato da Trebla Studio” nel tuo sito e sblocca subito lo sconto partner.</p>
              <button type="button" className={form.bannerDiscount ? 'choice selected' : 'choice'} onClick={() => update('bannerDiscount', !form.bannerDiscount)}>
                {form.bannerDiscount ? '✓ Sconto partner attivo' : 'Applica sconto partner — 20 €'}
              </button>
            </div>

            <div className="form-block">
              <p className="form-title">Evento musicale opzionale?</p>
              <p className="form-help">Se ti interessa musica dal vivo per inaugurazione/promo, lo gestiamo tramite Pikete Label (sezione dedicata sotto). Costo su misura.</p>
              <div className="event-options">
                {[
                  'Sì, voglio info per evento musicale',
                  'Da valutare più avanti',
                  'Non al momento',
                ].map((ev) => (
                  <button
                    type="button"
                    className={form.musicEvent === ev ? 'event-option selected' : 'event-option'}
                    onClick={() => update('musicEvent', ev)}
                    key={ev}
                  >
                    {ev}
                  </button>
                ))}
              </div>
              <p style={{ marginTop: '10px', fontSize: '13px' }}><a href="#eventi" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline' }}>Vedi dettagli evento →</a></p>
            </div>

            {/* Obiettivi */}
            {!isAltro && (
            <div className="form-block">
              <p className="form-title">Cosa vuoi ottenere principalmente?</p>
              <div className="choice-grid goals">
                {goals.map((goal) => (
                  <button
                    type="button"
                    className={form.goals.includes(goal) ? 'choice selected' : 'choice'}
                    onClick={() => toggle('goals', goal)}
                    key={goal}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
            )}

            {/* Tempi e Note */}
            <div className="form-block form-split">
              <label>
                Quando vorresti iniziare?
                <div className="choice-grid compact">
                  {['Appena possibile (10 giorni)', 'Entro un mese', 'Sto valutando'].map((time) => (
                    <button
                      type="button"
                      className={form.timing === time ? 'choice selected' : 'choice'}
                      onClick={() => update('timing', time)}
                      key={time}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </label>
              <label>
                Raccontaci qualcosa
                <textarea
                  value={form.notes}
                  onChange={(event) => update('notes', event.target.value)}
                  placeholder="Dettagli, richieste particolari o cose importanti da sapere (opzionale)"
                  rows="3"
                />
              </label>
            </div>

            {/* Consenso privacy — P0 legale */}
            <div className="form-block" style={{ borderBottom: 'none', paddingBottom: '8px' }}>
              <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontWeight: 400, fontSize: '13px', lineHeight: '1.5', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.privacy} onChange={(e) => update('privacy', e.target.checked)} style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--blue)' }} />
                <span>Ho letto l’<a href="#privacy" style={{ color: 'var(--blue)', textDecoration: 'underline', fontWeight: 700 }}>informativa privacy</a> e acconsento al trattamento dei dati per ricevere il preventivo via WhatsApp/Email. I dati non vengono salvati su database proprietario ma usati solo per rispondere. *</span>
              </label>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '10px 0 0 28px', lineHeight: '1.5' }}>Tracciamento: al momento nessun analytics proprietario; se attiverai eventi (click WhatsApp, invio preventivo, apertura FAQ, click casi studio) verranno raccolti in modo trasparente e nel rispetto delle norme. [DA CONFIGURARE]</p>
            </div>

            {/* Stima Dinamica & Pulsante WhatsApp */}
            <div className="estimate">
              <div>
                {estimateRevealed ? (
                  <>
                     <span>La tua stima — IVA esclusa</span>
                    <strong>{quoteLabel} <small>stima IVA escl.</small></strong>
                    <p>La stima è indicativa: il prezzo finale può variare dopo aver parlato insieme dei dettagli del progetto. Tutti i prezzi sono IVA esclusa.</p>
                    <p>Pronto in 10 giorni lavorativi* · Scheda Google inclusa · Nessun abbonamento mensile · *vedi condizioni in Prezzi/FAQ.</p>
                    {hasSite && (
                      <p className="estimate-note">Acconto 10% per bloccare le tempistiche ({Math.round(currentTotal * 0.1)} € su {currentTotal} €) — resto alla consegna</p>
                    )}
                  </>
                ) : (
                  <>
                    <span>Stima finale</span>
                    <strong>{canReveal ? 'Sei pronto per la stima' : 'Completa il modulo'}</strong>
                    <p>
                      {!form.privacy
                        ? 'Manca il consenso privacy per sbloccare la stima.'
                        : canReveal
                          ? 'Hai risposto a tutto: premi "Mostra la stima" per scoprire il prezzo della tua proposta.'
                          : `Per sbloccare la stima manca ancora: ${missingFields.join(', ')}.`}
                    </p>
                  </>
                )}
              </div>
              {estimateRevealed ? (
                <button className="wa-cta" type="submit" disabled={!hasSite}>
                  <WhatsAppIcon />
                  Invia stima su WhatsApp
                </button>
              ) : canReveal ? (
                <button
                  className="wa-cta"
                  type="button"
                  onClick={revealEstimate}
                >
                  Mostra la stima
                </button>
              ) : null}
            </div>
          </form>
        </section>

        {/* Eventi e attivazioni — separato dal core sito */}
        <section id="eventi" className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <p className="section-label">Eventi e attivazioni</p>
          <div className="section-intro">
            <h2>Musica dal vivo<br /><em>per la tua attività.</em></h2>
            <p>In collaborazione con Pikete Label (etichetta musicale gestita dallo stesso team) possiamo portare artisti per inaugurazioni, serate a tema o promozioni. Attività separata dal servizio sito/social/design.</p>
          </div>
          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
              <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Per chi è utile</strong>
              <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>Bar, ristoranti, negozi, centri estetici, associazioni che vogliono inaugurare o animare una serata. Formato piccolo, impianto base.</span>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
              <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Cosa include e costi</strong>
              <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>Artisti Pikete Label, scaletta concordata, promozione coordinata con il sito. Costo su misura in base a data, durata e location — preventivo a parte. <a href="https://piketelabel.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 800 }}>Vedi artisti →</a></span>
            </div>
          </div>
          <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--muted)' }}>Nota: l’evento non è incluso nel prezzo del sito; è un’attivazione opzionale e separata.</p>
        </section>

        {/* FAQ */}
        <section id="servizi-dettaglio" className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
          <p className="section-label">Dettaglio servizi — senza inventare</p>
          <div className="section-intro">
            <h2>Cosa facciamo,<br /><em>nel dettaglio.</em></h2>
            <p>Pagine dedicate in arrivo. Qui il perimetro concreto per ogni servizio — senza blocchi assoluti, con percorso consigliato.</p>
          </div>
          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', fontSize: '13px', lineHeight: '1.6' }}>
            <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
              <strong>Sito Web</strong>
              <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Tipologie: vetrina, landing, multi-pagina (no e-commerce avanzato al momento). Deliverable: design responsive, SEO base, form+WhatsApp, mappa/orari, Google Business inclusa, 1 revisione. Non incluso: dominio/hosting, copy lungo fornito da te, foto se non scelte. Strumenti: Vercel/hosting statico. Integrazioni: WhatsApp, Maps. Tempi: 10gg* post-materiali. Costi: da 350 € IVA escl. + extra.</p>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
              <strong>Social Media</strong>
              <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Piano editoriale, creatività grafiche storie, reel brevi, frequenza concordata, approvazione via WhatsApp, report base. Cuore consigliato: sito, ma possiamo partire anche solo da social se priorità corretta. Prezzi nel configuratore.</p>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
              <strong>Design &amp; Branding</strong>
              <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Logo/rinnovo, biglietti, volantini/locandine/menu cartaceo, grafiche web coordinate, materiali stampa pronti. Palette e font coerenti col sito. Anche qui: sito consigliato come cuore, ma non blocco assoluto.</p>
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px', fontSize: '13px', lineHeight: '1.6' }}>
            <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '16px', background: '#fbfbf9' }}>
              <strong>Per settore — pagine dedicate [IN ARRIVO, richiedono testi originali per Asti/Piemonte]</strong>
              <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Ristoranti/pizzerie (menu, prenotazioni, mappa, WhatsApp) · Hotel/B&amp;B (camere, servizi, gallery, richieste, lingue, recensioni) · Negozi (prodotti, orari, promo, Google Business) · Saloni (servizi, listino, prenotazione, team, prima/dopo) · Artigiani (lavori, zone servite, sopralluogo) · Professionisti (metodo, casi, FAQ) · Associazioni (calendario, iscrizioni). Ogni pagina avrà contenuti non ripetitivi + SEO locale.</p>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '16px' }}>
              <strong>Cosa NON facciamo (al momento)</strong>
              <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>E-commerce complesso, gestionali avanzati, campagne Ads complesse — dopo aver consolidato il core. Se ti servono, ti indichiamo partner o percorso. Trasparenza prima di tutto.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <p className="section-label">Domande frequenti</p>
          <div className="section-intro">
            <h2>
              Dubbi o domande?<br />
              <em>Ecco le risposte.</em>
            </h2>
            <p>Tutto quello che c'è da sapere prima di iniziare il tuo progetto.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <article
                key={index}
                className={openFaq === index ? 'faq-card faq-active' : 'faq-card'}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="faq-header">
                  <h3>{faq.q}</h3>
                  <span className="faq-plus">{openFaq === index ? '−' : '+'}</span>
                </div>
                {openFaq === index && <p style={{ whiteSpace: 'pre-line' }}>{faq.a}</p>}
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Assistenza e post-lancio */}
      <section id="assistenza" className="section" style={{ background: '#fbfbf9', borderTop: '1px solid var(--line)' }}>
        <p className="section-label">Assistenza</p>
        <div className="section-intro">
          <h2>Dopo il lancio,<br /><em>non spariamo.</em></h2>
          <p>Chi aggiorna cosa, in quanto tempo e a quale costo — tutto scritto prima di iniziare.</p>
        </div>
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', fontSize: '13px', lineHeight: '1.6' }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>Garanzia bug &amp; revisioni</strong>
            <span style={{ color: 'var(--muted)' }}>
              • 1 giro di revisioni incluso prima della pubblicazione<br/>
              • Bug fix gratis previa nostra valutazione che sia effettivamente bug (non modifica)<br/>
              • Modifiche future: 15 € cad., usate come prova portfolio previo consenso<br/>
              • Tempi risposta indicativi: [DA INSERIRE — es. entro 24h feriale]
            </span>
          </div>
          <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>Dominio, hosting, proprietà</strong>
            <span style={{ color: 'var(--muted)' }}>
              • Dominio intestato a te, pagato direttamente a Vercel/hosting (costo variabile ~10-20 €/anno)<br/>
              • Hosting su Vercel — possiamo mantenerlo o consegnarti accessi<br/>
              • Proprietà: codice, testi e grafiche consegnate sono tue<br/>
              • Licenze/immagini archivio: verificate per uso commerciale
            </span>
          </div>
          <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>Manutenzione facoltativa</strong>
            <span style={{ color: 'var(--muted)' }}>
              • Aggiornamenti contenuti su richiesta (non abbonamento obbligatorio)<br/>
              • Backup, sicurezza, rinnovi: su richiesta<br/>
              • Formazione rapida per modificare testi base<br/>
              • Procedura richiesta: WhatsApp/Email — [SLA DA INSERIRE]
            </span>
          </div>
        </div>
      </section>

      {/* Contatti completi — P0 senza inventare dati */}
      <section id="contatti" className="section">
        <p className="section-label">Contatti</p>
        <div className="section-intro">
          <h2>Parliamone<br /><em>davvero.</em></h2>
          <p>Risposta rapida, canali diretti, area servita chiara.</p>
        </div>
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '20px' }}>
            <strong style={{ display: 'block', marginBottom: '12px' }}>Contatti diretti</strong>
            <p style={{ margin: '0 0 8px', fontSize: '14px' }}><strong>WhatsApp:</strong> <a href={`https://wa.me/${whatsapp}`} style={{ color: 'var(--blue)', textDecoration: 'underline' }}>+39 351 892 4471</a> — canale preferito</p>
            <p style={{ margin: '0 0 8px', fontSize: '14px' }}><strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: 'var(--blue)', textDecoration: 'underline' }}>{email}</a></p>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--muted)' }}><strong>Orari risposta:</strong> [DA INSERIRE — es. Lun-Ven 9-18] — [Tempo medio risposta: DA INSERIRE]</p>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--muted)' }}><strong>Area servita:</strong> Asti e Piemonte — disponibile anche in remoto/videochiamata</p>
            <p style={{ margin: '0', fontSize: '14px', color: 'var(--muted)' }}><strong>Sede operativa:</strong> [DA INSERIRE — città/indirizzo se vuoi mostrarlo, altrimenti “su appuntamento ad Asti”]</p>
            <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla Studio! Vorrei prenotare una chiamata per il mio sito.')}`} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--blue)', color: '#fff', borderRadius: '999px', padding: '10px 16px', fontWeight: 800, fontSize: '13px' }}>Prenota chiamata su WhatsApp →</a>
              <a href={`mailto:${email}`} style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '10px 16px', fontWeight: 800, fontSize: '13px' }}>Scrivi via Email</a>
            </div>
          </div>
          <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '20px', background: '#fbfbf9' }}>
            <strong style={{ display: 'block', marginBottom: '12px' }}>Dati aziendali — [DA COMPLETARE]</strong>
            <p style={{ margin: '0 0 6px', fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>
              Ragione sociale: [DA INSERIRE]<br/>
              P.IVA / C.F.: [DA INSERIRE — obbligatorio per fattura e footer legale]<br/>
              Titolare trattamento privacy: [Nome — DA INSERIRE]<br/>
              PEC / SDI: [Se presente — DA INSERIRE]<br/>
              Privacy / Cookie / Termini: vedi link in footer (pagine da validare con professionista)
            </p>
            <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#6d8894' }}>Non inventiamo dati fiscali. Inserisci quelli reali e li pubblichiamo qui e in footer.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong className="footer-brand">Trebla Studio</strong>
          <p>Digitalizza la tua piccola azienda.</p>
        </div>
        <nav className="footer-nav" aria-label="Navigazione footer">
          <a href="#servizi">Servizi</a>
          <a href="#metodo">Metodo</a>
          <a href="#prezzi">Prezzi</a>
          <a href="#faq">FAQ</a>
          <a href="#contatti">Contatti</a>
          <a href={`mailto:${email}`}>{email}</a>
          <a href="#privacy">Privacy</a>
          <a href="#cookie">Cookie</a>
          <a href="#termini">Termini</a>
        </nav>
        <a className="footer-whatsapp" href={`https://wa.me/${whatsapp}`} aria-label="Contatta Trebla Studio su WhatsApp">
          <WhatsAppIcon />
          Parliamone su WhatsApp
        </a>
        <section id="privacy" className="section" style={{ paddingTop: '24px', paddingBottom: '12px', background: 'transparent' }}>
          <p className="section-label">Privacy — placeholder da validare</p>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>Privacy Policy — [BOZZA NON LEGALE, DA VALIDARE CON PROFESSIONISTA]</h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', margin: 0 }}>Titolare: [DA INSERIRE] — Email: {email} — Dati raccolti: nome attività, settore, preferenze sito, messaggio inviato via WhatsApp (nessun database proprietario attuale). Finalità: rispondere a richieste preventivo. Base giuridica: consenso/esecuzione misure precontrattuali. Conservazione: [DA INSERIRE]. Diritti: accesso/cancellazione scrivendo a {email}. [Completa con informativa estesa e validazione legale prima di campagne].</p>
        </section>
        <section id="cookie" className="section" style={{ paddingTop: '12px', paddingBottom: '12px', background: 'transparent' }}>
          <p className="section-label">Cookie — placeholder</p>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>Cookie Policy — [BOZZA]</h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', margin: 0 }}>Questo sito attualmente non imposta cookie di profilazione proprietari; usa solo tecnici necessari e font Google (verifica consenso). Se attiverai analytics/ads, aggiungi banner consenso e aggiorna qui. [DA VALIDARE].</p>
        </section>
        <section id="termini" className="section" style={{ paddingTop: '12px', paddingBottom: '24px', background: 'transparent' }}>
          <p className="section-label">Termini — placeholder</p>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>Termini di servizio — [BOZZA]</h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', margin: 0 }}>Preventivi validi 30 giorni, prezzi IVA esclusa, acconto 10% incluso a bloccare tempistiche (resto a consegna), 1 revisione inclusa, extra a consumo. Proprietà sito trasferita a saldo. [DA VALIDARE con professionista].</p>
        </section>
        <small>© 2026 Trebla Studio — <a href="#privacy" style={{ color: '#8ea8b3', textDecoration: 'underline' }}>Privacy</a> · <a href="#cookie" style={{ color: '#8ea8b3', textDecoration: 'underline' }}>Cookie</a> · <a href="#termini" style={{ color: '#8ea8b3', textDecoration: 'underline' }}>Termini</a> — P.IVA [DA INSERIRE]</small>
      </footer>

      {quickContactOpen && (
        <div className="modal-overlay" onClick={() => setQuickContactOpen(false)}>
          <form
            className="quick-modal"
            onSubmit={sendQuickMessage}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="modal-kicker">Parliamone subito</p>
            <h3>Come si chiama<br />la tua attività?</h3>
            <input
              autoFocus
              required
              value={quickName}
              onChange={(event) => setQuickName(event.target.value)}
              placeholder="Es. Trattoria da Mario"
            />
            <button className="wa-cta modal-wa" type="submit">
              <WhatsAppIcon />
              Scrivici su WhatsApp
            </button>
            <button type="button" className="modal-close" onClick={() => setQuickContactOpen(false)}>
              Annulla
            </button>
          </form>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';
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
    a: 'Sono incluse 2 revisioni (anche correzioni testo) prima della pubblicazione. Dopo, modifiche future costano 15 € cad. e verranno usate come prova nel portfolio Trebla Studio (previo consenso).\nI bug li sistemiamo gratis, previa nostra valutazione che si tratti effettivamente di un bug.',
  },
  {
    q: 'Quanto tempo ci vuole per realizzare il sito?',
    a: 'Per i progetti essenziali, circa 10 giorni lavorativi garantiti dopo aver ricevuto tutti i materiali (testi, foto, logo) e le tue approvazioni. Se i contenuti arrivano a scaglioni o servono più revisioni, i tempi si allungano di conseguenza.',
  },
  {
    q: "C'è un abbonamento mensile da pagare?",
    a: 'No, nessun abbonamento obbligatorio a Trebla. Il sito è di tua proprietà (codice, testi e grafiche consegnate). Restano a parte i costi tecnici ricorrenti: dominio (pagato direttamente a Vercel/hosting, ~10-20 €/anno variabile) e hosting se scegli di mantenerlo su Vercel. Backup, aggiornamenti e modifiche future sono su richiesta (vedi Assistenza).',
  },
  {
    q: "L'acconto è incluso nel prezzo?",
    a: "Sì, l'acconto del 10% è incluso nel prezzo finale e serve solo a bloccare le tempistiche (validità preventivo 2 settimane). Il resto lo paghi alla consegna in contanti/bonifico. Prezzo finale senza IVA aggiunta (al momento senza P.IVA). Se il sito a metà lavoro non prosegue, concordiamo chiusura — non è rimborsabile se il lavoro è già stato svolto correttamente.",
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
    a: 'Sì! Tramite la nostra etichetta discografica Pikete Label possiamo organizzare piccoli eventi con artisti per inaugurazioni, serate a tema o per sponsorizzare la tua attività.',
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

function usePageTitle(title) {
  useEffect(() => { document.title = title; window.scrollTo(0,0); }, [title]);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0,0); }, [pathname]);
  return null;
}

function Header({ onOpenQuick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <header className="header">
      <a href="#main" className="skip-link" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>Salta al contenuto</a>
      <Link className="logo" to="/" aria-label="Trebla Studio - torna alla homepage" onClick={() => setMenuOpen(false)}>
        <picture><source srcSet="/trebla-logo.webp" type="image/webp" /><img src="/trebla-logo-transparent.png" alt="Trebla Studio — Siti web per piccole imprese in Piemonte" width="123" height="70" loading="eager" decoding="async" fetchPriority="high" /></picture>
      </Link>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navigazione principale">
        <Link to="/servizi" onClick={() => setMenuOpen(false)}>Servizi</Link>
        <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Lavori</Link>
        <Link to="/chi-siamo" onClick={() => setMenuOpen(false)}>Chi siamo</Link>
        <Link to="/come-lavoriamo" onClick={() => setMenuOpen(false)}>Metodo</Link>
        <Link to="/prezzi" onClick={() => setMenuOpen(false)}>Prezzi</Link>
        <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
        <Link to="/contatti" onClick={() => setMenuOpen(false)}>Contatti</Link>
        <Link className="nav-mobile-cta" to="/preventivo" onClick={() => setMenuOpen(false)}>Configura il preventivo</Link>
      </nav>
      <button type="button" className="header-cta" onClick={onOpenQuick} aria-label="Scrivici su WhatsApp — parliamone">Parliamone</button>
      <button className={menuOpen ? 'menu menu-active' : 'menu'} aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '32px', width: '100%', maxWidth: '1200px', textAlign: 'left' }}>
        <div>
          <strong className="footer-brand">Trebla Studio</strong>
          <p style={{ marginTop: '8px', lineHeight: '1.6' }}>Studio indipendente ad Asti.<br />Siti web per piccole attività in Piemonte.<br /><span style={{ color: '#d8e3e7', fontSize: '12px' }}>Mar chiuso · resto 15:00-18:45 · risposta fino alle 23</span></p>
          <a href={`mailto:${email}`} style={{ display: 'inline-block', marginTop: '12px', color: '#fff', fontWeight: 800, fontSize: '14px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{email}</a>
        </div>
        <nav aria-label="Navigazione footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <strong style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8ea8b3', marginBottom: '4px' }}>Navigazione</strong>
          <Link to="/servizi" style={{ color: '#d8e3e7', fontSize: '14px' }}>Scopri i servizi</Link>
          <Link to="/portfolio" style={{ color: '#d8e3e7', fontSize: '14px' }}>Vedi i lavori</Link>
          <Link to="/chi-siamo" style={{ color: '#d8e3e7', fontSize: '14px' }}>Chi siamo</Link>
          <Link to="/come-lavoriamo" style={{ color: '#d8e3e7', fontSize: '14px' }}>Metodo</Link>
          <Link to="/prezzi" style={{ color: '#d8e3e7', fontSize: '14px' }}>Vedi i prezzi</Link>
          <Link to="/faq" style={{ color: '#d8e3e7', fontSize: '14px' }}>FAQ</Link>
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <strong style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8ea8b3', marginBottom: '4px' }}>Contatti &amp; legale</strong>
          <Link to="/contatti" style={{ color: '#d8e3e7', fontSize: '14px' }}>Contatti</Link>
          <a href={`https://wa.me/${whatsapp}`} style={{ color: '#d8e3e7', fontSize: '14px' }}>Scrivici su WhatsApp</a>
          <Link to="/privacy" style={{ color: '#d8e3e7', fontSize: '14px' }}>Privacy</Link>
          <Link to="/cookie" style={{ color: '#d8e3e7', fontSize: '14px' }}>Cookie</Link>
          <Link to="/termini" style={{ color: '#d8e3e7', fontSize: '14px' }}>Termini</Link>
        </div>
      </div>
      <a className="footer-whatsapp" href={`https://wa.me/${whatsapp}`} aria-label="Scrivici su WhatsApp" style={{ marginTop: '24px' }}>
        <WhatsAppIcon /> Scrivici su WhatsApp
      </a>
      <small style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', lineHeight: '1.6' }}>© 2026 Trebla Studio · Asti, Piemonte · <Link to="/privacy" style={{ color: '#8ea8b3', textDecoration: 'underline' }}>Privacy</Link> · <Link to="/cookie" style={{ color: '#8ea8b3', textDecoration: 'underline' }}>Cookie</Link> · <Link to="/termini" style={{ color: '#8ea8b3', textDecoration: 'underline' }}>Termini</Link></small>
    </footer>
  );
}

function Layout({ children, onOpenQuick }) {
  return (
    <>
      <Header onOpenQuick={onOpenQuick} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

// ---- PAGES ----

function HomePage() {
  usePageTitle('Trebla Studio — Siti Web per Piccole Imprese in Piemonte | Asti');
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>La tua attività<br /><em>merita di essere vista.</em></h1>
          <p style={{ maxWidth: '380px' }}>Siti web per piccole attività di Asti e Piemonte — chiari, veloci e facili da contattare. Per ricevere più richieste e prenotazioni. A partire da 350 €, prezzo trasparente prima di iniziare.</p>
          <div className="hero-actions">
            <Link className="button button-main" to="/preventivo">Configura il preventivo</Link>
            <Link className="button button-quiet" to="/servizi" style={{ fontWeight: 600 }}>Scopri i servizi</Link>
          </div>
          <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>Risposta fino alle 23 · Consegna in 10 giorni* dopo materiali · 2 revisioni incluse</p>
        </div>
        <div className="hero-card">
          <span className="card-kicker">Trebla Studio — Asti</span>
          <strong>Un passo concreto<br /><em>verso il digitale.</em></strong>
          <p>Per rendere la tua attività più visibile, più chiara e più facile da contattare.</p>
        </div>
      </section>

      <section className="audience">
        <p>Per chi ha qualcosa di valido da dimostrare — <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '13px' }}>categorie indicative</span></p>
        <div>
          <span>Ristoranti</span><span>Hotel & B&B</span><span>Saloni di bellezza</span><span>Negozi</span><span>Artigiani</span><span>Professionisti</span><span>Piccole imprese</span>
        </div>
        <p style={{ marginTop: '10px', fontSize: '12px', opacity: 0.7, fontWeight: 400 }}>Non sono filtri — esplora i <Link to="/servizi" style={{ textDecoration: 'underline', color: '#fff' }}>servizi</Link> per i dettagli per ogni settore.</p>
      </section>

      <section className="section">
        <p className="section-label">Servizi</p>
        <div className="section-intro">
          <h2>Il digitale,<br /><em>fatto semplice.</em></h2>
          <p>Una presenza online chiara per uscire dal passaparola e arrivare davanti a potenziali clienti. — <Link to="/servizi" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline' }}>Scopri i dettagli →</Link></p>
        </div>
        <div className="service-grid">
          <Link to="/servizi/siti-web" className="service-card service-main" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>01</span><h3>Sito web</h3><p>Una presenza su internet chiara, curata e facile da usare per trasformare chi ti cerca in un cliente reale.</p>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: design responsive, SEO, form WhatsApp, mappa, 2 revisioni. A partire da 350 €.</p>
            <span style={{ marginTop: '12px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Dettagli sito web →</span>
          </Link>
          <Link to="/servizi/social-media" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>02</span><h3>Social media</h3><p>Contenuti e gestione per rendere la tua presenza attiva e coerente ogni settimana.</p>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: piano editoriale, grafiche, reel. Acquistabile anche senza sito.</p>
            <span style={{ marginTop: '12px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Dettagli social →</span>
          </Link>
          <Link to="/servizi/design" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>03</span><h3>Design e grafiche</h3><p>Logo, grafiche promozionali e materiali coordinati che rendono la tua attività riconoscibile.</p>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: logo, biglietti, volantini. Acquistabile anche senza sito.</p>
            <span style={{ marginTop: '12px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Dettagli design →</span>
          </Link>
        </div>
      </section>

      <section className="section portfolio-section">
        <p className="section-label">Un esempio concreto</p>
        <div className="section-intro">
          <h2>Lo abbiamo<br /><em>già fatto.</em></h2>
          <p>Un solo caso reale mostrato con precisione — senza inventare. Altri in arrivo.</p>
        </div>
        <Link className="portfolio-feature" to="/portfolio" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '18px', alignItems: 'center' }}>
          <div>
            <span className="portfolio-kicker">Cliente — Settore — Intervento</span>
            <strong>Pikete Label</strong>
            <span className="portfolio-sub">Etichetta musicale — Asti/Alessandrino · Sito vetrina + catalogo artisti</span>
            <p style={{ marginTop: '8px' }}><strong style={{ color: '#fff', fontWeight: 800 }}>Ruolo Trebla:</strong> design + sviluppo (HTML/CSS/TS/React) + gestione · <strong style={{ color: '#fff', fontWeight: 800 }}>Stato:</strong> sito pubblicato, citato su giornale provinciale Alessandrino (fonte verificabile su richiesta) · <strong style={{ color: '#fff', fontWeight: 800 }}>Risultato:</strong> presenza online attiva, richieste eventi in entrata (metriche in raccolta, non inventate).</p>
            <span className="portfolio-cta"><span>Vedi i lavori — portfolio</span><span>sito realizzato da noi →</span></span>
          </div>
          <div style={{ background: '#0f2a3a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '12px', textAlign: 'center', minHeight: '140px', display: 'grid', placeItems: 'center' }}>
            <div>
              <div style={{ width: '100%', height: '90px', background: '#bdd4df', borderRadius: '6px', display: 'grid', placeItems: 'center', color: '#173d56', fontWeight: 800, fontSize: '12px' }}>Anteprima<br/>piketelabel.vercel.app</div>
              <p style={{ marginTop: '8px', fontSize: '11px', color: '#bdd4df', lineHeight: '1.4' }}>Screenshot reale in arrivo<br/>— visita il sito live</p>
            </div>
          </div>
        </Link>
      </section>

      <section className="section price-section">
        <p className="section-label">Prezzi chiari</p>
        <div className="price-grid">
          <div>
            <h2>Una proposta<br /><em>alla tua portata.</em></h2>
            <p>Prezzo trasparente, a partire da 350 €. La cifra la vedi prima di iniziare, con dettaglio di cosa è incluso ed escluso.</p>
            <Link className="button button-light" to="/preventivo">Configura il preventivo</Link>
            <Link className="button button-quiet" to="/prezzi" style={{ marginLeft: '10px', background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>Vedi i prezzi</Link>
          </div>
          <ul>
            <li><b>Prezzo trasparente</b><span>A partire da 350 €, 2 revisioni, cookie banner gratuito incluso.</span></li>
            <li><b>Consegna in 10 giorni*</b><span>*Dopo materiali e approvazioni complete.</span></li>
            <li><b>Zero abbonamenti*</b><span>*Il sito è di tua proprietà. Costi tecnici dominio/hosting separati (vedi dettagli).</span></li>
          </ul>
        </div>
        <p style={{ marginTop: '16px', fontSize: '11px', color: '#8fb8c9', lineHeight: '1.5' }}>Dettagli fiscali e amministrativi (modalità di pagamento, ricevuta, condizioni) nella pagina <Link to="/termini" style={{ color: '#fff', textDecoration: 'underline' }}>Termini</Link> e su richiesta — verifica con professionista.</p>
      </section>

      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
        <p className="section-label">Prossimo passo</p>
        <div className="section-intro">
          <h2>Pronto a<br /><em>iniziare?</em></h2>
          <p>Configura la tua proposta in 2 minuti — poi ti rispondiamo fino alle 23.</p>
        </div>
        <div style={{ marginTop: '22px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link className="button button-main" to="/preventivo">Configura il preventivo</Link>
          <a className="button button-quiet" href={`https://wa.me/${whatsapp}`} style={{ background: '#fff', border: '1px solid var(--line)' }}>Scrivici su WhatsApp</a>
          <Link to="/contatti" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', textDecoration: 'underline', padding: '10px' }}>Vedi tutti i contatti →</Link>
        </div>
      </section>
    </>
  );
}

function ServiziPage() {
  usePageTitle('Trebla Studio — Servizi: Siti Web, Social, Design | Asti');
  return (
    <section className="section">
      <p className="section-label">Servizi</p>
      <div className="section-intro">
        <h1>Cosa facciamo,<br /><em>nel dettaglio.</em></h1>
        <p>Tre servizi chiari. Il sito è il cuore consigliato, ma puoi partire anche da social o design se è la priorità. <Link to="/preventivo" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline' }}>Vai al preventivo →</Link></p>
      </div>
      <div className="service-grid" style={{ marginTop: '32px' }}>
        <Link to="/servizi/siti-web" className="service-card service-main" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>01</span><h3>Sito web</h3><p>Da 350 € finale. Responsive, SEO avanzata, cookie banner gratuito, 2 revisioni, WhatsApp/Email/Instagram/prenotazioni, Google Business inclusa.</p>
        </Link>
        <Link to="/servizi/social-media" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>02</span><h3>Social media</h3><p>Piano editoriale, grafiche storie, reel brevi. Approvazione WhatsApp. Anche senza sito.</p>
        </Link>
        <Link to="/servizi/design" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>03</span><h3>Design e grafiche</h3><p>Logo (o via Fiverr), biglietti, volantini/locandine/menu, grafiche web coordinate.</p>
        </Link>
      </div>
      <div style={{ marginTop: '24px', border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9', fontSize: '13px', lineHeight: '1.6' }}>
        <strong>Per settore — pagine dedicate in arrivo</strong>
        <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Ristoranti, Hotel/B&B, Negozi, Saloni, Artigiani, Professionisti, Associazioni — <Link to="/portfolio" style={{ color: 'var(--blue)', fontWeight: 800 }}>vedi esempi →</Link></p>
      </div>
    </section>
  );
}

function ServizioSitiWebPage() {
  usePageTitle('Trebla Studio — Siti Web | Asti');
  return (
    <section className="section">
      <p className="section-label">Servizi — Sito Web</p>
      <div className="section-intro">
        <h1>Sito web<br /><em>chiaro e curato.</em></h1>
        <p>Da 350 € finale (pagina singola) o 400 € multi-pagina. 10 giorni garantiti post-materiali, 2 revisioni.</p>
      </div>
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', fontSize: '13px', lineHeight: '1.6' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Cosa include</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Design responsive, testi a metà con te, SEO abbastanza avanzata (title/meta/H1/alt/sitemap), form+WhatsApp, mappa/orari, Google Business inclusa, cookie banner gratuito, performance base, 2 revisioni, proprietà sito.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Extra</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Pagine +10€, funzioni per settore (vedi configuratore), foto sul posto +20€ + trasporto se fuori Asti, modifiche future 15€ cad.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Strumenti &amp; consegna</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>HTML/CSS/TS/React su Vercel, dominio intestato a te (paghi tu Vercel ~10-20€/anno), HTTPS, backup su richiesta.</p>
        </div>
      </div>
      <div style={{ marginTop: '18px' }}><Link className="button button-main" to="/preventivo">Configura il tuo sito →</Link></div>
    </section>
  );
}
function ServizioSocialPage() {
  usePageTitle('Trebla Studio — Social Media | Asti');
  return (
    <section className="section">
      <p className="section-label">Servizi — Social Media</p>
      <div className="section-intro">
        <h1>Social<br /><em>coerenti.</em></h1>
        <p>Piano editoriale, grafiche storie, reel brevi. Approvazione via WhatsApp. Cuore consigliato: sito, ma possiamo partire anche solo da social.</p>
      </div>
      <p style={{ marginTop: '18px', color: 'var(--muted)', maxWidth: '620px' }}>Prezzi nel configuratore per ogni tipologia (Reel, Stories, promo). Instagram/TikTok + Google Business inclusa nel sito.</p>
      <Link className="button button-main" to="/preventivo" style={{ marginTop: '18px' }}>Configura social →</Link>
    </section>
  );
}
function ServizioDesignPage() {
  usePageTitle('Trebla Studio — Design | Asti');
  return (
    <section className="section">
      <p className="section-label">Servizi — Design</p>
      <div className="section-intro">
        <h1>Design<br /><em>riconoscibile.</em></h1>
        <p>Logo/rinnovo, biglietti, volantini/locandine/menu cartaceo, grafiche web coordinate. Sito consigliato ma non obbligatorio.</p>
      </div>
      <p style={{ marginTop: '18px', color: 'var(--muted)', maxWidth: '620px' }}>Se il logo va rifatto da zero, collaboriamo via Fiverr esterno. Materiali pronti per stampa.</p>
      <Link className="button button-main" to="/preventivo" style={{ marginTop: '18px' }}>Configura design →</Link>
    </section>
  );
}

function PortfolioPage() {
  usePageTitle('Trebla Studio — Portfolio | Asti');
  return (
    <section className="section portfolio-section">
      <p className="section-label">Portfolio</p>
      <div className="section-intro">
        <h1>Lo abbiamo<br /><em>già fatto.</em></h1>
        <p>Un caso reale + placeholder trasparenti per i prossimi (non mostriamo mai concept come clienti reali).</p>
      </div>
      <a className="portfolio-feature" href="https://piketelabel.vercel.app" target="_blank" rel="noopener noreferrer">
        <span className="portfolio-kicker">Caso studio #1 — sito realizzato da noi</span>
        <strong>Pikete Label</strong>
        <span className="portfolio-sub">etichetta musicale — Asti/Alessandrino</span>
        <p><strong style={{ color: '#fff' }}>Problema:</strong> prezzo alto agenzie, sito poco moderno / <strong style={{ color: '#fff' }}>Obiettivo:</strong> vetrina artisti moderna a prezzo accessibile / <strong style={{ color: '#fff' }}>Soluzione:</strong> sito vetrina responsive catalogo / <strong style={{ color: '#fff' }}>Ruolo:</strong> design + sviluppo + gestione — <strong style={{ color: '#fff' }}>Risultato:</strong> online, citato su giornale provinciale Alessandrino, richieste eventi in entrata.</p>
        <span className="portfolio-cta"><span>Scopri la musica dei nostri artisti</span><span>sito realizzato da noi →</span></span>
      </a>
      <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <strong style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2d6685' }}>[Prossimo caso]</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>[Ristorante/B&B/Artigiano — Asti] — scheda con problema/obiettivo/soluzione/pagine/risultato + link reale.</p>
        </div>
        <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <strong style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2d6685' }}>[Prossimo caso]</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>[Settore] — filtrabile, con immagini desktop/mobile e testimonianza.</p>
        </div>
        <div style={{ border: '1px dashed #cbd3d5', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <strong style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2d6685' }}>[Prossimo caso]</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>[Settore] — in attesa autorizzazione cliente.</p>
        </div>
      </div>
      <div style={{ marginTop: '22px', border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
        <strong style={{ fontSize: '14px', display: 'block', marginBottom: '12px' }}>Prova sociale — in raccolta</strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5', borderLeft: '3px solid var(--blue)', paddingLeft: '12px' }}>“[Testimonianza 1 — in attesa]”</div>
          <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5', borderLeft: '3px solid var(--blue)', paddingLeft: '12px' }}>“[Testimonianza 2 — in attesa]”</div>
          <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5', borderLeft: '3px solid var(--blue)', paddingLeft: '12px' }}>“[Testimonianza 3 — rating 5/5 diretto, non su Google]”</div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: '#6d8894' }}>Nessuna recensione Google attiva; rating diretto 5/5. Video in arrivo.</p>
      </div>
      <div style={{ marginTop: '14px', border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
        <strong style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>Perché ci scelgono</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '13px' }}>
          <span style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '8px 12px', background: '#fff' }}>1 progetto online (Pikete Label) + concept in arrivo</span>
          <span style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '8px 12px', background: '#fff' }}>Risposta fino alle 23 / entro 2gg</span>
          <span style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '8px 12px', background: '#fff' }}>Consegna 10gg* · 2 revisioni · Bug fix valutato</span>
          <span style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '8px 12px', background: '#fff' }}>Citato su giornale Alessandrino</span>
        </div>
      </div>
    </section>
  );
}

function ChiSiamoPage() {
  usePageTitle('Trebla Studio — Chi siamo | Asti');
  return (
    <section className="section" style={{ background: '#fff' }}>
      <p className="section-label">Chi siamo</p>
      <div className="section-intro">
        <h1>Il team dietro<br /><em>Trebla Studio.</em></h1>
        <p>Siamo in due, ad Asti. Trebla nasce come progetto di Albert e si è estesa con Pikete Label. Valorizziamo il potere dei giovani: anche i giovani possono lavorare bene, con fiducia, offrendo qualcosa di più accessibile e moderno.</p>
      </div>
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
          <strong style={{ fontSize: '14px' }}>Albert Simoni — Sviluppo</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>Dev. HTML, CSS, TypeScript, React, Vercel. Perito. Gestisce progetto, codice e pubblicazione. Studente — foto non ancora, video in arrivo. Lingue: IT, EN (AL su richiesta).</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
          <strong style={{ fontSize: '14px' }}>Gabriel Santospirito — Design &amp; SMM</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>Designer &amp; SMM. Grafiche, identità, contenuti social. Studente — foto non ancora, video in arrivo. Tools: Da Vinci Resolve, Light.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
          <strong style={{ fontSize: '14px' }}>Come lavoriamo, dove operiamo</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>• Sede: Asti — su appuntamento (nessun indirizzo vetrina)<br/>• Area: solo Asti e Piemonte<br/>• Partner: Pikete Label — artisti per eventi<br/>• Orari: Mar chiuso sempre, resto 15:00-18:45<br/>• Risposta fino alle 23<br/>• Tono: molto professionale</p>
        </div>
      </div>
      <p style={{ marginTop: '14px', fontSize: '12px', color: '#6d8894' }}>Siamo un progetto giovane in avvio, al momento senza P.IVA — trasparenza in Prezzi/Contatti.</p>
    </section>
  );
}

function MetodoPage() {
  usePageTitle('Trebla Studio — Come lavoriamo | Asti');
  return (
    <section className="section method-section">
      <p className="section-label">Come lavoriamo</p>
      <div className="section-intro">
        <h1>Dall'idea<br /><em>alla presenza online.</em></h1>
        <p>Un percorso concreto, con passaggi chiari e conversazione vera sulle necessità della tua attività.</p>
      </div>
      <div className="method-grid">
        <article><span>01</span><h3>Ascolto e Obiettivi</h3><p>Parliamo di cosa fai, di chi sono i tuoi clienti e di come presentare al meglio la tua attività.</p></article>
        <article><span>02</span><h3>Creazione su misura</h3><p>Realizziamo il tuo sito, i testi e le grafiche curando ogni singolo dettaglio per renderlo veloce e chiaro.</p></article>
        <article><span>03</span><h3>Pubblicazione in 10 giorni</h3><p>Mettiamo online il sito, colleghiamo WhatsApp, Google Business e tutto ciò che serve per farti trovare subito. Include 2 revisioni + garanzia bug previa valutazione.</p></article>
      </div>
      <div style={{ marginTop: '22px', border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff', fontSize: '13px', lineHeight: '1.6' }}>
        <strong>Dettaglio processo — trasparenza</strong>
        <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Brief via WhatsApp → raccolta materiali (testi/foto/logo) → design → 2 revisioni → approvazione → pubblicazione su Vercel → formazione base se richiesta. Tempo 10gg garantiti solo se materiali completi.</p>
      </div>
    </section>
  );
}

function PrezziPage() {
  usePageTitle('Trebla Studio — Prezzi chiari | Asti');
  return (
    <section className="section price-section">
      <p className="section-label">Prezzi chiari</p>
      <div className="price-grid">
        <div>
          <h1>Una proposta<br /><em>alla tua portata.</em></h1>
          <p>Niente uffici e niente intermediari: parli direttamente con chi costruisce il tuo sito. Prezzo finale indicato — senza P.IVA (nessuna IVA aggiunta), pagamento contanti/bonifico.</p>
          <Link className="button button-light" to="/preventivo">Fai un preventivo</Link>
        </div>
        <ul>
          <li><b>Prezzo trasparente</b><span>Stima immediata, 2 revisioni, cookie banner gratuito incluso, Google Business inclusa.</span></li>
          <li><b>Consegna in 10 giorni*</b><span>*Garantiti dopo materiali e approvazioni. 2 revisioni incluse.</span></li>
          <li><b>Zero abbonamenti</b><span>Il sito è di tua proprietà. Manutenzione facoltativa.</span></li>
        </ul>
      </div>
      <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', fontSize: '13px', lineHeight: '1.6' }}>
        <div>
          <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Cosa include “da 350 €”*</strong>
          <span style={{ color: '#d5e4e9' }}>• 1 pagina singola fluida (o multi-pagina da 400 €)<br/>• Design responsive, testi a metà, SEO abbastanza avanzata, form+WhatsApp/Email<br/>• Cookie banner gratuito, Google Business inclusa<br/>• 2 revisioni incluse, proprietà sito<br/>• *Prezzo finale, senza IVA aggiunta. Dominio/hosting esclusi.</span>
        </div>
        <div>
          <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Extra a scelta</strong>
          <span style={{ color: '#d5e4e9' }}>• Pagine +10€, funzioni per settore<br/>• Social/Design solo se selezionati<br/>• Foto sul posto +20€ + trasporto se fuori Asti<br/>• Modifiche future 15€ cad.</span>
        </div>
        <div>
          <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Cosa ricevi alla consegna</strong>
          <span style={{ color: '#d5e4e9' }}>• Sito su Vercel, dominio intestato a te (paghi tu Vercel)<br/>• Proprietà codice/contenuti<br/>• Garanzia bug previa valutazione<br/>• Assistenza su richiesta</span>
        </div>
      </div>
      <p style={{ marginTop: '16px', fontSize: '11px', color: '#8fb8c9', lineHeight: '1.5' }}>* Fascia “da 350 €” pagina singola; multi 400€. Prezzi finali senza IVA aggiunta (no P.IVA). Preventivo valido 2 settimane. Acconto 10% incluso, resto a consegna. Se a metà lavoro non prosegue, chiusura concordata.</p>
    </section>
  );
}

function AssistenzaPage() {
  usePageTitle('Trebla Studio — Assistenza | Asti');
  return (
    <section className="section" style={{ background: '#fbfbf9' }}>
      <p className="section-label">Assistenza</p>
      <div className="section-intro">
        <h1>Dopo il lancio,<br /><em>non spariamo.</em></h1>
        <p>Chi aggiorna cosa, in quanto tempo e a quale costo — tutto scritto prima di iniziare.</p>
      </div>
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', fontSize: '13px', lineHeight: '1.6' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Garanzia bug &amp; 2 revisioni</strong>
          <span style={{ color: 'var(--muted)' }}>• 2 revisioni incluse (correzioni testo incluse)<br/>• Bug fix gratis previa valutazione che sia bug<br/>• Modifiche future 15€ cad.<br/>• Risposta entro 2gg / fino alle 23</span>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Dominio, hosting, proprietà</strong>
          <span style={{ color: 'var(--muted)' }}>• Dominio intestato a te, pagato a Vercel ~10-20€/anno<br/>• Hosting Vercel<br/>• Proprietà codice/contenuti tue<br/>• Immagini archivio non ancora attive</span>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Manutenzione facoltativa</strong>
          <span style={{ color: 'var(--muted)' }}>• Aggiornamenti su richiesta (abbonamento valutato per chi ha molte modifiche)<br/>• Backup su richiesta<br/>• HTTPS base<br/>• Richiesta via WhatsApp/Email</span>
        </div>
      </div>
    </section>
  );
}

function FaqPage() {
  usePageTitle('Trebla Studio — FAQ | Asti');
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <section className="section faq-section">
      <p className="section-label">Domande frequenti</p>
      <div className="section-intro">
        <h1>Dubbi o domande?<br /><em>Ecco le risposte.</em></h1>
        <p>Tutto quello che c'è da sapere prima di iniziare il tuo progetto.</p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <article key={index} className={openFaq === index ? 'faq-card faq-active' : 'faq-card'} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
            <div className="faq-header"><h3>{faq.q}</h3><span className="faq-plus">{openFaq === index ? '−' : '+'}</span></div>
            {openFaq === index && <p style={{ whiteSpace: 'pre-line' }}>{faq.a}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function ContattiPage() {
  usePageTitle('Trebla Studio — Contatti | Asti');
  return (
    <section className="section">
      <p className="section-label">Contatti</p>
      <div className="section-intro">
        <h1>Parliamone<br /><em>davvero.</em></h1>
        <p>Risposta rapida, canali diretti, area servita chiara.</p>
      </div>
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '20px' }}>
          <strong style={{ display: 'block', marginBottom: '12px' }}>Contatti diretti</strong>
          <p style={{ margin: '0 0 8px', fontSize: '14px' }}><strong>WhatsApp:</strong> <a href={`https://wa.me/${whatsapp}`} style={{ color: 'var(--blue)', textDecoration: 'underline' }}>+39 351 892 4471</a> — tutto via WhatsApp, no videochiamata</p>
          <p style={{ margin: '0 0 8px', fontSize: '14px' }}><strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: 'var(--blue)', textDecoration: 'underline' }}>{email}</a> — definitiva</p>
          <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--muted)' }}><strong>Orari:</strong> Mar chiuso sempre, resto 15:00-18:45</p>
          <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--muted)' }}><strong>Risposta:</strong> fino alle 23 / entro 2 giorni lavorativi</p>
          <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--muted)' }}><strong>Area:</strong> solo Asti e Piemonte</p>
          <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--muted)' }}><strong>Sede:</strong> Asti — su appuntamento (nessun indirizzo vetrina)</p>
          <p style={{ margin: '0', fontSize: '14px', color: 'var(--muted)' }}><strong>Lingue:</strong> italiano, inglese, albanese occasionale</p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla Studio! Vorrei prenotare una chiamata per il mio sito.')}`} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--blue)', color: '#fff', borderRadius: '999px', padding: '10px 16px', fontWeight: 800, fontSize: '13px' }}>Prenota su WhatsApp →</a>
            <a href={`mailto:${email}`} style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '10px 16px', fontWeight: 800, fontSize: '13px' }}>Scrivi via Email</a>
          </div>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '20px', background: '#fbfbf9' }}>
          <strong style={{ display: 'block', marginBottom: '12px' }}>Dati aziendali — trasparenza</strong>
          <p style={{ margin: '0 0 6px', fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>
            Ragione sociale: Trebla Studio (progetto giovane in avvio)<br/>P.IVA: non disponibile — prezzo finale, pagamento contanti/bonifico<br/>Titolare privacy: Albert Simoni — {email}<br/>Google Business: non attivo<br/>Form alternativo: non attivo (solo configuratore + WhatsApp/Email)<br/>Privacy / Cookie / Termini: vedi footer — bozze
          </p>
        </div>
      </div>
    </section>
  );
}

function EventiPage() {
  usePageTitle('Trebla Studio — Eventi musicali | Asti');
  return (
    <section className="section" style={{ background: '#fff' }}>
      <p className="section-label">Eventi e attivazioni</p>
      <div className="section-intro">
        <h1>Musica dal vivo<br /><em>per la tua attività.</em></h1>
        <p>In collaborazione con Pikete Label (stabile) — 4 cantanti disponibili. Attività separata dal sito/social/design.</p>
      </div>
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Per chi è utile</strong>
          <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>Bar, ristoranti, negozi, associazioni — inaugurazioni, promozioni, serate a tema. Canto live, formato piccolo.</span>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Costi indicativi</strong>
          <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>Da 60€/h per 1 cantante fino a 250€/h per tutti e 4. Prezzo su misura per durata/location. <a href="https://piketelabel.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 800 }}>Vedi artisti →</a></span>
        </div>
      </div>
      <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--muted)' }}>Nota: evento non incluso nel prezzo sito; attivazione opzionale e separata.</p>
    </section>
  );
}

function NotFoundPage() {
  usePageTitle('Trebla Studio — Pagina non trovata');
  return (
    <section className="section" style={{ textAlign: 'center', padding: '60px 7vw' }}>
      <p className="section-label">Errore 404</p>
      <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', margin: '0 0 16px', letterSpacing: '-0.05em' }}>Pagina non trovata.<br /><em style={{ fontFamily: 'var(--serif)' }}>Torniamo da capo.</em></h1>
      <p style={{ color: 'var(--muted)', maxWidth: '520px', margin: '0 auto 24px', fontSize: '16px', lineHeight: '1.6' }}>L’indirizzo che hai aperto non esiste o è stato spostato. Trebla Studio è ancora qui, a due passi da Asti.</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link className="button button-main" to="/">Torna alla homepage</Link>
        <Link className="button button-quiet" to="/servizi">Vedi i servizi</Link>
        <Link className="button button-quiet" to="/preventivo">Configura il preventivo</Link>
        <a className="button" href={`https://wa.me/${whatsapp}`} style={{ background: '#25d366', color: '#fff' }}><WhatsAppIcon /> Scrivici su WhatsApp</a>
        <Link className="button button-quiet" to="/contatti">Contatti</Link>
      </div>
      <p style={{ marginTop: '18px', fontSize: '13px', color: 'var(--muted)' }}>Se stavi cercando: <Link to="/prezzi" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>Prezzi</Link> · <Link to="/portfolio" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>Lavori</Link> · <Link to="/faq" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>FAQ</Link></p>
    </section>
  );
}

function PrivacyPage() {
  usePageTitle('Trebla Studio — Privacy');
  return (
    <section className="section">
      <p className="section-label">Privacy — bozza</p>
      <h1>Privacy Policy<br /><em>bozza non legale.</em></h1>
      <p style={{ marginTop: '18px', fontSize: '14px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '720px' }}>
        Titolare: Albert Simoni — {email} — Nessuna policy professionale attiva, nessun analytics/cookie profilazione, nessun database proprietario: i dati del configuratore vengono inviati solo via WhatsApp per rispondere alla richiesta e conservati in chat per 2 settimane. Diritti: scrivi a {email}. [Da validare con professionista prima di campagne].
      </p>
    </section>
  );
}
function CookiePage() {
  usePageTitle('Trebla Studio — Cookie');
  return (
    <section className="section">
      <p className="section-label">Cookie — bozza</p>
      <h1>Cookie Policy</h1>
      <p style={{ marginTop: '18px', fontSize: '14px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '720px' }}>Nessun cookie di profilazione; solo tecnici necessari + font Google. Cookie banner gratuito incluso. [Da validare].</p>
    </section>
  );
}
function TerminiPage() {
  usePageTitle('Trebla Studio — Termini');
  return (
    <section className="section">
      <p className="section-label">Termini — bozza</p>
      <h1>Termini di<br /><em>servizio.</em></h1>
      <p style={{ marginTop: '18px', fontSize: '14px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '720px' }}>
        Preventivo valido 2 settimane, prezzo finale senza IVA aggiunta (no P.IVA). Acconto 10% incluso a bloccare tempistiche, resto a consegna (contanti/bonifico). 2 revisioni incluse. Proprietà sito trasferita a saldo. Se a metà lavoro non prosegue, chiusura concordata; non rimborsabile se lavoro già svolto correttamente. [Da validare].
      </p>
    </section>
  );
}

// ---- Configuratore Page (Preventivo) ----
function PreventivoPage() {
  usePageTitle('Trebla Studio — Configura il preventivo | Trebla Studio Asti');
  const [typeSearch, setTypeSearch] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const [estimateRevealed, setEstimateRevealed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const revealTime = useRef(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const update = (key, value) => setForm((c) => ({ ...c, [key]: value }));
  const toggle = (key, value) => setForm((c) => ({ ...c, [key]: c[key].includes(value) ? c[key].filter((i) => i !== value) : [...c[key], value] }));
  const handleTypeChange = (type) => setForm((c) => ({ ...c, type, features: [], pages: [] }));
  const handleServiceToggle = (serviceId) => {
    if (serviceId === 'site') {
      if (form.services.includes('site')) setForm((c) => ({ ...c, services: [] }));
      else setForm((c) => ({ ...c, services: ['site'] }));
      return;
    }
    setForm((c) => {
      const exists = c.services.includes(serviceId);
      const updated = exists ? c.services.filter((s) => s !== serviceId) : [...c.services, serviceId];
      return { ...c, services: updated };
    });
  };
  const hasSite = form.services.includes('site');
  const hasSocial = form.services.includes('social');
  const hasDesign = form.services.includes('design');
  const isAltro = form.type === 'Altro';
  const currentTotal = useMemo(() => {
    let total = 0;
    if (hasSite) {
      total = form.structure === 'Sito completo a più pagine' ? 420 : form.structure === 'Pagina singola' ? 370 : 350;
      if (!form.structure) total = 350;
    }
    if (hasSocial) {
      total += form.socialPlatforms.length * 10;
      const list = socialByType[form.type] || socialNeedsList;
      form.socialNeeds.forEach((needName) => {
        const found = list.find((s) => s.name === needName);
        if (found) total += found.price;
      });
    }
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
  const revealEstimate = () => { revealTime.current = Date.now(); setEstimateRevealed(true); };
  const sendQuote = (event) => {
    event.preventDefault();
    if (!estimateRevealed) { if (canReveal) revealEstimate(); return; }
    if (Date.now() - revealTime.current < 1000) return;
    if (!hasSite && !hasSocial && !hasDesign) { alert('Seleziona almeno un servizio (Sito, Social o Design).'); return; }
    const selectedServices = form.services.map((id) => (id === 'site' ? 'Sito Web' : id === 'social' ? 'Social Media' : 'Design e Grafiche')).join(' + ');
    const messageLines = [
      '*Ciao Trebla Studio!*','Vorrei richiedere un preventivo per la mia attività.','','━━━━━━━━━━━━━━━━━━━','*DATI ATTIVITÀ*',`• *Nome:* ${form.name || 'Non specificato'}`,`• *Settore:* ${form.type === 'Altro' && form.typeOther.trim() ? `Altro (${form.typeOther.trim()})` : form.type}`,`• *Servizi scelti:* ${selectedServices}`,'━━━━━━━━━━━━━━━━━━━',
    ];
    if (hasSite) {
      messageLines.push('','*SITO WEB*',`• *Struttura:* ${form.structure}`);
      if (isAltro) messageLines.push('• *Esigenze specifiche:* da definire insieme');
      else messageLines.push(`• *Funzioni:* ${form.features.length ? form.features.join(', ') : 'Standard'}`,`• *Pagine:* ${form.pages.length ? form.pages.join(', ') : 'Standard'}`,`• *Foto:* ${form.photos}`);
    }
    if (hasSocial) messageLines.push('','*SOCIAL MEDIA*',`• *Canali:* ${form.socialPlatforms.join(', ') || 'Da decidere'}`,`• *Opzioni:* ${form.socialNeeds.join(', ') || 'Da decidere'}`);
    if (hasDesign) messageLines.push('','*DESIGN & GRAFICHE*',`• *Materiali:* ${form.designNeeds.join(', ') || 'Da decidere'}`);
    if (form.musicEvent && form.musicEvent !== 'Non al momento') messageLines.push('','*EVENTO MUSICALE (LABEL)*',`• ${form.musicEvent}`);
    messageLines.push('','━━━━━━━━━━━━━━━━━━━','*PIANIFICAZIONE*');
    if (!isAltro) messageLines.push(`• *Obiettivi:* ${form.goals.join(', ')}`);
    messageLines.push(`• *Tempi desiderati:* ${form.timing || 'Da definire'}`,'',`*STIMA CALCOLATA:* ${currentTotal} €`,'━━━━━━━━━━━━━━━━━━━');
    if (form.notes && form.notes.trim()) messageLines.push('','*NOTE AGGIUNTIVE:*',form.notes.trim());
    const message = messageLines.join('\n');
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };
  const currentFeatureList = featuresByType[form.type] || [];
  return (
    <section className="section quote-section">
      <p className="section-label">La tua proposta</p>
      <div className="section-intro">
        <h2>Costruiamo<br /><em>la tua proposta.</em></h2>
        <p>Il sito è il cuore consigliato. Rispondi alle domande per vedere la stima aggiornarsi. — <Link to="/prezzi" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline' }}>Vedi prezzi chiari →</Link></p>
      </div>
      <form className="quote-form" onSubmit={sendQuote} noValidate>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '12px 16px', background: '#fbfbf9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '16px' }}>
          <span style={{ fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--blue)' }}>A che punto sei</span>
          <span aria-live="polite" style={{ color: missingFields.length ? '#b35a00' : '#0a7a2e', fontWeight: 700 }}>{missingFields.length ? `${missingFields.length} passaggi mancanti` : 'Pronto per la stima — completa il consenso'}</span>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{Math.round(((6 - missingFields.length) / 6) * 100)}%</span>
        </div>
        <div className={missingFields.includes('il nome della tua attività') ? 'form-block pending' : 'form-block'}>
          <p className="form-title">La tua attività <span style={{ color: '#b35a00', fontSize: '12px', fontWeight: 400 }}>* obbligatorio</span> {missingFields.includes('il nome della tua attività') && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
          <label htmlFor="field-name">Come si chiama la tua attività?</label>
          <input id="field-name" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Inserisci il nome dell'attività" aria-required="true" aria-invalid={missingFields.includes('il nome della tua attività')} />
          {missingFields.includes('il nome della tua attività') && <p role="alert" style={{ marginTop: '8px', fontSize: '12px', color: '#b35a00' }}>Inserisci il nome — serve per intestare il preventivo.</p>}
        </div>
        <div className={(!form.type || (isAltro && form.typeOther.trim().length < 2)) ? 'form-block pending' : 'form-block'}>
          <p className="form-title">Che tipo di attività è? {(!form.type || (isAltro && form.typeOther.trim().length < 2)) && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
          <input value={typeSearch} onChange={(e) => setTypeSearch(e.target.value)} placeholder="Cerca la tua attività... (es. pizzeria, barbiere)" style={{ marginBottom: '14px' }} />
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
            <label className="type-other">Che attività fai? Descrivici la tua attività<input required value={form.typeOther} onChange={(e) => update('typeOther', e.target.value)} placeholder="Es. venditori ambulanti, associazione, negozio online..." /></label>
          )}
        </div>
        <div className={(!form.services.length) ? 'form-block pending' : 'form-block'}>
          <p className="form-title">Di cosa hai bisogno? {(!form.services.length) && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
          <p className="form-help">{hasSite ? 'Perfetto — Sito Web incluso (cuore). Aggiungi Social o Design solo se ti servono davvero.' : hasSocial || hasDesign ? 'Hai selezionato Social/Design senza sito: il sito è il cuore consigliato, ma possiamo iniziare anche da brand/social se è la priorità.' : 'Il sito è il cuore del progetto (consigliato). Puoi aggiungere Social/Design subito oppure iniziare anche solo da quelli.'}</p>
          <div className="service-choice-grid">
            <button type="button" className={hasSite ? 'service-choice selected' : 'service-choice'} onClick={() => handleServiceToggle('site')}>
              <span>{hasSite ? '✓' : '+'}</span><b>Sito Web</b><small>Presenza online completa, veloce e visibile su tutti i dispositivi.</small><small style={{ marginTop: '10px', color: 'var(--blue)', fontWeight: '800' }}>Da 350 € <span style={{ fontWeight: 400, fontSize: '11px' }}>finale</span></small>
            </button>
            <button type="button" className={hasSocial ? 'service-choice selected' : 'service-choice'} onClick={() => handleServiceToggle('social')}>
              <span>{hasSocial ? '✓' : '+'}</span><b>Social Media</b><small>Gestione profili, pubblicazioni e grafiche su misura.</small>{!hasSite && hasSocial && <small style={{ marginTop: '10px', color: '#b35a00', fontWeight: '800' }}>Consigliato con Sito Web</small>}
            </button>
            <button type="button" className={hasDesign ? 'service-choice selected' : 'service-choice'} onClick={() => handleServiceToggle('design')}>
              <span>{hasDesign ? '✓' : '+'}</span><b>Design e Grafiche</b><small>Logo, locandine, volantini e materiali coordinati.</small>{!hasSite && hasDesign && <small style={{ marginTop: '10px', color: '#b35a00', fontWeight: '800' }}>Consigliato con Sito Web</small>}
            </button>
          </div>
          <div className="form-escape-block">
            <p className="escape-kicker">Hai dubbi?</p>
            <p>Non sai cosa scegliere?<br /><a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla Studio! Non so bene cosa scegliere per il mio sito, possiamo parlarne direttamente?')}`} target="_blank" rel="noopener noreferrer">Parliamone direttamente su WhatsApp <span>→</span></a></p>
          </div>
        </div>
        {hasSite && form.type && (
          <>
            {!isAltro && (
              <div className="form-block">
                <p className="form-title">Struttura del sito web</p>
                <p className="form-help">Scegli tra una pagina singola fluida (350 € finale) o un sito completo a più pagine (400 € finale). Include responsive, SEO avanzata, cookie banner gratuito e 2 revisioni.</p>
                <div className="choice-grid">
                  {[{ id: 'Pagina singola', label: 'Pagina singola (350 €)' },{ id: 'Sito completo a più pagine', label: 'Sito completo a più pagine (400 €)' }].map((str) => (
                    <button type="button" className={form.structure === str.id ? 'choice selected' : 'choice'} onClick={() => update('structure', str.id)} key={str.id}>{str.label}</button>
                  ))}
                </div>
              </div>
            )}
            <div className="form-block">
              <p className="form-title">Cosa serve per il tuo sito ({form.type})?</p>
              <p className="form-help">Seleziona le funzioni utili per la tua attività.</p>
              <div className="choice-grid">
                {currentFeatureList.map((feat) => (
                  <button type="button" className={form.features.includes(feat.name) ? 'choice selected' : 'choice'} onClick={() => toggle('features', feat.name)} key={feat.name}>{feat.name}</button>
                ))}
              </div>
            </div>
            {!isAltro && (
              <>
                <div className="form-block">
                  <p className="form-title">Pagine e sezioni desiderate</p>
                  <div className="choice-grid">
                    {pageOptions.map((page) => (
                      <button type="button" className={form.pages.includes(page.name) ? 'choice selected' : 'choice'} onClick={() => toggle('pages', page.name)} key={page.name}>{page.name}</button>
                    ))}
                  </div>
                </div>
                <div className={!isAltro && !form.photos ? 'form-block pending' : 'form-block'}>
                  <p className="form-title">Foto e immagini {!isAltro && !form.photos && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
                  <p className="form-help">Le immagini sono fondamentali. Dicci come stai messo: se non ne hai, veniamo noi a scattarle sul posto (+20€ + trasporto se fuori Asti).</p>
                  <div className="choice-grid">
                    {[{ id: 'Ho già le foto', label: 'Ho già le foto (le invio io)' },{ id: 'Servono le foto (le scattate voi)', label: 'Scattate voi sul posto' },{ id: 'Parto da zero', label: 'Non ho niente, usiamo immagini di archivio' }].map((photo) => (
                      <button type="button" className={form.photos === photo.id ? 'choice selected' : 'choice'} onClick={() => update('photos', photo.id)} key={photo.id}>{photo.label}</button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
        {hasSite && hasSocial && (
          <>
            <div className="form-block">
              <p className="form-title">Social Media: su quali canali vuoi puntare?</p>
              <p className="form-help"><strong>Scheda Google My Business inclusa</strong> nel sito — non è un extra. Qui scegli i canali aggiuntivi.</p>
              <div className="choice-grid">
                {socialPlatforms.map((plat) => (
                  <button type="button" className={form.socialPlatforms.includes(plat) ? 'choice selected' : 'choice'} onClick={() => toggle('socialPlatforms', plat)} key={plat}>{plat} (+10 €)</button>
                ))}
              </div>
            </div>
            <div className="form-block">
              <p className="form-title">Di cosa hai bisogno per i tuoi Social?</p>
              <p className="form-help">Contenuti su misura per {form.type}.</p>
              <div className="choice-grid">
                {(socialByType[form.type] || socialNeedsList).map((opt) => (
                  <button type="button" className={form.socialNeeds.includes(opt.name) ? 'choice selected' : 'choice'} onClick={() => toggle('socialNeeds', opt.name)} key={opt.name}>{opt.name} (+{opt.price} €)</button>
                ))}
              </div>
            </div>
          </>
        )}
        {hasSite && hasDesign && (
          <div className="form-block">
            <p className="form-title">Design e Materiali Grafici</p>
            <p className="form-help">Materiali su misura per {form.type}.</p>
            <div className="choice-grid">
              {(designByType[form.type] || designNeedsList).map((des) => (
                <button type="button" className={form.designNeeds.includes(des.name) ? 'choice selected' : 'choice'} onClick={() => toggle('designNeeds', des.name)} key={des.name}>{des.name} (+{des.price} €)</button>
              ))}
            </div>
          </div>
        )}
        <div className="form-block">
          <p className="form-title">Sconto partner Trebla — 20 €</p>
          <p className="form-help">Aggiungi un piccolo banner discreto “Realizzato da Trebla Studio” nel tuo sito e sblocca subito lo sconto partner.</p>
          <button type="button" className={form.bannerDiscount ? 'choice selected' : 'choice'} onClick={() => update('bannerDiscount', !form.bannerDiscount)}>{form.bannerDiscount ? '✓ Sconto partner attivo' : 'Applica sconto partner — 20 €'}</button>
        </div>
        <div className="form-block">
          <p className="form-title">Evento musicale opzionale?</p>
          <p className="form-help">Se ti interessa musica dal vivo per inaugurazione/promo, lo gestiamo tramite Pikete Label. Costo 60€/h singolo — 250€/h tutti e 4. Vedi <Link to="/eventi" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline' }}>dettagli evento →</Link></p>
          <div className="event-options">
            {['Sì, voglio info per evento musicale','Da valutare più avanti','Non al momento'].map((ev) => (
              <button type="button" className={form.musicEvent === ev ? 'event-option selected' : 'event-option'} onClick={() => update('musicEvent', ev)} key={ev}>{ev}</button>
            ))}
          </div>
        </div>
        {!isAltro && (
          <div className="form-block">
            <p className="form-title">Cosa vuoi ottenere principalmente?</p>
            <div className="choice-grid goals">
              {goals.map((goal) => (
                <button type="button" className={form.goals.includes(goal) ? 'choice selected' : 'choice'} onClick={() => toggle('goals', goal)} key={goal}>{goal}</button>
              ))}
            </div>
          </div>
        )}
        <div className="form-block form-split">
          <label>Quando vorresti iniziare?
            <div className="choice-grid compact">
              {['Appena possibile (10 giorni)', 'Entro un mese', 'Sto valutando'].map((time) => (
                <button type="button" className={form.timing === time ? 'choice selected' : 'choice'} onClick={() => update('timing', time)} key={time}>{time}</button>
              ))}
            </div>
          </label>
          <label>Raccontaci qualcosa<textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Dettagli, richieste particolari o cose importanti da sapere (opzionale)" rows="3" /></label>
        </div>
        <div className="form-block" style={{ borderBottom: 'none', paddingBottom: '8px' }}>
          <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontWeight: 400, fontSize: '13px', lineHeight: '1.5', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.privacy} onChange={(e) => update('privacy', e.target.checked)} style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--blue)' }} />
            <span>Ho letto l’<Link to="/privacy" style={{ color: 'var(--blue)', textDecoration: 'underline', fontWeight: 700 }}>informativa privacy</Link> e acconsento al trattamento dei dati per ricevere il preventivo via WhatsApp/Email. I dati non vengono salvati su database ma usati solo per rispondere. *</span>
          </label>
          <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '10px 0 0 28px', lineHeight: '1.5' }}>Tracciamento: nessun analytics proprietario attivo ora.</p>
        </div>
        <div className="estimate">
          <div>
            {estimateRevealed ? (
              <>
                <span>La tua stima — prezzo finale</span><strong>{quoteLabel} <small>stima finale</small></strong>
                <p>La stima è indicativa: il prezzo finale può variare dopo aver parlato insieme. Prezzo finale senza IVA aggiunta (no P.IVA).</p>
                <p>Pronto in 10 giorni* garantiti* · Google inclusa · Cookie banner gratuito · 2 revisioni · *vedi condizioni.</p>
                {(hasSite || hasSocial || hasDesign) && <p className="estimate-note">Acconto 10% per bloccare le tempistiche ({Math.round(currentTotal * 0.1)} € su {currentTotal} €) — resto alla consegna</p>}
              </>
            ) : (
              <>
                <span>Stima finale</span><strong>{canReveal ? 'Sei pronto per la stima' : 'Completa il modulo'}</strong>
                <p>{!form.privacy ? 'Manca il consenso privacy per sbloccare la stima.' : canReveal ? 'Hai risposto a tutto: premi "Mostra la stima" per scoprire il prezzo.' : `Per sbloccare la stima manca ancora: ${missingFields.join(', ')}.`}</p>
              </>
            )}
          </div>
          {estimateRevealed ? (
            <button className="wa-cta" type="submit" disabled={!hasSite && !hasSocial && !hasDesign}><WhatsAppIcon /> Invia stima su WhatsApp</button>
          ) : canReveal ? (
            <button className="wa-cta" type="button" onClick={revealEstimate}>Mostra la stima</button>
          ) : null}
        </div>
      </form>
    </section>
  );
}

function App() {
  const [quickContactOpen, setQuickContactOpen] = useState(false);
  const [quickName, setQuickName] = useState('');
  const sendQuickMessage = (event) => {
    event.preventDefault();
    if (!quickName.trim()) return;
    const message = `Ciao Trebla Studio! La mia attività si chiama: ${quickName.trim()}. Vorrei farla conoscere, parliamone!`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setQuickContactOpen(false);
    setQuickName('');
  };
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout onOpenQuick={() => setQuickContactOpen(true)}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servizi" element={<ServiziPage />} />
          <Route path="/servizi/siti-web" element={<ServizioSitiWebPage />} />
          <Route path="/servizi/social-media" element={<ServizioSocialPage />} />
          <Route path="/servizi/design" element={<ServizioDesignPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/chi-siamo" element={<ChiSiamoPage />} />
          <Route path="/come-lavoriamo" element={<MetodoPage />} />
          <Route path="/prezzi" element={<PrezziPage />} />
          <Route path="/assistenza" element={<AssistenzaPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contatti" element={<ContattiPage />} />
          <Route path="/eventi" element={<EventiPage />} />
          <Route path="/preventivo" element={<PreventivoPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookie" element={<CookiePage />} />
          <Route path="/termini" element={<TerminiPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      {quickContactOpen && (
        <div className="modal-overlay" onClick={() => setQuickContactOpen(false)}>
          <form className="quick-modal" onSubmit={sendQuickMessage} onClick={(e) => e.stopPropagation()}>
            <p className="modal-kicker">Parliamone subito</p>
            <h3>Come si chiama<br />la tua attività?</h3>
            <input autoFocus required value={quickName} onChange={(e) => setQuickName(e.target.value)} placeholder="Es. Trattoria da Mario" />
            <button className="wa-cta modal-wa" type="submit"><WhatsAppIcon /> Scrivici su WhatsApp</button>
            <button type="button" className="modal-close" onClick={() => setQuickContactOpen(false)}>Annulla</button>
          </form>
        </div>
      )}
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);

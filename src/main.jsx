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
    a: "L'acconto fa parte del prezzo finale e serve a confermare l'avvio. Il resto alla consegna. Dettagli su tempi e modalità vengono concordati prima di iniziare.",
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
  useEffect(() => {
    document.title = title;
    window.scrollTo(0,0);
    const canonicalHref = `https://treblastudio.vercel.app${window.location.pathname}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute('href', canonicalHref);
    else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalHref);
      document.head.appendChild(link);
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      if (title.includes('Servizi') && title.includes('Siti Web')) metaDesc.setAttribute('content', 'Siti web chiari e curati per piccole attività: layout responsive, contatti diretti, mappa e visibilità. Da 350 € finale.');
      else if (title.includes('Portfolio')) metaDesc.setAttribute('content', 'Portfolio Trebla Studio: progetto Pikete Label pubblicato ad Asti/Alessandrino. Design, sviluppo e gestione.');
      else if (title.includes('Chi siamo')) metaDesc.setAttribute('content', 'Trebla Studio ad Asti: incontro tra sviluppo, design e comunicazione per piccole imprese.');
      else if (title.includes('Prezzi')) metaDesc.setAttribute('content', 'Prezzi chiari Trebla Studio: parti da 350 €, dettaglio incluso, tempi concordati, nessun canone obbligatorio.');
      else if (title.includes('Contatti')) metaDesc.setAttribute('content', 'Contatti Trebla Studio ad Asti: WhatsApp ed email, area Asti e Piemonte, su appuntamento.');
    }
  }, [title]);
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
      <nav id="main-nav" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navigazione principale">
        <Link to="/servizi" onClick={() => setMenuOpen(false)}>Servizi</Link>
        <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Lavori</Link>
        <Link to="/chi-siamo" onClick={() => setMenuOpen(false)}>Chi siamo</Link>
        <Link to="/come-lavoriamo" onClick={() => setMenuOpen(false)}>Metodo</Link>
        <Link to="/prezzi" onClick={() => setMenuOpen(false)}>Prezzi</Link>
        <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
        <Link to="/contatti" onClick={() => setMenuOpen(false)}>Contatti</Link>
        <Link className="nav-mobile-cta" to="/preventivo" onClick={() => setMenuOpen(false)}>Configura il preventivo</Link>
      </nav>
      <button type="button" className="header-cta" onClick={onOpenQuick} aria-label="Scrivici su WhatsApp">Scrivici su WhatsApp</button>
      <button className={menuOpen ? 'menu menu-active' : 'menu'} aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu — 7 voci'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
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
          <p style={{ marginTop: '8px', lineHeight: '1.6' }}>Studio indipendente ad Asti.<br />Siti web per piccole attività in Piemonte.</p>
          <a href={`mailto:${email}`} style={{ display: 'inline-block', marginTop: '12px', color: '#fff', fontWeight: 800, fontSize: '14px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{email}</a>
        </div>
        <nav aria-label="Navigazione footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <strong style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8ea8b3', marginBottom: '4px' }}>Esplora</strong>
          <Link to="/servizi" style={{ color: '#d8e3e7', fontSize: '14px' }}>Servizi</Link>
          <Link to="/portfolio" style={{ color: '#d8e3e7', fontSize: '14px' }}>Lavori</Link>
          <Link to="/come-lavoriamo" style={{ color: '#d8e3e7', fontSize: '14px' }}>Metodo</Link>
          <Link to="/prezzi" style={{ color: '#d8e3e7', fontSize: '14px' }}>Prezzi</Link>
          <Link to="/faq" style={{ color: '#d8e3e7', fontSize: '14px' }}>FAQ</Link>
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <strong style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8ea8b3', marginBottom: '4px' }}>Contatti</strong>
          <Link to="/contatti" style={{ color: '#d8e3e7', fontSize: '14px' }}>Contatti</Link>
          <a href={`https://wa.me/${whatsapp}`} style={{ color: '#d8e3e7', fontSize: '14px' }}>Scrivici su WhatsApp</a>
          <Link to="/privacy" style={{ color: '#d8e3e7', fontSize: '14px' }}>Privacy</Link>
          <Link to="/cookie" style={{ color: '#d8e3e7', fontSize: '14px' }}>Cookie</Link>
          <Link to="/termini" style={{ color: '#d8e3e7', fontSize: '14px' }}>Termini</Link>
        </div>
      </div>
      <small style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', lineHeight: '1.6' }}>© 2026 Trebla Studio · Asti, Piemonte</small>
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
          <p style={{ maxWidth: '380px' }}>Realizziamo siti web chiari e curati per piccole attività di Asti e Piemonte. Per farti ricevere richieste, prenotazioni e contatti.</p>
          <div className="hero-actions">
            <Link className="button button-main" to="/preventivo">Configura il preventivo</Link>
            <Link className="button button-quiet" to="/servizi" style={{ fontWeight: 600 }}>Scopri i servizi</Link>
          </div>
          <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>Prezzo indicato prima di iniziare.</p>
        </div>
        <div className="hero-card">
          <span className="card-kicker">Trebla Studio — Asti</span>
          <strong>Un percorso semplice,<br /><em>dal primo messaggio al sito online.</em></strong>
        </div>
      </section>

      <section className="audience">
        <p>Per ristoranti, B&amp;B, negozi, saloni, artigiani e professionisti.</p>
      </section>

      <section className="section">
        <p className="section-label">Servizi</p>
        <div className="section-intro">
          <h2>Il digitale,<br /><em>fatto semplice.</em></h2>
          <div>
            <p>Sito web, social e design: scegli da dove iniziare.</p>
          </div>
        </div>
        <div className="service-grid">
          <Link to="/servizi/siti-web" className="service-card service-main" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>01</span><h3>Sito web</h3><p>Una presenza chiara e curata per trasformare chi ti cerca in cliente.</p>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: struttura responsive, contatti diretti, mappa.</p>
            <span style={{ marginTop: '16px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px', paddingBottom: '4px' }}>Dettagli sito web →</span>
          </Link>
          <Link to="/servizi/social-media" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>02</span><h3>Social media</h3><p>Contenuti e gestione per una presenza attiva e coerente ogni settimana.</p>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: piano editoriale, grafiche, reel.</p>
            <p style={{ marginTop: '8px', fontSize: '11px', color: '#2d6685', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Acquistabile anche senza sito</p>
            <span style={{ marginTop: '16px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px', paddingBottom: '4px' }}>Dettagli social →</span>
          </Link>
          <Link to="/servizi/design" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>03</span><h3>Design e grafiche</h3><p>Logo e materiali coordinati per un’immagine riconoscibile.</p>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: logo, biglietti, volantini.</p>
            <p style={{ marginTop: '8px', fontSize: '11px', color: '#2d6685', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Acquistabile anche senza sito</p>
            <span style={{ marginTop: '16px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px', paddingBottom: '4px' }}>Dettagli design →</span>
          </Link>
        </div>
      </section>

      <section className="section portfolio-section">
        <p className="section-label">Un esempio concreto</p>
        <div className="section-intro">
          <h2>Lo abbiamo<br /><em>già fatto.</em></h2>
          <p>Un progetto pubblicato, curato in ogni dettaglio.</p>
        </div>
        <Link className="portfolio-feature" to="/portfolio">
          <div>
            <span className="portfolio-kicker">Pikete Label — Etichetta musicale</span>
            <strong>Pikete Label</strong>
            <span className="portfolio-sub">Asti / Alessandrino · Sito vetrina + catalogo artisti</span>
            <p style={{ marginTop: '8px' }}>Sito vetrina responsive per etichetta musicale: design, sviluppo e gestione.</p>
            <span className="portfolio-cta"><span>Vedi il caso studio →</span></span>
          </div>
        </Link>
      </section>

      <section className="section price-section">
        <p className="section-label">Prezzi chiari</p>
        <div className="price-grid">
          <div>
            <h2>Una proposta<br /><em>alla tua portata.</em></h2>
            <p>Parti da 350 €. Prima di iniziare sai cosa è incluso.</p>
            <Link className="button button-light" to="/preventivo">Configura il preventivo</Link>
            <Link className="button button-quiet" to="/prezzi" style={{ marginLeft: '10px', background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>Vedi i prezzi</Link>
          </div>
          <ul>
            <li><b>Prezzo chiaro</b><span>Con dettaglio di cosa è incluso.</span></li>
            <li><b>Tempi concordati</b><span>Consegna definita dopo i materiali.</span></li>
            <li><b>Nessun canone Trebla obbligatorio</b><span>Il sito è tuo.</span></li>
          </ul>
        </div>
      </section>

      <section id="preventivo-home" className="section quote-section" style={{ background: '#fbfbf9', borderTop: '1px solid var(--line)' }}>
        <p className="section-label">Preventivo</p>
        <div className="section-intro">
          <h2>Configura<br /><em>il preventivo.</em></h2>
          <p>Rispondi a poche domande per ricevere una stima — oppure <a href="/preventivo" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline' }}>vai alla pagina dedicata →</a></p>
        </div>
        <p style={{ marginTop: '12px', fontSize: '13px' }}><a href="/preventivo" className="button button-main" style={{ display: 'inline-flex' }}>Apri configuratore completo →</a></p>
      </section>

      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
        <p className="section-label">Prossimo passo</p>
        <div className="section-intro">
          <h2>Pronto a<br /><em>iniziare?</em></h2>
          <p>Raccontaci di cosa hai bisogno: ti indichiamo il punto di partenza più adatto.</p>
        </div>
        <div className="final-cta" style={{ marginTop: '22px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link className="button button-main" to="/preventivo">Configura il preventivo</Link>
          <a className="button button-quiet" href={`https://wa.me/${whatsapp}`} style={{ background: '#fff', border: '1px solid var(--line)' }}>Scrivici su WhatsApp</a>
          <Link to="/contatti" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', textDecoration: 'underline', padding: '10px' }}>Tutti i contatti</Link>
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
        <p>Tre servizi modulari: scegli da dove iniziare.</p>
      </div>
      <div className="service-grid" style={{ marginTop: '32px' }}>
        <Link to="/servizi/siti-web" className="service-card service-main" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>01</span><h3>Sito web</h3><p>Una presenza chiara e curata per farti trovare e ricevere richieste.</p>
          <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: struttura responsive, contatti diretti, mappa.</p>
          <span style={{ marginTop: '12px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Dettagli →</span>
        </Link>
        <Link to="/servizi/social-media" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>02</span><h3>Social media</h3><p>Piano editoriale, grafiche e reel per canali più coerenti.</p>
          <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: piano editoriale, grafiche, reel.</p>
          <span style={{ marginTop: '12px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Dettagli →</span>
        </Link>
        <Link to="/servizi/design" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>03</span><h3>Design e grafiche</h3><p>Logo e materiali coordinati per un’immagine riconoscibile.</p>
          <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: logo, biglietti, volantini.</p>
          <span style={{ marginTop: '12px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Dettagli →</span>
        </Link>
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
        <p>Da 350 € finale (pagina singola) o 400 € multi-pagina.</p>
      </div>
      <div className="siti-grid" style={{ marginTop: '24px', gap: '18px', fontSize: '13px', lineHeight: '1.6' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Progettazione</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Layout responsive, testi realizzati con il cliente, struttura delle pagine.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Contatti</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>WhatsApp, email, form, mappa, orari e prenotazioni quando previste.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Visibilità</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Title, meta description, heading, alt text, sitemap e configurazioni concordate.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Consegna</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Pubblicazione, indicazioni su dominio/hosting e proprietà del sito.</p>
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
        <p>Pianifichiamo contenuti, grafiche e reel brevi per rendere i tuoi canali più coerenti. Puoi iniziare dai social o integrarli al sito.</p>
      </div>
      <p style={{ marginTop: '18px', color: 'var(--muted)', maxWidth: '620px' }}>Canali su misura per la tua attività, con approvazione rapida via WhatsApp.</p>
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
        <p>Logo, biglietti, volantini e grafiche coordinate per un’immagine coerente.</p>
      </div>
      <p style={{ marginTop: '18px', color: 'var(--muted)', maxWidth: '620px' }}>Materiali pronti per stampa e web, coordinati con il tuo stile.</p>
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
        <p>Un progetto pubblicato, curato in ogni dettaglio.</p>
      </div>
      <a className="portfolio-feature" href="https://piketelabel.vercel.app" target="_blank" rel="noopener noreferrer">
        <span className="portfolio-kicker">Pikete Label — Etichetta musicale</span>
        <strong>Pikete Label</strong>
        <span className="portfolio-sub">Asti / Alessandrino · Sito vetrina + catalogo artisti</span>
        <p style={{ marginTop: '8px' }}>Design, sviluppo e gestione del sito vetrina responsive.</p>
        <span className="portfolio-cta"><span>Visita il sito →</span></span>
      </a>
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
        <p>Trebla Studio nasce ad Asti dall’incontro tra sviluppo, design e comunicazione.</p>
      </div>
      <div className="team-grid">
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
          <strong style={{ fontSize: '14px' }}>Albert Simoni — Sviluppo</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>HTML, CSS, TypeScript, React, Vercel. Gestisce progetto, codice e pubblicazione.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
          <strong style={{ fontSize: '14px' }}>Gabriel Santospirito — Design &amp; SMM</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>Grafiche, identità, contenuti social.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
          <strong style={{ fontSize: '14px' }}>Dove operiamo</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>Asti — su appuntamento.<br />Area: Asti e Piemonte.</p>
        </div>
      </div>
      <div style={{ marginTop: '22px' }}><a className="button button-main" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">Scrivici su WhatsApp →</a></div>
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
        <article><span>01</span><h3>Brief su WhatsApp</h3><p>Ci racconti attività, obiettivi e stile.</p></article>
        <article><span>02</span><h3>Materiali</h3><p>Raccogliamo testi, foto e logo.</p></article>
        <article><span>03</span><h3>Design</h3><p>Progettiamo layout e contenuti.</p></article>
        <article><span>04</span><h3>Revisioni</h3><p>Due giri di correzioni inclusi.</p></article>
        <article><span>05</span><h3>Approvazione</h3><p>Confermi tutto prima di pubblicare.</p></article>
        <article><span>06</span><h3>Pubblicazione</h3><p>Mettiamo online su Vercel e ti mostriamo come aggiornare.</p></article>
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
          <p>Parli direttamente con chi costruisce il tuo sito. Prezzo indicato prima di iniziare.</p>
          <Link className="button button-light" to="/preventivo">Configura il preventivo</Link>
        </div>
        <ul>
          <li><b>Prezzo chiaro</b><span>Con dettaglio di cosa è incluso.</span></li>
          <li><b>Tempi concordati</b><span>Definiti dopo i materiali.</span></li>
          <li><b>Nessun canone Trebla obbligatorio</b><span>Il sito è tuo.</span></li>
        </ul>
      </div>
      <div className="prezzi-detail-grid" style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: '24px', gap: '24px', fontSize: '13px', lineHeight: '1.6' }}>
        <div>
          <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Cosa include “da 350 €”</strong>
          <span style={{ color: '#d5e4e9' }}>• 1 pagina singola fluida (o multi-pagina da 400 €)<br />• Design responsive, testi con il cliente<br />• Contatti diretti, mappa<br />• Proprietà del sito</span>
        </div>
        <div>
          <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Extra a scelta</strong>
          <span style={{ color: '#d5e4e9' }}>• Pagine aggiuntive<br />• Funzioni per settore<br />• Social e design su richiesta<br />• Foto sul posto su richiesta</span>
        </div>
        <div>
          <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Condizioni principali</strong>
          <span style={{ color: '#d5e4e9' }}>• Due revisioni incluse<br />• Sito pubblicato su Vercel<br />• Dettagli su dominio e assistenza su richiesta</span>
        </div>
      </div>
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
      <div className="assistenza-grid" style={{ marginTop: '24px', gap: '18px', fontSize: '13px', lineHeight: '1.6' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Revisioni e correzioni</strong>
          <span style={{ color: 'var(--muted)' }}>• 2 revisioni incluse<br />• Bug valutati come tali<br />• Modifiche future su richiesta</span>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Dominio, hosting, proprietà</strong>
          <span style={{ color: 'var(--muted)' }}>• Dominio intestato a te<br />• Hosting Vercel<br />• Proprietà codice e contenuti tua</span>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Manutenzione facoltativa</strong>
          <span style={{ color: 'var(--muted)' }}>• Aggiornamenti su richiesta<br />• Backup su richiesta<br />• Richiesta via WhatsApp o email</span>
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
      <div className="contacts-grid">
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '20px' }}>
          <strong style={{ display: 'block', marginBottom: '12px' }}>Contatti diretti</strong>
          <p style={{ margin: '0 0 8px', fontSize: '14px' }}><strong>WhatsApp:</strong> <a href={`https://wa.me/${whatsapp}`} style={{ color: 'var(--blue)', textDecoration: 'underline' }}>+39 351 892 4471</a></p>
          <p style={{ margin: '0 0 8px', fontSize: '14px' }}><strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: 'var(--blue)', textDecoration: 'underline' }}>{email}</a></p>
          <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--muted)' }}><strong>Area:</strong> Asti e Piemonte</p>
          <p style={{ margin: '0', fontSize: '14px', color: 'var(--muted)' }}><strong>Sede:</strong> Asti — su appuntamento</p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla Studio! Vorrei prenotare una chiamata per il mio sito.')}`} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--blue)', color: '#fff', borderRadius: '999px', padding: '10px 16px', fontWeight: 800, fontSize: '13px' }}>Prenota su WhatsApp →</a>
            <a href={`mailto:${email}`} style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '10px 16px', fontWeight: 800, fontSize: '13px' }}>Scrivi via Email</a>
          </div>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '20px', background: '#fbfbf9' }}>
          <strong style={{ display: 'block', marginBottom: '12px' }}>Come raggiungerci</strong>
          <p style={{ margin: '0', fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>Scrivici su WhatsApp o via email per fissare un appuntamento. Rispondiamo ai messaggi entro la giornata.</p>
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
      <div className="eventi-grid" style={{ marginTop: '24px', gap: '18px' }}>
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
      <p className="section-label">Privacy</p>
      <h1>Privacy Policy</h1>
      <p style={{ marginTop: '18px', fontSize: '14px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '720px' }}>
        Titolare: Albert Simoni — {email}. I dati inseriti nel configuratore vengono utilizzati esclusivamente per rispondere alla richiesta di preventivo via WhatsApp o email e non vengono salvati in database proprietari. Per esercitare i diritti, scrivi a {email}.
      </p>
    </section>
  );
}
function CookiePage() {
  usePageTitle('Trebla Studio — Cookie');
  return (
    <section className="section">
      <p className="section-label">Cookie</p>
      <h1>Cookie Policy</h1>
      <p style={{ marginTop: '18px', fontSize: '14px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '720px' }}>Utilizziamo solo cookie tecnici necessari al funzionamento del sito e font Google. Nessun cookie di profilazione.</p>
    </section>
  );
}
function TerminiPage() {
  usePageTitle('Trebla Studio — Termini');
  return (
    <section className="section">
      <p className="section-label">Termini</p>
      <h1>Termini di<br /><em>servizio.</em></h1>
      <p style={{ marginTop: '18px', fontSize: '14px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '720px' }}>
        Le proposte includono due revisioni. La proprietà del sito viene trasferita alla consegna. Dettagli su tempi, costi e modalità di pagamento vengono concordati prima di iniziare.
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
  const nomeOk = form.name.trim().length >= 2;
  const tipoOk = !!form.type && (!isAltro || form.typeOther.trim().length >= 2);
  const serviziOk = hasSite || hasSocial || hasDesign;
  const strutturaOk = !hasSite || isAltro || !!form.structure;
  const fotoOk = !hasSite || isAltro || !!form.photos;
  const socialOk = !hasSocial || (form.socialPlatforms.length > 0 && form.socialNeeds.length > 0);
  const designOk = !hasDesign || form.designNeeds.length > 0;
  const obiettiviOk = isAltro || form.goals.length > 0;
  const timingOk = !!form.timing;
  const missingFields = [];
  if (!nomeOk) missingFields.push('il nome della tua attività');
  if (!tipoOk) missingFields.push('il tipo di attività');
  if (!serviziOk) missingFields.push('un servizio (Sito, Social o Design)');
  if (hasSite && !isAltro && !strutturaOk) missingFields.push('la struttura del sito');
  if (hasSite && !isAltro && !fotoOk) missingFields.push('le foto');
  if (hasSocial && !socialOk) missingFields.push('le scelte Social Media');
  if (hasDesign && !designOk) missingFields.push('i materiali grafici');
  if (!isAltro && !obiettiviOk) missingFields.push('un obiettivo');
  if (!timingOk) missingFields.push('i tempi desiderati');
  const privacyOk = form.privacy;
  const canReveal = missingFields.length === 0 && privacyOk;
  const stepLabel = !nomeOk || !tipoOk ? 'Passo 1 di 4 — attività' : !serviziOk ? 'Passo 2 di 4 — servizi' : (!obiettiviOk || !timingOk) ? 'Passo 3 di 4 — obiettivi e tempi' : !privacyOk ? 'Passo 4 di 4 — privacy' : 'Pronto per la stima';
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
    messageLines.push('','━━━━━━━━━━━━━━━━━━━','*PIANIFICAZIONE*');
    if (!isAltro) messageLines.push(`• *Obiettivi:* ${form.goals.join(', ')}`);
    messageLines.push(`• *Tempi desiderati:* ${form.timing || 'Da definire'}`,'',`*STIMA CALCOLATA:* ${currentTotal} €`,'━━━━━━━━━━━━━━━━━━━');
    if (form.notes && form.notes.trim()) messageLines.push('','*NOTE AGGIUNTIVE:*',form.notes.trim());
    if (form.bannerDiscount) messageLines.push('','*Sconto partner richiesto*');
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
        <p>Rispondi a poche domande per ricevere una stima. <Link to="/prezzi" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline', fontSize: '13px' }}>Vedi prezzi chiari</Link></p>
      </div>
      <p style={{ marginTop: '10px', fontSize: '12px' }}><a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla Studio! Ho un dubbio sul preventivo, possiamo parlarne?')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline', fontWeight: 700 }}>Hai un dubbio? Scrivici →</a></p>
      <form className="quote-form" onSubmit={sendQuote} noValidate>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '12px 16px', background: '#fbfbf9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '16px', gap: '12px' }}>
          <span style={{ fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--blue)' }}>{stepLabel}</span>
          <span aria-live="polite" style={{ color: missingFields.length ? '#b35a00' : '#0a7a2e', fontWeight: 700, whiteSpace: 'nowrap' }}>{missingFields.length ? `${missingFields.length} da completare` : 'Pronto'}</span>
        </div>
        <div className={nomeOk ? 'form-block' : 'form-block pending'}>
          <label htmlFor="field-name" className="form-title" style={{ fontSize: '16px' }}>Nome della tua attività <span style={{ color: '#b35a00', fontSize: '12px', fontWeight: 400 }}>*</span> {!nomeOk && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</label>
          <input id="field-name" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Es. Pasticceria Rossi" aria-required="true" aria-invalid={!nomeOk} />
          {!nomeOk && <p role="alert" style={{ marginTop: '8px', fontSize: '12px', color: '#b35a00' }}>Inserisci il nome — serve per intestare il preventivo.</p>}
        </div>
        <div className={tipoOk ? 'form-block' : 'form-block pending'}>
          <p className="form-title">Che tipo di attività è? {!tipoOk && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
          <input value={typeSearch} onChange={(e) => setTypeSearch(e.target.value)} placeholder="Cerca la tua attività... (es. pizzeria, barbiere)" style={{ marginBottom: '14px' }} aria-label="Cerca tipo attività" />
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
              <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--muted)' }}>Non trovi la tua attività? Scegli Altro.</p>
            </>
          )}
          {form.type === 'Altro' && (
            <label className="type-other">Che attività fai? Descrivici la tua attività<input required value={form.typeOther} onChange={(e) => update('typeOther', e.target.value)} placeholder="Es. venditori ambulanti, associazione..." /></label>
          )}
        </div>
        <div className={serviziOk ? 'form-block' : 'form-block pending'}>
          <p className="form-title">Di cosa hai bisogno? {!serviziOk && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
          <p className="form-help">Seleziona il servizio che ti serve ora. Puoi combinarne più di uno.</p>
          <div className="service-choice-grid">
            <button type="button" className={hasSite ? 'service-choice selected' : 'service-choice'} onClick={() => handleServiceToggle('site')} aria-pressed={hasSite}>
              <span>{hasSite ? '✓' : '+'}</span><b>Sito Web</b><small>Presenza online completa e veloce su tutti i dispositivi.</small><small style={{ marginTop: '10px', color: hasSite ? '#c7d6dc' : 'var(--blue)', fontWeight: '800' }}>Da 350 € finale</small>
            </button>
            <button type="button" className={hasSocial ? 'service-choice selected' : 'service-choice'} onClick={() => handleServiceToggle('social')} aria-pressed={hasSocial}>
              <span>{hasSocial ? '✓' : '+'}</span><b>Social Media</b><small>Gestione profili, pubblicazioni e grafiche su misura.</small>
            </button>
            <button type="button" className={hasDesign ? 'service-choice selected' : 'service-choice'} onClick={() => handleServiceToggle('design')} aria-pressed={hasDesign}>
              <span>{hasDesign ? '✓' : '+'}</span><b>Design e Grafiche</b><small>Logo, locandine, volantini e materiali coordinati.</small>
            </button>
          </div>
        </div>
        {hasSite && form.type && (
          <>
            {!isAltro && (
              <div className="form-block">
                <p className="form-title">Struttura del sito web</p>
                <p className="form-help">Scegli tra una pagina singola fluida o un sito completo a più pagine.</p>
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
                <div className={!fotoOk ? 'form-block pending' : 'form-block'}>
                  <p className="form-title">Foto e immagini {!fotoOk && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
                  <p className="form-help">Se non ne hai, possiamo venire a scattarle sul posto.</p>
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
        {hasSocial && (
          <>
            <div className="form-block">
              <p className="form-title">Social Media: su quali canali vuoi puntare?</p>
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
        {hasDesign && (
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
        {!isAltro && (
          <div className="form-block">
            <p className="form-title">Cosa vuoi ottenere principalmente?</p>
            <p className="form-help">Puoi scegliere più di un obiettivo.</p>
            <div className="choice-grid goals">
              {goals.map((goal) => (
                <button type="button" className={form.goals.includes(goal) ? 'choice selected' : 'choice'} onClick={() => toggle('goals', goal)} key={goal} aria-pressed={form.goals.includes(goal)}>{goal}</button>
              ))}
            </div>
          </div>
        )}
        <div className="form-block">
          <label htmlFor="field-timing" className="form-title" style={{ fontSize: '16px', marginBottom: '12px', display: 'block' }}>Quando vorresti iniziare?</label>
          <div className="choice-grid compact">
            {['Appena possibile', 'Entro un mese', 'Sto valutando'].map((time) => (
              <button type="button" id={time === 'Appena possibile' ? 'field-timing' : undefined} className={form.timing === time ? 'choice selected' : 'choice'} onClick={() => update('timing', time)} key={time} aria-pressed={form.timing === time}>{time}</button>
            ))}
          </div>
        </div>
        <div className="form-block">
          <label htmlFor="field-notes" className="form-title" style={{ fontSize: '16px', marginBottom: '6px', display: 'block' }}>Note per il progetto</label>
          <p className="form-help" style={{ marginBottom: '10px' }}>Facoltativo: funzioni, colori, esempi o esigenze da sapere.</p>
          <textarea id="field-notes" value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Es. vorrei un sito con prenotazioni e colori chiari..." rows="4" style={{ width: '100%', border: '1px solid var(--line)', borderRadius: '8px', padding: '12px', font: '14px var(--sans)', background: '#fff', minHeight: '96px', resize: 'vertical' }} />
        </div>
        <div className="form-block" style={{ borderBottom: 'none', paddingBottom: '8px' }}>
          <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontWeight: 400, fontSize: '13px', lineHeight: '1.5', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.privacy} onChange={(e) => update('privacy', e.target.checked)} style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--blue)' }} required aria-required="true" />
            <span>Ho letto l’<Link to="/privacy" style={{ color: 'var(--blue)', textDecoration: 'underline', fontWeight: 700 }}>informativa privacy</Link> e acconsento al trattamento dei dati per ricevere il preventivo. *</span>
          </label>
        </div>
        <div className="estimate">
          <div>
            {estimateRevealed ? (
              <>
                <span>La tua stima</span><strong>{quoteLabel} <small>stima</small></strong>
                <p>Stima indicativa. Il prezzo finale viene concordato insieme.</p>
                {(hasSite || hasSocial || hasDesign) && <p className="estimate-note">Stima: {currentTotal} €</p>}
              </>
            ) : (
              <>
                <span>Stima finale</span><strong>{canReveal ? 'Pronto per la stima' : 'Completa il modulo'}</strong>
                <p>{!privacyOk ? 'Manca il consenso privacy per sbloccare la stima.' : canReveal ? 'Hai risposto a tutto: premi "Mostra la stima".' : `Per sbloccare la stima manca ancora: ${missingFields.join(', ')}.`}</p>
              </>
            )}
          </div>
          {estimateRevealed ? (
            <button className="wa-cta" type="submit" disabled={!hasSite && !hasSocial && !hasDesign}><WhatsAppIcon /> Invia su WhatsApp</button>
          ) : canReveal ? (
            <button className="wa-cta" type="button" onClick={revealEstimate}>Mostra la stima</button>
          ) : null}
        </div>
        {estimateRevealed && (
          <div style={{ marginTop: '14px', border: '1px solid var(--line)', borderRadius: '8px', padding: '14px', background: '#fbfbf9', fontSize: '13px', lineHeight: '1.5' }}>
            <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', fontWeight: 600 }}>
              <input type="checkbox" checked={form.bannerDiscount} onChange={(e) => update('bannerDiscount', e.target.checked)} style={{ accentColor: 'var(--blue)' }} />
              Vuoi applicare lo sconto partner? Scopri come funziona: aggiungi un banner discreto “Realizzato da Trebla Studio” (−20 €).
            </label>
          </div>
        )}
        {submitted && (
          <div style={{ marginTop: '14px', border: '1px solid var(--line)', borderRadius: '8px', padding: '14px', background: '#fff', fontSize: '13px' }}>
            <strong>Grazie — richiesta inviata su WhatsApp.</strong>
            <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Ti interessa anche un evento di inaugurazione con musica dal vivo? <Link to="/eventi" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline' }}>Vedi Eventi →</Link></p>
          </div>
        )}
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

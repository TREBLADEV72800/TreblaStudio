'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import WhatsAppIcon from './WhatsAppIcon';

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
    { name: 'Orari e stagione, incluso', price: 0 },
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
    { name: 'Contatti e orari, incluso', price: 0 },
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
    { name: 'Orari di apertura e mappa, incluso', price: 0 },
    { name: 'Storia del locale e filosofia in cucina', price: 10 },
    { name: 'Sezione eventi e serate speciali', price: 10 },
  ],
  'Rosticceria o asporto': [
    { name: 'Menu del giorno sempre aggiornato', price: 0 },
    { name: 'Ordini da asporto su WhatsApp', price: 15 },
    { name: 'Vetrina specialità e piatti tipici', price: 10 },
    { name: 'Promozioni e offerte del giorno', price: 10 },
    { name: 'Orari di apertura e mappa, incluso', price: 0 },
  ],
  'Hotel o B&B': [
    { name: 'Modulo richiesta disponibilità camere', price: 20 },
    { name: 'Schede camere con foto e servizi inclusi', price: 15 },
    { name: 'Listino prezzi e offerte stagionali', price: 10 },
    { name: 'Guida al territorio e cosa visitare', price: 15 },
    { name: 'Orari e mappa, incluso', price: 0 },
  ],
  'Salone di bellezza o parrucchiere': [
    { name: 'Listino trattamenti e prezzi', price: 15 },
    { name: 'Prenotazione appuntamenti rapida', price: 15 },
    { name: 'Galleria lavori (prima e dopo)', price: 15 },
    { name: 'Presentazione del personale e qualifiche', price: 10 },
    { name: 'Offerte e pacchetti speciali', price: 10 },
    { name: 'Orari e mappa, incluso', price: 0 },
  ],
  'Negozio o bottega': [
    { name: 'Vetrina e catalogo dei prodotti', price: 20 },
    { name: 'Ordini veloci su WhatsApp e ritiro in negozio', price: 15 },
    { name: 'Sezione novità del mese e promozioni', price: 10 },
    { name: 'Orari di apertura e mappa, incluso', price: 0 },
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

function PreventivoPage() {
  const [typeSearch, setTypeSearch] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const [estimateRevealed, setEstimateRevealed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const revealTime = useRef(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const searchParams = useSearchParams();
  useEffect(() => {
    const svc = searchParams.get('services') || searchParams.get('service');
    if (svc) {
      const list = svc.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const mapped = list.map(s => {
        if (s === 'site' || s === 'sito' || s === 'siti-web' || s === 'sito-web' || s === 'siti') return 'site';
        if (s === 'social' || s === 'social-media' || s === 'sm') return 'social';
        if (s === 'design' || s === 'grafiche' || s === 'grafica') return 'design';
        return s;
      }).filter(s => ['site','social','design'].includes(s));
      if (mapped.length) setForm(c => ({ ...c, services: mapped }));
    }
  }, [searchParams]);
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
  const quoteLabel = (hasSite || hasSocial || hasDesign) ? `€ ${currentTotal}` : 'Seleziona un servizio';
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
  const stepLabel = !nomeOk || !tipoOk ? 'Passo 1 di 4, attività' : !serviziOk ? 'Passo 2 di 4, servizi' : (!obiettiviOk || !timingOk) ? 'Passo 3 di 4, obiettivi e tempi' : !privacyOk ? 'Passo 4 di 4, privacy' : 'Pronto per la stima';
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
    messageLines.push(`• *Tempi desiderati:* ${form.timing || 'Da definire'}`,'',`*TOTALE INDICATIVO:* ${currentTotal} €`,'━━━━━━━━━━━━━━━━━━━');
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
        <p>Rispondi a poche domande per ricevere il tuo preventivo. <Link to="/prezzi" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline', fontSize: '13px' }}>Vedi prezzi chiari</Link></p>
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
          {!nomeOk && <p role="alert" style={{ marginTop: '8px', fontSize: '12px', color: '#b35a00' }}>Inserisci il nome, serve per intestare il preventivo.</p>}
        </div>
        <div className={tipoOk ? 'form-block' : 'form-block pending'}>
          <p className="form-title">Che tipo di attività è? {!tipoOk && <svg className="pending-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>}</p>
          <input value={typeSearch} onChange={(e) => setTypeSearch(e.target.value)} placeholder="Cerca la tua attività... (es. pizzeria, barbiere)" style={{ marginBottom: '14px' }} aria-label="Cerca tipo attività" />
          {typeSearch.trim() ? (
            <div className="choice-grid">
              {businessTypes.filter(t => t.toLowerCase().includes(typeSearch.toLowerCase())).map((type) => (
                <button type="button" className={form.type === type ? 'choice selected' : 'choice'} onClick={() => handleTypeChange(type)} key={type}>{type === 'Professionista' ? <><span style={{ fontWeight: 700 }}>Professionista</span><span style={{ fontWeight: 400, marginLeft: 6, color: 'var(--muted)' }}>, geometra, commercialista...</span></> : type}</button>
              ))}
              {businessTypes.filter(t => t.toLowerCase().includes(typeSearch.toLowerCase())).length === 0 && <p className="form-help">Nessun risultato, seleziona Altro.</p>}
            </div>
          ) : (
            <>
              {Object.entries(businessCategories).map(([cat, types]) => (
                <details key={cat} open={openCategory === cat} onToggle={(e) => setOpenCategory(e.target.open ? cat : null)} style={{ borderBottom: '1px solid var(--line)', padding: '10px 0' }}>
                  <summary style={{ cursor: 'pointer', font: '700 13px var(--mono)', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink)' }}>{cat}, {types.length}</summary>
                  <div className="choice-grid" style={{ marginTop: '10px' }}>
                    {types.map((type) => (
                      <button type="button" className={form.type === type ? 'choice selected' : 'choice'} onClick={() => handleTypeChange(type)} key={type}>{type === 'Professionista' ? <><span style={{ fontWeight: 700 }}>Professionista</span><span style={{ fontWeight: 400, marginLeft: 6, color: 'var(--muted)' }}>, geometra, commercialista...</span></> : type}</button>
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
              <span>{hasSite ? '✓' : '+'}</span><b>Sito Web</b><small>Presenza online completa e veloce su tutti i dispositivi.</small>
            </button>
            <button type="button" className={hasSocial ? 'service-choice selected' : 'service-choice'} onClick={() => handleServiceToggle('social')} aria-pressed={hasSocial}>
              <span>{hasSocial ? '✓' : '+'}</span><b>Social Media</b><small>Gestione profili, pubblicazioni e grafiche su misura.</small>
            </button>
            <button type="button" className={hasDesign ? 'service-choice selected' : 'service-choice'} onClick={() => handleServiceToggle('design')} aria-pressed={hasDesign}>
              <span>{hasDesign ? '✓' : '+'}</span><b>Design e Grafiche</b><small>Logo, locandine, volantini e materiali coordinati.</small>
            </button>
          </div>
          <div style={{ marginTop: '12px' }}>
            <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla! Non so cosa fare per il sito, mi aiutate a scegliere?')}`} target="_blank" rel="noopener noreferrer" className="button button-quiet" style={{ width: '100%', justifyContent: 'center', borderStyle: 'dashed', background: '#fbfbf9', fontSize: '13px' }}>Non so cosa fare per il sito, scrivici su WhatsApp →</a>
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
                <span>Totale indicativo</span><strong>€ {currentTotal}</strong>
                <p>Prezzo concordato insieme prima di iniziare.</p>
              </>
            ) : (
              <>
                <span>Preventivo</span><strong>{canReveal ? 'Pronto' : 'Completa i campi'}</strong>
                <p>{!privacyOk ? 'Manca il consenso privacy.' : canReveal ? 'Hai risposto a tutto.' : `Manca: ${missingFields.join(', ')}.`}</p>
              </>
            )}
          </div>
          {estimateRevealed ? (
            <button className="wa-cta" type="submit" disabled={!hasSite && !hasSocial && !hasDesign}><WhatsAppIcon /> Invia su WhatsApp</button>
          ) : canReveal ? (
            <button className="wa-cta" type="button" onClick={revealEstimate}>Mostra il totale</button>
          ) : (
            <a className="wa-cta" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla! Non so cosa scegliere per il preventivo, mi aiutate su WhatsApp?')}`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Scrivici su WhatsApp</a>
          )}
        </div>
        <div style={{ marginTop: '14px' }}>
          <button type="button" className={form.bannerDiscount ? 'choice selected' : 'choice'} onClick={() => update('bannerDiscount', !form.bannerDiscount)} style={{ width: '100%', justifyContent: 'center', padding: '14px 18px', fontSize: '14px', minHeight: '44px' }}>
            {form.bannerDiscount ? 'Sconto partner applicato −20 €' : 'Applica sconto partner −20 €'}
          </button>
          <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--muted)', textAlign: 'center' }}>Banner discreto “Realizzato da Trebla Studio”</p>
          {estimateRevealed && form.bannerDiscount && <p style={{ marginTop: '6px', fontSize: '12px', color: '#0a7a2e', fontWeight: 700, textAlign: 'center' }}>Nuovo totale: € {currentTotal}</p>}
        </div>
        {submitted && (
          <div style={{ marginTop: '14px', border: '1px solid var(--line)', borderRadius: '8px', padding: '14px', background: '#fff', fontSize: '13px' }}>
            <strong>Grazie, richiesta inviata su WhatsApp.</strong>
            <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Ti interessa anche un evento di inaugurazione con musica dal vivo? <Link to="/eventi" style={{ color: 'var(--blue)', fontWeight: 800, textDecoration: 'underline' }}>Vedi Eventi →</Link></p>
          </div>
        )}
      </form>
    </section>
  );
}




export default PreventivoPage;

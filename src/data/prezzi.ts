// Prezzi reali, coerenti con l'offerta Trebla.
// Base sito: pagina singola 300€ · multipagina 400€ · 2 revisioni incluse · nessun canone obbligatorio.
// Offerta Tutto incluso 590€: sito completo + logo + 3 modifiche gratuite.
//
// Questo file è il catalogo commerciale canonico: vale per le pagine pubbliche
// (prezzi, servizi) e per il configuratore. Le voci su misura per tipo di
// attività stanno in src/data/configuratore.ts e si uniscono qui con
// src/lib/catalogo.ts, così una voce ha un solo prezzo ovunque.

import type { Voce } from '../lib/catalogo';

export const BASE_PRICES = {
  singola: 300,
  multi: 400,
} as const;

export const OFFERTA_SITO = {
  nome: 'Offerta Tutto incluso',
  prezzo: 590,
  revisioni: 3,
} as const;

export type Extra = Voce;

export const SITE_EXTRAS: Extra[] = [
  { name: 'Prenotazioni e ordini su WhatsApp', price: 10, concept: 'prenotazioni' },
  { name: 'Copywriting completo (testi professionali per tutte le pagine)', price: 30, concept: 'copy' },
  { name: 'Versione inglese essenziale', price: 30, concept: 'inglese' },
  { name: 'SEO locale: Google Business + mappe', price: 30, concept: 'seo' },
  { name: 'Feed Instagram integrato nel sito', price: 20, concept: 'feed' },
];

export const SOCIAL_OPTIONS: Extra[] = [
  { name: 'Profili sistemati da zero', price: 20, concept: 'profili' },
  { name: 'Piano con pubblicazioni regolari', price: 30, concept: 'piano' },
  { name: 'Filmati e brevi video', price: 20, concept: 'video' },
  { name: 'Grafiche per post e storie', price: 10, concept: 'storie' },
  { name: 'Gestione messaggi e recensioni (1 mese)', price: 20, concept: 'recensioni' },
];

export const DESIGN_OPTIONS: Extra[] = [
  { name: 'Logo creato o rinnovato', price: 20, concept: 'logo' },
  { name: 'Biglietti da visita pronti per la stampa', price: 10, concept: 'biglietti' },
  { name: 'Volantini, locandine o menu cartaceo', price: 20, concept: 'volantini' },
  { name: 'Grafiche promozionali per il web', price: 10, concept: 'promo-web' },
  { name: 'Identità completa: colori + font + regole', price: 20, concept: 'identita' },
  { name: 'Modelli post social coordinati', price: 20, concept: 'modelli' },
  { name: 'Design adesivi / packaging (solo grafica)', price: 20, concept: 'adesivi' },
  { name: 'Design maglietta / divisa (solo grafica)', price: 20, concept: 'maglietta' },
];

export const CHANNELS = ['Instagram', 'Facebook', 'TikTok'] as const;

export const VIDEO_PRICE = 20;

export const GOALS = [
  'Farmi trovare su Google e in zona',
  'Mostrare servizi e prodotti',
  'Ricevere più contatti e prenotazioni',
  'Avere un’immagine più curata',
] as const;

export const TIMINGS = ['Appena possibile', 'Entro un mese', 'Sto valutando'] as const;

// Prezzi reali, coerenti con l'offerta Trebla.
// Base sito: pagina singola 300 € · multi-pagina 400 € · 2 revisioni incluse · nessun canone obbligatorio.
export const BASE_PRICES = {
  singola: 300,
  multi: 400,
} as const;

export interface Extra {
  name: string;
  price: number;
  hint?: string;
}

export const SITE_EXTRAS: Extra[] = [
  { name: 'Menu digitale con QR stampabile', price: 10, hint: 'Per ristoranti, bar, pizzerie' },
  { name: 'Prenotazioni e ordini su WhatsApp', price: 10 },
  { name: 'Galleria fotografica dei lavori', price: 10 },
  { name: 'Pagina eventi e serate', price: 10 },
  { name: 'Testi scritti con te (copywriting)', price: 30 },
  { name: 'SEO locale: Google Business + mappe', price: 30 },
  { name: 'Privacy + banner cookie a norma', price: 10 },
  { name: 'Dominio ed email configurati', price: 10 },
  { name: 'Foto scattate da noi sul posto', price: 20, hint: 'Ad Asti e dintorni' },
];

export const SOCIAL_OPTIONS: Extra[] = [
  { name: 'Profili sistemati da zero', price: 20 },
  { name: 'Piano con pubblicazioni regolari', price: 30 },
  { name: 'Filmati e brevi video', price: 20 },
  { name: 'Grafiche per post e storie', price: 10 },
];

export const DESIGN_OPTIONS: Extra[] = [
  { name: 'Logo creato o rinnovato', price: 20 },
  { name: 'Biglietti da visita pronti per la stampa', price: 10 },
  { name: 'Volantini, locandine o menu cartaceo', price: 20 },
  { name: 'Grafiche promozionali per il web', price: 10 },
];

export const CHANNELS = ['Instagram', 'Facebook', 'TikTok'] as const;

export const BUSINESS_TYPES = [
  'Ristorante o bar',
  'Pizzeria',
  'Gelateria o pasticceria',
  'Macelleria o gastronomia',
  'Hotel o B&B',
  'Agriturismo o cantina',
  'Parrucchiere o salone',
  'Barbiere',
  'Centro estetico',
  'Palestra',
  'Negozio o bottega',
  'Abbigliamento o boutique',
  'Artigiano o impresa',
  'Autofficina o carrozzeria',
  'Professionista o studio',
  'Associazione',
  'Altro',
] as const;

export const GOALS = [
  'Farmi trovare su Google e in zona',
  'Mostrare servizi e prodotti',
  'Ricevere più contatti e prenotazioni',
  'Avere un’immagine più curata',
] as const;

export const TIMINGS = ['Appena possibile', 'Entro un mese', 'Sto valutando'] as const;

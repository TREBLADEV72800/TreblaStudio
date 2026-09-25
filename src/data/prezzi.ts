// Prezzi reali, coerenti con l'offerta Trebla.
// Base sito: pagina singola 300 € · multipagina 400 € · 2 revisioni incluse · nessun canone obbligatorio.
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
  { name: 'Prenotazioni e ordini su WhatsApp', price: 10 },
  { name: 'Copywriting completo (testi professionali per tutte le pagine)', price: 30 },
  { name: 'Versione inglese essenziale', price: 30 },
  { name: 'SEO locale: Google Business + mappe', price: 30 },
  { name: 'Feed Instagram integrato nel sito', price: 20 },
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
  { name: 'Identità completa: colori + font + regole', price: 30 },
  { name: 'Modelli post social coordinati (10)', price: 20 },
  { name: 'Design adesivi / packaging (solo grafica)', price: 20 },
  { name: 'Design maglietta / divisa (solo grafica)', price: 20 },
];

export const CHANNELS = ['Instagram', 'Facebook', 'TikTok'] as const;

export const GOALS = [
  'Farmi trovare su Google e in zona',
  'Mostrare servizi e prodotti',
  'Ricevere più contatti e prenotazioni',
  'Avere un’immagine più curata',
] as const;

export const TIMINGS = ['Appena possibile', 'Entro un mese', 'Sto valutando'] as const;

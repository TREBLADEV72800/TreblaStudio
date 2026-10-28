// Capitoli del quaderno: l'ordine è quello della navigazione.
// La numerazione è un dato, non un'etichetta sparsa nelle pagine: la usano
// le testate e il piè di pagina, così non può divergere.

export interface Capitolo {
  numero: string;
  titolo: string;
  percorso: string;
}

export const CAPITOLI: Capitolo[] = [
  { numero: '01', titolo: 'Home', percorso: '/' },
  { numero: '02', titolo: 'Servizi', percorso: '/servizi/' },
  { numero: '03', titolo: 'Prezzi', percorso: '/prezzi/' },
  { numero: '04', titolo: 'Studio', percorso: '/chi-siamo/' },
  { numero: '05', titolo: 'Domande', percorso: '/faq/' },
  { numero: '06', titolo: 'Contatti', percorso: '/contatti/' },
  { numero: '07', titolo: 'Note legali', percorso: '/note-legali/' },
];

export const TOTALE_CAPITOLI = CAPITOLI.length;

function normalizza(percorso: string): string {
  const pulito = percorso.replace(/\/+$/, '');
  return pulito === '' ? '/' : pulito;
}

export function capitoloDi(percorso: string): Capitolo | undefined {
  const cercato = normalizza(percorso);
  return CAPITOLI.find((c) => normalizza(c.percorso) === cercato);
}

/** «Cap. 03 · Prezzi»: l'etichetta che apre la pagina. */
export function etichettaCapitolo(percorso: string): string | undefined {
  const capitolo = capitoloDi(percorso);
  return capitolo ? `Cap. ${capitolo.numero} · ${capitolo.titolo}` : undefined;
}

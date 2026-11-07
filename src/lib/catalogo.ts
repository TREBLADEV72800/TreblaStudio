// Unico punto in cui catalogo generico e voci su misura si uniscono.
//
// Regola: la voce su misura ha la precedenza. Una voce generica che copre
// lo stesso concetto non viene riproposta. Una voce, un prezzo.

export interface Voce {
  name: string;
  price: number;
  hint?: string;
  /** Concetto di merito: due voci con lo stesso concetto sono la stessa cosa. */
  concept?: string;
}

/** Chiave di confronto: minuscole, senza punteggiatura. */
function chiave(nome: string): string {
  return nome.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/**
 * Concetti coperti dalle voci su misura (nome -> concetto).
 * Serve a non proporre due volte la stessa cosa.
 * Le voci generiche portano il concetto nel campo `concept`.
 */
export const CONCETTI: Record<string, string> = {
  'biglietti da visita': 'biglietti',
  'biglietti da visita pronti per la stampa': 'biglietti',
  'biglietti professionali': 'biglietti',
  'biglietti artigiano': 'biglietti',
  'biglietti fotografici': 'biglietti',
  'menu asporto coordinato': 'menu-stampato',
  'menu pizzeria coordinato': 'menu-stampato',
  'menu gusti coordinato': 'menu-stampato',
  'menu agriturismo coordinato': 'menu-stampato',
  'volantini locandine o menu cartaceo': 'menu-stampato',
  'menu cartaceo coordinato': 'menu-stampato',
  'creazione o rinnovamento del logo': 'logo',
  'creazione profili da zero': 'profili',
  'creazione filmati e brevi video': 'video',
  'grafiche personalizzate per le storie': 'storie',
  'logo creato o rinnovato': 'logo',
};

export function concetto(v: Voce): string | undefined {
  if (v.concept) return v.concept;
  const k = chiave(v.name);
  if (CONCETTI[k]) return CONCETTI[k];
  // Le opzioni verticali possono chiamare "stories" lo stesso lavoro della
  // voce generica "grafiche per post e storie".
  if (/(^| )(stories|storie)( |$)/.test(k)) return 'storie';
  if (/(^| )locandine( |$)/.test(k)) return 'menu-stampato';
  return undefined;
}

/**
 * Filtra le voci generiche: toglie i doppioni di nome e le voci il cui concetto
 * è già coperto. `concettiExtra` serve per i concetti coperti da regole di
 * dominio (per esempio le prenotazioni, coperte da un tipo che le gestisce già).
 */
export function unione(generiche: Voce[], concettiExtra?: Set<string>): Voce[] {
  const out: Voce[] = [];
  const visti = new Set<string>();
  const coperti = new Set<string>(concettiExtra ?? []);

  for (const v of generiche) {
    const k = chiave(v.name);
    if (visti.has(k)) continue;
    const c = concetto(v);
    if (c && coperti.has(c)) continue;
    visti.add(k);
    if (c) coperti.add(c);
    out.push(v);
  }

  return out;
}

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
  'menu cartaceo coordinato': 'volantini',
  'creazione o rinnovamento del logo': 'logo',
  'creazione profili da zero': 'profili',
  'creazione filmati e brevi video': 'video',
  'grafiche personalizzate per le storie': 'storie',
};

export function concetto(v: Voce): string | undefined {
  return v.concept ?? CONCETTI[chiave(v.name)];
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

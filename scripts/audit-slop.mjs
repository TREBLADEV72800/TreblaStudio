#!/usr/bin/env node
/**
 * audit-slop.mjs — controllo deterministico anti-AI-slop.
 *
 * Analizza il sito costruito in dist/, non i sorgenti: conta quello che vede
 * l'utente. Le regole e le soglie sono in .opencode/skills/anti-ai-slop/.
 *
 *   npm run build
 *   npm run slop
 *
 * Esce con 1 se trova un bloccante o se il punteggio supera 10 su 30.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const SOGLIA_PUNTEGGIO = 10;

const colore = process.stdout.isTTY
  ? { rosso: (s) => `\x1b[31m${s}\x1b[0m`, giallo: (s) => `\x1b[33m${s}\x1b[0m`, verde: (s) => `\x1b[32m${s}\x1b[0m`, tenue: (s) => `\x1b[2m${s}\x1b[0m`, grasso: (s) => `\x1b[1m${s}\x1b[0m` }
  : { rosso: (s) => s, giallo: (s) => s, verde: (s) => s, tenue: (s) => s, grasso: (s) => s };

if (!existsSync(DIST)) {
  console.error('Manca dist/. Esegui prima: npm run build');
  process.exit(1);
}

const pagine = [];
(function cammina(dir) {
  for (const voce of readdirSync(dir)) {
    const percorso = join(dir, voce);
    if (statSync(percorso).isDirectory()) cammina(percorso);
    else if (voce.endsWith('.html')) pagine.push(percorso);
  }
})(DIST);

if (pagine.length === 0) {
  console.error('Nessun HTML in dist/. Esegui prima: npm run build');
  process.exit(1);
}

const esiti = [];
const segnala = (livello, pagina, regola, messaggio) => {
  esiti.push({ livello, pagina, regola, messaggio });
};

/** Percorso pubblico della pagina, es. /prezzi/. */
function urlDi(file) {
  const rel = relative(DIST, file).split('\\').join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel;
}

/** Testo visibile: via script, style e commenti. */
function testoVisibile(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Contenuto principale, per non misurare menu e footer. */
function testoPrincipale(html) {
  const m = html.match(/<main\b[\s\S]*?<\/main>/i);
  return testoVisibile(m ? m[0] : html);
}

/**
 * Una formula vuota citata o negata non è slop: è copy che prende le distanze.
 * Es. «non ha bisogno di un “ecosistema digitale”» è una posizione, non un
 * riempitivo. Si guarda la citazione e la negazione prima della formula.
 */
function eCitato(testo, inizio) {
  const prima = testo.slice(Math.max(0, inizio - 80), inizio);
  if (/\b(?:non|niente|nessun[oa]?|mai|invece di)\b[^.!?]{0,60}$/i.test(prima)) return true;
  const ultimaApertura = Math.max(prima.lastIndexOf('“'), prima.lastIndexOf('«'), prima.lastIndexOf('"'));
  if (ultimaApertura === -1) return false;
  const dopoApertura = prima.slice(ultimaApertura);
  return !/[”»"]/.test(dopoApertura.slice(1));
}

function blocchiStile(html) {
  return [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
}

function daHex(h) {
  let s = h.slice(1);
  if (s.length === 3) s = s.split('').map((c) => c + c).join('');
  if (s.length !== 6) return null;
  const n = parseInt(s, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function tintaViola(hex) {
  const rgb = daHex(hex);
  if (!rgb) return false;
  const [r, g, b] = rgb.map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return false;
  const s = d / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === r) h = 60 * (((g - b) / d) % 6);
  else if (max === g) h = 60 * ((b - r) / d + 2);
  else h = 60 * ((r - g) / d + 4);
  if (h < 0) h += 360;
  return s >= 0.3 && h >= 245 && h <= 295 && l >= 0.2 && l <= 0.78;
}

// ---------------------------------------------------------------- regole copy

const PAROLE_INGLESI = [
  'seamless', 'unlock', 'unleash', 'elevate', 'empower', 'streamline', 'robust',
  'holistic', 'leverage', 'delve', 'tapestry', 'game-chang', 'next-level',
  'cutting-edge', 'best-in-class', 'world-class', 'supercharge', 'revolutioni',
  'frictionless', 'effortless', 'state-of-the-art', 'future-proof',
];

const FRASI_VUOTE = [
  /soluzion[ei]\s+su\s+misura/i,
  /all['’]avanguardia/i,
  /a\s+360\s+gradi/i,
  /\btrasform(?:a|are|iamo)\s+(?:la|il|il tuo|la tua)\b/i,
  /\belev(?:a|are)\s+(?:la|il|il tuo|la tua)\b/i,
  /\bpotenzia(?:re|mo)?\s+(?:il|la|il tuo|la tua)\b/i,
  /\becosistema\b/i,
  /\bsinergi[ae]\b/i,
  /\brivoluzionari[oa]\b/i,
  /\bsenza\s+sforzo\b/i,
  /\bnel\s+mondo\s+digitale\b/i,
  /\bal\s+giorno\s+d['’]oggi\b/i,
  /\bnell['’]era\s+digitale\b/i,
  /\bnon\s+[eè]\s+solo\b/i,
  /\bleader\s+nel\s+settore\b/i,
  /\besperienza\s+unica\b/i,
  /\bqualit[aà]\s+senza\s+compromessi\b/i,
  /\bin\s+conclusione\b/i,
  /\bin\s+sintesi\b/i,
  /\bricapitolando\b/i,
  /\bti\s+sei\s+mai\s+chiesto\b/i,
  /\bhai\s+mai\s+pensato\b/i,
];

const CLAIM_INVENTATI = [
  /\b(?:10|100|1000)x\b/i,
  /\b99[.,]9\s*%/,
  /\b\d{3,}\s*\+/,
  /\btrusted\s+by\b/i,
  /\b(?:oltre|pi[uù]\s+di)\s+\d[\d.]*\s+(?:clienti|aziende|attivit[aà]|team|utenti)\b/i,
  /\b\d[\d.]*\s*(?:clienti|aziende)\s+(?:soddisfatt|servit)/i,
];

const SEGNAPOSTO = [
  /lorem\s+ipsum/i,
  /\btemplate\s+by\b/i,
  /\bpowered\s+by\s+(?:webflow|wix|squarespace|framer)\b/i,
  /\byour\s+company\b/i,
  /\bnome\s+azienda\s+esempio\b/i,
];

// ---------------------------------------------------------------- regole CSS

const FONT_VIETATI = [
  'inter', 'roboto', 'poppins', 'montserrat', 'open sans', 'lato', 'nunito',
  'manrope', 'plus jakarta sans', 'dm sans', 'geist', 'space grotesk',
  'work sans', 'public sans', 'figtree', 'outfit', 'sora',
];

/** Prima famiglia di ogni font-family: i fallback non contano. */
function primaFamiglia(valore) {
  const prima = valore.split(',')[0] || '';
  return prima.trim().replace(/^["']|["']$/g, '').toLowerCase();
}

// ---------------------------------------------------------------- scansione

const titoli = new Map();
const descrizioni = new Map();
const paragrafi = new Map();

for (const file of pagine) {
  const html = readFileSync(file, 'utf8');
  const pagina = urlDi(file);
  const testo = testoVisibile(html);
  const principale = testoPrincipale(html);

  // 1. trattino lungo e segnaposto
  if (testo.includes('—')) segnala('bloccante', pagina, 'copy.trattino-lungo', 'Trattino lungo nel testo visibile');
  for (const re of SEGNAPOSTO) {
    if (re.test(testo)) segnala('bloccante', pagina, 'copy.segnaposto', `Segnaposto in pagina: ${re}`);
  }

  // 2. emoji
  const emoji = [...testo.matchAll(/\p{Extended_Pictographic}/gu)]
    .map((m) => m[0])
    .filter((c) => !['©', '®', '™'].includes(c));
  if (emoji.length) segnala('bloccante', pagina, 'design.emoji', `Emoji nel testo: ${[...new Set(emoji)].join(' ')}`);

  // 3. link finti: href="#" va bene solo se un data-* lo riempie a runtime
  for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/href\s*=\s*["']#["']/i.test(tag)) continue;
    if (/data-(?:wa|mail|tel|share)\b/i.test(tag)) continue;
    segnala('bloccante', pagina, 'cura.link-finto', 'Link href="#" senza data-* che lo riempia');
    break;
  }
  if (/href\s*=\s*["'](?:javascript:void|)["']/i.test(html)) {
    segnala('bloccante', pagina, 'cura.link-vuoto', 'Link vuoto o javascript:void');
  }

  // 4. immagini senza alt e lingua
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=/i.test(m[0])) {
      segnala('bloccante', pagina, 'cura.img-alt', 'Immagine senza alt');
      break;
    }
  }
  if (!/<html\b[^>]*\blang\s*=/i.test(html)) {
    segnala('bloccante', pagina, 'cura.lang', 'Tag html senza lang');
  }

  // 5. titoli: uno solo h1, nessun salto di livello
  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 !== 1) segnala('bloccante', pagina, 'cura.h1', `Titoli h1 trovati: ${h1}`);
  const livelli = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < livelli.length; i++) {
    if (livelli[i] - livelli[i - 1] > 1) {
      segnala('attenzione', pagina, 'cura.gerarchia', `Salto di livello: h${livelli[i - 1]} → h${livelli[i]}`);
      break;
    }
  }

  // 6. claim inventati
  for (const re of CLAIM_INVENTATI) {
    if (re.test(testo)) segnala('bloccante', pagina, 'prove.claim', `Claim non verificabile: ${re}`);
  }

  // 7. inglese decorativo e frasi vuote
  const inglese = PAROLE_INGLESI.filter((p) => new RegExp(`\\b${p}`, 'i').test(testo));
  if (inglese.length) segnala('bloccante', pagina, 'copy.inglese', `Gergo inglese: ${inglese.join(', ')}`);
  for (const re of FRASI_VUOTE) {
    const trovata = [...testo.matchAll(new RegExp(re.source, 'gi'))].find((m) => !eCitato(testo, m.index));
    if (trovata) segnala('attenzione', pagina, 'copy.frase-vuota', `Formula vuota: "${trovata[0]}"`);
  }

  // 8. ritmo delle frasi
  const frasi = principale
    .split(/(?<=[.!?])\s+/)
    .map((f) => f.trim())
    .filter((f) => f.split(/\s+/).length >= 4);
  if (frasi.length >= 8) {
    const lunghezze = frasi.map((f) => f.split(/\s+/).length);
    const media = lunghezze.reduce((a, b) => a + b, 0) / lunghezze.length;
    const varianza = lunghezze.reduce((a, b) => a + (b - media) ** 2, 0) / lunghezze.length;
    const variazione = Math.sqrt(varianza) / media;
    if (variazione < 0.28) {
      segnala('attenzione', pagina, 'copy.ritmo', `Ritmo piatto: ${frasi.length} frasi, variazione ${variazione.toFixed(2)}`);
    }
  }

  // 9. densità di liste
  const li = (principale.match(/[^\s]/g) || []).length;
  const voci = (html.match(/<li\b/gi) || []).length;
  const par = (html.match(/<p\b/gi) || []).length;
  if (voci >= 10 && voci > par * 2 && li > 1200) {
    segnala('attenzione', pagina, 'copy.liste', `Pagina a lista: ${voci} voci contro ${par} paragrafi`);
  }

  // 10. punti esclamativi
  const esclamativi = (testo.match(/!/g) || []).length;
  if (esclamativi > 2) segnala('attenzione', pagina, 'copy.esclamativi', `${esclamativi} punti esclamativi`);

  // 11. meta duplicati
  const titolo = (html.match(/<title>([^<]*)<\/title>/i) || [])[1]?.trim();
  const descrizione = (html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || [])[1]?.trim();
  if (titolo) {
    if (titoli.has(titolo)) segnala('attenzione', pagina, 'cura.title-duplicato', `Titolo identico a ${titoli.get(titolo)}`);
    else titoli.set(titolo, pagina);
  }
  if (descrizione) {
    if (descrizioni.has(descrizione)) segnala('attenzione', pagina, 'cura.description-duplicata', `Description identica a ${descrizioni.get(descrizione)}`);
    else descrizioni.set(descrizione, pagina);
  }
  if (!descrizione) segnala('attenzione', pagina, 'cura.description', 'Meta description assente');

  // 12. paragrafi duplicati tra pagine. Le risposte FAQ vivono in <details>:
  //    ripeterle in home e nella pagina FAQ è una scelta editoriale, non slop.
  const senzaFaq = html.replace(/<details\b[\s\S]*?<\/details>/gi, ' ');
  for (const m of senzaFaq.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const t = testoVisibile(m[1]).toLowerCase();
    if (t.length < 90) continue;
    const insieme = paragrafi.get(t) || new Set();
    insieme.add(pagina);
    paragrafi.set(t, insieme);
  }

  // 13. CSS: font di default e tinte viola
  const css = blocchiStile(html);
  for (const m of css.matchAll(/font-family\s*:\s*([^;}]+)/gi)) {
    const prima = primaFamiglia(m[1]);
    if (FONT_VIETATI.includes(prima)) {
      segnala('bloccante', pagina, 'design.font', `Font da template come prima famiglia: ${prima}`);
      break;
    }
  }
  const tinte = new Set();
  for (const m of css.matchAll(/#[0-9a-f]{3,8}\b/gi)) {
    if (tintaViola(m[0])) tinte.add(m[0].toLowerCase());
  }
  for (const m of css.matchAll(/\b(?:purple|indigo|violet|fuchsia)\b/gi)) tinte.add(m[0].toLowerCase());
  if (tinte.size) {
    segnala('bloccante', pagina, 'design.palette', `Tinte viola/indaco: ${[...tinte].slice(0, 6).join(', ')}`);
  }
  if (/backdrop-filter\s*:\s*[^;}]*blur/i.test(css)) {
    segnala('bloccante', pagina, 'design.glass', 'Glassmorphism: backdrop-filter con blur');
  }
}

// paragrafi condivisi tra pagine diverse
for (const [testo, insieme] of paragrafi) {
  if (insieme.size > 1) {
    segnala(
      'attenzione',
      [...insieme].join(' + '),
      'copy.duplicato',
      `Paragrafo identico su ${insieme.size} pagine: "${testo.slice(0, 70)}…"`
    );
  }
}

// ---------------------------------------------------------------- report

const bloccanti = esiti.filter((e) => e.livello === 'bloccante');
const attenzioni = esiti.filter((e) => e.livello === 'attenzione');
const regoleBloccanti = new Set(bloccanti.map((e) => e.regola));
const regoleAttenzione = new Set(attenzioni.map((e) => e.regola));
const extra = Math.min(4, Math.round(Math.max(0, attenzioni.length - regoleAttenzione.size) * 0.5));
const punteggio = Math.min(30, regoleBloccanti.size * 6 + regoleAttenzione.size * 2 + extra);
const promosso = regoleBloccanti.size === 0 && punteggio <= SOGLIA_PUNTEGGIO;

console.log('');
console.log(colore.grasso(`anti-slop · ${pagine.length} pagine · ${punteggio}/30`));
console.log(
  colore.tenue(
    `bloccanti ${bloccanti.length} · attenzioni ${attenzioni.length} · soglia ${SOGLIA_PUNTEGGIO}/30`
  )
);

if (bloccanti.length) {
  console.log('');
  console.log(colore.rosso('BLOCCANTI'));
  for (const e of bloccanti) console.log(`  ${colore.rosso('×')} ${e.pagina}  ${e.regola}  ${e.messaggio}`);
}

if (attenzioni.length) {
  console.log('');
  console.log(colore.giallo('ATTENZIONE'));
  for (const e of attenzioni) console.log(`  ${colore.giallo('!')} ${e.pagina}  ${e.regola}  ${e.messaggio}`);
}

if (!bloccanti.length && !attenzioni.length) {
  console.log('');
  console.log(colore.verde('Nessun segnale meccanico. Restano i cinque test manuali.'));
}

console.log('');
console.log(
  promosso
    ? colore.verde('PASS · resta da fare l’audit manuale (SKILL.md §6)')
    : colore.rosso('FAIL · correggi prima di consegnare')
);
console.log(
  colore.tenue(
    'Non controllabile a macchina: squint test, lato a lato, copia intercambiabile, veridicità delle fonti, tono.'
  )
);
console.log('');

process.exit(promosso ? 0 : 1);

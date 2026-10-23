// ============================================================
// Configuratore del preventivo (pagina /preventivo).
// Un solo flusso dichiarativo: flusso() -> renderizza() per passo.
// Fonte dei prezzi: src/data/prezzi.ts + src/data/configuratore.ts
// (si uniscono in src/lib/catalogo.ts). Stato unico in S.
// ============================================================
import { BASE_PRICES, OFFERTA_SITO, SITE_EXTRAS, SOCIAL_OPTIONS, DESIGN_OPTIONS, CHANNELS, GOALS, TIMINGS, VIDEO_PRICE } from '../data/prezzi';
import {
  businessTypes,
  businessCategories,
  featuresByType,
  extendedFeatures,
  pageOptions,
  photoPrices,
  socialByType,
  designByType,
} from '../data/configuratore';
import { unione, concetto } from '../lib/catalogo';
import type { Voce } from '../lib/catalogo';
import { numeroWhatsapp, indirizzoEmail } from '../data/contatti';
import { track } from '../lib/tracking';

type Servizio = 'sito' | 'grafiche' | 'social';
type Struttura = 'singola' | 'multi' | 'offerta' | '';

interface Stato {
  nome: string;
  categoria: string;
  tipo: string;
  tipoAltro: string;
  altroMsg: string;
  servizi: Servizio[];
  struttura: Struttura;
  funzioni: string[];
  pagine: string[];
  foto: string;
  canali: string[];
  socialExtra: string[];
  videoQty: number;
  graficheExtra: string[];
  obiettivi: string[];
  tempi: string;
  privacy: boolean;
}

// ---------- Catalogo e stato ----------

/**
 * C = catalogo normalizzato: una sola mappa da cui leggere.
 * Le copie `[...X] as string[]` servono per leggere gli `as const`
 * fuori dal contesto di tipo readonly.
 */
const C = {
  base: BASE_PRICES,
  offerta: OFFERTA_SITO,
  siteExtras: SITE_EXTRAS,
  socialNeeds: SOCIAL_OPTIONS,
  designNeeds: DESIGN_OPTIONS,
  channels: [...CHANNELS] as string[],
  businessTypes,
  businessCategories,
  featuresByType,
  extendedFeatures,
  pageOptions,
  photoPrices,
  socialByType,
  designByType,
  goals: [...GOALS] as string[],
  timings: [...TIMINGS] as string[],
  videoPrice: VIDEO_PRICE,
};
/** Stato dell'intero questionario: una sola fonte di verità. */
const S: Stato = {
  nome: '', categoria: '', tipo: '', tipoAltro: '', altroMsg: '', servizi: [],
  struttura: '', funzioni: [], pagine: [], foto: '',
  canali: [], socialExtra: [], videoQty: 0, graficheExtra: [],
  obiettivi: [], tempi: '',
  privacy: false,
};

// ---------- Aiuti (DOM, formato, selezioni) ----------

/** Elemento obbligatorio: se manca è un bug, non un caso da gestire a runtime. */
const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error('Elemento mancante: ' + id);
  return el as T;
};

document.addEventListener('click', (e) => {
  const v = e.target instanceof Element ? e.target.closest('[data-track]') : null;
  if (v) track(v.getAttribute('data-track') || '');
});
const corpo = $('w-corpo'), domanda = $('w-domanda'), sotto = $('w-sotto'),
  errore = $('w-errore'), riemp = $('w-riempimento'),
  avanti = $<HTMLButtonElement>('w-avanti'), indietro = $<HTMLButtonElement>('w-indietro');

// La barra dei pulsanti e' fixed: senza misurarla, il corpo scrollabile ci
// finisce sotto e l'ultima riga resta coperta. Pubblichiamo l'altezza reale
// (cambia con safe-area e con la rotazione).
const barra = document.querySelector<HTMLElement>('.wizard-barra-fissa');
const aggiornaBarra = () => {
  if (!barra) return;
  document.documentElement.style.setProperty('--wizard-barra', `${barra.offsetHeight}px`);
};
aggiornaBarra();
if (barra && 'ResizeObserver' in window) new ResizeObserver(aggiornaBarra).observe(barra);

// UTM: se arrivi da una campagna, la fonte viaggia nel messaggio e nel tracking
const UTM: Record<string, string> = (() => {
  const u: Record<string, string> = {};
  try {
    const q = new URLSearchParams(window.location.search);
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) {
      const v = (q.get(k) || '').trim().slice(0, 60);
      if (v) u[k] = v;
    }
    if (Object.keys(u).length) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'trebla_utm', ...u });
    }
  } catch (e) { /* nessun problema: si continua senza fonte */ }
  return u;
})();

const ha = (s: Servizio) => S.servizi.includes(s);
const isPC = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const inOfferta = () => S.struttura === 'offerta';
const waNum = () => numeroWhatsapp();
const mailAddr = () => indirizzoEmail();
const ordina = (arr: string[]) => [...arr].sort((a, b) => a.localeCompare(b, 'it'));
const altro = () => S.tipo === 'Altro';
const euro = (p: number) => (p ? `+${p}€` : 'incluso');
const tipoLabel = () => (!S.tipo ? '' : (altro() && S.tipoAltro.trim() ? `Altro (${S.tipoAltro.trim()})` : S.tipo));
const categoriaDi = (t: string) => (Object.entries(C.businessCategories).find(([, tipi]) => tipi.includes(t)) || [])[0] || '';

// I concetti già coperti dalle voci su misura: la voce generica non si ripete.
const concettiDi = (voci: Voce[]) => {
  const out = new Set<string>();
  for (const v of voci) {
    const c = concetto(v);
    if (c) out.add(c);
  }
  return out;
};

// ---------- Catalogo su misura: viste del wizard ----------

const funzioniPerTipo = (): Voce[] => [...(C.featuresByType[S.tipo] || []), ...(C.extendedFeatures[S.tipo] || [])];
// Se il tipo gestisce già le prenotazioni, la voce generica sparisce.
// Es. Barbiere ha "Prenotazione appuntamenti rapida" -> via "Prenotazioni e ordini su WhatsApp".
const concettiFunzioni = () => {
  const nomi = funzioniPerTipo().map((f) => f.name.toLowerCase()).join(' | ');
  const c = new Set<string>();
  if (/(\bprenot|\bordin)/.test(nomi)) c.add('prenotazioni');
  return c;
};
const extraGenerali = () => unione(C.siteExtras, concettiFunzioni());
const socialPerTipo = (): Voce[] => C.socialByType[S.tipo] || [];
const socialGenerici = () => unione(C.socialNeeds, concettiDi(socialPerTipo()));
// Le voci video stanno nel passo quantità, non nell'elenco contenuti
const isVideoVoce = (n: string) => /reel|video|filmati/i.test(n);
const socialContenuti = () => [...socialPerTipo(), ...socialGenerici()].filter((v) => !isVideoVoce(v.name));
const designPerTipo = (): Voce[] => C.designByType[S.tipo] || [];
const designGenerici = () => unione(C.designNeeds, concettiDi(designPerTipo()));
// Con l'offerta il logo è già incluso: non riproporlo a pagamento.
// Stessa regola per la lista mostrata, per il prezzo e per il riepilogo.
const designVisibili = () =>
  new Set(
    [...designPerTipo(), ...designGenerici()]
      .filter((v) => !(inOfferta() && concetto(v) === 'logo'))
      .map((v) => v.name)
  );
const trova = (lista: Voce[], n: string) => lista.find((x) => x.name === n);

// ---------- Flusso, stima, widgets ----------

/** Passi effettivi: cambiano col tipo e con i servizi scelti. */
function flusso() {
  const f = ['nome', 'categoria', 'tipo'];
  if (altro()) {
    f.push('altro-descrivi', 'servizi', 'altro-invia');
    return f;
  }
  if (!offertaDiretta) f.push('servizi');
  if (ha('sito')) {
    if (!offertaDiretta) f.push('sito');
    if (!inOfferta()) {
      if (funzioniPerTipo().length) f.push('funzioni');
      f.push('funzioni-extra');
      if (S.struttura === 'multi') { f.push('pagine'); }
      f.push('foto');
    }
  }
  if (ha('grafiche')) f.push('grafiche-materiali');
  if (ha('social')) f.push('social-tutto');
  f.push('obiettivi-tempi', 'riepilogo', 'invia');
  return f;
}
let idx = 0, tracciatoAvvio = false, offertaDiretta = false;

/** Stima indicativa: somma di base + extra scelti. Sempre intera, mai negativa. */
function stima() {
  let t = 0;
  if (ha('sito')) {
    if (inOfferta()) {
      t += C.offerta.prezzo;
    } else {
      t += S.struttura === 'multi' ? C.base.multi : C.base.singola;
      const lf = [...funzioniPerTipo(), ...extraGenerali()];
      for (const n of S.funzioni) {
        const e = trova(lf, n);
        if (e) t += e.price;
      }
      for (const n of S.pagine) {
        const p = trova(C.pageOptions, n);
        if (p) t += p.price;
      }
      const prezzoFoto = S.foto ? C.photoPrices[S.foto] : undefined;
      if (prezzoFoto) t += prezzoFoto;
    }
  }
  const ls = socialContenuti();
  for (const n of S.socialExtra) {
    const e = trova(ls, n);
    if (e) t += e.price;
  }
  t += S.videoQty * C.videoPrice;
  const ld = [...designPerTipo(), ...designGenerici()].filter((v) => designVisibili().has(v.name));
  for (const n of S.graficheExtra) {
    const e = trova(ld, n);
    if (e) t += e.price;
  }
  return Math.max(0, Math.round(t));
}

// ---------- Widgets riutilizzabili del questionario ----------

/** Crea un elemento con classe e testo, per costruire il DOM a mano. */
function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

interface OpzioneSpec {
  tipo: 'checkbox' | 'radio';
  nome: string;
  valore: string;
  titolo: string;
  nota?: string | undefined;
  prezzo?: number | undefined;
  checked?: boolean | undefined;
}

function opzione({ tipo, nome, valore, titolo, nota, prezzo, checked }: OpzioneSpec) {
  const lab = el('label', 'opzione');
  const inp = document.createElement('input');
  inp.type = tipo;
  inp.name = nome;
  inp.value = valore;
  inp.checked = !!checked;
  inp.className = 'sr-solo';
  inp.setAttribute('aria-label', titolo + (prezzo ? `, ${euro(prezzo)}` : ''));
  const segno = el('span', 'segno', tipo === 'checkbox' ? (checked ? '✓' : '+') : '○');
  segno.setAttribute('aria-hidden', 'true');
  const txt = el('span', 'opzione-testo', titolo);
  if (nota) txt.appendChild(el('small', '', nota));
  lab.appendChild(inp);
  lab.appendChild(segno);
  lab.appendChild(txt);
  if (prezzo) lab.appendChild(el('span', 'opzione-prezzo', euro(prezzo)));
  inp.addEventListener('change', () => {
    segno.textContent = tipo === 'checkbox' ? (inp.checked ? '✓' : '+') : '●';
    sincronizza(nome, tipo);
    aggiornaCromo(false);
    nascondiErrore();
  });
  return lab;
}

function pulsanteOpzione(
  titolo: string,
  nota: string | undefined,
  checked: boolean,
  onClick: () => void
) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'opzione';
  b.setAttribute('aria-pressed', String(!!checked));
  const segno = el('span', 'segno', checked ? '✓' : '+');
  segno.setAttribute('aria-hidden', 'true');
  b.appendChild(segno);
  const txt = el('span', 'opzione-testo', titolo);
  if (nota) txt.appendChild(el('small', '', nota));
  b.appendChild(txt);
  b.addEventListener('click', onClick);
  return b;
}

// Liste sempre intere: tutte le voci insieme, mai paginate
interface ListaSpec {
  nome: string;
  voci: (Voce | string)[];
  selezionati: string[];
  conPrezzo: boolean;
}

function listaOpzioni(contenitore: HTMLElement, { nome, voci, selezionati, conPrezzo }: ListaSpec) {
  const ul = el('ul', 'wizard-opzioni');
  voci.forEach((v) => {
    const nomeVoce = typeof v === 'string' ? v : v.name;
    const li = document.createElement('li');
    li.appendChild(opzione({
      tipo: 'checkbox', nome, valore: nomeVoce, titolo: nomeVoce,
      nota: typeof v === 'string' ? undefined : v.hint,
      prezzo: conPrezzo && typeof v !== 'string' ? v.price : 0,
      checked: selezionati.includes(nomeVoce),
    }));
    ul.appendChild(li);
  });
  contenitore.appendChild(ul);
}

function titoloGruppo(testo: string, primo: boolean, grande?: boolean) {
  const h = el('h2', '', testo);
  h.style.cssText = `font:600 ${grande ? 'calc(1.5rem - 2px)' : '1.2rem'} var(--serif);margin:${primo ? '4px' : grande ? '16px' : '28px'} 0 0`;
  corpo.appendChild(h);
}

function sincronizza(nome: string, tipo: 'radio' | 'checkbox') {
  const campi = [...corpo.querySelectorAll<HTMLInputElement>(`input[name="${nome}"]`)];
  const visibili = new Set(campi.map((i) => i.value));
  const vals = campi.filter((i) => i.checked).map((i) => i.value);
  const unisci = (vecchi: string[]) => [...vals, ...vecchi.filter((v) => !visibili.has(v))];
  if (tipo === 'radio') {
    if (nome === 'struttura') {
      S.struttura = (vals[0] || '') as Struttura;
      if (S.struttura !== 'multi') S.pagine = [];
    }
    if (nome === 'foto') S.foto = vals[0] || '';
    if (nome === 'tempi') S.tempi = vals[0] || '';
  } else {
    if (nome === 'servizi') {
      S.servizi = vals as Servizio[];
      if (!ha('sito')) { S.struttura = ''; S.funzioni = []; S.pagine = []; S.foto = ''; }
      if (!ha('social')) { S.canali = []; S.socialExtra = []; S.videoQty = 0; }
      if (!ha('grafiche')) S.graficheExtra = [];
    }
    if (nome === 'funzioni') S.funzioni = unisci(S.funzioni);
    if (nome === 'pagine') S.pagine = unisci(S.pagine);
    if (nome === 'socialExtra') S.socialExtra = unisci(S.socialExtra);
    if (nome === 'graficheExtra') S.graficheExtra = unisci(S.graficheExtra);
    if (nome === 'obiettivi') S.obiettivi = unisci(S.obiettivi);
  }
}

function setTipo(t: string) {
  S.tipo = t;
  S.funzioni = []; S.pagine = []; S.foto = '';
  S.canali = []; S.socialExtra = []; S.videoQty = 0; S.graficheExtra = [];
}

const SERVIZI_INFO: Record<Servizio, [string, string]> = {
  sito: ['Sito web', 'La base: ti trovano e ti contattano'],
  grafiche: ['Grafiche', 'Logo, biglietti, volantini'],
  social: ['Social media', 'Profili in ordine, contenuti regolari'],
};
const SERVIZI_INFO_GENERICA: Record<Servizio, [string, string]> = {
  sito: ['Sito web', 'Per farti trovare e contattare'],
  grafiche: ['Grafiche', 'Per presentarti al meglio'],
  social: ['Social media', 'Per farti conoscere'],
};

// ---------- Render dei passi ----------

/** Un solo "if" per passo del flusso: aggiunge il suo markup in #w-corpo. */
function renderizza() {
  const f = flusso();
  if (idx >= f.length) idx = f.length - 1;
  const id = f[idx]!;
  document.body.dataset.passo = id;
  corpo.innerHTML = '';
  nascondiErrore();
  sotto.style.display = '';

  if (id === 'nome') {
    domanda.textContent = 'Come si chiama la tua attività?';
    sotto.textContent = 'Il nome con cui ti conoscono i clienti.';
    const inp = document.createElement('input');
    inp.className = 'wizard-campo';
    inp.id = 'f-nome';
    inp.value = S.nome;
    inp.maxLength = 80;
    inp.autocomplete = 'organization';
    inp.placeholder = 'Es. Trattoria Rossi';
    inp.setAttribute('aria-label', 'Nome della tua attività');
    inp.addEventListener('input', () => { S.nome = inp.value.slice(0, 80); aggiornaCromo(false); nascondiErrore(); });
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); vaiAvanti(); } });
    corpo.appendChild(inp);
    setTimeout(() => inp.focus({ preventScroll: true }), 60);
  }

  if (id === 'categoria') {
    domanda.textContent = 'In quale settore sei?';
    sotto.textContent = 'Una sola scelta: poi vedrai solo le attività del settore.';
    const ul = el('ul', 'wizard-opzioni');
    ul.setAttribute('role', 'group');
    ul.setAttribute('aria-label', 'Settore di attività');
    Object.keys(C.businessCategories).forEach((cat) => {
      const li = document.createElement('li');
      li.appendChild(pulsanteOpzione(cat, `${C.businessCategories[cat]?.length ?? 0} attività`, S.categoria === cat, () => {
        if (S.categoria !== cat) {
          S.categoria = cat;
          if (!C.businessCategories[cat]?.includes(S.tipo)) setTipo('');
        }
        vaiAvanti();
      }));
      ul.appendChild(li);
    });
    corpo.appendChild(ul);
  }

  if (id === 'tipo') {
    domanda.textContent = 'Che tipo di attività è?';
    sotto.textContent = S.categoria ? `Settore ${S.categoria}: scegli qui sotto.` : 'Scegli qui sotto.';
    const tipi = (S.categoria && C.businessCategories[S.categoria]) || C.businessTypes;
    const scegli = (t: string) => {
      const cat = categoriaDi(t);
      if (cat) S.categoria = cat;
      setTipo(t);
      vaiAvanti();
    };
    const ul = el('ul', 'wizard-opzioni');
    ul.setAttribute('role', 'group');
    ul.setAttribute('aria-label', 'Tipi di attività');
    tipi.forEach((t) => {
      const li = document.createElement('li');
      li.appendChild(pulsanteOpzione(t, undefined, S.tipo === t, () => scegli(t)));
      ul.appendChild(li);
    });
    corpo.appendChild(ul);

    const ulAltro = el('ul', 'wizard-opzioni');
    ulAltro.setAttribute('role', 'group');
    ulAltro.setAttribute('aria-label', 'Altro tipo');
    const liAltro = document.createElement('li');
    liAltro.appendChild(pulsanteOpzione('Altro', 'Non trovi la tua? Descrivila qui', altro(), () => {
      setTipo('Altro');
      const f2 = flusso();
      idx = Math.min(f2.length - 1, idx + 1);
      renderizza();
    }));
    ulAltro.appendChild(liAltro);
    corpo.appendChild(ulAltro);

    if (altro()) {
      const inp = document.createElement('input');
      inp.className = 'wizard-campo';
      inp.id = 'f-tipo-altro';
      inp.value = S.tipoAltro;
      inp.maxLength = 80;
      inp.placeholder = 'Es. venditori ambulanti, associazione...';
      inp.setAttribute('aria-label', 'Descrivi la tua attività');
      inp.addEventListener('input', () => { S.tipoAltro = inp.value.slice(0, 80); nascondiErrore(); });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); vaiAvanti(); } });
      corpo.appendChild(inp);
    }
  }

  if (id === 'altro-descrivi') {
    domanda.textContent = 'Descrivi la tua azienda';
    sotto.textContent = 'Due righe bastano: cosa fai e dove.';
    const inp = document.createElement('input');
    inp.className = 'wizard-campo';
    inp.id = 'f-altro-testo';
    inp.value = S.tipoAltro;
    inp.maxLength = 80;
    inp.autocomplete = 'off';
    inp.placeholder = 'Es. venditori ambulanti, associazione...';
    inp.setAttribute('aria-label', 'Descrivi la tua azienda');
    inp.addEventListener('input', () => { S.tipoAltro = inp.value.slice(0, 80); nascondiErrore(); });
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); vaiAvanti(); } });
    corpo.appendChild(inp);
    setTimeout(() => inp.focus({ preventScroll: true }), 60);
  }

  if (id === 'altro-invia') {
    domanda.textContent = 'Cosa ti serve?';
    sotto.textContent = 'Scrivi il messaggio e invialo su WhatsApp. Ti rispondiamo noi.';
    const area = document.createElement('textarea');
    area.className = 'wizard-campo';
    area.id = 'f-altro-msg';
    area.rows = 6;
    area.maxLength = 300;
    area.value = S.altroMsg;
    area.placeholder = 'Es. vorrei un sito semplice per farmi trovare...';
    area.setAttribute('aria-label', 'Il tuo messaggio');
    const daComputer = window.matchMedia('(pointer: fine)').matches && !('ontouchstart' in window);
    const wa = el('a', daComputer ? 'btn btn-mattone' : 'btn btn-wa', daComputer ? 'Invia via email' : 'Invia su WhatsApp');
    wa.id = 'w-altro-invia';
    if (!daComputer) {
      wa.target = '_blank';
      wa.rel = 'noopener noreferrer';
    }
    wa.style.display = 'flex';
    wa.style.width = '100%';
    wa.style.marginBlockStart = '16px';
    const aggiornaWa = () => {
      const righe = [
        `Ciao Trebla! Sono ${S.nome}.`,
        `La mia attività: ${S.tipoAltro.trim()}.`,
        `Mi interessa: ${S.servizi.map((s) => SERVIZI_INFO[s][0]).join(' + ')}.`,
      ];
      if (S.altroMsg.trim()) righe.push(S.altroMsg.trim());
      righe.push('Parliamone.');
      const testo = righe.join(' ');
      wa.href = daComputer
        ? `mailto:${mailAddr()}?subject=` + encodeURIComponent('Richiesta sito web') + '&body=' + encodeURIComponent(testo)
        : `https://wa.me/${waNum()}?text=` + encodeURIComponent(testo);
    };
    area.addEventListener('input', () => { S.altroMsg = area.value.slice(0, 300); aggiornaWa(); nascondiErrore(); });
    corpo.appendChild(area);
    corpo.appendChild(wa);
    aggiornaWa();
    setTimeout(() => area.focus({ preventScroll: true }), 60);
  }

  if (id === 'servizi') {
    domanda.textContent = 'Di cosa hai bisogno?';
    sotto.textContent = 'Puoi scegliere più cose. Il sito è il punto di partenza che consigliamo.';
    const ul = el('ul', 'wizard-opzioni');
    ul.setAttribute('role', 'group');
    ul.setAttribute('aria-label', 'Servizi desiderati');
    const INFO = altro() ? SERVIZI_INFO_GENERICA : SERVIZI_INFO;
    Object.entries(INFO).forEach(([v, [t, n]]) => {
      const li = document.createElement('li');
      li.appendChild(opzione({ tipo: 'checkbox', nome: 'servizi', valore: v, titolo: t, nota: n ?? undefined, checked: S.servizi.includes(v as Servizio) }));
      ul.appendChild(li);
    });
    corpo.appendChild(ul);
  }

  if (id === 'sito') {
    domanda.textContent = 'Com’è fatto il sito?';
    sotto.textContent = 'Scegli la struttura, poi aggiungi solo le funzioni che ti servono davvero.';
    const fs = el('fieldset', '');
    fs.style.border = '0';
    fs.style.padding = '0';
    fs.style.margin = '0';
    fs.appendChild(el('legend', 'sr-solo', 'Struttura del sito'));
    const ul = el('ul', 'wizard-opzioni');
    [
      { v: 'singola', t: 'Pagina singola', n: 'Tutto l’essenziale in una pagina', p: C.base.singola },
      { v: 'multi', t: 'Sito a più pagine', n: 'Storia, servizi, galleria, contatti', p: C.base.multi },
      { v: 'offerta', t: 'Offerta Tutto incluso', n: `Tutte le funzioni, logo e 3 modifiche gratuite · ${C.offerta.prezzo}€ tutto incluso`, p: 0 },
    ].forEach((o) => {
      const li = document.createElement('li');
      li.appendChild(opzione({ tipo: 'radio', nome: 'struttura', valore: o.v, titolo: o.t, nota: o.n, prezzo: o.p, checked: S.struttura === o.v }));
      ul.appendChild(li);
    });
    fs.appendChild(ul);
    corpo.appendChild(fs);
  }

  if (id === 'funzioni') {
    domanda.textContent = altro() ? 'Funzioni consigliate:' : `Funzioni per ${S.tipo}:`;
    sotto.textContent = 'Solo se utili, altrimenti vai avanti.';
    listaOpzioni(corpo, { nome: 'funzioni', voci: funzioniPerTipo(), selezionati: S.funzioni, conPrezzo: true });
  }

  if (id === 'funzioni-extra') {
    const tutte = extraGenerali();
    domanda.textContent = 'Funzioni extra per il sito?';
    sotto.textContent = 'Solo se utili, altrimenti vai avanti.';
    listaOpzioni(corpo, { nome: 'funzioni', voci: tutte, selezionati: S.funzioni, conPrezzo: true });
  }

  if (id === 'pagine') {
    domanda.textContent = 'Quali pagine vuoi nel sito?';
    sotto.textContent = 'Solo se utili, altrimenti vai avanti.';
    listaOpzioni(corpo, { nome: 'pagine', voci: C.pageOptions, selezionati: S.pagine, conPrezzo: true });
  }

  if (id === 'foto') {
    domanda.textContent = 'E le foto da mettere sul sito?';
    sotto.textContent = 'Scegli come procurarle.';
    const ul = el('ul', 'wizard-opzioni');
    ul.setAttribute('role', 'group');
    ul.setAttribute('aria-label', 'Foto per il sito');
    Object.entries(C.photoPrices).forEach(([nomeVoce, prezzo]) => {
      const li = document.createElement('li');
      li.appendChild(opzione({ tipo: 'radio', nome: 'foto', valore: nomeVoce, titolo: nomeVoce, prezzo, checked: S.foto === nomeVoce }));
      ul.appendChild(li);
    });
    corpo.appendChild(ul);
  }

  if (id === 'social-tutto') {
    domanda.textContent = 'Dove ti facciamo vedere?';
    sotto.textContent = 'Tocca i loghi dei social dove vuoi comparire.';
    const LOGHI: Record<string, string> = {
      Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="iggrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FEDA75"/><stop offset=".35" stop-color="#FA7E1E"/><stop offset=".6" stop-color="#D62976"/><stop offset=".85" stop-color="#962FBF"/><stop offset="1" stop-color="#4F5BD5"/></linearGradient></defs><path fill="url(#iggrad)" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>',
      Facebook: '<svg viewBox="0 0 24 24" fill="#0866FF" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>',
      TikTok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill="#25F4EE" transform="translate(1.1,1.1)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#FE2C55" transform="translate(-1.1,-1.1)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#000000" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    };
    const riga = el('div', 'canali-riga');
    riga.setAttribute('role', 'group');
    riga.setAttribute('aria-label', 'Social dove pubblicare');
    C.channels.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'canale';
      b.setAttribute('aria-pressed', S.canali.includes(c) ? 'true' : 'false');
      b.innerHTML = (LOGHI[c] || '') + '<span>' + c + '</span>';
      b.addEventListener('click', () => {
        const i = S.canali.indexOf(c);
        if (i >= 0) S.canali.splice(i, 1); else S.canali.push(c);
        b.setAttribute('aria-pressed', S.canali.includes(c) ? 'true' : 'false');
      });
      riga.appendChild(b);
    });
    corpo.appendChild(riga);
    titoloGruppo(`Contenuti${S.tipo && !altro() ? ` · ${S.tipo}` : ''}`, false);
    listaOpzioni(corpo, { nome: 'socialExtra', voci: socialContenuti(), selezionati: S.socialExtra, conPrezzo: true });
    titoloGruppo(`Video · ${C.videoPrice}€ l'uno`, false);
    const ulQ = el('ul', 'wizard-opzioni');
    const liQ = document.createElement('li');
    const qta = el('div', 'video-qta');
    const meno = document.createElement('button');
    meno.type = 'button';
    meno.textContent = '−';
    meno.setAttribute('aria-label', 'Un video in meno');
    const num = el('span', 'video-qta-num', '');
    num.setAttribute('aria-live', 'polite');
    const piu = document.createElement('button');
    piu.type = 'button';
    piu.textContent = '+';
    piu.setAttribute('aria-label', 'Un video in più');
    const aggiornaQta = () => {
      num.textContent = S.videoQty === 0 ? '0' : (S.videoQty === 1 ? `1 video · ${C.videoPrice}€` : `${S.videoQty} video · ${S.videoQty * C.videoPrice}€`);
      meno.disabled = S.videoQty <= 0;
      piu.disabled = S.videoQty >= 30;
    };
    meno.addEventListener('click', () => { if (S.videoQty > 0) { S.videoQty--; aggiornaQta(); } });
    piu.addEventListener('click', () => { if (S.videoQty < 30) { S.videoQty++; aggiornaQta(); } });
    qta.appendChild(meno);
    qta.appendChild(num);
    qta.appendChild(piu);
    liQ.appendChild(qta);
    ulQ.appendChild(liQ);
    corpo.appendChild(ulQ);
    aggiornaQta();
  }

  if (id === 'grafiche-materiali') {
    domanda.textContent = `Quali materiali${S.tipo && !altro() ? ` per ${S.tipo}` : ''}?`;
    sotto.textContent = 'Solo quelli che userai davvero, altrimenti vai avanti. Solo design, stampa esclusa.';
    const visibili = designVisibili();
    listaOpzioni(corpo, { nome: 'graficheExtra', voci: designPerTipo().filter((v) => visibili.has(v.name)), selezionati: S.graficheExtra, conPrezzo: true });
    listaOpzioni(corpo, { nome: 'graficheExtra', voci: designGenerici().filter((v) => visibili.has(v.name)), selezionati: S.graficheExtra, conPrezzo: true });
  }

  if (id === 'obiettivi-tempi') {
    domanda.textContent = 'Cosa vuoi ottenere?';
    sotto.style.display = 'none';
    listaOpzioni(corpo, { nome: 'obiettivi', voci: C.goals, selezionati: S.obiettivi, conPrezzo: false });
    titoloGruppo('Quando vorresti iniziare?', false, true);
    const ul2 = el('ul', 'wizard-opzioni');
    ul2.setAttribute('role', 'group');
    ul2.setAttribute('aria-label', 'Tempi desiderati');
    C.timings.forEach((t) => {
      const li = document.createElement('li');
      li.appendChild(opzione({ tipo: 'radio', nome: 'tempi', valore: t, titolo: t, checked: S.tempi === t }));
      ul2.appendChild(li);
    });
    corpo.appendChild(ul2);
  }

  if (id === 'riepilogo') {
    domanda.textContent = 'Controlla i dati';
    sotto.textContent = '';
    sotto.style.display = 'none';
    const dl = el('dl', 'wizard-riepilogo');
    const riga = (k: string, v: string, impilata?: boolean) => {
      if (!v) return;
      const d = el('div', 'wizard-riga' + (impilata ? ' wizard-riga-sotto' : ''));
      d.appendChild(el('dt', '', k));
      d.appendChild(el('dd', '', v));
      dl.appendChild(d);
    };
    const nomiServizi = S.servizi.map((s) => SERVIZI_INFO[s][0]).join(' + ');
    riga('Attività', `${S.nome} · ${tipoLabel()}`);
    riga('Servizi', nomiServizi);
    if (ha('sito')) {
      if (inOfferta()) {
        riga('Sito', `${C.offerta.nome} · ${C.offerta.prezzo}€`);
        riga('Include', 'Tutte le funzioni, tutti gli extra, tutte le pagine', true);
        riga('Foto', 'Le scattiamo noi ad Asti');
        riga('Logo', 'Nuovo o rifacimento');
        riga('Revisioni', '3 modifiche gratuite');
      } else {
        riga('Sito', S.struttura === 'multi' ? `Più pagine · ${C.base.multi}€` : `Pagina singola · ${C.base.singola}€`);
        if (S.funzioni.length) riga('Funzioni', ordina(S.funzioni).join(', '), true);
        if (S.pagine.length) riga('Pagine', ordina(S.pagine).join(', '), true);
        if (S.foto) riga('Foto', S.foto);
      }
    }
    if (ha('grafiche')) {
      const scelte = S.graficheExtra.filter((n) => designVisibili().has(n));
      riga('Grafiche', scelte.join(', ') || 'Da decidere insieme');
    }
    if (ha('social')) {
      const vociSocial = [S.canali.join(', '), S.socialExtra.join(', ')].filter(Boolean).join(' · ');
      riga('Social media', vociSocial || 'Da decidere insieme');
      if (S.videoQty) riga('Video', `${S.videoQty} video · ${S.videoQty * C.videoPrice}€`);
    }
    if (S.obiettivi.length) riga('Obiettivi', S.obiettivi.join(', '));
    riga('Tempi', S.tempi);
    corpo.appendChild(dl);
  }

  if (id === 'invia') {
    domanda.textContent = 'Ecco la tua stima. Invia';
    sotto.textContent = 'Stima da concordare insieme prima di iniziare. Inviala su WhatsApp o email. Senza impegno.';
    const box = el('div', 'wizard-totale-finale');
    box.appendChild(el('p', 'k', 'Stima indicativa'));
    const cifra = el('p', 'v', `€ ${stima()}`);
    cifra.setAttribute('aria-live', 'polite');
    box.appendChild(cifra);
    box.appendChild(el('p', 'd', 'Prezzo concordato insieme prima di iniziare. Il sito resta tuo, nessun canone obbligatorio.'));
    if (S.struttura === 'offerta') box.appendChild(el('p', 'd', `Offerta Tutto incluso: ${C.offerta.revisioni} modifiche gratuite e logo (nuovo o rifacimento) compresi.`));
    box.appendChild(el('p', 'd', 'Anticipo di 30€ già compreso nella stima: lo versi per iniziare, il resto alla consegna.'));
    const invia = el('a', 'btn btn-wa', 'Invia su WhatsApp');
    invia.setAttribute('data-track', 'preventivo-invia');
    invia.id = 'w-invia';
    invia.target = '_blank';
    invia.rel = 'noopener noreferrer';
    box.appendChild(invia);
    const inviaMail = el('a', 'btn btn-fantasma', isPC ? 'Copia email' : 'Invia via email');
    inviaMail.id = 'w-invia-mail';
    inviaMail.setAttribute('data-track', 'preventivo-invia-email');
    inviaMail.addEventListener('click', (e) => {
      e.preventDefault();
      const manc = mancantiRiepilogo();
      if (!S.privacy || manc.length) {
        mostraErrore(!S.privacy ? 'Accetta i termini e le condizioni per inviare la richiesta.' : `Per inviare manca ancora: ${manc.join(', ')}. Torna indietro e completa.`);
        return;
      }
      const testo = messaggio().replace(/\*/g, '');
      if (isPC) {
        // Da PC spesso manca un client email: copiamo il messaggio e mostriamo a chi inviarlo
        const fatto = () => {
          inviaMail.textContent = 'Copiato! Scrivici a: ' + mailAddr();
          setTimeout(aggiornaInvia, 3000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(testo).then(fatto).catch(fatto);
        } else {
          fatto();
        }
        return;
      }
      // La mail lunga a volte non parte: copiamo il testo e poi apriamo comunque l'email
      // Apertura sincrona nel gesto del clic: così la mail parte davvero
      const a = document.createElement('a');
      a.href = `mailto:${mailAddr()}?subject=` + encodeURIComponent('Richiesta sito web') + '&body=' + encodeURIComponent(testo);
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(testo).catch(() => {});
      }
    });
    box.appendChild(inviaMail);
    corpo.appendChild(box);

    const priv = el('label', 'privacy-riga');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = 'f-privacy';
    cb.checked = S.privacy;
    cb.addEventListener('change', () => { S.privacy = cb.checked; aggiornaInvia(); nascondiErrore(); });
    priv.appendChild(cb);
    const span = el('span', '', 'Ho letto e accetto i termini e le condizioni: ');
    const link = el('a', 'link-freccia', 'Termini e condizioni');
    link.href = '/note-legali#termini';
    span.appendChild(link);
    span.appendChild(document.createTextNode('. *'));
    priv.appendChild(span);
    corpo.appendChild(priv);
    aggiornaInvia();
  }

  aggiornaCromo(true);
}

// ---------- Messaggio WhatsApp/email, invio, validazione ----------

/** Testo anonimato col formato WhatsApp (asterischi = grassetto). */
function messaggio() {
  const L = [
    '*Ciao Trebla!*',
    'Vorrei un preventivo per la mia attività.',
    '',
    `• *Attività:* ${S.nome}`,
    `• *Tipo:* ${tipoLabel()}`,
    `• *Servizi:* ${S.servizi.map((s) => SERVIZI_INFO[s][0]).join(' + ')}`,
  ];
  if (ha('sito')) {
    if (inOfferta()) {
      L.push(
        '',
        '*SITO*',
        `• *Offerta:* ${C.offerta.nome} (${C.offerta.prezzo}€)`,
        '• *Include:* tutte le funzioni, tutti gli extra, tutte le pagine',
        '• *Foto:* le scattiamo noi',
        '• *Logo:* nuovo o rifacimento',
        '• *3 modifiche gratuite*'
      );
    } else {
      L.push(
        '',
        '*SITO*',
        `• *Struttura:* ${S.struttura === 'multi' ? 'Più pagine' : 'Pagina singola'}`,
        `• *Funzioni:* ${S.funzioni.length ? ordina(S.funzioni).join(', ') : 'Standard'}`,
        `• *Pagine:* ${S.pagine.length ? ordina(S.pagine).join(', ') : 'Standard'}`,
        `• *Foto:* ${S.foto || 'Da decidere'}`
      );
    }
  }
  if (ha('grafiche')) {
    L.push(
      '',
      '*GRAFICHE*',
      `• *Materiali:* ${S.graficheExtra.filter((n) => designVisibili().has(n)).join(', ') || 'Da decidere'}`
    );
  }
  if (ha('social')) {
    L.push(
      '',
      '*SOCIAL MEDIA*',
      `• *Canali:* ${S.canali.join(', ') || 'Da decidere'}`,
      `• *Contenuti:* ${S.socialExtra.join(', ') || 'Da decidere'}`
    );
    if (S.videoQty) L.push(`• *Video:* ${S.videoQty} video`);
  }
  L.push(
    '',
    `• *Obiettivi:* ${S.obiettivi.join(', ') || 'Da decidere'}`,
    `• *Tempi:* ${S.tempi || 'Da decidere'}`,
    ...(UTM.utm_source ? [`• *Fonte:* ${[UTM.utm_source, UTM.utm_medium, UTM.utm_campaign].filter(Boolean).join(' / ')}`] : []),
    `• *Anticipo:* 30€ compresi nella stima`,
    '',
    `*STIMA INDICATIVA:* ${stima()} €`
  );
  let msg = L.join('\n');
  if (msg.length > 1800) msg = msg.slice(0, 1780) + '\n…(continua a voce)';
  return msg;
}

function aggiornaInvia() {
  const a = $<HTMLAnchorElement>('w-invia');
  if (!a) return;
  const mancanti = mancantiRiepilogo();
  if (!S.privacy || mancanti.length) {
    a.setAttribute('aria-disabled', 'true');
    a.style.opacity = '0.55';
    a.href = `https://wa.me/${waNum()}?text=` + encodeURIComponent('Ciao Trebla! Non so cosa scegliere per il preventivo, mi aiutate su WhatsApp?');
    a.textContent = mancanti.length && S.privacy ? `Manca: ${mancanti.join(', ')}` : S.privacy ? 'Invia su WhatsApp' : 'Accetta i termini per inviare';
  } else {
    a.removeAttribute('aria-disabled');
    a.style.opacity = '';
    a.textContent = 'Invia su WhatsApp';
    a.href = `https://wa.me/${waNum()}?text=` + encodeURIComponent(messaggio());
  }
  const m = $<HTMLAnchorElement>('w-invia-mail');
  if (m) {
    if (!S.privacy || mancanti.length) {
      m.setAttribute('aria-disabled', 'true');
      m.style.opacity = '0.55';
      m.href = '#';
      m.textContent = !S.privacy ? 'Accetta i termini per inviare' : 'Completa i passi mancanti';
    } else {
      m.removeAttribute('aria-disabled');
      m.style.opacity = '';
      m.textContent = isPC ? 'Copia email' : 'Invia via email';
      m.href = `mailto:${mailAddr()}?subject=` + encodeURIComponent('Richiesta sito web') + '&body=' + encodeURIComponent(messaggio().replace(/\*/g, ''));
    }
  }
}

function mancantiRiepilogo() {
  const m = [];
  if (S.nome.trim().length < 2) m.push('il nome');
  if (!S.categoria) m.push('il settore');
  if (!S.tipo || (altro() && S.tipoAltro.trim().length < 2)) m.push('il tipo');
  if (!S.servizi.length) m.push('un servizio');
  if (ha('sito') && !S.struttura) m.push('la struttura del sito');
  if (ha('sito') && !inOfferta() && !S.foto) m.push('le foto');
  return m;
}

function mostraErrore(t: string) {
  errore.textContent = t;
  errore.hidden = false;
  errore.scrollIntoView({ block: 'nearest' });
}
function nascondiErrore() {
  errore.hidden = true;
  errore.textContent = '';
}

function valido(id: string) {
  if (id === 'nome') return S.nome.trim().length >= 2 ? '' : 'Scrivi il nome della tua attività per continuare.';
  if (id === 'categoria') return S.categoria ? '' : 'Scegli il settore della tua attività.';
  if (id === 'tipo') return (S.tipo && (!altro() || S.tipoAltro.trim().length >= 2)) ? '' : 'Scegli il tipo di attività, oppure usa Altro e descrivila.';
  if (id === 'altro-descrivi') return S.tipoAltro.trim().length >= 2 ? '' : 'Descrivi in due parole la tua azienda per continuare.';
  if (id === 'altro-invia') return '';
  if (id === 'servizi') return S.servizi.length ? '' : 'Scegli almeno un servizio: sito, grafiche o social media.';
  if (id === 'sito') return S.struttura ? '' : 'Scegli la struttura del sito: pagina singola, più pagine o offerta tutto incluso.';
  if (id === 'funzioni' || id === 'funzioni-extra' || id === 'pagine') return '';
  if (id === 'foto') return S.foto ? '' : 'Scegli come procurare le foto per il sito.';
  if (id === 'social-tutto') return (S.canali.length || S.socialExtra.length || S.videoQty) ? '' : 'Scegli almeno un canale, un contenuto o dei video, oppure togli Social media dai servizi.';
  if (id === 'grafiche-materiali') return S.graficheExtra.length ? '' : 'Scegli almeno un materiale, oppure togli Grafiche dai servizi.';
  if (id === 'obiettivi-tempi') return '';
  if (id === 'riepilogo' || id === 'invia') return '';
  return '';
}

function aggiornaCromo(scroll: boolean) {
  const f = flusso();
  riemp.style.width = `${((idx + 1) / f.length) * 100}%`;
  $('w-barra')?.setAttribute('aria-valuenow', String(Math.round(((idx + 1) / f.length) * 100)));
  indietro.hidden = idx === 0;
  const id = f[idx]!;
  avanti.textContent = id === 'invia' ? 'Torna su per inviare ↑' : id === 'riepilogo' ? 'Conferma e invia →' : id === 'obiettivi-tempi' ? 'Salta →' : id === 'altro-descrivi' ? 'Continua il preventivo →' : 'Avanti →';
  avanti.hidden = id === 'altro-invia' || id === 'invia';
  if (id === 'invia') aggiornaInvia();
  if (scroll) {
    domanda.focus({ preventScroll: true });
    document.querySelector('.wizard-corpo')?.scrollTo({ top: 0 });
  }
}

function vaiAvanti() {
  const f = flusso();
  const id = f[idx]!;
  if (id === 'invia') {
    if (!S.privacy) {
      mostraErrore('Accetta i termini e le condizioni per inviare la richiesta.');
      $('f-privacy')?.focus();
      return;
    }
    const m = mancantiRiepilogo();
    if (m.length) {
      mostraErrore(`Per inviare manca ancora: ${m.join(', ')}. Torna indietro e completa.`);
      return;
    }
    $('w-invia')?.focus();
    return;
  }
  const err = valido(id);
  if (err) {
    mostraErrore(err);
    return;
  }
  idx = Math.min(f.length - 1, idx + 1);
  if (!tracciatoAvvio) { tracciatoAvvio = true; track('preventivo-avvio'); }
  renderizza();
}

avanti.addEventListener('click', vaiAvanti);
indietro.addEventListener('click', () => {
  if (idx > 0) { idx--; renderizza(); }
});

// Preselezione da ?servizi=sito,grafiche,social
(function init() {
  try {
    const q = new URLSearchParams(window.location.search);
    const pre = [...new Set(
      String(q.get('servizi') || q.get('services') || '')
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .map((s) => {
          if (['sito', 'site', 'siti-web', 'sito-web', 'siti'].includes(s)) return 'sito';
          if (['social', 'social-media'].includes(s)) return 'social';
          if (['grafiche', 'design', 'grafica'].includes(s)) return 'grafiche';
          return null;
        })
        .filter((x): x is Servizio => x !== null)
    )];
    if (pre.length) S.servizi = pre;
    // Ingresso diretto offerta da ?offerta=1: sito e struttura già scelti, via i passi decisi
    if (q.get('offerta') === '1') {
      S.servizi = ['sito'];
      S.struttura = 'offerta';
      offertaDiretta = true;
    }
  } catch (e) { /* query non valida: si parte da zero */ }
  renderizza();
})();
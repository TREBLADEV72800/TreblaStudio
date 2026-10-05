export interface Faq {
  q: string;
  a: string;
  cta?: { href: string; label: string }[];
  ctaAccapo?: boolean;
}

export const FAQS: Faq[] = [
  {
    q: 'Offerta Tutto incluso da 590€?',
    a: 'Sito a più pagine completo (tutte le funzioni, tutti gli extra, tutte le pagine), foto scattate da noi ad Asti, logo nuovo o rinnovato e 5 revisioni, anticipo di 30 € escluso. La scegli nel preventivo alla voce struttura del sito.',
    cta: [{ href: '/preventivo', label: 'Approfitta dell’offerta →' }],
  },
  {
    q: 'Quanto costa un sito?',
    a: 'Pagina singola da 300 €, sito a più pagine da 400 €. Le funzioni extra, come prenotazioni su WhatsApp, vetrina ordinabile e copywriting completo, hanno un prezzo a parte, sempre concordato prima di iniziare. Lo vedi da solo nel preventivo in 2 minuti.',
    cta: [{ href: '/preventivo', label: 'Fai il preventivo in 2 minuti →' }],
  },
  {
    q: 'In quanto tempo è online?',
    a: 'Dipende dai materiali: se hai già testi, foto e logo andiamo veloci, in genere una decina di giorni. Se partiamo da zero, definiamo insieme una data realistica prima di iniziare.',
    cta: [{ href: '/preventivo', label: 'Inizia dal preventivo →' }],
  },
  {
    q: 'Come funziona, in pratica?',
    a: 'Ci racconti l’attività su WhatsApp o col preventivo, ti facciamo una proposta chiara con prezzo e tempi, costruiamo il sito, lo rivedi due volte, poi lo pubblichiamo. Tu nel frattempo continui a lavorare.',
    cta: [{ href: '/preventivo', label: 'Fai il preventivo in 2 minuti →' }],
  },
  {
    q: 'Non ho foto né testi. È un problema?',
    a: 'No, è la situazione più comune. I testi li scriviamo insieme partendo da come lavori davvero, e per le foto possiamo venire sul posto ad Asti o usare immagini d’archivio. Lo scegli nel preventivo.',
    cta: [{ href: '/preventivo', label: 'Sceglilo nel preventivo →' }],
  },
  {
    q: 'Fate anche grafiche e social media?',
    a: 'Sì, ma solo se ti servono: logo, biglietti, volantini, profili sistemati e contenuti regolari. Il sito resta il punto di partenza. Il resto si aggiunge quando vuoi. Nota: le grafiche sono solo design, non stampiamo né carte, né brochure, né maglie, né niente: ti consegniamo i file pronti da portare dove vuoi.',
    cta: [{ href: '/preventivo', label: 'Aggiungile nel preventivo →' }],
    ctaAccapo: true,
  },
  {
    q: 'Devo pagare un canone ogni anno?',
    a: 'No, a noi non devi nessun canone obbligatorio. Il sito è tuo. Restano solo i costi vivi verso i fornitori, dominio e hosting, che paghi direttamente a loro, ti diciamo prima quanto sono.',
  },
  {
    q: 'Come funziona l’anticipo di 30 €?',
    a: 'Per iniziare serve un anticipo di 30 €, escluso dalla stima: conferma l’avvio del lavoro. Il resto lo paghi alla consegna, senza altri costi.',
  },
  {
    q: 'Posso chiedere modifiche dopo che è online?',
    a: 'Sì. Due revisioni sono incluse prima della pubblicazione. Dopo, le modifiche te le facciamo noi su richiesta: ti diciamo prima se e quanto costano.',
  },
  {
    q: 'Lavorate solo ad Asti?',
    a: 'Operiamo solo ad Asti: veniamo sul posto, in città.',
  },
];

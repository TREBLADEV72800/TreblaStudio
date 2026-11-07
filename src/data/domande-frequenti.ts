import { ANTICIPO, BASE_PRICES, DESIGN_OPTIONS, OFFERTA_SITO, RATE_SALDO } from './prezzi';

const prezziGrafiche = DESIGN_OPTIONS.map((voce) => voce.price);

export interface Faq {
  q: string;
  a: string;
  cta?: { href: string; label: string }[];
  ctaAccapo?: boolean;
}

export const FAQS: Faq[] = [
  {
    q: `Offerta Tutto incluso da ${OFFERTA_SITO.prezzo}€?`,
    a: `Sito a più pagine con funzioni incluse, pagine definite insieme, foto scattate da noi ad Asti, logo nuovo o rinnovato e ${OFFERTA_SITO.revisioni} modifiche gratuite. Costa ${OFFERTA_SITO.prezzo}€; grafiche e social aggiunti restano extra. L’anticipo di ${ANTICIPO}€ è già compreso. La scegli nel preventivo alla voce struttura del sito.`,
    cta: [{ href: '/preventivo/?offerta=1', label: 'Approfitta dell’offerta →' }],
  },
  {
    q: 'Quanto costa un sito?',
    a: `Pagina singola ${BASE_PRICES.singola}€, sito a più pagine da ${BASE_PRICES.multi}€. Le funzioni del sito, come prenotazioni su WhatsApp, vetrina ordinabile e copywriting, sono comprese. Grafiche, social e foto hanno un prezzo a parte, sempre concordato prima di iniziare.`,
    cta: [{ href: '/preventivo/', label: 'Fai il preventivo in 2 minuti →' }],
  },
  {
    q: 'In quanto tempo è online?',
    a: 'Dipende dai materiali: se hai già testi, foto e logo andiamo veloci, in genere una decina di giorni. Se partiamo da zero, definiamo insieme una data realistica prima di iniziare.',
    cta: [{ href: '/preventivo/', label: 'Inizia dal preventivo →' }],
  },
  {
    q: 'Come funziona, in pratica?',
    a: 'Ci racconti l’attività su WhatsApp o col preventivo, ti facciamo una proposta chiara con prezzo e tempi, costruiamo il sito, lo rivedi due volte, poi lo pubblichiamo. Tu nel frattempo continui a lavorare.',
    cta: [{ href: '/preventivo/', label: 'Fai il preventivo in 2 minuti →' }],
  },
  {
    q: 'Non ho foto né testi. È un problema?',
    a: 'No, è la situazione più comune. I testi li scriviamo insieme partendo da come lavori davvero, e per le foto possiamo venire sul posto ad Asti o usare immagini d’archivio. Lo scegli nel preventivo.',
    cta: [{ href: '/preventivo/', label: 'Sceglilo nel preventivo →' }],
  },
  {
    q: 'Fate anche grafiche e social media?',
    a: 'Sì. Puoi aggiungere singole voci di grafica o social al preventivo: i prezzi sono indicati per voce, non costituiscono un canone mensile. La stampa e la produzione fisica non sono incluse: consegniamo i file grafici.',
    cta: [{ href: '/preventivo/', label: 'Aggiungile nel preventivo →' }],
    ctaAccapo: true,
  },
  {
    q: 'Devo pagare un canone ogni anno?',
    a: 'No, a noi non devi nessun canone obbligatorio. Il sito è tuo, l’hosting è completamente gratuito e la configurazione del dominio è gratis.',
  },
  {
    q: `Come funziona l’anticipo di ${ANTICIPO}€?`,
    a: `Per iniziare serve un anticipo di ${ANTICIPO}€, già compreso nella stima: conferma l’avvio del lavoro e non si restituisce se cambi idea. Il resto lo paghi alla consegna o in ${RATE_SALDO} rate, senza altri costi.`,
  },
  {
    q: `Posso pagare in ${RATE_SALDO} rate?`,
    a: `Sì. Dopo l’anticipo di ${ANTICIPO}€, il saldo si può dividere in ${RATE_SALDO} rate. Le scadenze le concordiamo prima di iniziare e le scriviamo nella proposta: sai sempre quanto e quando pagare.`,
  },
  {
    q: 'Chiedo modifiche dopo che è online?',
    a: 'Sì. Due giri di revisioni sono inclusi prima della pubblicazione. Dopo, le modifiche te le facciamo noi su richiesta: ti diciamo prima se e quanto costano.',
  },
  {
    q: 'Lavorate solo ad Asti?',
    a: 'Operiamo solo ad Asti: veniamo sul posto, in città.',
  },
  {
    q: 'Posso aggiornare da solo il sito?',
    a: 'Il sito attuale è statico e non include un pannello di gestione. Gli aggiornamenti li concordiamo e li realizziamo noi, comunicando prima l’eventuale costo.',
  },
  {
    q: 'Il dominio resta di mia proprietà?',
    a: 'Sì. La configurazione è inclusa, ma il dominio va registrato a tuo nome. Se ha un costo, il pagamento è al registrar scelto da te.',
  },
  {
    q: 'Quante revisioni sono incluse?',
    a: `Due giri di correzioni prima della pubblicazione. L’Offerta Tutto incluso comprende ${OFFERTA_SITO.revisioni} modifiche gratuite. Altri interventi si concordano prima.`,
  },
  {
    q: 'Offrite manutenzione continuativa?',
    a: 'Non c’è un piano di manutenzione obbligatorio. Se vuoi aggiornamenti o assistenza, descrivici l’intervento e ti comunichiamo il costo prima di procedere.',
  },
  {
    q: 'Potete rifare un sito che esiste già?',
    a: 'Sì, possiamo valutare un restyling. Prima controlliamo il sito, i contenuti da mantenere e gli accessi disponibili, poi prepariamo una proposta con prezzo e tempi.',
  },
  {
    q: 'Ricevo fattura?',
    a: 'La modalità di fatturazione e i dati fiscali vengono indicati nella proposta. Prima di confermare il lavoro puoi chiederci ogni dettaglio amministrativo.',
  },
  {
    q: 'Il sito è accessibile?',
    a: 'Progettiamo pagine leggibili e navigabili, con attenzione a contrasto, tastiera e movimento ridotto. Non dichiariamo una certificazione di conformità: dipende anche dai contenuti e dalle verifiche sul progetto.',
  },
  {
    q: 'Il sito usa cookie?',
    a: 'Il sito Trebla non usa cookie di profilazione o strumenti pubblicitari. Per il tuo sito valutiamo insieme le funzioni inserite e gli eventuali servizi esterni, così da descriverli correttamente nell’informativa.',
  },
  {
    q: 'In quali zone lavorate?',
    a: 'Lavoriamo ad Asti e veniamo sul posto in città, su appuntamento. Per attività fuori Asti verifichiamo il progetto prima di confermare.',
  },
  {
    q: 'Quanto costa una grafica?',
    a: `Le voci del catalogo costano da ${Math.min(...prezziGrafiche)}€ a ${Math.max(...prezziGrafiche)}€: il prezzo dipende dal materiale. La stampa non è inclusa.`,
  },
  {
    q: 'I social garantiscono follower o vendite?',
    a: 'No. Prepariamo profili e contenuti, ma non promettiamo follower, visualizzazioni o vendite: dipendono da fattori che non controlliamo.',
  },
  {
    q: 'Posso chiedere solo grafiche o social?',
    a: 'Sì. Puoi selezionare le voci che ti servono nel preventivo, senza acquistare un sito.',
  },
  {
    q: 'Fate siti con login o pagamenti online?',
    a: 'No. Non facciamo siti con accessi utenti, aree riservate o pagamenti online: facciamo siti vetrina chiari per farti trovare e contattare. Se ti serve vendere online, te lo diciamo subito e non ti facciamo perdere tempo.',
  },
];

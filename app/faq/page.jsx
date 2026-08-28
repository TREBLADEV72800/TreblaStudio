import Link from 'next/link';
export const metadata = {
  title: 'FAQ — Trebla Studio | Asti',
  description: 'Domande frequenti su tempi, revisioni, dominio, foto, hosting e abbonamento per il tuo sito.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — Trebla Studio | Asti',
    description: 'Domande frequenti su tempi, revisioni, dominio, foto, hosting e abbonamento per il tuo sito.',
    url: '/faq',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Trebla Studio | Asti',
    description: 'Domande frequenti su tempi, revisioni, dominio, foto, hosting e abbonamento per il tuo sito.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  const whatsapp='393518924471';
  return (
    <section className="section faq-section">
      <p className="section-label">Domande frequenti</p>
      <div className="section-intro">
        <h1>Dubbi o domande?<br /><em>Ecco le risposte.</em></h1>
        <p>Tutto quello che c'è da sapere prima di iniziare il tuo progetto.</p>
      </div>
      <div className="faq-list" style={{ marginTop: '18px' }}>
        <div className="faq-card"><div className="faq-header"><h3>E se in futuro voglio una modifica? E i bug?</h3></div><p>Sono incluse 2 revisioni (anche correzioni testo) prima della pubblicazione. Dopo, modifiche future costano 15 € cad. e verranno usate come prova nel portfolio Trebla Studio (previo consenso). I bug li sistemiamo gratis, previa nostra valutazione che si tratti effettivamente di un bug.</p></div>
        <div className="faq-card"><div className="faq-header"><h3>Quanto tempo ci vuole per realizzare il sito?</h3></div><p>Per i progetti essenziali, circa 10 giorni lavorativi garantiti dopo aver ricevuto tutti i materiali (testi, foto, logo) e le tue approvazioni. Se i contenuti arrivano a scaglioni o servono più revisioni, i tempi si allungano di conseguenza.</p></div>
        <div className="faq-card"><div className="faq-header"><h3>C'è un abbonamento mensile da pagare?</h3></div><p>No, nessun abbonamento obbligatorio a Trebla. Il sito è di tua proprietà (codice, testi e grafiche consegnate). Restano a parte i costi tecnici ricorrenti: dominio (pagato direttamente a Vercel/hosting, ~10-20 €/anno variabile) e hosting se scegli di mantenerlo su Vercel. Backup, aggiornamenti e modifiche future sono su richiesta (vedi Assistenza).</p></div>
        <div className="faq-card"><div className="faq-header"><h3>L'acconto è incluso nel prezzo?</h3></div><p>L'acconto fa parte del prezzo finale e serve a confermare l'avvio. Il resto alla consegna. Dettagli su tempi e modalità vengono concordati prima di iniziare.</p></div>
        <div className="faq-card"><div className="faq-header"><h3>Il dominio è incluso nel prezzo?</h3></div><p>No, il dominio (per esempio www.tuaattività.it) non è incluso nel preventivo. Se non ce l'hai già, ti aiutiamo a sceglierlo e registrarlo a tuo nome: il costo annuale del dominio varia in base al tipo di dominio scelto e viene pagato direttamente a Vercel, la piattaforma su cui pubblichiamo il sito, quindi non passa da noi.</p></div>
        <div className="faq-card"><div className="faq-header"><h3>Fate siti anche per chi ne ha già uno?</h3></div><p>No, lavoriamo solo con attività che non hanno ancora un sito web: il nostro punto di forza è proprio partire da zero e costruire insieme la tua presenza online, senza rifacimenti di progetti fatti da altri.</p></div>
        <div className="faq-card"><div className="faq-header"><h3>Se non ho le foto come facciamo?</h3></div><p>Nessun problema: possiamo venire direttamente presso la tua attività a scattare foto professionali.</p></div>
        <div className="faq-card"><div className="faq-header"><h3>Potete aiutarci a organizzare un evento?</h3></div><p>Sì! Tramite la nostra etichetta discografica Pikete Label possiamo organizzare piccoli eventi con artisti per inaugurazioni, serate a tema o per sponsorizzare la tua attività.</p></div>
      </div>
      <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link className="button button-main" href="/preventivo">Configura preventivo in 2 min</Link>
        <a className="button button-quiet" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ background: '#fff' }}>Scrivici su WhatsApp</a>
      </div>
    </section>
  );
}

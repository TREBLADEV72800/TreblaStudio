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
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section faq-section">
      <p className="section-label">Domande frequenti</p>
      <div className="section-intro">
        <h1>Dubbi o domande?<br /><em>Ecco le risposte.</em></h1>
        <p>Tutto quello che c'è da sapere prima di iniziare il tuo progetto.</p>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '18px' }}>Le risposte sono disponibili nella pagina interattiva — apri le domande per leggere i dettagli. Per un’esperienza completa visita il sito con JavaScript attivo.</p>
      <div className="faq-list" style={{ marginTop: '18px' }}>
        <div className="faq-card"><div className="faq-header"><h3>E se in futuro voglio una modifica? E i bug?</h3></div><p>Sono incluse 2 revisioni prima della pubblicazione. Dopo, modifiche future su richiesta. I bug li sistemiamo gratis previa valutazione.</p></div>
        <div className="faq-card"><div className="faq-header"><h3>Quanto tempo ci vuole?</h3></div><p>Circa 10 giorni lavorativi dopo aver ricevuto tutti i materiali e le approvazioni.</p></div>
        <div className="faq-card"><div className="faq-header"><h3>C'è un abbonamento mensile?</h3></div><p>No, nessun canone obbligatorio. Il sito è tuo. Dominio e hosting a parte.</p></div>
      </div>
    </section>

  );
}

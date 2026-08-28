import Link from 'next/link';
export const metadata = {
  title: 'Portfolio — Trebla Studio | Asti',
  description: 'Un progetto pubblicato e curato: Pikete Label, etichetta musicale di Asti/Alessandrino. Sito vetrina responsive.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio — Trebla Studio | Asti',
    description: 'Un progetto pubblicato e curato: Pikete Label, etichetta musicale di Asti/Alessandrino. Sito vetrina responsive.',
    url: '/portfolio',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — Trebla Studio | Asti',
    description: 'Un progetto pubblicato e curato: Pikete Label, etichetta musicale di Asti/Alessandrino. Sito vetrina responsive.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section portfolio-section">
      <p className="section-label">Portfolio</p>
      <div className="section-intro">
        <h1>Lo abbiamo<br /><em>già fatto.</em></h1>
        <p>Un progetto pubblicato, curato in ogni dettaglio.</p>
      </div>
      <a className="portfolio-feature" href="https://piketelabel.vercel.app" target="_blank" rel="noopener noreferrer">
        <span className="portfolio-kicker">Pikete Label, Etichetta musicale</span>
        <strong>Pikete Label</strong>
        <span className="portfolio-sub">Asti / Alessandrino · Sito vetrina + catalogo artisti</span>
        <p style={{ marginTop: '8px' }}>Design, sviluppo e gestione del sito vetrina responsive.</p>
        <span className="portfolio-cta"><span>Visita il sito →</span></span>
      </a>
    </section>

  );
}

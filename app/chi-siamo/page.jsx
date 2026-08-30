import Link from 'next/link';
export const metadata = {
  title: 'Chi siamo e Lavori — Trebla Studio | Asti',
  description: 'Trebla Studio nasce ad Asti: Albert (sviluppo) e Gabriel (design). Un progetto pubblicato: Pikete Label, etichetta musicale.',
  alternates: { canonical: '/chi-siamo' },
  openGraph: {
    title: 'Chi siamo e Lavori — Trebla Studio | Asti',
    description: 'Il team dietro Trebla Studio e il nostro lavoro pubblicato.',
    url: '/chi-siamo',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chi siamo e Lavori — Trebla Studio | Asti',
    description: 'Il team dietro Trebla Studio e il nostro lavoro pubblicato.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  return (
    <>
      <section className="section" style={{ background: '#fff' }}>
        <p className="section-label">Chi siamo</p>
        <div className="section-intro">
          <h1>Il team dietro<br /><em>Trebla Studio.</em></h1>
          <p>Trebla Studio nasce ad Asti dall’incontro tra sviluppo, design e comunicazione.</p>
        </div>
        <div className="team-grid">
          <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
            <strong style={{ fontSize: '14px' }}>Albert Simoni, Sviluppo</strong>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>HTML, CSS, TypeScript, React, Vercel. Gestisce progetto, codice e pubblicazione.</p>
          </div>
          <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
            <strong style={{ fontSize: '14px' }}>Gabriel Santospirito, Design & SMM</strong>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>Grafiche, identità, contenuti social.</p>
          </div>
          <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fbfbf9' }}>
            <strong style={{ fontSize: '14px' }}>Dove operiamo</strong>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 0', lineHeight: '1.5' }}>Asti, su appuntamento.<br />Area: Asti e Piemonte.</p>
          </div>
        </div>
      </section>

      <section id="lavori" className="section portfolio-section" style={{ borderTop: '1px solid var(--line)' }}>
        <p className="section-label">Lavori</p>
        <div className="section-intro">
          <h2>Lo abbiamo<br /><em>già fatto.</em></h2>
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
    </>
  );
}

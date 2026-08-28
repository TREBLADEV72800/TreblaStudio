import Link from 'next/link';
export const metadata = {
  title: 'Chi siamo — Trebla Studio | Asti',
  description: 'Trebla Studio nasce ad Asti dall’incontro tra sviluppo, design e comunicazione per piccole imprese.',
  alternates: { canonical: '/chi-siamo' },
  openGraph: {
    title: 'Chi siamo — Trebla Studio | Asti',
    description: 'Trebla Studio nasce ad Asti dall’incontro tra sviluppo, design e comunicazione per piccole imprese.',
    url: '/chi-siamo',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chi siamo — Trebla Studio | Asti',
    description: 'Trebla Studio nasce ad Asti dall’incontro tra sviluppo, design e comunicazione per piccole imprese.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
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
      <div style={{ marginTop: '22px' }}><a className="button button-main" href="https://wa.me/393518924471" target="_blank" rel="noopener noreferrer">Scrivici su WhatsApp →</a></div>
    </section>

  );
}

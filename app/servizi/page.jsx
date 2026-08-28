import Link from 'next/link';
export const metadata = {
  title: 'Servizi — Siti Web, Social, Design | Trebla Studio',
  description: 'Tre servizi modulari per piccole attività: Sito web chiaro e curato, Social coerenti, Design riconoscibile. Ogni servizio è indipendente.',
  alternates: { canonical: '/servizi' },
  openGraph: {
    title: 'Servizi — Siti Web, Social, Design | Trebla Studio',
    description: 'Tre servizi modulari per piccole attività: Sito web chiaro e curato, Social coerenti, Design riconoscibile. Ogni servizio è indipendente.',
    url: '/servizi',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servizi — Siti Web, Social, Design | Trebla Studio',
    description: 'Tre servizi modulari per piccole attività: Sito web chiaro e curato, Social coerenti, Design riconoscibile. Ogni servizio è indipendente.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section">
      <p className="section-label">Servizi</p>
      <div className="section-intro">
        <h1>Cosa facciamo,<br /><em>nel dettaglio.</em></h1>
        <p>Tre servizi modulari: scegli da dove iniziare.</p>
      </div>
      <div className="service-grid" style={{ marginTop: '32px' }}>
        <Link href="/servizi/siti-web" className="service-card service-main" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>01</span><h3>Sito web</h3><p>Una presenza chiara e curata per farti trovare e ricevere richieste.</p>
          <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: struttura responsive, contatti diretti, mappa.</p>
          <span style={{ marginTop: '12px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Dettagli →</span>
        </Link>
        <Link href="/servizi/social-media" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>02</span><h3>Social media</h3><p>Piano editoriale, grafiche e reel per canali più coerenti.</p>
          <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: piano editoriale, grafiche, reel.</p>
          <span style={{ marginTop: '12px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Dettagli →</span>
        </Link>
        <Link href="/servizi/design" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>03</span><h3>Design e grafiche</h3><p>Logo e materiali coordinati per un’immagine riconoscibile.</p>
          <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: logo, biglietti, volantini.</p>
          <span style={{ marginTop: '12px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Dettagli →</span>
        </Link>
      </div>
      <p style={{ marginTop: '18px', fontSize: '13px', color: 'var(--muted)', textAlign: 'center' }}>Ogni servizio è indipendente: se scegli solo Social ricevi solo Social, se scegli solo Design solo Design, oppure combinali.</p>
      <div className="pacchetti-grid" style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <strong style={{ fontSize: '14px' }}>Solo Social</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '6px 0 0' }}>Solo gestione social, senza sito.</p>
          <Link href="/preventivo?services=social" style={{ display: 'inline-block', marginTop: '10px', fontSize: '13px', fontWeight: 800, color: 'var(--blue)' }}>Configura Social →</Link>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <strong style={{ fontSize: '14px' }}>Solo Design</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '6px 0 0' }}>Solo grafiche e logo, senza sito.</p>
          <Link href="/preventivo?services=design" style={{ display: 'inline-block', marginTop: '10px', fontSize: '13px', fontWeight: 800, color: 'var(--blue)' }}>Configura Design →</Link>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '16px', background: '#fbfbf9' }}>
          <strong style={{ fontSize: '14px' }}>Pacchetto Completo</strong>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '6px 0 0' }}>Sito + Social + Design insieme.</p>
          <Link href="/preventivo?services=site,social,design" style={{ display: 'inline-block', marginTop: '10px', fontSize: '13px', fontWeight: 800, color: 'var(--blue)' }}>Configura completo →</Link>
        </div>
      </div>
    </section>

  );
}

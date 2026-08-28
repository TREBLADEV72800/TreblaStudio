import Link from 'next/link';
export const metadata = {
  title: 'Servizi e Metodo — Siti Web, Social, Design | Trebla Studio',
  description: 'Tre servizi modulari (Sito, Social, Design) e un metodo in 6 passi: brief, materiali, design, revisioni, approvazione, pubblicazione.',
  alternates: { canonical: '/servizi' },
  openGraph: {
    title: 'Servizi e Metodo — Siti Web, Social, Design | Trebla Studio',
    description: 'Tre servizi modulari e un metodo chiaro in 6 passi per portare online la tua attività.',
    url: '/servizi',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servizi e Metodo — Siti Web, Social, Design | Trebla Studio',
    description: 'Tre servizi modulari e un metodo chiaro in 6 passi.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  return (
    <>
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

      <section id="metodo" className="section method-section" style={{ borderTop: '1px solid var(--line)' }}>
        <p className="section-label">Metodo</p>
        <div className="section-intro">
          <h2>Dall’idea<br /><em>alla presenza online.</em></h2>
          <p>Un percorso concreto, con passaggi chiari e conversazione vera sulle necessità della tua attività.</p>
        </div>
        <div className="method-grid">
          <article><span>01</span><h3>Brief su WhatsApp</h3><p>Ci racconti attività, obiettivi e stile.</p></article>
          <article><span>02</span><h3>Materiali</h3><p>Raccogliamo testi, foto e logo.</p></article>
          <article><span>03</span><h3>Design</h3><p>Progettiamo layout e contenuti.</p></article>
          <article><span>04</span><h3>Revisioni</h3><p>Due giri di correzioni inclusi.</p></article>
          <article><span>05</span><h3>Approvazione</h3><p>Confermi tutto prima di pubblicare.</p></article>
          <article><span>06</span><h3>Pubblicazione</h3><p>Mettiamo online su Vercel e ti mostriamo come aggiornare.</p></article>
        </div>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link className="button button-main" href="/preventivo">Configura il preventivo</Link>
          <Link className="button button-quiet" href="/contatti" style={{ background: '#fff' }}>Parlaci del tuo progetto</Link>
        </div>
      </section>
    </>
  );
}

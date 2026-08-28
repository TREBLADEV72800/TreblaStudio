import Link from 'next/link';
export const metadata = {
  title: 'Design — Trebla Studio | Asti',
  description: 'Logo, biglietti, volantini e grafiche coordinate per un’immagine coerente e riconoscibile.',
  alternates: { canonical: '/servizi/design' },
  openGraph: {
    title: 'Design — Trebla Studio | Asti',
    description: 'Logo, biglietti, volantini e grafiche coordinate per un’immagine coerente e riconoscibile.',
    url: '/servizi/design',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design — Trebla Studio | Asti',
    description: 'Logo, biglietti, volantini e grafiche coordinate per un’immagine coerente e riconoscibile.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section">
      <p className="section-label">Servizi, Design</p>
      <div className="section-intro">
        <h1>Design<br /><em>riconoscibile.</em></h1>
        <p>Logo, biglietti, volantini e grafiche coordinate per un’immagine coerente.</p>
      </div>
      <p style={{ marginTop: '18px', color: 'var(--muted)', maxWidth: '620px' }}>Materiali pronti per stampa e web, coordinati con il tuo stile.</p>
      <Link className="button button-main" href="/preventivo?services=design" style={{ marginTop: '18px' }}>Configura design →</Link>
    </section>

  );
}

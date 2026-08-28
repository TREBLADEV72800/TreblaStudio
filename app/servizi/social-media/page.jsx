import Link from 'next/link';
export const metadata = {
  title: 'Social Media — Trebla Studio | Asti',
  description: 'Pianifichiamo contenuti, grafiche e reel per rendere i tuoi canali più coerenti. Puoi iniziare dai social o integrarli al sito.',
  alternates: { canonical: '/servizi/social-media' },
  openGraph: {
    title: 'Social Media — Trebla Studio | Asti',
    description: 'Pianifichiamo contenuti, grafiche e reel per rendere i tuoi canali più coerenti. Puoi iniziare dai social o integrarli al sito.',
    url: '/servizi/social-media',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media — Trebla Studio | Asti',
    description: 'Pianifichiamo contenuti, grafiche e reel per rendere i tuoi canali più coerenti. Puoi iniziare dai social o integrarli al sito.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section">
      <p className="section-label">Servizi, Social Media</p>
      <div className="section-intro">
        <h1>Social<br /><em>coerenti.</em></h1>
        <p>Pianifichiamo contenuti, grafiche e reel brevi per rendere i tuoi canali più coerenti. Puoi iniziare dai social o integrarli al sito.</p>
      </div>
      <p style={{ marginTop: '18px', color: 'var(--muted)', maxWidth: '620px' }}>Canali su misura per la tua attività, con approvazione rapida via WhatsApp.</p>
      <Link className="button button-main" href="/preventivo?services=social" style={{ marginTop: '18px' }}>Configura social →</Link>
    </section>

  );
}

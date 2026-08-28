import Link from 'next/link';
import FaqList from '../../components/FaqList';
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
      <FaqList />
      <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link className="button button-main" href="/preventivo">Configura preventivo in 2 min</Link>
        <a className="button button-quiet" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ background: '#fff' }}>Scrivici su WhatsApp</a>
      </div>
    </section>
  );
}

import Link from 'next/link';
export const metadata = {
  title: 'Sito Web — Trebla Studio | Asti',
  description: 'Sito web chiaro e curato: layout responsive, contatti diretti, mappa e visibilità. Da 350 €, testi con il cliente, proprietà tua.',
  alternates: { canonical: '/servizi/siti-web' },
  openGraph: {
    title: 'Sito Web — Trebla Studio | Asti',
    description: 'Sito web chiaro e curato: layout responsive, contatti diretti, mappa e visibilità. Da 350 €, testi con il cliente, proprietà tua.',
    url: '/servizi/siti-web',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sito Web — Trebla Studio | Asti',
    description: 'Sito web chiaro e curato: layout responsive, contatti diretti, mappa e visibilità. Da 350 €, testi con il cliente, proprietà tua.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section">
      <p className="section-label">Servizi, Sito Web</p>
      <div className="section-intro">
        <h1>Sito web<br /><em>chiaro e curato.</em></h1>
        <p>Da 350 € finale (pagina singola) o 400 € multi,pagina.</p>
      </div>
      <div className="siti-grid" style={{ marginTop: '24px', gap: '18px', fontSize: '13px', lineHeight: '1.6' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Progettazione</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Layout responsive, testi realizzati con il cliente, struttura delle pagine.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Contatti</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>WhatsApp, email, form, mappa, orari e prenotazioni quando previste.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Visibilità</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Title, meta description, heading, alt text, sitemap e configurazioni concordate.</p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong>Consegna</strong>
          <p style={{ color: 'var(--muted)', margin: '8px 0 0' }}>Pubblicazione, indicazioni su dominio/hosting e proprietà del sito.</p>
        </div>
      </div>
      <div style={{ marginTop: '18px' }}><Link className="button button-main" href="/preventivo?services=site">Configura il tuo sito →</Link></div>
    </section>

  );
}

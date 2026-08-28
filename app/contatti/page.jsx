import Link from 'next/link';
export const metadata = {
  title: 'Contatti — Trebla Studio | Asti',
  description: 'Contatti diretti: WhatsApp +39 351 892 4471, email trebla.dev.simoni@gmail.com. Area Asti e Piemonte, su appuntamento.',
  alternates: { canonical: '/contatti' },
  openGraph: {
    title: 'Contatti — Trebla Studio | Asti',
    description: 'Contatti diretti: WhatsApp +39 351 892 4471, email trebla.dev.simoni@gmail.com. Area Asti e Piemonte, su appuntamento.',
    url: '/contatti',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contatti — Trebla Studio | Asti',
    description: 'Contatti diretti: WhatsApp +39 351 892 4471, email trebla.dev.simoni@gmail.com. Area Asti e Piemonte, su appuntamento.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section">
      <p className="section-label">Contatti</p>
      <div className="section-intro">
        <h1>Parliamone<br /><em>davvero.</em></h1>
        <p>Risposta rapida, canali diretti, area servita chiara.</p>
      </div>
      <div className="contacts-grid">
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '20px' }}>
          <strong style={{ display: 'block', marginBottom: '12px' }}>Contatti diretti</strong>
          <p style={{ margin: '0 0 8px', fontSize: '14px' }}><strong>WhatsApp:</strong> <a href="https://wa.me/393518924471" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>+39 351 892 4471</a></p>
          <p style={{ margin: '0 0 8px', fontSize: '14px' }}><strong>Email:</strong> <a href="mailto:trebla.dev.simoni@gmail.com" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>trebla.dev.simoni@gmail.com</a></p>
          <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--muted)' }}><strong>Area:</strong> Asti e Piemonte</p>
          <p style={{ margin: '0', fontSize: '14px', color: 'var(--muted)' }}><strong>Sede:</strong> Asti, su appuntamento</p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="https://wa.me/393518924471?text=Ciao%20Trebla%20Studio!%20Vorrei%20prenotare%20una%20chiamata%20per%20il%20mio%20sito." target="_blank" rel="noopener noreferrer" style={{ background: 'var(--blue)', color: '#fff', borderRadius: '999px', padding: '10px 16px', fontWeight: 800, fontSize: '13px' }}>Prenota su WhatsApp →</a>
            <a href="mailto:trebla.dev.simoni@gmail.com" style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '10px 16px', fontWeight: 800, fontSize: '13px' }}>Scrivi via Email</a>
          </div>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '20px', background: '#fbfbf9' }}>
          <strong style={{ display: 'block', marginBottom: '12px' }}>Come raggiungerci</strong>
          <p style={{ margin: '0', fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>Scrivici su WhatsApp o via email per fissare un appuntamento. Rispondiamo ai messaggi entro la giornata.</p>
        </div>
      </div>
    </section>

  );
}

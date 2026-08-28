import Link from 'next/link';
export const metadata = {
  title: 'Assistenza — Trebla Studio | Asti',
  description: 'Assistenza post-lancio: revisioni, dominio, hosting, proprietà e manutenzione facoltativa.',
  alternates: { canonical: '/assistenza' },
  openGraph: {
    title: 'Assistenza — Trebla Studio | Asti',
    description: 'Assistenza post-lancio: revisioni, dominio, hosting, proprietà e manutenzione facoltativa.',
    url: '/assistenza',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assistenza — Trebla Studio | Asti',
    description: 'Assistenza post-lancio: revisioni, dominio, hosting, proprietà e manutenzione facoltativa.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};
export default function Page(){
  return (
    <section className="section" style={{ background: '#fbfbf9' }}>
      <p className="section-label">Assistenza</p>
      <div className="section-intro">
        <h1>Dopo il lancio,<br /><em>non spariamo.</em></h1>
        <p>Chi aggiorna cosa, in quanto tempo e a quale costo, tutto scritto prima di iniziare.</p>
      </div>
      <div className="assistenza-grid" style={{ marginTop: '24px', gap: '18px', fontSize: '13px', lineHeight: '1.6' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Revisioni e correzioni</strong>
          <span style={{ color: 'var(--muted)' }}>• 2 revisioni incluse<br />• Bug valutati come tali<br />• Modifiche future su richiesta</span>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Dominio, hosting, proprietà</strong>
          <span style={{ color: 'var(--muted)' }}>• Dominio intestato a te<br />• Hosting Vercel<br />• Proprietà codice e contenuti tua</span>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px', background: '#fff' }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Manutenzione facoltativa</strong>
          <span style={{ color: 'var(--muted)' }}>• Aggiornamenti su richiesta<br />• Backup su richiesta<br />• Richiesta via WhatsApp o email</span>
        </div>
      </div>
    </section>
  );
}

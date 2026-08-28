import Link from 'next/link';
export const metadata = {
  title: 'Prezzi chiari — Trebla Studio | Asti',
  description: 'Prezzi chiari: parti da 350 €, dettaglio incluso, tempi concordati, nessun canone obbligatorio. Il sito è tuo.',
  alternates: { canonical: '/prezzi' },
  openGraph: {
    title: 'Prezzi chiari — Trebla Studio | Asti',
    description: 'Prezzi chiari: parti da 350 €, dettaglio incluso, tempi concordati, nessun canone obbligatorio. Il sito è tuo.',
    url: '/prezzi',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prezzi chiari — Trebla Studio | Asti',
    description: 'Prezzi chiari: parti da 350 €, dettaglio incluso, tempi concordati, nessun canone obbligatorio. Il sito è tuo.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section price-section">
      <p className="section-label">Prezzi chiari</p>
      <div className="price-grid">
        <div>
          <h1>Una proposta<br /><em>alla tua portata.</em></h1>
          <p>Parli direttamente con chi costruisce il tuo sito. Prezzo indicato prima di iniziare.</p>
          <Link className="button button-light" href="/preventivo">Configura il preventivo</Link>
        </div>
        <ul>
          <li><b>Prezzo chiaro</b><span>Con dettaglio di cosa è incluso.</span></li>
          <li><b>Tempi concordati</b><span>Definiti dopo i materiali.</span></li>
          <li><b>Nessun canone Trebla obbligatorio</b><span>Il sito è tuo.</span></li>
        </ul>
      </div>
      <div className="prezzi-detail-grid" style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: '24px', gap: '24px', fontSize: '13px', lineHeight: '1.6' }}>
        <div>
          <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Cosa include “da 350 €”</strong>
          <span style={{ color: '#d5e4e9' }}>• 1 pagina singola fluida (o multi,pagina da 400 €)<br />• Design responsive, testi con il cliente<br />• Contatti diretti, mappa<br />• Proprietà del sito</span>
        </div>
        <div>
          <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Extra a scelta</strong>
          <span style={{ color: '#d5e4e9' }}>• Pagine aggiuntive<br />• Funzioni per settore<br />• Social e design su richiesta<br />• Foto sul posto su richiesta</span>
        </div>
        <div>
          <strong style={{ display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b7d6e2', marginBottom: '8px' }}>Condizioni principali</strong>
          <span style={{ color: '#d5e4e9' }}>• Due revisioni incluse<br />• Sito pubblicato su Vercel<br />• Dettagli su dominio e assistenza su richiesta</span>
        </div>
      </div>
    </section>

  );
}

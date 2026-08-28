export const metadata = { title: 'Eventi — Trebla Studio | Asti', description: 'Musica dal vivo per la tua attività.', alternates: { canonical: 'https://treblastudio.vercel.app/eventi' } };
export default function Page(){
  return (
    <section className="section" style={{ background: '#fff' }}>
      <p className="section-label">Eventi e attivazioni</p>
      <div className="section-intro">
        <h1>Musica dal vivo<br /><em>per la tua attività.</em></h1>
        <p>In collaborazione con Pikete Label (stabile), 4 cantanti disponibili. Attività separata dal sito/social/design.</p>
      </div>
      <div className="eventi-grid" style={{ marginTop: '24px', gap: '18px' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Per chi è utile</strong>
          <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>Bar, ristoranti, negozi, associazioni, inaugurazioni, promozioni, serate a tema. Canto live, formato piccolo.</span>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
          <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Costi indicativi</strong>
          <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>Da 60€/h per 1 cantante fino a 250€/h per tutti e 4. Prezzo su misura per durata/location. <a href="https://piketelabel.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 800 }}>Vedi artisti →</a></span>
        </div>
      </div>
      <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--muted)' }}>Nota: evento non incluso nel prezzo sito, attivazione opzionale e separata.</p>
    </section>
  );
}

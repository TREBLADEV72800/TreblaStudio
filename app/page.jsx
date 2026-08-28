import Link from 'next/link';

export const metadata = {
  title: 'Trebla Studio — Siti Web per Piccole Imprese in Piemonte | Asti',
  description: 'Siti web chiari e curati per piccole attività di Asti e Piemonte: ristoranti, negozi, artigiani e professionisti. Prezzo chiaro da 350 €, tempi concordati, nessun canone obbligatorio.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const whatsapp = '393518924471';
  return (
    <>
      {/* HERO minimal */}
      <section className="hero" style={{ minHeight: '480px', padding: '48px 7vw 40px' }}>
        <div className="hero-copy">
          <p className="section-label" style={{ marginBottom: '12px' }}>Asti · Piemonte — solo per chi parte da zero</p>
          <h1 style={{ fontSize: 'clamp(48px, 6.5vw, 88px)' }}>Siti che portano<br /><em>clienti.</em></h1>
          <p style={{ maxWidth: '420px', fontSize: '18px', marginTop: '18px' }}>Per bar, saloni, negozi e artigiani senza sito. Niente tecnicismi: un sito chiaro che si apre veloce e fa arrivare richieste.</p>
          <div className="hero-actions" style={{ marginTop: '28px' }}>
            <Link className="button button-main" href="/preventivo">Configura preventivo — 2 min</Link>
            <a className="button button-quiet" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla! Vorrei un sito, parliamone')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <p style={{ marginTop: '14px', fontSize: '12px', color: 'var(--muted)' }}>Risposta entro oggi · Nessun impegno</p>
        </div>
        <div className="hero-card" style={{ height: '420px' }}>
          <span className="card-kicker">Trebla Studio — 2 persone, Asti</span>
          <strong style={{ fontSize: 'clamp(28px, 3.2vw, 42px)' }}>Dal messaggio<br /><em>al sito online.</em></strong>
          <p>Parliamo su WhatsApp, scegli cosa ti serve, pubblichiamo. Fatto.</p>
        </div>
      </section>

      {/* SERVIZI essenziali */}
      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <p className="section-label">Servizi</p>
        <div className="section-intro">
          <h2>Solo ciò<br /><em>che ti serve.</em></h2>
          <p>Scegli uno o combinali. Ogni servizio sta in piedi da solo.</p>
        </div>
        <div className="service-grid" style={{ marginTop: '28px' }}>
          <Link href="/servizi/siti-web" className="service-card service-main" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>01</span>
            <h3>Sito web</h3>
            <p>Veloce sul telefono, prenotazione in un tap, mappa e contatti sempre visibili.</p>
            <span style={{ marginTop: '18px', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Sito web →</span>
          </Link>
          <Link href="/servizi/social-media" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>02</span>
            <h3>Social</h3>
            <p>Profili ordinati, piano semplice e contenuti che non devi inventarti tu.</p>
            <span style={{ marginTop: '18px', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Social →</span>
          </Link>
          <Link href="/servizi/design" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>03</span>
            <h3>Design</h3>
            <p>Logo e materiali puliti, subito riconoscibili in vetrina e online.</p>
            <span style={{ marginTop: '18px', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Design →</span>
          </Link>
        </div>
      </section>

      {/* PREZZI minimal */}
      <section className="section price-section" style={{ padding: '40px 7vw' }}>
        <p className="section-label" style={{ color: '#b7d6e2' }}>Prezzi</p>
        <div className="price-grid" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}>Chiaro da<br /><em>subito.</em></h2>
            <p style={{ margin: '16px 0 20px' }}>Sai il prezzo prima di iniziare. Il sito resta tuo, nessun canone Trebla.</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link className="button button-light" href="/preventivo">Vai al preventivo</Link>
              <Link href="/prezzi" style={{ fontSize: '13px', fontWeight: 700, color: '#fff', textDecoration: 'underline', padding: '12px 6px' }}>Dettaglio prezzi</Link>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', padding: '18px', display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Pagina singola</span><span style={{ fontWeight: 800, fontSize: '18px' }}>350 €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Multi-pagina</span><span style={{ fontWeight: 800, fontSize: '18px' }}>420 €</span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#d2e1e6' }}>2 revisioni incluse · Consegna ~10 giorni · Foto: invii tu o scattiamo noi</p>
          </div>
        </div>
      </section>

      {/* CTA finale minimal */}
      <section className="section" style={{ background: '#fff', padding: '40px 7vw', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: 'clamp(34px, 4.2vw, 52px)', margin: 0, letterSpacing: '-0.06em', lineHeight: 0.95 }}>Pronto a<br /><em>farti trovare?</em></h2>
          <p style={{ color: 'var(--muted)', fontSize: '17px', marginTop: '12px' }}>Due minuti di domande e hai la tua proposta. Senza impegno.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link className="button button-main" href="/preventivo">Configura il preventivo</Link>
            <a className="button button-quiet" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ background: '#fff' }}>Scrivici su WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

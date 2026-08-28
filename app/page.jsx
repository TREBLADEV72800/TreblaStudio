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
      {/* HERO */}
      <section className="hero" style={{ minHeight: '480px', padding: '48px 7vw 40px' }}>
        <div className="hero-copy">
          <h1 style={{ fontSize: 'clamp(48px, 6.5vw, 88px)' }}>La tua attività<br /><em>merita di essere vista.</em></h1>
          <p style={{ maxWidth: '440px', fontSize: '18px', marginTop: '18px', lineHeight: 1.5 }}>Costruiamo siti web che si capiscono al primo sguardo. Per attività di Asti e Piemonte che vogliono ricevere più richieste, senza complicarsi la vita.</p>
          <div className="hero-actions" style={{ marginTop: '28px' }}>
            <Link className="button button-main" href="/preventivo">Configura preventivo in 2 min</Link>
            <a className="button button-quiet" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Ciao Trebla! Vorrei un sito, parliamone')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div style={{ height: 'auto', minHeight: '280px', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fff', color: 'var(--ink)', border: '1px solid var(--line)', borderRadius: '12px' }}>
          <span className="card-kicker" style={{ color: 'var(--muted)' }}>Trebla Studio — Asti · 2 persone</span>
          <div style={{ marginTop: '14px', display: 'grid', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--blue-soft)', borderRadius: '8px', fontSize: '13px' }}><span style={{ fontWeight: 700 }}>Prezzo chiaro</span><span style={{ fontWeight: 800, color: 'var(--blue)' }}>350 €</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px' }}><span style={{ fontWeight: 700 }}>Consegna</span><span style={{ fontWeight: 800 }}>~10 giorni</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px' }}><span style={{ fontWeight: 700 }}>Revisioni</span><span style={{ fontWeight: 800 }}>2 incluse</span></div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '12px', marginBottom: 0 }}>Senza tecnicismi. Parliamo su WhatsApp e partiamo.</p>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <p className="section-label">Cosa facciamo</p>
        <div className="section-intro">
          <h2>Tre servizi,<br /><em>combinabili.</em></h2>
          <p>Non devi prenderli tutti. Parti da quello che ti serve ora e aggiungi il resto quando vuoi.</p>
        </div>
        <div className="service-grid" style={{ marginTop: '28px' }}>
          <Link href="/servizi/siti-web" className="service-card service-main" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>01</span>
            <h3>Sito web</h3>
            <p>Chiaro sul telefono, veloce, con prenotazioni e contatti a portata di tap.</p>
            <span style={{ marginTop: '18px', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Sito web →</span>
          </Link>
          <Link href="/servizi/social-media" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>02</span>
            <h3>Social</h3>
            <p>Contenuti costanti e ordinati, senza che tu debba pensarci ogni giorno.</p>
            <span style={{ marginTop: '18px', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Social →</span>
          </Link>
          <Link href="/servizi/design" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>03</span>
            <h3>Design</h3>
            <p>Un’immagine pulita e coerente, dalla vetrina al biglietto da visita.</p>
            <span style={{ marginTop: '18px', fontWeight: 800, color: 'var(--blue)', fontSize: '13px' }}>Design →</span>
          </Link>
        </div>
      </section>

      {/* CHI SIAMO teaser — orizzontale */}
      <section className="section" style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', padding: '32px 7vw' }}>
        <p className="section-label">Chi siamo</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: 0, letterSpacing: '-0.05em', lineHeight: 0.95 }}>Due persone,<br /><em>un metodo chiaro.</em></h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', marginTop: '10px', maxWidth: '520px' }}>Siamo Albert e Gabriel, di Asti. Veniamo sul posto, ascoltiamo come lavori e costruiamo qualcosa che ti somiglia davvero.</p>
          </div>
          <Link href="/chi-siamo" style={{ fontWeight: 800, color: 'var(--blue)', fontSize: '13px', textDecoration: 'underline', textUnderlineOffset: '4px', whiteSpace: 'nowrap' }}>Conosci Trebla →</Link>
        </div>
        <div style={{ marginTop: '18px', background: 'var(--blue-soft)', border: '1px solid var(--line)', borderLeft: '3px solid var(--blue)', padding: '12px 16px', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <strong style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--blue)', whiteSpace: 'nowrap' }}>Perché Asti</strong>
          <span style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ink)' }}>Conosciamo le attività di qui. Niente call impersonali: ci vediamo, scattiamo le foto, restiamo su WhatsApp.</span>
        </div>
      </section>

      {/* PREZZI */}
      <section className="section price-section" style={{ padding: '40px 7vw' }}>
        <p className="section-label" style={{ color: '#b7d6e2' }}>Prezzi</p>
        <div className="price-grid" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}>Sai già<br /><em>quanto spendi.</em></h2>
            <p style={{ margin: '16px 0 20px' }}>Niente voci nascoste. Concordiamo prezzo e tempi prima di iniziare, e il sito resta tuo.</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link className="button button-light" href="/preventivo">Vai al preventivo</Link>
              <Link href="/prezzi" style={{ fontSize: '13px', fontWeight: 700, color: '#fff', textDecoration: 'underline', padding: '12px 6px' }}>Vedi dettagli</Link>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', padding: '18px', display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Pagina singola</span><span style={{ fontWeight: 800, fontSize: '18px' }}>350 €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Multi-pagina</span><span style={{ fontWeight: 800, fontSize: '18px' }}>400 €</span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#d2e1e6' }}>2 revisioni incluse · Consegna in circa 10 giorni · Foto tue o scattate da noi</p>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="section" style={{ background: '#fff', padding: '40px 7vw', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: 'clamp(34px, 4.2vw, 52px)', margin: 0, letterSpacing: '-0.06em', lineHeight: 0.95 }}>Pronto a<br /><em>farti trovare?</em></h2>
          <p style={{ color: 'var(--muted)', fontSize: '17px', marginTop: '12px' }}>Rispondi a poche domande e ricevi la tua proposta su misura.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link className="button button-main" href="/preventivo">Configura il preventivo</Link>
            <a className="button button-quiet" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ background: '#fff' }}>Scrivici su WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

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
      <section className="hero">
        <div className="hero-copy">
          <h1>La tua attività<br /><em>merita di essere vista.</em></h1>
          <p style={{ maxWidth: '380px' }}>Realizziamo siti web chiari e curati per piccole attività di Asti e Piemonte. Per farti ricevere richieste, prenotazioni e contatti.</p>
          <div className="hero-actions">
            <Link className="button button-main" href="/preventivo">Configura il preventivo</Link>
            <Link className="button button-quiet" href="/servizi" style={{ fontWeight: 600 }}>Scopri i servizi</Link>
          </div>
        </div>
        <div className="hero-card">
          <span className="card-kicker">Trebla Studio — Asti</span>
          <strong>Un percorso semplice,<br /><em>dal primo messaggio al sito online.</em></strong>
        </div>
      </section>

      <section className="audience">
        <p>Per ristoranti, B&amp;B, negozi, saloni, artigiani e professionisti.</p>
      </section>

      <div style={{ background: '#fff', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <section className="section" style={{ padding: '28px 7vw 16px', borderBottom: '1px solid var(--line)' }}>
          <p className="section-label">Cosa facciamo</p>
          <div className="section-intro">
            <h2>Il digitale,<br /><em>fatto semplice.</em></h2>
            <p>Sito web, social e design: scegli da dove iniziare. Ogni servizio è indipendente e pensato per piccole attività come la tua.</p>
          </div>
          <div className="service-grid" style={{ marginTop: '20px' }}>
            <Link href="/servizi/siti-web" className="service-card service-main" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>01</span><h3>Sito web</h3><p>Una presenza chiara e curata per trasformare chi ti cerca in cliente.</p>
              <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: struttura responsive, contatti diretti, mappa.</p>
              <span style={{ marginTop: '16px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px', paddingBottom: '4px' }}>Dettagli sito web →</span>
            </Link>
            <Link href="/servizi/social-media" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>02</span><h3>Social media</h3><p>Contenuti e gestione per una presenza attiva e coerente ogni settimana.</p>
              <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: piano editoriale, grafiche, reel.</p>
              <span style={{ marginTop: '16px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px', paddingBottom: '4px' }}>Dettagli social →</span>
            </Link>
            <Link href="/servizi/design" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>03</span><h3>Design e grafiche</h3><p>Logo e materiali coordinati per un’immagine riconoscibile.</p>
              <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Include: logo, biglietti, volantini.</p>
              <span style={{ marginTop: '16px', display: 'inline-block', fontWeight: 800, color: 'var(--blue)', fontSize: '13px', paddingBottom: '4px' }}>Dettagli design →</span>
            </Link>
          </div>
          <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--muted)', fontStyle: 'italic', textAlign: 'center' }}>Così lo abbiamo già messo in pratica —</p>
        </section>

        <section className="section portfolio-section" style={{ padding: '16px 7vw', background: 'transparent' }}>
          <p className="section-label">Un esempio concreto</p>
          <div className="section-intro">
            <h2>Lo abbiamo<br /><em>già fatto.</em></h2>
            <p>Un progetto pubblicato, curato in ogni dettaglio, che mostra il nostro modo di lavorare.</p>
          </div>
          <Link className="portfolio-feature" href="/portfolio">
            <div>
              <span className="portfolio-kicker">Pikete Label, Etichetta musicale</span>
              <strong>Pikete Label</strong>
              <span className="portfolio-sub">Asti / Alessandrino · Sito vetrina + catalogo artisti</span>
              <p style={{ marginTop: '8px' }}>Sito vetrina responsive per etichetta musicale: design, sviluppo e gestione.</p>
              <span className="portfolio-cta"><span>Vedi il caso studio →</span></span>
            </div>
          </Link>
          <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--muted)', fontStyle: 'italic', textAlign: 'center' }}>— con un prezzo chiaro, fin da subito.</p>
        </section>

        <section className="section price-section" style={{ padding: '16px 7vw 28px' }}>
          <p className="section-label">Prezzi chiari</p>
          <div className="price-grid">
            <div>
              <h2>Una proposta<br /><em>alla tua portata.</em></h2>
              <p>Parti da 350 €. Prima di iniziare sai cosa è incluso, senza sorprese.</p>
              <Link className="button button-light" href="/prezzi">Vedi i prezzi</Link>
            </div>
            <ul>
              <li><b>Prezzo chiaro</b><span>Con dettaglio di cosa è incluso.</span></li>
              <li><b>Tempi concordati</b><span>Consegna definita dopo i materiali.</span></li>
              <li><b>Nessun canone Trebla obbligatorio</b><span>Il sito è tuo.</span></li>
            </ul>
          </div>
        </section>
      </div>

      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
        <p className="section-label">Prossimo passo</p>
        <div className="section-intro">
          <h2>Pronto a<br /><em>iniziare?</em></h2>
          <p>Raccontaci di cosa hai bisogno: ti indichiamo il punto di partenza più adatto.</p>
        </div>
        <div className="final-cta" style={{ marginTop: '22px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link className="button button-main" href="/preventivo">Configura il preventivo</Link>
          <a className="button button-quiet" href={`https://wa.me/${whatsapp}`} style={{ background: '#fff', border: '1px solid var(--line)' }}>Scrivici su WhatsApp</a>
          <Link href="/contatti" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', textDecoration: 'underline', padding: '10px' }}>Tutti i contatti</Link>
        </div>
      </section>
    </>
  );
}

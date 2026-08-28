import Link from 'next/link';
export default function NotFound(){
  return (
    <section className="section" style={{ textAlign: 'center', padding: '60px 7vw' }}>
      <p className="section-label">Errore 404</p>
      <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', margin: '0 0 16px', letterSpacing: '-0.05em' }}>Pagina non trovata.<br /><em style={{ fontFamily: 'var(--serif)' }}>Torniamo da capo.</em></h1>
      <p style={{ color: 'var(--muted)', maxWidth: '520px', margin: '0 auto 24px', fontSize: '16px', lineHeight: '1.6' }}>L’indirizzo che hai aperto non esiste o è stato spostato. Trebla Studio è ancora qui, a due passi da Asti.</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link className="button button-main" href="/">Torna alla homepage</Link>
        <Link className="button button-quiet" href="/servizi">Vedi i servizi</Link>
        <Link className="button button-quiet" href="/preventivo">Configura il preventivo</Link>
        <a className="button" href="https://wa.me/393518924471" style={{ background: '#25d366', color: '#fff' }}>Scrivici su WhatsApp</a>
        <Link className="button button-quiet" href="/contatti">Contatti</Link>
      </div>
    </section>
  );
}

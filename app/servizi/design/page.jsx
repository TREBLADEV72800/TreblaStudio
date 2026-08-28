import Link from 'next/link';
export const metadata = {
  "title": "Design — Trebla Studio | Asti",
  "description": "Logo, biglietti, volantini e grafiche coordinate per un’immagine coerente.",
  "alternates": {
    "canonical": "https://treblastudio.vercel.app/servizi/design"
  }
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section">
      <p className="section-label">Servizi, Design</p>
      <div className="section-intro">
        <h1>Design<br /><em>riconoscibile.</em></h1>
        <p>Logo, biglietti, volantini e grafiche coordinate per un’immagine coerente.</p>
      </div>
      <p style={{ marginTop: '18px', color: 'var(--muted)', maxWidth: '620px' }}>Materiali pronti per stampa e web, coordinati con il tuo stile.</p>
      <Link className="button button-main" href="/preventivo?services=design" style={{ marginTop: '18px' }}>Configura design →</Link>
    </section>

  );
}

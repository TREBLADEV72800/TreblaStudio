import Link from 'next/link';
export const metadata = {
  "title": "Come lavoriamo — Trebla Studio | Asti",
  "description": "Dall’idea alla presenza online: brief, materiali, design, revisioni, approvazione, pubblicazione.",
  "alternates": {
    "canonical": "https://treblastudio.vercel.app/come-lavoriamo"
  }
};

export default function Page(){
  const whatsapp='393518924471';
  const email='trebla.dev.simoni@gmail.com';
  return (
    
    <section className="section method-section">
      <p className="section-label">Come lavoriamo</p>
      <div className="section-intro">
        <h1>Dall'idea<br /><em>alla presenza online.</em></h1>
        <p>Un percorso concreto, con passaggi chiari e conversazione vera sulle necessità della tua attività.</p>
      </div>
      <div className="method-grid">
        <article><span>01</span><h3>Brief su WhatsApp</h3><p>Ci racconti attività, obiettivi e stile.</p></article>
        <article><span>02</span><h3>Materiali</h3><p>Raccogliamo testi, foto e logo.</p></article>
        <article><span>03</span><h3>Design</h3><p>Progettiamo layout e contenuti.</p></article>
        <article><span>04</span><h3>Revisioni</h3><p>Due giri di correzioni inclusi.</p></article>
        <article><span>05</span><h3>Approvazione</h3><p>Confermi tutto prima di pubblicare.</p></article>
        <article><span>06</span><h3>Pubblicazione</h3><p>Mettiamo online su Vercel e ti mostriamo come aggiornare.</p></article>
      </div>
    </section>

  );
}

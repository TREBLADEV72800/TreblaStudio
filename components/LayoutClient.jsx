'use client';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppIcon from './WhatsAppIcon';

const whatsapp = '393518924471';

export default function LayoutClient({ children }) {
  const [quickContactOpen, setQuickContactOpen] = useState(false);
  const [quickName, setQuickName] = useState('');
  const sendQuickMessage = (event) => {
    event.preventDefault();
    if (!quickName.trim()) return;
    const message = `Ciao Trebla Studio! La mia attività si chiama: ${quickName.trim()}. Vorrei farla conoscere, parliamone!`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setQuickContactOpen(false);
    setQuickName('');
  };
  return (
    <>
      <Header onOpenQuick={() => setQuickContactOpen(true)} />
      <main id="main">{children}</main>
      <Footer />
      {quickContactOpen && (
        <div className="modal-overlay" onClick={() => setQuickContactOpen(false)}>
          <form className="quick-modal" onSubmit={sendQuickMessage} onClick={(e) => e.stopPropagation()}>
            <p className="modal-kicker">Parliamone subito</p>
            <h3>Come si chiama<br />la tua attività?</h3>
            <input autoFocus required value={quickName} onChange={(e) => setQuickName(e.target.value)} placeholder="Es. Trattoria da Mario" />
            <button className="wa-cta modal-wa" type="submit"><WhatsAppIcon /> Scrivici su WhatsApp</button>
            <button type="button" className="modal-close" onClick={() => setQuickContactOpen(false)}>Annulla</button>
          </form>
        </div>
      )}
    </>
  );
}

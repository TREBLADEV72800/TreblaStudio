'use client';
import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppIcon from './WhatsAppIcon';

const whatsapp = '393518924471';

export default function LayoutClient({ children }) {
  const [quickContactOpen, setQuickContactOpen] = useState(false);
  const [quickName, setQuickName] = useState('');
  const triggerRef = useRef(null);
  const inputRef = useRef(null);

  const openQuick = () => {
    triggerRef.current = document.activeElement;
    setQuickContactOpen(true);
  };
  const closeQuick = () => {
    setQuickContactOpen(false);
    setQuickName('');
    setTimeout(() => triggerRef.current?.focus(), 0);
  };
  useEffect(() => {
    if (!quickContactOpen) return;
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') closeQuick(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [quickContactOpen]);

  const sendQuickMessage = (event) => {
    event.preventDefault();
    const trimmed = quickName.trim().slice(0,80);
    if (!trimmed) return;
    if (trimmed.length < 2) return;
    const message = `Ciao Trebla Studio! La mia attività si chiama: ${trimmed}. Vorrei farla conoscere, parliamone!`;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    if (message.length > 1800) return;
    window.open(url, '_blank', 'noopener,noreferrer');
    closeQuick();
  };
  return (
    <>
      <Header onOpenQuick={openQuick} />
      <main id="main">{children}</main>
      <Footer />
      {quickContactOpen && (
        <div className="modal-overlay" onClick={closeQuick}>
          <form className="quick-modal" role="dialog" aria-modal="true" aria-labelledby="quick-title" onSubmit={sendQuickMessage} onClick={(e) => e.stopPropagation()}>
            <p className="modal-kicker">Parliamone subito</p>
            <h3 id="quick-title">Come si chiama<br />la tua attività?</h3>
            <label htmlFor="quick-name" style={{ position:'absolute', left:'-9999px' }}>Nome attività</label>
            <input id="quick-name" ref={inputRef} required value={quickName} onChange={(e) => setQuickName(e.target.value.slice(0,80))} placeholder="Es. Trattoria da Mario" maxLength={80} aria-required="true" />
            <button className="wa-cta modal-wa" type="submit"><WhatsAppIcon /> Scrivici su WhatsApp</button>
            <button type="button" className="modal-close" onClick={closeQuick}>Annulla</button>
          </form>
        </div>
      )}
    </>
  );
}

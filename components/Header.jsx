'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header({ onOpenQuick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const firstLinkRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setMenuOpen(false); menuBtnRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 760) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <header className="header">
      <a href="#main" className="skip-link" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>Salta al contenuto</a>
      <Link className="logo" href="/" aria-label="Trebla Studio - torna alla homepage" onClick={() => setMenuOpen(false)}>
        <Image src="/trebla-logo.webp" alt="Trebla Studio — Siti web per piccole imprese in Piemonte" width={123} height={70} priority style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Link>
      <nav id="main-nav" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navigazione principale">
        <Link ref={firstLinkRef} href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/servizi" onClick={() => setMenuOpen(false)}>Servizi</Link>
        <Link href="/portfolio" onClick={() => setMenuOpen(false)}>Lavori</Link>
        <Link href="/chi-siamo" onClick={() => setMenuOpen(false)}>Chi siamo</Link>
        <Link href="/come-lavoriamo" onClick={() => setMenuOpen(false)}>Metodo</Link>
        <Link href="/prezzi" onClick={() => setMenuOpen(false)}>Prezzi</Link>
        <Link href="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
        <Link href="/contatti" onClick={() => setMenuOpen(false)}>Contatti</Link>
        <Link className="nav-mobile-cta" href="/preventivo" onClick={() => setMenuOpen(false)}>Configura il preventivo</Link>
      </nav>
      <button type="button" className="header-cta" onClick={onOpenQuick} aria-label="Scrivici su WhatsApp">Scrivici su WhatsApp</button>
      <button ref={menuBtnRef} className={menuOpen ? 'menu menu-active' : 'menu'} aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu — 7 voci'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </button>
    </header>
  );
}

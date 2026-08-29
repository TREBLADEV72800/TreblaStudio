'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Prezzi', href: '/prezzi' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contatti', href: '/contatti' },
];

export default function Header({ onOpenQuick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const firstLinkRef = useRef(null);
  const prevOverflowRef = useRef('');
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isMenuOpen) { setIsMenuOpen(false); menuBtnRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      prevOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstLinkRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = prevOverflowRef.current || '';
    }
    return () => { document.body.style.overflow = prevOverflowRef.current || ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => { if (window.innerWidth > 760 && isMenuOpen) setIsMenuOpen(false); }, 80);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, [isMenuOpen]);

  const isActive = (href) => href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(href + '/');
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <a href="#main" className="skip-link" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>Salta al contenuto</a>
      <Link href="/" aria-label="Trebla Studio" onClick={closeMenu} className="logo">
        <Image src="/trebla-logo.webp" alt="Trebla Studio" width={123} height={70} priority style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      </Link>

      <nav className={isMenuOpen ? 'nav nav-open' : 'nav'} id="mobile-menu" aria-label="Navigazione principale">
        {NAV.map((item, idx) => (
          <Link
            key={item.href}
            ref={idx === 0 ? firstLinkRef : null}
            href={item.href}
            onClick={closeMenu}
            aria-current={isActive(item.href) ? 'page' : undefined}
            style={isActive(item.href) ? { color: 'var(--blue)', background: 'var(--blue-soft)' } : undefined}
          >
            {item.label}
          </Link>
        ))}
        <Link className="nav-mobile-cta" href="/preventivo" onClick={closeMenu}>Configura il preventivo</Link>
      </nav>

      <button type="button" className="header-cta" onClick={onOpenQuick}>Scrivici su WhatsApp</button>

      <button
        ref={menuBtnRef}
        type="button"
        className={isMenuOpen ? 'menu menu-active' : 'menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
        onClick={() => setIsMenuOpen((v) => !v)}
      >
        <span></span><span></span><span></span>
      </button>
    </header>
  );
}

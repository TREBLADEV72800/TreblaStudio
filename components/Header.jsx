'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);
  const menuBtnRef = useRef(null);
  const firstLinkRef = useRef(null);
  const prevOverflowRef = useRef('');
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Escape closes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  // Body scroll lock — conserva e ripristina overflow precedente
  useEffect(() => {
    if (isMenuOpen) {
      prevOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflowRef.current || '';
    }
    return () => { document.body.style.overflow = prevOverflowRef.current || ''; };
  }, [isMenuOpen]);

  // Focus management
  useEffect(() => {
    if (isMenuOpen) {
      // porta focus sul primo link
      setTimeout(() => firstLinkRef.current?.focus(), 30);
    } else {
      // restituisci al hamburger se era aperto
      if (mounted) menuBtnRef.current?.focus();
    }
  }, [isMenuOpen, mounted]);

  // Resize >760 chiude e ripristina scroll
  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (window.innerWidth > 760 && isMenuOpen) setIsMenuOpen(false);
      }, 80);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, [isMenuOpen]);

  const isActive = (href) => href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(href + '/');

  const closeMenu = () => setIsMenuOpen(false);

  const overlay = isMenuOpen && mounted ? createPortal(
    <>
      {/* Overlay sotto il pannello — chiude al click esterno, non intercetta link */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        style={{
          position: 'fixed',
          inset: '72px 0 0',
          zIndex: 1098,
          background: 'rgba(16,26,34,0.32)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      />
      <nav
        id="mobile-menu"
        aria-label="Navigazione mobile"
        style={{
          position: 'fixed',
          inset: '72px 0 0',
          zIndex: 1099,
          width: '100%',
          maxHeight: 'calc(100dvh - 72px)',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          boxSizing: 'border-box',
          background: 'rgba(246,245,239,0.98)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--line)',
          padding: '16px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {NAV.map((item, idx) => (
          <Link
            key={item.href}
            ref={idx === 0 ? firstLinkRef : null}
            href={item.href}
            onClick={closeMenu}
            aria-current={isActive(item.href) ? 'page' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              minHeight: '44px',
              width: '100%',
              boxSizing: 'border-box',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '17px',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: isActive(item.href) ? 'var(--blue)' : 'var(--ink)',
              background: isActive(item.href) ? 'var(--blue-soft)' : 'transparent',
              textDecoration: 'none',
            }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/preventivo"
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '44px',
            width: '100%',
            boxSizing: 'border-box',
            marginTop: '12px',
            background: 'var(--blue)',
            color: '#fff',
            borderRadius: '10px',
            padding: '14px 18px',
            fontWeight: 800,
            fontSize: '15px',
            textDecoration: 'none',
          }}
        >
          Configura il preventivo
        </Link>
      </nav>
    </>,
    document.body
  ) : null;

  return (
    <>
      <header className="header">
        <a href="#main" className="skip-link" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>Salta al contenuto</a>
        <Link href="/" aria-label="Trebla Studio" onClick={closeMenu} className="logo">
          <Image src="/trebla-logo.webp" alt="Trebla Studio" width={123} height={70} priority style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </Link>

        {/* Desktop nav — nascosto su mobile via CSS */}
        <nav className="nav nav-desktop" aria-label="Navigazione principale">
          {NAV.map((i) => (
            <Link key={i.href} href={i.href} style={isActive(i.href) ? { color: 'var(--blue)', background: 'var(--blue-soft)' } : undefined}>{i.label}</Link>
          ))}
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
      {overlay}
    </>
  );
}

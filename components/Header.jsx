'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Prezzi', href: '/prezzi' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contatti', href: '/contatti' },
];

export default function Header({ onOpenQuick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setMenuOpen(false); menuBtnRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => { if (window.innerWidth > 760) setMenuOpen(false); }, 80);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, []);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <header className="header">
      <a href="#main" className="skip-link" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>Salta al contenuto</a>
      <Link className="logo" href="/" aria-label="Trebla Studio - torna alla homepage" onClick={() => setMenuOpen(false)}>
        <Image src="/trebla-logo.webp" alt="Trebla Studio — Siti web per piccole imprese in Piemonte" width={123} height={70} priority style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Link>

      {/* Desktop nav */}
      <nav id="main-nav" className="nav" aria-label="Navigazione principale">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ color: isActive(item.href) ? 'var(--blue)' : undefined, background: isActive(item.href) ? 'var(--blue-soft)' : undefined }}
          >
            {item.label}
          </Link>
        ))}
        <Link className="nav-mobile-cta" href="/preventivo" style={{ display: 'none' }}>Configura il preventivo</Link>
      </nav>

      <button type="button" className="header-cta" onClick={onOpenQuick} aria-label="Scrivici su WhatsApp">Scrivici su WhatsApp</button>

      <button ref={menuBtnRef} className={menuOpen ? 'menu menu-active' : 'menu'} aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu — 6 voci'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)} style={{ zIndex: 210 }}>
        <span></span><span></span><span></span>
      </button>

      {/* Mobile fullscreen — ispirato a Pikete Navbar.tsx:12 */}
      {menuOpen && (
        <div
          id="mobile-nav"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: '#0a0f14',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '24px',
          }}
          onClick={() => setMenuOpen(false)}
        >
          <nav aria-label="Navigazione mobile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }} onClick={(e) => e.stopPropagation()}>
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { setMenuOpen(false); window.scrollTo(0, 0); }}
                style={{
                  fontSize: 'clamp(32px, 8vw, 46px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  padding: '6px 12px',
                  color: isActive(item.href) ? '#fff' : 'rgba(255,255,255,0.42)',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(18px)',
                  transition: `opacity 0.32s ease ${index * 55}ms, transform 0.32s ease ${index * 55}ms, color 0.18s ease`,
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/preventivo"
              onClick={() => { setMenuOpen(false); window.scrollTo(0, 0); }}
              style={{
                marginTop: '22px',
                background: '#25d366',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px 28px',
                fontWeight: 800,
                fontSize: '16px',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity 0.32s ease ${navItems.length * 55}ms, transform 0.32s ease ${navItems.length * 55}ms`,
              }}
            >
              Configura il preventivo
            </Link>
            <p style={{ marginTop: '14px', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', opacity: menuOpen ? 1 : 0, transition: `opacity 0.32s ease ${(navItems.length + 1) * 55}ms` }}>Trebla Studio — Asti</p>
          </nav>
        </div>
      )}
    </header>
  );
}

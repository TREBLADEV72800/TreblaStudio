'use client';
import { useState, useEffect } from 'react';
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
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => { if (window.innerWidth > 760) setOpen(false); }, 80);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, []);

  const active = (href) => href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(href + '/');

  const overlay = open && mounted ? createPortal(
    <div
      id="mobile-menu"
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        minHeight: '100dvh',
        zIndex: 1000,
        background: '#0a0f14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'max(24px, env(safe-area-inset-top))',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        paddingLeft: '24px',
        paddingRight: '24px',
        overflowY: 'auto',
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', width: '100%', maxWidth: '360px' }}>
        {NAV.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              padding: '10px 0',
              color: active(item.href) ? '#fff' : 'rgba(255,255,255,0.38)',
              transform: 'translateY(0)',
              opacity: 1,
              transition: `transform 0.28s ease ${idx * 45}ms, opacity 0.28s ease ${idx * 45}ms, color 0.15s ease`,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/preventivo"
          onClick={() => setOpen(false)}
          style={{
            marginTop: '20px',
            width: '100%',
            textAlign: 'center',
            background: '#25d366',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px 20px',
            fontWeight: 800,
            fontSize: '16px',
            transition: `opacity 0.28s ease ${NAV.length * 45}ms`,
          }}
        >
          Configura il preventivo
        </Link>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <header className="header">
        <a href="#main" className="skip-link" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>Salta al contenuto</a>
        <Link href="/" aria-label="Trebla Studio" onClick={() => setOpen(false)} style={{ zIndex: 1101, position: 'relative' }}>
          <Image src="/trebla-logo.webp" alt="Trebla Studio" width={123} height={70} priority style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </Link>
        <nav className="nav" aria-label="Navigazione principale">
          {NAV.map((i) => (
            <Link key={i.href} href={i.href} style={active(i.href) ? { color: 'var(--blue)', background: 'var(--blue-soft)' } : undefined}>{i.label}</Link>
          ))}
        </nav>
        <button type="button" className="header-cta" onClick={onOpenQuick}>Scrivici su WhatsApp</button>
        <button
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className={open ? 'menu menu-active' : 'menu'}
          style={{ zIndex: 1100, position: 'relative' }}
        >
          <span></span><span></span><span></span>
        </button>
      </header>
      {overlay}
    </>
  );
}

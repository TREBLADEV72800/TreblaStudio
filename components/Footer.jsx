import Link from 'next/link';
import WhatsAppIcon from './WhatsAppIcon';

const whatsapp = '393518924471';
const email = 'trebla.dev.simoni@gmail.com';

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '28px', width: '100%', maxWidth: '1200px', textAlign: 'left' }}>
        <div>
          <strong className="footer-brand">Trebla Studio</strong>
          <p style={{ marginTop: '8px', lineHeight: '1.6' }}>Studio indipendente ad Asti.</p>
          <a href={`mailto:${email}`} style={{ display: 'inline-block', marginTop: '10px', color: '#fff', fontWeight: 800, fontSize: '14px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{email}</a>
        </div>
        <nav aria-label="Navigazione footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <strong style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8ea8b3', marginBottom: '2px' }}>Esplora</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px' }}>
            <Link href="/" style={{ color: '#d8e3e7', fontSize: '14px' }}>Home</Link>
            <Link href="/servizi" style={{ color: '#d8e3e7', fontSize: '14px' }}>Servizi</Link>
            <Link href="/portfolio" style={{ color: '#d8e3e7', fontSize: '14px' }}>Lavori</Link>
            <Link href="/prezzi" style={{ color: '#d8e3e7', fontSize: '14px' }}>Prezzi</Link>
            <Link href="/faq" style={{ color: '#d8e3e7', fontSize: '14px' }}>FAQ</Link>
          </div>
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <strong style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8ea8b3', marginBottom: '2px' }}>Contatti</strong>
          <a className="footer-whatsapp" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Scrivici su WhatsApp — preferito" style={{ padding: '11px 16px', fontSize: '14px', justifyContent: 'center', width: '100%' }}><WhatsAppIcon /> Scrivici su WhatsApp</a>
          <Link href="/contatti" style={{ color: '#d8e3e7', fontSize: '14px' }}>Contatti</Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '13px', lineHeight: '1' }}>
            <Link href="/privacy" style={{ color: '#8ea8b3', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Privacy</Link>
            <span style={{ color: '#4a6573' }}>·</span>
            <Link href="/cookie" style={{ color: '#8ea8b3', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Cookie</Link>
            <span style={{ color: '#4a6573' }}>·</span>
            <Link href="/termini" style={{ color: '#8ea8b3', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Termini</Link>
          </div>
        </div>
      </div>
      <small style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', lineHeight: '1' }}>© 2026 Trebla Studio · Asti, Piemonte</small>
    </footer>
  );
}

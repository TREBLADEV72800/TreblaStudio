export const metadata = {
  title: 'Cookie — Trebla Studio',
  description: 'Usiamo solo cookie tecnici necessari e font Google. Nessun cookie di profilazione.',
  alternates: { canonical: '/cookie' },
  openGraph: {
    title: 'Cookie — Trebla Studio',
    description: 'Usiamo solo cookie tecnici necessari e font Google. Nessun cookie di profilazione.',
    url: '/cookie',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie — Trebla Studio',
    description: 'Usiamo solo cookie tecnici necessari e font Google. Nessun cookie di profilazione.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};
export default function Page(){
  return (
    <section className="section">
      <p className="section-label">Cookie</p>
      <h1>Cookie Policy</h1>
      <p style={{ marginTop: '18px', fontSize: '14px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '720px' }}>Utilizziamo solo cookie tecnici necessari al funzionamento del sito e font Google. Nessun cookie di profilazione.</p>
    </section>
  );
}

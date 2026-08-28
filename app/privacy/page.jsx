export const metadata = {
  title: 'Privacy — Trebla Studio',
  description: 'Informativa privacy: titolare Albert Simoni, dati usati solo per rispondere via WhatsApp/email.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy — Trebla Studio',
    description: 'Informativa privacy: titolare Albert Simoni, dati usati solo per rispondere via WhatsApp/email.',
    url: '/privacy',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy — Trebla Studio',
    description: 'Informativa privacy: titolare Albert Simoni, dati usati solo per rispondere via WhatsApp/email.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};
export default function Page(){
  return (
    <section className="section">
      <p className="section-label">Privacy</p>
      <h1>Privacy Policy</h1>
      <p style={{ marginTop: '18px', fontSize: '14px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '720px' }}>
        Titolare: Albert Simoni, trebla.dev.simoni@gmail.com. I dati inseriti nel configuratore vengono utilizzati esclusivamente per rispondere alla richiesta di preventivo via WhatsApp o email e non vengono salvati in database proprietari. Per esercitare i diritti, scrivi a trebla.dev.simoni@gmail.com.
      </p>
    </section>
  );
}

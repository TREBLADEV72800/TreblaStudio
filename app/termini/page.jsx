export const metadata = {
  title: 'Termini — Trebla Studio',
  description: 'Termini di servizio: due revisioni incluse, proprietà alla consegna, tempi e costi concordati.',
  alternates: { canonical: '/termini' },
  openGraph: {
    title: 'Termini — Trebla Studio',
    description: 'Termini di servizio: due revisioni incluse, proprietà alla consegna, tempi e costi concordati.',
    url: '/termini',
    siteName: 'Trebla Studio',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Termini — Trebla Studio',
    description: 'Termini di servizio: due revisioni incluse, proprietà alla consegna, tempi e costi concordati.',
    images: ['/trebla-logo-transparent.png'],
  },
  robots: { index: true, follow: true },
};
export default function Page(){
  return (
    <section className="section">
      <p className="section-label">Termini</p>
      <h1>Termini di<br /><em>servizio.</em></h1>
      <p style={{ marginTop: '18px', fontSize: '14px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '720px' }}>
        Le proposte includono due revisioni. La proprietà del sito viene trasferita alla consegna. Dettagli su tempi, costi e modalità di pagamento vengono concordati prima di iniziare.
      </p>
    </section>
  );
}

import '../src/styles.css';
import LayoutClient from '../components/LayoutClient';
import { dmMono, manrope, playfair } from './fonts';
import { getSiteUrl } from '../lib/site';

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Trebla Studio — Siti Web per Piccole Imprese in Piemonte | Asti',
    template: '%s | Trebla Studio',
  },
  description: 'Siti web chiari e curati per piccole attività di Asti e Piemonte: ristoranti, negozi, artigiani e professionisti. Prezzo chiaro da 350 €, tempi concordati, nessun canone obbligatorio.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Trebla Studio',
    title: 'Trebla Studio — Siti Web per Piccole Imprese in Piemonte | Asti',
    description: 'Siti web chiari e curati per piccole attività di Asti e Piemonte. Prezzo chiaro da 350 €, tempi concordati.',
    url: '/',
    images: [{ url: '/trebla-logo-transparent.png', width: 1200, height: 630, alt: 'Trebla Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trebla Studio — Siti Web per Piccole Imprese in Piemonte | Asti',
    description: 'Siti web chiari e curati per piccole attività di Asti e Piemonte. Prezzo chiaro da 350 €.',
    images: ['/trebla-logo-transparent.png'],
  },
};

export default function RootLayout({ children }) {
  const orgId = `${siteUrl}/#organization`;
  const lbId = `${siteUrl}/#localbusiness`;
  const logoUrl = `${siteUrl}/trebla-logo-transparent.png`;
  return (
    <html lang="it" className={`${dmMono.variable} ${manrope.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/trebla-logo-transparent.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": orgId,
          "name": "Trebla Studio",
          "url": `${siteUrl}/`,
          "logo": logoUrl,
          "description": "Trebla Studio — team di 2 giovani ad Asti: siti web, social e design. Prezzo chiaro da 350 €, tempi concordati.",
          "email": "trebla.dev.simoni@gmail.com",
          "telephone": "+393518924471",
          "areaServed": { "@type": "AdministrativeArea", "name": "Piemonte" }
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": lbId,
          "name": "Trebla Studio",
          "url": `${siteUrl}/`,
          "image": logoUrl,
          "priceRange": "€€",
          "description": "Team di 2 ad Asti: Albert Simoni (dev) + Gabriel Santospirito (design/SMM). Siti web, social, design per piccole imprese in Piemonte — Asti. Su appuntamento, lingue IT/EN.",
          "email": "trebla.dev.simoni@gmail.com",
          "telephone": "+393518924471",
          "address": { "@type": "PostalAddress", "addressRegion": "Piemonte", "addressLocality": "Asti", "addressCountry": "IT" },
          "areaServed": [{ "@type": "City", "name": "Asti" }, { "@type": "AdministrativeArea", "name": "Piemonte" }],
          "currenciesAccepted": "EUR",
          "paymentAccepted": "Cash, Bank Transfer"
        })}} />
      </head>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

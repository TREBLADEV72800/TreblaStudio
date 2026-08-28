import '../src/styles.css';
import LayoutClient from '../components/LayoutClient';

export const metadata = {
  metadataBase: new URL('https://treblastudio.vercel.app'),
  title: {
    default: 'Trebla Studio — Siti Web per Piccole Imprese in Piemonte | Asti',
    template: '%s | Trebla Studio',
  },
  description: 'Siti web chiari e curati per piccole attività di Asti e Piemonte: ristoranti, negozi, artigiani e professionisti. Prezzo chiaro da 350 €, tempi concordati, nessun canone obbligatorio.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Trebla Studio',
    title: 'Trebla Studio — Siti Web per Piccole Imprese in Piemonte | Asti',
    description: 'Siti web chiari e curati per piccole attività di Asti e Piemonte. Prezzo chiaro da 350 €, tempi concordati.',
    url: 'https://treblastudio.vercel.app/',
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
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="image" href="/trebla-logo.webp" type="image/webp" fetchPriority="high" />
        <link rel="icon" type="image/png" href="/trebla-logo-transparent.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://treblastudio.vercel.app/#organization",
          "name": "Trebla Studio",
          "url": "https://treblastudio.vercel.app/",
          "logo": "https://treblastudio.vercel.app/trebla-logo-transparent.png",
          "description": "Trebla Studio — team di 2 giovani ad Asti: siti web, social e design. Prezzo chiaro da 350 €, tempi concordati.",
          "email": "trebla.dev.simoni@gmail.com",
          "telephone": "+393518924471",
          "areaServed": { "@type": "AdministrativeArea", "name": "Piemonte" },
          "sameAs": ["https://wa.me/393518924471"]
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://treblastudio.vercel.app/#localbusiness",
          "name": "Trebla Studio",
          "url": "https://treblastudio.vercel.app/",
          "image": "https://treblastudio.vercel.app/trebla-logo-transparent.png",
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

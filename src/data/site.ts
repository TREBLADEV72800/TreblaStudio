export const site = {
  name: 'Trebla Studio',
  shortName: 'Trebla',
  url: (import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblastudio.it'),
  description: 'Siti web chiari e curati per piccole attività di Asti e Piemonte: ristoranti, negozi, artigiani e professionisti. Prezzo chiaro da 350 €, tempi concordati, nessun canone obbligatorio.',
  locale: 'it_IT',
  lang: 'it',
  email: 'trebla.dev.simoni@gmail.com',
  phone: '+393518924471',
  whatsapp: '393518924471',
  area: 'Piemonte',
  city: 'Asti',
  address: {
    region: 'Piemonte',
    locality: 'Asti',
    country: 'IT',
  },
  social: {
    pikete: 'https://piketelabel.vercel.app',
  },
  image: '/trebla-logo-transparent.png',
  twitterCard: 'summary_large_image' as const,
};

export function getSiteUrl() {
  if (import.meta.env.PUBLIC_SITE_URL) return import.meta.env.PUBLIC_SITE_URL.replace(/\/$/, '');
  // fallback for Vercel preview
  if (import.meta.env.VERCEL_URL) return `https://${import.meta.env.VERCEL_URL}`;
  return site.url;
}

export function canonicalUrl(path: string) {
  const base = getSiteUrl().replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

// Dati reali Trebla — non inventare nulla fuori da qui.
export const site = {
  name: 'Trebla',
  fullName: 'Trebla — Studio web ad Asti',
  url: 'https://treblatest.vercel.app',
  lang: 'it',
  locale: 'it_IT',
  description:
    'Trebla è uno studio indipendente ad Asti. Costruiamo siti web chiari per piccole attività — ristoranti, negozi, artigiani, professionisti. Da 300 €, senza canone obbligatorio.',
  email: 'trebla.dev.simoni@gmail.com',
  phoneDisplay: '+39 351 892 4471',
  phoneHref: '+393518924471',
  whatsapp: '393518924471',
  city: 'Asti',
  area: 'Piemonte',
  twitterCard: 'summary_large_image' as const,
};

export function canonicalUrl(path: string) {
  const base = site.url.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

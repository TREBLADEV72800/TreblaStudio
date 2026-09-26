// Dati reali Trebla: non inventare nulla fuori da qui.
export const site = {
  name: 'Trebla',
  fullName: 'Trebla, Studio web ad Asti',
  url: 'https://treblastudio.vercel.app',
  lang: 'it',
  locale: 'it_IT',
  description:
    'Trebla è uno studio indipendente ad Asti. Costruiamo siti web chiari per piccole attività: ristoranti, negozi, artigiani, professionisti. Da 300 €, senza canone obbligatorio.',
  email: 'trebla.dev.simoni@gmail.com',
  whatsapp: '393518924471',
  city: 'Asti',
  area: 'Asti',
  twitterCard: 'summary_large_image' as const,
};

export function canonicalUrl(path: string) {
  const base = site.url.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

// Anti-spam: numero ed email non vanno mai interpolati nel markup (href o testo).
// Per i link usare data-wa / data-mail: li assembla lo script in Layout.astro.

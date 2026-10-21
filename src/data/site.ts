// Dati reali Trebla: non inventare nulla fuori da qui.
// I contatti stanno in src/data/contatti.ts, i prezzi in src/data/prezzi.ts.

export const site = {
  name: 'Trebla',
  fullName: 'Trebla, Studio web ad Asti',
  // PUBLIC_SITE_URL sovrascrive il dominio (deploy su dominio proprio).
  url: import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblastudio.vercel.app',
  lang: 'it',
  locale: 'it_IT',
  description:
    'Trebla è uno studio indipendente ad Asti. Costruiamo siti web chiari per piccole attività: ristoranti, negozi, artigiani, professionisti. Da 300€, senza canone obbligatorio.',
  city: 'Asti',
  area: 'Asti',
  twitterCard: 'summary_large_image' as const,
};

export function canonicalUrl(path: string) {
  const base = site.url.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

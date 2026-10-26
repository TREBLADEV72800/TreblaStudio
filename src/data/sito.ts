// Dati reali Trebla: non inventare nulla fuori da qui.
// I contatti stanno in src/data/contatti.ts, i prezzi in src/data/prezzi.ts.

export const site = {
  name: 'Trebla',
  // PUBLIC_SITE_URL sovrascrive il dominio (deploy su dominio proprio).
  url: import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://treblastudio.pages.dev',
  lang: 'it',
  locale: 'it_IT',
  description:
    'Trebla è uno studio indipendente ad Asti. Costruiamo siti web chiari per piccole attività: ristoranti, negozi, artigiani, professionisti. Da 200€, senza canone obbligatorio.',
  twitterCard: 'summary_large_image' as const,
};

export function canonicalUrl(path: string) {
  const base = site.url.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  // Cloudflare Pages serve le pagine come directory: `/servizi/` risponde 200,
  // `/servizi` risponde 308. Canonical, og:url e sitemap usano la forma con slash.
  // `/404` è l'eccezione: è la pagina di errore, noindex.
  const canonico = clean === '/' || clean === '/404' ? clean : `${clean.replace(/\/$/, '')}/`;
  return `${base}${canonico}`;
}

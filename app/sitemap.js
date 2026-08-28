import { getSiteUrl } from '../lib/site';

export default function sitemap() {
  const base = getSiteUrl();
  const lastModified = new Date('2026-08-28');
  return [
    { url: `${base}/`, lastModified },
    { url: `${base}/servizi`, lastModified },
    { url: `${base}/servizi/siti-web`, lastModified },
    { url: `${base}/servizi/social-media`, lastModified },
    { url: `${base}/servizi/design`, lastModified },
    { url: `${base}/portfolio`, lastModified },
    { url: `${base}/chi-siamo`, lastModified },
    { url: `${base}/prezzi`, lastModified },
    { url: `${base}/faq`, lastModified },
    { url: `${base}/contatti`, lastModified },
    { url: `${base}/preventivo`, lastModified },
    { url: `${base}/eventi`, lastModified },
    { url: `${base}/assistenza`, lastModified },
    { url: `${base}/privacy`, lastModified },
    { url: `${base}/cookie`, lastModified },
    { url: `${base}/termini`, lastModified },
  ];
}

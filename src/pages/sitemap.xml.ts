import { site } from '../data/site';

export async function GET() {
  const base = site.url.replace(/\/$/, '');
  const lastModified = new Date('2026-08-28').toISOString();
  const urls = [
    '/',
    '/servizi',
    '/servizi/siti-web',
    '/servizi/social-media',
    '/servizi/design',
    '/chi-siamo',
    '/prezzi',
    '/faq',
    '/contatti',
    '/preventivo',
    '/eventi',
    '/assistenza',
    '/privacy',
    '/cookie',
    '/termini',
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${base}${u}</loc><lastmod>${lastModified}</lastmod><changefreq>weekly</changefreq><priority>${u === '/' ? '1.0' : '0.7'}</priority></url>`)
    .join('\n')}\n</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

import { site } from '../data/site';

const pagine = ['/', '/servizi', '/prezzi', '/preventivo', '/chi-siamo', '/contatti', '/faq'];

export function GET() {
  const oggi = new Date().toISOString().split('T')[0];
  const base = site.url.replace(/\/$/, '');
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pagine.map((p) => `  <url><loc>${base}${p}</loc><lastmod>${oggi}</lastmod></url>`).join('\n') +
    `\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

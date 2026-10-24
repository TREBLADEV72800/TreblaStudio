import { site } from '../data/sito';

export function GET() {
  const base = site.url.replace(/\/$/, '');
  const txt = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

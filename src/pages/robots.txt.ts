import { site } from '../data/site';

export async function GET() {
  const base = site.url.replace(/\/$/, '');
  const body = `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

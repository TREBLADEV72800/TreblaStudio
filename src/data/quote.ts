export const SERVICES = { SITE: 'site', SOCIAL: 'social', DESIGN: 'design' } as const;

export function parseServices(svc: unknown): string[] {
  if (!svc) return [];
  const list = String(svc).split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const mapped = list.map(s => {
    if (['site','sito','siti-web','sito-web','siti'].includes(s)) return 'site';
    if (['social','social-media','sm'].includes(s)) return 'social';
    if (['design','grafiche','grafica'].includes(s)) return 'design';
    return null;
  }).filter(Boolean) as string[];
  return [...new Set(mapped)];
}

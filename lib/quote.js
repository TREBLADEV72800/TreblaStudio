export const SERVICES = { SITE: 'site', SOCIAL: 'social', DESIGN: 'design' };

export function parseServices(svc) {
  if (!svc) return [];
  const list = String(svc).split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const mapped = list.map(s => {
    if (['site','sito','siti-web','sito-web','siti'].includes(s)) return 'site';
    if (['social','social-media','sm'].includes(s)) return 'social';
    if (['design','grafiche','grafica'].includes(s)) return 'design';
    return null;
  }).filter(Boolean);
  return [...new Set(mapped)];
}

// Pure calculation – mirrors PreventivoClient logic for testability
export function calculateQuote(form, { socialByType, designByType, socialNeedsList, designNeedsList, featuresByType }) {
  const hasSite = form.services.includes('site');
  const hasSocial = form.services.includes('social');
  const hasDesign = form.services.includes('design');
  const isAltro = form.type === 'Altro';
  let total = 0;
  if (hasSite) {
    if (isAltro) total = 0;
    else if (form.structure === 'Sito completo a più pagine') total = 420;
    else if (form.structure === 'Pagina singola') total = 370;
    else total = 350;
    if (!isAltro) {
      const list = featuresByType[form.type] || [];
      form.features.forEach((featName) => {
        const found = list.find((f) => f.name === featName);
        if (found) total += found.price;
      });
      const pageMap = { 'Home + Chi siamo + Contatti — consigliato': 0, 'Home + Servizi': 10, 'Home lunga a sezioni — una sola pagina': -20, 'Solo Home classica': -30 };
      form.pages.forEach(p => { if (pageMap[p] !== undefined) total += pageMap[p]; });
      if (form.photos === 'Fornisco io tutte le foto') total += 0;
      else if (form.photos === 'Fornisco alcune foto, per il resto ci affidiamo a voi') total += 15;
      else if (form.photos === 'Non ho foto pronte — ci pensate voi?') total += 25;
    }
  }
  if (hasSocial) {
    total += form.socialPlatforms.length * 10;
    const list = socialByType[form.type] || socialNeedsList;
    form.socialNeeds.forEach((needName) => {
      const found = list.find((n) => n.name === needName);
      if (found) total += found.price;
    });
  }
  if (hasDesign) {
    const list = designByType[form.type] || designNeedsList;
    form.designNeeds.forEach((desName) => {
      const found = list.find((d) => d.name === desName);
      if (found) total += found.price;
    });
  }
  if (form.bannerDiscount) total = Math.max(0, total - 20);
  return Number.isFinite(total) ? Math.max(0, Math.round(total)) : 0;
}

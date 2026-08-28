import PreventivoClient from '../../components/PreventivoClient';

export const metadata = {
  title: 'Configura il preventivo — Trebla Studio | Asti',
};

function parseServices(svc) {
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

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const svc = params?.services || params?.service;
  const initialServices = parseServices(svc);
  return <PreventivoClient initialServices={initialServices} />;
}

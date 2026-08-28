import { redirect } from 'next/navigation';
export const metadata = {
  title: 'Come lavoriamo — Trebla Studio | Asti',
  description: 'Dall’idea alla presenza online: brief su WhatsApp, materiali, design, revisioni, approvazione e pubblicazione.',
  alternates: { canonical: '/servizi#metodo' },
  robots: { index: false, follow: true },
};
export default function Page(){ redirect('/servizi#metodo'); }

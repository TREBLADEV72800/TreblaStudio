import { redirect } from 'next/navigation';
export const metadata = {
  title: 'Portfolio — Trebla Studio | Asti',
  description: 'Un progetto pubblicato e curato: Pikete Label, etichetta musicale di Asti/Alessandrino.',
  alternates: { canonical: '/chi-siamo#lavori' },
  robots: { index: false, follow: true },
};
export default function Page(){ redirect('/chi-siamo#lavori'); }

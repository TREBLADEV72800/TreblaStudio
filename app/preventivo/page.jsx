export const metadata = {
  title: 'Configura il preventivo — Trebla Studio | Asti',
  description: 'Rispondi a poche domande per ricevere il tuo preventivo. Sito, Social e Design combinabili, sconto partner opzionale.',
  alternates: { canonical: 'https://treblastudio.vercel.app/preventivo' },
};

import { Suspense } from 'react';
import PreventivoClient from '../../components/PreventivoClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<section className="section"><p>Caricamento configuratore...</p></section>}>
      <PreventivoClient />
    </Suspense>
  );
}

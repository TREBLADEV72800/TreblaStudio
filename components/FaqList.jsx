'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'E se in futuro voglio una modifica? E i bug?',
    a: 'Sono incluse 2 revisioni (anche correzioni testo) prima della pubblicazione. Dopo, modifiche future costano 15 € cad. I bug li sistemiamo gratis, previa nostra valutazione che si tratti effettivamente di un bug.',
  },
  {
    q: 'Quanto tempo ci vuole per realizzare il sito?',
    a: 'Per i progetti essenziali, circa 10 giorni lavorativi garantiti dopo aver ricevuto tutti i materiali (testi, foto, logo) e le tue approvazioni. Se i contenuti arrivano a scaglioni o servono più revisioni, i tempi si allungano di conseguenza.',
  },
  {
    q: "C'è un abbonamento mensile da pagare?",
    a: 'No, nessun abbonamento obbligatorio a Trebla. Il sito è di tua proprietà (codice, testi e grafiche consegnate). Restano a parte i costi tecnici ricorrenti: dominio (pagato direttamente a Vercel/hosting, ~10-20 €/anno variabile) e hosting se scegli di mantenerlo su Vercel. Backup, aggiornamenti e modifiche future sono su richiesta (vedi Assistenza).',
  },
  {
    q: "L'acconto è incluso nel prezzo?",
    a: "L'acconto fa parte del prezzo finale e serve a confermare l'avvio. Il resto alla consegna. Dettagli su tempi e modalità vengono concordati prima di iniziare.",
  },
  {
    q: 'Il dominio è incluso nel prezzo?',
    a: "No, il dominio (per esempio www.tuaattività.it) non è incluso nel preventivo. Se non ce l'hai già, ti aiutiamo a sceglierlo e registrarlo a tuo nome: il costo annuale del dominio varia in base al tipo di dominio scelto e viene pagato direttamente a Vercel, la piattaforma su cui pubblichiamo il sito, quindi non passa da noi.",
  },
  {
    q: 'Fate siti anche per chi ne ha già uno?',
    a: 'No, lavoriamo solo con attività che non hanno ancora un sito web: il nostro punto di forza è proprio partire da zero e costruire insieme la tua presenza online, senza rifacimenti di progetti fatti da altri.',
  },
  {
    q: 'Se non ho le foto come facciamo?',
    a: 'Nessun problema: possiamo venire direttamente presso la tua attività a scattare foto professionali.',
  },
  {
    q: 'Potete aiutarci a organizzare un evento?',
    a: 'Sì! Tramite la nostra etichetta discografica Pikete Label possiamo organizzare piccoli eventi con artisti per inaugurazioni, serate a tema o per sponsorizzare la tua attività.',
  },
];

export default function FaqList() {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-list" style={{ marginTop: '18px' }}>
      {FAQS.map((f, i) => (
        <div
          key={f.q}
          className="faq-card"
          onClick={() => setOpen(open === i ? null : i)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(open === i ? null : i); } }}
          aria-expanded={open === i}
        >
          <div className="faq-header">
            <h3>{f.q}</h3>
            <span className="faq-plus" style={{ transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.12s ease' }}>{open === i ? '×' : '+'}</span>
          </div>
          {open === i && <p style={{ marginTop: '10px' }}>{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

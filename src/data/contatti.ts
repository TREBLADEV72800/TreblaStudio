// Contatti reali Trebla.
// I frammenti non vanno mai in chiaro nel markup: si uniscono a runtime,
// in src/components/ContattiDinamici.astro e nel configuratore.
// Cambiare il numero o l'email si fa qui e in un solo punto.

export const contatti = {
  whatsapp: ['39', '351', '892', '4471'],
  email: ['trebla', '.dev', '.simoni', '@', 'gmail', '.com'],
} as const;

export const numeroWhatsapp = () => contatti.whatsapp.join('');
export const indirizzoEmail = () => contatti.email.join('');

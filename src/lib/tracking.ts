// Tracking: solo dataLayer con eventi propri, niente pixel.
// Usato dalla pagina e dal configuratore, così il formato degli eventi è uno solo.

export function track(nome: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'trebla_' + nome });
  window.dispatchEvent(new CustomEvent('trebla:track', { detail: nome }));
}

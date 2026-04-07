export interface Service {
  number: string
  title: string
  body: string
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Webdesign & Entwicklung',
    body: 'Maßgeschneiderte Websites in Next.js. Blitzschnell, mobiloptimiert, SEO-ready — und so gestaltet, dass man sie nicht vergisst.',
  },
  {
    number: '02',
    title: 'UX-Strategie & Konzeption',
    body: 'Bevor der erste Pixel gesetzt wird, denken wir durch, wie Ihre Website konvertiert. Struktur, Nutzerführung, Inhalte — alles geplant.',
  },
  {
    number: '03',
    title: 'Launch & Übergabe',
    body: 'Wir schalten Ihre Website live, weisen Sie ein, und stehen danach für Fragen bereit. Kein Support-Ticket. Eine direkte Nachricht.',
  },
]

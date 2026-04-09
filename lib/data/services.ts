export interface Service {
  number: string
  title: string
  body: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Webdesign & Entwicklung',
    body: 'Maßgeschneiderte Websites in Next.js. Blitzschnell, mobiloptimiert, SEO-ready — und so gestaltet, dass man sie nicht vergisst.',
    deliverables: [
      'Individuelles Design in Abstimmung mit Ihnen',
      'Entwicklung in Next.js — schnell, sicher, skalierbar',
      'Vollständig mobiloptimiert auf allen Geräten',
      'Pagespeed 90+ von Anfang an',
      'SEO-Grundstruktur: Meta-Tags, Sitemaps, URLs',
    ],
  },
  {
    number: '02',
    title: 'UX-Strategie & Konzeption',
    body: 'Bevor der erste Pixel gesetzt wird, denken wir durch, wie Ihre Website konvertiert. Struktur, Nutzerführung, Inhalte — alles geplant.',
    deliverables: [
      'Seitenstruktur & Navigationskonzept',
      'Nutzerführung zur Anfrage hin',
      'Inhaltsplanung: Was auf welche Seite gehört',
      'Zwei Feedback-Runden im Design',
      'Klarer Zeitplan von Tag 1',
    ],
  },
  {
    number: '03',
    title: 'Launch & Übergabe',
    body: 'Wir schalten Ihre Website live, weisen Sie ein, und stehen danach für Fragen bereit. Kein Support-Ticket. Eine direkte Nachricht.',
    deliverables: [
      'Technische Live-Schaltung inkl. Domain-Setup',
      'Persönliche 30-minütige Einweisung',
      '2 Wochen Nachbetreuung nach Launch',
      'Direkter Kontakt — kein Ticketsystem',
    ],
  },
]

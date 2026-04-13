export interface Service {
  number: string
  title: string
  description: string
  pills: string[]
  image: string | null
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Webdesign & Entwicklung',
    description:
      'Eine Website die schneller lädt als die Ihrer Wettbewerber — und bei Google gefunden wird, bevor Sie dafür extra zahlen müssen.',
    pills: ['Next.js', 'Mobiloptimiert', 'Pagespeed 95+', 'SEO-ready'],
    image: null,
  },
  {
    number: '02',
    title: 'UX-Strategie & Konzeption',
    description:
      'Kein Raten. Kein Nachbessern. Wir planen Struktur und Nutzerführung bevor wir bauen — damit das Ergebnis beim ersten Mal stimmt.',
    pills: ['Wireframes', 'Nutzerführung', 'Conversion-Fokus'],
    image: null,
  },
  {
    number: '03',
    title: 'Launch & persönliche Übergabe',
    description:
      'Wir schalten live, erklären alles, und sind danach direkt erreichbar — nicht über ein Ticket-System. Eine Nachricht an Benedikt oder Maximilian reicht.',
    pills: ['Live-Schaltung', 'Einweisung', 'Direkt erreichbar'],
    image: null,
  },
]

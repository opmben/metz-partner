export interface Project {
  slug: string
  name: string
  category: string
  serviceType: string
  coverImage: string
  featured: boolean
  imageReady: boolean
  shortDescription: string
  // Case study fields
  year: string
  location: string
  clientContext: string
  challenge: string
  approach: string
  additionalImages: string[]
}

export const projects: Project[] = [
  {
    slug: 'fahrschule-rhein-hunsrueck',
    name: 'Fahrschule Dirk Arnold',
    category: 'Bildung',
    serviceType: 'Website',
    coverImage: '/projekte/Fahrschule-DA.png',
    featured: true,
    imageReady: true,
    year: '2026',
    location: 'Rhein-Hunsrück, Rheinland-Pfalz',
    shortDescription:
      'Moderner Webauftritt für eine der führenden Fahrschulen im Rhein-Hunsrück — klare Struktur, zwei Standorte auf einen Blick, direkter Kontaktweg.',
    clientContext:
      'Eine der führenden Fahrschulen in der Rhein-Hunsrück Region mit zwei Standorten in Emmelshausen und Bad Salzig. Die bisherige Website war über 10 Jahre alt, überholt und bot keinen klaren Weg zur Kontaktaufnahme. Dies haben wir geändert.',
    challenge:
      'Eine Fahrschule mit zwei Standorten, breitem Kursangebot und aktivem Schulbetrieb — aber keine Website, die das abbildete. Anfragen kamen fast ausschließlich über Empfehlungen. Besucher der alten Seite fanden weder eine strukturierte Übersicht der Führerscheinklassen noch einfache Standortinformationen. Auf Mobilgeräten war die Seite kaum nutzbar — obwohl genau dort die meisten Fahrschüler suchen.',
    approach:
      'Wir haben die gesamte Seite von Grund auf neu strukturiert: klare Navigation, vollständige Übersicht aller Führerscheinklassen, eine eigene Standortseite mit Öffnungszeiten und direkten Kontaktmöglichkeiten sowie ein Fahrzeugbereich. Der Handlungsaufruf — "Jetzt anrufen" — ist konsequent auf jeder Seite präsent. Technisch mobiloptimiert, schnelle Ladezeiten, strukturierte Inhalte, die Fahrschüler genau dort abholen, wo sie suchen.',
    additionalImages: [],
  },
]

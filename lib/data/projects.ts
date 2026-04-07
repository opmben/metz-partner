export interface Project {
  slug: string
  name: string
  category: string
  serviceType: string
  coverImage: string
  featured: boolean
  shortDescription: string
}

export const projects: Project[] = [
  {
    slug: 'beispielprojekt-handwerk',
    name: 'Handwerker Website',
    category: 'Handwerk',
    serviceType: 'Website',
    coverImage: '/projekte/handwerk-cover.jpg',
    featured: true,
    shortDescription:
      'Moderne Website für einen regionalen Handwerksbetrieb — schnell, mobiloptimiert, überzeugend.',
  },
  {
    slug: 'beispielprojekt-gastronomie',
    name: 'Restaurant & Café',
    category: 'Gastronomie',
    serviceType: 'Website',
    coverImage: '/projekte/gastronomie-cover.jpg',
    featured: false,
    shortDescription:
      'Digitale Visitenkarte für eine Gaststätte — mit Online-Reservierung und Speisekarte.',
  },
]

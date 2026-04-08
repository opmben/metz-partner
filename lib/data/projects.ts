export interface Project {
  slug: string
  name: string
  category: string
  serviceType: string
  coverImage: string
  featured: boolean
  shortDescription: string
  /**
   * Set to false until a real screenshot is placed in /public/projekte/.
   * ProjectCard renders a styled placeholder when imageReady is false.
   */
  imageReady: boolean
}

export const projects: Project[] = [
  {
    slug: 'schreinerei-mosel',
    name: 'Schreinerei Mosel',
    category: 'Handwerk',
    serviceType: 'Website',
    coverImage: '/projekte/schreinerei-mosel.jpg',
    featured: true,
    imageReady: false,
    shortDescription:
      'Neue Web-Präsenz für einen Schreinereibetrieb an der Mosel — klare Leistungsübersicht, mobil optimiert, direkte Anfragemöglichkeit.',
  },
  {
    slug: 'kanzlei-koblenz',
    name: 'Anwaltskanzlei Koblenz',
    category: 'Kanzlei',
    serviceType: 'Website',
    coverImage: '/projekte/kanzlei-koblenz.jpg',
    featured: false,
    imageReady: false,
    shortDescription:
      'Seriöser, vertrauenswürdiger Auftritt für eine Koblenz Kanzlei — DSGVO-konformes Kontaktformular, Leistungsseiten, strukturierte Inhalte.',
  },
]

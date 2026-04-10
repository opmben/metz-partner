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
  {
    slug: 'schreinerei-mosel',
    name: 'Schreinerei Mosel',
    category: 'Handwerk',
    serviceType: 'Website',
    coverImage: '/projekte/schreinerei-mosel.jpg',
    featured: false,
    imageReady: false,
    year: '2024',
    location: 'Mosel, Rheinland-Pfalz',
    shortDescription:
      'Neue Web-Präsenz für einen Schreinereibetrieb an der Mosel — klare Leistungsübersicht, mobil optimiert, direkte Anfragemöglichkeit.',
    clientContext:
      'Ein inhabergeführter Schreinereibetrieb mit über 20 Jahren Erfahrung — bekannt in der Region, aber online kaum sichtbar. Die bisherige Website war über 10 Jahre alt, auf Desktop ausgerichtet und bot keinen klaren Weg zur Kontaktaufnahme.',
    challenge:
      'Der Betrieb erhielt kaum Anfragen über seine Website. Potenzielle Kunden konnten weder Leistungen noch Referenzen nachvollziehen. Auf Mobilgeräten war die Seite praktisch nicht nutzbar. Ziel: Eine Website, die handwerkliche Qualität sichtbar macht und konkrete Anfragen generiert.',
    approach:
      'Wir haben die Seite von Grund auf neu gebaut — auf Next.js, vollständig mobiloptimiert. Im Mittelpunkt: eine klare Leistungsübersicht, eine Referenzgalerie mit Werkstückfotos und ein direktes Kontaktformular. Der Eigentümer wollte keine Verwaltungsaufwand — also haben wir alles so strukturiert, dass Kunden auf direktem Weg anfragen können.',
    additionalImages: [],
  },
  {
    slug: 'kanzlei-koblenz',
    name: 'Anwaltskanzlei Koblenz',
    category: 'Kanzlei',
    serviceType: 'Website',
    coverImage: '/projekte/kanzlei-koblenz.jpg',
    featured: false,
    imageReady: false,
    year: '2024',
    location: 'Koblenz, Rheinland-Pfalz',
    shortDescription:
      'Seriöser, vertrauenswürdiger Auftritt für eine Koblenz Kanzlei — DSGVO-konformes Kontaktformular, Leistungsseiten, strukturierte Inhalte.',
    clientContext:
      'Eine Einzelanwältin mit Schwerpunkt Familienrecht und Erbrecht. Mandanten finden sie bisher über Empfehlungen — die Website sollte diesen ersten Vertrauensaufbau digital abbilden und rechtliche Kompetenz ohne Fachjargon vermitteln.',
    challenge:
      'Kanzleiwebsites wirken oft kalt und unzugänglich. Hier war das Gegenteil gefragt: eine Seite, die Vertrauen weckt, bevor der erste Anruf kommt. DSGVO-Konformität war dabei keine Option, sondern Pflicht — Benedikt hat den rechtlichen Rahmen direkt in die technische Umsetzung eingebaut.',
    approach:
      'Klare Seitenstruktur: Startseite, Leistungsseiten pro Rechtsgebiet, eine persönliche Über-mich-Seite und ein barrierefreies Kontaktformular. Wir haben bewusst auf Legalese verzichtet und jeden Text so formuliert, dass er für Mandanten, nicht für Kollegen verständlich ist. Technisch: Next.js, server-seitiges Rendering für Pagespeed, DSGVO-konformes Kontaktformular ohne externe Dienste.',
    additionalImages: [],
  },
]

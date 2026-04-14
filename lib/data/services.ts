export interface Service {
  id: string
  number: string
  tag: string
  title: string
  status: 'available' | 'coming-soon'
  statusLabel: string
  statusBadge?: string
  description: string
  pills: string[]
  visual: string
  defaultOpen: boolean
}

export const services: Service[] = [
  {
    id: 'webdesign',
    number: '01',
    tag: 'Kernleistung',
    title: 'Webdesign & Entwicklung',
    status: 'available',
    statusLabel: 'Verfügbar',
    description:
      'Eine Website die schneller lädt als die Ihrer Wettbewerber — und bei Google gefunden wird, bevor Sie dafür extra zahlen müssen.',
    pills: ['Next.js', 'Mobiloptimiert', 'Pagespeed 95+', 'SEO-ready', 'Framer Motion'],
    visual: '/visuals/service-webdesign.svg',
    defaultOpen: true,
  },
  {
    id: 'seo',
    number: '02',
    tag: 'In Vorbereitung',
    title: 'SEO-Optimierung',
    status: 'coming-soon',
    statusLabel: 'Demnächst',
    statusBadge: 'Bald',
    description:
      'Gefunden werden, bevor Sie für Werbung zahlen müssen. Wir optimieren Ihre Website technisch und inhaltlich für Google — nachhaltig, messbar, ohne monatliche Mindestlaufzeiten.',
    pills: ['On-Page SEO', 'Technisches SEO', 'Keyword-Analyse', 'Lokales SEO', 'Pagespeed'],
    visual: '/visuals/service-seo.svg',
    defaultOpen: false,
  },
  {
    id: 'branding',
    number: '03',
    tag: 'In Vorbereitung',
    title: 'Branding & Visuelle Identität',
    status: 'coming-soon',
    statusLabel: 'Demnächst',
    statusBadge: 'Bald',
    description:
      'Ein Unternehmen das gut aussieht wird ernster genommen. Wir entwickeln visuelle Identitäten die zu Ihrem Unternehmen passen — Logo, Farben, Typografie, alles aus einem Guss.',
    pills: ['Logo-Design', 'Farbsystem', 'Typografie', 'Brand Guidelines', 'Visitenkarten'],
    visual: '/visuals/service-branding.svg',
    defaultOpen: false,
  },
]

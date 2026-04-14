export interface Service {
  id: string
  number: string
  title: string
  description: string
  pills: string[]
  visual: string
}

export const services: Service[] = [
  {
    id: 'webdesign',
    number: '01',
    title: 'Webdesign & Entwicklung',
    description:
      'Eine Website die schneller lädt als die Ihrer Wettbewerber — und bei Google gefunden wird, bevor Sie dafür extra zahlen müssen.',
    pills: ['Next.js', 'Mobiloptimiert', 'Pagespeed 95+', 'SEO-ready', 'Framer Motion'],
    visual: '/visuals/service-webdesign.svg',
  },
  {
    id: 'seo',
    number: '02',
    title: 'SEO-Optimierung',
    description:
      'Gefunden werden, bevor Sie für Werbung zahlen müssen. Wir optimieren Ihre Website technisch und inhaltlich für Google — nachhaltig, messbar, ohne monatliche Mindestlaufzeiten.',
    pills: ['On-Page SEO', 'Technisches SEO', 'Keyword-Analyse', 'Lokales SEO', 'Pagespeed'],
    visual: '/visuals/service-seo.svg',
  },
  {
    id: 'branding',
    number: '03',
    title: 'Branding & Visuelle Identität',
    description:
      'Ein Unternehmen das gut aussieht wird ernster genommen. Wir entwickeln visuelle Identitäten die zu Ihrem Unternehmen passen — Logo, Farben, Typografie, alles aus einem Guss.',
    pills: ['Logo-Design', 'Farbsystem', 'Typografie', 'Brand Guidelines', 'Visitenkarten'],
    visual: '/visuals/service-branding.svg',
  },
]

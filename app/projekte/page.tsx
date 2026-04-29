import type { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ProjetteGrid } from '@/components/sections/ProjetteGrid'
import { JsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = {
  title: 'Projekte — Metz & Partner',
  description:
    'Ausgewählte Webdesign-Projekte von Metz & Partner aus dem Rhein-Hunsrück — für Unternehmen in Koblenz, Rheinland-Pfalz und der Moselregion.',
  alternates: {
    canonical: 'https://metzundpartner.com/projekte',
  },
  openGraph: {
    title: 'Projekte — Metz & Partner',
    description:
      'Ausgewählte Webdesign-Projekte von Metz & Partner aus dem Rhein-Hunsrück — für Unternehmen in Koblenz, Rheinland-Pfalz und der Moselregion.',
    url: 'https://metzundpartner.com/projekte',
    siteName: 'Metz & Partner',
  },
}

export default function ProjektePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Startseite',
              item: 'https://metzundpartner.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Projekte',
              item: 'https://metzundpartner.com/projekte',
            },
          ],
        }}
      />
      <Navigation />
      <main>
        <ProjetteGrid />
      </main>
      <Footer />
    </>
  )
}

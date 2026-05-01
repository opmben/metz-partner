import type { Metadata } from 'next'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PageLoader } from '@/components/shared/PageLoader'
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { JsonLd } from '@/components/shared/JsonLd'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
})

const BASE_URL = 'https://metzundpartner.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Metz & Partner ∙ Webdesign aus Koblenz',
  description:
    'Wir sind Benedikt und Maximilian — zwei Gründer aus Koblenz, die Websites bauen, die nicht nur gut aussehen, sondern echte Ergebnisse liefern.',
  keywords: [
    'Webdesign Koblenz',
    'Website Rheinland-Pfalz',
    'Webdesign Mosel',
    'Website erstellen Koblenz',
    'Webentwicklung Koblenz',
  ],
  authors: [{ name: 'Benedikt Metz' }, { name: 'Maximilian Metz' }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Metz & Partner ∙ Webdesign aus Koblenz',
    description:
      'Websites, die Unternehmen wachsen lassen. Persönlich. Direkt. Aus Koblenz.',
    type: 'website',
    locale: 'de_DE',
    url: BASE_URL,
    siteName: 'Metz & Partner',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Metz & Partner — Webdesign aus Koblenz',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      className={`${instrumentSerif.variable} ${dmSans.variable}`}
    >
      <body>
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Metz & Partner Webdesign',
              legalName: 'Benedikt Metz, Maximilian Metz & Pavel Baev GbR',
              url: 'https://metzundpartner.com',
              telephone: '+49 176 47376593',
              email: 'anfragen@metzundpartner.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Liesenfelder Straße 64',
                postalCode: '56281',
                addressLocality: 'Emmelshausen',
                addressCountry: 'DE',
              },
              areaServed: [
                { '@type': 'City', name: 'Koblenz' },
                { '@type': 'AdministrativeArea', name: 'Rhein-Hunsrück' },
                { '@type': 'AdministrativeArea', name: 'Moselregion' },
                { '@type': 'AdministrativeArea', name: 'Rheinland-Pfalz' },
              ],
              sameAs: [
                'https://www.google.com/maps/place/Metz+%26+Partner/@50.1593506,7.54734,17z/data=!4m6!3m5!1s0x47be7320c5157e09:0xe61f4be426ea7827!8m2!3d50.1593506!4d7.54734!16s%2Fg%2F11z57z6tlb',
                'https://www.linkedin.com/in/metzbenedikt',
                'https://www.linkedin.com/in/maximilian-metz-448372221/',
              ],
              founder: [
                {
                  '@type': 'Person',
                  name: 'Benedikt Metz',
                  sameAs: 'https://www.linkedin.com/in/metzbenedikt',
                },
                {
                  '@type': 'Person',
                  name: 'Maximilian Metz',
                  sameAs: 'https://www.linkedin.com/in/maximilian-metz-448372221/',
                },
              ],
              image: 'https://metzundpartner.com/opengraph-image',
              logo: 'https://metzundpartner.com/logo.png',
              priceRange: '€€',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://metzundpartner.com',
              name: 'Metz & Partner',
              description:
                'Webdesign und Webentwicklung aus dem Rhein-Hunsrück für Koblenz, Rheinland-Pfalz und die Region.',
            },
          ]}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <PageLoader />
          <ScrollProgress />
          {children}
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}

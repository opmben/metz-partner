import type { Metadata } from 'next'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/shared/SmoothScroll'
import { PageLoader } from '@/components/shared/PageLoader'
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { DotFieldBackground } from '@/components/shared/DotFieldBackground'

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

export const metadata: Metadata = {
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
  openGraph: {
    title: 'Metz & Partner ∙ Webdesign aus Koblenz',
    description:
      'Websites, die Unternehmen wachsen lassen. Persönlich. Direkt. Aus Koblenz.',
    type: 'website',
    locale: 'de_DE',
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
        <SmoothScroll>
          <DotFieldBackground />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <PageLoader />
            <ScrollProgress />
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ProjetteGrid } from '@/components/sections/ProjetteGrid'

export const metadata: Metadata = {
  title: 'Projekte — Metz & Partner',
  description: 'Ausgewählte Arbeiten von Metz & Partner — Webdesign aus Koblenz für die Region.',
}

export default function ProjektePage() {
  return (
    <>
      <Navigation />
      <main>
        <ProjetteGrid />
      </main>
      <Footer />
    </>
  )
}

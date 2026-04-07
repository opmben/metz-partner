import type { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { projects } from '@/lib/data/projects'

export const metadata: Metadata = {
  title: 'Projekte — Metz & Partner',
  description: 'Ausgewählte Arbeiten von Metz & Partner — Webdesign aus Koblenz.',
}

export default function ProjektePage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '8rem' }}>
        <div className="container-site" style={{ paddingBottom: '5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <SectionLabel>Alle Arbeiten</SectionLabel>
          </div>
          <h1 className="display-section" style={{ marginBottom: '3rem' }}>
            Unsere Projekte.
          </h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { projects } from '@/lib/data/projects'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.name} — Metz & Partner`,
    description: project.shortDescription,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero image */}
        <div
          style={{
            position: 'relative',
            height: '70vh',
            minHeight: 400,
            background: 'var(--surface)',
          }}
        >
          <Image
            src={project.coverImage}
            alt={`Screenshot der Website für ${project.name}`}
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.85 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 30%, var(--bg) 100%)',
            }}
          />
        </div>

        <div className="container-site" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
          {/* Overview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
              marginBottom: '4rem',
            }}
            className="md:grid-cols-2"
          >
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--accent)',
                  marginBottom: '0.75rem',
                }}
              >
                {project.category} · {project.serviceType}
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}
              >
                {project.name}
              </h1>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 300,
                  color: 'var(--muted)',
                  lineHeight: 1.75,
                }}
              >
                {project.shortDescription}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                alignContent: 'start',
              }}
            >
              {(
                [
                  { label: 'Branche', value: project.category },
                  { label: 'Leistung', value: project.serviceType },
                  { label: 'Jahr', value: '2024' },
                  { label: 'Region', value: 'Rheinland-Pfalz' },
                ] as const
              ).map(({ label, value }) => (
                <div key={label}>
                  <p
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--muted)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 300 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
            className="md:flex-row md:items-center md:justify-between"
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontStyle: 'italic',
                color: 'var(--text)',
              }}
            >
              Ähnliches Projekt? Sprechen wir.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a
                href="/#kontakt"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0.9rem 2rem',
                  borderRadius: 100,
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Projekt anfragen
              </a>
              {nextProject && (
                <Link
                  href={`/projekte/${nextProject.slug}`}
                  style={{
                    color: 'var(--muted)',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    textDecoration: 'none',
                  }}
                >
                  Nächstes Projekt →
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

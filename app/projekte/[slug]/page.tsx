import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { projects } from '@/lib/data/projects'
import StarBorder from '@/components/StarBorder'

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

const metaLabel: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--muted)',
  marginBottom: '0.3rem',
}

const metaValue: React.CSSProperties = {
  fontSize: '0.95rem',
  color: 'var(--text)',
  fontWeight: 300,
  lineHeight: 1.5,
}

const sectionHeading: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--accent)',
  marginBottom: '1.25rem',
}

const bodyText: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 300,
  color: 'var(--muted)',
  lineHeight: 1.85,
  maxWidth: 680,
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
          {project.imageReady ? (
            <Image
              src={project.coverImage}
              alt={`Screenshot der Website für ${project.name}`}
              fill
              priority
              style={{ objectFit: 'cover', opacity: 0.85 }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--border-hover)',
                }}
              >
                Screenshot folgt
              </span>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 30%, var(--bg) 100%)',
            }}
          />
          {/* Project name overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: 0,
              right: 0,
              padding: '0 clamp(1.5rem, 4vw, 4rem)',
            }}
          >
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--accent)',
                marginBottom: '0.6rem',
              }}
            >
              {project.category} · {project.serviceType}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.05,
              }}
            >
              {project.name}
            </h1>
          </div>
        </div>

        <div className="container-site" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>

          {/* Overview grid */}
          <div
            style={{ gap: '4rem', marginBottom: '5rem' }}
            className="grid grid-cols-1 md:grid-cols-[1fr_280px]"
          >
            {/* Client context */}
            <div>
              <p style={sectionHeading}>Über das Projekt</p>
              <p style={{ ...bodyText, color: 'var(--text)' }}>
                {project.clientContext}
              </p>
            </div>

            {/* Metadata */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                alignContent: 'start',
                paddingTop: '1.75rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              {(
                [
                  { label: 'Branche', value: project.category },
                  { label: 'Leistung', value: project.serviceType },
                  { label: 'Jahr', value: project.year },
                  { label: 'Region', value: project.location },
                ] as const
              ).map(({ label, value }) => (
                <div key={label}>
                  <p style={metaLabel}>{label}</p>
                  <p style={metaValue}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Aufgabe */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '4rem',
              marginBottom: '4rem',
              display: 'grid',
              gap: '2rem',
            }}
            className="grid-cols-1 md:grid md:grid-cols-[200px_1fr]"
          >
            <p style={sectionHeading}>Aufgabe</p>
            <p style={bodyText}>{project.challenge}</p>
          </div>

          {/* Umsetzung */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '4rem',
              marginBottom: '4rem',
              display: 'grid',
              gap: '2rem',
            }}
            className="grid-cols-1 md:grid md:grid-cols-[200px_1fr]"
          >
            <p style={sectionHeading}>Umsetzung</p>
            <p style={bodyText}>{project.approach}</p>
          </div>

          {/* Additional screenshots */}
          {project.additionalImages.length > 0 && (
            <div
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '4rem',
                marginBottom: '4rem',
              }}
            >
              <p style={{ ...sectionHeading, marginBottom: '2rem' }}>Eindrücke</p>
              <div
                style={{ gap: '1rem' }}
                className="grid grid-cols-1 md:grid-cols-2"
              >
                {project.additionalImages.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      aspectRatio: '16/10',
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: 'var(--surface)',
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Projekteinblick ${i + 1} — ${project.name}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '3.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
            className="md:flex-row md:items-center md:justify-between"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  lineHeight: 1.2,
                }}
              >
                Ähnliches Projekt?{' '}
                <span style={{ color: 'var(--muted)' }}>Sprechen wir.</span>
              </p>
              <p
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  color: 'var(--muted)',
                }}
              >
                Kostenlos und unverbindlich — direkt mit Benedikt oder Maximilian.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexShrink: 0 }}>
              <StarBorder as="a" href="/#kontakt">
                Projekt anfragen
              </StarBorder>
              {nextProject && (
                <Link
                  href={`/projekte/${nextProject.slug}`}
                  style={{
                    color: 'var(--muted)',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
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

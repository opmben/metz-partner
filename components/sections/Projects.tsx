'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { projects } from '@/lib/data/projects'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/data/projects'

// ─────────────────────────────────────────────────────────────────────────────
// Browser Chrome
// ─────────────────────────────────────────────────────────────────────────────

function BrowserChrome({ url }: { url: string }) {
  return (
    <div
      style={{
        height: 44,
        background: 'rgba(6, 6, 6, 0.94)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.065)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        flexShrink: 0,
      }}
    >
      {/* Traffic lights */}
      <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
        {[
          { fill: '#FF5F57', glow: 'rgba(255,95,87,0.55)' },
          { fill: '#FEBC2E', glow: 'rgba(254,188,46,0.50)' },
          { fill: '#28C840', glow: 'rgba(40,200,64,0.50)' },
        ].map(({ fill, glow }, i) => (
          <div
            key={i}
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: fill,
              boxShadow: `0 0 6px ${glow}`,
              opacity: 0.82,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* URL bar */}
      <div
        style={{
          flex: 1,
          height: 26,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          overflow: 'hidden',
          padding: '0 10px',
        }}
      >
        {/* Lock icon */}
        <svg
          width="7"
          height="9"
          viewBox="0 0 7 9"
          fill="none"
          aria-hidden
          style={{ flexShrink: 0, opacity: 0.22 }}
        >
          <rect x="0.5" y="3.5" width="6" height="5" rx="1" stroke="white" strokeWidth="1" />
          <path d="M2 3.5V2.5a1.5 1.5 0 1 1 3 0v1" stroke="white" strokeWidth="1" />
        </svg>
        <span
          style={{
            fontSize: '0.6rem',
            color: 'rgba(255, 255, 255, 0.26)',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '0.025em',
            whiteSpace: 'nowrap',
          }}
        >
          {url}
        </span>
      </div>

      {/* Mirror spacer */}
      <div style={{ width: 44, flexShrink: 0 }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Browser Card
// ─────────────────────────────────────────────────────────────────────────────

function ProjectBrowserCard({
  project,
  featured = true,
  delay = 0,
}: {
  project: Project
  featured?: boolean
  delay?: number
}) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const shouldReduce = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-60px' })

  const displayUrl = project.displayUrl ?? `${project.slug}.de`

  return (
    <motion.div
      ref={cardRef}
      initial={shouldReduce ? undefined : { opacity: 0, y: 52 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 52 }
      }
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <Link
        href={`/projekte/${project.slug}`}
        style={{ display: 'block', cursor: 'pointer' }}
      >
        <motion.div
          className="panel-browser"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{
            borderColor: hovered
              ? 'rgba(255,255,255,0.18)'
              : 'rgba(255,255,255,0.09)',
            boxShadow: hovered
              ? 'inset 0 1px 0 rgba(255,255,255,0.26), 0 36px 90px rgba(0,0,0,0.64), 0 0 96px rgba(211,253,81,0.07)'
              : 'inset 0 1px 0 rgba(255,255,255,0.13), 0 18px 60px rgba(0,0,0,0.50), 0 0 56px rgba(211,253,81,0.04)',
            y: hovered ? (shouldReduce ? 0 : -4) : 0,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: 0,
            overflow: 'hidden',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.044), rgba(255,255,255,0.020)), rgba(6,6,6,0.46)',
          }}
        >
          {/* Luminous top-edge catchlight — sits above chrome */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: '8%',
              right: '8%',
              height: 1,
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.30) 28%, rgba(255,255,255,0.20) 72%, transparent)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />

          {/* Browser chrome */}
          <BrowserChrome url={displayUrl} />

          {/* Screenshot viewport */}
          <div
            style={{
              position: 'relative',
              aspectRatio: featured ? '16/9' : '4/3',
              overflow: 'hidden',
            }}
          >
            {/* Image wrapper */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
              }}
            >
              {imgError ? (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(160deg, #141414 0%, #0a0a0a 100%)',
                  }}
                />
              ) : (
                <Image
                  src={project.coverImage}
                  alt={`Website von ${project.name}`}
                  fill
                  sizes={
                    featured
                      ? '(min-width: 1280px) 70vw, 100vw'
                      : '(min-width: 1280px) 32vw, 100vw'
                  }
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  onError={() => setImgError(true)}
                  priority={featured}
                />
              )}
            </div>

            {/* Image scale on hover */}
            {!shouldReduce && (
              <motion.div
                animate={{ scale: hovered ? 1.025 : 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              />
            )}

            {/* Bottom atmospheric fade into info strip */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background:
                  'linear-gradient(to top, rgba(6,6,6,0.82) 0%, rgba(6,6,6,0.30) 60%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* Hover overlay — darkens and surfaces the CTA pill */}
            <motion.div
              animate={{
                background: hovered ? 'rgba(0,0,0,0.22)' : 'rgba(0,0,0,0)',
              }}
              transition={{ duration: 0.38 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            >
              <motion.div
                animate={{
                  opacity: hovered ? 1 : 0,
                  y: hovered ? 0 : 16,
                  scale: hovered ? 1 : 0.88,
                }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'rgba(255, 255, 255, 0.09)',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: 999,
                  padding: featured ? '0.85rem 2.4rem' : '0.65rem 1.8rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: featured ? '0.8rem' : '0.72rem',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(255, 255, 255, 0.92)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.24), 0 8px 32px rgba(0,0,0,0.32)',
                  whiteSpace: 'nowrap' as const,
                }}
              >
                Projekt ansehen
              </motion.div>
            </motion.div>
          </div>

          {/* Info strip — dark glass */}
          <motion.div
            animate={{ y: hovered ? 0 : 6 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: featured ? '1.4rem 1.8rem' : '1rem 1.4rem',
              background: 'rgba(6, 6, 6, 0.68)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.30)',
                  marginBottom: '0.32rem',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                {project.category} · {project.year}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: featured
                    ? 'clamp(1.1rem, 1.9vw, 1.5rem)'
                    : 'clamp(0.95rem, 1.3vw, 1.2rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  margin: 0,
                }}
              >
                {project.name}
              </h3>
            </div>

            {/* Arrow circle */}
            <motion.div
              animate={{
                x: hovered ? 0 : -5,
                opacity: hovered ? 1 : 0.22,
              }}
              transition={{ duration: 0.36, ease: 'easeOut' }}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.85)',
                flexShrink: 0,
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <ArrowUpRight size={15} />
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects Section
// ─────────────────────────────────────────────────────────────────────────────

export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const realProjects = projects.filter((p) => p.imageReady && p.coverImage)
  if (realProjects.length === 0) return null

  const featuredProject = realProjects[0]
  const secondaryProjects = realProjects.slice(1, 3)
  const hasSecondary = secondaryProjects.length > 0

  return (
    <section
      id="projekte"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'clip',
        overflowClipMargin: '200px',
      }}
    >
      {/* Warm atmospheric bloom — asymmetric, sits behind featured card */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '80vw',
          height: '70vw',
          maxWidth: 1000,
          maxHeight: 800,
          background:
            'radial-gradient(ellipse at 70% 40%, rgba(212,131,10,0.14) 0%, rgba(198,124,59,0.09) 38%, transparent 65%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '50vw',
          height: '40vw',
          maxWidth: 600,
          maxHeight: 500,
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(184,134,11,0.09) 0%, transparent 60%)',
          filter: 'blur(72px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ marginBottom: '3.5rem', gap: '1.5rem' }}
        >
          {/* Left — headline only, no eyebrow pill — this section leads with proof, not orientation */}
          <div>
            {/* Headline — clip reveal */}
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="display-section"
                initial={shouldReduce ? undefined : { y: '108%' }}
                animate={
                  shouldReduce
                    ? undefined
                    : isHeaderInView
                    ? { y: '0%' }
                    : { y: '108%' }
                }
                transition={{
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Arbeit, die überzeugt.
              </motion.h2>
            </div>

            {/* Inline caption — plain, no glass surface */}
            <motion.p
              initial={shouldReduce ? undefined : { opacity: 0 }}
              animate={
                shouldReduce
                  ? undefined
                  : isHeaderInView
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.22)',
                margin: '0.7rem 0 0',
              }}
            >
              Ausgewählte Arbeiten
            </motion.p>
          </div>

        </div>

        {/* ── Project grid ── */}
        {hasSecondary ? (
          // Multi-project: featured large left + secondary grid right
          <div
            style={{ display: 'grid', gap: '1rem' }}
            className="grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
          >
            <ProjectBrowserCard
              project={featuredProject}
              featured
              delay={0}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {secondaryProjects.map((project, i) => (
                <ProjectBrowserCard
                  key={project.slug}
                  project={project}
                  featured={false}
                  delay={(i + 1) * 0.12}
                />
              ))}
            </div>
          </div>
        ) : (
          // Single project: full-width featured
          <ProjectBrowserCard
            project={featuredProject}
            featured
            delay={0}
          />
        )}

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link
            href="/projekte"
            className="button-ghost-glass"
            style={{
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.82rem',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: 'var(--muted)',
            }}
          >
            Alle Projekte ansehen
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

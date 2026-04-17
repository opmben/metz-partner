'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
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
        height: 42,
        background: 'rgba(8, 8, 8, 0.94)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
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
          { fill: '#FF5F57', ring: 'rgba(255,95,87,0.4)' },
          { fill: '#FEBC2E', ring: 'rgba(254,188,46,0.35)' },
          { fill: '#28C840', ring: 'rgba(40,200,64,0.35)' },
        ].map(({ fill, ring }, i) => (
          <div
            key={i}
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: fill,
              boxShadow: `0 0 5px ${ring}`,
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
          height: 24,
          background: 'rgba(255, 255, 255, 0.04)',
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
          style={{ flexShrink: 0, opacity: 0.28 }}
        >
          <rect x="0.5" y="3.5" width="6" height="5" rx="1" stroke="white" strokeWidth="1" />
          <path d="M2 3.5V2.5a1.5 1.5 0 1 1 3 0v1" stroke="white" strokeWidth="1" />
        </svg>
        <span
          style={{
            fontSize: '0.615rem',
            color: 'rgba(255, 255, 255, 0.26)',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          {url}
        </span>
      </div>

      {/* Spacer mirrors traffic lights */}
      <div style={{ width: 42, flexShrink: 0 }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Mockup Card
// ─────────────────────────────────────────────────────────────────────────────

function ProjectMockupCard({
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

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-30px', '30px'])

  const displayUrl = project.displayUrl ?? `${project.slug}.de`

  return (
    <motion.div
      ref={cardRef}
      initial={shouldReduce ? undefined : { opacity: 0, y: 36 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 36 }
      }
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      <Link
        href={`/projekte/${project.slug}`}
        className="block"
        style={{ cursor: 'pointer' }}
      >
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{
            borderColor: hovered
              ? 'rgba(255,255,255,0.16)'
              : 'rgba(255,255,255,0.09)',
            boxShadow: hovered
              ? '0 0 0 1px rgba(255,255,255,0.08), 0 24px 72px rgba(0,0,0,0.65), 0 0 80px rgba(212,131,10,0.07), inset 0 1px 0 rgba(255,255,255,0.16)'
              : '0 0 0 1px rgba(255,255,255,0.03), 0 12px 48px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.09)',
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.035)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            borderRadius: featured ? 20 : 16,
            overflow: 'hidden',
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.03), 0 12px 48px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.09)',
          }}
        >
          {/* Luminous top-edge highlight */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: '12%',
              right: '12%',
              height: 1,
              background: 'rgba(255,255,255,0.20)',
              borderRadius: '50%',
              filter: 'blur(0.5px)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* Browser Chrome */}
          <BrowserChrome url={displayUrl} />

          {/* Screenshot viewport */}
          <div
            style={{
              position: 'relative',
              aspectRatio: featured ? '16/9' : '4/3',
              overflow: 'hidden',
            }}
          >
            {/* Image with scroll parallax */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '-10% 0',
                y: shouldReduce ? 0 : imageY,
              }}
            >
              {imgError ? (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(160deg, #121212 0%, #0a0a0a 100%)',
                  }}
                />
              ) : (
                <Image
                  src={project.coverImage}
                  alt={`Website von ${project.name}`}
                  fill
                  sizes={
                    featured
                      ? '(min-width: 1280px) 60vw, 100vw'
                      : '(min-width: 1280px) 40vw, 100vw'
                  }
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  onError={() => setImgError(true)}
                  priority={featured}
                />
              )}
            </motion.div>

            {/* Hover overlay + glass CTA pill */}
            <motion.div
              animate={{
                background: hovered
                  ? 'rgba(0, 0, 0, 0.30)'
                  : 'rgba(0, 0, 0, 0)',
              }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <motion.div
                animate={{
                  opacity: hovered ? 1 : 0,
                  y: hovered ? 0 : 12,
                  scale: hovered ? 1 : 0.92,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: 100,
                  padding: featured ? '0.75rem 2rem' : '0.6rem 1.6rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: featured ? '0.78rem' : '0.72rem',
                  fontWeight: 400,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(255, 255, 255, 0.88)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 24px rgba(0,0,0,0.3)',
                  whiteSpace: 'nowrap',
                }}
              >
                Ansehen →
              </motion.div>
            </motion.div>
          </div>

          {/* Info strip */}
          <motion.div
            animate={{ y: hovered ? 0 : 4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: featured ? '1.35rem 1.75rem' : '1rem 1.4rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0, 0, 0, 0.22)',
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
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.28)',
                  marginBottom: '0.3rem',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                {project.category} · {project.year}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: featured
                    ? 'clamp(1.1rem, 1.8vw, 1.45rem)'
                    : 'clamp(0.95rem, 1.3vw, 1.2rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.name}
              </h3>
            </div>

            <motion.div
              animate={{
                x: hovered ? 0 : -5,
                opacity: hovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.8)',
                flexShrink: 0,
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

  const displayProjects = realProjects.slice(0, 2)
  const isSingle = displayProjects.length === 1

  return (
    <section
      id="projekte"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="md:py-32"
    >
      {/* Warm atmospheric bloom — sits behind the cards */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '60vw',
          maxWidth: 1100,
          maxHeight: 800,
          background:
            'radial-gradient(ellipse at center, rgba(184,134,11,0.07) 0%, rgba(198,124,59,0.04) 35%, transparent 68%)',
          filter: 'blur(72px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>
        {/* Section header */}
        <div
          ref={headerRef}
          style={{ marginBottom: '3rem' }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
        >
          {/* Left: label + headline */}
          <div>
            <motion.p
              initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
              animate={
                shouldReduce
                  ? undefined
                  : isHeaderInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '0.65rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.32)',
                fontFamily: 'var(--font-ui)',
                marginBottom: '1rem',
              }}
            >
              Ausgewählte Arbeiten
            </motion.p>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="display-section"
                initial={shouldReduce ? undefined : { y: '105%' }}
                animate={
                  shouldReduce
                    ? undefined
                    : isHeaderInView
                    ? { y: '0%' }
                    : { y: '105%' }
                }
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.08,
                }}
              >
                Arbeit, die überzeugt.
              </motion.h2>
            </div>
          </div>

          {/* Right: Alle Projekte pill */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={
              shouldReduce
                ? undefined
                : isHeaderInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            style={{ marginTop: '1.5rem' }}
            className="md:mt-0"
          >
            <Link
              href="/projekte"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.5rem',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 100,
                color: 'rgba(255,255,255,0.42)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.74rem',
                fontWeight: 400,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = 'rgba(255,255,255,0.82)'
                el.style.borderColor = 'rgba(255,255,255,0.20)'
                el.style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = 'rgba(255,255,255,0.42)'
                el.style.borderColor = 'rgba(255,255,255,0.10)'
                el.style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              Alle Projekte
              <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: 'grid',
            gap: '1rem',
          }}
          className={
            isSingle
              ? 'grid-cols-1'
              : 'grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'
          }
        >
          {displayProjects.map((project, i) => (
            <ProjectMockupCard
              key={project.slug}
              project={project}
              featured={i === 0}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

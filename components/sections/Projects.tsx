'use client'
import { useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { fadeUp, staggerContainer, scaleIn, clipRevealUp } from '@/lib/animations'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { projects } from '@/lib/data/projects'
import { ArrowRight } from 'lucide-react'

export function Projects() {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  // Parallax for the decorative background number
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgNumberY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const bgNumberOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.04, 0.04, 0])

  const featured = projects.find((p) => p.featured)
  const secondary = projects.filter((p) => !p.featured)

  return (
    <section
      ref={sectionRef}
      id="projekte"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="md:py-32"
    >
      {/* Large decorative background text — parallax */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(12rem, 25vw, 22rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1,
          color: 'var(--text)',
          opacity: shouldReduce ? 0.03 : bgNumberOpacity,
          y: shouldReduce ? 0 : bgNumberY,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.04em',
        }}
      >
        Work
      </motion.div>

      <div className="container-site" style={{ position: 'relative' }}>
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <div
            style={{ gap: '1.25rem', marginBottom: '3.5rem' }}
            className="flex flex-col md:flex-row md:items-end md:justify-between"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ overflow: 'hidden' }}>
                <motion.h2
                  className="display-section"
                  variants={shouldReduce ? undefined : clipRevealUp}
                >
                  Arbeit, die für sich selbst spricht.
                </motion.h2>
              </div>
            </div>

            {/* View all — styled as pill link */}
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              <Link
                href="/projekte"
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.78rem',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.4rem',
                  border: '1px solid var(--border)',
                  borderRadius: 100,
                  transition: 'border-color 0.3s ease, color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'var(--text)'
                  el.style.borderColor = 'rgba(240,237,232,0.2)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'var(--muted)'
                  el.style.borderColor = 'var(--border)'
                }}
              >
                Alle Projekte
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* Grid */}
          {featured && (
            <motion.div
              variants={shouldReduce ? undefined : staggerContainer(0.12)}
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: secondary.length > 0 ? 'repeat(3, 1fr)' : '1fr',
              }}
            >
              {/* Featured */}
              <motion.div
                variants={shouldReduce ? undefined : scaleIn}
                style={{ gridColumn: secondary.length > 0 ? 'span 2' : 'span 1' }}
              >
                <ProjectCard project={featured} featured />
              </motion.div>

              {/* Secondary stack — only when projects exist */}
              {secondary.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {secondary.map((project) => (
                    <motion.div key={project.slug} variants={shouldReduce ? undefined : scaleIn}>
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

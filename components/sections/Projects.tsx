'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { projects } from '@/lib/data/projects'

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const featured = projects.find((p) => p.featured)
  const secondary = projects.filter((p) => !p.featured)

  return (
    <section
      id="projekte"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}
      className="md:py-32"
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <div
            style={{ gap: '1.25rem', marginBottom: '3rem' }}
            className="flex flex-col md:flex-row md:items-end md:justify-between"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.div variants={shouldReduce ? undefined : fadeUp}>
                <SectionLabel>Ausgewählte Arbeiten</SectionLabel>
              </motion.div>
              <motion.h2 className="display-section" variants={shouldReduce ? undefined : fadeUp}>
                Arbeit, die für sich selbst spricht.
              </motion.h2>
            </div>
          </div>

          {/* Grid */}
          {featured && (
            <motion.div
              variants={shouldReduce ? undefined : staggerContainer(0.1)}
              style={{ marginBottom: '2rem' }}
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              {/* Featured — 2/3 width */}
              <motion.div
                variants={shouldReduce ? undefined : scaleIn}
                className="md:col-span-2"
              >
                <ProjectCard project={featured} featured />
              </motion.div>

              {/* Secondary stack */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
                className="md:col-span-1"
              >
                {secondary.map((project) => (
                  <motion.div key={project.slug} variants={shouldReduce ? undefined : scaleIn}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All projects link */}
          <motion.div variants={shouldReduce ? undefined : fadeUp} style={{ marginTop: '1.5rem' }}>
            <Link
              href="/projekte"
              style={{
                color: 'var(--muted)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
              }}
            >
              Alle Projekte ansehen →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ProjectCard, YourProjectSlot } from '@/components/shared/ProjectCard'
import { projects } from '@/lib/data/projects'

export function ProjetteGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const shouldReduce = useReducedMotion()

  return (
    <section style={{ paddingTop: 'clamp(5rem, 6vw, 6rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <motion.div
              variants={shouldReduce ? undefined : fadeUp}
              style={{ marginBottom: '1.25rem' }}
            >
              <SectionLabel>Ausgewählte Arbeiten</SectionLabel>
            </motion.div>
            <motion.h1
              className="display-section"
              variants={shouldReduce ? undefined : fadeUp}
              style={{ marginBottom: '1.5rem' }}
            >
              Unsere Projekte.
            </motion.h1>
            <motion.p
              variants={shouldReduce ? undefined : fadeUp}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.75,
                maxWidth: 560,
              }}
            >
              Webdesign aus dem Rhein-Hunsrück — für Unternehmen in Koblenz,
              der Moselregion und ganz Rheinland-Pfalz. Keine Mockups,
              keine Hochglanzversprechen. Was Sie hier sehen, ist live und
              gebaut für echte Geschäftsergebnisse. Als Agentur aus Emmelshausen
              kennen wir den Markt in der Region und was regional suchende
              Kunden wirklich brauchen.
            </motion.p>
          </div>

          {/* Divider */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            style={{
              height: 1,
              background: 'var(--border)',
              marginBottom: '2rem',
            }}
          />

          {/* Grid — always 2 columns */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.1)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                variants={shouldReduce ? undefined : fadeUp}
              >
                <ProjectCard project={project} featured={i === 0} />
              </motion.div>
            ))}

            {projects.length % 2 !== 0 && (
              <motion.div variants={shouldReduce ? undefined : fadeUp}>
                <YourProjectSlot />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

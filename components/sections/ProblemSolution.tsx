'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'

const proofPoints = [
  {
    title: 'Persönlich & direkt',
    body: 'Sie sprechen immer mit Benedikt oder Maximilian. Kein Zwischenglied. Kein Missverständnis.',
    accent: true,
  },
  {
    title: 'Gebaut für Geschwindigkeit',
    body: 'Pagespeed 90+, SEO-ready, mobiloptimiert — von Haus aus. Keine nachträglichen Optimierungen.',
    accent: false,
  },
  {
    title: 'Fertig in Wochen',
    body: 'Nicht in Monaten. Klarer Zeitplan, von Tag 1. Sie wissen immer, wo Ihre Website gerade steht.',
    accent: false,
  },
]

export function ProblemSolution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
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
          <motion.div variants={shouldReduce ? undefined : fadeUp} style={{ marginBottom: '4rem' }}>
            <SectionLabel>Warum wir</SectionLabel>
          </motion.div>

          {/* Two-column problem / solution */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
              marginBottom: '5rem',
            }}
            className="md:grid-cols-2 md:gap-16"
          >
            {/* Problem */}
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--muted)',
                  marginBottom: '1.5rem',
                }}
              >
                Das Problem
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--muted)',
                  lineHeight: 1.4,
                }}
              >
                Die meisten Unternehmenswebsites in der Region sind veraltet, langsam, und generisch.
                Sie kosten Geld — und bringen keins.
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--accent)',
                  marginBottom: '1.5rem',
                }}
              >
                Die Lösung
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  lineHeight: 1.3,
                }}
              >
                Wir bauen Websites, die für Sie arbeiten. Nicht als Visitenkarte.
                Als Ihr bester Mitarbeiter.
              </p>
            </motion.div>
          </div>

          {/* Three proof points */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.1)}
            initial={shouldReduce ? undefined : 'hidden'}
            animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1px',
              background: 'var(--border)',
            }}
            className="md:grid-cols-3"
          >
            {proofPoints.map((point) => (
              <motion.div
                key={point.title}
                variants={shouldReduce ? undefined : fadeUp}
                style={{
                  background: 'var(--bg)',
                  padding: '2.5rem',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: point.accent ? 'var(--accent)' : 'var(--border-hover)',
                  }}
                />
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: point.accent ? 'var(--accent)' : 'var(--text)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {point.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {point.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'
import BorderGlow from '@/components/BorderGlow'

const steps = [
  {
    number: '01',
    title: 'Erstes Gespräch',
    meta: 'Calendly-Call oder Telefonat',
    duration: 'Kostenlos · 30 Minuten',
    body: 'Wir lernen Ihr Unternehmen kennen, stellen Fragen, hören zu. Kein Pitch. Kein Druck.',
  },
  {
    number: '02',
    title: 'Konzept & Angebot',
    meta: 'Struktur, Seitenaufbau, grober Designansatz',
    duration: '3–5 Tage',
    body: 'Sie erhalten ein konkretes Konzept und ein festes Angebot. Keine versteckten Kosten.',
  },
  {
    number: '03',
    title: 'Design & Entwicklung',
    meta: 'Wir bauen Ihre Website. Sie bleiben informiert.',
    duration: '2–4 Wochen',
    body: 'Zwei Feedback-Runden inklusive. Benedikt und Maximilian direkt erreichbar.',
  },
  {
    number: '04',
    title: 'Launch & Übergabe',
    meta: 'Live-Schaltung, Einweisung, Übergabe',
    duration: '1–2 Tage',
    body: 'Ihre Website ist online. Sie wissen, wie Sie sie selbst pflegen können.',
  },
]

export function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="prozess"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      className="md:py-32"
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp} style={{ marginBottom: '1.25rem' }}>
            <SectionLabel>Prozess</SectionLabel>
          </motion.div>
          <motion.h2
            className="display-section"
            variants={shouldReduce ? undefined : fadeUp}
            style={{ marginBottom: '3rem' }}
          >
            Kein Rätselraten. Kein Warten.
          </motion.h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {steps.map((step) => (
              <motion.div key={step.number} variants={shouldReduce ? undefined : fadeUp}>
                <BorderGlow
                  glowColor="73 100 50"
                  backgroundColor="var(--surface)"
                  borderRadius={4}
                  glowRadius={40}
                  glowIntensity={0.9}
                  edgeSensitivity={30}
                  coneSpread={25}
                  colors={['#C8FF00', '#FF6B35', '#111111']}
                  fillOpacity={0.15}
                  className="h-full w-full"
                >
                  <div
                    style={{
                      padding: '2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                      height: '100%',
                    }}
                  >
                    {/* Number */}
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '3.5rem',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        lineHeight: 1,
                        color: 'rgba(240,237,232,0.07)',
                        userSelect: 'none',
                      }}
                    >
                      {step.number}
                    </span>

                    {/* Title + meta */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.5rem',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          color: 'var(--text)',
                          lineHeight: 1.2,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 300,
                          color: 'var(--muted)',
                          lineHeight: 1.6,
                        }}
                      >
                        {step.meta}
                      </p>
                    </div>

                    {/* Duration badge */}
                    <p
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--accent)',
                      }}
                    >
                      {step.duration}
                    </p>

                    {/* Body */}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 300,
                        color: 'var(--muted)',
                        lineHeight: 1.75,
                        marginTop: 'auto',
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'

const steps = [
  {
    number: '01',
    title: 'Erstes Gespräch',
    meta: 'Calendly-Call oder Telefonat',
    duration: 'kostenlos · 30 Minuten',
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

function ProcessRow({ step, index }: { step: typeof steps[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        gap: '2rem',
        padding: '2.5rem 0',
        borderBottom: '1px solid var(--border)',
        cursor: 'default',
      }}
      className="md:grid-cols-[80px_1fr_1fr]"
    >
      {/* Number */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3.5rem',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1,
          color: hovered ? 'var(--accent)' : 'rgba(240,237,232,0.08)',
          transition: 'color 0.3s ease',
          userSelect: 'none',
          paddingTop: '0.25rem',
        }}
      >
        {step.number}
      </div>

      {/* Left info */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--text)',
            marginBottom: '0.4rem',
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

      {/* Right detail */}
      <div className="hidden md:block" style={{ paddingLeft: '1rem' }}>
        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            marginBottom: '0.5rem',
          }}
        >
          {step.duration}
        </p>
        <p
          style={{
            fontSize: '0.875rem',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}
        >
          {step.body}
        </p>
      </div>
    </div>
  )
}

export function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="prozess"
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

          <div>
            {steps.map((step, i) => (
              <motion.div key={step.number} variants={shouldReduce ? undefined : fadeUp}>
                <ProcessRow step={step} index={i} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

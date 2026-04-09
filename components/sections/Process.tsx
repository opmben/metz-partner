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
    body: 'Ihre Website ist online. Wir zeigen Ihnen, wie Sie sie selbst pflegen können — und bleiben für Fragen da.',
  },
]

function ProcessRow({
  step,
  shouldReduce,
}: {
  step: (typeof steps)[0]
  shouldReduce: boolean | null
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={shouldReduce ? undefined : fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '2.25rem 0',
        cursor: 'default',
      }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[80px_1fr_1fr_1fr] md:items-start md:gap-8">
        {/* Number */}
        <motion.span
          animate={{
            color: hovered && !shouldReduce ? 'var(--accent)' : 'rgba(240,237,232,0.08)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1,
            display: 'block',
            userSelect: 'none',
          }}
        >
          {step.number}
        </motion.span>

        {/* Title + meta */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.2,
              marginBottom: '0.4rem',
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontSize: '0.78rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.5,
            }}
          >
            {step.meta}
          </p>
        </div>

        {/* Duration */}
        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            paddingTop: '0.25rem',
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
          }}
        >
          {step.body}
        </p>
      </div>
    </motion.div>
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
        borderTop: '1px solid var(--border)',
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

          {/* Horizontal step list */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.07)}
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {steps.map((step) => (
              <ProcessRow key={step.number} step={step} shouldReduce={shouldReduce} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

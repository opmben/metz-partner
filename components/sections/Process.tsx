'use client'
import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { fadeUp, staggerContainer, clipRevealUp } from '@/lib/animations'

const steps = [
  {
    number: '01',
    title: 'Erstes Gespräch',
    meta: 'Calendly-Call oder Telefonat',
    duration: 'Kostenlos · 30 Min.',
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
  index,
  shouldReduce,
}: {
  step: (typeof steps)[0]
  index: number
  shouldReduce: boolean | null
}) {
  const [hovered, setHovered] = useState(false)
  const rowRef = useRef(null)
  const isInView = useInView(rowRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={rowRef}
      variants={shouldReduce ? undefined : fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '2.5rem 0',
        cursor: 'default',
      }}
    >
      {/* Bottom border — animated reveal */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 1,
          background: 'var(--border)',
        }}
        initial={shouldReduce ? { width: '100%' } : { width: 0 }}
        animate={
          shouldReduce
            ? undefined
            : isInView
              ? { width: '100%' }
              : { width: 0 }
        }
        transition={{ duration: 1.0, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[100px_1fr_auto_1fr] md:items-start md:gap-8">
        {/* Number — dramatic scale on hover */}
        <motion.span
          animate={{
            color: hovered && !shouldReduce ? 'var(--accent)' : 'rgba(240,237,232,0.06)',
            scale: hovered && !shouldReduce ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1,
            display: 'block',
            userSelect: 'none',
            transformOrigin: 'left center',
          }}
        >
          {step.number}
        </motion.span>

        {/* Title + meta */}
        <div>
          <motion.h3
            animate={{
              x: hovered && !shouldReduce ? 4 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
              fontWeight: 400,
              fontStyle: 'normal',
              color: 'var(--text)',
              lineHeight: 1.2,
              marginBottom: '0.4rem',
            }}
          >
            {step.title}
          </motion.h3>
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

        {/* Duration pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.9rem',
            border: '1px solid var(--border)',
            borderRadius: 100,
            alignSelf: 'start',
          }}
        >
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {step.duration}
          </span>
        </div>

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
  const sectionRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      ref={sectionRef}
      id="prozess"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="md:py-32"
    >
      {/* Decorative background number */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          left: '-3%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(10rem, 20vw, 18rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1,
          color: 'rgba(240,237,232,0.02)',
          pointerEvents: 'none',
          userSelect: 'none',
          y: shouldReduce ? 0 : bgY,
        }}
      >
        04
      </motion.div>

      <div className="container-site" style={{ position: 'relative' }}>
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          <div style={{ overflow: 'hidden', marginBottom: '3.5rem' }}>
            <motion.h2
              className="display-section"
              variants={shouldReduce ? undefined : clipRevealUp}
            >
              Kein Rätselraten. Kein Warten.
            </motion.h2>
          </div>

          {/* Step list */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.07)}
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {steps.map((step, i) => (
              <ProcessRow
                key={step.number}
                step={step}
                index={i}
                shouldReduce={shouldReduce}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

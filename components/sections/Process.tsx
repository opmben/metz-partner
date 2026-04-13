'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, clipRevealUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const panels = [
  {
    number: '01',
    title: 'Erstes Gespräch.',
    timing: 'KOSTENLOS · 30 MINUTEN',
    timingAccent: true,
    description:
      'Calendly-Call oder Telefonat. Wir lernen Ihr Unternehmen kennen, stellen Fragen, hören zu. Kein Pitch. Kein Druck.',
    cta: { label: 'Jetzt Termin buchen →', href: '#kontakt' },
    bg: 'var(--bg)',
  },
  {
    number: '02',
    title: 'Konzept & Angebot.',
    timing: '3–5 TAGE',
    timingAccent: false,
    description:
      'Struktur, Seitenaufbau, grober Designansatz. Sie erhalten ein konkretes Konzept und ein festes Angebot. Keine versteckten Kosten. Kein unverbindliches "es kommt drauf an."',
    cta: null,
    bg: 'var(--surface)',
  },
  {
    number: '03',
    title: 'Design & Entwicklung.',
    timing: '2–4 WOCHEN',
    timingAccent: false,
    description:
      'Wir bauen. Sie geben Feedback. Zwei Runden inklusive. Benedikt und Maximilian direkt erreichbar — nicht nach Ticket-Nummern sortiert.',
    cta: null,
    bg: 'var(--bg)',
  },
  {
    number: '04',
    title: 'Launch & Übergabe.',
    timing: '1–2 TAGE',
    timingAccent: false,
    description:
      'Ihre Website ist online. Wir erklären alles was Sie wissen müssen. Sie wissen wie Sie sie selbst pflegen können. Wir bleiben ansprechbar.',
    cta: null,
    bg: 'var(--surface)',
  },
]

const zIndices = [10, 20, 30, 40]

function ProcessPanel({
  panel,
  zIndex,
  shouldReduce,
  isMobile,
}: {
  panel: (typeof panels)[0]
  zIndex: number
  shouldReduce: boolean | null
  isMobile: boolean
}) {
  const panelRef = useRef(null)
  const isInView = useInView(panelRef, { once: true, margin: '-100px' })

  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      ref={panelRef}
      variants={shouldReduce ? undefined : fadeUp}
      initial={shouldReduce ? undefined : 'hidden'}
      animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
      style={{
        position: isMobile ? 'static' : 'sticky',
        top: 0,
        minHeight: isMobile ? 'auto' : '100vh',
        zIndex,
        background: panel.bg,
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '4rem 0' : '0',
        paddingTop: isMobile ? '4rem' : '0',
        paddingBottom: isMobile ? '4rem' : '0',
      }}
    >
      <div
        className="container-site"
        style={{ width: '100%' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '5rem',
            alignItems: 'center',
          }}
        >
          {/* Left: large step title */}
          <div>
            {/* Step number — decorative */}
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.7rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--muted)',
                display: 'block',
                marginBottom: '1.5rem',
              }}
            >
              Schritt {panel.number}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}
            >
              {panel.title}
            </h3>
          </div>

          {/* Right: timing + description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Timing label */}
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.7rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: panel.timingAccent ? 'var(--accent)' : 'var(--muted)',
              }}
            >
              {panel.timing}
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.8,
                maxWidth: 440,
              }}
            >
              {panel.description}
            </p>

            {/* Optional CTA */}
            {panel.cta && (
              <a
                href={panel.cta.href}
                onClick={scrollTo}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'opacity 0.2s ease',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
              >
                {panel.cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="prozess">
      {/* Header — outside sticky area */}
      <div
        style={{
          paddingTop: '5rem',
          paddingBottom: '3rem',
        }}
        className="container-site md:pt-32"
      >
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>Prozess</SectionLabel>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="display-section"
              variants={shouldReduce ? undefined : clipRevealUp}
            >
              Kein Rätselraten. Kein Warten.
            </motion.h2>
          </div>
        </motion.div>
      </div>

      {/* Stacked sticky panels */}
      <div style={{ position: 'relative' }}>
        {panels.map((panel, i) => (
          <ProcessPanel
            key={panel.number}
            panel={panel}
            zIndex={zIndices[i]}
            shouldReduce={shouldReduce}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  )
}

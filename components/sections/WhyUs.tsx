'use client'
import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const founders = [
  {
    initial: 'B',
    name: 'Benedikt Metz',
    role: 'Head of UI/UX Design',
    bio: 'Hintergrund in Grafikdesign und Recht. Zuständig für alles, was man sieht — und dafür, dass es rechtlich stimmt.',
    accentColor: 'rgba(211,253,81,0.92)',
    accentBg: 'rgba(211,253,81,0.10)',
    accentBorder: 'rgba(211,253,81,0.24)',
    glowColor: 'rgba(211,253,81,0.12)',
    initialFill: 'rgba(211,253,81,0.08)',
  },
  {
    initial: 'M',
    name: 'Maximilian Metz',
    role: 'Head of Marketing & Sales',
    bio: 'Hintergrund in Marketing und Finanzen. Zuständig für Strategie, Wirkung und dafür, dass Ihre Website konvertiert.',
    accentColor: 'rgba(211,253,81,0.80)',
    accentBg: 'rgba(211,253,81,0.08)',
    accentBorder: 'rgba(211,253,81,0.20)',
    glowColor: 'rgba(211,253,81,0.10)',
    initialFill: 'rgba(211,253,81,0.07)',
  },
]

const differentiators = [
  {
    number: '01',
    title: 'Direkt & persönlich',
    body: 'Sie haben immer eine direkte Ansprechperson — kein Ticketsystem, kein Wartezimmer, keine Vertretung.',
  },
  {
    number: '02',
    title: 'Regional verankert',
    body: 'Wir kommen aus Koblenz. Wir kennen die Region, die lokalen Branchen und die typischen Anforderungen.',
  },
  {
    number: '03',
    title: 'Strategie bis Launch',
    body: 'Wir bauen nach Ihren Wünschen, strukturiert und systematisch. Ihr Input zählt — von Tag eins.',
  },
]

function FounderCard({
  founder,
  shouldReduce,
  delay,
}: {
  founder: (typeof founders)[0]
  shouldReduce: boolean | null
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? undefined : { opacity: 0, y: 32 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 32 }
      }
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ height: '100%' }}
    >
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="surface-primary"
      animate={{
        borderColor: hovered
          ? founder.accentBorder
          : 'rgba(255,255,255,0.09)',
        boxShadow: hovered
          ? `inset 0 1px 0 rgba(255,255,255,0.22), 0 24px 60px rgba(0,0,0,0.40), 0 0 60px ${founder.glowColor}`
          : 'inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 32px rgba(0,0,0,0.24)',
      }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Hover atmosphere bloom */}
      <motion.div
        aria-hidden
        animate={{ opacity: hovered && !shouldReduce ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 20% 75%, ${founder.glowColor}, transparent 65%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top accent line */}
      <motion.div
        aria-hidden
        animate={{ opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.38 }}
        style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: 1,
          background: `linear-gradient(90deg, transparent, ${founder.accentColor}, transparent)`,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Giant initial — decorative */}
      <div
        style={{
          padding: 'clamp(1.5rem, 3vw, 2.25rem)',
          paddingBottom: '0.5rem',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1.25rem',
        }}
      >
        {/* Initial badge */}
        <motion.div
          animate={{
            background: hovered ? founder.accentBg : 'rgba(255,255,255,0.04)',
            borderColor: hovered ? founder.accentBorder : 'rgba(255,255,255,0.09)',
          }}
          transition={{ duration: 0.32 }}
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            border: '1px solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <motion.span
            animate={{
              color: hovered ? founder.accentColor : 'rgba(255,255,255,0.22)',
            }}
            transition={{ duration: 0.32 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1,
            }}
          >
            {founder.initial}
          </motion.span>
        </motion.div>

        {/* Role + name */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.65rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--muted)',
              marginBottom: '0.35rem',
            }}
          >
            {founder.role}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {founder.name}
          </h3>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          margin: '0 clamp(1.5rem, 3vw, 2.25rem)',
          background: 'rgba(255,255,255,0.06)',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Bio */}
      <div
        style={{
          padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 3vw, 2.25rem)',
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.875rem',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {founder.bio}
        </p>
      </div>
    </motion.div>
    </motion.div>
  )
}

function DifferentiatorCard({
  d,
  shouldReduce,
  delay,
}: {
  d: (typeof differentiators)[0]
  shouldReduce: boolean | null
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ height: '100%' }}
    >
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="surface-secondary"
      animate={{
        borderColor: hovered
          ? 'rgba(255,255,255,0.14)'
          : 'rgba(255,255,255,0.07)',
        boxShadow: hovered
          ? 'inset 0 1px 0 rgba(255,255,255,0.18), 0 16px 44px rgba(0,0,0,0.30)'
          : 'inset 0 1px 0 rgba(255,255,255,0.10), 0 6px 18px rgba(0,0,0,0.18)',
        y: hovered && !shouldReduce ? -3 : 0,
      }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 'clamp(1.75rem, 3vw, 2.25rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        height: '100%',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '0.04em',
          color: 'rgba(211,253,81,0.55)',
          margin: 0,
        }}
      >
        {d.number}
      </p>
      <h4
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
          fontWeight: 400,
          color: 'var(--text)',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          margin: 0,
        }}
      >
        {d.title}
      </h4>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.875rem',
          fontWeight: 300,
          color: 'var(--muted)',
          lineHeight: 1.8,
          margin: 0,
        }}
      >
        {d.body}
      </p>
    </motion.div>
    </motion.div>
  )
}

export function WhyUs() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      ref={sectionRef}
      id="ueber-uns"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric bloom */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '55vw',
          height: '65vw',
          maxWidth: 700,
          maxHeight: 750,
          background:
            'radial-gradient(ellipse at 65% 40%, rgba(198,124,59,0.07) 0%, rgba(184,134,11,0.04) 40%, transparent 66%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative background text */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '-2%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(7rem, 16vw, 14rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.018)',
          pointerEvents: 'none',
          userSelect: 'none',
          y: shouldReduce ? 0 : bgY,
        }}
      >
        M&P
      </motion.div>

      <div className="container-site" style={{ position: 'relative' }}>
        {/* ── Section header ── */}
        <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={
              shouldReduce
                ? undefined
                : isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '1.1rem', display: 'inline-block' }}
          >
            <span
              className="surface-floating"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.9rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px rgba(211,253,81,0.55)',
                  flexShrink: 0,
                }}
              />
              Über uns
            </span>
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="display-section"
              initial={shouldReduce ? undefined : { y: '108%' }}
              animate={
                shouldReduce
                  ? undefined
                  : isInView
                  ? { y: '0%' }
                  : { y: '108%' }
              }
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.07,
              }}
            >
              Wenn Sie uns anfragen,{' '}
              <em>sprechen Sie mit uns.</em>
            </motion.h2>
          </div>
        </div>

        {/* ── Founder cards ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '1rem', marginBottom: '1rem' }}
        >
          {founders.map((founder, i) => (
            <FounderCard
              key={founder.name}
              founder={founder}
              shouldReduce={shouldReduce}
              delay={0.14 + i * 0.1}
            />
          ))}
        </div>

        {/* ── Differentiators ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '1rem' }}
        >
          {differentiators.map((d, i) => (
            <DifferentiatorCard
              key={d.number}
              d={d}
              shouldReduce={shouldReduce}
              delay={0.22 + i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

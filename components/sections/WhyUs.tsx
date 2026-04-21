'use client'
import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'

// ─── Content ──────────────────────────────────────────────────────────────────

const founders = [
  {
    initial: 'B',
    name: 'Benedikt Metz',
    role: 'Head of Design & Struktur',
    bio: 'Hintergrund in Design und Recht. Verantwortlich für Gestaltung, Nutzerführung und dafür, dass Ihre Website nicht nur gut aussieht, sondern auch sauber aufgebaut ist.',
    accentColor: 'rgba(211,253,81,0.92)',
    accentBg: 'rgba(211,253,81,0.10)',
    accentBorder: 'rgba(211,253,81,0.24)',
    glowColor: 'rgba(211,253,81,0.10)',
  },
  {
    initial: 'M',
    name: 'Maximilian Metz',
    role: 'Head of Strategie & Wachstum',
    bio: 'Fokus auf Marketing und Conversion. Zuständig für Strategie, Wirkung und dafür, dass Ihre Website messbar Anfragen generiert.',
    accentColor: 'rgba(211,253,81,0.80)',
    accentBg: 'rgba(211,253,81,0.08)',
    accentBorder: 'rgba(211,253,81,0.18)',
    glowColor: 'rgba(211,253,81,0.08)',
  },
]

const differentiators = [
  {
    number: '01',
    title: 'Direkt & persönlich',
    body: 'Kein Ticketsystem. Keine Weitergabe. Sie sprechen immer mit uns.',
  },
  {
    number: '02',
    title: 'Regional & erreichbar',
    body: 'Aus Koblenz. Wir kennen den Markt und sind jederzeit erreichbar.',
  },
  {
    number: '03',
    title: 'Von Idee bis Ergebnis',
    body: 'Strategie, Umsetzung und Launch – alles aus einer Hand.',
  },
]

// ─── Founder Card ─────────────────────────────────────────────────────────────

function FounderCard({
  founder,
  shouldReduce,
  delay,
  featured = false,
}: {
  founder: (typeof founders)[0]
  shouldReduce: boolean | null
  delay: number
  featured?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const xStart = featured ? -28 : 28

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? undefined : { opacity: 0, x: xStart, filter: 'blur(12px)' }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, x: 0, filter: 'blur(0px)' }
          : { opacity: 0, x: xStart, filter: 'blur(12px)' }
      }
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ height: '100%' }}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="surface-primary"
        animate={{
          borderColor: hovered
            ? founder.accentBorder
            : 'rgba(255,255,255,0.082)',
          boxShadow: hovered
            ? `inset 0 1px 0 rgba(255,255,255,0.22), 0 28px 64px rgba(0,0,0,0.48), 0 0 80px ${founder.glowColor}`
            : 'inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 32px rgba(0,0,0,0.24)',
        }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Ghost initial — large background glyph */}
        <motion.span
          aria-hidden
          animate={{
            opacity: hovered && !shouldReduce ? 0.048 : 0.022,
            scale: hovered && !shouldReduce ? 1.04 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: '-0.18em',
            right: '-0.03em',
            fontFamily: 'var(--font-display)',
            fontSize: featured
              ? 'clamp(9rem, 20vw, 18rem)'
              : 'clamp(7rem, 14vw, 13rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1,
            color: 'rgba(255,255,255,1)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
            transformOrigin: 'bottom right',
          }}
        >
          {founder.initial}
        </motion.span>

        {/* Top accent line */}
        <motion.div
          aria-hidden
          animate={{ opacity: hovered ? 1 : 0.45, scaleX: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: '15%',
            height: 1,
            background: `linear-gradient(90deg, transparent, ${founder.accentColor}, transparent)`,
            pointerEvents: 'none',
            zIndex: 2,
            transformOrigin: 'center',
          }}
        />

        {/* Hover bloom */}
        <motion.div
          aria-hidden
          animate={{ opacity: hovered && !shouldReduce ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-20%',
            width: '70%',
            height: '70%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${founder.glowColor}, transparent 70%)`,
            filter: 'blur(28px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div
          style={{
            padding: featured
              ? 'clamp(2rem, 3.5vw, 2.75rem)'
              : 'clamp(1.75rem, 3vw, 2.25rem)',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Initial badge */}
          <motion.div
            animate={{
              background: hovered
                ? founder.accentBg
                : 'rgba(255,255,255,0.04)',
              borderColor: hovered
                ? founder.accentBorder
                : 'rgba(255,255,255,0.08)',
            }}
            transition={{ duration: 0.32 }}
            style={{
              width: featured ? 54 : 48,
              height: featured ? 54 : 48,
              borderRadius: 13,
              border: '1px solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginBottom: '1.5rem',
            }}
          >
            <motion.span
              animate={{
                color: hovered
                  ? founder.accentColor
                  : 'rgba(255,255,255,0.22)',
              }}
              transition={{ duration: 0.32 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: featured ? '1.65rem' : '1.4rem',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1,
              }}
            >
              {founder.initial}
            </motion.span>
          </motion.div>

          {/* Role */}
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.62rem',
              fontWeight: 400,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.15em',
              color: 'var(--muted)',
              margin: '0 0 0.4rem',
            }}
          >
            {founder.role}
          </p>

          {/* Name — clip reveal from bottom */}
          <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
            <motion.h3
              initial={shouldReduce ? undefined : { y: '110%' }}
              animate={
                shouldReduce
                  ? undefined
                  : isInView
                  ? { y: '0%' }
                  : { y: '110%' }
              }
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + 0.1,
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: featured
                  ? 'clamp(1.5rem, 2.6vw, 2.25rem)'
                  : 'clamp(1.2rem, 2vw, 1.75rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {founder.name}
            </motion.h3>
          </div>

          {/* Divider */}
          <motion.div
            initial={shouldReduce ? undefined : { scaleX: 0 }}
            animate={
              shouldReduce ? undefined : isInView ? { scaleX: 1 } : { scaleX: 0 }
            }
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + 0.22,
            }}
            style={{
              height: 1,
              background: 'rgba(255,255,255,0.06)',
              marginBottom: '1.5rem',
              transformOrigin: 'left',
            }}
          />

          {/* Bio */}
          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
            animate={
              shouldReduce
                ? undefined
                : isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + 0.28,
            }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: featured ? '0.9rem' : '0.875rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.8,
              margin: 0,
              flex: 1,
            }}
          >
            {founder.bio}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Differentiator Strip ─────────────────────────────────────────────────────

function DifferentiatorStrip({
  shouldReduce,
}: {
  shouldReduce: boolean | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? undefined : { opacity: 0, y: 22 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 22 }
      }
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
    >
      <div className="surface-secondary" style={{ padding: 0 }}>
        <div className="flex flex-col md:flex-row">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.number}
              initial={shouldReduce ? undefined : { opacity: 0 }}
              animate={
                shouldReduce ? undefined : isInView ? { opacity: 1 } : { opacity: 0 }
              }
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.44 + i * 0.08,
              }}
              className={
                i < differentiators.length - 1
                  ? 'border-b border-white/[0.055] md:border-b-0 md:border-r'
                  : ''
              }
              style={{
                flex: 1,
                padding: '1.35rem 1.85rem',
              }}
            >
              {/* Number */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '0.68rem',
                  color: 'rgba(211,253,81,0.48)',
                  margin: '0 0 0.32rem',
                  letterSpacing: '0.04em',
                }}
              >
                {d.number}
              </p>

              {/* Title */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.92rem',
                  fontWeight: 400,
                  color: 'var(--text)',
                  margin: '0 0 0.22rem',
                  lineHeight: 1.2,
                }}
              >
                {d.title}
              </p>

              {/* Body */}
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.775rem',
                  fontWeight: 300,
                  color: 'var(--muted)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {d.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── WhyUs ────────────────────────────────────────────────────────────────────

export function WhyUs() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="ueber-uns"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'clip',
        overflowClipMargin: '200px',
      }}
    >
      {/* Atmospheric bloom — warm copper right edge */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '55vw',
          height: '65vw',
          maxWidth: 700,
          maxHeight: 750,
          background:
            'radial-gradient(ellipse at 65% 40%, rgba(198,124,59,0.13) 0%, rgba(184,134,11,0.065) 40%, transparent 66%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Ghost background text */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '4%',
          right: '-2%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(7rem, 17vw, 16rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.015)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        M&P
      </div>

      <div className="container-site" style={{ position: 'relative' }}>
        {/* ── Section header ── */}
        <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
          {/* Eyebrow pill */}
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
                textTransform: 'uppercase' as const,
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

          {/* Headline */}
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
              Direkte Zusammenarbeit.{' '}
              <em>Ohne Umwege.</em>
            </motion.h2>
          </div>
        </div>

        {/* ── Asymmetric founders grid ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]"
          style={{ gap: '1rem', marginBottom: '1rem' }}
        >
          <FounderCard
            founder={founders[0]}
            shouldReduce={shouldReduce}
            delay={0.14}
            featured
          />
          <FounderCard
            founder={founders[1]}
            shouldReduce={shouldReduce}
            delay={0.22}
          />
        </div>

        {/* ── Compact differentiator strip ── */}
        <DifferentiatorStrip shouldReduce={shouldReduce} />
      </div>
    </section>
  )
}

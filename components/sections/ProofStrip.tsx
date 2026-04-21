'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// ─── Content ──────────────────────────────────────────────────────────────────

const TECH: { name: string; dot: string }[] = [
  { name: 'Next.js',       dot: 'rgba(255,255,255,0.88)' },
  { name: 'React 19',      dot: 'rgba(97,218,251,0.84)'  },
  { name: 'TypeScript',    dot: 'rgba(49,120,198,0.92)'  },
  { name: 'Tailwind CSS',  dot: 'rgba(56,189,248,0.82)'  },
  { name: 'Framer Motion', dot: 'rgba(150,130,255,0.82)' },
  { name: 'Three.js',      dot: 'rgba(255,255,255,0.52)' },
  { name: 'GSAP',          dot: 'rgba(136,206,68,0.86)'  },
  { name: 'Zod',           dot: 'rgba(99,179,237,0.84)'  },
  { name: 'Resend',        dot: 'rgba(255,255,255,0.62)' },
]

const FACTS: string[] = [
  '2–4 Wochen Launch-Zeit',
  'Direkt mit den Gründern',
  'Antwort innerhalb von 24h',
  'Kein Template. Kein Baukasten.',
  'Vollständig individuell gebaut',
  'Aus Koblenz. Für Deutschland.',
  '30 Min. Erstgespräch — kostenlos',
]

// ─── Tech Badge ───────────────────────────────────────────────────────────────

function TechBadge({ name, dot }: { name: string; dot: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.275rem 0.78rem',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.068), rgba(255,255,255,0.024)), rgba(6,6,6,0.42)',
        border: '1px solid rgba(255,255,255,0.082)',
        borderRadius: 999,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
        marginRight: '0.5rem',
        flexShrink: 0,
        whiteSpace: 'nowrap' as const,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: dot,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.695rem',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.70)',
          letterSpacing: '0.02em',
        }}
      >
        {name}
      </span>
    </span>
  )
}

// ─── Fact Item ────────────────────────────────────────────────────────────────

function FactItem({ text }: { text: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        marginRight: '1.5rem',
        flexShrink: 0,
        whiteSpace: 'nowrap' as const,
      }}
    >
      {/* Rotated square — lime diamond marker */}
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 4,
          height: 4,
          borderRadius: 1,
          background: 'rgba(211,253,81,0.52)',
          transform: 'rotate(45deg)',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.48)',
        }}
      >
        {text}
      </span>
    </span>
  )
}

// ─── Marquee Row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  children,
  direction,
  duration,
  isPaused,
  isReduced,
}: {
  children: React.ReactNode
  direction: 'left' | 'right'
  duration: number
  isPaused: boolean
  isReduced: boolean | null
}) {
  const anim = isReduced ? 'none' : direction === 'left' ? 'stackbar-left' : 'stackbar-right'

  return (
    <div
      style={{
        display: 'flex',
        width: 'max-content',
        willChange: 'transform',
        animationName: anim,
        animationDuration: `${duration}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationPlayState: isReduced || isPaused ? 'paused' : 'running',
      }}
    >
      {/* Copy A */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, paddingLeft: '1.25rem' }}>
        {children}
      </div>
      {/* Copy B — identical, for seamless loop */}
      <div
        style={{ display: 'flex', alignItems: 'center', flexShrink: 0, paddingLeft: '1.25rem' }}
        aria-hidden
      >
        {children}
      </div>
    </div>
  )
}

// ─── ProofStrip ───────────────────────────────────────────────────────────────

export function ProofStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const shouldReduce = useReducedMotion()
  const [paused, setPaused] = useState(false)

  return (
    <section
      aria-label="Technologie-Stack und Projektkonditionen"
      style={{
        paddingTop: '0.25rem',
        paddingBottom: '2.75rem',
        position: 'relative',
      }}
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          initial={shouldReduce ? undefined : { opacity: 0, y: 22, filter: 'blur(8px)' }}
          animate={
            shouldReduce
              ? undefined
              : isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 22, filter: 'blur(8px)' }
          }
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Glass panel — surface-secondary (inherits glass material from globals.css) */}
          <div className="surface-secondary" style={{ padding: 0 }}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>

              {/* ── Label column — md+ only ───────────────────────── */}
              <div
                className="hidden md:flex flex-col justify-center flex-shrink-0"
                style={{
                  gap: '0.3rem',
                  padding: '1.25rem 1.5rem',
                  minWidth: 132,
                }}
              >
                {/* Live dot + label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.42rem' }}>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      boxShadow: '0 0 7px rgba(211,253,81,0.55)',
                      flexShrink: 0,
                      animation: shouldReduce ? 'none' : 'heroPulse 2.6s ease-in-out infinite',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.600rem',
                      fontWeight: 400,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.16em',
                      color: 'rgba(255,255,255,0.44)',
                    }}
                  >
                    Unser Stack
                  </span>
                </div>
              </div>

              {/* ── Vertical separator — md+ only ─────────────────── */}
              <div
                className="hidden md:block flex-shrink-0"
                style={{
                  width: 1,
                  background:
                    'linear-gradient(to bottom, transparent, rgba(255,255,255,0.075) 22%, rgba(255,255,255,0.075) 78%, transparent)',
                }}
              />

              {/* ── Scrolling marquee area ─────────────────────────── */}
              <div
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  minWidth: 0,
                }}
              >
                {/* Left edge fade */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: '0 auto 0 0',
                    width: 72,
                    background:
                      'linear-gradient(to right, rgba(10,10,10,0.96), rgba(10,10,10,0.0))',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                />

                {/* Right edge fade */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: '0 0 0 auto',
                    width: 72,
                    background:
                      'linear-gradient(to left, rgba(10,10,10,0.96), rgba(10,10,10,0.0))',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                />

                {/* ── Lane 1: Tech stack ← scrolls left ── */}
                <div
                  style={{
                    paddingTop: '1rem',
                    paddingBottom: '0.8rem',
                    overflow: 'hidden',
                  }}
                >
                  <MarqueeRow
                    direction="left"
                    duration={54}
                    isPaused={paused}
                    isReduced={shouldReduce}
                  >
                    {TECH.map((t) => (
                      <TechBadge key={t.name} name={t.name} dot={t.dot} />
                    ))}
                  </MarqueeRow>
                </div>

                {/* ── Lane separator — lime glow ── */}
                <div
                  style={{
                    height: 1,
                    margin: '0 1.25rem',
                    background:
                      'linear-gradient(90deg, transparent, rgba(211,253,81,0.15) 20%, rgba(211,253,81,0.26) 50%, rgba(211,253,81,0.15) 80%, transparent)',
                  }}
                />

                {/* ── Lane 2: Facts → scrolls right ── */}
                <div
                  style={{
                    paddingTop: '0.8rem',
                    paddingBottom: '1rem',
                    overflow: 'hidden',
                  }}
                >
                  <MarqueeRow
                    direction="right"
                    duration={40}
                    isPaused={paused}
                    isReduced={shouldReduce}
                  >
                    {FACTS.map((f) => (
                      <FactItem key={f} text={f} />
                    ))}
                  </MarqueeRow>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

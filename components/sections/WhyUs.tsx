'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { X, Check } from 'lucide-react'

// ─── Content ──────────────────────────────────────────────────────────────────

const problems = [
  'Baukasten-Look ohne Wiedererkennung',
  'Langsame Ladezeiten auf Mobilgeräten',
  'Keine klare Nutzerführung',
  'Fehlende SEO-Grundlage',
  'Kein direkter Ansprechpartner nach Launch',
]

const solutions = [
  'Direkte Zusammenarbeit mit den Umsetzern',
  'Individuelles Design passend zu Ihrem Unternehmen',
  'Performance und mobile Optimierung von Anfang an',
  'Klare Struktur für mehr Anfragen',
  'SEO-Basis für lokale Sichtbarkeit',
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Problem Item ─────────────────────────────────────────────────────────────

function ProblemItem({
  text,
  delay,
  isInView,
  shouldReduce,
}: {
  text: string
  delay: number
  isInView: boolean
  shouldReduce: boolean | null
}) {
  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 6 }}
      animate={shouldReduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.7rem',
        paddingTop: '0.72rem',
        paddingBottom: '0.72rem',
      }}
    >
      <span
        aria-hidden
        style={{
          flexShrink: 0,
          marginTop: '0.15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'rgba(255, 75, 75, 0.07)',
        }}
      >
        <X size={9} strokeWidth={2.2} style={{ color: 'rgba(255, 88, 88, 0.45)' }} />
      </span>
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.84rem',
          fontWeight: 300,
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.38)',
        }}
      >
        {text}
      </span>
    </motion.div>
  )
}

// ─── Solution Item ────────────────────────────────────────────────────────────

function SolutionItem({
  text,
  delay,
  isInView,
  shouldReduce,
  isLead,
}: {
  text: string
  delay: number
  isInView: boolean
  shouldReduce: boolean | null
  isLead?: boolean
}) {
  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
      animate={shouldReduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.9rem',
        paddingTop: isLead ? '0' : '0.88rem',
        paddingBottom: isLead ? '0.88rem' : '0.88rem',
        borderBottom: isLead ? '1px solid rgba(211,253,81,0.10)' : undefined,
        marginBottom: isLead ? '0.25rem' : undefined,
      }}
    >
      <span
        aria-hidden
        style={{
          flexShrink: 0,
          marginTop: '0.18rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: isLead
            ? 'rgba(211, 253, 81, 0.14)'
            : 'rgba(211, 253, 81, 0.08)',
          border: `1px solid ${isLead ? 'rgba(211, 253, 81, 0.32)' : 'rgba(211, 253, 81, 0.18)'}`,
          boxShadow: isLead ? '0 0 10px rgba(211,253,81,0.10)' : undefined,
        }}
      >
        <Check
          size={12}
          strokeWidth={2.5}
          style={{
            color: isLead ? 'rgba(211, 253, 81, 1)' : 'rgba(211, 253, 81, 0.82)',
          }}
        />
      </span>
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: isLead ? 'clamp(0.98rem, 1.1vw, 1.05rem)' : 'clamp(0.93rem, 1.05vw, 1.0rem)',
          fontWeight: isLead ? 400 : 300,
          lineHeight: 1.58,
          color: isLead ? 'var(--text)' : 'rgba(255,255,255,0.82)',
        }}
      >
        {text}
      </span>
    </motion.div>
  )
}

// ─── WhyUs ────────────────────────────────────────────────────────────────────

export function WhyUs() {
  const headerRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)

  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const isProblemInView = useInView(problemRef, { once: true, margin: '-60px' })
  const isSolutionInView = useInView(solutionRef, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="ueber-uns"
      style={{
        paddingTop: 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'clip',
        overflowClipMargin: '200px',
      }}
    >
      {/* Warm copper bloom — top left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '5%',
          left: '-12%',
          width: '60vw',
          height: '70vw',
          maxWidth: 750,
          maxHeight: 800,
          background:
            'radial-gradient(ellipse at 35% 45%, rgba(198,124,59,0.12) 0%, rgba(184,134,11,0.06) 42%, transparent 66%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Accent bloom — lower right, behind solution card */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '-8%',
          width: '45vw',
          height: '45vw',
          maxWidth: 560,
          maxHeight: 560,
          background:
            'radial-gradient(ellipse, rgba(211,253,81,0.045) 0%, transparent 60%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>
        {/* ── Section header ── */}
        <div ref={headerRef} style={{ marginBottom: '3.5rem', maxWidth: 640 }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="display-section"
              initial={shouldReduce ? undefined : { y: '108%' }}
              animate={
                shouldReduce
                  ? undefined
                  : isHeaderInView
                  ? { y: '0%' }
                  : { y: '108%' }
              }
              transition={{ duration: 0.95, ease: EASE, delay: 0.07 }}
            >
              Warum nicht einfach{' '}
              <em>irgendeine Website?</em>
            </motion.h2>
          </div>

          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 14 }}
            animate={
              shouldReduce
                ? undefined
                : isHeaderInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.95rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.75,
              margin: '1.1rem 0 0',
            }}
          >
            Viele Websites sehen auf den ersten Blick okay aus. Entscheidend ist,
            ob sie Vertrauen schaffen, gefunden werden und Anfragen auslösen.
          </motion.p>
        </div>

        {/* ── Comparison Cards — asymmetric 2fr / 3fr ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]"
          style={{ gap: '1rem', alignItems: 'stretch' }}
        >
          {/* Left — Problem card (subordinate) */}
          <motion.div
            ref={problemRef}
            initial={shouldReduce ? undefined : { opacity: 0, x: -24 }}
            animate={
              shouldReduce
                ? undefined
                : isProblemInView
                ? { opacity: 0.72, x: 0 }
                : { opacity: 0, x: -24 }
            }
            transition={{ duration: 1.05, ease: EASE, delay: 0.10 }}
            style={{ height: '100%' }}
          >
            <div
              className="surface-muted"
              style={{
                height: '100%',
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              }}
            >
              {problems.map((text, i) => (
                <ProblemItem
                  key={i}
                  text={text}
                  delay={0.24 + i * 0.06}
                  isInView={isProblemInView}
                  shouldReduce={shouldReduce}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — Solution card (dominant) */}
          <motion.div
            ref={solutionRef}
            initial={shouldReduce ? undefined : { opacity: 0, x: 28, y: 6 }}
            animate={
              shouldReduce
                ? undefined
                : isSolutionInView
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: 28, y: 6 }
            }
            transition={{ duration: 0.88, ease: EASE, delay: 0.20 }}
            style={{ height: '100%' }}
          >
            <div
              className="surface-primary"
              style={{
                height: '100%',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                position: 'relative',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.18), 0 28px 90px rgba(0,0,0,0.42), 0 0 52px rgba(211,253,81,0.055)',
              }}
            >
              {/* Lime bloom inside solution card */}
              <motion.div
                aria-hidden
                initial={shouldReduce ? undefined : { opacity: 0, scale: 0.85 }}
                animate={
                  shouldReduce
                    ? undefined
                    : isSolutionInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.85 }
                }
                transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
                style={{
                  position: 'absolute',
                  bottom: '-20%',
                  right: '-10%',
                  width: '70%',
                  height: '80%',
                  background:
                    'radial-gradient(ellipse, rgba(211,253,81,0.055) 0%, transparent 62%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Card label */}
                <motion.p
                  className="label"
                  initial={shouldReduce ? undefined : { opacity: 0 }}
                  animate={
                    shouldReduce
                      ? undefined
                      : isSolutionInView
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
                  style={{
                    color: 'rgba(211,253,81,0.70)',
                    marginBottom: '1.1rem',
                    letterSpacing: '0.16em',
                  }}
                >
                  Was Sie bekommen
                </motion.p>

                {solutions.map((text, i) => (
                  <SolutionItem
                    key={i}
                    text={text}
                    isLead={i === 0}
                    delay={0.34 + i * 0.07}
                    isInView={isSolutionInView}
                    shouldReduce={shouldReduce}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

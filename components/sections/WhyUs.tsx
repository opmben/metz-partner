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
  'Individuelles Design passend zu Ihrem Unternehmen',
  'Performance und mobile Optimierung von Anfang an',
  'Klare Struktur für mehr Anfragen',
  'SEO-Basis für lokale Sichtbarkeit',
  'Direkte Zusammenarbeit mit den Umsetzern',
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Comparison Item ──────────────────────────────────────────────────────────

function ComparisonItem({
  text,
  type,
  delay,
  isInView,
  shouldReduce,
  isLast,
}: {
  text: string
  type: 'problem' | 'solution'
  delay: number
  isInView: boolean
  shouldReduce: boolean | null
  isLast: boolean
}) {
  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={
        shouldReduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
      }
      transition={{ duration: 0.55, ease: EASE, delay }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        paddingTop: '0.72rem',
        paddingBottom: '0.72rem',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.045)',
      }}
    >
      {/* Icon badge */}
      <span
        aria-hidden
        style={{
          flexShrink: 0,
          marginTop: '0.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 18,
          height: 18,
          borderRadius: '50%',
          background:
            type === 'problem'
              ? 'rgba(255, 75, 75, 0.09)'
              : 'rgba(211, 253, 81, 0.09)',
          border: `1px solid ${
            type === 'problem'
              ? 'rgba(255, 80, 80, 0.16)'
              : 'rgba(211, 253, 81, 0.20)'
          }`,
        }}
      >
        {type === 'problem' ? (
          <X
            size={9}
            strokeWidth={2.8}
            style={{ color: 'rgba(255, 88, 88, 0.62)' }}
          />
        ) : (
          <Check
            size={9}
            strokeWidth={2.8}
            style={{ color: 'rgba(211, 253, 81, 0.88)' }}
          />
        )}
      </span>

      {/* Text */}
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.875rem',
          fontWeight: 300,
          lineHeight: 1.6,
          color: type === 'problem' ? 'var(--muted)' : 'var(--text)',
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
            'radial-gradient(ellipse, rgba(211,253,81,0.038) 0%, transparent 60%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>
        {/* ── Section header ── */}
        <div ref={headerRef} style={{ marginBottom: '3.5rem', maxWidth: 640 }}>
          {/* Headline */}
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

          {/* Subcopy */}
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

        {/* ── Comparison Cards ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: '1rem', alignItems: 'stretch' }}
        >

          {/* Left — Problem card */}
          <motion.div
            ref={problemRef}
            initial={
              shouldReduce ? undefined : { opacity: 0, x: -30, filter: 'blur(10px)' }
            }
            animate={
              shouldReduce
                ? undefined
                : isProblemInView
                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                : { opacity: 0, x: -30, filter: 'blur(10px)' }
            }
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            style={{ height: '100%' }}
          >
            <div
              className="surface-secondary"
              style={{
                height: '100%',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                opacity: 0.88,
              }}
            >
              {/* Card header */}
              <div style={{ marginBottom: '1.6rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.7rem',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'rgba(255, 75, 75, 0.08)',
                      border: '1px solid rgba(255, 80, 80, 0.15)',
                      flexShrink: 0,
                    }}
                  >
                    <X
                      size={11}
                      strokeWidth={2.5}
                      style={{ color: 'rgba(255, 88, 88, 0.58)' }}
                    />
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.62rem',
                      fontWeight: 400,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.14em',
                      color: 'rgba(255,88,88,0.42)',
                    }}
                  >
                    Häufige Probleme
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: 'var(--muted)',
                    lineHeight: 1.18,
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  Was häufig schiefläuft
                </h3>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: 'rgba(255,255,255,0.055)',
                  marginBottom: '1.4rem',
                }}
              />

              {/* Items */}
              <div>
                {problems.map((text, i) => (
                  <ComparisonItem
                    key={i}
                    text={text}
                    type="problem"
                    delay={0.22 + i * 0.07}
                    isInView={isProblemInView}
                    shouldReduce={shouldReduce}
                    isLast={i === problems.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Solution card */}
          <motion.div
            ref={solutionRef}
            initial={
              shouldReduce ? undefined : { opacity: 0, x: 30, filter: 'blur(10px)' }
            }
            animate={
              shouldReduce
                ? undefined
                : isSolutionInView
                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                : { opacity: 0, x: 30, filter: 'blur(10px)' }
            }
            transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
            style={{ height: '100%' }}
          >
            <div
              className="surface-primary"
              style={{
                height: '100%',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                position: 'relative',
              }}
            >
              {/* Accent bloom inside card */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: '-25%',
                  left: '-15%',
                  width: '85%',
                  height: '85%',
                  background:
                    'radial-gradient(circle, rgba(211,253,81,0.048) 0%, transparent 65%)',
                  filter: 'blur(36px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* Content above bloom */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Card header */}
                <div style={{ marginBottom: '1.6rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.7rem',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'rgba(211, 253, 81, 0.10)',
                        border: '1px solid rgba(211, 253, 81, 0.22)',
                        flexShrink: 0,
                      }}
                    >
                      <Check
                        size={11}
                        strokeWidth={2.5}
                        style={{ color: 'rgba(211, 253, 81, 0.90)' }}
                      />
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.62rem',
                        fontWeight: 400,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.14em',
                        color: 'rgba(211,253,81,0.55)',
                      }}
                    >
                      Metz & Partner
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      color: 'var(--text)',
                      lineHeight: 1.18,
                      letterSpacing: '-0.02em',
                      margin: 0,
                    }}
                  >
                    Was Sie bei Metz & Partner bekommen
                  </h3>
                </div>

                {/* Accent divider */}
                <div
                  style={{
                    height: 1,
                    background:
                      'linear-gradient(90deg, rgba(211,253,81,0.20), rgba(255,255,255,0.06) 55%, transparent)',
                    marginBottom: '1.4rem',
                  }}
                />

                {/* Items */}
                <div>
                  {solutions.map((text, i) => (
                    <ComparisonItem
                      key={i}
                      text={text}
                      type="solution"
                      delay={0.30 + i * 0.07}
                      isInView={isSolutionInView}
                      shouldReduce={shouldReduce}
                      isLast={i === solutions.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

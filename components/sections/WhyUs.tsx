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
}: {
  text: string
  type: 'problem' | 'solution'
  delay: number
  isInView: boolean
  shouldReduce: boolean | null
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
        gap: '0.95rem',
        paddingTop: '0.95rem',
        paddingBottom: '0.95rem',
      }}
    >
      {/* Icon badge */}
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
            size={12}
            strokeWidth={2.5}
            style={{ color: 'rgba(255, 88, 88, 0.68)' }}
          />
        ) : (
          <Check
            size={12}
            strokeWidth={2.5}
            style={{ color: 'rgba(211, 253, 81, 0.90)' }}
          />
        )}
      </span>

      {/* Text */}
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'clamp(0.98rem, 1.15vw, 1.08rem)',
          fontWeight: 400,
          lineHeight: 1.58,
          color: type === 'problem' ? 'rgba(255,255,255,0.52)' : 'var(--text)',
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
                opacity: 0.96,
              }}
            >
              {problems.map((text, i) => (
                <ComparisonItem
                  key={i}
                  text={text}
                  type="problem"
                  delay={0.22 + i * 0.07}
                  isInView={isProblemInView}
                  shouldReduce={shouldReduce}
                />
              ))}
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
              {/* Subtle accent bloom inside card */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: '-25%',
                  left: '-15%',
                  width: '85%',
                  height: '85%',
                  background:
                    'radial-gradient(circle, rgba(211,253,81,0.038) 0%, transparent 65%)',
                  filter: 'blur(36px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {solutions.map((text, i) => (
                  <ComparisonItem
                    key={i}
                    text={text}
                    type="solution"
                    delay={0.30 + i * 0.07}
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

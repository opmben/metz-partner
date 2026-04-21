'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  LayoutGroup,
} from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { fadeUp, staggerContainer, clipRevealUp } from '@/lib/animations'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const AUTO_MS = 3600

// ─── Data ─────────────────────────────────────────────────────────────────────

const rails = [
  {
    id: 'design',
    label: 'Design',
    headline: 'Visuell eigenständig.',
    body: 'Kein Template. Wir entwickeln visuelle Richtung, Struktur und Interface — auf Ihr Unternehmen und Ihre Zielgruppe abgestimmt.',
    imgPosition: 'top center',
    isLive: false,
    gridDots: false,
    glow: 'rgba(211,253,81,0.052)',
  },
  {
    id: 'entwicklung',
    label: 'Entwicklung',
    headline: 'Sauber implementiert.',
    body: 'Performant, responsiv, wartbar. Moderner Stack, schnelle Ladezeiten — editierbar wo es sinnvoll ist.',
    imgPosition: '38% center',
    isLive: false,
    gridDots: true,
    glow: 'rgba(211,253,81,0.028)',
  },
  {
    id: 'launch',
    label: 'Launch & Übergabe',
    headline: 'Einsatzbereit übergeben.',
    body: 'Deployment, finale Abstimmung, vollständige Übergabe. Ein fertiges Ergebnis — keine offenen Enden.',
    imgPosition: 'bottom center',
    isLive: true,
    gridDots: false,
    glow: 'rgba(211,253,81,0.072)',
  },
] as const

// ─── Browser chrome ───────────────────────────────────────────────────────────

function BrowserChrome({
  isLive,
  shouldReduce,
}: {
  isLive: boolean
  shouldReduce: boolean | null
}) {
  return (
    <div
      style={{
        height: 44,
        background: 'rgba(6,6,6,0.94)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        flexShrink: 0,
      }}
    >
      {/* Traffic lights */}
      <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
        {[
          { c: '#FF5F57', g: 'rgba(255,95,87,0.55)' },
          { c: '#FEBC2E', g: 'rgba(254,188,46,0.50)' },
          { c: '#28C840', g: 'rgba(40,200,64,0.50)' },
        ].map(({ c, g }, i) => (
          <div
            key={i}
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: c,
              boxShadow: `0 0 6px ${g}`,
              opacity: 0.82,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* URL bar */}
      <div
        style={{
          flex: 1,
          height: 26,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          overflow: 'hidden',
          padding: '0 10px',
        }}
      >
        <motion.div
          animate={{
            background: isLive ? 'var(--accent)' : 'rgba(200,255,0,0.4)',
            boxShadow: isLive
              ? '0 0 10px rgba(211,253,81,0.85)'
              : '0 0 4px rgba(211,253,81,0.3)',
          }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            flexShrink: 0,
            animation:
              isLive && !shouldReduce
                ? 'heroPulse 1.8s ease-in-out infinite'
                : 'none',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.26)',
            letterSpacing: '0.025em',
            whiteSpace: 'nowrap',
          }}
        >
          fahrschule-dirk-arnold.de
        </span>
        <AnimatePresence>
          {isLive && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8, x: -4 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.55rem',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(211,253,81,0.8)',
                flexShrink: 0,
              }}
            >
              ● Live
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div style={{ width: 44, flexShrink: 0 }} />
    </div>
  )
}

// ─── Proof surface ────────────────────────────────────────────────────────────

function ProofSurface({
  activeIndex,
  shouldReduce,
}: {
  activeIndex: number
  shouldReduce: boolean | null
}) {
  const rail = rails[activeIndex]

  return (
    <motion.div
      className="panel-browser"
      initial={shouldReduce ? undefined : { opacity: 0, scale: 0.97 }}
      whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
      style={{ padding: 0, overflow: 'hidden', position: 'relative' }}
    >
      {/* Per-state atmosphere glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 80% 25%, ${rail.glow} 0%, transparent 65%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Chrome — always visible, state indicator inside */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <BrowserChrome isLive={rail.isLive} shouldReduce={shouldReduce} />
      </div>

      {/* Screenshot viewport */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`proof-${activeIndex}`}
            initial={
              shouldReduce
                ? undefined
                : { opacity: 0, filter: 'blur(10px)', scale: 1.015 }
            }
            animate={
              shouldReduce
                ? undefined
                : { opacity: 1, filter: 'blur(0px)', scale: 1 }
            }
            exit={
              shouldReduce
                ? undefined
                : { opacity: 0, filter: 'blur(10px)', scale: 1.015 }
            }
            transition={{ duration: 0.4, ease: EASE }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src="/projekte/Fahrschule-DA.jpg"
              alt="Fahrschule Dirk Arnold – Website"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{
                objectFit: 'cover',
                objectPosition: rail.imgPosition,
              }}
              priority={activeIndex === 0}
            />

            {/* Entwicklung: precision grid dot overlay */}
            {rail.gridDots && !shouldReduce && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.28 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'radial-gradient(circle, rgba(211,253,81,0.22) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Launch: live badge */}
            {rail.isLive && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.72rem',
                  background:
                    'linear-gradient(180deg, rgba(211,253,81,0.14), rgba(211,253,81,0.07)), rgba(6,6,6,0.55)',
                  border: '1px solid rgba(211,253,81,0.28)',
                  borderRadius: 999,
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow:
                    'inset 0 1px 0 rgba(211,253,81,0.18), 0 0 24px rgba(211,253,81,0.1)',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 8px rgba(211,253,81,0.8)',
                    animation: shouldReduce
                      ? 'none'
                      : 'heroPulse 1.8s ease-in-out infinite',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6rem',
                    fontWeight: 400,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: 'rgba(211,253,81,0.92)',
                  }}
                >
                  Live
                </span>
              </motion.div>
            )}

            {/* Bottom atmospheric fade */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '38%',
                background:
                  'linear-gradient(to top, rgba(6,6,6,0.72) 0%, rgba(6,6,6,0.24) 60%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Project credit */}
            <div
              style={{
                position: 'absolute',
                bottom: '0.88rem',
                left: '1rem',
                zIndex: 2,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6rem',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)',
                  margin: '0 0 0.12rem',
                }}
              >
                Fahrschule Dirk Arnold · 2026
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                fahrschule-dirk-arnold.de
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Single offer rail ────────────────────────────────────────────────────────

function OfferRail({
  rail,
  index,
  isActive,
  onSelect,
  shouldReduce,
}: {
  rail: (typeof rails)[number]
  index: number
  isActive: boolean
  onSelect: (i: number) => void
  shouldReduce: boolean | null
}) {
  return (
    <motion.div
      layout
      onClick={() => onSelect(index)}
      onHoverStart={() => onSelect(index)}
      transition={{ layout: { duration: 0.42, ease: EASE } }}
      style={{
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        isolation: 'isolate',
        borderRadius: 18,
        border: `1px solid ${isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.048)'}`,
        background: isActive
          ? 'linear-gradient(180deg, rgba(255,255,255,0.050), rgba(255,255,255,0.020)), rgba(6,6,6,0.42)'
          : 'transparent',
        boxShadow: isActive
          ? 'inset 0 1px 0 rgba(255,255,255,0.14), 0 12px 40px rgba(0,0,0,0.30)'
          : 'none',
        padding: isActive
          ? 'clamp(1.1rem, 2vw, 1.6rem)'
          : 'clamp(0.82rem, 1.4vw, 1.1rem)',
        transition:
          'padding 0.42s cubic-bezier(0.16,1,0.3,1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      {/* Lime left-edge accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: '18%',
          bottom: '18%',
          width: 2,
          borderRadius: 2,
          background: 'var(--accent)',
          boxShadow: '0 0 12px rgba(211,253,81,0.5)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.28rem',
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.62rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: isActive
                ? 'rgba(211,253,81,0.78)'
                : 'rgba(255,255,255,0.26)',
              transition: 'color 0.35s ease',
            }}
          >
            {rail.label}
          </span>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isActive
                ? 'clamp(1.05rem, 1.7vw, 1.3rem)'
                : 'clamp(0.88rem, 1.3vw, 1.05rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: isActive ? 'var(--text)' : 'rgba(255,255,255,0.38)',
              lineHeight: 1.2,
              letterSpacing: '-0.015em',
              margin: 0,
              transition: 'font-size 0.42s ease, color 0.35s ease',
            }}
          >
            {rail.headline}
          </p>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '0.7rem',
            letterSpacing: '0.02em',
            lineHeight: 1,
            paddingTop: '0.1rem',
            color: isActive
              ? 'rgba(211,253,81,0.42)'
              : 'rgba(255,255,255,0.10)',
            flexShrink: 0,
            transition: 'color 0.35s ease',
          }}
        >
          0{index + 1}
        </span>
      </div>

      {/* Body — CSS grid accordion (no height animation) */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isActive ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.42s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{ minHeight: 0, overflow: 'hidden' }}>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(0.82rem, 1.1vw, 0.88rem)',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.72,
              margin: '0.72rem 0 0',
              maxWidth: '46ch',
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.28s ease',
            }}
          >
            {rail.body}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Services section ─────────────────────────────────────────────────────────

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [timerKey, setTimerKey] = useState(0)

  const handleSelect = (i: number) => {
    setActiveIndex(i)
    setTimerKey((k) => k + 1)
  }

  useEffect(() => {
    if (isPaused || shouldReduce) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rails.length)
    }, AUTO_MS)
    return () => clearInterval(timer)
  }, [isPaused, shouldReduce, timerKey])

  return (
    <section
      id="leistungen"
      style={{
        paddingTop: 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
      }}
    >
      <div className="container-site">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={
            shouldReduce ? undefined : isHeaderInView ? 'visible' : 'hidden'
          }
          style={{ marginBottom: 'clamp(2rem, 3.5vw, 2.75rem)' }}
        >
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            style={{ marginBottom: '0.875rem' }}
          >
            <SectionLabel>● Was Sie bekommen</SectionLabel>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="display-section"
              variants={shouldReduce ? undefined : clipRevealUp}
            >
              Websites, die für Sie arbeiten.
            </motion.h2>
          </div>
        </motion.div>

        {/* ── Main panel ── */}
        <motion.div
          className="surface-primary"
          initial={shouldReduce ? undefined : { opacity: 0, y: 28 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ padding: 'clamp(1.25rem, 2.5vw, 2rem)' }}
        >
          <div
            className="services-rails-layout"
            style={{ display: 'grid', gap: 'clamp(1.25rem, 3vw, 1.75rem)' }}
          >

            {/* ── Left: offer rails + CTA ── */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(1.5rem, 2.5vw, 2rem)',
              }}
            >
              <LayoutGroup id="offer-rails">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {rails.map((rail, i) => (
                    <OfferRail
                      key={rail.id}
                      rail={rail}
                      index={i}
                      isActive={activeIndex === i}
                      onSelect={handleSelect}
                      shouldReduce={shouldReduce}
                    />
                  ))}
                </div>
              </LayoutGroup>

              {/* CTA — natural conclusion of the rail system */}
              <motion.div
                initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
                whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.48 }}
              >
                <a
                  href="#kontakt"
                  className="button-glass-primary"
                  style={{
                    textDecoration: 'none',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.11em',
                    color: 'var(--text)',
                  }}
                >
                  Projekt anfragen
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    aria-hidden="true"
                    style={{ marginLeft: 2 }}
                  >
                    <path
                      d="M2.5 6.5h8M8 3.5l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* ── Right: shared proof surface ── */}
            <ProofSurface activeIndex={activeIndex} shouldReduce={shouldReduce} />

          </div>
        </motion.div>

      </div>
    </section>
  )
}

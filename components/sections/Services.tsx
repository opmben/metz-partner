'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'webdesign',
    number: '01',
    label: 'Webdesign',
    title: 'Individuell statt Template.',
    body: 'Keine Templates. Design, Struktur und Inhalte werden gezielt auf Ihr Unternehmen und Ihre Zielgruppe abgestimmt.',
    imgPosition: 'top center',
    isLive: false,
    gridDots: false,
    glow: 'rgba(211,253,81,0.048)',
  },
  {
    id: 'entwicklung',
    number: '02',
    label: 'Entwicklung',
    title: 'Schnell. Stabil. Zuverlässig.',
    body: 'Schnell, mobiloptimiert und zuverlässig. Moderne Technologien sorgen für Performance und Stabilität.',
    imgPosition: '38% center',
    isLive: false,
    gridDots: true,
    glow: 'rgba(211,253,81,0.026)',
  },
  {
    id: 'sichtbarkeit',
    number: '03',
    label: 'Sichtbarkeit & Betreuung',
    title: 'Ihre Website entwickelt sich weiter.',
    body: 'SEO-Grundlagen, laufende Anpassungen und regelmäßige Updates – damit Ihre Website dauerhaft Ergebnisse liefert.',
    imgPosition: 'bottom center',
    isLive: true,
    gridDots: false,
    glow: 'rgba(211,253,81,0.068)',
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
        height: 40,
        background: 'rgba(4,4,4,0.97)',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 10,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {[
          { c: '#FF5F57', g: 'rgba(255,95,87,0.5)' },
          { c: '#FEBC2E', g: 'rgba(254,188,46,0.45)' },
          { c: '#28C840', g: 'rgba(40,200,64,0.45)' },
        ].map(({ c, g }, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: c,
              boxShadow: `0 0 5px ${g}`,
              opacity: 0.82,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <div
        style={{
          flex: 1,
          height: 24,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.065)',
          borderRadius: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          overflow: 'hidden',
          padding: '0 9px',
        }}
      >
        <motion.div
          animate={{
            background: isLive ? 'var(--accent)' : 'rgba(200,255,0,0.35)',
            boxShadow: isLive
              ? '0 0 10px rgba(211,253,81,0.85)'
              : '0 0 4px rgba(211,253,81,0.3)',
          }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{
            width: 5,
            height: 5,
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
            fontSize: '0.585rem',
            color: 'rgba(255,255,255,0.24)',
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
              transition={{ duration: 0.28, ease: EASE }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.52rem',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(211,253,81,0.78)',
                flexShrink: 0,
              }}
            >
              ● Live
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div style={{ width: 40, flexShrink: 0 }} />
    </div>
  )
}

// ─── Proof panel ──────────────────────────────────────────────────────────────

function ProofPanel({
  activeIndex,
  shouldReduce,
  isInView,
}: {
  activeIndex: number
  shouldReduce: boolean | null
  isInView: boolean
}) {
  const s = services[activeIndex]

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 28, scale: 0.975 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 28, scale: 0.975 }
      }
      transition={{ duration: 1.05, ease: EASE, delay: 0.2 }}
      className="panel-browser"
      style={{ padding: 0, overflow: 'hidden', position: 'relative' }}
    >
      {/* Per-state atmosphere */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`atm-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 75% 22%, ${s.glow} 0%, transparent 64%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Chrome */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <BrowserChrome isLive={s.isLive} shouldReduce={shouldReduce} />
      </div>

      {/* Screenshot */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/10',
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
                : { opacity: 0, filter: 'blur(10px)', scale: 1.018 }
            }
            animate={
              shouldReduce
                ? undefined
                : { opacity: 1, filter: 'blur(0px)', scale: 1 }
            }
            exit={
              shouldReduce
                ? undefined
                : { opacity: 0, filter: 'blur(10px)', scale: 1.018 }
            }
            transition={{ duration: 0.4, ease: EASE }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src="/projekte/Fahrschule-DA.jpg"
              alt="Fahrschule Dirk Arnold – Website"
              fill
              sizes="(min-width: 768px) 56vw, 100vw"
              style={{
                objectFit: 'cover',
                objectPosition: s.imgPosition,
              }}
              priority={activeIndex === 0}
            />

            {/* Entwicklung: dot grid overlay */}
            {s.gridDots && !shouldReduce && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'radial-gradient(circle, rgba(211,253,81,0.22) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Launch: live badge */}
            {s.isLive && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.38, ease: EASE, delay: 0.18 }}
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.38rem',
                  padding: '0.28rem 0.7rem',
                  background:
                    'linear-gradient(180deg, rgba(211,253,81,0.13), rgba(211,253,81,0.065)), rgba(6,6,6,0.52)',
                  border: '1px solid rgba(211,253,81,0.26)',
                  borderRadius: 999,
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow:
                    'inset 0 1px 0 rgba(211,253,81,0.16), 0 0 22px rgba(211,253,81,0.09)',
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
                    fontSize: '0.58rem',
                    fontWeight: 400,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: 'rgba(211,253,81,0.9)',
                  }}
                >
                  Live
                </span>
              </motion.div>
            )}

            {/* Bottom fade */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '36%',
                background:
                  'linear-gradient(to top, rgba(6,6,6,0.72) 0%, rgba(6,6,6,0.22) 60%, transparent 100%)',
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
                  fontSize: '0.58rem',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.26)',
                  margin: '0 0 0.1rem',
                }}
              >
                Fahrschule Dirk Arnold · 2026
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.48)',
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

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
  isActive,
  onActivate,
  shouldReduce,
  delay,
  isInView,
}: {
  service: (typeof services)[number]
  index: number
  isActive: boolean
  onActivate: (i: number) => void
  shouldReduce: boolean | null
  delay: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 20, filter: 'blur(8px)' }
      }
      transition={{ duration: 0.78, ease: EASE, delay }}
      onHoverStart={() => onActivate(index)}
      style={{ position: 'relative', isolation: 'isolate' }}
    >
      {/* Glass card surface — manual recipe for full animate control */}
      <motion.div
        animate={{
          background: isActive
            ? 'linear-gradient(160deg, rgba(255,255,255,0.048) 0%, rgba(255,255,255,0.018) 100%), rgba(6,6,6,0.46)'
            : 'linear-gradient(160deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.010) 100%), rgba(6,6,6,0.32)',
          borderColor: isActive
            ? 'rgba(255,255,255,0.13)'
            : 'rgba(255,255,255,0.068)',
          boxShadow: isActive
            ? 'inset 0 1px 0 rgba(255,255,255,0.16), 0 14px 48px rgba(0,0,0,0.32), 0 0 64px rgba(211,253,81,0.04)'
            : 'inset 0 1px 0 rgba(255,255,255,0.07), 0 6px 20px rgba(0,0,0,0.18)',
          y: isActive && !shouldReduce ? -4 : 0,
        }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          position: 'relative',
          borderRadius: 20,
          border: '1px solid',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          padding: 'clamp(1.1rem, 1.8vw, 1.5rem)',
          overflow: 'hidden',
        }}
      >
        {/* Luminous top highlight */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '0 0 auto 0',
            height: 1,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 12%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.14) 88%, transparent 100%)',
            opacity: 0.8,
            pointerEvents: 'none',
          }}
        />

        {/* Active lime top accent */}
        <motion.div
          aria-hidden
          animate={{
            opacity: isActive ? 1 : 0,
            scaleX: isActive ? 1 : 0.25,
          }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(211,253,81,0.75), transparent)',
            pointerEvents: 'none',
            zIndex: 2,
            transformOrigin: 'center',
          }}
        />

        {/* Inner content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Number + label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              marginBottom: 'clamp(0.6rem, 1vw, 0.88rem)',
            }}
          >
            <motion.span
              animate={{
                color: isActive
                  ? 'rgba(211,253,81,0.58)'
                  : 'rgba(255,255,255,0.16)',
              }}
              transition={{ duration: 0.32 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '0.6rem',
                letterSpacing: '0.04em',
                flexShrink: 0,
              }}
            >
              {service.number}
            </motion.span>

            <motion.div
              animate={{
                background: isActive
                  ? 'rgba(211,253,81,0.32)'
                  : 'rgba(255,255,255,0.08)',
                width: isActive ? 22 : 14,
              }}
              transition={{ duration: 0.38, ease: EASE }}
              style={{ height: 1, flexShrink: 0 }}
            />

            <motion.span
              animate={{
                color: isActive
                  ? 'rgba(211,253,81,0.72)'
                  : 'rgba(255,255,255,0.28)',
              }}
              transition={{ duration: 0.32 }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.575rem',
                fontWeight: 400,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.155em',
              }}
            >
              {service.label}
            </motion.span>
          </div>

          {/* Title */}
          <motion.h3
            animate={{
              color: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.65)',
            }}
            transition={{ duration: 0.32 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.05rem, 1.55vw, 1.25rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              margin: '0 0 clamp(0.45rem, 0.8vw, 0.65rem)',
            }}
          >
            {service.title}
          </motion.h3>

          {/* Body */}
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(0.78rem, 1.02vw, 0.85rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.48)',
              lineHeight: 1.72,
              margin: 0,
            }}
          >
            {service.body}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Services section ─────────────────────────────────────────────────────────

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const isPanelInView = useInView(panelRef, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section
      id="leistungen"
      style={{
        paddingTop: 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section atmosphere */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-8%',
          width: '52vw',
          height: '52vw',
          maxWidth: 640,
          maxHeight: 640,
          background:
            'radial-gradient(ellipse at 35% 65%, rgba(212,131,10,0.065) 0%, rgba(184,134,11,0.025) 45%, transparent 70%)',
          filter: 'blur(72px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>

        {/* ── Section header ── */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)' }}>

          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={
              shouldReduce
                ? undefined
                : isHeaderInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.7, ease: EASE }}
            style={{ marginBottom: '0.8rem' }}
          >
            <SectionLabel>● Was Sie bekommen</SectionLabel>
          </motion.div>

          <div style={{ overflow: 'hidden', marginBottom: '0.85rem' }}>
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
              transition={{ duration: 0.92, ease: EASE, delay: 0.07 }}
            >
              Alles, was Ihre Website erfolgreich macht.
            </motion.h2>
          </div>

          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={
              shouldReduce
                ? undefined
                : isHeaderInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.42)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '60ch',
            }}
          >
            Von Design über Technik bis zur Sichtbarkeit – wir kümmern uns um alle entscheidenden Bereiche.
          </motion.p>
        </div>

        {/* ── Main panel ── */}
        <motion.div
          ref={panelRef}
          className="surface-primary"
          initial={shouldReduce ? undefined : { opacity: 0, y: 28 }}
          animate={
            shouldReduce
              ? undefined
              : isPanelInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 28 }
          }
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          onMouseLeave={() => setActiveIndex(0)}
          style={{ padding: 'clamp(1.25rem, 2.5vw, 2rem)' }}
        >
          <div
            className="services-rails-layout"
            style={{ display: 'grid', gap: 'clamp(1.25rem, 3vw, 1.75rem)' }}
          >

            {/* ── Left: service cards + CTA ── */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.55rem, 1vw, 0.75rem)',
              }}
            >
              {services.map((s, i) => (
                <ServiceCard
                  key={s.id}
                  service={s}
                  index={i}
                  isActive={activeIndex === i}
                  onActivate={setActiveIndex}
                  shouldReduce={shouldReduce}
                  delay={0.28 + i * 0.09}
                  isInView={isPanelInView}
                />
              ))}

              {/* CTA */}
              <motion.div
                initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
                animate={
                  shouldReduce
                    ? undefined
                    : isPanelInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 8 }
                }
                transition={{ duration: 0.65, ease: EASE, delay: 0.62 }}
                style={{ paddingTop: 'clamp(0.5rem, 1vw, 0.875rem)' }}
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
                  Projekt besprechen
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

            {/* ── Right: proof panel ── */}
            <ProofPanel
              activeIndex={activeIndex}
              shouldReduce={shouldReduce}
              isInView={isPanelInView}
            />

          </div>
        </motion.div>

      </div>
    </section>
  )
}

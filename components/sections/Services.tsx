'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Data ─────────────────────────────────────────────────────────────────────

const modules = [
  {
    number: '01',
    label: 'Webdesign',
    title: 'Individuell statt Template.',
    body: 'Design und Struktur werden gezielt auf Ihr Unternehmen und Ihre Zielgruppe abgestimmt — kein Baukasten.',
  },
  {
    number: '02',
    label: 'Entwicklung',
    title: 'Schnell. Stabil. Zuverlässig.',
    body: 'Mobiloptimiert, performant, langfristig stabil. Moderne Technologien ohne unnötige Komplexität.',
  },
  {
    number: '03',
    label: 'Sichtbarkeit',
    title: 'Ihre Website wächst mit.',
    body: 'SEO-Grundlagen, laufende Pflege und regelmäßige Updates — damit die Website dauerhaft wirkt.',
  },
]

// ─── Before Chrome ────────────────────────────────────────────────────────────

function BeforeChrome() {
  return (
    <div
      style={{
        height: 36,
        background: 'rgba(4,4,4,0.97)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 8,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', gap: 5 }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
          <div
            key={i}
            style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.32 }}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          height: 20,
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.5rem',
            color: 'rgba(255,255,255,0.15)',
            letterSpacing: '0.02em',
          }}
        >
          fahrschule-dirk-arnold.de
        </span>
      </div>
    </div>
  )
}

// ─── After Chrome ─────────────────────────────────────────────────────────────

function AfterChrome({ shouldReduce }: { shouldReduce: boolean | null }) {
  return (
    <div
      style={{
        height: 40,
        background: 'rgba(4,4,4,0.97)',
        borderBottom: '1px solid rgba(255,255,255,0.065)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 10,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', gap: 6 }}>
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
          padding: '0 9px',
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 10px rgba(211,253,81,0.85)',
            animation: shouldReduce ? 'none' : 'heroPulse 1.8s ease-in-out infinite',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.585rem',
            color: 'rgba(255,255,255,0.26)',
            letterSpacing: '0.025em',
          }}
        >
          fahrschule-dirk-arnold.de
        </span>
      </div>
      <div style={{ width: 40, flexShrink: 0 }} />
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const proofRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const isProofInView = useInView(proofRef, { once: true, margin: '-60px' })
  const isStripInView = useInView(stripRef, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  const [afterHovered, setAfterHovered] = useState(false)

  return (
    <section
      id="leistungen"
      style={{
        paddingTop: 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'clip',
        overflowClipMargin: '200px',
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
            'radial-gradient(ellipse at 35% 65%, rgba(212,131,10,0.12) 0%, rgba(184,134,11,0.05) 45%, transparent 70%)',
          filter: 'blur(72px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '40vw',
          height: '40vw',
          maxWidth: 520,
          maxHeight: 520,
          background:
            'radial-gradient(ellipse at 65% 35%, rgba(211,253,81,0.04) 0%, transparent 65%)',
          filter: 'blur(80px)',
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
              Webdesign, das Anfragen bringt.
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
              maxWidth: '56ch',
            }}
          >
            Design, Entwicklung, SEO — alles aus einer Hand. Maßgeschneidert
            für Ihr Unternehmen, nicht von der Stange.
          </motion.p>
        </div>

        {/* ── Before / After proof ── */}
        <div
          ref={proofRef}
          className="grid grid-cols-1 md:grid-cols-[5fr_8fr]"
          style={{ gap: '1rem', alignItems: 'stretch' }}
        >

          {/* ── Before frame ── */}
          <motion.div
            className="order-last md:order-none panel-browser"
            initial={shouldReduce ? undefined : { opacity: 0, x: -28, filter: 'blur(12px)' }}
            animate={
              shouldReduce
                ? undefined
                : isProofInView
                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                : { opacity: 0, x: -28, filter: 'blur(12px)' }
            }
            transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
            style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          >
            <BeforeChrome />

            {/* Image area — stretches to match After frame height */}
            <div style={{ flex: 1, position: 'relative', minHeight: 180, overflow: 'hidden' }}>
              <Image
                src="/projekte/fahrschule-da-before.jpg"
                alt="Fahrschule Dirk Arnold – Website vor der Überarbeitung"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                  filter: 'saturate(0.22) brightness(0.60)',
                }}
                sizes="(max-width: 767px) 100vw, 38vw"
              />

              {/* Darkening overlay */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(6,6,6,0.26)',
                  pointerEvents: 'none',
                }}
              />

              {/* Bottom fade */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  background: 'linear-gradient(to top, rgba(6,6,6,0.80) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Vorher label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  left: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.22rem 0.65rem',
                  background: 'rgba(6,6,6,0.70)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 999,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.52rem',
                    fontWeight: 400,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(255,255,255,0.36)',
                  }}
                >
                  Vorher
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── After frame ── */}
          <motion.div
            className="order-first md:order-none"
            initial={shouldReduce ? undefined : { opacity: 0, x: 28, filter: 'blur(12px)' }}
            animate={
              shouldReduce
                ? undefined
                : isProofInView
                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                : { opacity: 0, x: 28, filter: 'blur(12px)' }
            }
            transition={{ duration: 1.0, ease: EASE, delay: 0.2 }}
            style={{ display: 'block' }}
          >
            <Link
              href="/projekte/fahrschule-rhein-hunsrueck"
              style={{ display: 'block', height: '100%' }}
            >
              <motion.div
                className="panel-browser"
                onHoverStart={() => !shouldReduce && setAfterHovered(true)}
                onHoverEnd={() => setAfterHovered(false)}
                animate={{
                  borderColor: afterHovered
                    ? 'rgba(255,255,255,0.20)'
                    : 'rgba(255,255,255,0.10)',
                  boxShadow: afterHovered
                    ? 'inset 0 1px 0 rgba(255,255,255,0.28), 0 32px 80px rgba(0,0,0,0.58), 0 0 80px rgba(211,253,81,0.07)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.14), 0 18px 56px rgba(0,0,0,0.44)',
                }}
                transition={{ duration: 0.42, ease: EASE }}
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <AfterChrome shouldReduce={shouldReduce} />

                {/* Image area — sets height for the whole row via aspect-ratio */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src="/projekte/fahrschule-da-after.jpg"
                    alt="Fahrschule Dirk Arnold – neue Website von Metz & Partner"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    sizes="(max-width: 767px) 100vw, 62vw"
                    priority
                  />

                  {/* Subtle image scale on hover */}
                  {!shouldReduce && (
                    <motion.div
                      animate={{ scale: afterHovered ? 1.018 : 1 }}
                      transition={{ duration: 0.7, ease: EASE }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* Bottom fade */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '32%',
                      background:
                        'linear-gradient(to top, rgba(6,6,6,0.68) 0%, transparent 100%)',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  />

                  {/* Nachher badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.85rem',
                      left: '0.85rem',
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
                        fontSize: '0.52rem',
                        fontWeight: 400,
                        letterSpacing: '0.13em',
                        textTransform: 'uppercase' as const,
                        color: 'rgba(211,253,81,0.9)',
                      }}
                    >
                      Nachher
                    </span>
                  </div>

                  {/* Hover CTA — project link */}
                  <motion.div
                    animate={{
                      opacity: afterHovered ? 1 : 0,
                      y: afterHovered ? 0 : 8,
                    }}
                    transition={{ duration: 0.32, ease: EASE }}
                    style={{
                      position: 'absolute',
                      bottom: '0.85rem',
                      right: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.28rem 0.75rem',
                      background: 'rgba(6,6,6,0.62)',
                      border: '1px solid rgba(255,255,255,0.16)',
                      borderRadius: 999,
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.52rem',
                        fontWeight: 400,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase' as const,
                        color: 'rgba(255,255,255,0.80)',
                      }}
                    >
                      Projekt ansehen
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

        </div>

        {/* ── Bausteine strip ── */}
        <motion.div
          ref={stripRef}
          className="surface-secondary flex flex-col md:flex-row"
          initial={shouldReduce ? undefined : { opacity: 0, y: 22 }}
          animate={
            shouldReduce
              ? undefined
              : isStripInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 22 }
          }
          transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
          style={{ marginTop: '1rem', padding: 0 }}
        >
          {modules.map((m, i) => (
            <motion.div
              key={m.number}
              initial={shouldReduce ? undefined : { opacity: 0 }}
              animate={
                shouldReduce
                  ? undefined
                  : isStripInView
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.6, ease: EASE, delay: 0.28 + i * 0.08 }}
              style={{
                flex: 1,
                padding: '1.35rem 1.85rem',
                borderBottom: i < modules.length - 1 ? '1px solid rgba(255,255,255,0.055)' : 'none',
              }}
              className={i < modules.length - 1 ? 'md:border-b-0 md:border-r md:border-white/[0.055]' : ''}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '0.62rem',
                  color: 'rgba(211,253,81,0.40)',
                  margin: '0 0 0.28rem',
                  letterSpacing: '0.04em',
                }}
              >
                {m.number}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.97)',
                  margin: '0 0 0.18rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase' as const,
                }}
              >
                {m.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '0.88rem',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.38)',
                  margin: '0 0 0.45rem',
                  lineHeight: 1.25,
                }}
              >
                {m.title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontWeight: 300,
                  color: 'var(--muted)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {m.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

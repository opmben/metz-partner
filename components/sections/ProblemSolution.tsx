'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Gauge, CalendarCheck } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'

const supporting = [
  {
    icon: Gauge,
    title: 'Schnell, mobil, gefunden',
    body: 'Pagespeed 90+, mobiloptimiert, SEO-ready — kein Add-on, kein Extra. Das ist unser Standard von Tag 1.',
    accentColor: 'var(--accent)',
    accentBg: 'rgba(200,255,0,0.08)',
  },
  {
    icon: CalendarCheck,
    title: 'Fertig in Wochen',
    body: 'Nicht in Monaten. Sie erhalten von Tag 1 einen konkreten Zeitplan und wissen immer, wo Ihre Website steht.',
    accentColor: 'var(--accent-warm)',
    accentBg: 'rgba(255,107,53,0.08)',
  },
]

export function ProblemSolution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      className="md:py-32"
    >
      <div className="container-site" style={{ overflow: 'hidden' }}>
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp} style={{ marginBottom: '4rem' }}>
            <SectionLabel>Warum wir</SectionLabel>
          </motion.div>

          {/* Problem / Solution */}
          <div
            style={{ marginBottom: '5rem' }}
            className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16"
          >
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--muted)',
                  marginBottom: '1.5rem',
                }}
              >
                Das Problem
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--muted)',
                  lineHeight: 1.4,
                }}
              >
                Die meisten Unternehmenswebsites in der Region sind veraltet, langsam, und
                generisch. Sie kosten Geld — und bringen keins.
              </p>
            </motion.div>

            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--accent)',
                  marginBottom: '1.5rem',
                }}
              >
                Die Lösung
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  lineHeight: 1.3,
                }}
              >
                Wir bauen Websites, die für Sie arbeiten. Nicht als Visitenkarte. Als Ihr bester
                Mitarbeiter.
              </p>
            </motion.div>
          </div>

          {/* Proof points */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              background: 'var(--border)',
            }}
          >
            {/* Primary — full width — full 4-side accent border */}
            <motion.div
              variants={shouldReduce ? undefined : fadeUp}
              style={{
                background: 'var(--surface)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--accent)',
                boxShadow: '0 0 0 1px rgba(200,255,0,0.12), inset 0 0 40px rgba(200,255,0,0.03)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'var(--accent)',
                }}
              />
              <div
                style={{ padding: '3rem 2.5rem' }}
                className="md:grid md:grid-cols-[1fr_1fr] md:gap-16 md:items-start"
              >
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      color: 'var(--accent)',
                      lineHeight: 1.15,
                      marginBottom: '1rem',
                    }}
                  >
                    Persönlich &amp; direkt
                  </h4>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--muted)',
                    }}
                  >
                    Unser wichtigster Unterschied
                  </p>
                </div>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 300,
                    color: 'var(--muted)',
                    lineHeight: 1.8,
                    marginTop: '1rem',
                  }}
                  className="md:mt-0"
                >
                  Sie sprechen immer mit Benedikt oder Maximilian — nicht mit einem Account
                  Manager, nicht mit einem Junior. Die Menschen, die Ihre Website bauen, sind Ihre
                  Ansprechpartner. Von der ersten Anfrage bis zum Launch.
                </p>
              </div>
            </motion.div>

            {/* Supporting two — side by side */}
            <div
              style={{ display: 'grid', gap: '1px', background: 'var(--border)' }}
              className="grid-cols-1 md:grid md:grid-cols-2"
            >
              {supporting.map((point) => {
                const Icon = point.icon
                return (
                  <motion.div
                    key={point.title}
                    variants={shouldReduce ? undefined : fadeUp}
                    style={{
                      background: 'var(--bg)',
                      padding: '2.5rem',
                      position: 'relative',
                    }}
                  >
                    {/* Top border line */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: 'var(--border-hover)',
                      }}
                    />

                    {/* Icon */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: point.accentBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.25rem',
                        color: point.accentColor,
                      }}
                    >
                      <Icon size={17} />
                    </div>

                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        color: 'var(--text)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {point.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 300,
                        color: 'var(--muted)',
                        lineHeight: 1.75,
                      }}
                    >
                      {point.body}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

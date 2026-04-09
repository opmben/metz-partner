'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer, slideUpClip } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'

const founders = [
  {
    initial: 'B',
    name: 'Benedikt Metz',
    role: 'Head of UI/UX Design',
    bio: 'Hintergrund in Grafikdesign und Recht. Zuständig für alles, was man sieht — und dafür, dass es rechtlich stimmt.',
    accentBg: 'rgba(200,255,0,0.06)',
    accentBorder: 'rgba(200,255,0,0.15)',
  },
  {
    initial: 'M',
    name: 'Maximilian Metz',
    role: 'Head of Marketing & Sales',
    bio: 'Hintergrund in Marketing und Finanzen. Zuständig für Strategie, Wirkung und dafür, dass Ihre Website konvertiert.',
    accentBg: 'rgba(255,107,53,0.06)',
    accentBorder: 'rgba(255,107,53,0.15)',
  },
]

const differentiators = [
  {
    number: '01',
    title: 'Direkt & persönlich',
    body: 'Sie haben immer eine direkte Ansprechperson — Benedikt oder Maximilian. Kein Ticketsystem, kein Wartezimmer, keine Vertretung. Die Menschen, die Ihre Website bauen, sind von der ersten Anfrage bis zum Launch erreichbar.',
  },
  {
    number: '02',
    title: 'Regional verankert',
    body: 'Wir kommen aus Koblenz. Wir kennen die Region, die lokalen Branchen, die typischen Anforderungen von Handwerksbetrieben, Kanzleien und Gastronomie. Wenn es sein muss, kommen wir auch persönlich vorbei.',
  },
  {
    number: '03',
    title: 'Von der Strategie bis zum Launch',
    body: 'Wir denken Ihre Website nicht als reinen Design-Auftrag. Wir fragen zuerst: Was soll sie erreichen? Wer kommt dort an? Was soll als nächstes passieren? Dann bauen wir genau das — nicht mehr, nicht weniger.',
  },
]

function FounderPhotoPlaceholder({
  founder,
}: {
  founder: (typeof founders)[0]
}) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Photo frame */}
      <div
        style={{
          width: '100%',
          aspectRatio: '3/4',
          background: 'var(--surface)',
          border: `1px solid ${founder.accentBorder}`,
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: founder.accentBg,
            borderRadius: 4,
          }}
        />
        {/* Grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(240,237,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.025) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Initial */}
        <span
          style={{
            position: 'relative',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 12vw, 8rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(240,237,232,0.07)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {founder.initial}
        </span>

        {/* Placeholder badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(8,8,8,0.8)',
            border: '1px solid rgba(240,237,232,0.08)',
            borderRadius: 100,
            padding: '0.3rem 0.9rem',
            backdropFilter: 'blur(8px)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontSize: '0.55rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(240,237,232,0.32)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            Foto folgt
          </span>
        </div>
      </div>
    </div>
  )
}

export function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="ueber-uns"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
      }}
      className="md:py-32"
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={shouldReduce ? undefined : fadeUp} style={{ marginBottom: '1.25rem' }}>
            <SectionLabel>Warum Metz & Partner</SectionLabel>
          </motion.div>

          {/* Positioning statement — the gold copy */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            style={{ marginBottom: '4rem', maxWidth: 720 }}
          >
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="display-section"
                variants={shouldReduce ? undefined : slideUpClip}
                style={{ display: 'block' }}
              >
                Wenn Sie uns anfragen,{' '}
                <em style={{ color: 'var(--accent)' }}>sprechen Sie mit uns.</em>
              </motion.h2>
            </div>
            <motion.p
              variants={shouldReduce ? undefined : fadeUp}
              style={{
                marginTop: '1.5rem',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.75,
                maxWidth: 560,
              }}
            >
              Nicht mit einem Account Manager. Nicht mit einem Junior. Mit den Menschen, die
              Ihre Website bauen — von der ersten Anfrage bis zum Launch.
            </motion.p>
          </motion.div>

          {/* Founders */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.1)}
            style={{ marginBottom: '5rem' }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
          >
            {founders.map((founder) => (
              <motion.div
                key={founder.name}
                variants={shouldReduce ? undefined : fadeUp}
              >
                <FounderPhotoPlaceholder founder={founder} />

                {/* Name + role */}
                <div style={{ marginTop: '1.5rem' }}>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'var(--muted)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {founder.role}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      color: 'var(--text)',
                      lineHeight: 1.15,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {founder.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 300,
                      color: 'var(--muted)',
                      lineHeight: 1.75,
                    }}
                  >
                    {founder.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Differentiators */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.08)}
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '4rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gap: '1px',
                background: 'var(--border)',
              }}
              className="grid-cols-1 md:grid-cols-3"
            >
              {differentiators.map((d) => (
                <motion.div
                  key={d.number}
                  variants={shouldReduce ? undefined : fadeUp}
                  style={{
                    background: 'var(--surface)',
                    padding: '2.5rem',
                    position: 'relative',
                  }}
                >
                  {/* Faint number */}
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      fontWeight: 400,
                      letterSpacing: '0.1em',
                      color: 'var(--muted)',
                      marginBottom: '1.5rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {d.number}
                  </p>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      color: 'var(--text)',
                      lineHeight: 1.2,
                      marginBottom: '1rem',
                    }}
                  >
                    {d.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: 'var(--muted)',
                      lineHeight: 1.8,
                    }}
                  >
                    {d.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

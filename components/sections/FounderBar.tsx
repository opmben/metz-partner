'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'

const founders = [
  {
    name: 'Benedikt Metz',
    role: 'Head of UI/UX Design',
    bio: 'Hintergrund in Grafikdesign und Recht. Zuständig für alles, was man sieht — und dafür, dass es rechtlich stimmt.',
  },
  {
    name: 'Maximilian Metz',
    role: 'Head of Marketing & Sales',
    bio: 'Hintergrund in Marketing und Finanzen. Zuständig für Strategie, Wirkung und dafür, dass Ihre Website konvertiert.',
  },
]

export function FounderBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
      className="md:py-32"
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.1)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp} style={{ marginBottom: '3rem' }}>
            <SectionLabel>Über uns</SectionLabel>
          </motion.div>

          {/* Founder cards */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                variants={shouldReduce ? undefined : fadeUp}
                style={{
                  padding: '2.5rem 0',
                  paddingRight: i === 0 ? '3rem' : 0,
                  paddingLeft: i === 1 ? '3rem' : 0,
                  borderRight: i === 0 ? '1px solid var(--border)' : 'none',
                  borderTop: i === 1 ? '1px solid var(--border)' : 'none',
                  position: 'relative',
                }}
                className={i === 0 ? 'md:border-r md:border-t-0' : 'md:border-t-0 md:pl-12'}
              >
                {/* Accent top line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: i === 1 ? '3rem' : 0,
                    right: 0,
                    height: 1,
                    background: 'var(--accent)',
                  }}
                  className={i === 1 ? 'md:left-12' : ''}
                />

                <p
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--muted)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {founder.role}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: 'var(--text)',
                    marginBottom: '1rem',
                    lineHeight: 1.1,
                  }}
                >
                  {founder.name}
                </h3>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 300,
                    color: 'var(--muted)',
                    lineHeight: 1.75,
                    maxWidth: 340,
                  }}
                >
                  {founder.bio}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Positioning statement */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            style={{
              marginTop: '3rem',
              paddingTop: '3rem',
              borderTop: '1px solid var(--border)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.5,
              }}
            >
              Wenn Sie uns anfragen, sprechen Sie mit uns.
              <br />
              <span style={{ color: 'var(--muted)' }}>
                Nicht mit einem Account Manager. Nicht mit einem Junior.
              </span>
              <br />
              Mit den Menschen, die Ihre Website bauen.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

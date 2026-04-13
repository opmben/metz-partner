'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
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

function FounderCard({
  founder,
  isRight,
  shouldReduce,
}: {
  founder: (typeof founders)[0]
  isRight: boolean
  shouldReduce: boolean | null
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={shouldReduce ? undefined : fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2.5rem 0',
        paddingRight: !isRight ? '3rem' : 0,
        paddingLeft: isRight ? '3rem' : 0,
        borderRight: !isRight ? '1px solid var(--border)' : 'none',
        position: 'relative',
        cursor: 'default',
      }}
      className={isRight ? 'md:pl-12' : 'md:pr-12'}
    >
      {/* Top accent border — animates scaleX on hover */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: isRight ? '3rem' : 0,
          right: 0,
          height: 2,
          background: 'var(--accent)',
          transformOrigin: 'left',
          boxShadow: hovered ? '0 0 12px rgba(200,255,0,0.4)' : 'none',
        }}
        animate={{ scaleX: hovered ? 1 : 0.35, opacity: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={isRight ? 'md:left-12' : ''}
      />

      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--muted)',
          marginBottom: '0.75rem',
          fontFamily: 'var(--font-ui)',
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
          fontFamily: 'var(--font-ui)',
        }}
      >
        {founder.bio}
      </p>
    </motion.div>
  )
}

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
              <FounderCard
                key={founder.name}
                founder={founder}
                isRight={i === 1}
                shouldReduce={shouldReduce}
              />
            ))}
          </div>

          {/* Positioning statement — tightened gap */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            style={{
              marginTop: '2.5rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.6,
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

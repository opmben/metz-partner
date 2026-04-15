'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { type Variants } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'

// ── Variants ──────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ── Data ──────────────────────────────────────────────────────────────────────

const founders = [
  {
    initial: 'B',
    name: 'Benedikt Metz',
    role: 'Head of UI/UX Design',
    bio: 'Hintergrund in Grafikdesign und Recht. Zuständig für alles, was man sieht — und dafür, dass es rechtlich stimmt.',
    accentAngle: '135deg',
  },
  {
    initial: 'M',
    name: 'Maximilian Metz',
    role: 'Head of Marketing & Sales',
    bio: 'Hintergrund in Marketing und Finanzen. Zuständig für Strategie, Wirkung und dafür, dass Ihre Website konvertiert.',
    accentAngle: '225deg',
  },
]

// ── FounderCard ───────────────────────────────────────────────────────────────

function FounderCard({ founder }: { founder: (typeof founders)[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 6,
        border: '1px solid var(--border)',
        background: 'rgba(17,17,17,0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        position: 'relative',
      }}
    >
      {/* Accent top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'var(--accent)',
          opacity: 0.8,
        }}
      />

      {/* ── Left panel: photo placeholder ──
          To swap in a real photo later, replace this div's contents with:
          <Image src={founder.image} alt={founder.name} fill className="object-cover" />
          and add position: 'relative' to the container.
      ── */}
      <div
        style={{
          width: 200,
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(${founder.accentAngle}, rgba(200,255,0,0.07) 0%, rgba(8,8,8,0.0) 60%)`,
          borderRight: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="hidden sm:flex"
      >
        {/* Atmospheric grain layer */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 40% 60%, rgba(200,255,0,0.06) 0%, transparent 65%)',
          }}
        />
        {/* Initial */}
        <span
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(5rem, 10vw, 7.5rem)',
            fontWeight: 400,
            lineHeight: 1,
            color: 'rgba(200,255,0,0.18)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
            position: 'relative',
          }}
        >
          {founder.initial}
        </span>
      </div>

      {/* ── Right panel: info ── */}
      <div
        style={{
          padding: '2.25rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.6rem',
          flex: 1,
          minWidth: 0,
        }}
      >
        <p
          style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-ui)',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--muted)',
          }}
        >
          {founder.role}
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--text)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
        >
          {founder.name}
        </h3>

        <p
          style={{
            fontSize: '0.9rem',
            fontWeight: 300,
            fontFamily: 'var(--font-ui)',
            color: 'var(--muted)',
            lineHeight: 1.7,
            marginTop: '0.25rem',
            maxWidth: 380,
          }}
        >
          {founder.bio}
        </p>
      </div>
    </motion.div>
  )
}

// ── FounderBar ────────────────────────────────────────────────────────────────

export function FounderBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const animState = shouldReduce ? 'visible' : isInView ? 'visible' : 'hidden'

  return (
    <section
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
      className="md:py-20"
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : containerVariants}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : animState}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {/* Label */}
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>Über uns</SectionLabel>
          </motion.div>

          {/* Cards */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {founders.map((founder) => (
              <FounderCard key={founder.name} founder={founder} />
            ))}
          </div>

          {/* Positioning statement */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            style={{
              marginTop: '1rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
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

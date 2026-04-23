'use client'
import { useRef } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'

// ── Variants ──────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.05 },
  },
}

// Clip-reveal: line slides up from overflow:hidden parent
const lineClip: Variants = {
  hidden: { y: '108%' },
  visible: {
    y: '0%',
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// Soft fade-up for divider + CTA
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// Ghost background fades in slowly
const ghostFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2.5, ease: 'easeOut' as const },
  },
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Manifesto() {
  const shouldReduce = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const animState = shouldReduce ? 'visible' : isInView ? 'visible' : 'hidden'

  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        paddingTop: 'clamp(5rem, 10vw, 11rem)',
        paddingBottom: 'clamp(5rem, 10vw, 11rem)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* ── Oversized ghost "Eindruck" — depth layer ── */}
      {!shouldReduce && (
        <motion.div
          aria-hidden="true"
          variants={ghostFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(10rem, 28vw, 30rem)',
              lineHeight: 0.85,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(240,237,232,0.032)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.04em',
            }}
          >
            Eindruck
          </span>
        </motion.div>
      )}

      {/* ── Radial lime glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '65vw',
          height: '65vw',
          maxWidth: 1000,
          maxHeight: 1000,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(200,255,0,0.05), transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
      <div className="container-site" style={{ position: 'relative' }}>
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : containerVariants}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : animState}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3rem',
          }}
        >
          {/* ── Manifesto text ── */}
          <div
            className="display-manifesto"
            style={{ maxWidth: 980, width: '100%' }}
          >
            {/* Line 1 */}
            <div
              style={{ overflow: 'hidden', paddingBottom: '0.07em' }}
            >
              <motion.div
                variants={shouldReduce ? undefined : lineClip}
              >
                <span>Ihre Website ist oft der&nbsp;</span>
                <em style={{ color: 'var(--accent)' }}>erste Eindruck</em>
                <span>.</span>
              </motion.div>
            </div>

            {/* Line 2 */}
            <div
              style={{ overflow: 'hidden', paddingBottom: '0.07em' }}
            >
              <motion.div
                variants={shouldReduce ? undefined : lineClip}
              >
                Manchmal der einzige.
              </motion.div>
            </div>

            {/* Line 3 */}
            <div
              style={{ overflow: 'hidden', paddingBottom: '0.07em' }}
            >
              <motion.div
                variants={shouldReduce ? undefined : lineClip}
                style={{
                  color: 'var(--muted)',
                  fontStyle: 'italic',
                }}
              >
                Wir sorgen dafür, dass er zählt.
              </motion.div>
            </div>
          </div>

          {/* ── Accent divider ── */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            style={{
              width: 1,
              height: 56,
              background:
                'linear-gradient(to bottom, rgba(200,255,0,0.6), transparent)',
            }}
          />

          {/* ── CTA ── */}
          <motion.a
            href="#kontakt"
            onClick={scrollTo}
            variants={shouldReduce ? undefined : fadeUp}
            whileHover={shouldReduce ? undefined : { scale: 1.04, y: -3 }}
            whileTap={shouldReduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.85rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '1rem 2.5rem',
              borderRadius: 100,
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 0 40px rgba(200,255,0,0.15)',
            }}
          >
            Jetzt Projekt anfragen →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

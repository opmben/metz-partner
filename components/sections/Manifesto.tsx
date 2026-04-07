'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

export function Manifesto() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
      className="md:py-40"
    >
      {/* Subtle green glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.06), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.15)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}
        >
          <motion.p
            variants={shouldReduce ? undefined : fadeUp}
            className="display-manifesto"
            style={{ maxWidth: 900 }}
          >
            Ihre Website ist oft der{' '}
            <em style={{ color: 'var(--accent)' }}>erste Eindruck</em>.
            <br />
            Manchmal der einzige.
            <br />
            <span style={{ color: 'var(--muted)' }}>
              Wir sorgen dafür, dass er zählt.
            </span>
          </motion.p>

          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <a
              href="#kontakt"
              onClick={scrollTo}
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
                transition: 'transform 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04) translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1) translateY(0)'
              }}
            >
              Jetzt Projekt anfragen →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

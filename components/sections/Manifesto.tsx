'use client'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.35'],
  })

  // Each text segment brightens sequentially as the section scrolls through
  const opacity1 = useTransform(scrollYProgress, [0, 0.25], [0.12, 1])
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.5], [0.12, 1])
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.72], [0.12, 1])
  const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.82], [0, 1])

  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      style={{
        paddingTop: '9rem',
        paddingBottom: '9rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
      className="md:py-48"
    >
      {/* Radial glow — centred */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.055), transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3.5rem',
          }}
        >
          {/* Manifesto text */}
          <div className="display-manifesto" style={{ maxWidth: 880 }}>
            {shouldReduce ? (
              // Static fallback for reduced-motion
              <>
                <span>Ihre Website ist oft der </span>
                <em style={{ color: 'var(--accent)' }}>erste Eindruck</em>
                <span>.</span>
                <br />
                <span>Manchmal der einzige.</span>
                <br />
                <span style={{ color: 'var(--muted)' }}>
                  Wir sorgen dafür, dass er zählt.
                </span>
              </>
            ) : (
              // Scroll-linked reveal
              <>
                <motion.span style={{ opacity: opacity1 }}>
                  Ihre Website ist oft der{' '}
                </motion.span>
                <motion.em style={{ color: 'var(--accent)', opacity: opacity1 }}>
                  erste Eindruck
                </motion.em>
                <motion.span style={{ opacity: opacity1 }}>.</motion.span>
                <br />
                <motion.span style={{ opacity: opacity2 }}>
                  Manchmal der einzige.
                </motion.span>
                <br />
                <motion.span style={{ color: 'var(--muted)', opacity: opacity3 }}>
                  Wir sorgen dafür, dass er zählt.
                </motion.span>
              </>
            )}
          </div>

          {/* CTA */}
          {shouldReduce ? (
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
                display: 'inline-block',
              }}
            >
              Jetzt Projekt anfragen →
            </a>
          ) : (
            <motion.a
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
                display: 'inline-block',
                opacity: ctaOpacity,
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Jetzt Projekt anfragen →
            </motion.a>
          )}
        </div>
      </div>
    </section>
  )
}

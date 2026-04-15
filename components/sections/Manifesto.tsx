'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const { scrollYProgress } = useScroll({
    target: mounted ? sectionRef : undefined,
    offset: ['start 0.85', 'end 0.35'],
  })

  // Each text segment brightens sequentially as the section scrolls through
  const opacity1 = useTransform(scrollYProgress, [0, 0.25], [0.1, 1])
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.5], [0.1, 1])
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.72], [0.1, 1])
  const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.82], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.55, 0.82], [20, 0])

  // Background oversized type parallax
  const bgTextY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      style={{
        paddingTop: '10rem',
        paddingBottom: '10rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Oversized background type — depth layer */}
      {!shouldReduce && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            y: bgTextY,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(12rem, 30vw, 32rem)',
              lineHeight: 0.85,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(240,237,232,0.04)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.04em',
            }}
          >
            Eindruck
          </span>
        </motion.div>
      )}

      {/* Radial glow — centred */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vw',
          maxWidth: 1200,
          maxHeight: 1200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.045), transparent 65%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4rem',
          }}
        >
          {/* Manifesto text */}
          <div className="display-manifesto" style={{ maxWidth: 920, position: 'relative' }}>
            {shouldReduce ? (
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

          {/* Accent divider */}
          <motion.div
            style={{
              width: 1,
              height: 56,
              background: 'linear-gradient(to bottom, rgba(200,255,0,0.6), transparent)',
              opacity: shouldReduce ? 1 : ctaOpacity,
            }}
          />

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
                y: ctaY,
                boxShadow: '0 0 40px rgba(200,255,0,0.18)',
              }}
              whileHover={{ scale: 1.04, y: -3 }}
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

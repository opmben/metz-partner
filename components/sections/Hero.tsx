'use client'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { slideUpClip, fadeIn, fadeUp } from '@/lib/animations'

const orb1Animation = {
  animate: { x: [0, -60, 40, 0], y: [0, 40, -30, 0], scale: [1, 1.1, 0.95, 1] },
  transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' as const },
}
const orb2Animation = {
  animate: { x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 0.95, 1.08, 1] },
  transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' as const },
}
const orb3Animation = {
  animate: { x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 1.05, 0.98, 1] },
  transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' as const },
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(240,237,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Color orbs */}
      {mounted && !shouldReduce && (
        <>
          <motion.div
            aria-hidden="true"
            animate={orb1Animation.animate}
            transition={orb1Animation.transition}
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '60vw',
              height: '60vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,255,0,0.12), transparent 70%)',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            aria-hidden="true"
            animate={orb2Animation.animate}
            transition={orb2Animation.transition}
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '-10%',
              width: '50vw',
              height: '50vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.09), transparent 70%)',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            aria-hidden="true"
            animate={orb3Animation.animate}
            transition={orb3Animation.transition}
            style={{
              position: 'absolute',
              top: '30%',
              left: '40%',
              width: '40vw',
              height: '40vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(120,80,255,0.07), transparent 70%)',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Diagonal marquee background text */}
      {mounted && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '-10%',
              width: '120%',
              transform: 'rotate(-12deg)',
              opacity: 0.05,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 5vw, 6rem)',
              fontStyle: 'italic',
              color: 'var(--text)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              animation: 'marqueeScroll 30s linear infinite',
            }}
          >
            Design · Entwicklung · Ergebnisse · Design · Entwicklung · Ergebnisse · Design · Entwicklung · Ergebnisse ·
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        className="container-site"
        style={{
          paddingTop: '10rem',
          paddingBottom: '6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        }}
      >
        {/* Badge */}
        <motion.div
          variants={shouldReduce ? undefined : fadeIn}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : 'visible'}
          transition={{ delay: 0.5 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              border: '1px solid var(--border)',
              borderRadius: 100,
              padding: '0.45rem 1rem',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'block',
                boxShadow: '0 0 8px var(--accent)',
                animation: mounted && !shouldReduce ? 'pulse 2s ease-in-out infinite' : 'none',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.72rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--muted)',
              }}
            >
              Webdesign · Koblenz & Region
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <div>
          {(['Websites, die', 'Unternehmen wachsen', 'lassen.'] as const).map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div
                className="display-hero"
                variants={shouldReduce ? undefined : slideUpClip}
                initial={shouldReduce ? undefined : 'hidden'}
                animate={shouldReduce ? undefined : 'visible'}
                transition={{ delay: 0.7 + i * 0.15 }}
                style={{ display: 'block' }}
              >
                {i === 1 ? (
                  <>
                    Unternehmen{' '}
                    <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>wachsen</em>
                  </>
                ) : (
                  line
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subline + CTAs */}
        <div
          style={{ gap: '2rem', maxWidth: 680 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between md:max-w-none"
        >

          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            initial={shouldReduce ? undefined : 'hidden'}
            animate={shouldReduce ? undefined : 'visible'}
            transition={{ delay: 1.25 }}
            style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexShrink: 0 }}
          >
            <a
              href="#projekte"
              onClick={scrollTo('#projekte')}
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.9rem 2rem',
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
              Unsere Arbeiten
            </a>
            <a
              href="#kontakt"
              onClick={scrollTo('#kontakt')}
              style={{
                color: 'var(--muted)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8rem',
                fontWeight: 400,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
              }}
            >
              Gespräch anfragen →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={shouldReduce ? undefined : fadeIn}
        initial={shouldReduce ? undefined : 'hidden'}
        animate={shouldReduce ? undefined : 'visible'}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--muted)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--muted), transparent)',
            animation: mounted && !shouldReduce ? 'scrollLine 2s ease-in-out infinite' : 'none',
          }}
        />
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--accent); }
          50% { opacity: 0.6; box-shadow: 0 0 16px var(--accent); }
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        @keyframes marqueeScroll {
          0% { transform: rotate(-12deg) translateX(0); }
          100% { transform: rotate(-12deg) translateX(-33.33%); }
        }
      `}</style>
    </section>
  )
}

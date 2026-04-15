'use client'
import { useRef, useCallback, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export function Manifesto() {
  const shouldReduce = useReducedMotion()

  // Callback ref: element is guaranteed mounted when passed to useScroll
  const sectionRef = useRef<HTMLElement | null>(null)
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null)

  const refCallback = useCallback((el: HTMLElement | null) => {
    sectionRef.current = el
    setSectionEl(el)
  }, [])

  // Wide offset so reveal spans the full time section is in view
  const { scrollYProgress } = useScroll({
    target: sectionEl ? sectionRef : undefined,
    offset: ['start 0.92', 'end 0.15'],
  })

  // ── Line 1: "Ihre Website ist oft der erste Eindruck." ──
  const line1Opacity = useTransform(scrollYProgress, [0, 0.28], [0, 1])
  const line1Y      = useTransform(scrollYProgress, [0, 0.28], [48, 0])
  const line1Blur   = useTransform(scrollYProgress, [0, 0.28], [6, 0])

  // ── Line 2: "Manchmal der einzige." ──
  const line2Opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const line2Y       = useTransform(scrollYProgress, [0.2, 0.5], [48, 0])

  // ── Line 3: "Wir sorgen dafür, dass er zählt." ──
  const line3Opacity = useTransform(scrollYProgress, [0.4, 0.68], [0, 1])
  const line3Y       = useTransform(scrollYProgress, [0.4, 0.68], [48, 0])

  // ── Divider + CTA ──
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])
  const ctaY       = useTransform(scrollYProgress, [0.6, 0.85], [28, 0])

  // ── Background oversized type ──
  const bgTextY = useTransform(scrollYProgress, [0, 1], [80, -80])

  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={refCallback}
      style={{
        paddingTop: '12rem',
        paddingBottom: '12rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Oversized ghost type — depth layer */}
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
              WebkitTextStroke: '1px rgba(240,237,232,0.035)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.04em',
            }}
          >
            Eindruck
          </span>
        </motion.div>
      )}

      {/* Radial lime glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '70vw',
          maxWidth: 1100,
          maxHeight: 1100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.04), transparent 65%)',
          filter: 'blur(80px)',
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
          {/* ── Manifesto text ── */}
          <div
            className="display-manifesto"
            style={{ maxWidth: 960, position: 'relative', lineHeight: 1.12 }}
          >
            {shouldReduce ? (
              /* Static fallback */
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
                {/* Line 1 */}
                <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                  <motion.div
                    style={{
                      opacity: line1Opacity,
                      y: line1Y,
                      filter: useTransform(line1Blur, (v) => `blur(${v}px)`),
                      display: 'block',
                    }}
                  >
                    <span>Ihre Website ist oft der </span>
                    <em style={{ color: 'var(--accent)' }}>erste Eindruck</em>
                    <span>.</span>
                  </motion.div>
                </div>

                {/* Line 2 */}
                <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                  <motion.div
                    style={{
                      opacity: line2Opacity,
                      y: line2Y,
                      display: 'block',
                    }}
                  >
                    Manchmal der einzige.
                  </motion.div>
                </div>

                {/* Line 3 */}
                <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                  <motion.div
                    style={{
                      opacity: line3Opacity,
                      y: line3Y,
                      display: 'block',
                      color: 'var(--muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    Wir sorgen dafür, dass er zählt.
                  </motion.div>
                </div>
              </div>
            )}
          </div>

          {/* Accent divider */}
          <motion.div
            style={{
              width: 1,
              height: 52,
              background: 'linear-gradient(to bottom, rgba(200,255,0,0.65), transparent)',
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

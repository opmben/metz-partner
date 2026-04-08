'use client'
import { useSyncExternalStore } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { slideUpClip, fadeIn, fadeUp } from '@/lib/animations'
import { Zap, Clock, ArrowRight } from 'lucide-react'

const orb1Animation = {
  animate: { x: [0, -60, 40, 0], y: [0, 40, -30, 0], scale: [1, 1.1, 0.95, 1] },
  transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' as const },
}
const orb2Animation = {
  animate: { x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 0.95, 1.08, 1] },
  transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' as const },
}

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function BrowserMockup({ shouldReduce }: { shouldReduce: boolean | null }) {
  return (
    <motion.div
      animate={shouldReduce ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 48px 96px rgba(0,0,0,0.55), 0 0 0 1px rgba(240,237,232,0.03)',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--surface-2)',
        }}
      >
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {['rgba(255,107,53,0.75)', 'rgba(255,200,50,0.5)', 'rgba(200,255,0,0.45)'].map((c, i) => (
            <div
              key={i}
              style={{ width: 9, height: 9, borderRadius: '50%', background: c }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: 'var(--bg)',
            borderRadius: 6,
            padding: '0.3rem 0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgba(200,255,0,0.6)',
            }}
          />
          <span
            style={{
              fontSize: '0.6rem',
              fontFamily: 'monospace',
              color: 'var(--muted)',
              letterSpacing: '0.02em',
            }}
          >
            metzundpartner.de
          </span>
        </div>
      </div>

      {/* Site preview */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/10',
          overflow: 'hidden',
          background: '#090909',
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '55%',
            height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,255,0,0.1), transparent 70%)',
            filter: 'blur(32px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '5%',
            width: '30%',
            height: '35%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,53,0.07), transparent 70%)',
            filter: 'blur(24px)',
          }}
        />

        {/* Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(240,237,232,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.018) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Skeleton */}
        <div style={{ padding: '1.2rem', position: 'relative' }}>
          {/* Nav skeleton */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.4rem',
              paddingBottom: '0.65rem',
              borderBottom: '1px solid rgba(240,237,232,0.05)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 8,
                borderRadius: 4,
                background: 'rgba(240,237,232,0.28)',
              }}
            />
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[36, 28, 40, 32].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: w,
                    height: 4,
                    borderRadius: 2,
                    background: 'rgba(240,237,232,0.1)',
                  }}
                />
              ))}
            </div>
            <div
              style={{
                width: 46,
                height: 16,
                borderRadius: 8,
                background: 'rgba(200,255,0,0.38)',
              }}
            />
          </div>

          {/* Hero text skeleton */}
          <div style={{ marginBottom: '1.1rem' }}>
            <div
              style={{
                width: '76%',
                height: 10,
                borderRadius: 3,
                background: 'rgba(240,237,232,0.22)',
                marginBottom: '0.5rem',
              }}
            />
            <div
              style={{
                width: '58%',
                height: 10,
                borderRadius: 3,
                background: 'rgba(240,237,232,0.17)',
                marginBottom: '0.5rem',
              }}
            />
            <div
              style={{
                width: '38%',
                height: 10,
                borderRadius: 3,
                background: 'rgba(200,255,0,0.38)',
                marginBottom: '0.9rem',
              }}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div
                style={{
                  width: 58,
                  height: 17,
                  borderRadius: 9,
                  background: 'rgba(200,255,0,0.52)',
                }}
              />
              <div
                style={{
                  width: 48,
                  height: 17,
                  borderRadius: 9,
                  background: 'rgba(240,237,232,0.06)',
                  border: '1px solid rgba(240,237,232,0.1)',
                }}
              />
            </div>
          </div>

          {/* Cards row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            {[0.08, 0.05, 0.07].map((op, i) => (
              <div
                key={i}
                style={{
                  height: 48,
                  borderRadius: 3,
                  background: `rgba(240,237,232,${op})`,
                  border: '1px solid rgba(240,237,232,0.04)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const shouldReduce = useReducedMotion()

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
        alignItems: 'center',
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
            'linear-gradient(rgba(240,237,232,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Colour orbs */}
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
              background: 'radial-gradient(circle, rgba(200,255,0,0.07), transparent 70%)',
              filter: 'blur(140px)',
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
              background: 'radial-gradient(circle, rgba(255,107,53,0.05), transparent 70%)',
              filter: 'blur(140px)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Main content */}
      <div
        className="container-site"
        style={{ paddingTop: '6rem', paddingBottom: '5rem', width: '100%' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* ── LEFT: content ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            {/* Badge */}
            <motion.div
              variants={shouldReduce ? undefined : fadeIn}
              initial={shouldReduce ? undefined : 'hidden'}
              animate={shouldReduce ? undefined : 'visible'}
              transition={{ delay: 0.3 }}
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
                    animation:
                      mounted && !shouldReduce ? 'heroPulse 2.5s ease-in-out infinite' : 'none',
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
                    transition={{ delay: 0.5 + i * 0.15 }}
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

            {/* Sub + CTAs */}
            <motion.div
              variants={shouldReduce ? undefined : fadeUp}
              initial={shouldReduce ? undefined : 'hidden'}
              animate={shouldReduce ? undefined : 'visible'}
              transition={{ delay: 1.0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1rem',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: 'var(--muted)',
                  maxWidth: 420,
                }}
              >
                Wir sind{' '}
                <span style={{ color: 'var(--text)', fontWeight: 400 }}>
                  Benedikt und Maximilian
                </span>{' '}
                — zwei Gründer aus Koblenz, die Websites bauen, die nicht nur gut aussehen,
                sondern echte Ergebnisse liefern.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {/* Primary CTA — accent filled */}
                <motion.a
                  href="#projekte"
                  onClick={scrollTo('#projekte')}
                  whileHover={shouldReduce ? undefined : { scale: 1.04, y: -2 }}
                  whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '0.9rem 2rem',
                    borderRadius: 100,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  Unsere Arbeiten
                  <ArrowRight size={14} />
                </motion.a>

                {/* Secondary CTA */}
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
                    cursor: 'pointer',
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
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: floating visual panel (desktop only) ── */}
          <div className="hidden lg:block">
            <motion.div
              variants={shouldReduce ? undefined : fadeIn}
              initial={shouldReduce ? undefined : 'hidden'}
              animate={shouldReduce ? undefined : 'visible'}
              transition={{ delay: 0.9 }}
              style={{ position: 'relative', padding: '2.5rem 2.5rem 3rem 1rem' }}
            >
              <BrowserMockup shouldReduce={shouldReduce} />

              {/* Floating badge: Pagespeed — top right */}
              <motion.div
                animate={shouldReduce ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                style={{
                  position: 'absolute',
                  top: '0.25rem',
                  right: '-0.25rem',
                  background: 'rgba(12,12,12,0.92)',
                  border: '1px solid rgba(200,255,0,0.2)',
                  borderRadius: 10,
                  padding: '0.8rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  backdropFilter: 'blur(12px)',
                  boxShadow:
                    '0 0 24px rgba(200,255,0,0.07), 0 20px 40px rgba(0,0,0,0.45)',
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 7,
                    background: 'rgba(200,255,0,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}
                >
                  <Zap size={14} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '0.58rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--muted)',
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    Pagespeed
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '1.15rem',
                      color: 'var(--accent)',
                      lineHeight: 1,
                    }}
                  >
                    90+
                  </p>
                </div>
              </motion.div>

              {/* Floating badge: Fertig — bottom left */}
              <motion.div
                animate={shouldReduce ? undefined : { y: [0, 12, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  left: '-0.25rem',
                  background: 'rgba(12,12,12,0.92)',
                  border: '1px solid rgba(255,107,53,0.2)',
                  borderRadius: 10,
                  padding: '0.8rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  backdropFilter: 'blur(12px)',
                  boxShadow:
                    '0 0 24px rgba(255,107,53,0.06), 0 20px 40px rgba(0,0,0,0.45)',
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 7,
                    background: 'rgba(255,107,53,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-warm)',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={14} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '0.58rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--muted)',
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    Fertig in
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '1.15rem',
                      color: 'var(--text)',
                      lineHeight: 1,
                    }}
                  >
                    2–4 Wochen
                  </p>
                </div>
              </motion.div>

              {/* Floating badge: Personal — right-mid */}
              <motion.div
                animate={shouldReduce ? undefined : { y: [0, -9, 0] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 2.0 }}
                style={{
                  position: 'absolute',
                  top: '46%',
                  right: '-1rem',
                  background: 'rgba(12,12,12,0.92)',
                  border: '1px solid rgba(240,237,232,0.09)',
                  borderRadius: 10,
                  padding: '0.65rem 0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.45)',
                }}
              >
                {/* Avatar stack */}
                <div style={{ display: 'flex' }}>
                  {[
                    { initial: 'B', bg: 'var(--accent)', color: '#080808' },
                    { initial: 'M', bg: 'var(--accent-warm)', color: '#fff' },
                  ].map((a, i) => (
                    <div
                      key={i}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: a.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.55rem',
                        fontWeight: 700,
                        color: a.color,
                        marginLeft: i > 0 ? -6 : 0,
                        border: '2px solid rgba(12,12,12,0.92)',
                        fontFamily: 'var(--font-ui)',
                        flexShrink: 0,
                      }}
                    >
                      {a.initial}
                    </div>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 400,
                    color: 'rgba(240,237,232,0.75)',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  Direkt erreichbar
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={shouldReduce ? undefined : fadeIn}
        initial={shouldReduce ? undefined : 'hidden'}
        animate={shouldReduce ? undefined : 'visible'}
        transition={{ delay: 1.9 }}
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
            animation:
              mounted && !shouldReduce ? 'heroScrollLine 2s ease-in-out infinite' : 'none',
          }}
        />
      </motion.div>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--accent); }
          50%       { opacity: 0.5; box-shadow: 0 0 14px var(--accent); }
        }
        @keyframes heroScrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  )
}

'use client'
import { useSyncExternalStore, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { fadeIn, fadeUp, blurIn, charReveal, charContainer } from '@/lib/animations'
import { ArrowRight } from 'lucide-react'
import { HeroCanvasDynamic } from '@/components/shared/HeroCanvasDynamic'

/* ── hydration gate ── */
const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

/* ── per-character split text ── */
function SplitText({
  children,
  className,
  delay = 0,
  shouldReduce,
}: {
  children: string
  className?: string
  delay?: number
  shouldReduce: boolean | null
}) {
  return (
    <motion.span
      className={className}
      variants={shouldReduce ? undefined : charContainer(0.035)}
      initial={shouldReduce ? undefined : 'hidden'}
      animate={shouldReduce ? undefined : 'visible'}
      style={{ display: 'inline-flex', flexWrap: 'wrap', overflow: 'hidden' }}
      transition={{ delayChildren: delay }}
    >
      {children.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={shouldReduce ? undefined : charReveal}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

/* ── magnetic button wrapper ── */
function MagneticButton({
  children,
  shouldReduce,
}: {
  children: React.ReactNode
  shouldReduce: boolean | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 20 })
  const springY = useSpring(y, { stiffness: 250, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    if (shouldReduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.25)
    y.set((e.clientY - centerY) * 0.25)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

/* ── animated counter ── */
function AnimatedNumber({
  value,
  suffix = '',
  shouldReduce,
  delay = 0,
}: {
  value: number
  suffix?: string
  shouldReduce: boolean | null
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  if (typeof window !== 'undefined' && !hasAnimated.current && ref.current) {
    // handled by effect below
  }

  return (
    <motion.span
      ref={ref}
      initial={shouldReduce ? undefined : { opacity: 0 }}
      animate={shouldReduce ? undefined : { opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 'clamp(2rem, 3.5vw, 3rem)',
        color: 'var(--text)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}
    >
      <CountUp target={value} duration={1.4} delay={delay} shouldReduce={shouldReduce} />
      {suffix}
    </motion.span>
  )
}

function CountUp({
  target,
  duration,
  delay,
  shouldReduce,
}: {
  target: number
  duration: number
  delay: number
  shouldReduce: boolean | null
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasStarted = useRef(false)
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  if (mounted && !hasStarted.current && ref.current) {
    hasStarted.current = true
    const el = ref.current
    if (shouldReduce) {
      el.textContent = String(target)
    } else {
      const startTime = performance.now() + delay * 1000
      const animate = (now: number) => {
        const elapsed = Math.max(0, now - startTime)
        const progress = Math.min(elapsed / (duration * 1000), 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = String(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }

  return <span ref={ref}>{shouldReduce ? target : 0}</span>
}

/* ── orb animations ── */
const orb1Animation = {
  animate: { x: [0, -80, 50, 0], y: [0, 50, -40, 0], scale: [1, 1.15, 0.9, 1] },
  transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' as const },
}
const orb2Animation = {
  animate: { x: [0, 60, -40, 0], y: [0, -50, 40, 0], scale: [1, 0.9, 1.12, 1] },
  transition: { duration: 22, repeat: Infinity, ease: 'easeInOut' as const },
}
const orb3Animation = {
  animate: { x: [0, -30, 40, 0], y: [0, 30, -20, 0], scale: [1, 1.05, 0.95, 1] },
  transition: { duration: 26, repeat: Infinity, ease: 'easeInOut' as const },
}

/* ── Hero component ── */
export function Hero() {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const shouldReduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const gridParallax = useTransform(scrollYProgress, [0, 1], [0, 60])

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Grid background — parallax layer */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(240,237,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          y: shouldReduce ? 0 : gridParallax,
        }}
      />

      {/* Three.js wireframe — right half, SSR-safe */}
      {mounted && !shouldReduce && <HeroCanvasDynamic />}

      {/* Colour orbs — deeper, richer, 3 layers */}
      {mounted && !shouldReduce && (
        <>
          <motion.div
            aria-hidden="true"
            animate={orb1Animation.animate}
            transition={orb1Animation.transition}
            style={{
              position: 'absolute',
              top: '-15%',
              right: '-8%',
              width: '75vw',
              height: '90vw',
              maxWidth: 1100,
              maxHeight: 1300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,255,0,0.07), transparent 65%)',
              filter: 'blur(160px)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            aria-hidden="true"
            animate={orb2Animation.animate}
            transition={orb2Animation.transition}
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '-12%',
              width: '55vw',
              height: '55vw',
              maxWidth: 750,
              maxHeight: 750,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.06), transparent 65%)',
              filter: 'blur(140px)',
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
              left: '25%',
              width: '40vw',
              height: '40vw',
              maxWidth: 500,
              maxHeight: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(120,80,255,0.04), transparent 65%)',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Main content — parallax fade on scroll */}
      <motion.div
        className="container-site"
        style={{
          paddingTop: '8rem',
          paddingBottom: '6rem',
          width: '100%',
          y: shouldReduce ? 0 : parallaxY,
          opacity: shouldReduce ? 1 : parallaxOpacity,
        }}
      >
        {/* ── Centered headline block ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2.5rem',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {/* Badge */}
          <motion.div
            variants={shouldReduce ? undefined : blurIn}
            initial={shouldReduce ? undefined : 'hidden'}
            animate={shouldReduce ? undefined : 'visible'}
            transition={{ delay: 0.2 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                border: '1px solid var(--border)',
                borderRadius: 100,
                padding: '0.5rem 1.2rem',
                background: 'rgba(240,237,232,0.02)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'block',
                  boxShadow: '0 0 12px var(--accent)',
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
                  letterSpacing: '0.14em',
                  color: 'var(--muted)',
                }}
              >
                Webdesign aus Koblenz
              </span>
            </div>
          </motion.div>

          {/* Headline — character-level animation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Line 1 */}
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="display-hero"
                style={{ display: 'block', fontStyle: 'italic' }}
                initial={shouldReduce ? undefined : { y: '110%' }}
                animate={shouldReduce ? undefined : { y: '0%' }}
                transition={{
                  delay: 0.5,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Websites, die
              </motion.div>
            </div>

            {/* Line 2 — accent word */}
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="display-hero"
                style={{ display: 'block', fontStyle: 'italic' }}
                initial={shouldReduce ? undefined : { y: '110%' }}
                animate={shouldReduce ? undefined : { y: '0%' }}
                transition={{
                  delay: 0.65,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Unternehmen{' '}
                <span
                  style={{
                    color: 'var(--accent)',
                    position: 'relative',
                  }}
                >
                  wachsen
                  {/* Accent underline */}
                  <motion.span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: '0.05em',
                      left: 0,
                      height: '0.06em',
                      background: 'var(--accent)',
                      borderRadius: 2,
                      width: '100%',
                      transformOrigin: 'left',
                    }}
                    initial={shouldReduce ? undefined : { scaleX: 0 }}
                    animate={shouldReduce ? undefined : { scaleX: 1 }}
                    transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </motion.div>
            </div>

            {/* Line 3 */}
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                className="display-hero"
                style={{ display: 'block', fontStyle: 'italic' }}
                initial={shouldReduce ? undefined : { y: '110%' }}
                animate={shouldReduce ? undefined : { y: '0%' }}
                transition={{
                  delay: 0.8,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                lassen.
              </motion.div>
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={shouldReduce ? undefined : blurIn}
            initial={shouldReduce ? undefined : 'hidden'}
            animate={shouldReduce ? undefined : 'visible'}
            transition={{ delay: 1.1 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--muted)',
              maxWidth: 500,
            }}
          >
            Wir sind{' '}
            <span style={{ color: 'var(--text)', fontWeight: 400 }}>
              Benedikt und Maximilian
            </span>{' '}
            — zwei Gründer aus Koblenz, die Websites bauen, die nicht nur gut aussehen,
            sondern echte Ergebnisse liefern.
          </motion.p>

          {/* CTAs — magnetic */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            initial={shouldReduce ? undefined : 'hidden'}
            animate={shouldReduce ? undefined : 'visible'}
            transition={{ delay: 1.3 }}
            style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <MagneticButton shouldReduce={shouldReduce}>
              <motion.a
                href="#projekte"
                onClick={scrollTo('#projekte')}
                whileHover={shouldReduce ? undefined : { scale: 1.05, y: -3 }}
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
                  padding: '1rem 2.25rem',
                  borderRadius: 100,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 40px rgba(200,255,0,0.15)',
                }}
              >
                Unsere Arbeiten
                <ArrowRight size={14} />
              </motion.a>
            </MagneticButton>

            <MagneticButton shouldReduce={shouldReduce}>
              <motion.a
                href="#kontakt"
                onClick={scrollTo('#kontakt')}
                whileHover={
                  shouldReduce
                    ? undefined
                    : { scale: 1.05, borderColor: 'rgba(240,237,232,0.25)' }
                }
                whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  padding: '1rem 2rem',
                  border: '1px solid var(--border)',
                  borderRadius: 100,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
                }}
              >
                Gespräch anfragen
                <ArrowRight size={13} />
              </motion.a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── Stats row — open, borderless ── */}
        <motion.div
          variants={shouldReduce ? undefined : fadeUp}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : 'visible'}
          transition={{ delay: 1.6 }}
          style={{
            marginTop: 'clamp(4rem, 6vw, 6rem)',
            borderTop: '1px solid var(--border)',
            paddingTop: 'clamp(2rem, 3vw, 2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            rowGap: 'clamp(1.75rem, 3vw, 2.5rem)',
          }}
          className="md:grid-cols-4"
        >
          {[
            { value: 90, suffix: '+', label: 'Pagespeed Score' },
            { value: 2, suffix: '–4 Wo.', label: 'Projektdauer' },
            { value: 100, suffix: '%', label: 'Persönl. Kontakt' },
            { value: 0, suffix: '€', prefix: 'Ab 500', label: 'Faire Preise' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                paddingRight: '1rem',
              }}
            >
              <div>
                {stat.prefix ? (
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                      color: 'var(--text)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.prefix}
                  </span>
                ) : (
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    shouldReduce={shouldReduce}
                    delay={1.8 + i * 0.15}
                  />
                )}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.68rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--muted)',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — refined */}
      <motion.div
        variants={shouldReduce ? undefined : fadeIn}
        initial={shouldReduce ? undefined : 'hidden'}
        animate={shouldReduce ? undefined : 'visible'}
        transition={{ delay: 2.2 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <motion.div
          animate={shouldReduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 20,
            height: 32,
            borderRadius: 12,
            border: '1px solid rgba(240,237,232,0.15)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <motion.div
            animate={shouldReduce ? undefined : { y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 3,
              height: 8,
              borderRadius: 2,
              background: 'var(--accent)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade — extended for seamless flow into next section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 240,
          background: 'linear-gradient(to top, var(--bg) 0%, var(--bg) 20%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Sentinel: StickyCTA watches this — becomes visible when scrolled past */}
      <div id="__hero_sentinel" style={{ position: 'absolute', bottom: 0, height: 1, width: 1, pointerEvents: 'none' }} />
      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--accent); }
          50%       { opacity: 0.5; box-shadow: 0 0 18px var(--accent); }
        }
      `}</style>
    </section>
  )
}

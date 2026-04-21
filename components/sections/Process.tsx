'use client'
import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    title: 'Erstes Gespräch',
    meta: 'Calendly-Call oder Telefonat',
    duration: 'Kostenlos · 30 Min.',
    body: 'Wir lernen Ihr Unternehmen kennen, stellen Fragen, hören zu. Kein Pitch. Kein Druck. Am Ende wissen wir beide, ob wir zusammenpassen.',
  },
  {
    number: '02',
    title: 'Konzept & Angebot',
    meta: 'Struktur, Seitenaufbau, grober Designansatz',
    duration: '3–5 Tage',
    body: 'Sie erhalten ein konkretes Konzept und ein festes Angebot. Keine versteckten Kosten — kein "das klären wir später".',
  },
  {
    number: '03',
    title: 'Design & Entwicklung',
    meta: 'Wir bauen Ihre Website. Sie bleiben informiert.',
    duration: '2–4 Wochen',
    body: 'Zwei Feedback-Runden inklusive. Benedikt und Maximilian direkt erreichbar — kein Projektmanager dazwischen.',
  },
  {
    number: '04',
    title: 'Launch & Übergabe',
    meta: 'Live-Schaltung, Einweisung, Übergabe',
    duration: '1–2 Tage',
    body: 'Ihre Website ist online. Wir zeigen Ihnen, wie Sie sie selbst pflegen können — und bleiben für Fragen erreichbar.',
  },
]

// ─── Step Content (animated crossfade per step) ────────────────────────────────

function StepContent({
  step,
  direction,
  shouldReduce,
}: {
  step: (typeof steps)[0]
  direction: number
  shouldReduce: boolean | null
}) {
  const variants = {
    enter: (d: number) => ({
      x: shouldReduce ? 0 : d > 0 ? 44 : -44,
      opacity: 0,
      filter: shouldReduce ? 'blur(0px)' : 'blur(8px)',
    }),
    center: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (d: number) => ({
      x: shouldReduce ? 0 : d > 0 ? -44 : 44,
      opacity: 0,
      filter: shouldReduce ? 'blur(0px)' : 'blur(8px)',
    }),
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step.number}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <span
          className="button-pill-micro"
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            pointerEvents: 'none',
            cursor: 'default',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {step.duration}
        </span>

        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 3.2vw, 3rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              margin: '0 0 0.5rem',
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.74rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.30)',
              letterSpacing: '0.01em',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {step.meta}
          </p>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.85,
            maxWidth: 440,
            margin: 0,
          }}
        >
          {step.body}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Timeline Nav ──────────────────────────────────────────────────────────────

const ITEM_H = 80
const DOT_Y = 22

function TimelineNav({
  activeIndex,
  scrollProgress,
  shouldReduce,
}: {
  activeIndex: number
  scrollProgress: MotionValue<number>
  shouldReduce: boolean | null
}) {
  const firstDotTop = DOT_Y
  const lastDotTop = (steps.length - 1) * ITEM_H + DOT_Y
  const lineableH = lastDotTop - firstDotTop

  const fillH = useTransform(scrollProgress, [0, 1], [0, lineableH])

  return (
    <div style={{ position: 'relative', paddingLeft: 30 }}>
      {/* Base line */}
      <div
        style={{
          position: 'absolute',
          left: 6,
          top: firstDotTop,
          width: 1,
          height: lineableH,
          background: 'rgba(255,255,255,0.08)',
        }}
      />

      {/* Lime progress fill */}
      <motion.div
        style={{
          position: 'absolute',
          left: 6,
          top: firstDotTop,
          width: 1,
          height: fillH,
          background:
            'linear-gradient(to bottom, rgba(211,253,81,0.72), rgba(211,253,81,0.38))',
        }}
      />

      {steps.map((step, i) => {
        const isActive = i === activeIndex
        const isPast = i < activeIndex
        return (
          <div
            key={i}
            style={{
              height: ITEM_H,
              display: 'flex',
              alignItems: 'flex-start',
              paddingTop: DOT_Y - 6,
              gap: '1rem',
              position: 'relative',
            }}
          >
            {/* Dot */}
            <motion.div
              animate={{
                background: isActive
                  ? 'rgba(211,253,81,0.92)'
                  : isPast
                  ? 'rgba(211,253,81,0.36)'
                  : 'rgba(255,255,255,0.14)',
                boxShadow: isActive
                  ? '0 0 14px rgba(211,253,81,0.60), 0 0 4px rgba(211,253,81,0.90)'
                  : 'none',
                scale: isActive ? 1.28 : 1,
              }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 13,
                height: 13,
                borderRadius: '50%',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
              }}
            />

            {/* Label */}
            <div>
              <motion.p
                animate={{
                  color: isActive
                    ? 'rgba(255,255,255,0.90)'
                    : 'rgba(255,255,255,0.28)',
                }}
                transition={{ duration: 0.32 }}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 400 : 300,
                  margin: '0 0 0.18rem',
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </motion.p>
              <motion.p
                animate={{
                  color: isActive
                    ? 'rgba(255,255,255,0.36)'
                    : 'rgba(255,255,255,0.15)',
                }}
                transition={{ duration: 0.32 }}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.65rem',
                  fontWeight: 300,
                  margin: 0,
                  letterSpacing: '0.01em',
                }}
              >
                {step.duration}
              </motion.p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Mobile Step Card ──────────────────────────────────────────────────────────

function MobileStepCard({
  step,
  index,
  shouldReduce,
}: {
  step: (typeof steps)[0]
  index: number
  shouldReduce: boolean | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? undefined : { opacity: 0, y: 28 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 28 }
      }
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.06,
      }}
    >
      <div className="panel-process" style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.1rem',
          }}
        >
          <span
            className="button-pill-micro"
            style={{
              display: 'inline-flex',
              pointerEvents: 'none',
              cursor: 'default',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {step.duration}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '0.8rem',
              color: 'rgba(211,253,81,0.50)',
            }}
          >
            {step.number}
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 5vw, 1.9rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--text)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 0.5rem',
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.74rem',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.30)',
            letterSpacing: '0.01em',
            margin: '0 0 1rem',
          }}
        >
          {step.meta}
        </p>
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.07)',
            marginBottom: '1rem',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.875rem',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {step.body}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Desktop Sticky Process ────────────────────────────────────────────────────

function DesktopProcess({ shouldReduce }: { shouldReduce: boolean | null }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const activeIndexRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx =
      v >= 0.99
        ? steps.length - 1
        : Math.min(steps.length - 1, Math.floor(v * steps.length))
    if (idx !== activeIndexRef.current) {
      setDirection(idx > activeIndexRef.current ? 1 : -1)
      activeIndexRef.current = idx
      setActiveIndex(idx)
    }
  })

  return (
    /* Outer: tall scrollable container — provides the scroll room */
    <div ref={outerRef} style={{ height: '400vh', position: 'relative' }}>
      {/* Inner: pinned viewport — stays fixed while outer scrolls */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Atmospheric bloom */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '5%',
            left: '-8%',
            width: '55vw',
            height: '70vw',
            maxWidth: 700,
            maxHeight: 800,
            background:
              'radial-gradient(ellipse at 35% 45%, rgba(184,134,11,0.14) 0%, rgba(212,131,10,0.07) 40%, transparent 65%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        {/* Kinetic background step number */}
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            aria-hidden
            initial={
              shouldReduce
                ? undefined
                : { opacity: 0, y: '12%', filter: 'blur(24px)' }
            }
            animate={
              shouldReduce
                ? undefined
                : { opacity: 1, y: '0%', filter: 'blur(0px)' }
            }
            exit={
              shouldReduce
                ? undefined
                : { opacity: 0, y: '-12%', filter: 'blur(24px)' }
            }
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              bottom: '-0.1em',
              left: '-0.04em',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(14rem, 30vw, 26rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1,
              color: 'rgba(255,255,255,0.016)',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
          >
            {steps[activeIndex].number}
          </motion.span>
        </AnimatePresence>

        {/* Page content */}
        <div
          className="container-site"
          style={{ position: 'relative', zIndex: 1, width: '100%' }}
        >
          {/* Section header — compact inside sticky */}
          <div style={{ marginBottom: '2.5rem' }}>
            {/* Plain inline label — no glass pill; the cinematic sticky context doesn't need the pill language */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.85rem',
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px rgba(211,253,81,0.55)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.38)',
                }}
              >
                Der Ablauf
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 2.8vw, 3.25rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Kein Rätselraten. Kein Warten.
            </h2>
          </div>

          {/* Step panel + timeline grid */}
          <div
            className="grid grid-cols-[3fr_2fr]"
            style={{ gap: '2.5rem', alignItems: 'start' }}
          >
            {/* Featured step panel */}
            <div
              className="panel-process"
              style={{ padding: 'clamp(2rem, 3.2vw, 2.75rem)' }}
            >
              <StepContent
                step={steps[activeIndex]}
                direction={direction}
                shouldReduce={shouldReduce}
              />
            </div>

            {/* Scroll-driven timeline navigation */}
            <TimelineNav
              activeIndex={activeIndex}
              scrollProgress={scrollYProgress}
              shouldReduce={shouldReduce}
            />
          </div>
        </div>

        {/* Scroll affordance hint — fades away after first step */}
        <motion.div
          animate={{
            opacity: activeIndex === 0 && !shouldReduce ? 0.55 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '2.25rem',
            right: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.58rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.14em',
              margin: 0,
            }}
          >
            Scrollen
          </p>
          <motion.svg
            animate={shouldReduce ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
          >
            <path
              d="M6 2v9M3 8l3 4 3-4"
              stroke="rgba(255,255,255,0.38)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────

export function Process() {
  const shouldReduce = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Reduced motion or mobile: simple stacked card layout
  if (!isDesktop || shouldReduce) {
    return (
      <section
        id="prozess"
        style={{
          paddingTop: '8rem',
          paddingBottom: '8rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '15%',
            left: '-8%',
            width: '55vw',
            height: '70vw',
            maxWidth: 700,
            maxHeight: 800,
            background:
              'radial-gradient(ellipse at 35% 45%, rgba(184,134,11,0.14) 0%, rgba(212,131,10,0.07) 40%, transparent 65%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-site" style={{ position: 'relative' }}>
          {/* Header */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.1rem',
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px rgba(211,253,81,0.55)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.38)',
                }}
              >
                Der Ablauf
              </span>
            </div>
            <h2 className="display-section">
              Kein Rätselraten. Kein Warten.
            </h2>
          </div>

          {/* Stacked step cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {steps.map((step, i) => (
              <MobileStepCard
                key={step.number}
                step={step}
                index={i}
                shouldReduce={shouldReduce}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop: cinematic sticky scroll
  return (
    <section id="prozess" style={{ position: 'relative' }}>
      <DesktopProcess shouldReduce={shouldReduce} />
    </section>
  )
}

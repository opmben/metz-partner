'use client'
import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Progress Ring
// ─────────────────────────────────────────────────────────────────────────────

function ProgressRing({
  activeIndex,
  total,
  shouldReduce,
}: {
  activeIndex: number
  total: number
  shouldReduce: boolean | null
}) {
  const r = 44
  const circumference = 2 * Math.PI * r
  const progress = (activeIndex + 1) / total
  const dashOffset = circumference * (1 - progress)

  return (
    <svg
      width="104"
      height="104"
      viewBox="0 0 104 104"
      aria-hidden
      style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        pointerEvents: 'none',
        zIndex: 1,
        flexShrink: 0,
      }}
    >
      {/* Track */}
      <circle
        cx="52" cy="52" r={r}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
      />
      {/* Progress arc */}
      <motion.circle
        cx="52" cy="52" r={r}
        fill="none"
        stroke="rgba(212,131,10,0.50)"
        strokeWidth="1.5"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset: shouldReduce ? dashOffset : dashOffset }}
        initial={{ strokeDashoffset: circumference }}
        transition={
          shouldReduce
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
        }
        strokeLinecap="round"
        style={{ rotate: '-90deg', transformOrigin: '52px 52px' }}
      />
      {/* Fraction label */}
      <text
        x="52" y="48"
        textAnchor="middle"
        fontFamily="var(--font-ui)"
        fontSize="10"
        fill="rgba(255,255,255,0.28)"
        letterSpacing="0.05em"
      >
        {String(activeIndex + 1).padStart(2, '0')}
      </text>
      <text
        x="52" y="62"
        textAnchor="middle"
        fontFamily="var(--font-ui)"
        fontSize="8"
        fill="rgba(255,255,255,0.14)"
        letterSpacing="0.05em"
      >
        /{total}
      </text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured Panel
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedPanel({
  step,
  index,
  direction,
  onNext,
  onPrev,
  onDotClick,
  total,
  shouldReduce,
}: {
  step: (typeof steps)[0]
  index: number
  direction: number
  onNext: () => void
  onPrev: () => void
  onDotClick: (i: number) => void
  total: number
  shouldReduce: boolean | null
}) {
  const contentVariants = {
    enter: (d: number) => ({
      x: shouldReduce ? 0 : d > 0 ? 36 : -36,
      opacity: 0,
      filter: shouldReduce ? 'blur(0px)' : 'blur(7px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (d: number) => ({
      x: shouldReduce ? 0 : d > 0 ? -36 : 36,
      opacity: 0,
      filter: shouldReduce ? 'blur(0px)' : 'blur(7px)',
    }),
  }

  return (
    <div
      className="panel-process"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 360,
      }}
    >
      {/* Progress ring */}
      <ProgressRing activeIndex={index} total={total} shouldReduce={shouldReduce} />

      {/* Animated step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step.number}
          custom={direction}
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: 'clamp(1.75rem, 3vw, 2.5rem)',
            paddingRight: 'clamp(2rem, 12vw, 9rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.35rem',
            flex: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Duration badge */}
          <div>
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
          </div>

          {/* Title block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.74rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.32)',
                letterSpacing: '0.01em',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {step.meta}
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', width: '100%' }} />

          {/* Body */}
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.9rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.8,
              maxWidth: 400,
              margin: 0,
            }}
          >
            {step.body}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Bottom bar — progress dots + nav arrows */}
      <div
        style={{
          padding: '1rem 1.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.065)',
          marginTop: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Step dots */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {steps.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => onDotClick(i)}
              animate={{
                width: i === index ? 22 : 6,
                background:
                  i === index
                    ? 'rgba(212,131,10,0.78)'
                    : 'rgba(255,255,255,0.16)',
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduce ? undefined : { opacity: 0.9 }}
              style={{
                height: 3,
                borderRadius: 99,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
              aria-label={`Schritt ${i + 1}`}
            />
          ))}
        </div>

        {/* Nav arrows */}
        <div style={{ display: 'flex', gap: '0.45rem' }}>
          {(['prev', 'next'] as const).map((dir) => {
            const isPrev = dir === 'prev'
            const disabled = isPrev ? index === 0 : index === total - 1
            return (
              <motion.button
                key={dir}
                onClick={isPrev ? onPrev : onNext}
                disabled={disabled}
                whileHover={!shouldReduce && !disabled ? { scale: 1.08, borderColor: 'rgba(255,255,255,0.20)' } : undefined}
                whileTap={!shouldReduce && !disabled ? { scale: 0.94 } : undefined}
                transition={{ duration: 0.2 }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: disabled ? 'default' : 'pointer',
                  opacity: disabled ? 0.28 : 1,
                  color: 'rgba(255,255,255,0.75)',
                  transition: 'opacity 0.2s',
                  flexShrink: 0,
                }}
                aria-label={isPrev ? 'Vorheriger Schritt' : 'Nächster Schritt'}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  {isPrev
                    ? <path d="M7 1.5L3.5 5.5l3.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    : <path d="M4 1.5l3.5 4L4 9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  }
                </svg>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Step Selector Card
// ─────────────────────────────────────────────────────────────────────────────

function StepSelectorCard({
  step,
  index,
  isActive,
  onSelect,
  shouldReduce,
  entryDelay,
}: {
  step: (typeof steps)[0]
  index: number
  isActive: boolean
  onSelect: () => void
  shouldReduce: boolean | null
  entryDelay: number
}) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.button
      ref={ref}
      onClick={onSelect}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={shouldReduce ? undefined : { opacity: 0, x: 28 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: 28 }
      }
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: entryDelay,
      }}
      style={{
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        padding: 0,
        background: 'transparent',
        border: 'none',
        display: 'block',
        borderRadius: 20,
      }}
      aria-label={`Schritt ${index + 1}: ${step.title}`}
      aria-pressed={isActive}
    >
      {/* Glass card */}
      <motion.div
        animate={{
          borderColor: isActive
            ? 'rgba(255,255,255,0.17)'
            : hovered
            ? 'rgba(255,255,255,0.12)'
            : 'rgba(255,255,255,0.07)',
          boxShadow: isActive
            ? 'inset 0 1px 0 rgba(255,255,255,0.22), 0 12px 36px rgba(0,0,0,0.30), 0 0 42px rgba(212,131,10,0.08)'
            : hovered
            ? 'inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 24px rgba(0,0,0,0.22)'
            : 'inset 0 1px 0 rgba(255,255,255,0.09), 0 4px 14px rgba(0,0,0,0.16)',
          y: isActive ? 0 : hovered && !shouldReduce ? -2 : 0,
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          background: isActive
            ? 'linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.030))'
            : 'linear-gradient(180deg, rgba(255,255,255,0.038), rgba(255,255,255,0.018))',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.9rem',
        }}
      >
        {/* Top-edge highlight */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: '15%',
            height: 1,
            background: isActive
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Active left accent */}
        <motion.div
          animate={{
            scaleY: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: 0,
            top: '20%',
            bottom: '20%',
            width: 2,
            background:
              'linear-gradient(180deg, rgba(212,131,10,0.9), rgba(184,134,11,0.6))',
            borderRadius: 2,
            transformOrigin: 'center',
          }}
        />

        {/* Step number badge */}
        <motion.div
          animate={{
            background: isActive
              ? 'rgba(212,131,10,0.14)'
              : 'rgba(255,255,255,0.04)',
            borderColor: isActive
              ? 'rgba(212,131,10,0.30)'
              : 'rgba(255,255,255,0.08)',
            color: isActive
              ? 'rgba(212,131,10,0.92)'
              : 'rgba(255,255,255,0.28)',
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            border: '1px solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontStyle: 'italic',
            fontWeight: 400,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {step.number}
        </motion.div>

        {/* Title + duration */}
        <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
          <motion.p
            animate={{
              color: isActive ? 'var(--text)' : 'rgba(255,255,255,0.52)',
              x: isActive && !shouldReduce ? 1 : 0,
            }}
            transition={{ duration: 0.28 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.84rem',
              fontWeight: 400,
              lineHeight: 1.3,
              marginBottom: '0.22rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {step.title}
          </motion.p>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.65rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.01em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            {step.duration}
          </p>
        </div>

        {/* Active indicator arrow */}
        <motion.div
          animate={{
            opacity: isActive ? 0.6 : 0,
            x: isActive ? 0 : -6,
          }}
          transition={{ duration: 0.28 }}
          style={{
            color: 'rgba(212,131,10,0.75)',
            flexShrink: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Process Section
// ─────────────────────────────────────────────────────────────────────────────

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const navigate = (index: number) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const goNext = () => { if (activeIndex < steps.length - 1) navigate(activeIndex + 1) }
  const goPrev = () => { if (activeIndex > 0) navigate(activeIndex - 1) }

  return (
    <section
      ref={sectionRef}
      id="prozess"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric bloom — left side, warm */}
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
            'radial-gradient(ellipse at 35% 45%, rgba(184,134,11,0.08) 0%, rgba(212,131,10,0.04) 40%, transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>

        {/* ── Section header ── */}
        <div style={{ marginBottom: '3.5rem' }}>
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={
              shouldReduce
                ? undefined
                : isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '1.1rem', display: 'inline-block' }}
          >
            <span
              className="surface-floating"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.9rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--warm-amber)',
                  boxShadow: '0 0 8px rgba(212,131,10,0.6)',
                  flexShrink: 0,
                }}
              />
              Der Ablauf
            </span>
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="display-section"
              initial={shouldReduce ? undefined : { y: '108%' }}
              animate={
                shouldReduce
                  ? undefined
                  : isInView
                  ? { y: '0%' }
                  : { y: '108%' }
              }
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.07,
              }}
            >
              Kein Rätselraten. Kein Warten.
            </motion.h2>
          </div>
        </div>

        {/* ── Interactive step viewer ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]"
          style={{ gap: '1rem', alignItems: 'stretch' }}
        >
          {/* Featured panel */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 44 }}
            animate={
              shouldReduce
                ? undefined
                : isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 44 }
            }
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <FeaturedPanel
              step={steps[activeIndex]}
              index={activeIndex}
              direction={direction}
              onNext={goNext}
              onPrev={goPrev}
              onDotClick={navigate}
              total={steps.length}
              shouldReduce={shouldReduce}
            />
          </motion.div>

          {/* Step selectors */}
          <div
            className="grid grid-cols-2 lg:grid-cols-1"
            style={{ gap: '0.75rem', alignContent: 'start' }}
          >
            {steps.map((step, i) => (
              <StepSelectorCard
                key={step.number}
                step={step}
                index={i}
                isActive={i === activeIndex}
                onSelect={() => navigate(i)}
                shouldReduce={shouldReduce}
                entryDelay={0.22 + i * 0.08}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

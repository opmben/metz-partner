'use client'
import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { fadeUp, staggerContainer, clipRevealUp, blurIn } from '@/lib/animations'
import BorderGlow from '@/components/BorderGlow'

// ── Variants ──────────────────────────────────────────────────────────────────

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ── Data ──────────────────────────────────────────────────────────────────────

const founders = [
  {
    initial: 'B',
    name: 'Benedikt Metz',
    role: 'Head of UI/UX Design',
    bio: 'Hintergrund in Grafikdesign und Recht. Zuständig für alles, was man sieht — und dafür, dass es rechtlich stimmt.',
    accentColor: 'var(--accent)',
    initialColor: 'rgba(200,255,0,0.09)',
    glowBg: 'radial-gradient(ellipse at 25% 60%, rgba(200,255,0,0.055) 0%, transparent 62%)',
    borderHover: 'rgba(200,255,0,0.2)',
  },
  {
    initial: 'M',
    name: 'Maximilian Metz',
    role: 'Head of Marketing & Sales',
    bio: 'Hintergrund in Marketing und Finanzen. Zuständig für Strategie, Wirkung und dafür, dass Ihre Website konvertiert.',
    accentColor: 'var(--accent-warm)',
    initialColor: 'rgba(255,107,53,0.09)',
    glowBg: 'radial-gradient(ellipse at 25% 60%, rgba(255,107,53,0.055) 0%, transparent 62%)',
    borderHover: 'rgba(255,107,53,0.2)',
  },
]

const differentiators = [
  {
    number: '01',
    title: 'Direkt & persönlich',
    body: 'Sie haben immer eine direkte Ansprechperson, kein Ticketsystem, kein Wartezimmer, keine Vertretung. Sie werden zum Partner.',
  },
  {
    number: '02',
    title: 'Regional verankert',
    body: 'Wir kommen aus Koblenz. Wir kennen die Region, die lokalen Branchen und die typischen Anforderungen.',
  },
  {
    number: '03',
    title: 'Strategie bis Launch',
    body: 'Wir bauen nach Ihren Wünschen, strukturiert und systematisch. Ihr Input zählt.',
  },
]

// ── FounderCard ───────────────────────────────────────────────────────────────

function FounderCard({
  founder,
  shouldReduce,
}: {
  founder: (typeof founders)[0]
  shouldReduce: boolean | null
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={shouldReduce ? undefined : cardReveal}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // flex-col stacks on mobile, flex-row side-by-side on sm+
      className="flex flex-col sm:flex-row"
      style={{
        position: 'relative',
        background: 'var(--surface)',
        border: `1px solid ${hovered ? founder.borderHover : 'var(--border)'}`,
        borderRadius: 8,
        overflow: 'hidden',
        transition: 'border-color 0.35s ease',
        alignItems: 'stretch',
        height: '100%',
      }}
    >
      {/* Full-width accent top line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: founder.accentColor,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.35s ease',
          zIndex: 1,
        }}
      />

      {/* Atmospheric glow — anchored to initial side */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: founder.glowBg,
          pointerEvents: 'none',
        }}
      />

      {/* ── LEFT: Giant initial ───────────────────────────────────────────
          h-28 on mobile (horizontal accent band), full height on sm+.
          Width: 42% on sm+ so the initial dominates without crowding text.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        className="h-28 sm:h-auto sm:w-[42%] flex-shrink-0 relative flex items-center justify-center"
        style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)' }}
      >
        <motion.span
          animate={
            shouldReduce
              ? undefined
              : hovered
              ? { filter: 'brightness(1.9)', y: 0 }
              : { filter: 'brightness(1)', y: [0, -6, 0] }
          }
          transition={
            hovered
              ? { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }
              : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 9vw, 7.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1,
            color: founder.initialColor,
            userSelect: 'none',
            display: 'block',
            position: 'relative',
          }}
        >
          {founder.initial}
        </motion.span>
      </div>

      {/* ── RIGHT: Info ───────────────────────────────────────────────────
          flex: 1 fills remaining width on sm+.
          On mobile (flex-col) it becomes a full-width content block.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          padding: 'clamp(1.75rem, 3vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.6rem',
          minWidth: 0,
        }}
      >
        {/* Role */}
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.65rem',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: 'var(--muted)',
          }}
        >
          {founder.role}
        </p>

        {/* Name */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.45rem, 2.2vw, 1.9rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--text)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {founder.name}
        </h3>

        {/* Bio */}
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.875rem',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.8,
            marginTop: '0.2rem',
          }}
        >
          {founder.bio}
        </p>
      </div>
    </motion.div>
  )
}

// ── DifferentiatorCard ────────────────────────────────────────────────────────

function DifferentiatorCard({
  d,
  shouldReduce,
}: {
  d: (typeof differentiators)[0]
  shouldReduce: boolean | null
}) {
  return (
    <motion.div variants={shouldReduce ? undefined : fadeUp} style={{ height: '100%' }}>
      <BorderGlow
        backgroundColor="#0b0b0b"
        borderRadius={8}
        glowColor="73 100 50"
        glowRadius={55}
        glowIntensity={0.65}
        coneSpread={28}
        animated
        colors={['#C8FF00', '#a8d400', '#7a9900']}
        fillOpacity={0.06}
        className="h-full"
      >
          <div
            style={{
              padding: 'clamp(2rem, 3vw, 2.75rem)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
              borderRadius: 8,
            }}
          >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '0.06em',
              color: 'rgba(200,255,0,0.35)',
              marginBottom: '1.75rem',
            }}
          >
            {d.number}
          </p>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
              fontWeight: 400,
              color: 'var(--text)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: '1rem',
            }}
          >
            {d.title}
          </h4>
          <p
            style={{
              fontSize: '0.875rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.8,
            }}
          >
            {d.body}
          </p>
        </div>
      </BorderGlow>
    </motion.div>
  )
}

// ── WhyUs ─────────────────────────────────────────────────────────────────────

export function WhyUs() {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const { scrollYProgress } = useScroll({
    target: mounted ? sectionRef : undefined,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      ref={sectionRef}
      id="ueber-uns"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="md:py-32"
    >
      {/* Decorative background text */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-3%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1,
          color: 'rgba(240,237,232,0.015)',
          pointerEvents: 'none',
          userSelect: 'none',
          y: shouldReduce ? 0 : bgY,
        }}
      >
        M&P
      </motion.div>

      <div className="container-site" style={{ position: 'relative' }}>
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            style={{ marginBottom: '3.5rem', maxWidth: 720 }}
          >
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="display-section"
                variants={shouldReduce ? undefined : clipRevealUp}
                style={{ display: 'block' }}
              >
                Wenn Sie uns anfragen,{' '}
                <em style={{ color: 'var(--accent)' }}>sprechen Sie mit uns.</em>
              </motion.h2>
            </div>
            <motion.p
              variants={shouldReduce ? undefined : blurIn}
              style={{
                marginTop: '1.5rem',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.75,
                maxWidth: 560,
              }}
            >
              Nicht mit einem Account Manager. Nicht mit einem Junior. Mit den
              Menschen, die Ihre Website bauen — von der ersten Anfrage bis zum Launch.
            </motion.p>
          </motion.div>

          {/* Founder cards — stagger via parent container */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.15)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            style={{ marginBottom: '5rem' }}
          >
            {founders.map((founder) => (
              <FounderCard
                key={founder.name}
                founder={founder}
                shouldReduce={shouldReduce}
              />
            ))}
          </motion.div>

          {/* Differentiators */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.1)}
            style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {differentiators.map((d) => (
                <DifferentiatorCard key={d.number} d={d} shouldReduce={shouldReduce} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

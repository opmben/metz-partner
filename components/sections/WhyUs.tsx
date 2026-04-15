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

const photoReveal: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const glassSlide: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 },
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
    gradientFrom: 'rgba(200,255,0,0.08)',
    glowColor: 'rgba(200,255,0,0.06)',
    borderAccent: 'rgba(200,255,0,0.2)',
  },
  {
    initial: 'M',
    name: 'Maximilian Metz',
    role: 'Head of Marketing & Sales',
    bio: 'Hintergrund in Marketing und Finanzen. Zuständig für Strategie, Wirkung und dafür, dass Ihre Website konvertiert.',
    accentColor: 'var(--accent-warm)',
    gradientFrom: 'rgba(255,107,53,0.08)',
    glowColor: 'rgba(255,107,53,0.06)',
    borderAccent: 'rgba(255,107,53,0.2)',
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
  isInView,
  delay,
  shouldReduce,
}: {
  founder: (typeof founders)[0]
  isInView: boolean
  delay: number
  shouldReduce: boolean | null
}) {
  const [hovered, setHovered] = useState(false)
  const vis = shouldReduce ? 'visible' : isInView ? 'visible' : 'hidden'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Stack on mobile, side-by-side on sm+
      className="flex flex-col sm:flex-row sm:items-stretch"
      style={{ position: 'relative' }}
    >
      {/* ── Photo placeholder ──────────────────────────────────────────────
          Swap this div's contents for <Image fill className="object-cover">
          when real photos are available. No layout changes needed.
      ─────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={shouldReduce ? undefined : photoReveal}
        initial={shouldReduce ? undefined : 'hidden'}
        animate={shouldReduce ? undefined : vis}
        transition={shouldReduce ? undefined : { delay }}
        // Full-width short on mobile, fixed 260px tall on sm+
        className="w-full rounded-2xl overflow-hidden relative flex-shrink-0
                   h-52 sm:w-[260px] sm:h-auto"
        style={{
          background: `linear-gradient(150deg, ${founder.gradientFrom} 0%, var(--surface) 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {/* Subtle grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(240,237,232,0.025) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(240,237,232,0.025) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 40%, ${founder.glowColor}, transparent 70%)`,
          }}
        />

        {/* Animated initial */}
        <motion.span
          animate={
            shouldReduce
              ? undefined
              : hovered
              ? { scale: 1.06, color: 'rgba(240,237,232,0.15)' }
              : { scale: [1, 1.025, 1], color: 'rgba(240,237,232,0.07)', y: [0, -5, 0] }
          }
          transition={
            hovered
              ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{
            position: 'relative',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4.5rem, 10vw, 7rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {founder.initial}
        </motion.span>

        {/* Foto-folgt badge */}
        <div
          style={{
            position: 'relative',
            background: 'rgba(8,8,8,0.7)',
            border: '1px solid rgba(240,237,232,0.07)',
            borderRadius: 100,
            padding: '0.26rem 0.8rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.5rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'rgba(240,237,232,0.25)',
              whiteSpace: 'nowrap',
            }}
          >
            Foto folgt
          </span>
        </div>
      </motion.div>

      {/* ── Glass info card ─────────────────────────────────────────────────
          On sm+: -ml-16 creates the overlap, z-10 floats it above the photo
      ─────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={shouldReduce ? undefined : glassSlide}
        initial={shouldReduce ? undefined : 'hidden'}
        animate={shouldReduce ? undefined : vis}
        transition={shouldReduce ? undefined : { delay: delay + 0.2 }}
        className="relative z-10 flex-1 rounded-2xl
                   mt-3 sm:mt-0 sm:-ml-16"
        style={{
          background: 'rgba(12,12,12,0.9)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: `1px solid ${hovered ? founder.borderAccent : 'rgba(240,237,232,0.08)'}`,
          transition: 'border-color 0.35s ease',
          padding: 'clamp(1.75rem, 3vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.7rem',
        }}
      >
        {/* Accent top line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: founder.accentColor,
            borderRadius: '16px 16px 0 0',
            opacity: 0.7,
          }}
        />

        {/* Role */}
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.64rem',
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
            fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
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
            marginTop: '0.1rem',
            maxWidth: 400,
          }}
        >
          {founder.bio}
        </p>
      </motion.div>
    </div>
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
        borderRadius={14}
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
            style={{ marginBottom: '4rem', maxWidth: 720 }}
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

          {/* Founder cards — two-column grid at md+ */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ marginBottom: '5rem' }}
          >
            {founders.map((founder, i) => (
              <FounderCard
                key={founder.name}
                founder={founder}
                isInView={isInView}
                delay={i * 0.15}
                shouldReduce={shouldReduce}
              />
            ))}
          </div>

          {/* Differentiators */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.1)}
            style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem' }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
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

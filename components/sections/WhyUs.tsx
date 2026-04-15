'use client'
import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { fadeUp, staggerContainer, clipRevealUp, blurIn } from '@/lib/animations'
import BorderGlow from '@/components/BorderGlow'

const founders = [
  {
    initial: 'B',
    name: 'Benedikt Metz',
    role: 'Head of UI/UX Design',
    bio: 'Hintergrund in Grafikdesign und Recht. Zuständig für alles, was man sieht — und dafür, dass es rechtlich stimmt.',
    accentColor: 'var(--accent)',
    accentBg: 'rgba(200,255,0,0.06)',
    accentBorder: 'rgba(200,255,0,0.15)',
    glowColor: 'rgba(200,255,0,0.08)',
  },
  {
    initial: 'M',
    name: 'Maximilian Metz',
    role: 'Head of Marketing & Sales',
    bio: 'Hintergrund in Marketing und Finanzen. Zuständig für Strategie, Wirkung und dafür, dass Ihre Website konvertiert.',
    accentColor: 'var(--accent-warm)',
    accentBg: 'rgba(255,107,53,0.06)',
    accentBorder: 'rgba(255,107,53,0.15)',
    glowColor: 'rgba(255,107,53,0.06)',
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

function FounderCard({ founder }: { founder: (typeof founders)[0] }) {
  const [hovered, setHovered] = useState(false)
  const shouldReduce = useReducedMotion()
  const glowX = useMotionValue(0.5)
  const glowY = useMotionValue(0.5)
  const springX = useSpring(glowX, { stiffness: 150, damping: 20 })
  const springY = useSpring(glowY, { stiffness: 150, damping: 20 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    glowX.set((e.clientX - rect.left) / rect.width)
    glowY.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouse}
      animate={{ borderColor: hovered && !shouldReduce ? founder.accentBorder : 'rgba(240,237,232,0.07)' }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 6,
        border: '1px solid rgba(240,237,232,0.07)',
        background: 'rgba(17,17,17,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        position: 'relative',
        minHeight: 220,
      }}
    >
      {/* Accent top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: founder.accentColor,
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* ── Left panel: photo placeholder (swap for <Image> when ready) ── */}
      <div
        style={{
          width: 200,
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          borderRight: '1px solid rgba(240,237,232,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          background: `linear-gradient(150deg, ${founder.accentBg} 0%, rgba(8,8,8,0) 70%)`,
        }}
      >
        {/* Subtle grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(240,237,232,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.02) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Dynamic cursor glow */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '120%',
            height: '120%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${founder.glowColor}, transparent 65%)`,
            pointerEvents: 'none',
            left: springX,
            top: springY,
            translateX: '-50%',
            translateY: '-50%',
            filter: 'blur(30px)',
            opacity: hovered && !shouldReduce ? 1 : 0.4,
          }}
          transition={{ opacity: { duration: 0.4 } }}
        />

        {/* Initial */}
        <motion.span
          animate={
            shouldReduce
              ? undefined
              : hovered
              ? { scale: 1.08, color: 'rgba(240,237,232,0.14)' }
              : { scale: [1, 1.03, 1], color: 'rgba(240,237,232,0.07)', y: [0, -5, 0] }
          }
          transition={
            hovered
              ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{
            position: 'relative',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 8vw, 6rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {founder.initial}
        </motion.span>

        {/* "Foto folgt" badge */}
        <div
          style={{
            position: 'relative',
            background: 'rgba(8,8,8,0.75)',
            border: '1px solid rgba(240,237,232,0.08)',
            borderRadius: 100,
            padding: '0.25rem 0.75rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              fontSize: '0.52rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(240,237,232,0.28)',
              fontFamily: 'var(--font-ui)',
              whiteSpace: 'nowrap',
            }}
          >
            Foto folgt
          </span>
        </div>
      </div>

      {/* ── Right panel: info ── */}
      <div
        style={{
          padding: '2.25rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.55rem',
          flex: 1,
          minWidth: 0,
        }}
      >
        <p
          style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-ui)',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--muted)',
          }}
        >
          {founder.role}
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--text)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
        >
          {founder.name}
        </h3>

        <p
          style={{
            fontSize: '0.875rem',
            fontWeight: 300,
            fontFamily: 'var(--font-ui)',
            color: 'var(--muted)',
            lineHeight: 1.75,
            marginTop: '0.2rem',
            maxWidth: 400,
          }}
        >
          {founder.bio}
        </p>
      </div>
    </motion.div>
  )
}

function DifferentiatorCard({
  d,
  shouldReduce,
}: {
  d: (typeof differentiators)[0]
  shouldReduce: boolean | null
}) {
  return (
    <motion.div
      variants={shouldReduce ? undefined : fadeUp}
      style={{ height: '100%' }}
    >
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
            gap: 0,
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
              fontStyle: 'normal',
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
      {/* Background decorative text */}
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
          {/* Positioning statement */}
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
              Nicht mit einem Account Manager. Nicht mit einem Junior. Mit den Menschen, die
              Ihre Website bauen — von der ersten Anfrage bis zum Launch.
            </motion.p>
          </motion.div>

          {/* Founders */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.15)}
            style={{ marginBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {founders.map((founder) => (
              <motion.div key={founder.name} variants={shouldReduce ? undefined : fadeUp}>
                <FounderCard founder={founder} />
              </motion.div>
            ))}
          </motion.div>

          {/* Differentiators */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.1)}
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '4rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gap: '1rem',
              }}
              className="grid-cols-1 md:grid-cols-3"
            >
              {differentiators.map((d) => (
                <DifferentiatorCard
                  key={d.number}
                  d={d}
                  shouldReduce={shouldReduce}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

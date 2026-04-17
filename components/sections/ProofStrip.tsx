'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Zap, Clock, MapPin, Users } from 'lucide-react'

const signals = [
  {
    icon: Users,
    label: 'Direkt mit den Gründern',
    sub: 'Benedikt & Maximilian',
    iconColor: 'rgba(211,253,81,0.92)',
    iconBg: 'rgba(211,253,81,0.10)',
    iconBorder: 'rgba(211,253,81,0.24)',
    glowColor: 'rgba(211,253,81,0.14)',
  },
  {
    icon: Clock,
    label: 'Fertig in 2–4 Wochen',
    sub: 'Nicht in Monaten',
    iconColor: 'rgba(211,253,81,0.85)',
    iconBg: 'rgba(211,253,81,0.08)',
    iconBorder: 'rgba(211,253,81,0.20)',
    glowColor: 'rgba(211,253,81,0.12)',
  },
  {
    icon: Zap,
    label: 'Pagespeed 90+',
    sub: 'Mobiloptimiert & SEO-ready',
    iconColor: 'rgba(211,253,81,0.78)',
    iconBg: 'rgba(211,253,81,0.07)',
    iconBorder: 'rgba(211,253,81,0.18)',
    glowColor: 'rgba(211,253,81,0.10)',
  },
  {
    icon: MapPin,
    label: 'Aus Koblenz & Region',
    sub: 'Vor Ort, wenn Sie uns brauchen',
    iconColor: 'rgba(255,255,255,0.60)',
    iconBg: 'rgba(255,255,255,0.06)',
    iconBorder: 'rgba(255,255,255,0.12)',
    glowColor: 'rgba(255,255,255,0.06)',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
}

function SignalCard({
  signal,
  shouldReduce,
}: {
  signal: (typeof signals)[0]
  shouldReduce: boolean | null
}) {
  const [hovered, setHovered] = useState(false)
  const Icon = signal.icon

  return (
    <motion.div
      variants={shouldReduce ? undefined : cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="surface-secondary"
      animate={{
        borderColor: hovered
          ? 'rgba(255,255,255,0.17)'
          : 'rgba(255,255,255,0.09)',
        boxShadow: hovered
          ? `inset 0 1px 0 rgba(255,255,255,0.24), 0 20px 56px rgba(0,0,0,0.38), 0 0 52px ${signal.glowColor}`
          : 'inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 30px rgba(0,0,0,0.24), 0 0 0px transparent',
        y: hovered && !shouldReduce ? -4 : 0,
      }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: '1.75rem 1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.1rem',
        cursor: 'default',
        height: '100%',
      }}
    >
      {/* Hover atmosphere bloom */}
      <motion.div
        aria-hidden
        animate={{ opacity: hovered && !shouldReduce ? 1 : 0 }}
        transition={{ duration: 0.38 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 20% 25%, ${signal.glowColor}, transparent 68%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{
          scale: hovered && !shouldReduce ? 1.07 : 1,
          boxShadow: hovered
            ? `0 0 24px ${signal.glowColor}`
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 42,
          height: 42,
          borderRadius: 11,
          background: signal.iconBg,
          border: `1px solid ${signal.iconBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: signal.iconColor,
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Icon size={17} strokeWidth={1.5} />
      </motion.div>

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          animate={{ x: hovered && !shouldReduce ? 2 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.3,
            color: 'var(--text)',
            marginBottom: '0.3rem',
          }}
        >
          {signal.label}
        </motion.p>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.72rem',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.45,
          }}
        >
          {signal.sub}
        </p>
      </div>
    </motion.div>
  )
}

export function ProofStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      style={{
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient bloom behind cards */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '50vw',
          maxWidth: 1000,
          maxHeight: 600,
          background:
            'radial-gradient(ellipse at center, rgba(184,134,11,0.055) 0%, transparent 62%)',
          filter: 'blur(64px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>
        <motion.div
          ref={ref}
          variants={
            shouldReduce
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.09 } },
                }
          }
          initial={shouldReduce ? undefined : 'hidden'}
          animate={
            shouldReduce ? undefined : isInView ? 'visible' : 'hidden'
          }
          style={{ display: 'grid', gap: '1rem' }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {signals.map((s) => (
            <SignalCard key={s.label} signal={s} shouldReduce={shouldReduce} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

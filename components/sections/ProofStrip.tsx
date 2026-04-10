'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Zap, Clock, MapPin, Users } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'

const signals = [
  {
    icon: Users,
    label: 'Direkt mit den Gründern',
    sub: 'Benedikt & Maximilian',
    accent: 'var(--accent)',
    bg: 'rgba(200,255,0,0.07)',
    glowColor: 'rgba(200,255,0,0.12)',
  },
  {
    icon: Clock,
    label: 'Fertig in 2–4 Wochen',
    sub: 'Nicht in Monaten',
    accent: 'var(--accent-warm)',
    bg: 'rgba(255,107,53,0.07)',
    glowColor: 'rgba(255,107,53,0.1)',
  },
  {
    icon: Zap,
    label: 'Pagespeed 90+',
    sub: 'Mobiloptimiert & SEO-ready',
    accent: 'var(--accent)',
    bg: 'rgba(200,255,0,0.07)',
    glowColor: 'rgba(200,255,0,0.12)',
  },
  {
    icon: MapPin,
    label: 'Aus Koblenz & Region',
    sub: 'Vor Ort, wenn Sie uns brauchen',
    accent: 'rgba(240,237,232,0.6)',
    bg: 'rgba(240,237,232,0.04)',
    glowColor: 'rgba(240,237,232,0.06)',
  },
]

function SignalCard({
  signal,
  index,
  shouldReduce,
}: {
  signal: (typeof signals)[0]
  index: number
  shouldReduce: boolean | null
}) {
  const [hovered, setHovered] = useState(false)
  const Icon = signal.icon

  return (
    <motion.div
      variants={shouldReduce ? undefined : fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'relative',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Hover glow */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: hovered && !shouldReduce ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 30% 50%, ${signal.glowColor}, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Top accent line on hover */}
      <motion.div
        animate={{ scaleX: hovered && !shouldReduce ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: signal.accent,
          transformOrigin: 'left',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{
          scale: hovered && !shouldReduce ? 1.1 : 1,
          boxShadow: hovered
            ? `0 0 20px ${signal.glowColor}`
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          background: signal.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: signal.accent,
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <Icon size={16} />
      </motion.div>

      {/* Text */}
      <div style={{ position: 'relative' }}>
        <motion.p
          animate={{
            color: hovered ? 'var(--text)' : 'var(--text)',
            x: hovered && !shouldReduce ? 2 : 0,
          }}
          transition={{ duration: 0.25 }}
          style={{
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.3,
            marginBottom: '0.2rem',
          }}
        >
          {signal.label}
        </motion.p>
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.4,
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
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        position: 'relative',
      }}
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.07)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gap: '1px',
            background: 'var(--border)',
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {signals.map((s, i) => (
            <div key={s.label} style={{ background: 'var(--surface)' }}>
              <SignalCard signal={s} index={i} shouldReduce={shouldReduce} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

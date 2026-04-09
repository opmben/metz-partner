'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Zap, Clock, MapPin, Users } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'

const signals = [
  {
    icon: Users,
    label: 'Direkt mit den Gründern',
    sub: 'Benedikt & Maximilian',
    color: 'var(--accent)',
    bg: 'rgba(200,255,0,0.07)',
    borderRight: true,
    mobileBottomBorder: true,
  },
  {
    icon: Clock,
    label: 'Fertig in 2–4 Wochen',
    sub: 'Nicht in Monaten',
    color: 'var(--accent-warm)',
    bg: 'rgba(255,107,53,0.07)',
    borderRight: false,
    mobileBottomBorder: true,
  },
  {
    icon: Zap,
    label: 'Pagespeed 90+',
    sub: 'Mobiloptimiert & SEO-ready',
    color: 'var(--accent)',
    bg: 'rgba(200,255,0,0.07)',
    borderRight: true,
    mobileBottomBorder: false,
  },
  {
    icon: MapPin,
    label: 'Aus Koblenz & Region',
    sub: 'Vor Ort, wenn Sie uns brauchen',
    color: 'rgba(240,237,232,0.5)',
    bg: 'rgba(240,237,232,0.04)',
    borderRight: false,
    mobileBottomBorder: false,
  },
]

export function ProofStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.07)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
          style={{ display: 'grid' }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {signals.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                variants={shouldReduce ? undefined : fadeUp}
                style={{
                  padding: '1.75rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderRight: s.borderRight ? '1px solid var(--border)' : undefined,
                  borderBottom: s.mobileBottomBorder ? '1px solid var(--border)' : undefined,
                }}
                className={[
                  // On md: restore right borders for first 3, remove bottom borders
                  i === 1 ? 'md:border-r md:border-b-0' : '',
                  i === 2 ? 'md:border-b-0' : '',
                  i === 3 ? 'md:border-b-0' : '',
                ].join(' ')}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: s.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: s.color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      color: 'var(--text)',
                      lineHeight: 1.3,
                      marginBottom: '0.2rem',
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 300,
                      color: 'var(--muted)',
                      lineHeight: 1.4,
                    }}
                  >
                    {s.sub}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

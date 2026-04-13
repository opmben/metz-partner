'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { stats } from '@/lib/data/stats'

export function StatsStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  // Only render when all stats have non-empty values
  const allDefined = stats.every((s) => s.value !== '' && s.value !== '0')
  if (!allDefined) return null

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        paddingTop: '3rem',
        paddingBottom: '3rem',
      }}
    >
      <div className="container-site">
        {/* Label */}
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : fadeUp}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '2.5rem' }}
        >
          <SectionLabel>Zahlen</SectionLabel>
        </motion.div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={shouldReduce ? undefined : fadeUp}
              initial={shouldReduce ? undefined : 'hidden'}
              animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '2.5rem 3rem',
                borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
              }}
              className={`${i < 2 ? 'border-b md:border-b-0' : ''}`}
            >
              {/* Stat number + suffix */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.8rem',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1,
                  color: 'var(--text)',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {stat.value}
                {stat.suffix && (
                  <span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
                )}
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

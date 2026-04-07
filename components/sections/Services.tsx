'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { services } from '@/lib/data/services'

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--surface-2)' : 'var(--bg)',
        border: '1px solid var(--border)',
        borderTop: 'none',
        padding: '3rem 2.5rem',
        position: 'relative',
        transition: 'background 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Animated top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'var(--accent)',
          transformOrigin: 'left',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Number — decorative */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '4rem',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(240,237,232,0.06)',
          lineHeight: 1,
          marginBottom: '1.5rem',
          userSelect: 'none',
        }}
      >
        {service.number}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--text)',
          marginBottom: '1rem',
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          fontWeight: 300,
          color: 'var(--muted)',
          lineHeight: 1.75,
        }}
      >
        {service.body}
      </p>
    </div>
  )
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="leistungen"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        background: 'var(--surface)',
      }}
      className="md:py-32"
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp} style={{ marginBottom: '1.25rem' }}>
            <SectionLabel>Leistungen</SectionLabel>
          </motion.div>
          <motion.h2
            className="display-section"
            variants={shouldReduce ? undefined : fadeUp}
            style={{ marginBottom: '3rem' }}
          >
            Was wir für Sie bauen.
          </motion.h2>

          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.1)}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '0',
              border: '1px solid var(--border)',
            }}
            className="md:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div key={service.number} variants={shouldReduce ? undefined : fadeUp}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

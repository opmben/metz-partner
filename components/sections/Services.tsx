'use client'
import { useRef, useState, useCallback } from 'react'
import { motion, useInView, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { fadeUp, staggerContainer, clipRevealUp } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { services } from '@/lib/data/services'

/* ── 3D tilt card with cursor glow ── */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  // Cursor glow position
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)

  // 3D tilt values
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduce || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      glowX.set(x)
      glowY.set(y)

      // Tilt: max ±6deg
      rotateX.set(((y - centerY) / centerY) * -6)
      rotateY.set(((x - centerX) / centerX) * 6)
    },
    [shouldReduce, glowX, glowY, rotateX, rotateY],
  )

  const handleLeave = () => {
    setHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        background: hovered ? 'var(--surface)' : 'var(--bg)',
        padding: 'clamp(2rem, 3vw, 3rem) clamp(1.5rem, 2.5vw, 2.5rem)',
        transition: 'background 0.4s ease',
        cursor: 'default',
        perspective: 800,
        transformStyle: 'preserve-3d',
        rotateX: shouldReduce ? 0 : springRotateX,
        rotateY: shouldReduce ? 0 : springRotateY,
        overflow: 'hidden',
      }}
    >
      {/* Animated top accent line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--accent)',
          transformOrigin: 'left',
          scaleX: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Cursor-following glow */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.06), transparent 70%)',
          pointerEvents: 'none',
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hovered ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* Number — large decorative */}
      <motion.div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 5vw, 4.5rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1,
          marginBottom: '1.5rem',
          userSelect: 'none',
          color: hovered ? 'var(--accent)' : 'rgba(240,237,232,0.04)',
        }}
        transition={{ duration: 0.4 }}
      >
        {service.number}
      </motion.div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 1.8vw, 1.4rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--text)',
          marginBottom: '1rem',
          lineHeight: 1.2,
          position: 'relative',
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
          marginBottom: '1.75rem',
          position: 'relative',
        }}
      >
        {service.body}
      </p>

      {/* Deliverables with staggered reveal on hover */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          position: 'relative',
        }}
      >
        {service.deliverables.map((item, i) => (
          <motion.li
            key={item}
            initial={false}
            animate={{
              x: hovered && !shouldReduce ? 0 : -4,
              opacity: hovered ? 0.8 : 0.45,
            }}
            transition={{
              duration: 0.35,
              delay: hovered ? i * 0.04 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.65rem',
              fontSize: '0.8rem',
              fontWeight: 300,
              color: 'var(--text)',
              lineHeight: 1.5,
            }}
          >
            <motion.span
              animate={{
                background: hovered ? 'var(--accent)' : 'rgba(200,255,0,0.4)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'block',
                width: 5,
                height: 5,
                borderRadius: '50%',
                flexShrink: 0,
                marginTop: '0.35em',
              }}
            />
            {item}
          </motion.li>
        ))}
      </ul>

      {/* Bottom index — appears on hover */}
      <motion.div
        animate={{ opacity: hovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          fontSize: '0.6rem',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--muted)',
          fontFamily: 'var(--font-ui)',
        }}
      >
        0{index + 1} / 03
      </motion.div>
    </motion.div>
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
        position: 'relative',
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

          {/* Headline with clip reveal */}
          <div style={{ overflow: 'hidden', marginBottom: '3.5rem' }}>
            <motion.h2
              className="display-section"
              variants={shouldReduce ? undefined : clipRevealUp}
            >
              Was wir für Sie bauen.
            </motion.h2>
          </div>

          {/* Cards grid with visible separators */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.12)}
            style={{
              display: 'grid',
              gap: '1px',
              background: 'var(--border)',
            }}
            className="grid-cols-1 md:grid-cols-3"
          >
            {services.map((service, i) => (
              <motion.div key={service.number} variants={shouldReduce ? undefined : fadeUp}>
                <ServiceCard service={service} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

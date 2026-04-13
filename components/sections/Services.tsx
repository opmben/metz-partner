'use client'
import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  AnimatePresence,
} from 'framer-motion'
import { fadeUp, staggerContainer, clipRevealUp } from '@/lib/animations'
import { services } from '@/lib/data/services'
import { SectionLabel } from '@/components/shared/SectionLabel'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ── Pill component ── */
function Pill({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
        borderRadius: 100,
        padding: '0.3rem 0.9rem',
        fontSize: '0.72rem',
        fontFamily: 'var(--font-ui)',
        fontWeight: 400,
        letterSpacing: '0.08em',
        color: hovered ? 'var(--text)' : 'var(--muted)',
        transition: 'border-color 0.2s ease, color 0.2s ease',
        cursor: 'default',
      }}
    >
      {label}
    </span>
  )
}

/* ── Minimal SVG placeholder (per service) ── */
function ServicePlaceholder({ index, active }: { index: number; active: boolean }) {
  const s = active ? 'rgba(240,237,232,0.22)' : 'rgba(240,237,232,0.1)'
  const a = active ? 'rgba(200,255,0,0.8)' : 'rgba(200,255,0,0.45)'
  const f = active ? 'rgba(200,255,0,0.18)' : 'rgba(200,255,0,0.08)'

  if (index === 0) {
    // Browser window
    return (
      <svg viewBox="0 0 240 160" fill="none" style={{ width: '100%', height: '100%' }} aria-hidden="true">
        <motion.rect x="1" y="1" width="238" height="158" rx="8" stroke={s} strokeWidth="1"
          animate={{ opacity: active ? 1 : 0.5 }} transition={{ duration: 0.6 }} />
        <motion.line x1="1" y1="28" x2="239" y2="28" stroke={s} strokeWidth="1"
          animate={{ opacity: active ? 1 : 0.4 }} />
        {[14, 24, 34].map((cx, i) => (
          <motion.circle key={cx} cx={cx} cy={15} r={4}
            fill={['rgba(255,95,87,0.7)','rgba(255,189,68,0.7)','rgba(40,200,64,0.7)'][i]}
            animate={{ opacity: active ? 1 : 0.5 }} transition={{ duration: 0.6, delay: i * 0.05 }} />
        ))}
        <motion.rect x="48" y="8" width="144" height="13" rx="6"
          stroke={s} strokeWidth="1" fill="rgba(240,237,232,0.03)"
          animate={{ opacity: active ? 1 : 0.4 }} />
        {[{ y: 48, w: 160, h: 10 }, { y: 64, w: 120, h: 8 }, { y: 78, w: 80, h: 7 }].map(({ y, w, h }, i) => (
          <motion.rect key={y} x="16" y={y} width={w} height={h} rx="2"
            fill={`rgba(240,237,232,${0.18 - i * 0.04})`}
            animate={{ opacity: active ? 1 : 0.4, scaleX: active ? 1 : 0.7 }}
            style={{ transformOrigin: '16px center' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }} />
        ))}
        <motion.rect x="16" y="98" width="60" height="16" rx="8"
          fill={f} stroke={a} strokeWidth="0.75"
          animate={{ opacity: active ? 1 : 0.4, scale: active ? 1 : 0.9 }}
          style={{ transformOrigin: '46px 106px' }}
          transition={{ duration: 0.5, ease: EASE }} />
        {[16, 92, 168].map((x, i) => (
          <motion.rect key={x} x={x} y="126" width="62" height="28" rx="3"
            fill="rgba(240,237,232,0.04)" stroke={s} strokeWidth="0.5"
            animate={{ opacity: active ? 1 : 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }} />
        ))}
      </svg>
    )
  }

  if (index === 1) {
    // Sitemap / architecture
    const root = { x: 95, y: 12, w: 50, h: 20 }
    const children = [
      { x: 12, y: 70, w: 50, h: 18 },
      { x: 95, y: 70, w: 50, h: 18 },
      { x: 178, y: 70, w: 50, h: 18 },
    ]
    const rx = root.x + root.w / 2
    const rb = root.y + root.h
    return (
      <svg viewBox="0 0 240 160" fill="none" style={{ width: '100%', height: '100%' }} aria-hidden="true">
        <motion.rect x={root.x} y={root.y} width={root.w} height={root.h} rx="4"
          fill={f} stroke={a} strokeWidth="1"
          animate={{ opacity: active ? 1 : 0.5, scale: active ? 1 : 0.95 }}
          style={{ transformOrigin: `${root.x + root.w / 2}px ${root.y + root.h / 2}px` }}
          transition={{ duration: 0.6 }} />
        <motion.circle cx={rx} cy={root.y + root.h / 2} r={3} fill={a}
          animate={active ? { scale: [1, 1.8, 1], opacity: [0.9, 0.2, 0.9] } : { opacity: 0.4 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
        {children.map((c, i) => {
          const ccx = c.x + c.w / 2
          const mid = (rb + c.y) / 2
          return (
            <g key={i}>
              <motion.path d={`M ${rx},${rb} C ${rx},${mid} ${ccx},${mid} ${ccx},${c.y}`}
                stroke={i === 1 ? a : s} strokeWidth={i === 1 ? 1 : 0.75}
                animate={{ opacity: active ? 1 : 0.4, pathLength: active ? 1 : 0.5 }}
                initial={{ pathLength: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.08 }} />
              <motion.rect x={c.x} y={c.y} width={c.w} height={c.h} rx="3"
                fill={i === 1 ? f : 'rgba(240,237,232,0.03)'}
                stroke={i === 1 ? a : s} strokeWidth={i === 1 ? 1 : 0.75}
                animate={{ opacity: active ? 1 : 0.4 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }} />
              <motion.rect x={c.x + 8} y={c.y + 7} width={c.w - 16} height={4} rx="2"
                fill={i === 1 ? a : s}
                animate={{ opacity: active ? (i === 1 ? 0.85 : 0.45) : 0.25, scaleX: active ? 1 : 0.6 }}
                style={{ transformOrigin: `${c.x + 8}px center` }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }} />
            </g>
          )
        })}
        {/* Sub nodes */}
        {[
          { x: 4, y: 128 }, { x: 60, y: 128 },
          { x: 168, y: 128 }, { x: 212, y: 128 },
        ].map((sub, i) => (
          <motion.rect key={i} x={sub.x} y={sub.y} width={34} height={14} rx="3"
            fill="rgba(240,237,232,0.04)" stroke={s} strokeWidth="0.5"
            animate={{ opacity: active ? 0.7 : 0.3 }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.06 }} />
        ))}
      </svg>
    )
  }

  // index === 2: Deploy pipeline
  const steps = [
    { y: 62, w: 88, accent: false },
    { y: 88, w: 72, accent: false },
    { y: 114, w: 80, accent: false },
    { y: 140, w: 36, accent: true },
  ]
  return (
    <svg viewBox="0 0 240 160" fill="none" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <motion.rect x="1" y="1" width="238" height="158" rx="8" stroke={s} strokeWidth="1"
        animate={{ opacity: active ? 1 : 0.5 }} />
      <motion.line x1="1" y1="28" x2="239" y2="28" stroke={s} strokeWidth="1" />
      {[14, 24, 34].map((cx, i) => (
        <motion.circle key={cx} cx={cx} cy={15} r={4}
          fill={['rgba(255,95,87,0.7)','rgba(255,189,68,0.7)','rgba(40,200,64,0.7)'][i]}
          animate={{ opacity: active ? 1 : 0.5 }} />
      ))}
      <motion.rect x="12" y="38" width="190" height="6" rx="3"
        fill="rgba(240,237,232,0.04)"
        animate={{ opacity: active ? 1 : 0.4 }} />
      <motion.rect x="12" y="38" width="190" height="6" rx="3"
        fill={a}
        animate={{ scaleX: active ? 0.95 : 0.4, opacity: active ? 1 : 0.3 }}
        style={{ transformOrigin: '12px 41px' }}
        transition={{ duration: 0.9, ease: EASE }} />
      {steps.map((step, i) => (
        <g key={step.y}>
          {i < steps.length - 1 && (
            <motion.line x1={20} y1={step.y + 8} x2={20} y2={steps[i + 1].y - 8}
              stroke={s} strokeWidth="0.75" strokeDasharray="2 2"
              animate={{ opacity: active ? 0.6 : 0.2 }} />
          )}
          <motion.circle cx={20} cy={step.y} r={7}
            fill={step.accent ? f : 'rgba(240,237,232,0.04)'}
            stroke={step.accent ? a : s} strokeWidth="0.85"
            animate={{ opacity: active ? 1 : 0.4, scale: active ? 1 : 0.9 }}
            style={{ transformOrigin: `20px ${step.y}px` }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }} />
          <motion.path d={`M ${14},${step.y} L ${18},${step.y + 4} L ${26},${step.y - 5}`}
            stroke={step.accent ? a : s} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            animate={{ pathLength: active ? 1 : 0.5, opacity: active ? 1 : 0.4 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} />
          <motion.rect x={34} y={step.y - 3} width={step.w} height={5} rx="2"
            fill={step.accent ? a : s}
            animate={{ opacity: active ? (step.accent ? 0.9 : 0.5) : 0.2, scaleX: active ? 1 : 0.5 }}
            style={{ transformOrigin: '34px center' }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }} />
        </g>
      ))}
      <motion.circle cx={68} cy={140} r={4}
        fill={a}
        animate={active ? { scale: [1, 1.7, 1], opacity: [0.9, 0.2, 0.9] } : { opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
    </svg>
  )
}

/* ── Service content (right side) ── */
function ServiceBlock({
  service,
  index,
  active,
  shouldReduce,
  isMobile,
}: {
  service: (typeof services)[0]
  index: number
  active: boolean
  shouldReduce: boolean | null
  isMobile: boolean
}) {
  return (
    <motion.div
      style={{
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '4rem 0' : '0 0 0 5rem',
        borderBottom: index < services.length - 1 ? '1px solid var(--border)' : 'none',
        opacity: isMobile ? 1 : active ? 1 : 0.35,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Mobile: illustration above content */}
      {isMobile && (
        <div
          style={{
            width: 220,
            height: 140,
            marginBottom: '2rem',
          }}
        >
          <ServicePlaceholder index={index} active />
        </div>
      )}

      {/* Number */}
      <motion.div
        animate={{
          color: active && !isMobile ? 'var(--accent)' : 'rgba(240,237,232,0.12)',
        }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 5vw, 4.5rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1,
          marginBottom: '1.5rem',
          userSelect: 'none',
        }}
      >
        {service.number}
      </motion.div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--text)',
          lineHeight: 1.15,
          marginBottom: '1.25rem',
          letterSpacing: '-0.01em',
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '1rem',
          fontWeight: 300,
          color: 'var(--muted)',
          lineHeight: 1.8,
          maxWidth: 480,
          marginBottom: '2rem',
          fontFamily: 'var(--font-ui)',
        }}
      >
        {service.description}
      </p>

      {/* Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {service.pills.map((pill) => (
          <Pill key={pill} label={pill} />
        ))}
      </div>
    </motion.div>
  )
}

/* ── Services section ── */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    if (isMobile || shouldReduce) return
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * services.length), services.length - 1)
      setActiveIndex(idx)
    })
  }, [scrollYProgress, isMobile, shouldReduce])

  return (
    <section
      ref={sectionRef}
      id="leistungen"
      style={{
        paddingTop: '5rem',
        paddingBottom: isMobile ? '5rem' : 0,
        position: 'relative',
      }}
      className="md:pt-32"
    >
      {/* Section header — always visible, above the sticky area */}
      <div className="container-site">
        <motion.div
          ref={headerRef}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isHeaderInView ? 'visible' : 'hidden'}
          style={{ marginBottom: isMobile ? '3rem' : '4rem' }}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp}>
            <SectionLabel>Leistungen</SectionLabel>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="display-section"
              variants={shouldReduce ? undefined : clipRevealUp}
            >
              Was wir für Sie bauen.
            </motion.h2>
          </div>
        </motion.div>
      </div>

      {isMobile ? (
        /* ── Mobile: stacked layout ── */
        <div className="container-site">
          {services.map((service, i) => (
            <ServiceBlock
              key={service.number}
              service={service}
              index={i}
              active
              shouldReduce={shouldReduce}
              isMobile
            />
          ))}
        </div>
      ) : (
        /* ── Desktop: sticky-scroll split ── */
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            minHeight: `${services.length * 100}vh`,
            paddingLeft: 'clamp(1.5rem, 4rem, 4rem)',
            paddingRight: 'clamp(1.5rem, 4rem, 4rem)',
            maxWidth: 1400,
            margin: '0 auto',
          }}
        >
          {/* Left sticky image panel */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              width: '42%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '3rem',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={shouldReduce ? undefined : { opacity: 0, y: 20, scale: 0.97 }}
                animate={shouldReduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduce ? undefined : { opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.55, ease: EASE }}
                style={{
                  width: '100%',
                  maxWidth: 420,
                  aspectRatio: '3/2',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: 'var(--surface)',
                  padding: '1.5rem',
                  position: 'relative',
                }}
              >
                {/* Accent top line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'var(--accent)',
                    boxShadow: '0 0 12px rgba(200,255,0,0.4)',
                  }}
                />
                <ServicePlaceholder index={activeIndex} active />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right scrollable service blocks */}
          <div style={{ flex: 1 }}>
            {services.map((service, i) => (
              <ServiceBlock
                key={service.number}
                service={service}
                index={i}
                active={i === activeIndex}
                shouldReduce={shouldReduce}
                isMobile={false}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

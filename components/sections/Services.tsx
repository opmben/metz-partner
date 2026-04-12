'use client'
import { useRef, useState, useCallback } from 'react'
import { motion, useInView, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { fadeUp, staggerContainer, clipRevealUp } from '@/lib/animations'
import { services } from '@/lib/data/services'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface IllustrationProps {
  inView: boolean
  hovered: boolean
  shouldReduce: boolean | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Illustration 01 — Browser Build
// ─────────────────────────────────────────────────────────────────────────────
function BrowserIllustration({ inView, hovered, shouldReduce }: IllustrationProps) {
  const go = inView && !shouldReduce

  const sBase  = hovered ? 'rgba(240,237,232,0.22)' : 'rgba(240,237,232,0.10)'
  const sAccent = hovered ? 'rgba(200,255,0,0.90)'  : 'rgba(200,255,0,0.55)'
  const fDim   = hovered ? 'rgba(240,237,232,0.11)' : 'rgba(240,237,232,0.055)'
  const fAccent = hovered ? 'rgba(200,255,0,0.22)'  : 'rgba(200,255,0,0.10)'

  const t = (dur: number, delay: number) => ({
    duration: dur, delay: go ? delay : 0, ease: EASE,
  })

  return (
    <svg viewBox="0 0 260 164" fill="none" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      {/* Outer browser frame */}
      <motion.path
        d="M8,1 H252 Q259,1 259,8 V156 Q259,163 252,163 H8 Q1,163 1,156 V8 Q1,1 8,1 Z"
        stroke={sBase} strokeWidth={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(0.9, 0)}
      />

      {/* Chrome divider */}
      <motion.line x1="1" y1="30" x2="259" y2="30"
        stroke={sBase} strokeWidth={1}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: 'left center' }}
        transition={t(0.45, 0.72)}
      />

      {/* Traffic lights */}
      {([14, 26, 38] as const).map((cx, i) => (
        <motion.circle key={cx} cx={cx} cy={16} r={4.5}
          fill={['rgba(255,95,87,0.75)', 'rgba(255,189,68,0.75)', 'rgba(40,200,64,0.75)'][i]}
          initial={{ scale: 0, opacity: 0 }}
          animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          style={{ transformOrigin: `${cx}px 16px` }}
          transition={t(0.28, 0.52 + i * 0.07)}
        />
      ))}

      {/* URL bar */}
      <motion.rect x="52" y="9" width="148" height="14" rx="7"
        stroke={sBase} strokeWidth={1} fill={fDim}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: '52px 16px' }}
        transition={t(0.38, 0.82)}
      />

      {/* Blinking cursor in URL bar */}
      <motion.rect x="68" y="12" width="1.5" height="10"
        fill={sAccent}
        animate={go ? { opacity: [1, 0, 1, 0, 1] } : { opacity: 0 }}
        transition={{ duration: 1.4, repeat: Infinity, delay: 2.4, ease: 'linear' }}
      />

      {/* Nav: logo block */}
      <motion.rect x="10" y="37" width="34" height="7" rx="2"
        fill={fAccent} stroke={sAccent} strokeWidth={0.5}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: '10px 40px' }}
        transition={t(0.28, 1.0)}
      />
      {/* Nav: links */}
      {([{ x: 58, w: 22 }, { x: 86, w: 18 }, { x: 110, w: 20 }, { x: 136, w: 24 }]).map(({ x, w }, i) => (
        <motion.rect key={x} x={x} y="39" width={w} height="5" rx="2"
          fill={fDim}
          initial={{ opacity: 0 }}
          animate={go ? { opacity: 1 } : { opacity: 0 }}
          transition={t(0.22, 1.06 + i * 0.05)}
        />
      ))}
      {/* Nav CTA */}
      <motion.rect x="203" y="35" width="46" height="13" rx="7"
        fill={fAccent} stroke={sAccent} strokeWidth={0.75}
        initial={{ scale: 0, opacity: 0 }}
        animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        style={{ transformOrigin: '226px 41px' }}
        transition={t(0.28, 1.18)}
      />

      {/* Hero headline blocks */}
      {([{ y: 58, w: 178, h: 9 }, { y: 72, w: 138, h: 8 }, { y: 86, w: 100, h: 7 }]).map(({ y, w, h }, i) => (
        <motion.rect key={y} x="10" y={y} width={w} height={h} rx="2"
          fill={i === 0 ? 'rgba(240,237,232,0.18)' : 'rgba(240,237,232,0.10)'}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          style={{ transformOrigin: '10px center' }}
          transition={t(0.38, 1.22 + i * 0.10)}
        />
      ))}

      {/* Hero CTA pill */}
      <motion.rect x="10" y="102" width="62" height="16" rx="8"
        fill={fAccent} stroke={sAccent} strokeWidth={0.75}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: '10px 110px' }}
        transition={t(0.32, 1.54)}
      />

      {/* Three content cards */}
      {([10, 98, 186]).map((x, i) => (
        <motion.rect key={x} x={x} y="128" width="68" height="30" rx="3"
          fill={fDim} stroke={sBase} strokeWidth={0.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          style={{ transformOrigin: `${x + 34}px 143px` }}
          transition={t(0.30, 1.68 + i * 0.10)}
        />
      ))}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Illustration 02 — Sitemap Architecture
// ─────────────────────────────────────────────────────────────────────────────
function SitemapIllustration({ inView, hovered, shouldReduce }: IllustrationProps) {
  const go = inView && !shouldReduce

  const sBase   = hovered ? 'rgba(240,237,232,0.22)' : 'rgba(240,237,232,0.10)'
  const sAccent = hovered ? 'rgba(200,255,0,0.90)'   : 'rgba(200,255,0,0.55)'
  const fDim    = hovered ? 'rgba(240,237,232,0.11)'  : 'rgba(240,237,232,0.055)'
  const fAccent = hovered ? 'rgba(200,255,0,0.22)'   : 'rgba(200,255,0,0.10)'

  const t = (dur: number, delay: number) => ({
    duration: dur, delay: go ? delay : 0, ease: EASE,
  })

  const root = { x: 105, y: 10, w: 50, h: 20 }
  const rx = root.x + root.w / 2
  const rb = root.y + root.h

  const children = [
    { x: 18,  y: 70, w: 50, h: 18 },
    { x: 105, y: 70, w: 50, h: 18 },
    { x: 192, y: 70, w: 50, h: 18 },
  ]
  const subs = [
    { x: 4,   y: 130, w: 36, h: 14 },
    { x: 46,  y: 130, w: 36, h: 14 },
    { x: 188, y: 130, w: 36, h: 14 },
    { x: 230, y: 130, w: 36, h: 14 },
  ]

  return (
    <svg viewBox="0 0 260 164" fill="none" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      {/* Root node */}
      <motion.rect x={root.x} y={root.y} width={root.w} height={root.h} rx="4"
        fill={fAccent} stroke={sAccent} strokeWidth={1}
        initial={{ scale: 0, opacity: 0 }}
        animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        style={{ transformOrigin: `${root.x + root.w / 2}px ${root.y + root.h / 2}px` }}
        transition={t(0.32, 0.1)}
      />
      {/* Root label */}
      <motion.rect x={root.x + 10} y={root.y + 7} width={root.w - 20} height={5} rx="2"
        fill={sAccent}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={go ? { scaleX: 1, opacity: 0.8 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: `${root.x + 10}px ${root.y + 9}px` }}
        transition={t(0.25, 0.35)}
      />

      {/* Root pulsing dot */}
      <motion.circle cx={rx} cy={root.y + root.h / 2} r={3}
        fill={sAccent}
        animate={go ? { scale: [1, 1.8, 1], opacity: [0.9, 0.2, 0.9] } : { opacity: 0 }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 1.8, ease: 'easeInOut' }}
      />

      {/* Root → children bezier lines */}
      {children.map((c, i) => {
        const cx = c.x + c.w / 2
        const mid = (rb + c.y) / 2
        return (
          <motion.path key={i}
            d={`M ${rx},${rb} C ${rx},${mid} ${cx},${mid} ${cx},${c.y}`}
            stroke={i === 1 ? sAccent : sBase}
            strokeWidth={i === 1 ? 1 : 0.75}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={t(0.42, 0.4 + i * 0.09)}
          />
        )
      })}

      {/* Child nodes */}
      {children.map((c, i) => (
        <motion.rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} rx="3"
          fill={i === 1 ? fAccent : fDim}
          stroke={i === 1 ? sAccent : sBase}
          strokeWidth={i === 1 ? 1 : 0.75}
          initial={{ scale: 0, opacity: 0 }}
          animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          style={{ transformOrigin: `${c.x + c.w / 2}px ${c.y + c.h / 2}px` }}
          transition={t(0.28, 0.65 + i * 0.09)}
        />
      ))}
      {/* Child label bars */}
      {children.map((c, i) => (
        <motion.rect key={`lbl-${i}`}
          x={c.x + 8} y={c.y + 6} width={c.w - 16} height={4} rx="2"
          fill={i === 1 ? sAccent : sBase}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={go ? { scaleX: 1, opacity: i === 1 ? 0.8 : 0.45 } : { scaleX: 0, opacity: 0 }}
          style={{ transformOrigin: `${c.x + 8}px ${c.y + 8}px` }}
          transition={t(0.24, 0.80 + i * 0.09)}
        />
      ))}

      {/* Children[0] → subs 0,1 */}
      {[subs[0], subs[1]].map((s, i) => {
        const c = children[0]
        const ccx = c.x + c.w / 2
        const cb  = c.y + c.h
        const scx = s.x + s.w / 2
        const mid = (cb + s.y) / 2
        return (
          <motion.path key={`la-${i}`}
            d={`M ${ccx},${cb} C ${ccx},${mid} ${scx},${mid} ${scx},${s.y}`}
            stroke={sBase} strokeWidth={0.6}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={t(0.30, 0.90 + i * 0.07)}
          />
        )
      })}

      {/* Children[2] → subs 2,3 */}
      {[subs[2], subs[3]].map((s, i) => {
        const c = children[2]
        const ccx = c.x + c.w / 2
        const cb  = c.y + c.h
        const scx = s.x + s.w / 2
        const mid = (cb + s.y) / 2
        return (
          <motion.path key={`lc-${i}`}
            d={`M ${ccx},${cb} C ${ccx},${mid} ${scx},${mid} ${scx},${s.y}`}
            stroke={sBase} strokeWidth={0.6}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={t(0.30, 0.93 + i * 0.07)}
          />
        )
      })}

      {/* Sub nodes */}
      {subs.map((s, i) => (
        <motion.rect key={`sub-${i}`} x={s.x} y={s.y} width={s.w} height={s.h} rx="3"
          fill={fDim} stroke={sBase} strokeWidth={0.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          style={{ transformOrigin: `${s.x + s.w / 2}px ${s.y + s.h / 2}px` }}
          transition={t(0.22, 1.02 + i * 0.07)}
        />
      ))}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Illustration 03 — Deployment Pipeline
// ─────────────────────────────────────────────────────────────────────────────
function LaunchIllustration({ inView, hovered, shouldReduce }: IllustrationProps) {
  const go = inView && !shouldReduce

  const sBase   = hovered ? 'rgba(240,237,232,0.22)' : 'rgba(240,237,232,0.10)'
  const sAccent = hovered ? 'rgba(200,255,0,0.90)'   : 'rgba(200,255,0,0.55)'
  const fDim    = hovered ? 'rgba(240,237,232,0.11)'  : 'rgba(240,237,232,0.055)'
  const fAccent = hovered ? 'rgba(200,255,0,0.22)'   : 'rgba(200,255,0,0.10)'

  const t = (dur: number, delay: number) => ({
    duration: dur, delay: go ? delay : 0, ease: EASE,
  })

  const steps = [
    { y: 74,  w: 90,  accent: false },
    { y: 98,  w: 75,  accent: false },
    { y: 122, w: 82,  accent: false },
    { y: 146, w: 38,  accent: true  },
  ]

  return (
    <svg viewBox="0 0 260 164" fill="none" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      {/* Terminal frame */}
      <motion.path
        d="M8,1 H252 Q259,1 259,8 V156 Q259,163 252,163 H8 Q1,163 1,156 V8 Q1,1 8,1 Z"
        stroke={sBase} strokeWidth={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(0.75, 0)}
      />

      {/* Traffic lights */}
      {([{ cx: 16, fill: 'rgba(255,95,87,0.75)' }, { cx: 28, fill: 'rgba(255,189,68,0.75)' }, { cx: 40, fill: 'rgba(40,200,64,0.75)' }]).map((d, i) => (
        <motion.circle key={d.cx} cx={d.cx} cy={16} r={4.5}
          fill={d.fill}
          initial={{ scale: 0, opacity: 0 }}
          animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          style={{ transformOrigin: `${d.cx}px 16px` }}
          transition={t(0.24, 0.52 + i * 0.06)}
        />
      ))}

      {/* Header divider */}
      <motion.line x1="1" y1="30" x2="259" y2="30"
        stroke={sBase} strokeWidth={1}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: 'left center' }}
        transition={t(0.38, 0.64)}
      />

      {/* Prompt indicator */}
      <motion.rect x="12" y="40" width="8" height="8" rx="1.5"
        fill={sAccent}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 0.85 } : { opacity: 0 }}
        transition={t(0.2, 0.78)}
      />
      <motion.rect x="26" y="42" width="90" height="4" rx="2"
        fill={sBase}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={go ? { scaleX: 1, opacity: 0.6 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: '26px 44px' }}
        transition={t(0.36, 0.84)}
      />

      {/* Progress bar track */}
      <motion.rect x="12" y="56" width="200" height="6" rx="3"
        fill={fDim}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: '12px 59px' }}
        transition={t(0.28, 1.0)}
      />
      {/* Progress bar fill */}
      <motion.rect x="12" y="56" width="200" height="6" rx="3"
        fill={sAccent}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={go ? { scaleX: 0.96, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: '12px 59px' }}
        transition={{ duration: 1.1, delay: go ? 1.06 : 0, ease: EASE }}
      />
      {/* Pipeline steps */}
      {steps.map((step, i) => (
        <g key={step.y}>
          {/* Dashed connector to next step */}
          {i < steps.length - 1 && (
            <motion.line
              x1={20} y1={step.y + 8} x2={20} y2={steps[i + 1].y - 8}
              stroke={sBase} strokeWidth={0.75} strokeDasharray="2 2"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={go ? { scaleY: 1, opacity: 0.55 } : { scaleY: 0, opacity: 0 }}
              style={{ transformOrigin: `20px ${step.y + 8}px` }}
              transition={t(0.22, 1.42 + i * 0.19)}
            />
          )}

          {/* Circle node */}
          <motion.circle cx={20} cy={step.y} r={7}
            fill={step.accent ? fAccent : fDim}
            stroke={step.accent ? sAccent : sBase}
            strokeWidth={0.85}
            initial={{ scale: 0, opacity: 0 }}
            animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            style={{ transformOrigin: `20px ${step.y}px` }}
            transition={t(0.28, 1.30 + i * 0.19)}
          />

          {/* Checkmark path */}
          <motion.path
            d={`M ${13},${step.y} L ${18},${step.y + 4} L ${27},${step.y - 5}`}
            stroke={step.accent ? sAccent : sBase}
            strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={t(0.28, 1.46 + i * 0.19)}
          />

          {/* Label bar */}
          <motion.rect
            x={34} y={step.y - 4} width={step.w} height={5} rx="2"
            fill={step.accent ? sAccent : sBase}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={go ? { scaleX: 1, opacity: step.accent ? 0.9 : 0.5 } : { scaleX: 0, opacity: 0 }}
            style={{ transformOrigin: '34px center' }}
            transition={t(0.32, 1.52 + i * 0.19)}
          />
        </g>
      ))}

      {/* Live pulsing indicator */}
      <motion.circle cx={78} cy={146} r={4.5}
        fill={sAccent}
        animate={go ? { scale: [1, 1.7, 1], opacity: [0.9, 0.2, 0.9] } : { opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, delay: 2.5, ease: 'easeInOut' }}
      />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ServiceCard
// ─────────────────────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  sectionInView,
}: {
  service: typeof services[0]
  index: number
  sectionInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
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
      glowX.set(x)
      glowY.set(y)
      rotateX.set(((y - rect.height / 2) / (rect.height / 2)) * -5)
      rotateY.set(((x - rect.width  / 2) / (rect.width  / 2)) *  5)
    },
    [shouldReduce, glowX, glowY, rotateX, rotateY],
  )

  const handleLeave = () => {
    setHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }

  const illustrations = [BrowserIllustration, SitemapIllustration, LaunchIllustration]
  const Illustration = illustrations[index]

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        background: hovered ? 'var(--surface)' : 'var(--bg)',
        cursor: 'default',
        perspective: 800,
        transformStyle: 'preserve-3d',
        rotateX: shouldReduce ? 0 : springRotateX,
        rotateY: shouldReduce ? 0 : springRotateY,
        transition: 'background 0.4s ease',
        overflow: 'hidden',
        height: '100%',
        border: hovered ? '1px solid rgba(240,237,232,0.14)' : '1px solid rgba(240,237,232,0.09)',
        borderRadius: 8,
      }}
    >
      {/* Top accent line */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2, background: 'var(--accent)',
          transformOrigin: 'left', scaleX: hovered ? 1 : 0, zIndex: 2,
        }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      {/* ── Illustration zone — full bleed ── */}
      <div style={{
        height: 164,
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle inset gradient */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: hovered
            ? 'radial-gradient(ellipse at 20% 50%, rgba(200,255,0,0.055), transparent 65%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.18), transparent 70%)',
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}/>
        {/* SVG illustration */}
        <div style={{ position: 'absolute', inset: '8px 12px', zIndex: 0 }}>
          <Illustration inView={sectionInView} hovered={hovered} shouldReduce={shouldReduce} />
        </div>
      </div>

      {/* ── Text content ── */}
      <div style={{
        padding: 'clamp(1.75rem, 3vw, 2.5rem) clamp(1.5rem, 2.5vw, 2.5rem)',
        position: 'relative',
      }}>
        {/* Cursor glow */}
        <motion.div aria-hidden="true" style={{
          position: 'absolute', width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.065), transparent 70%)',
          pointerEvents: 'none', x: glowX, y: glowY,
          translateX: '-50%', translateY: '-50%',
          opacity: hovered ? 1 : 0,
        }} transition={{ opacity: { duration: 0.3 } }} />

        {/* Number */}
        <motion.div
          animate={{ color: hovered ? 'var(--accent)' : 'rgba(240,237,232,0.10)' }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 4.5vw, 4rem)',
            fontWeight: 400, fontStyle: 'italic', lineHeight: 1,
            marginBottom: '1.25rem', userSelect: 'none', position: 'relative',
          }}
        >
          {service.number}
        </motion.div>

        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.15rem, 1.7vw, 1.35rem)',
          fontWeight: 600, fontStyle: 'normal', color: 'var(--text)',
          marginBottom: '0.9rem', lineHeight: 1.25, position: 'relative',
        }}>
          {service.title}
        </h3>

        <p style={{
          fontSize: '0.875rem', fontWeight: 300, color: 'var(--muted)',
          lineHeight: 1.75, marginBottom: '1.5rem', position: 'relative',
        }}>
          {service.body}
        </p>

        {/* Deliverables */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', position: 'relative' }}>
          {service.deliverables.map((item, i) => (
            <motion.li key={item}
              initial={false}
              animate={{ x: hovered && !shouldReduce ? 0 : -4, opacity: hovered ? 0.85 : 0.45 }}
              transition={{ duration: 0.32, delay: hovered ? i * 0.04 : 0, ease: EASE }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', fontSize: '0.8rem', fontWeight: 300, color: 'var(--text)', lineHeight: 1.5 }}
            >
              <motion.span
                animate={{ background: hovered ? 'var(--accent)' : 'rgba(200,255,0,0.4)' }}
                transition={{ duration: 0.3 }}
                style={{ display: 'block', width: 5, height: 5, borderRadius: '50%', flexShrink: 0, marginTop: '0.35em' }}
              />
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Index tag */}
        <motion.div
          animate={{ opacity: hovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', bottom: '1.25rem', right: '1.5rem',
            fontSize: '0.58rem', fontWeight: 400, textTransform: 'uppercase',
            letterSpacing: '0.15em', color: 'var(--muted)', fontFamily: 'var(--font-ui)',
          }}
        >
          0{index + 1} / 03
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Services section
// ─────────────────────────────────────────────────────────────────────────────
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
          <div style={{ overflow: 'hidden', marginBottom: '3.5rem' }}>
            <motion.h2
              className="display-section"
              variants={shouldReduce ? undefined : clipRevealUp}
            >
              Was wir für Sie bauen.
            </motion.h2>
          </div>

          {/* Cards grid */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.12)}
            style={{ display: 'grid', gap: '12px', background: 'transparent' }}
            className="grid-cols-1 md:grid-cols-3"
          >
            {services.map((service, i) => (
              <motion.div key={service.number} variants={shouldReduce ? undefined : fadeUp} style={{ height: '100%' }}>
                <ServiceCard service={service} index={i} sectionInView={isInView} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

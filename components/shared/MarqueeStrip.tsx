'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface MarqueeStripProps {
  items?: string[]
  speed?: number
  separator?: 'dot' | 'star' | 'dash'
  variant?: 'accent' | 'muted' | 'display'
  reverse?: boolean
}

const separators = {
  dot: '\u00A0\u00A0\u2022\u00A0\u00A0',
  star: '\u00A0\u00A0\u2726\u00A0\u00A0',
  dash: '\u00A0\u00A0\u2014\u00A0\u00A0',
}

const variants = {
  accent: {
    fontFamily: 'var(--font-ui)',
    fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
    fontWeight: 500 as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.18em',
    color: 'var(--accent)',
  },
  muted: {
    fontFamily: 'var(--font-ui)',
    fontSize: 'clamp(0.7rem, 1vw, 0.78rem)',
    fontWeight: 400 as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.14em',
    color: 'var(--muted)',
  },
  display: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    fontWeight: 400 as const,
    fontStyle: 'italic' as const,
    textTransform: 'none' as const,
    letterSpacing: '-0.01em',
    color: 'var(--text)',
  },
}

export function MarqueeStrip({
  items = [
    'Webdesign',
    'Entwicklung',
    'UX-Strategie',
    'Conversion',
    'Performance',
    'Next.js',
    'Koblenz & Region',
  ],
  speed = 30,
  separator = 'star',
  variant = 'display',
  reverse = false,
}: MarqueeStripProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const shouldReduce = useReducedMotion()

  const sep = separators[separator]
  const text = items.join(sep) + sep
  // Duplicate enough times to fill any screen width
  const track = `${text}${text}${text}${text}`

  const style = variants[variant]

  return (
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
        padding: variant === 'display' ? '2.5rem 0' : '1.25rem 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      {/* Left/right fade masks */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 80,
          background: 'linear-gradient(to right, var(--bg), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 80,
          background: 'linear-gradient(to left, var(--bg), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={shouldReduce ? undefined : { opacity: 0 }}
        animate={shouldReduce ? undefined : isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
        }}
      >
        <motion.span
          animate={
            shouldReduce
              ? undefined
              : {
                  x: reverse ? ['0%', '25%'] : ['0%', '-25%'],
                }
          }
          transition={
            shouldReduce
              ? undefined
              : {
                  x: {
                    duration: speed,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }
          }
          style={{
            ...style,
            display: 'inline-block',
            willChange: 'transform',
          }}
        >
          {track}
        </motion.span>
      </motion.div>
    </div>
  )
}

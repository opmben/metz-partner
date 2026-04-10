'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface SectionDividerProps {
  glow?: 'accent' | 'warm' | 'subtle' | 'none'
  height?: number
}

const glowColors = {
  accent: 'rgba(200,255,0,0.06)',
  warm: 'rgba(255,107,53,0.04)',
  subtle: 'rgba(240,237,232,0.03)',
  none: 'transparent',
}

export function SectionDivider({ glow = 'accent', height = 120 }: SectionDividerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const shouldReduce = useReducedMotion()

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
      }}
    >
      {/* Center line */}
      <motion.div
        initial={shouldReduce ? undefined : { scaleX: 0 }}
        animate={shouldReduce ? undefined : isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          right: '10%',
          height: 1,
          background: 'linear-gradient(to right, transparent, var(--border), transparent)',
          transformOrigin: 'center',
        }}
      />

      {/* Ambient glow */}
      {glow !== 'none' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${glowColors[glow]}, transparent 70%)`,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

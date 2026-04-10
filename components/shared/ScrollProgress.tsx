'use client'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'var(--accent)',
        transformOrigin: '0%',
        scaleX: shouldReduce ? scrollYProgress : scaleX,
        zIndex: 9995,
        pointerEvents: 'none',
        boxShadow: '0 0 8px rgba(200,255,0,0.6)',
      }}
    />
  )
}

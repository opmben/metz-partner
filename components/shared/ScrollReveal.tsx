'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp } from '@/lib/animations'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      variants={shouldReduce ? undefined : fadeUp}
      initial={shouldReduce ? undefined : 'hidden'}
      animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

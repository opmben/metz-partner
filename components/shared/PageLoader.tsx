'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export function PageLoader() {
  const [loading, setLoading] = useState(true)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    // Wait for fonts + initial paint
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTimeout(() => setLoading(false), shouldReduce ? 0 : 900)
      })
    })
    return () => cancelAnimationFrame(id)
  }, [shouldReduce])

  if (shouldReduce) return null

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9990,
            display: 'flex',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
          exit={{ transition: { staggerChildren: 0.07 } }}
        >
          {/* Left panel */}
          <motion.div
            style={{ flex: 1, background: 'var(--bg)', originX: 0 }}
            exit={{ x: '-100%', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
          />
          {/* Right panel */}
          <motion.div
            style={{ flex: 1, background: 'var(--bg)', originX: 1 }}
            exit={{ x: '100%', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
          />

          {/* Brand wordmark — centered, fades out as panels split */}
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '0.75rem',
              pointerEvents: 'none',
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Metz & Partner
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '3rem',
                height: '1px',
                background: 'var(--accent)',
                originX: 0,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

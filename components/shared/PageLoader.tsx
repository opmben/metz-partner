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
              pointerEvents: 'none',
            }}
          >
            <motion.img
              src="/font2 tra 2.svg"
              alt="Metz & Partner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 'clamp(200px, 40vw, 380px)',
                height: 'auto',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

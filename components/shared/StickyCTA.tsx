'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const [inContact, setInContact] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const heroEl = document.querySelector('#__hero_sentinel') as HTMLElement | null
    const contactEl = document.getElementById('kontakt')

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroEl) {
            // Show when hero sentinel is out of view (user scrolled past hero)
            setVisible(!entry.isIntersecting)
          }
          if (entry.target === contactEl) {
            // Hide when contact section is in view
            setInContact(entry.isIntersecting)
          }
        })
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' },
    )

    if (heroEl) obs.observe(heroEl)
    if (contactEl) obs.observe(contactEl)

    return () => obs.disconnect()
  }, [])

  const show = visible && !inContact

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.92 }}
          animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            x: '-50%',
            zIndex: 90,
            pointerEvents: 'auto',
          }}
        >
          <motion.a
            href="#kontakt"
            whileHover={shouldReduce ? undefined : { scale: 1.06, y: -3 }}
            whileTap={shouldReduce ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.78rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.85rem 2rem',
              borderRadius: 100,
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 40px rgba(200,255,0,0.25), 0 2px 12px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
            }}
          >
            Projekt anfragen
            <ArrowRight size={13} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { faqs } from '@/lib/data/faqs'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      style={{
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        position: 'relative',
      }}
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          initial={shouldReduce ? undefined : { opacity: 0 }}
          animate={shouldReduce ? undefined : isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
              maxWidth: 600,
            }}
          >
            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
              animate={
                shouldReduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.85, ease: EASE }}
            >
              <SectionLabel>Häufige Fragen</SectionLabel>
            </motion.div>
            <motion.h2
              className="display-section"
              initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
              animate={
                shouldReduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
            >
              Was Sie wissen möchten.
            </motion.h2>
          </div>

          {/* FAQ list */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
            animate={
              shouldReduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              maxWidth: 760,
            }}
          >
            {faqs.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className="panel-process"
                  style={{
                    overflow: 'hidden',
                    padding: 0,
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1.5rem',
                      padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 3vw, 1.75rem)',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                        fontWeight: 400,
                        color: 'var(--text)',
                        lineHeight: 1.45,
                      }}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        border: '1px solid var(--glass-border)',
                        background: 'var(--glass)',
                        color: 'var(--muted)',
                        fontSize: '1rem',
                        lineHeight: 1,
                      }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          style={{
                            padding: '0 clamp(1.25rem, 3vw, 1.75rem) clamp(1rem, 2.5vw, 1.5rem)',
                            paddingTop: 0,
                            borderTop: '1px solid var(--glass-border)',
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: '0.9rem',
                              fontWeight: 300,
                              color: 'var(--muted)',
                              lineHeight: 1.75,
                              margin: 0,
                              paddingTop: 'clamp(0.75rem, 2vw, 1.25rem)',
                            }}
                          >
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { faqs } from '@/lib/data/faqs'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const LIME = '#D3FD51'

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
              maxWidth: 880,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {faqs.map((item, i) => {
              const isOpen = openIndex === i
              const num = String(i + 1).padStart(2, '0')

              return (
                <div
                  key={i}
                  className="panel-process"
                  style={{
                    padding: 0,
                    border: isOpen ? '1px solid rgba(211, 253, 81, 0.28)' : undefined,
                    boxShadow: isOpen
                      ? `inset 0 1px 0 rgba(211, 253, 81, 0.16), 0 18px 60px rgba(0,0,0,0.36), 0 0 40px rgba(211, 253, 81, 0.06)`
                      : undefined,
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
                      gap: '1.25rem',
                      padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 3vw, 1.75rem)',
                      textAlign: 'left',
                    }}
                  >
                    {/* Number */}
                    <span
                      style={{
                        fontFamily: 'var(--font-display), Georgia, serif',
                        fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        color: isOpen ? LIME : 'rgba(255,255,255,0.30)',
                        transition: `color ${shouldReduce ? '0s' : '0.22s'} ease`,
                        flexShrink: 0,
                        lineHeight: 1,
                        minWidth: '2ch',
                        userSelect: 'none',
                      }}
                    >
                      {num}
                    </span>

                    {/* Question */}
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                        fontWeight: 400,
                        color: 'var(--text)',
                        lineHeight: 1.45,
                        flex: 1,
                      }}
                    >
                      {item.q}
                    </span>

                    {/* Toggle icon */}
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
                        border: `1px solid ${isOpen ? 'rgba(211, 253, 81, 0.40)' : 'var(--glass-border)'}`,
                        background: isOpen ? 'rgba(211, 253, 81, 0.10)' : 'var(--glass)',
                        color: isOpen ? LIME : 'var(--muted)',
                        fontSize: '1rem',
                        lineHeight: 1,
                        transition: `border-color ${shouldReduce ? '0s' : '0.22s'} ease, background ${shouldReduce ? '0s' : '0.22s'} ease, color ${shouldReduce ? '0s' : '0.22s'} ease`,
                      }}
                    >
                      +
                    </motion.span>
                  </button>

                  {/* Answer — grid-template-rows expansion (no height animation) */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: shouldReduce
                        ? 'none'
                        : `grid-template-rows 0.38s cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                  >
                    <div style={{ overflow: 'hidden', minHeight: 0 }}>
                      <motion.div
                        animate={{ opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.22, ease: EASE }}
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
                            fontWeight: 400,
                            color: 'var(--muted)',
                            lineHeight: 1.75,
                            margin: 0,
                            paddingTop: 'clamp(0.75rem, 2vw, 1.25rem)',
                          }}
                        >
                          {item.a}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

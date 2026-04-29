'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const faqs = [
  {
    q: 'Was kostet eine Website von Metz & Partner?',
    a: 'Unsere Pakete starten ab 890 € Einmalig plus einer monatlichen Servicepauschale ab 199 €. Was Sie genau bezahlen, hängt vom Umfang ab — aber es gibt keine versteckten Kosten. Ein erstes Gespräch ist kostenlos und unverbindlich.',
  },
  {
    q: 'Wie lange dauert die Entwicklung meiner Website?',
    a: 'In der Regel zwei bis vier Wochen vom ersten Gespräch bis zum Launch. Für komplexere Projekte mit individuellen Anforderungen kann es etwas länger dauern — das besprechen wir im Vorfeld transparent.',
  },
  {
    q: 'Wir sind ein kleines Unternehmen. Lohnt sich das für uns?',
    a: 'Gerade für kleinere Betriebe ist eine professionelle Website oft der Unterschied zwischen einem Auftrag und keinem. Wir arbeiten bewusst mit regionalen Unternehmen — vom Handwerksbetrieb bis zur Fachkanzlei — und kennen die Anforderungen.',
  },
  {
    q: 'Arbeitet ihr auch außerhalb von Koblenz?',
    a: 'Ja. Unser Büro ist in Emmelshausen im Rhein-Hunsrück. Wir betreuen Kunden in Koblenz, der Mosel-Region und ganz Rheinland-Pfalz. Das erste Gespräch führen wir auch gerne per Video-Call — ortsunabhängig.',
  },
  {
    q: 'Was passiert nach dem Launch — wer kümmert sich um die Wartung?',
    a: 'Im Monats-Paket übernehmen wir laufende Pflege, Updates und technischen Support. Sie können Inhalte selbst anpassen oder uns damit beauftragen. Wir bleiben direkt erreichbar — kein Ticket-System, keine Weiterleitungen.',
  },
  {
    q: 'Was unterscheidet euch von anderen Webdesign-Agenturen?',
    a: 'Wir sind zwei Gründer, die selbst am Projekt arbeiten — kein Projektmanager dazwischen, keine Freelancer-Weitergabe. Sie sprechen direkt mit der Person, die Ihre Website baut. Das macht Entscheidungen schneller und das Ergebnis besser.',
  },
]

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

export const faqJsonLd = faqs.map((item) => ({
  '@type': 'Question',
  name: item.q,
  acceptedAnswer: { '@type': 'Answer', text: item.a },
}))

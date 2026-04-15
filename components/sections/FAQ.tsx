'use client'

import { useRef } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'
import { fadeUp, staggerContainer, clipRevealUp } from '@/lib/animations'

// ─── Data ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: 'Was kostet eine Website bei Metz & Partner?',
    answer:
      'Unsere Projekte starten ab 500 €. Der genaue Preis hängt vom Umfang ab — Anzahl der Seiten, gewünschte Funktionen, individuelle Anforderungen. Im ersten Gespräch klären wir gemeinsam, was Sie brauchen, und erstellen ein festes Angebot ohne versteckte Kosten.',
  },
  {
    question: 'Wie lange dauert die Entwicklung?',
    answer:
      'Von der ersten Absprache bis zum Launch vergehen in der Regel 2 bis 4 Wochen. Komplexere Projekte können etwas länger dauern — aber Sie wissen von Tag 1, wie der Zeitplan aussieht.',
  },
  {
    question: 'Muss ich Texte und Bilder selbst liefern?',
    answer:
      'Idealerweise ja — Sie kennen Ihr Unternehmen am besten. Wir helfen Ihnen aber dabei: mit konkreten Vorlage-Fragen für Texte und einem klaren Briefing für Fotos.',
  },
  {
    question: 'Kann ich die Website nach dem Launch selbst bearbeiten?',
    answer:
      'Ja. Wir bauen jede Website so, dass Sie einfache Änderungen selbst vornehmen können. Nach dem Launch zeigen wir Ihnen in einer persönlichen 30-minütigen Einweisung, wie das funktioniert.',
  },
  {
    question: 'Wer arbeitet an meiner Website?',
    answer:
      'Benedikt und Maximilian — wir beide. Niemand sonst. Kein ausgelagertes Team, kein Junior, der die Arbeit macht, während jemand anderes mit Ihnen spricht.',
  },
  {
    question: 'Was ist im Preis inbegriffen?',
    answer:
      'Design, Entwicklung, zwei Feedback-Runden, Launch-Setup und eine persönliche Einweisung. SEO-Grundstruktur ist immer dabei. Laufendes Hosting zahlen Sie direkt bei einem Anbieter Ihrer Wahl.',
  },
]

// ─── FAQ Section ──────────────────────────────────────────────────────────────
export function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="faq"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      className="md:py-32"
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.06)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <div
            style={{ marginBottom: '3.5rem' }}
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="display-section"
                variants={shouldReduce ? undefined : clipRevealUp}
              >
                Alles Wichtige, bevor Sie anfragen.
              </motion.h2>
            </div>
            <motion.p
              variants={shouldReduce ? undefined : fadeUp}
              style={{
                fontSize: '0.9rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: 300,
              }}
              className="md:text-right"
            >
              Noch Fragen? Im kostenlosen Erstgespräch klären wir alles persönlich.
            </motion.p>
          </div>

          {/* Accordion */}
          <motion.div variants={shouldReduce ? undefined : staggerContainer(0.05)}>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, i) => (
                <motion.div key={faq.question} variants={shouldReduce ? undefined : fadeUp}>
                  <AccordionItem
                    value={String(i)}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.02)',
                      overflow: 'hidden',
                    }}
                    className="transition-colors duration-300 hover:[border-color:var(--border-hover)]"
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger
                        className={[
                          'group flex w-full flex-1 items-center justify-between gap-6',
                          'px-6 py-5 text-left',
                          'transition-colors duration-300',
                          // Plus icon: rotate 45° → × on open
                          '[&[data-state=open]>svg]:rotate-45',
                          '[&[data-state=open]>svg]:text-accent',
                          // Number: muted → accent on open
                          '[&[data-state=open]_[data-num]]:text-accent',
                        ].join(' ')}
                      >
                        <div className="flex items-baseline gap-5 min-w-0">
                          <span
                            data-num=""
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '0.75rem',
                              fontStyle: 'italic',
                              color: 'var(--muted)',
                              flexShrink: 0,
                              lineHeight: 1,
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                              fontWeight: 300,
                              color: 'var(--text)',
                              lineHeight: 1.3,
                              minWidth: 0,
                            }}
                          >
                            {faq.question}
                          </span>
                        </div>
                        <Plus
                          size={15}
                          strokeWidth={1.5}
                          style={{ color: 'var(--muted)', flexShrink: 0 }}
                          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          aria-hidden="true"
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>

                    <AccordionContent
                      className="px-6 pb-0"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      <p
                        style={{
                          paddingTop: '0.25rem',
                          paddingBottom: '1.5rem',
                          paddingLeft: 'calc(0.75rem + 1.25rem)',
                          fontSize: '0.93rem',
                          fontWeight: 300,
                          color: 'var(--muted)',
                          lineHeight: 1.8,
                          maxWidth: 580,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

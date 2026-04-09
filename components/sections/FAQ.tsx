'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'

const faqs = [
  {
    question: 'Was kostet eine Website bei Metz & Partner?',
    answer:
      'Unsere Projekte starten ab 500 €. Der genaue Preis hängt vom Umfang ab — Anzahl der Seiten, gewünschte Funktionen, individuelle Anforderungen. Im ersten Gespräch klären wir gemeinsam, was Sie brauchen, und erstellen ein festes Angebot ohne versteckte Kosten.',
  },
  {
    question: 'Wie lange dauert die Entwicklung?',
    answer:
      'Von der ersten Absprache bis zum Launch vergehen in der Regel 2 bis 4 Wochen. Komplexere Projekte können etwas länger dauern — aber Sie wissen von Tag 1, wie der Zeitplan aussieht. Wir arbeiten nicht in die Stille, sondern halten Sie kontinuierlich auf dem Laufenden.',
  },
  {
    question: 'Muss ich Texte und Bilder selbst liefern?',
    answer:
      'Idealerweise ja — Sie kennen Ihr Unternehmen am besten. Wir helfen Ihnen aber dabei: mit konkreten Vorlage-Fragen für Texte und einem klaren Briefing für Fotos. Wer möchte, gibt uns eine grobe Richtung — wir formulieren daraus etwas Fertiges.',
  },
  {
    question: 'Kann ich die Website nach dem Launch selbst bearbeiten?',
    answer:
      'Ja. Wir bauen jede Website so, dass Sie einfache Änderungen selbst vornehmen können. Nach dem Launch zeigen wir Ihnen in einer persönlichen 30-minütigen Einweisung, wie das funktioniert. Für alles Weitere sind wir direkt per Nachricht erreichbar.',
  },
  {
    question: 'Wer arbeitet an meiner Website?',
    answer:
      'Benedikt und Maximilian — wir beide. Niemand sonst. Kein ausgelagertes Team, kein Junior, der die Arbeit macht, während jemand anderes mit Ihnen spricht. Was wir zusagen, liefern wir selbst.',
  },
  {
    question: 'Was ist im Preis inbegriffen?',
    answer:
      'Design, Entwicklung, zwei Feedback-Runden, Launch-Setup und eine persönliche Einweisung. SEO-Grundstruktur — Meta-Tags, Sitemaps, strukturierte URLs — ist immer dabei. Was nicht inbegriffen ist: laufendes Hosting (das zahlen Sie direkt bei einem Anbieter Ihrer Wahl) und monatliche Pflege-Pakete, die wir aktuell nicht anbieten.',
  },
]

function FAQItem({
  faq,
  index,
  shouldReduce,
}: {
  faq: (typeof faqs)[0]
  index: number
  shouldReduce: boolean | null
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={shouldReduce ? undefined : fadeUp}
      style={{
        borderBottom: '1px solid var(--border)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          padding: '1.75rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontStyle: 'italic',
              color: 'var(--muted)',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.3,
            }}
          >
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ flexShrink: 0, color: 'var(--muted)' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                paddingBottom: '1.75rem',
                paddingLeft: 'calc(0.8rem + 1.25rem + 1.25rem)',
                fontSize: '0.95rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.8,
                maxWidth: 640,
              }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const ref = useRef(null)
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
            style={{ marginBottom: '3rem' }}
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.div variants={shouldReduce ? undefined : fadeUp}>
                <SectionLabel>Häufige Fragen</SectionLabel>
              </motion.div>
              <motion.h2
                className="display-section"
                variants={shouldReduce ? undefined : fadeUp}
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

          {/* FAQ list */}
          <motion.div
            style={{ borderTop: '1px solid var(--border)' }}
            variants={shouldReduce ? undefined : staggerContainer(0.05)}
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={i}
                shouldReduce={shouldReduce}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Mail, Phone, ArrowRight, ArrowUpRight, Check } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein.'),
  company: z.string().optional(),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  message: z.string().min(20, 'Bitte beschreiben Sie Ihr Projekt kurz (mindestens 20 Zeichen).'),
  dsgvo: z.literal(true, 'Bitte stimmen Sie der Datenschutzerklärung zu.'),
})

type FormData = z.infer<typeof schema>

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Glass input ──────────────────────────────────────────────────────────────

const glassInput: React.CSSProperties = {
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03)), rgba(8,8,8,0.52)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 12,
  color: 'var(--text)',
  fontFamily: 'var(--font-ui)',
  fontSize: '0.95rem',
  fontWeight: 300,
  padding: '0.9rem 1.1rem',
  width: '100%',
  outline: 'none',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
  transition: 'border-color 0.28s ease, box-shadow 0.28s ease, background 0.28s ease',
}

function attachGlassFocus(el: HTMLInputElement | HTMLTextAreaElement | null) {
  if (!el) return
  el.addEventListener('focus', () => {
    el.style.borderColor = 'rgba(211,253,81,0.42)'
    el.style.boxShadow =
      'inset 0 1px 0 rgba(255,255,255,0.14), 0 0 0 3px rgba(211,253,81,0.08), 0 0 24px rgba(211,253,81,0.04)'
    el.style.background =
      'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04)), rgba(8,8,8,0.52)'
  })
  el.addEventListener('blur', () => {
    el.style.borderColor = 'rgba(255,255,255,0.10)'
    el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08)'
    el.style.background =
      'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03)), rgba(8,8,8,0.52)'
  })
}

// ─── Form field wrapper ───────────────────────────────────────────────────────

function FormField({
  id,
  label,
  error,
  children,
  shouldReduce,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
  shouldReduce: boolean | null
}) {
  return (
    <motion.div
      variants={shouldReduce ? undefined : fadeUp}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}
    >
      <label
        htmlFor={id}
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.68rem',
          fontWeight: 400,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.13em',
          color: 'rgba(255,255,255,0.40)',
        }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: '0.74rem', color: 'rgba(255,107,107,0.9)', lineHeight: 1.4, margin: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Timeline steps ───────────────────────────────────────────────────────────

const timelineSteps = [
  { num: '01', text: 'Wir lesen Ihre Nachricht und bereiten uns auf das Gespräch vor.' },
  { num: '02', text: 'Benedikt oder Maximilian meldet sich persönlich — innerhalb von 24h.' },
  { num: '03', text: 'Gemeinsam klären wir, ob und wie wir helfen können. Kein Druck.' },
]

// ─── Contact section ──────────────────────────────────────────────────────────

export function Contact() {
  const headerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const isPanelInView = useInView(panelRef, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const messageValue = watch('message', '')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setSubmitError(json.error ?? 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.')
        return
      }
      setSubmitted(true)
    } catch {
      setSubmitError(
        'Verbindungsfehler. Bitte versuchen Sie es erneut oder schreiben Sie direkt an anfragen@metzundpartner.com',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="kontakt"
      style={{
        paddingTop: 'clamp(5rem, 8vw, 10rem)',
        paddingBottom: 'clamp(5rem, 8vw, 10rem)',
        position: 'relative',
        overflow: 'clip',
        overflowClipMargin: '200px',
      }}
    >
      {/* Atmospheric glows */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '5%',
          left: '-8%',
          width: '55vw',
          height: '55vw',
          maxWidth: 700,
          maxHeight: 700,
          background:
            'radial-gradient(ellipse at 40% 50%, rgba(211,253,81,0.10) 0%, transparent 65%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '-5%',
          width: '48vw',
          height: '42vw',
          maxWidth: 620,
          maxHeight: 540,
          background:
            'radial-gradient(ellipse at 65% 50%, rgba(212,131,10,0.13) 0%, transparent 60%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>

        {/* ── Section header ── */}
        <div id="kontakt-heading" ref={headerRef} style={{ marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={
              shouldReduce
                ? undefined
                : isHeaderInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.7, ease: EASE }}
            style={{ marginBottom: '1.1rem', display: 'inline-block' }}
          >
            <span
              className="surface-floating"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.9rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                fontWeight: 400,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px rgba(211,253,81,0.55)',
                  flexShrink: 0,
                }}
              />
              Kontakt
            </span>
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="display-section"
              initial={shouldReduce ? undefined : { y: '108%' }}
              animate={
                shouldReduce
                  ? undefined
                  : isHeaderInView
                  ? { y: '0%' }
                  : { y: '108%' }
              }
              transition={{ duration: 0.95, ease: EASE, delay: 0.07 }}
            >
              Erzählen Sie uns von Ihrem Projekt.
            </motion.h2>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div
          ref={panelRef}
          className="contact-layout"
          style={{ display: 'grid', gap: '1rem' }}
        >

          {/* ── Left: Info panel ── */}
          <motion.div
            className="surface-secondary"
            initial={shouldReduce ? undefined : { opacity: 0, x: -28, filter: 'blur(12px)' }}
            animate={
              shouldReduce
                ? undefined
                : isPanelInView
                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                : { opacity: 0, x: -28, filter: 'blur(12px)' }
            }
            transition={{ duration: 0.95, ease: EASE }}
            style={{
              padding: 'clamp(1.75rem, 3vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Ghost initial depth layer */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                bottom: '-0.15em',
                right: '-0.04em',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(8rem, 18vw, 16rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1,
                color: 'rgba(255,255,255,0.018)',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
              }}
            >
              K
            </span>

            {/* Intro text */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                  fontWeight: 300,
                  color: 'var(--text)',
                  lineHeight: 1.75,
                  margin: '0 0 0.55rem',
                }}
              >
                Kein langes Hin und Her.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.88rem',
                  fontWeight: 300,
                  color: 'var(--muted)',
                  lineHeight: 1.75,
                  margin: 0,
                  maxWidth: '42ch',
                }}
              >
                Buchen Sie einen kostenlosen 30-Minuten-Call — oder schreiben Sie uns direkt.
              </p>
            </div>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <motion.a
                href="https://calendly.com/metzundpartner/kennenlerngesprach"
                target="_blank"
                rel="noopener noreferrer"
                className="button-glass-primary"
                whileHover={shouldReduce ? undefined : { scale: 1.03, y: -2 }}
                whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.11em',
                  color: 'var(--text)',
                  justifyContent: 'flex-start',
                  gap: '0.6rem',
                }}
              >
                <Phone size={12} strokeWidth={1.5} />
                Kostenlosen Call buchen
                <span style={{ marginLeft: 'auto', opacity: 0.55 }}>
                  <ArrowUpRight size={13} />
                </span>
              </motion.a>

              <a
                href="mailto:anfragen@metzundpartner.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.84rem',
                  fontWeight: 300,
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.22s ease',
                  paddingLeft: '0.25rem',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
                }}
              >
                <Mail size={13} strokeWidth={1.5} />
                anfragen@metzundpartner.com
              </a>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03) 80%, transparent)',
                position: 'relative',
                zIndex: 1,
              }}
            />

            {/* Timeline */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.62rem',
                  fontWeight: 400,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.35)',
                  margin: '0 0 1.25rem',
                }}
              >
                Was als nächstes passiert
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {timelineSteps.map((step, i) => (
                  <div key={step.num} style={{ display: 'flex', gap: '1rem' }}>
                    {/* Dot + connecting line */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexShrink: 0,
                        width: 28,
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          background:
                            'linear-gradient(180deg, rgba(211,253,81,0.12), rgba(211,253,81,0.05))',
                          border: '1px solid rgba(211,253,81,0.22)',
                          boxShadow: 'inset 0 1px 0 rgba(211,253,81,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontStyle: 'italic',
                            fontSize: '0.72rem',
                            color: 'rgba(211,253,81,0.80)',
                            lineHeight: 1,
                            letterSpacing: '0.02em',
                          }}
                        >
                          {step.num}
                        </span>
                      </div>
                      {i < timelineSteps.length - 1 && (
                        <div
                          style={{
                            width: 1,
                            flex: 1,
                            minHeight: '1.5rem',
                            background:
                              'linear-gradient(to bottom, rgba(211,253,81,0.18), rgba(255,255,255,0.04))',
                            margin: '3px 0',
                          }}
                        />
                      )}
                    </div>

                    {/* Step text */}
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.84rem',
                        fontWeight: 300,
                        color: 'var(--muted)',
                        lineHeight: 1.65,
                        paddingTop: '0.28rem',
                        paddingBottom: i < timelineSteps.length - 1 ? '1rem' : 0,
                        margin: 0,
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                zIndex: 1,
                marginTop: 'auto',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px rgba(211,253,81,0.6)',
                  flexShrink: 0,
                  animation: shouldReduce ? 'none' : 'heroPulse 2.5s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.72rem',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.04em',
                }}
              >
                Antwort innerhalb von 24 Stunden
              </span>
            </div>
          </motion.div>

          {/* ── Right: Form panel ── */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, x: 28, filter: 'blur(12px)' }}
            animate={
              shouldReduce
                ? undefined
                : isPanelInView
                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                : { opacity: 0, x: 28, filter: 'blur(12px)' }
            }
            transition={{ duration: 0.95, ease: EASE, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="surface-primary"
                  style={{
                    padding: 'clamp(2rem, 3.5vw, 3rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    alignItems: 'flex-start',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 380,
                    justifyContent: 'center',
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: '-20%',
                      left: '-10%',
                      width: '60%',
                      height: '60%',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, rgba(211,253,81,0.07), transparent 70%)',
                      filter: 'blur(40px)',
                      pointerEvents: 'none',
                    }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0a0a0a',
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={22} strokeWidth={3} />
                  </motion.div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                      fontStyle: 'italic',
                      color: 'var(--text)',
                      lineHeight: 1.1,
                      position: 'relative',
                      margin: 0,
                    }}
                  >
                    Danke für Ihre Nachricht.
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.95rem',
                      fontWeight: 300,
                      color: 'var(--muted)',
                      lineHeight: 1.75,
                      position: 'relative',
                      margin: 0,
                    }}
                  >
                    Benedikt oder Maximilian meldet sich persönlich —
                    in der Regel innerhalb von 24 Stunden.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  variants={shouldReduce ? undefined : staggerContainer(0.06)}
                  initial={shouldReduce ? undefined : 'hidden'}
                  animate={shouldReduce ? undefined : isPanelInView ? 'visible' : 'hidden'}
                  className="surface-primary"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Form ambient glow */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      bottom: '-15%',
                      right: '-10%',
                      width: '45%',
                      height: '45%',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, rgba(211,253,81,0.028), transparent 70%)',
                      filter: 'blur(60px)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Name + Company */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      id="field-name"
                      label="Ihr Name *"
                      error={errors.name?.message}
                      shouldReduce={shouldReduce}
                    >
                      <input
                        id="field-name"
                        {...register('name')}
                        placeholder="Max Mustermann"
                        style={glassInput}
                        ref={(el) => {
                          register('name').ref(el)
                          attachGlassFocus(el)
                        }}
                      />
                    </FormField>
                    <FormField id="field-company" label="Unternehmen (optional)" shouldReduce={shouldReduce}>
                      <input
                        id="field-company"
                        {...register('company')}
                        placeholder="Muster GmbH"
                        style={glassInput}
                        ref={(el) => {
                          register('company').ref(el)
                          attachGlassFocus(el)
                        }}
                      />
                    </FormField>
                  </div>

                  <FormField
                    id="field-email"
                    label="E-Mail-Adresse *"
                    error={errors.email?.message}
                    shouldReduce={shouldReduce}
                  >
                    <input
                      id="field-email"
                      {...register('email')}
                      type="email"
                      placeholder="max@muster.de"
                      style={glassInput}
                      ref={(el) => {
                        register('email').ref(el)
                        attachGlassFocus(el)
                      }}
                    />
                  </FormField>

                  <FormField
                    id="field-message"
                    label="Kurze Projektbeschreibung *"
                    error={errors.message?.message}
                    shouldReduce={shouldReduce}
                  >
                    <div style={{ position: 'relative' }}>
                      <textarea
                        id="field-message"
                        {...register('message')}
                        placeholder="Wir sind ein Handwerksbetrieb aus Koblenz und suchen eine neue Website…"
                        rows={4}
                        style={{ ...glassInput, resize: 'vertical', paddingBottom: '2.2rem' }}
                        ref={(el) => {
                          register('message').ref(el)
                          if (el) attachGlassFocus(el as unknown as HTMLInputElement)
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '0.6rem',
                          right: '0.9rem',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.63rem',
                          letterSpacing: '0.06em',
                          color:
                            (messageValue?.length ?? 0) >= 20
                              ? 'rgba(211,253,81,0.7)'
                              : 'rgba(255,255,255,0.25)',
                          transition: 'color 0.3s ease',
                          pointerEvents: 'none',
                        }}
                      >
                        {messageValue?.length ?? 0} Zeichen
                      </span>
                    </div>
                  </FormField>

                  {/* DSGVO */}
                  <motion.div
                    variants={shouldReduce ? undefined : fadeUp}
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        {...register('dsgvo')}
                        type="checkbox"
                        style={{
                          marginTop: '0.2rem',
                          accentColor: 'var(--accent)',
                          flexShrink: 0,
                          width: 16,
                          height: 16,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.78rem',
                          fontWeight: 300,
                          color: 'var(--muted)',
                          lineHeight: 1.6,
                        }}
                      >
                        Ich habe die{' '}
                        <a
                          href="/datenschutz"
                          style={{
                            color: 'rgba(255,255,255,0.72)',
                            textDecoration: 'underline',
                            textUnderlineOffset: '2px',
                          }}
                        >
                          Datenschutzerklärung
                        </a>{' '}
                        gelesen und stimme der Verarbeitung meiner Daten zu. *
                      </span>
                    </label>
                    {errors.dsgvo && (
                      <p
                        style={{
                          fontSize: '0.74rem',
                          color: 'rgba(255,107,107,0.9)',
                          marginTop: '0.1rem',
                        }}
                      >
                        {errors.dsgvo.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Submit row */}
                  <motion.div
                    variants={shouldReduce ? undefined : fadeUp}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={shouldReduce || loading ? undefined : { scale: 1.03, y: -2 }}
                      whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.55rem',
                        background: loading ? 'transparent' : 'var(--accent)',
                        border: loading
                          ? '1px solid rgba(255,255,255,0.10)'
                          : '1px solid var(--accent)',
                        color: loading ? 'var(--muted)' : '#0a0a0a',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.10em',
                        padding: '0.95rem 2rem',
                        borderRadius: 100,
                        cursor: loading ? 'default' : 'pointer',
                        transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                        boxShadow: loading ? 'none' : '0 0 32px rgba(211,253,81,0.14)',
                      }}
                    >
                      {loading ? 'Wird gesendet…' : 'Nachricht senden'}
                      {!loading && <ArrowRight size={12} />}
                    </motion.button>

                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.72rem',
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.28)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      Unverbindlich. Kein Pitch.
                      <br />
                      Kein Verkaufsdruck.
                    </p>
                  </motion.div>

                  {submitError && (
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,107,107,0.9)', lineHeight: 1.6 }}>
                      {submitError}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

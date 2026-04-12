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
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { fadeUp, staggerContainer, clipRevealUp, blurIn } from '@/lib/animations'
import { Mail, Phone, ArrowRight, Check } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein.'),
  company: z.string().optional(),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  message: z.string().min(20, 'Bitte beschreiben Sie Ihr Projekt kurz (mindestens 20 Zeichen).'),
  dsgvo: z.literal(true, 'Bitte stimmen Sie der Datenschutzerklärung zu.'),
})

type FormData = z.infer<typeof schema>

/* ── Animated form field with focus glow ── */
function FormField({
  label,
  error,
  children,
  delay = 0,
  shouldReduce,
}: {
  label: string
  error?: string
  children: React.ReactNode
  delay?: number
  shouldReduce: boolean | null
}) {
  return (
    <motion.div
      variants={shouldReduce ? undefined : fadeUp}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <label
        style={{
          fontSize: '0.72rem',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--muted)',
          marginBottom: '0.5rem',
          display: 'block',
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
            style={{
              fontSize: '0.75rem',
              color: '#FF6B6B',
              marginTop: '0.35rem',
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const inputBase: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 4,
  color: 'var(--text)',
  fontFamily: 'var(--font-ui)',
  fontSize: '0.95rem',
  fontWeight: 300,
  padding: '0.95rem 1.2rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
}

function focusBind(el: HTMLInputElement | HTMLTextAreaElement | null) {
  if (!el) return
  el.addEventListener('focus', () => {
    el.style.borderColor = 'var(--accent)'
    el.style.boxShadow = '0 0 0 3px rgba(200,255,0,0.08), 0 0 20px rgba(200,255,0,0.04)'
    el.style.background = 'var(--surface-2)'
  })
  el.addEventListener('blur', () => {
    el.style.borderColor = 'var(--border)'
    el.style.boxShadow = 'none'
    el.style.background = 'var(--surface)'
  })
}

/* ── Timeline step ── */
function TimelineStep({
  step,
  text,
  isLast,
  shouldReduce,
}: {
  step: string
  text: string
  isLast: boolean
  shouldReduce: boolean | null
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <div ref={ref} style={{ display: 'flex', gap: '1rem' }}>
      {/* Timeline column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: 24,
        }}
      >
        {/* Dot */}
        <motion.div
          initial={shouldReduce ? undefined : { scale: 0 }}
          animate={shouldReduce ? undefined : isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: Number(step) * 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 12px rgba(200,255,0,0.25)',
            flexShrink: 0,
          }}
        />
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={shouldReduce ? undefined : { scaleY: 0 }}
            animate={shouldReduce ? undefined : isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: Number(step) * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 1,
              flex: 1,
              background: 'linear-gradient(to bottom, var(--accent), var(--border))',
              transformOrigin: 'top',
              marginTop: 4,
              marginBottom: 4,
            }}
          />
        )}
      </div>

      {/* Text */}
      <motion.p
        initial={shouldReduce ? undefined : { opacity: 0, x: -8 }}
        animate={shouldReduce ? undefined : isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: Number(step) * 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: '0.875rem',
          fontWeight: 300,
          color: 'var(--muted)',
          lineHeight: 1.7,
          paddingBottom: isLast ? 0 : '1.25rem',
        }}
      >
        {text}
      </motion.p>
    </div>
  )
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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
      setSubmitError('Verbindungsfehler. Bitte versuchen Sie es erneut oder schreiben Sie direkt an anfragen@metzundpartner.com')
    } finally {
      setLoading(false)
    }
  }

  const timelineSteps = [
    { step: '1', text: 'Wir lesen Ihre Nachricht, machen uns ein Bild und erstellen ein erstes Konzept.' },
    { step: '2', text: 'Wir melden uns innerhalb von 24 Stunden — per E-Mail oder Telefon.' },
    { step: '3', text: 'Wir klären gemeinsam, ob und wie wir helfen können. Kein Druck.' },
  ]

  return (
    <section
      id="kontakt"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="md:py-32"
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.03), transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          <div style={{ overflow: 'hidden', marginBottom: '4rem' }}>
            <motion.h2
              className="display-section"
              variants={shouldReduce ? undefined : clipRevealUp}
            >
              Erzählen Sie uns von Ihrem Projekt.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* ── Left — Context + CTA ── */}
            <motion.div
              variants={shouldReduce ? undefined : staggerContainer(0.1)}
              style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
            >
              <motion.div variants={shouldReduce ? undefined : blurIn}>
                <p
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 300,
                    color: 'var(--muted)',
                    lineHeight: 1.75,
                    marginBottom: '0.75rem',
                  }}
                >
                  Kein langes Hin und Her. Kein unverbindliches Angebot von der Stange.
                </p>
                <p
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 300,
                    color: 'var(--text)',
                    lineHeight: 1.75,
                  }}
                >
                  Buchen Sie direkt einen kostenlosen 30-Minuten-Call —
                  oder schreiben Sie uns.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={shouldReduce ? undefined : fadeUp}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <motion.a
                  href="https://calendly.com/metzundpartner/kennenlerngesprach"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduce ? undefined : { scale: 1.04, y: -2 }}
                  whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '1rem 2.25rem',
                    borderRadius: 100,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    boxShadow: '0 0 30px rgba(200,255,0,0.1)',
                  }}
                >
                  <Phone size={13} />
                  Kostenlosen Call buchen
                  <ArrowRight size={13} />
                </motion.a>

                <a
                  href="mailto:anfragen@metzundpartner.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--muted)',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
                  }}
                >
                  <Mail size={14} />
                  anfragen@metzundpartner.com
                </a>
              </motion.div>

              {/* What happens next — visual timeline */}
              <motion.div
                variants={shouldReduce ? undefined : fadeUp}
                style={{
                  paddingTop: '2.5rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--muted)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Was als nächstes passiert
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {timelineSteps.map(({ step, text }, i) => (
                    <TimelineStep
                      key={step}
                      step={step}
                      text={text}
                      isLast={i === timelineSteps.length - 1}
                      shouldReduce={shouldReduce}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Response badge */}
              <motion.div
                variants={shouldReduce ? undefined : fadeUp}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.6rem 1rem',
                  border: '1px solid var(--border)',
                  borderRadius: 100,
                  alignSelf: 'flex-start',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'block',
                    boxShadow: '0 0 8px var(--accent)',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--muted)',
                  }}
                >
                  Antwort innerhalb von 24h
                </span>
              </motion.div>
            </motion.div>

            {/* ── Right — Form ── */}
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: '3rem',
                      border: '1px solid rgba(200,255,0,0.15)',
                      borderRadius: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                      alignItems: 'flex-start',
                      background: 'rgba(200,255,0,0.02)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Success glow */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        top: '-20%',
                        left: '-10%',
                        width: '60%',
                        height: '60%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(200,255,0,0.06), transparent 70%)',
                        filter: 'blur(40px)',
                        pointerEvents: 'none',
                      }}
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--bg)',
                      }}
                    >
                      <Check size={20} strokeWidth={3} />
                    </motion.div>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontStyle: 'italic',
                        color: 'var(--text)',
                        position: 'relative',
                      }}
                    >
                      Danke für Ihre Nachricht.
                    </p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.75, position: 'relative' }}>
                      Benedikt oder Maximilian meldet sich persönlich bei Ihnen —
                      in der Regel innerhalb von 24 Stunden.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    variants={shouldReduce ? undefined : staggerContainer(0.06)}
                    initial={shouldReduce ? undefined : 'hidden'}
                    animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem',
                      padding: '2.5rem',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      background: 'var(--surface)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Form ambient glow */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        bottom: '-20%',
                        right: '-15%',
                        width: '50%',
                        height: '50%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(200,255,0,0.025), transparent 70%)',
                        filter: 'blur(60px)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Name + Company row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField label="Ihr Name *" error={errors.name?.message} shouldReduce={shouldReduce}>
                        <input
                          {...register('name')}
                          placeholder="Max Mustermann"
                          style={inputBase}
                          ref={(el) => {
                            register('name').ref(el)
                            focusBind(el)
                          }}
                        />
                      </FormField>
                      <FormField label="Unternehmen (optional)" shouldReduce={shouldReduce}>
                        <input
                          {...register('company')}
                          placeholder="Muster GmbH"
                          style={inputBase}
                          ref={(el) => {
                            register('company').ref(el)
                            focusBind(el)
                          }}
                        />
                      </FormField>
                    </div>

                    <FormField label="E-Mail-Adresse *" error={errors.email?.message} shouldReduce={shouldReduce}>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="max@muster.de"
                        style={inputBase}
                        ref={(el) => {
                          register('email').ref(el)
                          focusBind(el)
                        }}
                      />
                    </FormField>

                    <FormField label="Kurze Projektbeschreibung *" error={errors.message?.message} shouldReduce={shouldReduce}>
                      <div style={{ position: 'relative' }}>
                        <textarea
                          {...register('message')}
                          placeholder="Wir sind ein Handwerksbetrieb aus Koblenz und suchen eine neue Website…"
                          rows={4}
                          style={{ ...inputBase, resize: 'vertical', paddingBottom: '2rem' }}
                          ref={(el) => {
                            register('message').ref(el)
                            if (el) focusBind(el as unknown as HTMLInputElement)
                          }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '0.5rem',
                            right: '0.75rem',
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-ui)',
                            color: (messageValue?.length ?? 0) >= 20 ? 'var(--accent)' : 'var(--muted)',
                            letterSpacing: '0.06em',
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
                            fontSize: '0.78rem',
                            fontWeight: 300,
                            color: 'var(--muted)',
                            lineHeight: 1.6,
                          }}
                        >
                          Ich habe die{' '}
                          <a
                            href="/datenschutz"
                            style={{ color: 'var(--text)', textDecoration: 'underline' }}
                          >
                            Datenschutzerklärung
                          </a>{' '}
                          gelesen und stimme der Verarbeitung meiner Daten zu. *
                        </span>
                      </label>
                      {errors.dsgvo && (
                        <p style={{ fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.2rem' }}>
                          {errors.dsgvo.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={shouldReduce ? undefined : fadeUp}>
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
                          gap: '0.6rem',
                          background: loading ? 'transparent' : 'var(--accent)',
                          border: loading ? '1px solid var(--border)' : '1px solid var(--accent)',
                          color: loading ? 'var(--muted)' : 'var(--bg)',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          padding: '1rem 2.25rem',
                          borderRadius: 100,
                          cursor: loading ? 'default' : 'pointer',
                          transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                          boxShadow: loading ? 'none' : '0 0 30px rgba(200,255,0,0.1)',
                        }}
                      >
                        {loading ? 'Wird gesendet…' : 'Nachricht senden'}
                        {!loading && <ArrowRight size={13} />}
                      </motion.button>
                    </motion.div>

                    <motion.p
                      variants={shouldReduce ? undefined : fadeUp}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 300,
                        color: 'var(--muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      Unverbindlich. Kein Pitch. Kein Verkaufsdruck.
                    </motion.p>

                    {submitError && (
                      <p style={{ fontSize: '0.8rem', color: '#FF6B6B', lineHeight: 1.6 }}>
                        {submitError}
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

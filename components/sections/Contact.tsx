'use client'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer, fadeIn } from '@/lib/animations'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Mail, Phone } from 'lucide-react'
import StarBorder from '@/components/StarBorder'

const schema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein.'),
  company: z.string().optional(),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  message: z.string().min(20, 'Bitte beschreiben Sie Ihr Projekt kurz (mindestens 20 Zeichen).'),
  dsgvo: z.literal(true, 'Bitte stimmen Sie der Datenschutzerklärung zu.'),
})

type FormData = z.infer<typeof schema>

const inputStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 4,
  color: 'var(--text)',
  fontFamily: 'var(--font-ui)',
  fontSize: '0.95rem',
  fontWeight: 300,
  padding: '0.9rem 1.2rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 400,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  color: 'var(--muted)',
  marginBottom: '0.4rem',
  display: 'block',
}

const errorStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#FF6B6B',
  marginTop: '0.3rem',
}

function FormField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (_data: FormData) => {
    setLoading(true)
    // Simulate async submit — replace with actual API call
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const focusStyle = (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    if (!el) return
    el.addEventListener('focus', () => {
      el.style.borderColor = 'var(--accent)'
      el.style.boxShadow = '0 0 0 3px rgba(200,255,0,0.1)'
    })
    el.addEventListener('blur', () => {
      el.style.borderColor = 'var(--border)'
      el.style.boxShadow = 'none'
    })
  }

  return (
    <section
      id="kontakt"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        borderTop: '1px solid var(--border)',
      }}
      className="md:py-32"
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={shouldReduce ? undefined : fadeUp} style={{ marginBottom: '1.25rem' }}>
            <SectionLabel>Kontakt</SectionLabel>
          </motion.div>
          <motion.h2
            className="display-section"
            variants={shouldReduce ? undefined : fadeUp}
            style={{ marginBottom: '4rem' }}
          >
            Erzählen Sie uns von Ihrem Projekt.
          </motion.h2>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            {/* Left — Context */}
            <motion.div
              variants={shouldReduce ? undefined : fadeUp}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 300,
                  color: 'var(--muted)',
                  lineHeight: 1.75,
                }}
              >
                Kein langes Hin und Her.
                <br />
                Kein unverbindliches Angebot von der Stange.
              </p>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 300,
                  color: 'var(--text)',
                  lineHeight: 1.75,
                }}
              >
                Buchen Sie direkt einen kostenlosen 30-Minuten-Call mit Benedikt oder Maximilian —
                oder schreiben Sie uns.
                <br />
                <br />
                <span style={{ color: 'var(--muted)' }}>Wir antworten innerhalb von 24 Stunden.</span>
              </p>

              {/* Calendly CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <StarBorder
                  as="a"
                  href="https://calendly.com/metzundpartner"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={14} />
                  Kostenlosen Call buchen →
                </StarBorder>

                <a
                  href="mailto:hallo@metzundpartner.de"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--muted)',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
                  }}
                >
                  <Mail size={14} />
                  hallo@metzundpartner.de
                </a>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div variants={shouldReduce ? undefined : fadeUp}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    variants={shouldReduce ? undefined : fadeIn}
                    initial={shouldReduce ? undefined : 'hidden'}
                    animate={shouldReduce ? undefined : 'visible'}
                    style={{
                      padding: '3rem',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'var(--accent-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                      }}
                    >
                      ✓
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem',
                        fontStyle: 'italic',
                        color: 'var(--text)',
                      }}
                    >
                      Danke —
                    </p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                      Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                  >
                    <FormField label="Ihr Name *" error={errors.name?.message}>
                      <input
                        {...register('name')}
                        placeholder="Max Mustermann"
                        style={inputStyle}
                        ref={(el) => {
                          register('name').ref(el)
                          focusStyle(el)
                        }}
                      />
                    </FormField>

                    <FormField label="Ihr Unternehmen (optional)">
                      <input
                        {...register('company')}
                        placeholder="Muster GmbH"
                        style={inputStyle}
                        ref={(el) => {
                          register('company').ref(el)
                          focusStyle(el)
                        }}
                      />
                    </FormField>

                    <FormField label="E-Mail-Adresse *" error={errors.email?.message}>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="max@muster.de"
                        style={inputStyle}
                        ref={(el) => {
                          register('email').ref(el)
                          focusStyle(el)
                        }}
                      />
                    </FormField>

                    <FormField
                      label="Kurze Projektbeschreibung *"
                      error={errors.message?.message}
                    >
                      <textarea
                        {...register('message')}
                        placeholder="Wir sind ein Handwerksbetrieb aus Koblenz und suchen eine neue Website…"
                        rows={4}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        ref={(el) => {
                          register('message').ref(el)
                          if (el) focusStyle(el as unknown as HTMLInputElement)
                        }}
                      />
                    </FormField>

                    {/* DSGVO */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
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
                            fontSize: '0.8rem',
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
                          gelesen und stimme der Verarbeitung meiner Daten zur Kontaktaufnahme zu. *
                        </span>
                      </label>
                      {errors.dsgvo && <p style={errorStyle}>{errors.dsgvo.message}</p>}
                    </div>

                    <StarBorder
                      as="button"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Wird gesendet…' : 'Nachricht senden →'}
                    </StarBorder>
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

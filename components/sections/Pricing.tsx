'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const target = document.getElementById('kontakt')
  if (!target) return
  // Scroll to the heading block directly — nav height (72px) + small buffer
  const offset = 80
  const top = target.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    positioning:
      'Für kleine Unternehmen, die eine professionelle digitale Grundlage schaffen möchten',
    monthly: '149 €',
    setup: '490 €',
    includes: null,
    features: [
      'Individuelle Website mit bis zu 5 Seiten',
      'Professionelles Design und technisches Setup',
      'Hosting, SSL und laufende Wartung',
      'Mobile Optimierung',
      'Basis On-Page-SEO-Setup',
      'Google Search Console Einrichtung',
      '1 Inhaltsanpassung pro Monat',
      'Monatlicher technischer Check',
    ],
    idealFor:
      'Handwerksbetriebe, lokale Dienstleister und junge Unternehmen, die online professionell sichtbar sein möchten',
    cta: 'Mit Starter starten',
    ctaHref: '#kontakt',
    highlighted: false,
    badge: null,
  },
  {
    id: 'growth',
    name: 'Growth',
    positioning:
      'Für Unternehmen, die mit ihrer Website gezielt mehr Anfragen gewinnen möchten',
    monthly: '349 €',
    setup: '990 €',
    includes: 'Starter',
    features: [
      'Website mit bis zu 10 Seiten',
      'Solide Local-SEO-Grundlage',
      'Unterstützung beim Google Business Profile',
      'Technische SEO-Optimierungen',
      'Keyword-Tracking',
      'Bis zu 3 Inhaltsanpassungen pro Monat',
      'Monatliches Reporting',
      'Priorisierte Rückmeldung',
    ],
    idealFor:
      'Etablierte KMU, wachsende lokale Unternehmen und Betriebe, die ihre Sichtbarkeit aktiv ausbauen möchten',
    cta: 'Growth wählen',
    ctaHref: '#kontakt',
    highlighted: true,
    badge: 'Am beliebtesten',
  },
  {
    id: 'pro',
    name: 'Pro',
    positioning:
      'Für Unternehmen, die ihre Website als laufenden Wachstumshebel nutzen möchten',
    monthly: '799 €',
    setup: '1.990 €',
    includes: 'Growth',
    features: [
      'Bis zu 20 Seiten und Landingpages',
      'Laufender SEO-Ausbau',
      'Themen- und Inhaltsplanung',
      'Conversion-orientierte Optimierungen',
      'Wettbewerbsanalyse',
      'Schnellere Reaktionszeiten',
      'Vierteljährlicher Strategie-Call',
    ],
    idealFor:
      'Ambitionierte Unternehmen, Betriebe mit mehreren Leistungsbereichen und Firmen, die einen langfristigen digitalen Partner suchen',
    cta: 'Pro anfragen',
    ctaHref: '#kontakt',
    highlighted: false,
    badge: null,
  },
] as const

const trustItems = [
  'Hosting inklusive',
  'Laufende Wartung enthalten',
  'Transparente Erweiterungen möglich',
  'Direkter Ansprechpartner',
]

// ─── Check icon ───────────────────────────────────────────────────────────────

function CheckIcon({ faint }: { faint?: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: 3 }}
    >
      <path
        d="M1.5 5L3.5 7.5L8.5 2.5"
        stroke={faint ? 'rgba(211,253,81,0.30)' : 'rgba(211,253,81,0.56)'}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Pricing card ─────────────────────────────────────────────────────────────

function PricingCard({
  plan,
  index,
  isInView,
  shouldReduce,
}: {
  plan: (typeof plans)[number]
  index: number
  isInView: boolean
  shouldReduce: boolean | null
}) {
  const { highlighted } = plan

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 28 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 28 }
      }
      transition={{ duration: 0.88, ease: EASE, delay: 0.14 + index * 0.10 }}
      style={{ position: 'relative', isolation: 'isolate', display: 'flex' }}
    >
      {/* Warm atmosphere bloom — Growth only */}
      {highlighted && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-28% -20%',
            background:
              'radial-gradient(ellipse at 50% 42%, rgba(212,131,10,0.20) 0%, rgba(184,134,11,0.08) 50%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      )}

      {/* Card surface */}
      <div
        className={highlighted ? 'surface-primary' : 'surface-secondary'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: 'clamp(1.25rem, 2vw, 1.875rem)',
          ...(highlighted
            ? {
                borderColor: 'rgba(255,255,255,0.28)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.30), 0 32px 90px rgba(0,0,0,0.48), 0 0 60px rgba(212,131,10,0.18), 0 0 120px rgba(212,131,10,0.08)',
              }
            : {}),
        }}
      >
        {/* Warm top edge — Growth only, stronger */}
        {highlighted && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: '8%',
              right: '8%',
              height: 2,
              background:
                'linear-gradient(90deg, transparent, rgba(212,131,10,0.80), rgba(255,255,255,0.22), rgba(212,131,10,0.80), transparent)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}

        {/* Badge */}
        {plan.badge && (
          <div
            style={{
              position: 'absolute',
              top: 'clamp(1.1rem, 1.8vw, 1.5rem)',
              right: 'clamp(1.1rem, 1.8vw, 1.5rem)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.28rem 0.75rem',
              background:
                'linear-gradient(180deg, rgba(211,253,81,0.18), rgba(211,253,81,0.07))',
              border: '1px solid rgba(211,253,81,0.38)',
              borderRadius: 999,
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              boxShadow: 'inset 0 1px 0 rgba(211,253,81,0.18), 0 0 16px rgba(211,253,81,0.10)',
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(211,253,81,0.88)',
                boxShadow: '0 0 6px rgba(211,253,81,0.60)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.62rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: 'rgba(211,253,81,0.92)',
              }}
            >
              {plan.badge}
            </span>
          </div>
        )}

        {/* Plan label */}
        <div
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.60rem',
            fontWeight: 400,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.18em',
            color: highlighted ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.28)',
            marginBottom: '0.4rem',
          }}
        >
          {plan.name}
        </div>

        {/* Positioning line */}
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(0.78rem, 1.0vw, 0.84rem)',
            fontWeight: 300,
            color: highlighted ? 'rgba(255,255,255,0.48)' : 'rgba(255,255,255,0.38)',
            lineHeight: 1.55,
            margin: '0 0 0.85rem 0',
            paddingRight: plan.badge ? '5rem' : 0,
          }}
        >
          {plan.positioning}
        </p>

        {/* Price block — monthly dominant; /Monat + setup on one secondary line */}
        <div
          style={{
            paddingBottom: '0.9rem',
            marginBottom: '0.9rem',
            borderBottom: '1px solid rgba(255,255,255,0.065)',
          }}
        >
          {/* Dominant monthly number */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.1rem, 3.2vw, 2.85rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: 'var(--text)',
              }}
            >
              {plan.monthly}
            </span>
          </div>

          {/* Unified secondary line: /Monat · zzgl. Setup — one typographic unit */}
          <div
            style={{
              marginTop: '0.26rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.30)',
                letterSpacing: '0.01em',
              }}
            >
              / Monat
            </span>
            <span
              aria-hidden
              style={{
                display: 'block',
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.22)',
                letterSpacing: '0.005em',
              }}
            >
              zzgl. {plan.setup} Setup
            </span>
          </div>
        </div>

        {/* Inheritance note — italic reference, not a feature */}
        {plan.includes && (
          <div style={{ marginBottom: '0.72rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontStyle: 'italic',
                fontSize: '0.69rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.24)',
                letterSpacing: '0.01em',
              }}
            >
              ↳ Enthält alles aus {plan.includes}
            </span>
          </div>
        )}

        {/* Feature list — two-tier opacity for hierarchy */}
        <ul
          style={{
            listStyle: 'none',
            margin: '0 0 1.1rem 0',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.52rem',
            flexGrow: 1,
          }}
        >
          {plan.features.map((feature, i) => {
            const isPrimary = i < 4
            return (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.52rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(0.74rem, 0.92vw, 0.78rem)',
                  fontWeight: 300,
                  color: highlighted
                    ? isPrimary ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.38)'
                    : isPrimary ? 'rgba(255,255,255,0.52)' : 'rgba(255,255,255,0.30)',
                  lineHeight: 1.5,
                }}
              >
                <CheckIcon faint={!isPrimary} />
                {feature}
              </li>
            )
          })}
        </ul>

        {/* Ideal für — indented annotation */}
        <div
          style={{
            marginBottom: '1.25rem',
            paddingLeft: '0.85rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.68rem',
              fontWeight: 400,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.13em',
              color: 'rgba(255,255,255,0.18)',
              marginBottom: '0.25rem',
            }}
          >
            Ideal für
          </div>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.75rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.34)',
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {plan.idealFor}
          </p>
        </div>

        {/* CTA */}
        <a
          href={plan.ctaHref}
          onClick={scrollToContact}
          className={highlighted ? 'button-glass-primary' : 'button-glass-secondary'}
          style={{
            textDecoration: 'none',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.72rem',
            fontWeight: 500,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.12em',
            color: 'var(--text)',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {plan.cta}
        </a>
      </div>
    </motion.div>
  )
}

// ─── Pricing section ──────────────────────────────────────────────────────────

export function Pricing() {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const isCardsInView = useInView(cardsRef, { once: true, margin: '-60px' })
  const isTrustInView = useInView(trustRef, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="preise"
      style={{
        paddingTop: 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'clip',
        overflowClipMargin: '200px',
      }}
    >
      {/* Section atmosphere */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '5%',
          right: '-8%',
          width: '56vw',
          height: '56vw',
          maxWidth: 740,
          maxHeight: 740,
          background:
            'radial-gradient(ellipse at 62% 30%, rgba(184,134,11,0.09) 0%, rgba(212,131,10,0.032) 52%, transparent 72%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '-5%',
          width: '36vw',
          height: '36vw',
          maxWidth: 480,
          maxHeight: 480,
          background:
            'radial-gradient(ellipse at 28% 72%, rgba(184,134,11,0.055) 0%, transparent 64%)',
          filter: 'blur(68px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>

        {/* ── Intro ── */}
        <div
          ref={headerRef}
          style={{ marginBottom: 'clamp(2rem, 3.2vw, 3rem)' }}
        >
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
            style={{ marginBottom: '0.75rem' }}
          >
            <SectionLabel>● Preise</SectionLabel>
          </motion.div>

          <div style={{ overflow: 'hidden', marginBottom: '0.7rem' }}>
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
              transition={{ duration: 0.92, ease: EASE, delay: 0.07 }}
              style={{
                maxWidth: '26ch',
                fontSize: 'clamp(1.55rem, 2.4vw, 2.6rem)',
              }}
            >
              Eine professionelle Website. Klar betreut. Monatlich planbar.
            </motion.h2>
          </div>

          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={
              shouldReduce
                ? undefined
                : isHeaderInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(0.82rem, 1.05vw, 0.90rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.40)',
              lineHeight: 1.65,
              margin: '0 0 0.65rem 0',
              maxWidth: '54ch',
            }}
          >
            Design, Hosting, Wartung und SEO-Support — ein klares monatliches
            Modell für lokale Unternehmen, die online professionell auftreten
            möchten, ohne selbst an Technik und Pflege zu denken.
          </motion.p>

          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
            animate={
              shouldReduce
                ? undefined
                : isHeaderInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.74rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.20)',
              letterSpacing: '0.01em',
              margin: 0,
            }}
          >
            Keine unklaren Einzelangebote. Kein Agenturtheater. Ein sauberes System.
          </motion.p>
        </div>

        {/* ── Pricing cards ── */}
        <div ref={cardsRef} className="pricing-cards-grid">
          {plans.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={i}
              isInView={isCardsInView}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>

        {/* ── Trust strip ── */}
        <motion.div
          ref={trustRef}
          initial={shouldReduce ? undefined : { opacity: 0, y: 14 }}
          animate={
            shouldReduce
              ? undefined
              : isTrustInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 14 }
          }
          transition={{ duration: 0.78, ease: EASE, delay: 0.16 }}
          className="surface-muted pricing-trust-strip"
          style={{
            borderColor: 'rgba(255,255,255,0.10)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 38px rgba(0,0,0,0.22)',
          }}
        >
          {trustItems.map((item, i) => (
            <div key={i} className={`pricing-trust-item${i > 0 ? ' pricing-trust-item--divided' : ''}`}>
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'rgba(211,253,81,0.46)',
                  boxShadow: '0 0 7px rgba(211,253,81,0.28)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.73rem',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.44)',
                  letterSpacing: '0.005em',
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

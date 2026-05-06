'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const target = document.getElementById('kontakt')
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top, behavior: 'smooth' })
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectModule {
  title: string
  description: string
}

interface ProjectOffer {
  kind: 'project'
  id: string
  name: string
  positioning: string
  price: string
  priceSuffix: string
  modules: readonly ProjectModule[]
  cta: string
  ctaHref: string
  highlighted: true
  badge: null
}

interface CareOption {
  kind: 'care'
  id: string
  name: string
  positioning: string
  price: string
  priceSuffix: string
  features: readonly string[]
  cta: string
  ctaHref: string
  highlighted: false
  badge: string
}

type PricingItem = ProjectOffer | CareOption

// ─── Data ─────────────────────────────────────────────────────────────────────

const pricingItems: readonly PricingItem[] = [
  {
    kind: 'project',
    id: 'website-projekt',
    name: 'Website-Projekt',
    positioning:
      'Konzept, Design, Entwicklung und Launch — als klares Projekt mit definiertem Umfang.',
    price: 'ab 490 €',
    priceSuffix: 'einmalig',
    modules: [
      {
        title: 'Konzept & Struktur',
        description: 'Seitenaufbau, Inhalte und klare Nutzerführung',
      },
      {
        title: 'Design & Umsetzung',
        description: 'Individuelles Webdesign, technische Entwicklung, mobil sauber',
      },
      {
        title: 'Launch & Basis-SEO',
        description: 'Veröffentlichung, technische Grundlage und On-Page-Basics',
      },
    ],
    cta: 'Projekt anfragen',
    ctaHref: '#kontakt',
    highlighted: true,
    badge: null,
  },
  {
    kind: 'care',
    id: 'betreuung',
    name: 'Betreuung',
    positioning:
      'Optional nach Launch — für alle, die Hosting, Wartung und technischen Support in einer Hand haben möchten.',
    price: 'ab 99 €',
    priceSuffix: '/ Monat · optional nach Launch',
    features: [
      'Hosting und SSL',
      'Technische Wartung',
      'Inhaltsänderungen',
      'Monatlicher technischer Check',
      'Direkte Rückmeldung bei Fragen',
    ],
    cta: 'Betreuung besprechen',
    ctaHref: '#kontakt',
    highlighted: false,
    badge: 'Optional',
  },
] as const

const trustItems = [
  'Erst Gespräch, dann klares Angebot',
  'Keine Abo-Pflicht',
  'Betreuung optional',
  'Direkter Ansprechpartner',
] as const

// ─── Check icon ───────────────────────────────────────────────────────────────

function CheckIcon() {
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
        stroke="rgba(211,253,81,0.50)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Offer card (project / care) ──────────────────────────────────────────────

function OfferCard({
  item,
  index,
  isInView,
  shouldReduce,
}: {
  item: ProjectOffer | CareOption
  index: number
  isInView: boolean
  shouldReduce: boolean | null
}) {
  const { highlighted } = item
  const isProject = item.kind === 'project'

  return (
    <motion.div
      className={`pricing-card pricing-card--${isProject ? 'project' : 'care'}`}
      initial={shouldReduce ? undefined : { opacity: 0, y: 28 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 28 }
      }
      transition={{ duration: 0.88, ease: EASE, delay: 0.14 + index * 0.1 }}
      style={{ position: 'relative', isolation: 'isolate', display: 'flex' }}
    >
      {/* Warm atmosphere bloom — highlighted card only */}
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
        {/* Warm top edge — highlighted only */}
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

        {/* Badge — "Optional" for care card */}
        {item.badge && (
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
                'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.38)',
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
                color: 'rgba(255,255,255,0.50)',
              }}
            >
              {item.badge}
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
          {item.name}
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
            paddingRight: item.badge ? '5rem' : 0,
          }}
        >
          {item.positioning}
        </p>

        {/* Price block */}
        <div
          style={{
            paddingBottom: highlighted ? '0.75rem' : '0.9rem',
            marginBottom: highlighted ? '0.75rem' : '0.9rem',
            borderBottom: '1px solid rgba(255,255,255,0.065)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
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
              {item.price}
            </span>
          </div>

          <div style={{ marginTop: '0.26rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.30)',
                letterSpacing: '0.01em',
              }}
            >
              {item.priceSuffix}
            </span>
          </div>
        </div>

        {/* Modules (project) / Feature list (care) */}
        {isProject ? (
          <div className="pricing-project-modules">
            {(item as ProjectOffer).modules.map((mod, i) => (
              <div key={i} className="pricing-project-module">
                <div className="pricing-project-module-number">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="pricing-project-module-title">{mod.title}</div>
                <div className="pricing-project-module-body">{mod.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <ul
            className="pricing-features"
            style={{
              listStyle: 'none',
              margin: '0 0 1.1rem 0',
              padding: 0,
              flexGrow: 1,
            }}
          >
            {(item as CareOption).features.map((feature, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.52rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(0.74rem, 0.92vw, 0.78rem)',
                  fontWeight: 300,
                  color: i < 4 ? 'rgba(255,255,255,0.52)' : 'rgba(255,255,255,0.30)',
                  lineHeight: 1.5,
                }}
              >
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Flexible spacer — pushes CTA to card bottom on project card */}
        {isProject && <div style={{ flex: 1 }} aria-hidden />}

        {/* CTA */}
        <div
          style={
            isProject
              ? { borderTop: '1px solid rgba(255,255,255,0.065)', paddingTop: '1.1rem' }
              : {}
          }
        >
          <a
            href={item.ctaHref}
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
            {item.cta}
          </a>
        </div>
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
                maxWidth: '30ch',
                fontSize: 'clamp(1.55rem, 2.4vw, 2.6rem)',
              }}
            >
              Eine professionelle Website. Klarer Einstieg. Betreuung optional.
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
            Konzept, Design, Entwicklung und Launch als klares Projekt. Danach kann
            Betreuung dazukommen — muss aber nicht.
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
            Erst verstehen wir Ihr Projekt. Dann bekommen Sie ein klares Angebot.
          </motion.p>
        </div>

        {/* ── Pricing cards ── */}
        <div ref={cardsRef} className="pricing-cards-grid">
          {pricingItems.map((item, i) => (
            <OfferCard
              key={item.id}
              item={item}
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
            <div
              key={i}
              className={`pricing-trust-item${i > 0 ? ' pricing-trust-item--divided' : ''}`}
            >
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

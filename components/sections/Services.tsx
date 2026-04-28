'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'seo' as const,
    label: 'SEO & Sichtbarkeit',
    body: 'Solide SEO-Grundlagen, Google Business Profile und Keyword-Tracking. Sichtbarkeit, die dauerhaft wirkt.',
  },
  {
    id: 'webdesign' as const,
    label: 'Webdesign & Entwicklung',
    body: 'Individuell gestaltet, technisch sauber, auf Anfragen ausgerichtet. Kein Template — eine Website, die wirklich zu Ihrem Unternehmen passt.',
  },
  {
    id: 'betreuung' as const,
    label: 'Betreuung & Weiterentwicklung',
    body: 'Hosting, Wartung und laufende Optimierungen. Ein langfristiger Partner, kein einmaliger Dienstleister.',
  },
]

type Service = (typeof services)[number]

// ─── Scroll helper ─────────────────────────────────────────────────────────────

function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const target = document.getElementById('kontakt-heading')
  if (!target) return
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

// ─── Scene: SEO — keyword grid + search circle ────────────────────────────────

function SeoScene() {
  const rows = [
    'Rankings · Analytics · SERP · Indexing',
    'Analytics · SERP · Indexing · Rankings',
    'SERP · Indexing · Rankings · Analytics',
    'Indexing · Rankings · Analytics · SERP',
    'Rankings · Analytics · SERP · Indexing',
    'Analytics · SERP · Indexing · Rankings',
    'SERP · Indexing · Rankings · Analytics',
    'Indexing · Rankings · Analytics · SERP',
    'Rankings · Analytics · SERP · Indexing',
  ]

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 340 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}
    >
      <defs>
        <radialGradient id="seoVignette" cx="50%" cy="50%" r="55%">
          <stop offset="25%" stopColor="transparent" stopOpacity="0"/>
          <stop offset="100%" stopColor="rgba(4,4,4,0.88)" stopOpacity="1"/>
        </radialGradient>
      </defs>

      {/* Keyword grid */}
      {rows.map((row, i) => (
        <text
          key={i}
          x={i % 2 === 0 ? 8 : 32}
          y={20 + i * 21}
          fontFamily="sans-serif"
          fontSize="11"
          fill={i % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.085)'}
          letterSpacing="1.5"
        >
          {row}
        </text>
      ))}

      {/* Edge vignette to fade keywords */}
      <rect x="0" y="0" width="340" height="200" fill="url(#seoVignette)"/>

      {/* Search icon ring */}
      <circle cx="170" cy="100" r="36"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.75"/>
      {/* Glass-style inner highlight */}
      <path d="M 136 86 A 36 36 0 0 1 204 86"
        stroke="rgba(255,255,255,0.13)" strokeWidth="0.5" fill="none"/>

      {/* Search icon */}
      <circle cx="163" cy="93" r="12"
        fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"/>
      <line x1="172" y1="102" x2="181" y2="111"
        stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

// ─── Scene: Webdesign — clean browser frame ───────────────────────────────────

function WebdesignScene() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 340 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}
    >
      {/* Subtle shadow layer */}
      <rect x="36" y="28" width="268" height="156" rx="14"
        fill="rgba(0,0,0,0.22)" transform="translate(5,7)"/>

      {/* Browser frame */}
      <rect x="36" y="28" width="268" height="156" rx="14"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.75"/>

      {/* Chrome bar */}
      <rect x="36" y="28" width="268" height="34" rx="14" fill="rgba(255,255,255,0.028)"/>
      <line x1="36" y1="62" x2="304" y2="62"
        stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>

      {/* Traffic dots */}
      <circle cx="56" cy="45" r="4.5" fill="#FF5F57" opacity="0.28"/>
      <circle cx="69" cy="45" r="4.5" fill="#FEBC2E" opacity="0.28"/>
      <circle cx="82" cy="45" r="4.5" fill="#28C840" opacity="0.28"/>

      {/* URL bar */}
      <rect x="98" y="37" width="184" height="16" rx="8"
        fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
      <circle cx="108" cy="45" r="2.5" fill="rgba(211,253,81,0.60)"/>

      {/* Page content — minimal */}
      {/* Nav bar */}
      <rect x="44" y="70" width="252" height="16" rx="3"
        fill="rgba(255,255,255,0.018)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
      {/* Hero heading */}
      <rect x="44" y="96" width="150" height="12" rx="4" fill="rgba(255,255,255,0.07)"/>
      {/* Body lines */}
      <rect x="44" y="114" width="210" height="7" rx="2.5" fill="rgba(255,255,255,0.04)"/>
      <rect x="44" y="125" width="190" height="7" rx="2.5" fill="rgba(255,255,255,0.03)"/>
      {/* CTA block */}
      <rect x="44" y="142" width="82" height="20" rx="10"
        fill="rgba(211,253,81,0.09)" stroke="rgba(211,253,81,0.20)" strokeWidth="0.5"/>
    </svg>
  )
}

// ─── Scene: Betreuung — gentle trend line + refresh mark ─────────────────────

function BetreuungScene() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 340 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="betrLineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.045)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>

      {/* Subtle horizontal grid */}
      {[160, 120, 80, 40].map((y) => (
        <line key={y} x1="20" y1={y} x2="320" y2={y}
          stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
      ))}

      {/* Area fill under line */}
      <path d="M 44 162 C 110 148, 170 128, 230 98 L 296 58 L 296 170 L 44 170 Z"
        fill="url(#betrLineGrad)"/>

      {/* Trend line */}
      <path d="M 44 162 C 110 148, 170 128, 230 98 L 296 58"
        stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" fill="none"/>

      {/* Data points */}
      <circle cx="44"  cy="162" r="3.5" fill="rgba(255,255,255,0.32)"/>
      <circle cx="296" cy="58"  r="5.5" fill="rgba(211,253,81,0.78)"/>
      <circle cx="296" cy="58"  r="10"
        stroke="rgba(211,253,81,0.18)" strokeWidth="0.75" fill="none"/>


      {/* Uptime bar strip — bottom edge */}
      {Array.from({ length: 26 }, (_, i) => (
        <rect key={i}
          x={44 + i * 9.8} y={179} width="7.5" height="10" rx="2"
          fill={i >= 24 ? 'rgba(211,253,81,0.65)' : i === 11 ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.22)'}
          opacity={0.55 + i * 0.017}
        />
      ))}
    </svg>
  )
}

// ─── Scene dispatcher ──────────────────────────────────────────────────────────

function SceneRenderer({ id }: { id: Service['id'] }) {
  if (id === 'seo') return <SeoScene />
  if (id === 'webdesign') return <WebdesignScene />
  return <BetreuungScene />
}

// ─── Service card ──────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
  isInView,
  shouldReduce,
}: {
  service: Service
  index: number
  isInView: boolean
  shouldReduce: boolean | null
}) {
  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
      animate={
        shouldReduce
          ? undefined
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.80, ease: EASE, delay: 0.10 + index * 0.10 }}
      style={{ height: '100%' }}
    >
      <div
        className="surface-primary"
        style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
      >
        {/* Visual zone */}
        <div
          aria-hidden
          style={{
            position: 'relative',
            height: 'clamp(170px, 20vw, 220px)',
            overflow: 'hidden',
            flexShrink: 0,
            background: 'rgba(4,4,4,0.18)',
            borderBottom: '1px solid rgba(255,255,255,0.055)',
          }}
        >
          <SceneRenderer id={service.id} />
          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(6,6,6,0.75) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}/>
        </div>

        {/* Content zone */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(1rem, 1.45vw, 1.25rem)',
          background: 'linear-gradient(180deg, rgba(6,6,6,0.72) 0%, rgba(6,6,6,0.58) 100%)',
        }}>
          {/* Clip-reveal headline */}
          <div style={{ overflow: 'hidden', marginBottom: '0.45rem' }}>
            <motion.h3
              initial={shouldReduce ? undefined : { y: '110%' }}
              animate={shouldReduce ? undefined : isInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.72, ease: EASE, delay: 0.20 + index * 0.10 }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontStyle: 'normal',
                fontSize: 'clamp(1rem, 1.25vw, 1.18rem)',
                fontWeight: 500,
                letterSpacing: '0',
                lineHeight: 1.25,
                color: 'rgba(255,255,255,0.9)',
                margin: 0,
              }}
            >
              {service.label}
            </motion.h3>
          </div>

          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(0.78rem, 1vw, 0.84rem)',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.60,
            margin: 0,
          }}>
            {service.body}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const isGridInView = useInView(gridRef, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="leistungen"
      style={{
        paddingTop: 'clamp(3rem, 6vw, 6rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'clip',
        overflowClipMargin: '200px',
      }}
    >
      {/* Atmosphere */}
      <div aria-hidden style={{
        position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
        width: '60vw', height: '60vw', maxWidth: 720, maxHeight: 720,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(212,131,10,0.07) 0%, transparent 68%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }}/>

      <div className="container-site" style={{ position: 'relative' }}>

        {/* ── Centered header ── */}
        <div
          ref={headerRef}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 3vw, 2.75rem)' }}
        >
          {/* Headline */}
          <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
            <motion.h2
              className="display-section"
              initial={shouldReduce ? undefined : { y: '108%' }}
              animate={shouldReduce ? undefined : isHeaderInView ? { y: '0%' } : { y: '108%' }}
              transition={{ duration: 0.90, ease: EASE, delay: 0.07 }}
              style={{ maxWidth: '22ch', margin: '0 auto' }}
            >
              Leistungen, die Ihre Website wirksam machen.
            </motion.h2>
          </div>

          {/* Subcopy */}
          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduce ? undefined : isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.70, ease: EASE, delay: 0.20 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(0.84rem, 1.18vw, 0.93rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.40)',
              lineHeight: 1.65,
              margin: '0 auto 2rem',
              maxWidth: '48ch',
            }}
          >
            Design, Entwicklung und Sichtbarkeit — alles aus einer Hand,
            maßgeschneidert für Ihr Unternehmen.
          </motion.p>

        </div>

        {/* ── Equal 3-col card grid ── */}
        <div ref={gridRef} className="services-cards-grid">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              isInView={isGridInView}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

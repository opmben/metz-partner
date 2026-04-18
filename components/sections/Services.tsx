'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { fadeUp, staggerContainer, clipRevealUp } from '@/lib/animations'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Offer modules ────────────────────────────────────────────────────────────
const modules = [
  {
    id: 'design',
    label: 'Design',
    headline: 'Visuell eigenständig.',
    body: 'Kein Template. Wir entwickeln visuelle Richtung, Struktur und Interface — auf Ihr Unternehmen und Ihre Zielgruppe abgestimmt.',
  },
  {
    id: 'entwicklung',
    label: 'Entwicklung',
    headline: 'Sauber implementiert.',
    body: 'Performant, responsiv, wartbar. Moderner Stack, schnelle Ladezeiten, editierbar wo es sinnvoll ist.',
  },
  {
    id: 'launch',
    label: 'Launch & Übergabe',
    headline: 'Einsatzbereit übergeben.',
    body: 'Deployment, finale Abstimmung, vollständige Übergabe. Ein fertiges Ergebnis — keine offenen Enden.',
  },
]

// ─── Browser proof visual (inline SVG) ───────────────────────────────────────
function BrowserProofVisual({ isVisible }: { isVisible: boolean }) {
  const go = isVisible
  const t = (dur: number, del: number) => ({ duration: dur, delay: go ? del : 0, ease: EASE })

  const fi = (del: number, dur = 0.5) => ({
    initial: { opacity: 0 },
    animate: go ? { opacity: 1 } : { opacity: 0 },
    transition: t(dur, del),
  })
  const rx = (del: number, dur = 0.5) => ({
    initial: { scaleX: 0, opacity: 0 },
    animate: go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 },
    style: { transformBox: 'fill-box' as const, transformOrigin: 'left center' },
    transition: t(dur, del),
  })
  const pi = (del: number, k = 280) => ({
    initial: { scale: 0, opacity: 0 },
    animate: go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 },
    transition: { ...t(0.45, del), type: 'spring' as const, stiffness: k, damping: 20 },
  })

  return (
    <svg
      viewBox="0 0 560 315"
      fill="none"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    >
      <rect width="560" height="315" fill="#0c0c0c" />

      {/* Ambient glow */}
      <motion.ellipse cx="480" cy="148" rx="120" ry="90" fill="rgba(200,255,0,0.032)" {...fi(1.2, 0.8)} />

      {/* Browser frame */}
      <motion.path
        d="M26,18 H534 Q542,18 542,26 V289 Q542,297 534,297 H26 Q18,297 18,289 V26 Q18,18 26,18 Z"
        stroke="rgba(240,237,232,0.08)" strokeWidth={1} fill="#0C0C0C"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(1.1, 0)}
      />

      {/* Chrome */}
      <motion.rect x="18" y="18" width="524" height="44" fill="#161616" {...fi(0.3, 0.3)} />
      <motion.rect x="18" y="50" width="524" height="12" fill="#161616" {...fi(0.3, 0.3)} />
      <motion.line x1="18" y1="61" x2="542" y2="61" stroke="rgba(240,237,232,0.05)" strokeWidth={1}
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.6, 0.5)}
      />

      {/* Traffic lights */}
      <motion.circle cx="40" cy="40" r="5.5" fill="rgba(255,95,87,0.75)"  {...pi(0.55, 320)} />
      <motion.circle cx="57" cy="40" r="5.5" fill="rgba(255,189,68,0.75)" {...pi(0.65, 320)} />
      <motion.circle cx="74" cy="40" r="5.5" fill="rgba(40,200,64,0.75)"  {...pi(0.75, 320)} />

      {/* URL bar */}
      <motion.rect x="148" y="28" width="264" height="24" rx="12"
        fill="rgba(240,237,232,0.04)" stroke="rgba(240,237,232,0.09)" strokeWidth={1}
        {...fi(0.65, 0.4)}
      />
      <motion.circle cx="164" cy="40" r="4" fill="rgba(200,255,0,0.4)" {...fi(0.75, 0.35)} />
      <motion.rect x="175" y="36" width="115" height="7" rx="3" fill="rgba(240,237,232,0.22)" {...rx(0.8, 0.5)} />

      {/* Page nav */}
      <motion.rect x="18" y="62" width="524" height="42" fill="#0E0E0E" {...fi(0.45, 0.4)} />
      <motion.rect x="18" y="103" width="524" height="1" fill="rgba(240,237,232,0.04)" {...fi(0.3, 0.55)} />
      <motion.rect x="40" y="75" width="72" height="12" rx="3"
        fill="rgba(200,255,0,0.12)" stroke="rgba(200,255,0,0.28)" strokeWidth={0.75}
        {...fi(0.6, 0.55)}
      />
      {([152, 196, 250, 290] as const).map((x, i) => (
        <motion.rect key={x} x={x} y="79" width={([34, 44, 30, 38] as const)[i]} height="5" rx="2"
          fill="rgba(240,237,232,0.12)" {...rx(0.58 + i * 0.07, 0.38)}
        />
      ))}
      <motion.rect x="455" y="69" width="68" height="24" rx="12" fill="rgba(200,255,0,0.85)" {...pi(0.95)} />
      <motion.rect x="466" y="79" width="46" height="5" rx="2" fill="#0C0C0C" {...fi(1.05, 0.3)} />

      {/* Hero section */}
      <motion.rect x="18" y="104" width="524" height="130" fill="#080808" {...fi(0.5, 0.6)} />
      <motion.rect x="40" y="120" width="280" height="18" rx="3" fill="rgba(240,237,232,0.22)" {...rx(0.85, 0.55)} />
      <motion.rect x="40" y="144" width="240" height="16" rx="3" fill="rgba(240,237,232,0.18)" {...rx(0.5, 0.95)} />
      <motion.rect x="40" y="168" width="136" height="16" rx="3" fill="rgba(200,255,0,0.65)"  {...rx(0.5, 1.05)} />
      <motion.rect x="184" y="168" width="80"  height="16" rx="3" fill="rgba(240,237,232,0.18)" {...rx(0.4, 1.13)} />
      <motion.rect x="40" y="196" width="240" height="5" rx="2" fill="rgba(240,237,232,0.12)" {...fi(1.2, 0.35)} />
      <motion.rect x="40" y="206" width="200" height="5" rx="2" fill="rgba(240,237,232,0.08)" {...fi(1.28, 0.35)} />

      {/* CTAs */}
      <motion.rect x="40" y="220" width="118" height="30" rx="15" fill="rgba(200,255,0,0.88)" {...pi(1.28, 260)} />
      <motion.rect x="56" y="233" width="86"  height="5"  rx="2"  fill="#080808" {...fi(1.38, 0.3)} />
      <motion.rect x="168" y="220" width="105" height="30" rx="15"
        fill="rgba(240,237,232,0.05)" stroke="rgba(240,237,232,0.12)" strokeWidth={0.75}
        {...fi(1.35, 0.4)}
      />

      {/* Footer strip */}
      <motion.rect x="18" y="234" width="524" height="63" fill="#0A0A0A" {...fi(0.95, 0.4)} />
      <motion.rect x="40" y="251" width="88" height="32" rx="6"
        fill="rgba(200,255,0,0.07)" stroke="rgba(200,255,0,0.2)" strokeWidth={0.75}
        {...pi(1.4, 240)}
      />
      <motion.circle cx="420" cy="258" r="4" fill="rgba(200,255,0,0.45)" {...fi(1.45, 0.3)} />
      <motion.rect x="430" y="255" width="40" height="5" rx="2" fill="rgba(240,237,232,0.15)" {...fi(1.48, 0.3)} />
    </svg>
  )
}

// ─── Services section ─────────────────────────────────────────────────────────
export function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const isInView = useInView(panelRef, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const reduce = Boolean(shouldReduce)

  return (
    <section
      id="leistungen"
      style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}
    >
      <div className="container-site">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          variants={reduce ? undefined : staggerContainer(0.08)}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : isHeaderInView ? 'visible' : 'hidden'}
          style={{ marginBottom: 'clamp(2rem, 3.5vw, 2.75rem)' }}
        >
          <motion.div variants={reduce ? undefined : fadeUp} style={{ marginBottom: '0.875rem' }}>
            <SectionLabel>● Was Sie bekommen</SectionLabel>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="display-section"
              variants={reduce ? undefined : clipRevealUp}
            >
              Webdesign & Entwicklung.
            </motion.h2>
          </div>
        </motion.div>

        {/* ── Main offer panel ─────────────────────────────────────────────── */}
        <motion.div
          ref={panelRef}
          className="surface-primary"
          initial={reduce ? undefined : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.85, ease: EASE }}
          style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          <div
            style={{
              display: 'grid',
              gap: 'clamp(2rem, 4vw, 3rem)',
            }}
            className="services-layout"
          >

            {/* ── Left: intro + modules + CTA ─────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>

              {/* Intro */}
              <motion.p
                initial={reduce ? undefined : { opacity: 0 }}
                animate={reduce ? undefined : isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                  fontWeight: 300,
                  color: 'var(--text)',
                  lineHeight: 1.8,
                  margin: 0,
                  maxWidth: '52ch',
                }}
              >
                Ein Angebot. Vollständig umgesetzt — von der ersten Idee bis zum fertigen, einsetzbaren Ergebnis.
              </motion.p>

              {/* Module cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '0.75rem',
                }}
              >
                {modules.map((mod, i) => (
                  <motion.div
                    key={mod.id}
                    className="panel-feature"
                    initial={reduce ? undefined : { opacity: 0, y: 14 }}
                    animate={reduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    transition={{ duration: 0.65, ease: EASE, delay: reduce ? 0 : 0.45 + i * 0.1 }}
                    style={{
                      padding: 'clamp(1rem, 1.75vw, 1.375rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.625rem',
                    }}
                  >
                    {/* Label pill */}
                    <span
                      className="surface-floating"
                      style={{
                        display: 'inline-flex',
                        alignSelf: 'flex-start',
                        padding: '0.22rem 0.7rem',
                        fontSize: '0.6rem',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 400,
                        letterSpacing: '0.13em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {mod.label}
                    </span>

                    {/* Headline */}
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        color: 'var(--text)',
                        lineHeight: 1.25,
                        margin: 0,
                      }}
                    >
                      {mod.headline}
                    </p>

                    {/* Body */}
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.78rem',
                        fontWeight: 300,
                        color: 'var(--muted)',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {mod.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 8 }}
                animate={reduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : 0.78 }}
              >
                <a
                  href="#kontakt"
                  className="button-glass-primary"
                  style={{ textDecoration: 'none' }}
                >
                  Projekt anfragen
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" style={{ marginLeft: 4 }}>
                    <path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* ── Right: browser frame proof ───────────────────────────────── */}
            <motion.div
              className="panel-browser"
              initial={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              animate={reduce ? undefined : isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.9, ease: EASE, delay: reduce ? 0 : 0.2 }}
            >
              {/* Chrome row */}
              <div className="browser-chrome">
                <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                  {['rgba(255,95,87,0.65)', 'rgba(255,189,68,0.65)', 'rgba(40,200,64,0.65)'].map((c, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 22,
                    borderRadius: 11,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    paddingLeft: 10,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(200,255,0,0.4)' }} />
                  <div style={{ width: 80, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.16)' }} />
                </div>
              </div>

              {/* Proof visual */}
              <div className="browser-frame-media" style={{ aspectRatio: '16/9' }}>
                <BrowserProofVisual isVisible={isInView && !reduce} />
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

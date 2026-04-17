'use client'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { useRef } from 'react'

const navLinks = [
  { label: 'Projekte', href: '/projekte' },
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Kontakt', href: '/#kontakt' },
]

const legalLinks = [
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'Impressum', href: '/impressum' },
]

export function Footer() {
  const ctaRef = useRef(null)
  const navRef = useRef(null)
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-60px' })
  const isNavInView = useInView(navRef, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  return (
    <footer style={{ position: 'relative' }}>

      {/* ── Closing CTA glass panel ── */}
      <div
        style={{
          padding: '5rem 0 6rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Atmospheric bloom behind CTA */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70vw',
            height: '50vw',
            maxWidth: 800,
            maxHeight: 500,
            background:
              'radial-gradient(ellipse at center, rgba(184,134,11,0.07) 0%, rgba(212,131,10,0.04) 40%, transparent 65%)',
            filter: 'blur(72px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-site" style={{ position: 'relative' }}>
          <motion.div
            ref={ctaRef}
            initial={shouldReduce ? undefined : { opacity: 0, y: 36 }}
            animate={
              shouldReduce
                ? undefined
                : isCtaInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 36 }
            }
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="panel-process"
            style={{
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
              maxWidth: 680,
              margin: '0 auto',
            }}
          >
            {/* Amber glow dot */}
            <motion.div
              initial={shouldReduce ? undefined : { scale: 0 }}
              animate={
                shouldReduce
                  ? undefined
                  : isCtaInView
                  ? { scale: 1 }
                  : { scale: 0 }
              }
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--warm-amber)',
                boxShadow: '0 0 20px rgba(212,131,10,0.6)',
                flexShrink: 0,
              }}
            />

            <motion.p
              initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
              animate={
                shouldReduce
                  ? undefined
                  : isCtaInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.7rem, 3.2vw, 2.75rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Bereit für eine Website,
              <br />
              die wirklich für Sie arbeitet?
            </motion.p>

            <motion.p
              initial={shouldReduce ? undefined : { opacity: 0 }}
              animate={
                shouldReduce
                  ? undefined
                  : isCtaInView
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.7, delay: 0.32 }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.925rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 420,
              }}
            >
              Kein Pitch. Kein Druck. Nur ein ehrliches Gespräch — kostenlos, 30 Minuten.
            </motion.p>

            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
              animate={
                shouldReduce
                  ? undefined
                  : isCtaInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.7, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                href="/#kontakt"
                className="button-glass-primary"
                whileHover={shouldReduce ? undefined : { scale: 1.04, y: -2 }}
                whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Projekt anfragen
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Separator ── */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
        }}
      />

      {/* ── Brand + nav ── */}
      <div
        ref={navRef}
        className="container-site"
        style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}
      >
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
          animate={
            shouldReduce
              ? undefined
              : isNavInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ gap: '2rem' }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <Image
              src="/font2 tra 2.svg"
              alt="Metz & Partner"
              width={148}
              height={34}
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.78rem',
                fontWeight: 300,
                color: 'var(--muted)',
                opacity: 0.7,
              }}
            >
              Webdesign aus Koblenz. Für die Region.
            </span>
          </div>

          <nav
            style={{
              display: 'flex',
              gap: '1.75rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.72rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--muted)',
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
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* ── Legal row ── */}
      <div
        style={{
          height: 1,
          margin: '0 clamp(1.5rem, 4vw, 3rem)',
          background: 'rgba(255,255,255,0.05)',
        }}
      />
      <div className="container-site" style={{ paddingTop: '1.25rem', paddingBottom: '2rem' }}>
        <div
          style={{ gap: '1rem' }}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  opacity: 0.5,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = '0.5'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.7rem',
              fontWeight: 300,
              color: 'var(--muted)',
              opacity: 0.38,
              margin: 0,
            }}
          >
            © 2025 Metz &amp; Partner, Koblenz
          </p>
        </div>
      </div>
    </footer>
  )
}

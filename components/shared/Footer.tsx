'use client'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      {/* ── Closing CTA ── */}
      <div
        ref={ref}
        className="container-site"
        style={{
          paddingTop: '5rem',
          paddingBottom: '5rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
          animate={shouldReduce ? undefined : isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ gap: '2.5rem' }}
        >
          <div style={{ maxWidth: 520 }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.15,
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              Bereit für eine Website,
              <br />
              die wirklich für Sie arbeitet?
            </p>
            <p
              style={{
                fontSize: '0.95rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.7,
              }}
            >
              Kein Pitch. Kein Druck. Nur ein ehrliches Gespräch — kostenlos, 30 Minuten.
            </p>
          </div>

          <motion.a
            href="/#kontakt"
            whileHover={shouldReduce ? undefined : { scale: 1.04, y: -2 }}
            whileTap={shouldReduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.8rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.9rem 2rem',
              borderRadius: 100,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            Projekt anfragen
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>
      </div>

      {/* ── Brand + nav ── */}
      <div
        className="container-site"
        style={{
          paddingTop: '3rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{ gap: '2rem' }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Metz &amp; Partner
            </span>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8rem',
                fontWeight: 300,
                color: 'var(--muted)',
              }}
            >
              Webdesign aus Koblenz. Für die Region.
            </span>
          </div>

          <nav
            style={{
              display: 'flex',
              gap: '1.5rem',
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
        </div>
      </div>

      {/* ── Legal row ── */}
      <div className="container-site" style={{ paddingTop: '1.25rem', paddingBottom: '1.5rem' }}>
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
                  opacity: 0.55,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = '0.55'
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
              opacity: 0.45,
            }}
          >
            © 2025 Metz &amp; Partner, Koblenz
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
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
  const ctaRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <footer style={{ borderTop: '1px solid var(--border)', position: 'relative' }}>
      {/* ── Closing CTA — cinematic reveal ── */}
      <motion.div
        ref={ctaRef}
        className="container-site"
        initial={shouldReduce ? undefined : { opacity: 0, scale: 0.95 }}
        animate={
          shouldReduce
            ? undefined
            : ctaInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{
          paddingTop: '6rem',
          paddingBottom: '6rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          className="flex flex-col items-center text-center"
          style={{ gap: '2.5rem', maxWidth: 600, margin: '0 auto' }}
        >
          {/* Decorative dot */}
          <motion.div
            initial={shouldReduce ? undefined : { scale: 0 }}
            animate={shouldReduce ? undefined : ctaInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 20px rgba(200,255,0,0.3)',
            }}
          />

          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
            animate={shouldReduce ? undefined : ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Bereit für eine Website,
            <br />
            die wirklich{' '}
            <span style={{ color: 'var(--accent)' }}>für Sie arbeitet?</span>
          </motion.p>

          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0 }}
            animate={shouldReduce ? undefined : ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '0.95rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}
          >
            Kein Pitch. Kein Druck. Nur ein ehrliches Gespräch — kostenlos, 30 Minuten.
          </motion.p>

          <motion.a
            href="/#kontakt"
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduce ? undefined : ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduce ? undefined : { scale: 1.05, y: -3 }}
            whileTap={shouldReduce ? undefined : { scale: 0.97 }}
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.8rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '1rem 2.5rem',
              borderRadius: 100,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              boxShadow: '0 0 50px rgba(200,255,0,0.12)',
            }}
          >
            Projekt anfragen
            <ArrowRight size={14} />
          </motion.a>
        </div>
      </motion.div>

      {/* ── Brand + nav ── */}
      <div
        ref={ref}
        className="container-site"
        style={{
          paddingTop: '3rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduce ? undefined : isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ gap: '2rem' }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Image
              src="/font2 tra 2.svg"
              alt="Metz & Partner"
              width={160}
              height={36}
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
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
        </motion.div>
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

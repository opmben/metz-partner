'use client'
import Link from 'next/link'

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
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      {/* Brand close */}
      <div
        className="container-site"
        style={{
          paddingTop: '4rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{ gap: '2rem' }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Metz & Partner
            </span>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
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
                  fontSize: '0.75rem',
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

      {/* Legal row */}
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
                  fontSize: '0.72rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  opacity: 0.6,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = '0.6'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.72rem',
              fontWeight: 300,
              color: 'var(--muted)',
              opacity: 0.5,
            }}
          >
            © 2025 Metz & Partner, Koblenz
          </p>
        </div>
      </div>
    </footer>
  )
}

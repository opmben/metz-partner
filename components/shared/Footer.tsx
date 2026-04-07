'use client'
import Link from 'next/link'

const footerLinks = [
  { label: 'Projekte', href: '/projekte' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Kontakt', href: '#kontakt' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'Impressum', href: '/impressum' },
]

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '3rem 0',
      }}
    >
      <div className="container-site">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--text)',
                letterSpacing: '-0.01em',
              }}
            >
              Metz & Partner
            </span>
            <span
              style={{
                fontSize: '0.875rem',
                color: 'var(--muted)',
                fontWeight: 300,
              }}
            >
              Webdesign aus Koblenz. Für die Region.
            </span>
          </div>

          {/* Bottom row */}
          <div
            style={{ gap: '1rem' }}
            className="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
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

            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--muted)',
                fontWeight: 300,
              }}
            >
              © 2025 Metz & Partner, Koblenz. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

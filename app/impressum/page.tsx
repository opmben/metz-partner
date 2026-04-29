import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Impressum — Metz & Partner',
  alternates: { canonical: 'https://metzundpartner.com/impressum' },
}

const sectionHeading: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--text)',
  marginBottom: '0.75rem',
}

export default function ImpressumPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 'clamp(5rem, 10vw, 8rem)', paddingBottom: 'clamp(3.5rem, 8vw, 6rem)' }}>
        <div className="container-site" style={{ maxWidth: 680 }}>

          {/* Breadcrumb */}
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.72rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              textDecoration: 'none',
              marginBottom: '2.5rem',
              transition: 'color 0.2s ease',
            }}
          >
            ← Startseite
          </Link>

          {/* Header */}
          <div style={{ marginBottom: '3.5rem' }}>
            <p
              style={{
                fontSize: '0.65rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--accent)',
                marginBottom: '0.75rem',
              }}
            >
              Rechtliches
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              Impressum
            </h1>
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.7,
              }}
            >
              Angaben gemäß § 5 DDG. Verantwortlich für diese Website sind Benedikt und Maximilian
              Metz.
            </p>
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              fontSize: '0.9rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.8,
            }}
          >
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <p style={sectionHeading}>Angaben gemäß § 5 DDG</p>
              <p>
                Benedikt Metz, Maximilian Metz & Pavel Baev GbR
                <br />
                Metz & Partner Webdesign
                <br />
                Liesenfelder Straße 64
                <br />
                56281 Emmelshausen
                <br />
                Deutschland
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <p style={sectionHeading}>Kontakt</p>
              <p>
                Telefon:{' '}
                <a
                  href="tel:+4917647376593"
                  style={{ color: 'var(--text)', textDecoration: 'underline' }}
                >
                  0176 47376593
                </a>
                <br />
                E-Mail:{' '}
                <a
                  href="mailto:anfragen@metzundpartner.com"
                  style={{ color: 'var(--text)', textDecoration: 'underline' }}
                >
                  anfragen@metzundpartner.com
                </a>
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <p style={sectionHeading}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</p>
              <p>
                Benedikt Metz & Maximilian Metz
                <br />
                Liesenfelder Straße 64, 56281 Emmelshausen
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <p style={sectionHeading}>Haftungsausschluss</p>
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir keine Gewähr
                übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte
                auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

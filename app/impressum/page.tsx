import type { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Impressum — Metz & Partner',
}

export default function ImpressumPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div className="container-site" style={{ maxWidth: 720 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            Impressum
          </h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              fontSize: '0.95rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.75,
            }}
          >
            <section>
              <h2
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--text)',
                  marginBottom: '0.75rem',
                }}
              >
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                Metz & Partner GbR
                <br />
                Benedikt Metz & Maximilian Metz
                <br />
                [Straße und Hausnummer]
                <br />
                56xxx Koblenz
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--text)',
                  marginBottom: '0.75rem',
                }}
              >
                Kontakt
              </h2>
              <p>
                E-Mail:{' '}
                <a
                  href="mailto:hallo@metzundpartner.de"
                  style={{ color: 'var(--text)', textDecoration: 'underline' }}
                >
                  hallo@metzundpartner.de
                </a>
              </p>
            </section>

            <section>
              <h2
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--text)',
                  marginBottom: '0.75rem',
                }}
              >
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p>
                Benedikt Metz & Maximilian Metz
                <br />
                [Adresse wie oben]
              </p>
            </section>

            <section>
              <h2
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--text)',
                  marginBottom: '0.75rem',
                }}
              >
                Haftungsausschluss
              </h2>
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir keine Gewähr
                übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
                diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

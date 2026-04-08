import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Datenschutz — Metz & Partner',
}

const sectionHeading: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--text)',
  marginBottom: '0.75rem',
}

const sections = [
  {
    title: 'Verantwortlicher',
    content:
      'Verantwortlich für die Datenverarbeitung auf dieser Website ist: Metz & Partner GbR, Benedikt Metz & Maximilian Metz, [Adresse], Koblenz. E-Mail: hallo@metzundpartner.de',
  },
  {
    title: 'Erhebung und Speicherung personenbezogener Daten',
    content:
      'Beim Besuch unserer Website werden automatisch Informationen erfasst, die Ihr Browser an unseren Server übermittelt. Dies sind: Browsertyp/-version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage. Diese Daten sind nicht bestimmten Personen zuordenbar.',
  },
  {
    title: 'Kontaktformular',
    content:
      'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.',
  },
  {
    title: 'Calendly',
    content:
      'Für die Buchung von Terminen nutzen wir den Dienst Calendly (Calendly LLC, Atlanta, USA). Wenn Sie einen Termin buchen, werden die von Ihnen angegebenen Daten an Calendly übermittelt. Weitere Informationen finden Sie in der Datenschutzerklärung von Calendly unter calendly.com/privacy.',
  },
  {
    title: 'Analyse / Statistik',
    content:
      'Diese Website verwendet Plausible Analytics, einen datenschutzfreundlichen Analysedienst ohne Cookies und ohne personenbezogene Daten. Es wird kein Tracking über Geräte oder Websites hinweg durchgeführt. Ein Cookie-Banner ist daher nicht erforderlich.',
  },
  {
    title: 'Google Fonts',
    content:
      'Diese Website verwendet Google Fonts ausschließlich lokal eingebunden (via next/font). Es werden keine Daten an Google-Server übertragen.',
  },
  {
    title: 'Ihre Rechte',
    content:
      'Sie haben das Recht auf Auskunft über die bei uns gespeicherten personenbezogenen Daten, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Datenübertragbarkeit. Zur Ausübung dieser Rechte wenden Sie sich bitte an hallo@metzundpartner.de.',
  },
]

export default function DatenschutzPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
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
              Datenschutzerklärung
            </h1>
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.7,
              }}
            >
              Transparenz über den Umgang mit Ihren Daten. Diese Website erhebt keine Cookies und
              nutzt kein Cross-Site-Tracking.
            </p>
          </div>

          {/* Sections */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              fontSize: '0.9rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.8,
            }}
          >
            {sections.map((section) => (
              <div
                key={section.title}
                style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', paddingBottom: '2rem' }}
              >
                <p style={sectionHeading}>{section.title}</p>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

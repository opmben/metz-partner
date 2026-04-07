import type { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Datenschutz — Metz & Partner',
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
            Datenschutzerklärung
          </h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              fontSize: '0.95rem',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.75,
            }}
          >
            {sections.map((section) => (
              <section key={section.title}>
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
                  {section.title}
                </h2>
                <p>{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

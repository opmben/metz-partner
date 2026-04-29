export const faqs = [
  {
    q: 'Was kostet eine Website von Metz & Partner?',
    a: 'Unsere Pakete starten ab 890 € Einmalig plus einer monatlichen Servicepauschale ab 199 €. Was Sie genau bezahlen, hängt vom Umfang ab — aber es gibt keine versteckten Kosten. Ein erstes Gespräch ist kostenlos und unverbindlich.',
  },
  {
    q: 'Wie lange dauert die Entwicklung meiner Website?',
    a: 'In der Regel zwei bis vier Wochen vom ersten Gespräch bis zum Launch. Für komplexere Projekte mit individuellen Anforderungen kann es etwas länger dauern — das besprechen wir im Vorfeld transparent.',
  },
  {
    q: 'Wir sind ein kleines Unternehmen. Lohnt sich das für uns?',
    a: 'Gerade für kleinere Betriebe ist eine professionelle Website oft der Unterschied zwischen einem Auftrag und keinem. Wir arbeiten bewusst mit regionalen Unternehmen — vom Handwerksbetrieb bis zur Fachkanzlei — und kennen die Anforderungen.',
  },
  {
    q: 'Arbeitet ihr auch außerhalb von Koblenz?',
    a: 'Ja. Unser Büro ist in Emmelshausen im Rhein-Hunsrück. Wir betreuen Kunden in Koblenz, der Mosel-Region und ganz Rheinland-Pfalz. Das erste Gespräch führen wir auch gerne per Video-Call — ortsunabhängig.',
  },
  {
    q: 'Was passiert nach dem Launch — wer kümmert sich um die Wartung?',
    a: 'Im Monats-Paket übernehmen wir laufende Pflege, Updates und technischen Support. Sie können Inhalte selbst anpassen oder uns damit beauftragen. Wir bleiben direkt erreichbar — kein Ticket-System, keine Weiterleitungen.',
  },
  {
    q: 'Was unterscheidet euch von anderen Webdesign-Agenturen?',
    a: 'Wir sind zwei Gründer, die selbst am Projekt arbeiten — kein Projektmanager dazwischen, keine Freelancer-Weitergabe. Sie sprechen direkt mit der Person, die Ihre Website baut. Das macht Entscheidungen schneller und das Ergebnis besser.',
  },
]

export const faqJsonLd = faqs.map((item) => ({
  '@type': 'Question',
  name: item.q,
  acceptedAnswer: { '@type': 'Answer', text: item.a },
}))

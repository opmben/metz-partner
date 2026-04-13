export interface Stat {
  value: string
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: '3', suffix: '+', label: 'Projekte abgeschlossen' },
  { value: '95', suffix: '+', label: 'Pagespeed Durchschnitt' },
  { value: '2–4', suffix: '', label: 'Wochen Ø Lieferzeit' },
  { value: '24', suffix: 'h', label: 'Antwortzeit garantiert' },
]

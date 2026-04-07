import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      'var(--bg)',
        surface: 'var(--surface)',
        s2:      'var(--surface-2)',
        accent:  'var(--accent)',
        warm:    'var(--accent-warm)',
        text:    'var(--text)',
        muted:   'var(--muted)',
        subtle:  'var(--subtle)',
        border:  'var(--border)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        ui:      ['var(--font-ui)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1400px',
      },
    },
  },
  plugins: [],
}

export default config

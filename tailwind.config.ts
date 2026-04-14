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
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-up': 'accordion-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config

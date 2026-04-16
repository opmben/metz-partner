'use client'
import ColorBends from '@/components/ColorBends'

export function ColorBendsBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <ColorBends
        colors={['#080808', '#0d1a00', '#1a2e00', '#C8FF00', '#080808', '#111111', '#0a1400', '#080808']}
        speed={1.0}
        frequency={1.2}
        noise={0.49}
        bandWidth={0.14}
        rotation={92}
        fadeTop={0.75}
        iterations={2}
        intensity={1.3}
      />
    </div>
  )
}

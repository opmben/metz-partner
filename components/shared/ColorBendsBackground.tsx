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
        speed={0.3}
        scale={1.2}
        frequency={0.5}
        warpStrength={0.8}
        intensity={0.35}
        mouseInfluence={0.08}
        parallax={0.6}
        iterations={4}
        noise={0.08}
        bandWidth={5}
      />
    </div>
  )
}

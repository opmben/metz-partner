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
        rotation={90}
        speed={0.35}
        transparent={false}
        autoRotate={0}
        scale={1}
        frequency={1.5}
        warpStrength={1}
        mouseInfluence={0.6}
        parallax={1}
        noise={0.25}
        iterations={2}
        intensity={0.6}
        bandWidth={3.5}
      />
    </div>
  )
}

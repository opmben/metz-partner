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
        speed={0.4}
        transparent={false}
        autoRotate={0}
        scale={1}
        frequency={1.2}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.4}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
      />
    </div>
  )
}

<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <ColorBends
    rotation={90}
    speed={1}
    colors={["#5227FF","#FF9FFC"]}
    transparent={false}
    autoRotate={0}
    scale={1}
    frequency={1.2}
    warpStrength={1}
    mouseInfluence={1}
    parallax={0.5}
    noise={0.4}
    iterations={1}
    intensity={1.5}
    bandWidth={6}
  />
</div>

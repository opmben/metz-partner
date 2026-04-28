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
        colors={["#d0ff27","#d1ff9f"]}
        rotation={90}
        speed={0.3}
        transparent={false}
        autoRotate={0}
        scale={1}
        frequency={0.8}
        warpStrength={1}
        mouseInfluence={0}
        parallax={0.5}
        noise={0.15}
        iterations={1}
        intensity={0.6}
        bandWidth={4}
      />
    </div>
  )
}

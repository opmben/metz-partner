'use client'
import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'

interface DotFieldProps {
  dotRadius?: number
  dotSpacing?: number
  cursorRadius?: number
  cursorForce?: number
  bulgeOnly?: boolean
  bulgeStrength?: number
  glowRadius?: number
  sparkle?: boolean
  waveAmplitude?: number
  gradientFrom?: string
  gradientTo?: string
  glowColor?: string
  [key: string]: unknown
}

// Lazy-load — canvas component, no SSR needed
const DotField = dynamic<DotFieldProps>(() => import('@/components/DotField'), { ssr: false })

export function DotFieldBackground() {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <DotField
        dotRadius={1}
        dotSpacing={10}
        cursorRadius={420}
        cursorForce={0.08}
        bulgeOnly={true}
        bulgeStrength={52}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        gradientFrom="rgba(220, 155, 60, 0.42)"
        gradientTo="rgba(180, 120, 40, 0.22)"
        glowColor="#485a06"
      />
    </div>
  )
}

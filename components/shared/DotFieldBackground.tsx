'use client'
import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'

interface DotFieldProps {
  dotRadius?: number
  dotSpacing?: number
  waveAmplitude?: number
  gradientFrom?: string
  gradientTo?: string
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
        dotSpacing={14}
        waveAmplitude={0}
        gradientFrom="rgba(207, 220, 60, 0.42)"
        gradientTo="rgba(161, 180, 40, 0.22)"
      />
    </div>
  )
}

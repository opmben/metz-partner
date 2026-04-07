'use client'
import { useEffect, useRef, useState } from 'react'

interface CursorPosition {
  x: number
  y: number
}

export function useCursorPosition() {
  const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)
  const posRef = useRef<CursorPosition>({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setPosition({ ...posRef.current })
          rafRef.current = null
        })
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return position
}

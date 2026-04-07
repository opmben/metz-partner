'use client'
import { useEffect, useState } from 'react'
import { useCursorPosition } from '@/lib/hooks/useCursorPosition'

export function CustomCursor() {
  const { x, y } = useCursorPosition()
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onEnter = () => setIsVisible(true)
    const onLeave = () => setIsVisible(false)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseleave', onLeave)

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const tag = target.tagName.toLowerCase()
      const cursor = window.getComputedStyle(target).cursor
      setIsPointer(
        cursor === 'pointer' ||
          tag === 'a' ||
          tag === 'button' ||
          target.getAttribute('role') === 'button'
      )
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  // Only render on pointer devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  return (
    <>
      {/* Dot */}
      <div
        style={{
          position: 'fixed',
          left: x,
          top: y,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'exclusion',
          opacity: isVisible ? (isPointer ? 0 : 1) : 0,
          transition: 'opacity 0.2s ease',
        }}
      />
      {/* Ring */}
      <div
        style={{
          position: 'fixed',
          left: x,
          top: y,
          width: isPointer ? 56 : 32,
          height: isPointer ? 56 : 32,
          borderRadius: '50%',
          border: `1px solid rgba(200, 255, 0, ${isPointer ? 0.6 : 0.35})`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'exclusion',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.35s ease, height 0.35s ease, opacity 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  )
}

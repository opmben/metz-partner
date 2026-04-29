'use client'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function CustomCursor() {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPointerDevice] = useState(
    () => typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  )

  // Raw cursor position
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Dot follows tightly
  const dotX = useSpring(cursorX, { stiffness: 800, damping: 40, mass: 0.2 })
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 40, mass: 0.2 })

  // Ring follows with lag — creates the trailing effect
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 25, mass: 0.5 })
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 25, mass: 0.5 })

  // Ring size springs
  const ringSize = useSpring(32, { stiffness: 300, damping: 20 })
  const ringBorderOpacity = useSpring(0.35, { stiffness: 200, damping: 20 })

  useEffect(() => {
    if (!isPointerDevice) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target as HTMLElement
      const tag = target.tagName.toLowerCase()
      const cursor = window.getComputedStyle(target).cursor
      const isInteractive =
        cursor === 'pointer' ||
        tag === 'a' ||
        tag === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button'

      setIsPointer(isInteractive)
    }

    const onEnter = () => setIsVisible(true)
    const onLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [isPointerDevice, cursorX, cursorY])

  // Update spring targets when pointer state changes
  useEffect(() => {
    ringSize.set(isPointer ? 56 : 32)
    ringBorderOpacity.set(isPointer ? 0.6 : 0.35)
  }, [isPointer, ringSize, ringBorderOpacity])

  if (!mounted || !isPointerDevice) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'exclusion',
          opacity: isVisible ? (isPointer ? 0 : 1) : 0,
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: '1px solid var(--accent)',
          borderColor: `rgba(200, 255, 0, ${isPointer ? 0.6 : 0.35})`,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'exclusion',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}

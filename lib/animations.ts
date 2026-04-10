import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const slideUpClip: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export const staggerContainer = (staggerTime = 0.12): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerTime },
  },
})

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

// Character-level stagger for cinematic headline reveals
export const charReveal: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const charContainer = (staggerTime = 0.03): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerTime },
  },
})

// Blur-in for subtle reveals
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

// Scale-up with rotation for dramatic entrances
export const dramaticScale: Variants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -1 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
}

// Clip reveal from bottom (for section headlines)
export const clipRevealUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

// Horizontal line grow
export const lineGrow: Variants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
}

'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import type { Project } from '@/lib/data/projects'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

// Category-specific visual themes for placeholder art
const categoryThemes: Record<string, {
  bg: string
  glow1: string
  glow2: string
  accentBar: string
  lineColor: string
  blockAccent: string
}> = {
  Handwerk: {
    bg: 'linear-gradient(135deg, #110d07 0%, #180f08 40%, #0e0a06 100%)',
    glow1: 'rgba(220,140,60,0.12)',
    glow2: 'rgba(180,100,30,0.07)',
    accentBar: 'rgba(220,140,60,0.45)',
    lineColor: 'rgba(220,140,60,0.2)',
    blockAccent: 'rgba(220,140,60,0.38)',
  },
  Kanzlei: {
    bg: 'linear-gradient(135deg, #080b12 0%, #0b0e18 40%, #08090f 100%)',
    glow1: 'rgba(100,150,240,0.1)',
    glow2: 'rgba(70,120,210,0.06)',
    accentBar: 'rgba(120,170,255,0.4)',
    lineColor: 'rgba(100,150,240,0.18)',
    blockAccent: 'rgba(110,160,255,0.35)',
  },
  Gastronomie: {
    bg: 'linear-gradient(135deg, #100a0a 0%, #180c0c 40%, #0e0808 100%)',
    glow1: 'rgba(220,80,60,0.1)',
    glow2: 'rgba(200,60,40,0.06)',
    accentBar: 'rgba(220,100,80,0.4)',
    lineColor: 'rgba(220,80,60,0.18)',
    blockAccent: 'rgba(220,90,70,0.35)',
  },
}

const defaultTheme = {
  bg: 'linear-gradient(135deg, #0d0d0d 0%, #111 40%, #0a0a0a 100%)',
  glow1: 'rgba(200,255,0,0.09)',
  glow2: 'rgba(200,255,0,0.04)',
  accentBar: 'rgba(200,255,0,0.38)',
  lineColor: 'rgba(200,255,0,0.15)',
  blockAccent: 'rgba(200,255,0,0.32)',
}

function PlaceholderArt({
  project,
  featured,
}: {
  project: Project
  featured: boolean
}) {
  const theme = categoryThemes[project.category] ?? defaultTheme
  const pad = featured ? '1.4rem' : '1rem'
  const shouldReduce = useReducedMotion()

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: theme.bg,
      }}
    >
      {/* Ambient glows */}
      <motion.div
        animate={shouldReduce ? undefined : { x: [0, 15, -10, 0], y: [0, -10, 8, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={shouldReduce ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '10%', left: '15%',
          width: '55%', height: '55%', borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.glow1}, transparent 70%)`,
          filter: 'blur(40px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={shouldReduce ? undefined : { x: [0, -12, 8, 0], y: [0, 8, -6, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={shouldReduce ? undefined : { duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '10%', right: '10%',
          width: '35%', height: '35%', borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.glow2}, transparent 70%)`,
          filter: 'blur(30px)', pointerEvents: 'none',
        }}
      />

      {/* Grid lines */}
      <motion.div
        animate={shouldReduce ? undefined : {
          backgroundPosition: ['0px 0px', `${featured ? 36 : 28}px ${featured ? 36 : 28}px`],
        }}
        transition={shouldReduce ? undefined : { duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${theme.lineColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.lineColor} 1px, transparent 1px)`,
          backgroundSize: featured ? '36px 36px' : '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Website skeleton wireframe */}
      <div style={{ position: 'absolute', inset: 0, padding: pad }}>
        {/* Nav */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingBottom: featured ? '0.9rem' : '0.65rem',
          marginBottom: featured ? '1.4rem' : '1rem',
          borderBottom: `1px solid rgba(240,237,232,0.055)`,
        }}>
          <div style={{ width: featured ? 58 : 44, height: featured ? 8 : 6, borderRadius: 4, background: 'rgba(240,237,232,0.28)' }} />
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {(featured ? [36, 28, 40] : [26, 20, 30]).map((w, i) => (
              <div key={i} style={{ width: w, height: featured ? 4 : 3, borderRadius: 2, background: 'rgba(240,237,232,0.1)' }} />
            ))}
          </div>
          <div style={{ width: featured ? 50 : 38, height: featured ? 18 : 13, borderRadius: 9, background: theme.accentBar }} />
        </div>

        {/* Hero text */}
        <div style={{ marginBottom: featured ? '1.4rem' : '1rem' }}>
          {[76, 56, 40].map((pct, i) => (
            <div key={i} style={{
              width: `${pct}%`,
              height: featured ? (i === 0 ? 12 : 10) : (i === 0 ? 8 : 7),
              borderRadius: 3,
              background: i === 2 ? theme.blockAccent : `rgba(240,237,232,${0.22 - i * 0.04})`,
              marginBottom: featured ? '0.55rem' : '0.4rem',
            }} />
          ))}
          <motion.div
            animate={shouldReduce ? undefined : { opacity: [0.7, 0.45, 0.7] }}
            transition={shouldReduce ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-block', marginTop: featured ? '0.5rem' : '0.3rem',
              width: featured ? 68 : 50, height: featured ? 20 : 15,
              borderRadius: 10, background: theme.accentBar,
            }}
          />
        </div>

        {/* Content blocks (featured only) */}
        {featured && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
            {[0.08, 0.055, 0.07].map((op, i) => (
              <div key={i} style={{ height: 56, borderRadius: 3, background: `rgba(240,237,232,${op})`, border: '1px solid rgba(240,237,232,0.04)' }} />
            ))}
          </div>
        )}

        {!featured && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[90, 70].map((pct, i) => (
              <div key={i} style={{ width: `${pct}%`, height: 5, borderRadius: 2, background: `rgba(240,237,232,${0.09 - i * 0.02})` }} />
            ))}
          </div>
        )}
      </div>

      {/* "Referenz folgt" badge */}
      <div style={{
        position: 'absolute', top: '0.85rem', right: '0.85rem',
        background: 'rgba(8,8,8,0.75)', border: '1px solid rgba(240,237,232,0.1)',
        borderRadius: 100, padding: '0.28rem 0.7rem', backdropFilter: 'blur(8px)',
      }}>
        <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(240,237,232,0.38)', fontFamily: 'var(--font-ui)' }}>
          Referenz folgt
        </span>
      </div>
    </div>
  )
}

/* ── Browser chrome bar ── */
function BrowserChrome({ url }: { url: string }) {
  return (
    <div
      style={{
        height: 36,
        background: '#161616',
        borderBottom: '1px solid rgba(240,237,232,0.06)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        flexShrink: 0,
      }}
    >
      {/* Traffic lights */}
      <div style={{ display: 'flex', gap: 6, marginRight: 12 }}>
        {[
          'rgba(255,95,87,0.75)',
          'rgba(255,189,46,0.75)',
          'rgba(40,200,64,0.75)',
        ].map((color, i) => (
          <div
            key={i}
            style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }}
          />
        ))}
      </div>

      {/* URL bar */}
      <div
        style={{
          flex: 1,
          height: 20,
          background: 'rgba(240,237,232,0.04)',
          border: '1px solid rgba(240,237,232,0.07)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '0 8px',
        }}
      >
        <span
          style={{
            fontSize: '0.6rem',
            color: 'rgba(240,237,232,0.3)',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {url}
        </span>
      </div>

      {/* Right spacer — mirrors traffic lights block */}
      <div style={{ width: 52, marginLeft: 12 }} />
    </div>
  )
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const shouldReduce = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    rotateX.set(-ny * 5)
    rotateY.set(nx * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const showPlaceholder = !project.imageReady || imgError
  const displayUrl = project.displayUrl ?? `${project.slug}.de`

  return (
    <Link href={`/projekte/${project.slug}`} className="block" style={{ cursor: 'pointer', perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => { setHovered(false); handleMouseLeave() }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          overflow: 'hidden',
          cursor: 'pointer',
          rotateX: shouldReduce ? 0 : rotateX,
          rotateY: shouldReduce ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
        }}
        animate={{
          scale: hovered ? 1.015 : 1,
          boxShadow: hovered
            ? '0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.2)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top accent line — sweeps in on hover */}
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 2, background: 'var(--accent)',
            transformOrigin: 'left', zIndex: 10,
          }}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.8 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Browser chrome */}
        <BrowserChrome url={displayUrl} />

        {/* Screenshot viewport */}
        <div
          style={{
            position: 'relative',
            aspectRatio: featured ? '16/9' : '16/10',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {/* Image / placeholder — subtle scale on hover */}
          <motion.div
            style={{ position: 'absolute', inset: 0 }}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {showPlaceholder ? (
              <PlaceholderArt project={project} featured={featured} />
            ) : (
              <Image
                src={project.coverImage}
                alt={`Screenshot der Website für ${project.name}`}
                fill
                sizes={
                  featured
                    ? '(min-width: 1024px) 80vw, 100vw'
                    : '(min-width: 1024px) 33vw, 100vw'
                }
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                onError={() => setImgError(true)}
              />
            )}
          </motion.div>

          {/* Hover overlay + "Ansehen →" pill */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            animate={{
              background: hovered
                ? 'rgba(8,8,8,0.45)'
                : 'rgba(8,8,8,0)',
            }}
            transition={{ duration: 0.35 }}
          >
            <motion.span
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.82 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0.65rem 1.5rem',
                borderRadius: 100,
                boxShadow: '0 4px 24px rgba(200,255,0,0.4)',
                pointerEvents: 'none',
              }}
            >
              Ansehen →
            </motion.span>
          </motion.div>
        </div>

        {/* Info row — always visible */}
        <div
          style={{
            padding: featured ? '1.25rem 1.5rem' : '0.9rem 1.25rem',
            borderTop: '1px solid rgba(240,237,232,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.62rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--accent)',
                marginBottom: '0.3rem',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {project.category} · {project.serviceType}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: featured ? 'clamp(1.1rem, 1.6vw, 1.35rem)' : '1rem',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.2,
              }}
            >
              {project.name}
            </h3>
          </div>

          <motion.div
            animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ flexShrink: 0, color: 'var(--text)' }}
          >
            <ArrowRight size={featured ? 18 : 15} />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

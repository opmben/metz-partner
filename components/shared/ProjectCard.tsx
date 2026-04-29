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

function PlaceholderArt({ project }: { project: Project }) {
  const theme = categoryThemes[project.category] ?? defaultTheme
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
      <motion.div
        animate={shouldReduce ? undefined : {
          backgroundPosition: ['0px 0px', '28px 28px'],
        }}
        transition={shouldReduce ? undefined : { duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${theme.lineColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.lineColor} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, padding: '1rem' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingBottom: '0.65rem',
          marginBottom: '1rem',
          borderBottom: `1px solid rgba(240,237,232,0.055)`,
        }}>
          <div style={{ width: 44, height: 6, borderRadius: 4, background: 'rgba(240,237,232,0.28)' }} />
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[26, 20, 30].map((w, i) => (
              <div key={i} style={{ width: w, height: 3, borderRadius: 2, background: 'rgba(240,237,232,0.1)' }} />
            ))}
          </div>
          <div style={{ width: 38, height: 13, borderRadius: 9, background: theme.accentBar }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          {[76, 56, 40].map((pct, i) => (
            <div key={i} style={{
              width: `${pct}%`,
              height: i === 0 ? 8 : 7,
              borderRadius: 3,
              background: i === 2 ? theme.blockAccent : `rgba(240,237,232,${0.22 - i * 0.04})`,
              marginBottom: '0.4rem',
            }} />
          ))}
          <motion.div
            animate={shouldReduce ? undefined : { opacity: [0.7, 0.45, 0.7] }}
            transition={shouldReduce ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-block', marginTop: '0.3rem',
              width: 50, height: 15,
              borderRadius: 10, background: theme.accentBar,
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[90, 70].map((pct, i) => (
            <div key={i} style={{ width: `${pct}%`, height: 5, borderRadius: 2, background: `rgba(240,237,232,${0.09 - i * 0.02})` }} />
          ))}
        </div>
      </div>
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

function YourProjectArt() {
  const shouldReduce = useReducedMotion()

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#090909',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
          pointerEvents: 'none',
        }}
      />

      {/* Inner circle with + */}
      <motion.div
        animate={shouldReduce ? undefined : { opacity: [0.6, 1, 0.6] }}
        transition={shouldReduce ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(211,253,81,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M6.5 1v11M1 6.5h11" stroke="rgba(211,253,81,0.85)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Label */}
      <p
        style={{
          marginTop: '1rem',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.57rem',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: 'rgba(211,253,81,0.4)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Ihr Projekt
      </p>
    </div>
  )
}

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
      <div style={{ width: 52, marginLeft: 12 }} />
    </div>
  )
}

function useCardTilt() {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const shouldReduce = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 2 * 5)
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 2 * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return { cardRef, rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

function HoverAccentLine({ hovered }: { hovered: boolean }) {
  return (
    <motion.div
      style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 2, background: 'var(--accent)',
        transformOrigin: 'left', zIndex: 10,
      }}
      animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.8 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

function HoverPill({ hovered, label }: { hovered: boolean; label: string }) {
  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      animate={{ background: hovered ? 'rgba(8,8,8,0.45)' : 'rgba(8,8,8,0)' }}
      transition={{ duration: 0.35 }}
    >
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
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
        {label}
      </motion.span>
    </motion.div>
  )
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const shouldReduce = useReducedMotion()
  const { cardRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useCardTilt()

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
          background: 'linear-gradient(180deg, rgba(255,255,255,0.044), rgba(255,255,255,0.020)), rgba(6,6,6,0.46)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
          cursor: 'pointer',
          backdropFilter: 'blur(var(--blur-primary))',
          WebkitBackdropFilter: 'blur(var(--blur-primary))',
          rotateX: shouldReduce ? 0 : rotateX,
          rotateY: shouldReduce ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
        }}
        animate={{
          scale: hovered ? 1.015 : 1,
          borderColor: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)',
          boxShadow: hovered
            ? 'inset 0 1px 0 rgba(255,255,255,0.26), 0 28px 90px rgba(0,0,0,0.42), 0 0 52px rgba(255,255,255,0.06)'
            : 'inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 60px rgba(0,0,0,0.32), 0 0 20px rgba(255,255,255,0.022)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <HoverAccentLine hovered={hovered} />
        <BrowserChrome url={displayUrl} />

        <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            {showPlaceholder ? (
              <PlaceholderArt project={project} />
            ) : (
              <Image
                src={project.coverImage}
                alt={`Screenshot der Website für ${project.name}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <HoverPill hovered={hovered} label="Ansehen →" />
        </div>

        <motion.div
          animate={{ y: hovered ? 0 : 8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: featured ? '1.1rem 1.4rem' : '0.9rem 1.25rem',
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
                fontSize: featured ? '1.05rem' : '1rem',
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
            <ArrowRight size={15} />
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  )
}

export function YourProjectSlot() {
  const [hovered, setHovered] = useState(false)
  const shouldReduce = useReducedMotion()
  const { cardRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useCardTilt()

  return (
    <Link href="/kontakt" className="block" style={{ cursor: 'pointer', perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => { setHovered(false); handleMouseLeave() }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.044), rgba(255,255,255,0.020)), rgba(6,6,6,0.46)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
          cursor: 'pointer',
          backdropFilter: 'blur(var(--blur-primary))',
          WebkitBackdropFilter: 'blur(var(--blur-primary))',
          rotateX: shouldReduce ? 0 : rotateX,
          rotateY: shouldReduce ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
        }}
        animate={{
          scale: hovered ? 1.015 : 1,
          borderColor: hovered ? 'rgba(211,253,81,0.25)' : 'rgba(255,255,255,0.10)',
          boxShadow: hovered
            ? 'inset 0 1px 0 rgba(255,255,255,0.26), 0 28px 90px rgba(0,0,0,0.42), 0 0 52px rgba(255,255,255,0.06)'
            : 'inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 60px rgba(0,0,0,0.32), 0 0 20px rgba(255,255,255,0.022)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <HoverAccentLine hovered={hovered} />
        <BrowserChrome url="ihr-unternehmen.de" />

        <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <YourProjectArt />
          </div>
          <HoverPill hovered={hovered} label="Anfragen →" />
        </div>

        <motion.div
          animate={{ y: hovered ? 0 : 8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: '0.9rem 1.25rem',
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
                opacity: 0.6,
              }}
            >
              Ihr Unternehmen · Ihre Website
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.2,
              }}
            >
              Das könnte Ihr Projekt sein.
            </h3>
          </div>
          <motion.div
            animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ flexShrink: 0, color: 'var(--accent)' }}
          >
            <ArrowRight size={15} />
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  )
}

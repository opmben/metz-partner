'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
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
      {/* Ambient glows — animated drift */}
      <motion.div
        animate={shouldReduce ? undefined : {
          x: [0, 15, -10, 0],
          y: [0, -10, 8, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={shouldReduce ? undefined : {
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '55%',
          height: '55%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.glow1}, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={shouldReduce ? undefined : {
          x: [0, -12, 8, 0],
          y: [0, 8, -6, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={shouldReduce ? undefined : {
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '35%',
          height: '35%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.glow2}, transparent 70%)`,
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid lines — slow drift */}
      <motion.div
        animate={shouldReduce ? undefined : {
          backgroundPosition: ['0px 0px', `${featured ? 36 : 28}px ${featured ? 36 : 28}px`],
        }}
        transition={shouldReduce ? undefined : {
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${theme.lineColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.lineColor} 1px, transparent 1px)`,
          backgroundSize: featured ? '36px 36px' : '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Website skeleton wireframe */}
      <div style={{ position: 'absolute', inset: 0, padding: pad }}>
        {/* Nav */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: featured ? '0.9rem' : '0.65rem',
            marginBottom: featured ? '1.4rem' : '1rem',
            borderBottom: `1px solid rgba(240,237,232,0.055)`,
          }}
        >
          <div
            style={{
              width: featured ? 58 : 44,
              height: featured ? 8 : 6,
              borderRadius: 4,
              background: 'rgba(240,237,232,0.28)',
            }}
          />
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {(featured ? [36, 28, 40] : [26, 20, 30]).map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  height: featured ? 4 : 3,
                  borderRadius: 2,
                  background: 'rgba(240,237,232,0.1)',
                }}
              />
            ))}
          </div>
          <div
            style={{
              width: featured ? 50 : 38,
              height: featured ? 18 : 13,
              borderRadius: 9,
              background: theme.accentBar,
            }}
          />
        </div>

        {/* Hero text */}
        <div style={{ marginBottom: featured ? '1.4rem' : '1rem' }}>
          {[76, 56, 40].map((pct, i) => (
            <div
              key={i}
              style={{
                width: `${pct}%`,
                height: featured ? (i === 0 ? 12 : 10) : (i === 0 ? 8 : 7),
                borderRadius: 3,
                background:
                  i === 2
                    ? theme.blockAccent
                    : `rgba(240,237,232,${0.22 - i * 0.04})`,
                marginBottom: featured ? '0.55rem' : '0.4rem',
              }}
            />
          ))}
          {/* CTA button skeleton — subtle pulse */}
          <motion.div
            animate={shouldReduce ? undefined : { opacity: [0.7, 0.45, 0.7] }}
            transition={shouldReduce ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-block',
              marginTop: featured ? '0.5rem' : '0.3rem',
              width: featured ? 68 : 50,
              height: featured ? 20 : 15,
              borderRadius: 10,
              background: theme.accentBar,
            }}
          />
        </div>

        {/* Content grid */}
        {featured && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0.6rem',
            }}
          >
            {[0.08, 0.055, 0.07].map((op, i) => (
              <div
                key={i}
                style={{
                  height: 56,
                  borderRadius: 3,
                  background: `rgba(240,237,232,${op})`,
                  border: '1px solid rgba(240,237,232,0.04)',
                }}
              />
            ))}
          </div>
        )}

        {/* Non-featured: two row blocks */}
        {!featured && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[90, 70].map((pct, i) => (
              <div
                key={i}
                style={{
                  width: `${pct}%`,
                  height: 5,
                  borderRadius: 2,
                  background: `rgba(240,237,232,${0.09 - i * 0.02})`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* "Referenz folgt" badge */}
      <div
        style={{
          position: 'absolute',
          top: '0.85rem',
          right: '0.85rem',
          background: 'rgba(8,8,8,0.75)',
          border: '1px solid rgba(240,237,232,0.1)',
          borderRadius: 100,
          padding: '0.28rem 0.7rem',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          style={{
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(240,237,232,0.38)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          Referenz folgt
        </span>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const showPlaceholder = !project.imageReady || imgError

  return (
    <Link href={`/projekte/${project.slug}`} className="block" style={{ cursor: 'pointer' }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          position: 'relative',
          background: 'var(--surface)',
          overflow: 'hidden',
          cursor: 'pointer',
          aspectRatio: featured ? '4/3' : '16/10',
          borderRadius: 4,
        }}
      >
        {/* Image or placeholder */}
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
                  ? '(min-width: 1024px) 66vw, 100vw'
                  : '(min-width: 1024px) 33vw, 100vw'
              }
              style={{ objectFit: 'cover' }}
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hovered
              ? 'linear-gradient(to top, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.25) 60%, transparent 100%)'
              : 'linear-gradient(to top, rgba(8,8,8,0.88) 0%, transparent 55%)',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Center hover pill */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.82 }}
          transition={{ duration: 0.28 }}
        >
          <span
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.78rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.09em',
              padding: '0.7rem 1.6rem',
              borderRadius: 100,
            }}
          >
            Ansehen →
          </span>
        </motion.div>

        {/* Project info */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: featured ? '2rem' : '1.5rem',
          }}
          animate={{ y: hovered ? 0 : 6 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent)',
              marginBottom: '0.4rem',
            }}
          >
            {project.category} · {project.serviceType}
          </p>
          <h3 className="display-card" style={{ color: 'var(--text)' }}>
            {project.name}
          </h3>
        </motion.div>
      </motion.div>
    </Link>
  )
}

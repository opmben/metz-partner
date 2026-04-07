'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/data/projects'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/projekte/${project.slug}`} className="block">
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
        {/* Image */}
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={project.coverImage}
            alt={`Screenshot der Website für ${project.name}`}
            fill
            sizes={featured ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
            style={{ objectFit: 'cover' }}
          />
        </motion.div>

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hovered
              ? 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)'
              : 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%)',
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
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.3 }}
        >
          <span
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.8rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0.7rem 1.6rem',
              borderRadius: 100,
            }}
          >
            Ansehen →
          </span>
        </motion.div>

        {/* Info */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2rem',
          }}
          animate={{ y: hovered ? 0 : 8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <p
            style={{
              fontSize: '0.7rem',
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

'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { services, type Service } from '@/lib/data/services'
import { clipRevealUp, staggerContainer, fadeUp } from '@/lib/animations'

// ─── Constants ───────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Service Row ─────────────────────────────────────────────────────────────
function ServiceRow({ service }: { service: Service }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const reduce = Boolean(shouldReduce)

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-[2fr_3fr]"
      style={{ gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}
    >
      {/* ── Left column: number + title ─────────────────────────────────── */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 30 }}
        animate={
          reduce
            ? undefined
            : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 30 }
        }
        transition={{ duration: 0.85, ease: EASE }}
        className="hidden md:block"
      >
        {/* Large italic number — faint → slight accent tint on entry */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  color: isInView
                    ? 'rgba(200,255,0,0.15)'
                    : 'rgba(240,237,232,0.06)',
                }
          }
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 8vw, 9rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 0.9,
            userSelect: 'none',
            marginBottom: '1.25rem',
            color: reduce
              ? isInView
                ? 'rgba(200,255,0,0.15)'
                : 'rgba(240,237,232,0.06)'
              : undefined,
          }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {service.number}
        </motion.div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 2.4vw, 2.2rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--text)',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {service.title}
        </h3>
      </motion.div>

      {/* ── Right column: visual + text ──────────────────────────────────── */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 40 }}
        animate={
          reduce
            ? undefined
            : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
        }
        transition={{ duration: 0.85, ease: EASE, delay: reduce ? 0 : 0.15 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        {/* Mobile-only: number + title above visual */}
        <div className="md:hidden">
          <motion.div
            animate={
              reduce
                ? undefined
                : {
                    color: isInView
                      ? 'rgba(200,255,0,0.15)'
                      : 'rgba(240,237,232,0.06)',
                  }
            }
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 10vw, 5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 0.9,
              userSelect: 'none',
              marginBottom: '0.75rem',
              color: reduce
                ? isInView
                  ? 'rgba(200,255,0,0.15)'
                  : 'rgba(240,237,232,0.06)'
                : undefined,
            }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            {service.number}
          </motion.div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 5vw, 1.9rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.15,
              margin: '0 0 1.25rem',
            }}
          >
            {service.title}
          </h3>
        </div>

        {/* SVG visual */}
        <div
          style={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            aspectRatio: '16/9',
          }}
        >
          <Image
            src={service.visual}
            alt={`${service.title} — visuelle Vorschau`}
            fill
            sizes="(max-width: 768px) calc(100vw - 3rem), 55vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
            fontWeight: 300,
            color: 'var(--text)',
            lineHeight: 1.8,
            fontFamily: 'var(--font-ui)',
            margin: 0,
          }}
        >
          {service.description}
        </p>

        {/* Capability pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {service.pills.map((pill) => (
            <span
              key={pill}
              style={{
                fontSize: '0.67rem',
                fontWeight: 400,
                letterSpacing: '0.05em',
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                padding: '0.3rem 0.8rem',
                fontFamily: 'var(--font-ui)',
                background: 'rgba(240,237,232,0.02)',
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Services Section ─────────────────────────────────────────────────────────
export function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="leistungen"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      className="md:py-32"
    >
      <div className="container-site">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={
            shouldReduce ? undefined : isHeaderInView ? 'visible' : 'hidden'
          }
          style={{ marginBottom: 'clamp(3rem, 7vw, 6rem)' }}
        >
          <motion.div
            variants={shouldReduce ? undefined : fadeUp}
            style={{ marginBottom: '1rem' }}
          >
            <SectionLabel>● Leistungen</SectionLabel>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="display-section"
              variants={shouldReduce ? undefined : clipRevealUp}
            >
              Was wir für Sie bauen.
            </motion.h2>
          </div>
        </motion.div>

        {/* Service rows — each triggers its own scroll animation */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(5rem, 10vw, 7.5rem)',
          }}
        >
          {services.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

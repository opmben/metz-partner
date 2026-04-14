'use client'

import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { services, type Service } from '@/lib/data/services'
import { clipRevealUp, staggerContainer, fadeUp } from '@/lib/animations'

// ─── Constants ───────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Variants ────────────────────────────────────────────────────────────────
const rowVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const panelContentVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, delay: 0.08 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

// ─── Accordion Row ────────────────────────────────────────────────────────────
interface AccordionRowProps {
  service: Service
  isOpen: boolean
  onToggle: () => void
  shouldReduce: boolean | null
}

function AccordionRow({ service, isOpen, onToggle, shouldReduce }: AccordionRowProps) {
  const reduce = Boolean(shouldReduce)

  return (
    <motion.div
      variants={reduce ? undefined : rowVariants}
      style={{ position: 'relative' }}
    >
      {/* Top accent line — scaleX 0→1 on open */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { scaleX: isOpen ? 1 : 0 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--accent)',
          transformOrigin: 'left',
          zIndex: 2,
          scaleX: reduce ? (isOpen ? 1 : 0) : undefined,
        }}
        transition={{ duration: 0.55, ease: EASE }}
      />

      {/* Subtle background tint on the whole row */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { opacity: isOpen ? 1 : 0 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(200,255,0,0.018)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: reduce ? (isOpen ? 1 : 0) : undefined,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Trigger ──────────────────────────────────────────────────────── */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`service-panel-${service.id}`}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          textAlign: 'left',
          background: 'transparent',
          borderTop: '1px solid var(--border)',
          borderBottom: isOpen ? 'none' : undefined,
          padding: 'clamp(1.1rem, 2vw, 1.75rem) 0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.75rem, 2vw, 1.75rem)',
        }}
      >
        {/* Large italic number */}
        <motion.span
          animate={
            reduce
              ? undefined
              : {
                  color: isOpen
                    ? 'rgba(200,255,0,0.55)'
                    : 'rgba(240,237,232,0.07)',
                }
          }
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1,
            minWidth: 'clamp(2.2rem, 5vw, 5rem)',
            userSelect: 'none',
            flexShrink: 0,
            color: reduce
              ? isOpen
                ? 'rgba(200,255,0,0.55)'
                : 'rgba(240,237,232,0.07)'
              : undefined,
          }}
          transition={{ duration: 0.45 }}
        >
          {service.number}
        </motion.span>

        {/* Tag + Title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Service tag — fades in on open */}
          <motion.div
            animate={
              reduce
                ? undefined
                : {
                    opacity: isOpen ? 1 : 0,
                    y: isOpen ? 0 : -5,
                  }
            }
            style={{
              fontSize: '0.64rem',
              fontWeight: 400,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.15em',
              color: 'var(--accent)',
              marginBottom: isOpen ? '0.3rem' : 0,
              fontFamily: 'var(--font-ui)',
              opacity: reduce ? (isOpen ? 1 : 0) : undefined,
              lineHeight: 1,
              height: isOpen ? 'auto' : 0,
              overflow: 'hidden',
            }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {service.tag}
          </motion.div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.4vw, 1.9rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {service.title}
          </h3>
        </div>

        {/* Status label + badge (hidden on mobile) */}
        <div
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
        >
          {service.statusBadge && (
            <span
              style={{
                fontSize: '0.58rem',
                fontWeight: 400,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color: 'var(--accent)',
                border: '1px solid rgba(200,255,0,0.22)',
                borderRadius: '100px',
                padding: '0.22rem 0.65rem',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {service.statusBadge}
            </span>
          )}
          <span
            style={{
              fontSize: '0.67rem',
              fontWeight: 400,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.12em',
              color:
                service.status === 'available'
                  ? 'rgba(200,255,0,0.55)'
                  : 'var(--muted)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {service.statusLabel}
          </span>
        </div>

        {/* Arrow — rotates +45° and fills with accent on open */}
        <motion.div
          animate={reduce ? undefined : { rotate: isOpen ? 45 : 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: isOpen
              ? '1px solid rgba(200,255,0,0.3)'
              : '1px solid var(--border)',
            color: isOpen ? 'var(--accent)' : 'var(--muted)',
            transition: 'color 0.3s ease, border-color 0.3s ease',
          }}
          transition={{ duration: 0.38, ease: EASE }}
        >
          <Plus size={16} strokeWidth={1.5} />
        </motion.div>
      </button>

      {/* ── Expandable Panel ─────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`service-panel-${service.id}`}
            role="region"
            aria-labelledby={`service-trigger-${service.id}`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.52, ease: EASE }}
            style={{
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
              borderBottom: '1px solid var(--border)',
            }}
          >
            <motion.div
              variants={reduce ? undefined : panelContentVariants}
              initial={reduce ? undefined : 'hidden'}
              animate={reduce ? undefined : 'visible'}
              exit={reduce ? undefined : 'exit'}
              className="grid grid-cols-1 md:grid-cols-[3fr_2fr]"
              style={{
                gap: 'clamp(1.5rem, 3vw, 3.5rem)',
                padding:
                  'clamp(1.5rem, 3vw, 2.5rem) 0 clamp(2rem, 4vw, 3.5rem)',
              }}
            >
              {/* Visual — SVG illustration */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  aspectRatio: '16/9',
                  order: 0,
                }}
              >
                <Image
                  src={service.visual}
                  alt={`${service.title} — visuelle Vorschau`}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 3rem), 55vw"
                  style={{ objectFit: 'cover' }}
                  priority={service.defaultOpen}
                />
              </div>

              {/* Text content */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '1.75rem',
                  order: 1,
                }}
              >
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
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                  }}
                >
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Services Section ─────────────────────────────────────────────────────────
export function Services() {
  const defaultId =
    services.find((s) => s.defaultOpen)?.id ?? services[0].id
  const [openId, setOpenId] = useState<string | null>(defaultId)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id))

  return (
    <section
      id="leistungen"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      className="md:py-32"
    >
      <div className="container-site">
        <motion.div
          ref={ref}
          variants={shouldReduce ? undefined : staggerContainer(0.08)}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={
            shouldReduce ? undefined : isInView ? 'visible' : 'hidden'
          }
        >
          {/* Section header */}
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 5rem)' }}>
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
          </div>

          {/* Accordion */}
          <motion.div
            variants={shouldReduce ? undefined : staggerContainer(0.12)}
          >
            {services.map((service) => (
              <AccordionRow
                key={service.id}
                service={service}
                isOpen={openId === service.id}
                onToggle={() => toggle(service.id)}
                shouldReduce={shouldReduce}
              />
            ))}
            {/* Final bottom border */}
            <div
              aria-hidden="true"
              style={{ borderTop: '1px solid var(--border)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

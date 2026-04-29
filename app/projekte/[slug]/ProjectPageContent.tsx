'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Fragment } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/data/projects'

// ─────────────────────────────────────────────────────────────────────────────
// Browser Chrome
// ─────────────────────────────────────────────────────────────────────────────

function BrowserChrome({ url }: { url: string }) {
  return (
    <div
      style={{
        height: 44,
        background: 'rgba(6, 6, 6, 0.94)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.065)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
        {([
          { fill: '#FF5F57', glow: 'rgba(255,95,87,0.55)' },
          { fill: '#FEBC2E', glow: 'rgba(254,188,46,0.50)' },
          { fill: '#28C840', glow: 'rgba(40,200,64,0.50)' },
        ] as const).map(({ fill, glow }, i) => (
          <div
            key={i}
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: fill,
              boxShadow: `0 0 6px ${glow}`,
              opacity: 0.82,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <div
        style={{
          flex: 1,
          height: 26,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          overflow: 'hidden',
          padding: '0 10px',
        }}
      >
        <svg
          width="7"
          height="9"
          viewBox="0 0 7 9"
          fill="none"
          aria-hidden
          style={{ flexShrink: 0, opacity: 0.22 }}
        >
          <rect x="0.5" y="3.5" width="6" height="5" rx="1" stroke="white" strokeWidth="1" />
          <path d="M2 3.5V2.5a1.5 1.5 0 1 1 3 0v1" stroke="white" strokeWidth="1" />
        </svg>
        <span
          style={{
            fontSize: '0.6rem',
            color: 'rgba(255, 255, 255, 0.26)',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '0.025em',
            whiteSpace: 'nowrap',
          }}
        >
          {url}
        </span>
      </div>

      <div style={{ width: 44, flexShrink: 0 }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Browser Frame Panel (shared between main + gallery)
// ─────────────────────────────────────────────────────────────────────────────

function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  sizes,
}: {
  src: string
  alt: string
  url: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div
      className="panel-browser"
      style={{
        padding: 0,
        overflow: 'hidden',
        borderRadius: 20,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.044), rgba(255,255,255,0.020)), rgba(6,6,6,0.46)',
      }}
    >
      {/* Luminous top-edge catchlight */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: '8%',
          right: '8%',
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.30) 28%, rgba(255,255,255,0.20) 72%, transparent)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
      <BrowserChrome url={url} />
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/10',
          overflow: 'hidden',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? '(min-width: 1400px) 1332px, 96vw'}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--accent)',
  fontFamily: 'var(--font-ui)',
  marginBottom: '1rem',
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '0.9875rem',
  fontWeight: 300,
  color: 'var(--muted)',
  lineHeight: 1.85,
  margin: 0,
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  project: Project
}

export function ProjectPageContent({ project }: Props) {
  const shouldReduce = useReducedMotion()

  const headerRef = useRef<HTMLDivElement>(null)
  const browserRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const browserInView = useInView(browserRef, { once: true, margin: '-60px' })
  const contentInView = useInView(contentRef, { once: true, margin: '-80px' })
  const galleryInView = useInView(galleryRef, { once: true, margin: '-80px' })

  const displayUrl = project.displayUrl ?? `${project.slug}.de`

  return (
    <div
      style={{
        position: 'relative',
        paddingTop: 'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 10vw, 10rem)',
      }}
    >
      {/* Atmospheric bloom — warm left, cooler right */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '5%',
          left: '-15%',
          width: '70vw',
          height: '60vw',
          maxWidth: 900,
          maxHeight: 700,
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(212,131,10,0.10) 0%, rgba(198,124,59,0.06) 40%, transparent 68%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '-10%',
          width: '55vw',
          height: '45vw',
          maxWidth: 700,
          maxHeight: 550,
          background:
            'radial-gradient(ellipse at 70% 60%, rgba(184,134,11,0.07) 0%, transparent 62%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>

        {/* ── Back navigation ──────────────────────────────── */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, x: -14 }}
          animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <Link
            href="/projekte"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.30)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={12} style={{ flexShrink: 0 }} />
            Alle Projekte
          </Link>
        </motion.div>

        {/* ── Page header ──────────────────────────────────── */}
        <div ref={headerRef} style={{ marginBottom: '3rem' }}>

          {/* Eyebrow */}
          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            animate={
              shouldReduce ? undefined : headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.65rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent)',
              marginBottom: '0.75rem',
            }}
          >
            {project.category} · {project.serviceType}
          </motion.p>

          {/* Title — clip reveal */}
          <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
            <motion.h1
              className="display-section"
              initial={shouldReduce ? undefined : { y: '108%' }}
              animate={
                shouldReduce ? undefined : headerInView ? { y: '0%' } : { y: '108%' }
              }
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
              style={{ fontStyle: 'italic' }}
            >
              {project.name}
            </motion.h1>
          </div>

          {/* Metadata strip */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 14 }}
            animate={
              shouldReduce ? undefined : headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.5rem 0',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 14,
              padding: '1rem 1.5rem',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
            }}
          >
            {([
              { label: 'Branche', value: project.category },
              { label: 'Leistung', value: project.serviceType },
              { label: 'Jahr', value: project.year },
              { label: 'Region', value: project.location },
            ] as const).map(({ label, value }, i) => (
              <Fragment key={label}>
                <div style={{ padding: '0 1.25rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6rem',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,255,255,0.28)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: 'var(--text)',
                      lineHeight: 1.4,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {value}
                  </p>
                </div>
                {i < 3 && (
                  <div
                    aria-hidden
                    style={{
                      width: 1,
                      height: 28,
                      background: 'rgba(255,255,255,0.09)',
                      flexShrink: 0,
                    }}
                  />
                )}
              </Fragment>
            ))}

            {project.displayUrl && (
              <>
                <div
                  aria-hidden
                  style={{
                    width: 1,
                    height: 28,
                    background: 'rgba(255,255,255,0.09)',
                    flexShrink: 0,
                    margin: '0 0.5rem',
                  }}
                />
                <a
                  href={`https://${project.displayUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8rem',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    padding: '0 1.25rem',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {project.displayUrl}
                  <ArrowUpRight size={12} style={{ opacity: 0.55, flexShrink: 0 }} />
                </a>
              </>
            )}
          </motion.div>
        </div>

        {/* ── Main browser frame ───────────────────────────── */}
        <motion.div
          ref={browserRef}
          initial={shouldReduce ? undefined : { opacity: 0, y: 48 }}
          animate={
            shouldReduce ? undefined : browserInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }
          }
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          {project.imageReady ? (
            <BrowserFrame
              src={project.coverImage}
              alt={`Screenshot der Website für ${project.name}`}
              url={displayUrl}
              priority
            />
          ) : (
            <div
              className="panel-browser"
              style={{
                padding: 0,
                overflow: 'hidden',
                borderRadius: 20,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.044), rgba(255,255,255,0.020)), rgba(6,6,6,0.46)',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '8%',
                  right: '8%',
                  height: 1,
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.30) 28%, rgba(255,255,255,0.20) 72%, transparent)',
                  zIndex: 20,
                  pointerEvents: 'none',
                }}
              />
              <BrowserChrome url={displayUrl} />
              <div
                style={{
                  aspectRatio: '16/10',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(160deg, #141414 0%, #0a0a0a 100%)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.65rem',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'rgba(255,255,255,0.18)',
                  }}
                >
                  Screenshot folgt
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Before / After ───────────────────────────────── */}
        {project.beforeImage && (
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 32 }}
            animate={
              shouldReduce ? undefined : browserInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }
            }
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ marginBottom: '2rem' }}
          >
            <p style={{ ...labelStyle, marginBottom: '1.5rem' }}>Vorher / Nachher</p>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: '1.5rem' }}
            >
              {/* Before */}
              <div style={{ position: 'relative' }}>
                <BrowserFrame
                  src={project.beforeImage}
                  alt={`Alte Website — ${project.name}`}
                  url={displayUrl}
                  sizes="(min-width: 1024px) 50vw, 96vw"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    zIndex: 10,
                    background: 'rgba(10,10,10,0.82)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 999,
                    padding: '0.28rem 0.8rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.58rem',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,255,255,0.40)',
                    }}
                  >
                    Vorher
                  </span>
                </div>
              </div>

              {/* After */}
              {project.imageReady && (
                <div style={{ position: 'relative' }}>
                  <BrowserFrame
                    src={project.coverImage}
                    alt={`Neue Website — ${project.name}`}
                    url={displayUrl}
                    sizes="(min-width: 1024px) 50vw, 96vw"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      zIndex: 10,
                      background: 'rgba(211,253,81,0.12)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(211,253,81,0.22)',
                      borderRadius: 999,
                      padding: '0.28rem 0.8rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.58rem',
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'rgba(211,253,81,0.80)',
                      }}
                    >
                      Nachher
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Case study body ──────────────────────────────── */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr]"
          style={{ gap: '1.5rem', marginBottom: '1.5rem' }}
        >
          {/* Left: context */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 32 }}
            animate={
              shouldReduce ? undefined : contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }
            }
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="surface-primary"
            style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)', borderRadius: 20 }}
          >
            <p style={labelStyle}>Über das Projekt</p>
            <p
              style={{
                ...bodyStyle,
                color: 'var(--text)',
                fontSize: '1rem',
                lineHeight: 1.8,
              }}
            >
              {project.clientContext}
            </p>
          </motion.div>

          {/* Right: challenge + approach stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, y: 32 }}
              animate={
                shouldReduce
                  ? undefined
                  : contentInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 32 }
              }
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="surface-secondary"
              style={{ padding: 'clamp(1.5rem, 2.5vw, 2rem)', borderRadius: 20, flex: 1 }}
            >
              <p style={labelStyle}>Aufgabe</p>
              <p style={bodyStyle}>{project.challenge}</p>
            </motion.div>

            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, y: 32 }}
              animate={
                shouldReduce
                  ? undefined
                  : contentInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 32 }
              }
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="surface-secondary"
              style={{ padding: 'clamp(1.5rem, 2.5vw, 2rem)', borderRadius: 20, flex: 1 }}
            >
              <p style={labelStyle}>Umsetzung</p>
              <p style={bodyStyle}>{project.approach}</p>
            </motion.div>
          </div>
        </div>

        {/* ── Gallery ──────────────────────────────────────── */}
        {project.additionalImages.length > 0 && (
          <div ref={galleryRef} style={{ marginTop: '1.5rem' }}>
            <motion.p
              initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
              animate={
                shouldReduce
                  ? undefined
                  : galleryInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...labelStyle, marginBottom: '1.5rem' }}
            >
              Eindrücke
            </motion.p>

            <div
              className={
                project.additionalImages.length === 1
                  ? 'grid grid-cols-1'
                  : 'grid grid-cols-1 md:grid-cols-2'
              }
              style={{ gap: '1.5rem' }}
            >
              {project.additionalImages.map((src, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduce ? undefined : { opacity: 0, y: 32 }}
                  animate={
                    shouldReduce
                      ? undefined
                      : galleryInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 32 }
                  }
                  transition={{
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.12,
                  }}
                >
                  <BrowserFrame
                    src={src}
                    alt={`Projekteinblick ${i + 1} — ${project.name}`}
                    url={displayUrl}
                    sizes={
                      project.additionalImages.length === 1
                        ? '(min-width: 1400px) 1332px, 96vw'
                        : '(min-width: 1024px) 50vw, 96vw'
                    }
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

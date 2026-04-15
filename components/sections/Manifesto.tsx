'use client'
import { useRef, useCallback, useState, useMemo } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from 'framer-motion'

// ── Word config ──────────────────────────────────────────────────────────────
type WordStyle = 'normal' | 'accent' | 'muted'

interface WordDef {
  text: string
  style: WordStyle
  italic?: boolean
}

// 3 lines: 6 + 3 + 7 = 16 words
// Line 1 — "Ihre Website ist oft der erste Eindruck."
// Line 2 — "Manchmal der einzige."
// Line 3 — "Wir sorgen dafür, dass er zählt."
const WORDS: WordDef[] = [
  { text: 'Ihre',     style: 'normal' },
  { text: 'Website',  style: 'normal' },
  { text: 'ist',      style: 'normal' },
  { text: 'oft',      style: 'normal' },
  { text: 'der',      style: 'normal' },
  { text: 'erste',    style: 'accent', italic: true },
  { text: 'Eindruck.', style: 'accent', italic: true },
  // line 2
  { text: 'Manchmal', style: 'normal' },
  { text: 'der',      style: 'normal' },
  { text: 'einzige.', style: 'normal' },
  // line 3
  { text: 'Wir',      style: 'muted', italic: true },
  { text: 'sorgen',   style: 'muted', italic: true },
  { text: 'dafür,',   style: 'muted', italic: true },
  { text: 'dass',     style: 'muted', italic: true },
  { text: 'er',       style: 'muted', italic: true },
  { text: 'zählt.',   style: 'muted', italic: true },
]

// Each word occupies a window of WINDOW width, staggered by STEP
const STEP   = 0.050   // offset between consecutive word start points
const WINDOW = 0.13    // how long each word's reveal takes (in progress units)

// ── WordReveal ────────────────────────────────────────────────────────────────
function WordReveal({
  word,
  index,
  scrollYProgress,
}: {
  word: WordDef
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index * STEP
  const end   = start + WINDOW

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y       = useTransform(scrollYProgress, [start, end], [32, 0])
  const blur    = useTransform(scrollYProgress, [start, end], [8, 0])
  const filter  = useTransform(blur, (v) => `blur(${v}px)`)

  const color =
    word.style === 'accent' ? 'var(--accent)' :
    word.style === 'muted'  ? 'var(--muted)'  :
    'var(--text)'

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter,
        color,
        fontStyle: word.italic ? 'italic' : 'normal',
        display: 'inline-block',
        willChange: 'transform, opacity, filter',
      }}
    >
      {word.text}
    </motion.span>
  )
}

// ── Manifesto ─────────────────────────────────────────────────────────────────
export function Manifesto() {
  const shouldReduce = useReducedMotion()

  const sectionRef = useRef<HTMLElement | null>(null)
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null)

  const refCallback = useCallback((el: HTMLElement | null) => {
    sectionRef.current = el
    setSectionEl(el)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionEl ? sectionRef : undefined,
    offset: ['start 0.88', 'end 0.22'],
  })

  // Subtle container rotation scrubbed by scroll
  const containerRotate = useTransform(scrollYProgress, [0, 1], [1.2, 0])

  // CTA fade — starts after the last word is mostly revealed
  const ctaOpacity = useTransform(scrollYProgress, [0.88, 0.97], [0, 1])
  const ctaY       = useTransform(scrollYProgress, [0.88, 0.97], [24, 0])

  // Background ghost text parallax
  const bgTextY = useTransform(scrollYProgress, [0, 1], [80, -80])

  // Split words into lines for layout
  const line1 = useMemo(() => WORDS.slice(0, 7),  [])
  const line2 = useMemo(() => WORDS.slice(7, 10),  [])
  const line3 = useMemo(() => WORDS.slice(10, 16), [])

  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={refCallback}
      style={{
        paddingTop: '12rem',
        paddingBottom: '12rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Oversized ghost type — depth layer */}
      {!shouldReduce && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            y: bgTextY,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(12rem, 30vw, 32rem)',
              lineHeight: 0.85,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(240,237,232,0.035)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.04em',
            }}
          >
            Eindruck
          </span>
        </motion.div>
      )}

      {/* Radial lime glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '70vw',
          maxWidth: 1100,
          maxHeight: 1100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.04), transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3.5rem',
          }}
        >
          {/* ── Manifesto text ── */}
          {shouldReduce ? (
            /* Static fallback for reduced-motion */
            <div
              className="display-manifesto"
              style={{ maxWidth: 960, lineHeight: 1.12 }}
            >
              <span>Ihre Website ist oft der </span>
              <em style={{ color: 'var(--accent)' }}>erste Eindruck</em>
              <span>.</span>
              <br />
              <span>Manchmal der einzige.</span>
              <br />
              <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                Wir sorgen dafür, dass er zählt.
              </span>
            </div>
          ) : (
            <motion.div
              className="display-manifesto"
              style={{
                maxWidth: 960,
                lineHeight: 1.12,
                rotate: containerRotate,
                transformOrigin: 'center 60%',
              }}
            >
              {/* Line 1 */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '0.28em',
                  marginBottom: '0.08em',
                }}
              >
                {line1.map((word, i) => (
                  <WordReveal
                    key={i}
                    word={word}
                    index={i}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>

              {/* Line 2 */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '0.28em',
                  marginBottom: '0.08em',
                }}
              >
                {line2.map((word, i) => (
                  <WordReveal
                    key={i}
                    word={word}
                    index={7 + i}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>

              {/* Line 3 */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '0.28em',
                }}
              >
                {line3.map((word, i) => (
                  <WordReveal
                    key={i}
                    word={word}
                    index={10 + i}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Accent divider */}
          <motion.div
            style={{
              width: 1,
              height: 52,
              background: 'linear-gradient(to bottom, rgba(200,255,0,0.65), transparent)',
              opacity: shouldReduce ? 1 : ctaOpacity,
            }}
          />

          {/* CTA */}
          {shouldReduce ? (
            <a
              href="#kontakt"
              onClick={scrollTo}
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.85rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '1rem 2.5rem',
                borderRadius: 100,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Jetzt Projekt anfragen →
            </a>
          ) : (
            <motion.a
              href="#kontakt"
              onClick={scrollTo}
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.85rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '1rem 2.5rem',
                borderRadius: 100,
                textDecoration: 'none',
                display: 'inline-block',
                opacity: ctaOpacity,
                y: ctaY,
                boxShadow: '0 0 40px rgba(200,255,0,0.18)',
              }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Jetzt Projekt anfragen →
            </motion.a>
          )}
        </div>
      </div>
    </section>
  )
}

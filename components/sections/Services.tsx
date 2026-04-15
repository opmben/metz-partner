'use client'

import { useRef, useCallback, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { services, type Service } from '@/lib/data/services'
import { clipRevealUp, staggerContainer, fadeUp } from '@/lib/animations'

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const pillVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
}

// ─── SVG helpers (scoped per component via closure) ───────────────────────────
function makeSvgHelpers(go: boolean) {
  const t = (dur: number, del: number) => ({
    duration: dur,
    delay: go ? del : 0,
    ease: EASE,
  })
  const fadeIn = (del: number, dur = 0.5) => ({
    initial: { opacity: 0 },
    animate: go ? { opacity: 1 } : { opacity: 0 },
    transition: t(dur, del),
  })
  const revealX = (del: number, dur = 0.5) => ({
    initial: { scaleX: 0, opacity: 0 },
    animate: go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 },
    style: { transformBox: 'fill-box' as const, transformOrigin: 'left center' },
    transition: t(dur, del),
  })
  const popIn = (del: number, stiffness = 280) => ({
    initial: { scale: 0, opacity: 0 },
    animate: go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 },
    transition: { ...t(0.45, del), type: 'spring' as const, stiffness, damping: 20 },
  })
  return { t, fadeIn, revealX, popIn }
}

// ─── Webdesign Illustration ───────────────────────────────────────────────────
function WebdesignIllustration({ isVisible }: { isVisible: boolean }) {
  const go = isVisible
  const { t, fadeIn, revealX, popIn } = makeSvgHelpers(go)

  return (
    <svg
      viewBox="0 0 560 315"
      fill="none"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    >
      <rect width="560" height="315" fill="#111111" />

      {/* Subtle orb glow */}
      <motion.ellipse cx="480" cy="148" rx="100" ry="80" fill="rgba(200,255,0,0.04)"
        {...fadeIn(1.2, 0.8)}
      />

      {/* Browser outer frame — draws in via path stroke */}
      <motion.path
        d="M26,18 H534 Q542,18 542,26 V289 Q542,297 534,297 H26 Q18,297 18,289 V26 Q18,18 26,18 Z"
        stroke="rgba(240,237,232,0.08)" strokeWidth={1} fill="#0C0C0C"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(1.1, 0)}
      />

      {/* Chrome bar */}
      <motion.rect x="18" y="18" width="524" height="44" fill="#161616" {...fadeIn(0.3, 0.3)} />
      <motion.rect x="18" y="50" width="524" height="12" fill="#161616" {...fadeIn(0.3, 0.3)} />
      <motion.line x1="18" y1="61" x2="542" y2="61" stroke="rgba(240,237,232,0.05)" strokeWidth={1}
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.6, 0.5)}
      />

      {/* Traffic lights */}
      <motion.circle cx="40" cy="40" r="5.5" fill="rgba(255,95,87,0.75)" {...popIn(0.55, 320)} />
      <motion.circle cx="57" cy="40" r="5.5" fill="rgba(255,189,68,0.75)" {...popIn(0.65, 320)} />
      <motion.circle cx="74" cy="40" r="5.5" fill="rgba(40,200,64,0.75)" {...popIn(0.75, 320)} />

      {/* URL bar */}
      <motion.rect x="148" y="28" width="264" height="24" rx="12"
        fill="rgba(240,237,232,0.04)" stroke="rgba(240,237,232,0.09)" strokeWidth={1}
        {...fadeIn(0.65, 0.4)}
      />
      <motion.circle cx="164" cy="40" r="4" fill="rgba(200,255,0,0.4)" {...fadeIn(0.75, 0.35)} />
      <motion.rect x="175" y="36" width="115" height="7" rx="3" fill="rgba(240,237,232,0.22)" {...revealX(0.8, 0.5)} />

      {/* Nav bar (inside page) */}
      <motion.rect x="18" y="62" width="524" height="42" fill="#0E0E0E" {...fadeIn(0.45, 0.4)} />
      <motion.rect x="18" y="103" width="524" height="1" fill="rgba(240,237,232,0.04)" {...fadeIn(0.3, 0.55)} />

      {/* Logo block */}
      <motion.rect x="40" y="75" width="72" height="12" rx="3"
        fill="rgba(200,255,0,0.12)" stroke="rgba(200,255,0,0.28)" strokeWidth={0.75}
        {...fadeIn(0.6, 0.55)}
      />

      {/* Nav links */}
      {([152, 196, 250, 290] as const).map((x, i) => (
        <motion.rect key={x} x={x} y="79" width={([34, 44, 30, 38] as const)[i]} height="5" rx="2"
          fill="rgba(240,237,232,0.12)" {...revealX(0.58 + i * 0.07, 0.38)}
        />
      ))}

      {/* Nav CTA */}
      <motion.rect x="455" y="69" width="68" height="24" rx="12" fill="rgba(200,255,0,0.85)" {...popIn(0.95)} />
      <motion.rect x="466" y="79" width="46" height="5" rx="2" fill="#0C0C0C" {...fadeIn(1.05, 0.3)} />

      {/* Hero background */}
      <motion.rect x="18" y="104" width="524" height="130" fill="#080808" {...fadeIn(0.5, 0.6)} />

      {/* Hero headlines — staggered bar reveal */}
      <motion.rect x="40" y="120" width="280" height="18" rx="3" fill="rgba(240,237,232,0.22)" {...revealX(0.85, 0.55)} />
      <motion.rect x="40" y="144" width="240" height="16" rx="3" fill="rgba(240,237,232,0.18)" {...revealX(0.5, 0.95)} />
      <motion.rect x="40" y="168" width="136" height="16" rx="3" fill="rgba(200,255,0,0.65)" {...revealX(0.5, 1.05)} />
      <motion.rect x="184" y="168" width="80" height="16" rx="3" fill="rgba(240,237,232,0.18)" {...revealX(0.4, 1.13)} />

      {/* Sub-copy lines */}
      <motion.rect x="40" y="196" width="240" height="5" rx="2" fill="rgba(240,237,232,0.12)" {...fadeIn(1.2, 0.35)} />
      <motion.rect x="40" y="206" width="200" height="5" rx="2" fill="rgba(240,237,232,0.08)" {...fadeIn(1.28, 0.35)} />

      {/* CTA buttons */}
      <motion.rect x="40" y="220" width="118" height="30" rx="15" fill="rgba(200,255,0,0.88)" {...popIn(1.28, 260)} />
      <motion.rect x="56" y="233" width="86" height="5" rx="2" fill="#080808" {...fadeIn(1.38, 0.3)} />
      <motion.rect x="168" y="220" width="105" height="30" rx="15"
        fill="rgba(240,237,232,0.05)" stroke="rgba(240,237,232,0.12)" strokeWidth={0.75}
        {...fadeIn(1.35, 0.4)}
      />

      {/* Right column: contact form */}
      <motion.rect x="350" y="118" width="148" height="12" rx="3" fill="rgba(240,237,232,0.2)" {...fadeIn(1.0, 0.4)} />
      <motion.rect x="350" y="156" width="174" height="22" rx="4"
        fill="rgba(240,237,232,0.03)" stroke="rgba(240,237,232,0.09)" strokeWidth={0.75}
        {...fadeIn(1.05, 0.35)}
      />
      <motion.rect x="350" y="184" width="174" height="22" rx="4"
        fill="rgba(240,237,232,0.03)" stroke="rgba(240,237,232,0.09)" strokeWidth={0.75}
        {...fadeIn(1.1, 0.35)}
      />
      {/* Active input — accent border */}
      <motion.rect x="350" y="212" width="174" height="22" rx="4"
        fill="rgba(200,255,0,0.03)" stroke="rgba(200,255,0,0.32)" strokeWidth={0.75}
        {...fadeIn(1.15, 0.4)}
      />
      {/* Cursor blink — loops */}
      <motion.rect x="422" y="217" width="1.5" height="9" rx="1" fill="rgba(200,255,0,0.7)"
        initial={{ opacity: 0 }}
        animate={go ? { opacity: [0, 1, 1, 0, 0] } : { opacity: 0 }}
        transition={
          go
            ? { duration: 1.0, repeat: Infinity, delay: 1.4, times: [0, 0.05, 0.5, 0.55, 1] }
            : { duration: 0 }
        }
      />
      <motion.rect x="350" y="243" width="174" height="28" rx="14" fill="rgba(200,255,0,0.85)" {...popIn(1.3, 260)} />

      {/* Bottom strip */}
      <motion.rect x="18" y="234" width="524" height="63" fill="#0A0A0A" {...fadeIn(0.95, 0.4)} />
      <motion.rect x="40" y="251" width="88" height="32" rx="6"
        fill="rgba(200,255,0,0.07)" stroke="rgba(200,255,0,0.2)" strokeWidth={0.75}
        {...popIn(1.4, 240)}
      />
      <motion.circle cx="420" cy="258" r="4" fill="rgba(200,255,0,0.45)" {...fadeIn(1.45, 0.3)} />
      <motion.rect x="430" y="255" width="40" height="5" rx="2" fill="rgba(240,237,232,0.15)" {...fadeIn(1.48, 0.3)} />
    </svg>
  )
}

// ─── SEO Illustration ─────────────────────────────────────────────────────────
function SEOIllustration({ isVisible }: { isVisible: boolean }) {
  const go = isVisible
  const { t, fadeIn, revealX, popIn } = makeSvgHelpers(go)

  return (
    <svg
      viewBox="0 0 560 315"
      fill="none"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    >
      <rect width="560" height="315" fill="#111111" />

      {/* Ambient glow */}
      <motion.ellipse cx="220" cy="55" rx="180" ry="40" fill="rgba(200,255,0,0.03)" {...fadeIn(1.0, 0.6)} />

      {/* Search bar */}
      <motion.rect x="20" y="22" width="380" height="44" rx="22"
        fill="#0D0D0D" stroke="rgba(240,237,232,0.1)" strokeWidth={1}
        {...fadeIn(0.5, 0)}
      />
      {/* Search icon circle */}
      <motion.circle cx="46" cy="44" r="8" stroke="rgba(240,237,232,0.18)" strokeWidth={1.2} fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(0.5, 0.3)}
      />
      <motion.line x1="52" y1="50" x2="60" y2="58" stroke="rgba(240,237,232,0.18)" strokeWidth={1.5} strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.3, 0.65)}
      />

      {/* Query text */}
      <motion.rect x="70" y="38" width="88" height="7" rx="3" fill="rgba(240,237,232,0.5)" {...revealX(0.4, 0.4)} />
      <motion.rect x="164" y="38" width="60" height="7" rx="3" fill="rgba(240,237,232,0.25)" {...revealX(0.35, 0.55)} />

      {/* Search button */}
      <motion.rect x="340" y="28" width="48" height="32" rx="16" fill="rgba(200,255,0,0.8)" {...popIn(0.7)} />
      <motion.rect x="351" y="40" width="26" height="5" rx="2" fill="#0D0D0D" {...fadeIn(0.8, 0.3)} />

      {/* Separator line */}
      <motion.line x1="20" y1="80" x2="540" y2="80" stroke="rgba(240,237,232,0.04)" strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.7, 0.6)}
      />

      {/* Result #1 — highlighted */}
      <motion.rect x="20" y="88" width="396" height="82" rx="6"
        fill="rgba(200,255,0,0.03)" stroke="rgba(200,255,0,0.28)" strokeWidth={1}
        {...fadeIn(0.6, 0.7)}
      />
      {/* Accent left border — scaleY reveal */}
      <motion.rect x="20" y="88" width="2" height="82" rx="1" fill="rgba(200,255,0,0.6)"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={go ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}
        transition={t(0.5, 0.9)}
      />

      {/* #1 rank badge */}
      <motion.rect x="358" y="96" width="46" height="22" rx="5"
        fill="rgba(200,255,0,0.15)" stroke="rgba(200,255,0,0.4)" strokeWidth={0.75}
        {...popIn(0.85, 300)}
      />
      <motion.rect x="369" y="104" width="24" height="7" rx="2" fill="rgba(200,255,0,0.75)" {...fadeIn(0.95, 0.3)} />

      {/* Favicon + URL */}
      <motion.circle cx="36" cy="102" r="5" fill="rgba(200,255,0,0.35)" {...fadeIn(0.85, 0.3)} />
      <motion.rect x="48" y="98" width="130" height="6" rx="2" fill="rgba(200,255,0,0.5)" {...revealX(0.45, 0.85)} />
      <motion.rect x="48" y="109" width="72" height="4" rx="2" fill="rgba(200,255,0,0.2)" {...revealX(0.38, 0.97)} />

      {/* Result title */}
      <motion.rect x="36" y="122" width="220" height="11" rx="3" fill="rgba(240,237,232,0.7)" {...revealX(0.5, 0.95)} />

      {/* Description lines */}
      <motion.rect x="36" y="141" width="300" height="5" rx="2" fill="rgba(240,237,232,0.22)" {...fadeIn(1.05, 0.4)} />
      <motion.rect x="36" y="152" width="240" height="5" rx="2" fill="rgba(240,237,232,0.14)" {...fadeIn(1.1, 0.4)} />

      {/* Result #2 */}
      <motion.rect x="20" y="182" width="396" height="70" rx="6"
        fill="transparent" stroke="rgba(240,237,232,0.05)" strokeWidth={0.75}
        {...fadeIn(0.5, 1.1)}
      />
      <motion.circle cx="36" cy="196" r="4.5" fill="rgba(240,237,232,0.1)" {...fadeIn(1.15, 0.3)} />
      <motion.rect x="48" y="192" width="110" height="5" rx="2" fill="rgba(240,237,232,0.15)" {...revealX(0.4, 1.15)} />
      <motion.rect x="36" y="208" width="195" height="9" rx="3" fill="rgba(240,237,232,0.25)" {...revealX(0.45, 1.22)} />
      <motion.rect x="36" y="224" width="285" height="4" rx="2" fill="rgba(240,237,232,0.1)" {...fadeIn(1.28, 0.35)} />
      <motion.rect x="36" y="233" width="210" height="4" rx="2" fill="rgba(240,237,232,0.07)" {...fadeIn(1.32, 0.35)} />

      {/* Result #3 */}
      <motion.rect x="20" y="262" width="396" height="40" rx="6"
        fill="transparent" stroke="rgba(240,237,232,0.03)" strokeWidth={0.75}
        {...fadeIn(0.4, 1.3)}
      />
      <motion.circle cx="36" cy="274" r="4" fill="rgba(240,237,232,0.06)" {...fadeIn(1.35, 0.3)} />
      <motion.rect x="48" y="270" width="95" height="5" rx="2" fill="rgba(240,237,232,0.1)" {...revealX(0.38, 1.35)} />
      <motion.rect x="36" y="284" width="180" height="7" rx="2" fill="rgba(240,237,232,0.16)" {...revealX(0.4, 1.42)} />

      {/* Sidebar card 1: Keyword rankings */}
      <motion.rect x="430" y="22" width="112" height="138" rx="6"
        fill="#0D0D0D" stroke="rgba(240,237,232,0.07)" strokeWidth={0.75}
        {...fadeIn(0.55, 0.8)}
      />
      <motion.rect x="442" y="33" width="75" height="5" rx="2" fill="rgba(240,237,232,0.2)" {...fadeIn(0.9, 0.35)} />
      <motion.line x1="442" y1="44" x2="530" y2="44" stroke="rgba(240,237,232,0.05)" strokeWidth={0.75}
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.4, 1.0)}
      />

      {/* Keyword bars */}
      {([
        { y: 52, labelW: 52, barW: 88, fill: 'rgba(200,255,0,0.45)', del: 0.95 },
        { y: 74, labelW: 44, barW: 70, fill: 'rgba(200,255,0,0.28)', del: 1.05 },
        { y: 96, labelW: 60, barW: 52, fill: 'rgba(200,255,0,0.18)', del: 1.15 },
        { y: 118, labelW: 38, barW: 36, fill: 'rgba(200,255,0,0.1)', del: 1.25 },
      ] as const).map(({ y, labelW, barW, fill, del }) => (
        <g key={y}>
          <motion.rect x="442" y={y} width={labelW} height="4" rx="2"
            fill="rgba(240,237,232,0.15)" {...fadeIn(del, 0.3)}
          />
          <motion.rect x="442" y={y + 8} width="88" height="6" rx="3" fill="rgba(240,237,232,0.06)" {...fadeIn(del + 0.05, 0.2)} />
          <motion.rect x="442" y={y + 8} width={barW} height="6" rx="3" fill={fill}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
            transition={t(0.5, del + 0.08)}
          />
        </g>
      ))}

      {/* Sidebar card 2: Traffic sparkline */}
      <motion.rect x="430" y="172" width="112" height="128" rx="6"
        fill="#0D0D0D" stroke="rgba(240,237,232,0.07)" strokeWidth={0.75}
        {...fadeIn(0.55, 0.9)}
      />
      <motion.rect x="442" y="183" width="60" height="5" rx="2" fill="rgba(240,237,232,0.2)" {...fadeIn(0.95, 0.35)} />
      <motion.rect x="442" y="193" width="45" height="4" rx="2" fill="rgba(200,255,0,0.35)" {...fadeIn(1.0, 0.3)} />

      {/* Sparkline area + path */}
      <motion.polygon
        points="442,278 442,260 455,252 466,245 475,236 484,224 494,212 505,204 518,278"
        fill="rgba(200,255,0,0.06)"
        {...fadeIn(1.3, 0.6)}
      />
      <motion.polyline
        points="442,260 455,252 466,245 475,236 484,224 494,212 505,204 518,196"
        stroke="rgba(200,255,0,0.7)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(0.8, 1.25)}
      />
      {/* Tip dot — pulses */}
      <motion.circle cx="518" cy="196" r="3.5" fill="rgba(200,255,0,0.85)" stroke="#0D0D0D" strokeWidth={1.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          go
            ? { scale: [0, 1.2, 1], opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={go ? { duration: 0.5, delay: 1.85, ease: EASE } : { duration: 0 }}
      />
    </svg>
  )
}

// ─── Branding Illustration ────────────────────────────────────────────────────
function BrandingIllustration({ isVisible }: { isVisible: boolean }) {
  const go = isVisible
  const { t, fadeIn, revealX, popIn } = makeSvgHelpers(go)

  return (
    <svg
      viewBox="0 0 560 315"
      fill="none"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    >
      <rect width="560" height="315" fill="#111111" />

      {/* Grid lines */}
      <motion.line x1="280" y1="18" x2="280" y2="297" stroke="rgba(240,237,232,0.05)" strokeWidth={1}
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.7, 0.2)}
      />
      <motion.line x1="18" y1="157" x2="542" y2="157" stroke="rgba(240,237,232,0.05)" strokeWidth={1}
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.7, 0.2)}
      />

      {/* ── TOP LEFT: Logo Construction ── */}
      <motion.rect x="30" y="26" width="72" height="5" rx="2" fill="rgba(240,237,232,0.18)" {...fadeIn(0.35, 0.3)} />
      <motion.rect x="30" y="35" width="50" height="3" rx="1" fill="rgba(200,255,0,0.25)" {...revealX(0.4, 0.42)} />

      {/* Construction guides */}
      <motion.circle cx="140" cy="97" r="36" stroke="rgba(200,255,0,0.07)" strokeWidth={0.75} strokeDasharray="3 4" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(0.8, 0.5)}
      />
      <motion.line x1="140" y1="61" x2="140" y2="133" stroke="rgba(200,255,0,0.08)" strokeWidth={0.5} strokeDasharray="2 3"
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.4, 0.75)}
      />
      <motion.line x1="104" y1="97" x2="176" y2="97" stroke="rgba(200,255,0,0.08)" strokeWidth={0.5} strokeDasharray="2 3"
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.4, 0.78)}
      />

      {/* M letterform — draws in */}
      <motion.path
        d="M110,127 L110,75 L140,107 L170,75 L170,127"
        stroke="rgba(240,237,232,0.55)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(1.0, 0.6)}
      />
      {/* Baseline */}
      <motion.line x1="106" y1="131" x2="174" y2="131" stroke="rgba(200,255,0,0.2)" strokeWidth={0.75}
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.4, 1.35)}
      />

      {/* Accent nodes — stagger pop-in */}
      <motion.circle cx="110" cy="75" r="3.5" fill="rgba(200,255,0,0.6)" {...popIn(1.42, 350)} />
      <motion.circle cx="170" cy="75" r="3.5" fill="rgba(200,255,0,0.4)" {...popIn(1.52, 350)} />
      <motion.circle cx="140" cy="107" r="4.5" fill="rgba(200,255,0,0.88)" stroke="#111111" strokeWidth={1.5} {...popIn(1.47, 350)} />
      <motion.circle cx="110" cy="127" r="3" fill="rgba(240,237,232,0.25)" {...popIn(1.57, 350)} />
      <motion.circle cx="170" cy="127" r="3" fill="rgba(240,237,232,0.25)" {...popIn(1.62, 350)} />

      {/* Brand name bars */}
      <motion.rect x="90" y="130" width="100" height="10" rx="2" fill="rgba(240,237,232,0.35)" {...revealX(0.5, 1.4)} />
      <motion.rect x="90" y="145" width="80" height="5" rx="2" fill="rgba(240,237,232,0.15)" {...revealX(0.45, 1.5)} />

      {/* ── TOP RIGHT: Color Palette ── */}
      <motion.rect x="292" y="26" width="68" height="5" rx="2" fill="rgba(240,237,232,0.18)" {...fadeIn(0.35, 0.4)} />
      <motion.rect x="292" y="35" width="48" height="3" rx="1" fill="rgba(200,255,0,0.25)" {...revealX(0.4, 0.5)} />

      {/* Primary swatch */}
      <motion.rect x="292" y="48" width="96" height="96" rx="5" fill="#080808" stroke="rgba(240,237,232,0.1)" strokeWidth={0.75}
        initial={{ scale: 0, opacity: 0 }} style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
        animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ ...t(0.55, 0.65), type: 'spring', stiffness: 220, damping: 22 }}
      />

      {/* Accent swatches */}
      <motion.rect x="396" y="48" width="66" height="44" rx="5" fill="#C8FF00"
        initial={{ scale: 0, opacity: 0 }} style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
        animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ ...t(0.5, 0.8), type: 'spring', stiffness: 240, damping: 20 }}
      />
      <motion.rect x="470" y="48" width="52" height="44" rx="5" fill="#FF6B35"
        initial={{ scale: 0, opacity: 0 }} style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
        animate={go ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ ...t(0.5, 0.92), type: 'spring', stiffness: 240, damping: 20 }}
      />
      <motion.rect x="396" y="100" width="60" height="44" rx="5" fill="#1A1A1A" stroke="rgba(240,237,232,0.07)" strokeWidth={0.75}
        {...fadeIn(0.45, 1.0)}
      />
      <motion.rect x="464" y="100" width="58" height="44" rx="5" fill="#111111" stroke="rgba(240,237,232,0.07)" strokeWidth={0.75}
        {...fadeIn(0.45, 1.06)}
      />

      {/* Swatch labels */}
      <motion.rect x="304" y="122" width="40" height="4" rx="2" fill="rgba(240,237,232,0.2)" {...fadeIn(1.1, 0.3)} />
      <motion.rect x="398" y="74" width="44" height="4" rx="2" fill="#080808" {...fadeIn(1.0, 0.3)} />
      <motion.rect x="472" y="74" width="35" height="4" rx="2" fill="rgba(255,255,255,0.5)" {...fadeIn(1.06, 0.3)} />

      {/* ── BOTTOM LEFT: Typography Specimen ── */}
      <motion.rect x="30" y="165" width="74" height="5" rx="2" fill="rgba(240,237,232,0.18)" {...fadeIn(0.35, 0.55)} />
      <motion.rect x="30" y="174" width="52" height="3" rx="1" fill="rgba(200,255,0,0.25)" {...revealX(0.4, 0.65)} />

      {/* Display specimen bars */}
      <motion.rect x="30" y="185" width="224" height="20" rx="3" fill="rgba(240,237,232,0.28)" {...revealX(0.55, 1.15)} />
      <motion.rect x="30" y="211" width="180" height="16" rx="3" fill="rgba(240,237,232,0.2)" {...revealX(0.5, 1.25)} />
      <motion.rect x="30" y="232" width="100" height="14" rx="3" fill="rgba(200,255,0,0.55)" {...revealX(0.45, 1.35)} />
      <motion.rect x="136" y="232" width="68" height="14" rx="3" fill="rgba(240,237,232,0.2)" {...revealX(0.4, 1.43)} />

      {/* Separator + labels */}
      <motion.line x1="30" y1="254" x2="254" y2="254" stroke="rgba(240,237,232,0.06)" strokeWidth={0.75}
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={t(0.5, 1.5)}
      />
      <motion.rect x="30" y="258" width="96" height="4" rx="2" fill="rgba(200,255,0,0.3)" {...revealX(0.45, 1.55)} />

      {/* UI font specimen */}
      <motion.rect x="30" y="268" width="224" height="5" rx="2" fill="rgba(240,237,232,0.1)" {...fadeIn(1.6, 0.35)} />
      <motion.rect x="30" y="278" width="196" height="5" rx="2" fill="rgba(240,237,232,0.07)" {...fadeIn(1.65, 0.35)} />
      <motion.rect x="30" y="288" width="210" height="5" rx="2" fill="rgba(240,237,232,0.07)" {...fadeIn(1.7, 0.35)} />

      {/* ── BOTTOM RIGHT: Business Cards ── */}
      <motion.rect x="292" y="165" width="80" height="5" rx="2" fill="rgba(240,237,232,0.18)" {...fadeIn(0.35, 0.6)} />
      <motion.rect x="292" y="174" width="56" height="3" rx="1" fill="rgba(200,255,0,0.25)" {...revealX(0.4, 0.7)} />

      {/* Dark card — slides in from left */}
      <motion.rect x="292" y="186" width="120" height="70" rx="5" fill="#080808" stroke="rgba(240,237,232,0.1)" strokeWidth={0.75}
        initial={{ x: -20, opacity: 0 }}
        animate={go ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={t(0.6, 1.2)}
      />
      <motion.rect x="292" y="186" width="120" height="2" rx="1" fill="rgba(200,255,0,0.55)" {...revealX(0.4, 1.4)} />
      <motion.path
        d="M306,202 L306,196 L313,203 L320,196 L320,202"
        stroke="rgba(240,237,232,0.4)" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(0.5, 1.45)}
      />
      <motion.circle cx="313" cy="203" r="2" fill="rgba(200,255,0,0.7)" {...popIn(1.72, 400)} />
      <motion.rect x="306" y="215" width="70" height="8" rx="2" fill="rgba(240,237,232,0.5)" {...revealX(0.4, 1.5)} />
      <motion.rect x="306" y="228" width="90" height="4" rx="2" fill="rgba(240,237,232,0.2)" {...fadeIn(1.58, 0.3)} />
      <motion.rect x="306" y="237" width="72" height="4" rx="2" fill="rgba(240,237,232,0.15)" {...fadeIn(1.62, 0.3)} />
      <motion.rect x="306" y="248" width="52" height="4" rx="2" fill="rgba(200,255,0,0.4)" {...fadeIn(1.66, 0.3)} />

      {/* Acid green card — slides in from right */}
      <motion.rect x="432" y="192" width="110" height="66" rx="5" fill="#C8FF00"
        initial={{ x: 20, opacity: 0 }}
        animate={go ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
        transition={t(0.6, 1.3)}
      />
      <motion.path
        d="M444,208 L444,202 L451,209 L458,202 L458,208"
        stroke="rgba(8,8,8,0.45)" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={t(0.5, 1.55)}
      />
      <motion.circle cx="451" cy="209" r="2" fill="rgba(8,8,8,0.55)" {...popIn(1.77, 400)} />
      <motion.rect x="444" y="220" width="70" height="8" rx="2" fill="rgba(8,8,8,0.6)" {...revealX(0.4, 1.6)} />
      <motion.rect x="444" y="233" width="90" height="4" rx="2" fill="rgba(8,8,8,0.3)" {...fadeIn(1.68, 0.3)} />
      <motion.rect x="444" y="242" width="72" height="4" rx="2" fill="rgba(8,8,8,0.25)" {...fadeIn(1.72, 0.3)} />
      <motion.rect x="444" y="251" width="44" height="4" rx="2" fill="rgba(8,8,8,0.4)" {...fadeIn(1.76, 0.3)} />
    </svg>
  )
}

// ─── Service Row ──────────────────────────────────────────────────────────────
function ServiceRow({ service }: { service: Service }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const illustrationRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const reduce = Boolean(shouldReduce)

  // Cursor parallax state
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const springX = useSpring(rotX, { stiffness: 80, damping: 25 })
  const springY = useSpring(rotY, { stiffness: 80, damping: 25 })
  const glowGradient = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(200,255,0,0.09), transparent 62%)`

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce || !illustrationRef.current) return
      const rect = illustrationRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      rotX.set((y - 0.5) * -7)
      rotY.set((x - 0.5) * 7)
      glowX.set(x * 100)
      glowY.set(y * 100)
    },
    [reduce, rotX, rotY, glowX, glowY]
  )

  const handleMouseLeave = useCallback(() => {
    rotX.set(0)
    rotY.set(0)
    glowX.set(50)
    glowY.set(50)
  }, [rotX, rotY, glowX, glowY])

  const Illustration =
    service.id === 'webdesign'
      ? WebdesignIllustration
      : service.id === 'seo'
      ? SEOIllustration
      : BrandingIllustration

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-[2fr_3fr]"
      style={{ gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}
    >
      {/* ── Left: number + title (desktop) ────────────────────────────────── */}
      <div className="hidden md:block">
        {/* Number — clip reveal */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            initial={reduce ? undefined : { y: '110%' }}
            animate={reduce ? undefined : isInView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <motion.span
              animate={
                reduce
                  ? undefined
                  : {
                      color: isInView
                        ? 'rgba(200,255,0,0.22)'
                        : 'rgba(240,237,232,0.06)',
                    }
              }
              transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 9vw, 11rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 0.9,
                userSelect: 'none',
                marginBottom: '1.5rem',
                color: reduce
                  ? isInView
                    ? 'rgba(200,255,0,0.22)'
                    : 'rgba(240,237,232,0.06)'
                  : undefined,
              }}
            >
              {service.number}
            </motion.span>
          </motion.div>
        </div>

        {/* Title — clip reveal */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h3
            initial={reduce ? undefined : { y: '110%' }}
            animate={reduce ? undefined : isInView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
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
          </motion.h3>
        </div>
      </div>

      {/* ── Right: illustration + text ─────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Mobile: number + title above illustration */}
        <div className="md:hidden">
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={reduce ? undefined : { y: '110%' }}
              animate={reduce ? undefined : isInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.05 }}
            >
              <motion.span
                animate={
                  reduce
                    ? undefined
                    : {
                        color: isInView
                          ? 'rgba(200,255,0,0.22)'
                          : 'rgba(240,237,232,0.06)',
                      }
                }
                transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 10vw, 5rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 0.9,
                  userSelect: 'none',
                  marginBottom: '0.75rem',
                  color: reduce
                    ? isInView
                      ? 'rgba(200,255,0,0.22)'
                      : 'rgba(240,237,232,0.06)'
                    : undefined,
                }}
              >
                {service.number}
              </motion.span>
            </motion.div>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '1.25rem' }}>
            <motion.h3
              initial={reduce ? undefined : { y: '110%' }}
              animate={reduce ? undefined : isInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 5vw, 1.9rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {service.title}
            </motion.h3>
          </div>
        </div>

        {/* Illustration with cursor parallax + glow */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          animate={reduce ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.85, ease: EASE, delay: reduce ? 0 : 0.18 }}
          style={{ perspective: '900px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={illustrationRef}
            style={{
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              aspectRatio: '16/9',
              rotateX: reduce ? undefined : springX,
              rotateY: reduce ? undefined : springY,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Cursor-following glow */}
            {!reduce && (
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: glowGradient,
                  pointerEvents: 'none',
                  zIndex: 3,
                  borderRadius: 4,
                }}
              />
            )}

            {/* Atmospheric glow — fades in on inView */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.4, delay: 0.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 75% 40%, rgba(200,255,0,0.045), transparent 65%)',
                pointerEvents: 'none',
                zIndex: 2,
                borderRadius: 4,
              }}
            />

            {/* Inline SVG */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <Illustration isVisible={isInView && !reduce} />
            </div>
          </motion.div>
        </motion.div>

        {/* Description — blur reveal */}
        <motion.p
          initial={reduce ? undefined : { opacity: 0, filter: 'blur(8px)' }}
          animate={
            reduce
              ? undefined
              : isInView
              ? { opacity: 1, filter: 'blur(0px)' }
              : { opacity: 0, filter: 'blur(8px)' }
          }
          transition={{ duration: 0.85, ease: EASE, delay: reduce ? 0 : 0.42 }}
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
        </motion.p>

        {/* Pills — stagger reveal */}
        <motion.div
          variants={reduce ? undefined : staggerContainer(0.06)}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}
        >
          {service.pills.map((pill) => (
            <motion.span
              key={pill}
              variants={reduce ? undefined : pillVariant}
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
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Services Section ─────────────────────────────────────────────────────────
export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Vertical scroll-progress line
  const { scrollYProgress } = useScroll({
    target: mounted ? sectionRef : undefined,
    offset: ['start 65%', 'end 35%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
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
          animate={shouldReduce ? undefined : isHeaderInView ? 'visible' : 'hidden'}
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

        {/* Rows wrapper with left scroll-progress line */}
        <div style={{ position: 'relative' }}>
          {/* Progress line track */}
          {!shouldReduce && (
            <div
              style={{
                position: 'absolute',
                left: -24,
                top: 0,
                bottom: 0,
                width: 1,
                background: 'var(--border)',
              }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: lineHeight,
                  background: 'var(--accent)',
                  originY: 0,
                  opacity: 0.6,
                }}
              />
            </div>
          )}

          {/* Service rows */}
          <div
            ref={rowsRef}
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
      </div>
    </section>
  )
}

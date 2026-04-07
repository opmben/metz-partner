'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

const navLinks = [
  { label: 'Projekte', href: '/projekte' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Prozess', href: '#prozess' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      variants={shouldReduce ? undefined : fadeUp}
      initial={shouldReduce ? undefined : 'hidden'}
      animate={shouldReduce ? undefined : 'visible'}
      transition={{ delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: scrolled ? 72 : 80,
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'rgba(8, 8, 8, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'height 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        className="container-site"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Metz & Partner
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={scrollTo(link.href)}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#kontakt"
          onClick={scrollTo('#kontakt')}
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
            textDecoration: 'none',
            transition: 'transform 0.2s ease',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04) translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1) translateY(0)'
          }}
        >
          Projekt anfragen
        </a>
      </div>
    </motion.header>
  )
}

'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'

const navLinks = [
  { label: 'Projekte', href: '/projekte' },
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Prozess', href: '/#prozess' },
  { label: 'Kontakt', href: '/#kontakt' },
]

export function Header() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)
  })

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNavClick = (href: string) => {
    setOpen(false)
    if (href.includes('#') && window.location.pathname === '/') {
      const id = href.split('#')[1]
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className="sticky top-0 z-[100] mx-auto w-full"
      animate={{
        paddingTop: scrolled && !open ? 16 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: 'none' }}
    >
      <motion.div
        animate={{
          maxWidth: scrolled && !open ? '896px' : '9999px',
          borderRadius: scrolled && !open ? 12 : 0,
          borderColor: scrolled || open
            ? 'rgba(240, 237, 232, 0.07)'
            : 'rgba(240, 237, 232, 0)',
          backgroundColor: open
            ? 'rgba(8, 8, 8, 0.97)'
            : scrolled
              ? 'rgba(8, 8, 8, 0.55)'
              : 'rgba(8, 8, 8, 0)',
          backdropFilter: scrolled && !open ? 'blur(20px)' : 'blur(0px)',
          boxShadow: scrolled && !open
            ? '0 0 0 1px rgba(240, 237, 232, 0.07), 0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 0 0 0px rgba(240, 237, 232, 0), 0 0px 0px rgba(0, 0, 0, 0)',
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          borderRadius: { duration: 0.5 },
          maxWidth: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          backgroundColor: { duration: 0.4 },
          backdropFilter: { duration: 0.4 },
        }}
        style={{
          maxWidth: '9999px',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderWidth: 1,
          borderStyle: 'solid',
          overflow: 'hidden',
          pointerEvents: 'auto',
        }}
      >
        <motion.nav
          className="container-site flex w-full items-center justify-between"
          animate={{
            height: scrolled && !open ? 56 : 72,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
            aria-label="Metz & Partner – Startseite"
          >
            <motion.div
              animate={{
                scale: scrolled && !open ? 0.9 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left center' }}
            >
              <Image
                src="/font2 tra 2.svg"
                alt="Metz & Partner Logo"
                width={180}
                height={44}
                style={{ height: '28px', width: 'auto' }}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/#kontakt"
              onClick={() => handleNavClick('/#kontakt')}
              className="button-glass-primary nav-cta-glass"
              style={{
                textDecoration: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.72rem',
                fontWeight: 500,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.11em',
                color: 'var(--text)',
                minHeight: '2.5rem',
                padding: '0.55rem 1.2rem',
              }}
            >
              Projekt anfragen
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex md:hidden"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
              color: 'var(--text)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'border-color 220ms ease, background 220ms ease',
            }}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </button>
        </motion.nav>

        {/* Mobile menu — md:hidden ensures it never renders on desktop */}
        <div className="md:hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderTop: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.05 + i * 0.05,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => handleNavClick(link.href)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.75rem 0',
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.5rem',
                          fontStyle: 'italic',
                          letterSpacing: '-0.01em',
                          color: 'var(--text)',
                          fontWeight: 400,
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ paddingTop: '1rem' }}
                >
                  <Link
                    href="/#kontakt"
                    onClick={() => handleNavClick('/#kontakt')}
                    className="button-glass-primary nav-cta-glass"
                    style={{
                      textDecoration: 'none',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.11em',
                      color: 'var(--text)',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    Projekt anfragen →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </motion.header>
  )
}

// ─── NavLink — subtle text link for desktop nav ────────────────────────────────

function NavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '0.72rem',
        fontWeight: 400,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.11em',
        color: hovered ? 'var(--text)' : 'var(--muted)',
        textDecoration: 'none',
        padding: '0.4rem 0.65rem',
        transition: 'color 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {children}
    </Link>
  )
}

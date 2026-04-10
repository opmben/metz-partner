'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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
          maxWidth: scrolled && !open ? 896 : 9999,
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

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button asChild>
              <Link href="/#kontakt" onClick={() => handleNavClick('/#kontakt')}>
                Projekt anfragen
              </Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-[var(--border)] md:hidden"
              style={{ overflow: 'hidden' }}
            >
              <div className="flex h-full w-full flex-col justify-between gap-y-2 p-6">
                <div className="grid gap-y-1">
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
                        className={buttonVariants({
                          variant: 'ghost',
                          className:
                            'justify-start text-base normal-case tracking-normal h-12',
                        })}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.5rem',
                          fontStyle: 'italic',
                          letterSpacing: '-0.01em',
                          color: 'var(--text)',
                          fontWeight: 400,
                          textTransform: 'none',
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
                >
                  <Button asChild size="lg" className="w-full">
                    <Link href="/#kontakt" onClick={() => handleNavClick('/#kontakt')}>
                      Projekt anfragen →
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  )
}

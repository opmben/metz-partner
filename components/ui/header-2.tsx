'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

const navLinks = [
    { label: 'Projekte', href: '/projekte' },
    { label: 'Leistungen', href: '/#leistungen' },
    { label: 'Prozess', href: '/#prozess' },
    { label: 'Kontakt', href: '/#kontakt' },
];

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(80);

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const handleNavClick = (href: string) => {
        setOpen(false);
        if (href.includes('#') && window.location.pathname === '/') {
            const id = href.split('#')[1];
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={cn(
                'sticky top-0 z-[100] mx-auto w-full border-b border-transparent transition-all duration-400 ease-out',
                {
                    'border-[var(--border)] backdrop-blur-xl md:top-4 md:max-w-5xl md:rounded-md md:shadow-[0_0_0_1px_var(--border)]':
                        scrolled && !open,
                    'border-[var(--border)]': open,
                },
            )}
            style={{
                background: open
                    ? 'rgba(8,8,8,0.97)'
                    : scrolled
                    ? 'rgba(8,8,8,0.55)'
                    : 'transparent',
            }}
        >
            <nav
                className={cn(
                    'container-site flex h-[72px] w-full items-center justify-between transition-all duration-400 ease-out',
                    { 'md:h-14': scrolled },
                )}
            >
                {/* Logo */}
                <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                    aria-label="Metz & Partner – Startseite"
                >
                    <Image
                        src="/font2 tra 2.png"
                        alt="Metz & Partner Logo"
                        width={44}
                        height={44}
                        style={{ width: 'auto', height: 44 }}
                        priority
                    />
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
            </nav>

            {/* Mobile menu */}
            <div
                className={cn(
                    'fixed top-[72px] right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t border-[var(--border)] md:hidden',
                    open ? 'block' : 'hidden',
                )}
                style={{ background: 'rgba(8,8,8,0.75)' }}
            >
                <div
                    data-slot={open ? 'open' : 'closed'}
                    className={cn(
                        'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
                        'flex h-full w-full flex-col justify-between gap-y-2 p-6',
                    )}
                >
                    <div className="grid gap-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className={buttonVariants({
                                    variant: 'ghost',
                                    className: 'justify-start text-base normal-case tracking-normal h-12',
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
                        ))}
                    </div>

                    <div>
                        <Button asChild size="lg" className="w-full">
                            <Link href="/#kontakt" onClick={() => handleNavClick('/#kontakt')}>
                                Projekt anfragen →
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

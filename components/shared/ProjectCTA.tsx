'use client'
import Link from 'next/link'
import StarBorder from '@/components/StarBorder'

interface ProjectCTAProps {
  nextSlug?: string
  nextName?: string
}

export function ProjectCTA({ nextSlug, nextName }: ProjectCTAProps) {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexShrink: 0 }}>
      <StarBorder as={Link} href="/#kontakt">
        Projekt anfragen
      </StarBorder>
      {nextSlug && (
        <Link
          href={`/projekte/${nextSlug}`}
          style={{
            color: 'var(--muted)',
            fontSize: '0.875rem',
            fontWeight: 300,
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
          }}
        >
          {nextName ? `${nextName} →` : 'Nächstes Projekt →'}
        </Link>
      )}
    </div>
  )
}

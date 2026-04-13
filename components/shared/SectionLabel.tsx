interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        border: '1px solid var(--border)',
        borderRadius: 100,
        padding: '0.3rem 1rem',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-ui)',
        fontWeight: 400,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        marginBottom: '1.5rem',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          flexShrink: 0,
          display: 'block',
          boxShadow: '0 0 6px rgba(200,255,0,0.6)',
        }}
      />
      {children}
    </div>
  )
}

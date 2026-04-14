interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      style={{
        fontSize: '0.7rem',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: 'var(--muted)',
      }}
    >
      <span
        style={{
          display: 'block',
          width: 28,
          height: 1,
          background: 'var(--muted)',
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  )
}

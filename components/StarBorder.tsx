'use client'
import React from 'react'
import './StarBorder.css'

export interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  color?: string
  speed?: string
  thickness?: number
  borderRadius?: string
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'var(--accent)',
  speed = '5s',
  thickness = 1,
  borderRadius = '100px',
  children,
  style,
  disabled,
  ...rest
}: StarBorderProps) => {
  return (
    <Component
      className={`star-border-container${disabled ? ' star-border-disabled' : ''} ${className}`}
      style={{ padding: `${thickness}px 0`, borderRadius, ...style }}
      disabled={disabled}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content" style={{ borderRadius }}>
        {children}
      </div>
    </Component>
  )
}

export default StarBorder

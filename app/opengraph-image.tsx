import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Metz & Partner — Webdesign aus Koblenz'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#0c0c0f',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'serif',
        gap: 20,
        position: 'relative',
      }}
    >
      {/* Subtle amber bloom */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 400,
          background:
            'radial-gradient(ellipse at center, rgba(184,134,11,0.18) 0%, rgba(211,253,81,0.06) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Label */}
      <div
        style={{
          color: '#d3fd51',
          fontSize: 14,
          letterSpacing: 8,
          textTransform: 'uppercase',
          fontFamily: 'sans-serif',
          fontWeight: 400,
          display: 'flex',
        }}
      >
        Webdesign
      </div>
      {/* Main headline */}
      <div
        style={{
          color: '#f5f0e8',
          fontSize: 80,
          fontStyle: 'italic',
          fontWeight: 400,
          letterSpacing: -2,
          lineHeight: 1.05,
          display: 'flex',
        }}
      >
        Metz &amp; Partner
      </div>
      {/* Separator */}
      <div
        style={{
          width: 48,
          height: 1,
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
        }}
      />
      {/* Region line */}
      <div
        style={{
          color: '#888',
          fontSize: 22,
          fontFamily: 'sans-serif',
          fontWeight: 300,
          display: 'flex',
          gap: 16,
        }}
      >
        <span>Koblenz</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>Rhein-Hunsrück</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>Rheinland-Pfalz</span>
      </div>
    </div>,
    size,
  )
}

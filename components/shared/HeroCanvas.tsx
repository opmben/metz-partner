'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Wireframe icosahedron mesh ── */
function WireframeSphere({ mouseX, mouseY }: { mouseX: React.MutableRefObject<number>; mouseY: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    // Base slow rotation
    groupRef.current.rotation.y = t * 0.12
    groupRef.current.rotation.x = t * 0.06
    // Mouse parallax tilt
    groupRef.current.rotation.y += mouseX.current * 0.3
    groupRef.current.rotation.x += mouseY.current * 0.15
  })

  return (
    <group ref={groupRef}>
      {/* Outer wireframe */}
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color="#C8FF00"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      {/* Inner wireframe — offset rotation for depth */}
      <mesh rotation={[Math.PI * 0.15, Math.PI * 0.1, 0]}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial
          color="#C8FF00"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
      {/* Faint sphere edge */}
      <mesh>
        <icosahedronGeometry args={[2.8, 2]} />
        <meshBasicMaterial
          color="#C8FF00"
          wireframe
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  )
}

export function HeroCanvas() {
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    mouseY.current = ((e.clientY - rect.top) / rect.height - 0.5) * 2
  }

  const handleMouseLeave = () => {
    mouseX.current = 0
    mouseY.current = 0
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '55%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <WireframeSphere mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  )
}

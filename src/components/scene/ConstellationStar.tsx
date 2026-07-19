'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useExperienceStore } from '@/stores/experienceStore'
import type { StarData } from '@/types'

// ─── Halo texture (canvas-generated radial gradient) ─────────────────────────
function createHaloTexture(color: string): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0,   color)
  gradient.addColorStop(0.4, color.replace('1)', '0.3)'))
  gradient.addColorStop(1,   color.replace('1)', '0)'))
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

interface Props {
  star: StarData
  isDecorativeNode?: false
  pulseOffset?: number
}

export function ConstellationStar({ star, pulseOffset = 0 }: Props) {
  const coreRef  = useRef<THREE.Mesh>(null!)
  const haloRef  = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)

  const [isLocalHovered, setIsLocalHovered] = useState(false)

  const {
    phase,
    hoveredStarId,
    setHoveredStarId,
    activeStarId,
    setActiveStarId,
    visitedStarIds,
    setPhase,
    markVisited,
    allDiscovered,
  } = useExperienceStore()

  const isHovered  = hoveredStarId === star.id
  const isVisited  = visitedStarIds.has(star.id)
  const isActive   = activeStarId  === star.id
  const isExploring = phase === 'exploring'

  // Gold when visited, blue-white otherwise
  const coreColor   = isVisited ? '#B8960C' : '#e8f4ff'
  const haloColor   = isVisited ? 'rgba(184,150,12,1)' : 'rgba(126,184,212,1)'
  const haloScale   = isHovered ? 3.8 : 2.6

  const haloTexture = useMemo(() => {
    if (typeof window === 'undefined') return null
    return createHaloTexture(haloColor)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisited])

  // Breathing pulse
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + pulseOffset
    const pulse = 1 + Math.sin(t * 1.2) * 0.06

    if (coreRef.current) {
      coreRef.current.scale.setScalar(pulse * (isHovered ? 1.5 : 1.0))
      ;(coreRef.current.material as THREE.MeshBasicMaterial).color.set(
        isHovered ? '#ffffff' : coreColor
      )
    }
    if (haloRef.current) {
      const hPulse = 1 + Math.sin(t * 0.9 + 0.5) * 0.12
      haloRef.current.scale.setScalar(haloScale * hPulse)
      ;(haloRef.current.material as THREE.SpriteMaterial).opacity =
        isHovered ? 0.80 : 0.45
    }
  })

  const handleClick = useCallback(() => {
    if (!isExploring) return
    setActiveStarId(star.id)
    setHoveredStarId(null)
    setPhase('traveling')
  }, [isExploring, star.id, setActiveStarId, setHoveredStarId, setPhase])

  const handlePointerOver = useCallback(() => {
    if (!isExploring) return
    setIsLocalHovered(true)
    setHoveredStarId(star.id)
    document.body.style.cursor = 'pointer'
  }, [isExploring, star.id, setHoveredStarId])

  const handlePointerOut = useCallback(() => {
    setIsLocalHovered(false)
    setHoveredStarId(null)
    document.body.style.cursor = 'auto'
  }, [setHoveredStarId])

  return (
    <group
      ref={groupRef}
      position={star.position}
    >
      {/* Invisible large hitbox for reliable clicking */}
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.22, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Core star point (visual only) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={coreColor} transparent opacity={0.95} />
      </mesh>

      {/* Halo sprite */}
      {haloTexture && (
        <sprite ref={haloRef} scale={[1.2, 1.2, 1.2]}>
          <spriteMaterial
            map={haloTexture}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={0.25}
          />
        </sprite>
      )}

      {/* Capsule special sparkle ring */}
      {star.type === 'capsule' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.07, 0.09, 24]} />
          <meshBasicMaterial
            color="#B8960C"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Hover label */}
      {isHovered && isExploring && (
        <Html
          center
          position={[0, 0.25, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#F5F0E8',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              textShadow: '0 0 12px rgba(126,184,212,0.8)',
              opacity: 0.9,
            }}
          >
            {star.subtitle || star.title}
          </div>
        </Html>
      )}
    </group>
  )
}

// ─── Decorative node (non-interactive structural star) ────────────────────────
interface DecorProps {
  position: [number, number, number]
  pulseOffset?: number
}

export function DecorativeStar({ position, pulseOffset = 0 }: DecorProps) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const pulse = 1 + Math.sin(clock.elapsedTime * 0.9 + pulseOffset) * 0.05
    if (ref.current) ref.current.scale.setScalar(pulse)
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.028, 6, 6]} />
      <meshBasicMaterial color="#d0e4f0" transparent opacity={0.55} />
    </mesh>
  )
}

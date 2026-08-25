'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Soft elliptical nebula glow
function nebulaSprite(r: number, g: number, b: number): THREE.Texture {
  const S = 256
  const canvas = document.createElement('canvas')
  canvas.width = S; canvas.height = S
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  grad.addColorStop(0,    `rgba(${r},${g},${b},0.70)`)
  grad.addColorStop(0.25, `rgba(${r},${g},${b},0.35)`)
  grad.addColorStop(0.55, `rgba(${r},${g},${b},0.10)`)
  grad.addColorStop(1,    `rgba(${r},${g},${b},0.00)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, S, S)
  return new THREE.CanvasTexture(canvas)
}

// Wide, soft Milky Way stripe — very low contrast
function milkyWaySprite(): THREE.Texture {
  const W = 512, H = 128
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Vertical fade (wide gaussian-like band)
  const vGrad = ctx.createLinearGradient(0, 0, 0, H)
  vGrad.addColorStop(0,    'rgba(60,80,160,0.00)')
  vGrad.addColorStop(0.25, 'rgba(70,90,170,0.12)')
  vGrad.addColorStop(0.50, 'rgba(85,110,185,0.22)')
  vGrad.addColorStop(0.75, 'rgba(70,90,170,0.12)')
  vGrad.addColorStop(1,    'rgba(60,80,160,0.00)')
  ctx.fillStyle = vGrad
  ctx.fillRect(0, 0, W, H)

  // Horizontal fade — dark at edges
  const hGrad = ctx.createLinearGradient(0, 0, W, 0)
  hGrad.addColorStop(0,    'rgba(0,0,0,1)')
  hGrad.addColorStop(0.15, 'rgba(0,0,0,0)')
  hGrad.addColorStop(0.85, 'rgba(0,0,0,0)')
  hGrad.addColorStop(1,    'rgba(0,0,0,1)')
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillStyle = hGrad
  ctx.fillRect(0, 0, W, H)
  ctx.globalCompositeOperation = 'source-over'

  // Faint micro-star dust
  for (let i = 0; i < 200; i++) {
    const x = W * 0.1 + Math.random() * W * 0.8
    const y = H * 0.2 + Math.random() * H * 0.6
    const a = 0.05 + Math.random() * 0.15
    ctx.beginPath()
    ctx.arc(x, y, 0.4 + Math.random() * 1.2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(200,215,255,${a})`
    ctx.fill()
  }
  return new THREE.CanvasTexture(canvas)
}

// Nebula positions: deep in background
const NEBULAS = [
  { pos: [-7,  2.0, -16] as [number,number,number], w: 13, h:  9, rgb: [12, 20, 80]  as [number,number,number], op: 0.14 },
  { pos: [ 6, -1.5, -18] as [number,number,number], w: 16, h: 11, rgb: [45,  8, 70]  as [number,number,number], op: 0.12 },
  { pos: [-1,  2.5, -20] as [number,number,number], w: 20, h: 13, rgb: [8,  45, 65]  as [number,number,number], op: 0.10 },
  { pos: [ 3,  1.0, -14] as [number,number,number], w:  9, h:  7, rgb: [55, 10, 75]  as [number,number,number], op: 0.11 },
  { pos: [-4, -2.0, -15] as [number,number,number], w: 11, h:  8, rgb: [8,  55, 50]  as [number,number,number], op: 0.10 },
  { pos: [ 0,  0.0, -22] as [number,number,number], w: 24, h: 15, rgb: [18, 18, 55]  as [number,number,number], op: 0.18 },
]

export function GalacticBackground() {
  const mwRef = useRef<THREE.Mesh>(null!)

  const { nebulas, milkyWay } = useMemo(() => ({
    nebulas:  NEBULAS.map(n => ({ ...n, tex: nebulaSprite(...n.rgb) })),
    milkyWay: milkyWaySprite(),
  }), [])

  // Very slow milky way drift
  useFrame(({ clock }) => {
    if (mwRef.current) {
      mwRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.004) * 0.015
    }
  })

  return (
    <group>
      {/* Milky Way band — flat plane with soft texture, tilted slightly */}
      <mesh ref={mwRef} position={[0, 0.5, -18]} rotation={[0, 0, 0.10]}>
        <planeGeometry args={[55, 8]} />
        <meshBasicMaterial
          map={milkyWay}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Nebula sprites (always face camera, soft radial) */}
      {nebulas.map((n, i) => (
        <sprite key={i} position={n.pos} scale={[n.w, n.h, 1]}>
          <spriteMaterial
            map={n.tex}
            transparent
            opacity={n.op}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  )
}

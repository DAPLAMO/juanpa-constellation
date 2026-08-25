'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Soft elliptical aurora glow — always faces camera, no hard edges
function auroraGlowTexture(
  r: number, g: number, b: number,
  aspectW: number = 1, // horizontal stretch factor
): THREE.Texture {
  const W = 512
  const H = Math.round(W / Math.max(1, aspectW))
  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Stretched radial gradient: elliptical glow
  ctx.save()
  ctx.translate(W / 2, H / 2)
  ctx.scale(1, H / W)           // squeeze vertically to make wide ellipse
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, W / 2)
  grad.addColorStop(0.00, `rgba(${r},${g},${b},0.85)`)
  grad.addColorStop(0.25, `rgba(${r},${g},${b},0.45)`)
  grad.addColorStop(0.55, `rgba(${r},${g},${b},0.12)`)
  grad.addColorStop(0.80, `rgba(${r},${g},${b},0.03)`)
  grad.addColorStop(1.00, `rgba(${r},${g},${b},0.00)`)
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(0, 0, W / 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  return new THREE.CanvasTexture(canvas)
}

// Aurora glow blobs — positioned to feel like curtains without hard edges
// Keep away from center (where constellation lives)
const GLOWS = [
  // Top-left area — green aurora
  { pos: [-7.5,  3.5, -12] as [number,number,number], w: 18, h:  5, rgb: [0,  200, 120] as [number,number,number], op: 0.055, spd: 0.18, ph: 0.0  },
  // Top-right — purple-blue
  { pos: [ 7.0,  3.0, -14] as [number,number,number], w: 20, h:  6, rgb: [80,  30, 200] as [number,number,number], op: 0.050, spd: 0.15, ph: 1.3  },
  // Lower-left — teal-cyan
  { pos: [-6.5, -2.5, -11] as [number,number,number], w: 16, h:  4, rgb: [0,  170, 180] as [number,number,number], op: 0.045, spd: 0.21, ph: 2.1  },
  // Lower-right — pink-violet
  { pos: [ 6.0, -2.0, -13] as [number,number,number], w: 18, h:  5, rgb: [180,  20, 160] as [number,number,number], op: 0.050, spd: 0.13, ph: 3.0  },
  // Wide top diffuse — cold blue (like a distant sky glow)
  { pos: [ 0.5,  5.5, -18] as [number,number,number], w: 32, h:  8, rgb: [40,  80, 220] as [number,number,number], op: 0.060, spd: 0.08, ph: 0.7  },
  // Wide bottom subtle — deep purple
  { pos: [-1.0, -5.0, -16] as [number,number,number], w: 28, h:  7, rgb: [60,   0, 140] as [number,number,number], op: 0.045, spd: 0.10, ph: 1.8  },
]

export function AuroraCurtains() {
  const refs = useRef<Array<THREE.Sprite | null>>(GLOWS.map(() => null))

  const textures = useMemo(
    () => GLOWS.map(g => auroraGlowTexture(...g.rgb)),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    GLOWS.forEach((g, i) => {
      const sprite = refs.current[i]
      if (!sprite) return
      // Gentle vertical drift
      sprite.position.y = g.pos[1] + Math.sin(t * g.spd + g.ph) * 0.4
      // Slow scale breathe (horizontal and vertical independently)
      const breatheX = 1 + Math.sin(t * g.spd * 0.7 + g.ph) * 0.06
      const breatheY = 1 + Math.sin(t * g.spd * 1.1 + g.ph + 0.5) * 0.08
      sprite.scale.set(g.w * breatheX, g.h * breatheY, 1)
      // Opacity pulse
      const mat = sprite.material as THREE.SpriteMaterial
      mat.opacity = g.op + Math.sin(t * g.spd * 1.6 + g.ph) * (g.op * 0.30)
    })
  })

  return (
    <group>
      {GLOWS.map((g, i) => (
        <sprite
          key={i}
          ref={el => { refs.current[i] = el }}
          position={g.pos}
          scale={[g.w, g.h, 1]}
        >
          <spriteMaterial
            map={textures[i]}
            transparent
            opacity={g.op}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  )
}

'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function starTex(): THREE.Texture {
  const S = 64
  const c = document.createElement('canvas')
  c.width = S; c.height = S
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(S/2,S/2,0, S/2,S/2,S/2)
  g.addColorStop(0,    'rgba(255,255,255,1.0)')
  g.addColorStop(0.12, 'rgba(220,235,255,0.9)')
  g.addColorStop(0.35, 'rgba(160,200,255,0.4)')
  g.addColorStop(0.70, 'rgba(100,150,255,0.1)')
  g.addColorStop(1,    'rgba(60,100,255,0.0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)
  return new THREE.CanvasTexture(c)
}

const PALETTES = [
  new THREE.Color('#ffffff'),
  new THREE.Color('#e8f0ff'),
  new THREE.Color('#ccdeff'),
  new THREE.Color('#b8d4f8'),
  new THREE.Color('#f0e8d8'),
  new THREE.Color('#ffd8b0'),
  new THREE.Color('#d0e8ff'),
  new THREE.Color('#ffe8e0'),
  new THREE.Color('#aee8ff'),
]

// ─── 5 parallax layers ────────────────────────────────────────────────────────
// rotSpd: rotation speed multiplier  driftAmp: how far individual stars drift
const LAYERS = [
  { count: 120,  zMin:-5,   zMax:-12,  size:0.12, rotSpd:0.032, driftAmp:0.18, driftFreq:0.22, baseOp:0.75, spread:[32,22] },
  { count: 500,  zMin:-12,  zMax:-28,  size:0.08, rotSpd:0.020, driftAmp:0.10, driftFreq:0.16, baseOp:0.68, spread:[60,40] },
  { count: 1200, zMin:-28,  zMax:-58,  size:0.07, rotSpd:0.011, driftAmp:0.06, driftFreq:0.10, baseOp:0.60, spread:[80,55] },
  { count: 2000, zMin:-58,  zMax:-100, size:0.075, rotSpd:0.005, driftAmp:0.03, driftFreq:0.07, baseOp:0.52, spread:[110,72] },
  { count: 800,  zMin:-100, zMax:-160, size:0.10,  rotSpd:0.002, driftAmp:0.01, driftFreq:0.04, baseOp:0.40, spread:[140,90] },
]

function buildLayer(cfg: typeof LAYERS[0]) {
  const n = cfg.count
  const pos    = new Float32Array(n * 3)
  const col    = new Float32Array(n * 3)
  // Per-star drift parameters
  const driftPh  = new Float32Array(n * 2)  // x-phase, y-phase
  const driftSpd = new Float32Array(n)       // individual speed multiplier
  const basePos  = new Float32Array(n * 3)   // original positions for drift offset

  for (let i = 0; i < n; i++) {
    const x = (Math.random()-0.5) * cfg.spread[0]
    const y = (Math.random()-0.5) * cfg.spread[1]
    const z = cfg.zMin - Math.random() * (cfg.zMax - cfg.zMin)
    pos[i*3]=x; pos[i*3+1]=y; pos[i*3+2]=z
    basePos[i*3]=x; basePos[i*3+1]=y; basePos[i*3+2]=z

    const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)]
    col[i*3]=palette.r; col[i*3+1]=palette.g; col[i*3+2]=palette.b

    driftPh[i*2]   = Math.random() * Math.PI * 2
    driftPh[i*2+1] = Math.random() * Math.PI * 2
    driftSpd[i]    = 0.4 + Math.random() * 1.2
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos,    3))
  geo.setAttribute('color',    new THREE.BufferAttribute(col,    3))
  return { geo, basePos, driftPh, driftSpd }
}

// ─── Foreground floating accent stars ─────────────────────────────────────────
const FG = Array.from({ length: 30 }, (_, i) => ({
  base: new THREE.Vector3(
    (Math.random()-0.5)*36, (Math.random()-0.5)*24, -3 - Math.random()*5
  ),
  amp:  new THREE.Vector2(0.5 + Math.random()*0.9, 0.3 + Math.random()*0.7),
  freq: new THREE.Vector2(0.06 + Math.random()*0.10, 0.05 + Math.random()*0.08),
  phase: Math.random() * Math.PI * 2,
  color: PALETTES[Math.floor(Math.random()*PALETTES.length)].clone(),
  size:  0.09 + Math.random()*0.14,
  op:    0.40 + Math.random()*0.35,
}))

export function BackgroundStars() {
  const layers = useMemo(() => LAYERS.map(buildLayer), [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refs   = useRef<any[]>(LAYERS.map(() => null))
  const fgRefs = useRef<Array<THREE.Sprite | null>>(FG.map(() => null))
  const tex    = useMemo(() => starTex(), [])

  const mats = useMemo(() => LAYERS.map((cfg, i) =>
    new THREE.PointsMaterial({
      map: tex, size: cfg.size, sizeAttenuation: true,
      transparent: true, opacity: cfg.baseOp,
      blending: THREE.AdditiveBlending, depthWrite: false,
      vertexColors: true,
    })
  ), [tex])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    LAYERS.forEach((cfg, li) => {
      const pts = refs.current[li]
      if (!pts) return

      // Group rotation (parallax between layers)
      pts.rotation.y = Math.sin(t * cfg.rotSpd)         * 0.06
      pts.rotation.x = Math.sin(t * cfg.rotSpd * 0.65)  * 0.03
      pts.rotation.z = Math.sin(t * cfg.rotSpd * 0.45)  * 0.015

      // Per-star position drift
      const { geo, basePos, driftPh, driftSpd } = layers[li]
      const posArr = (geo.attributes.position as THREE.BufferAttribute).array as Float32Array
      const n = cfg.count
      for (let i = 0; i < n; i++) {
        const spd = driftSpd[i] * cfg.driftFreq
        posArr[i*3]   = basePos[i*3]   + Math.sin(t * spd + driftPh[i*2])   * cfg.driftAmp
        posArr[i*3+1] = basePos[i*3+1] + Math.cos(t * spd + driftPh[i*2+1]) * cfg.driftAmp * 0.7
      }
      geo.attributes.position.needsUpdate = true

      // Opacity breathe (twinkle per layer)
      mats[li].opacity = cfg.baseOp + Math.sin(t * 0.55 + li * 1.3) * 0.12
    })

    // FG floating accent stars
    FG.forEach((fg, i) => {
      const sp = fgRefs.current[i]
      if (!sp) return
      sp.position.x = fg.base.x + Math.sin(t * fg.freq.x + fg.phase)          * fg.amp.x
      sp.position.y = fg.base.y + Math.cos(t * fg.freq.y + fg.phase + 1.0)    * fg.amp.y
      const tw = fg.op + Math.sin(t * (0.6 + i * 0.11) + fg.phase) * 0.18
      ;(sp.material as THREE.SpriteMaterial).opacity = Math.max(0.05, tw)
    })
  })

  return (
    <group>
      {layers.map((layer, i) => (
        <points
          key={i}
          ref={el => { refs.current[i] = el }}
          geometry={layer.geo}
          material={mats[i]}
        />
      ))}
      {FG.map((fg, i) => (
        <sprite
          key={`fg-${i}`}
          ref={el => { fgRefs.current[i] = el }}
          position={[fg.base.x, fg.base.y, fg.base.z]}
          scale={[fg.size * 2.2, fg.size * 2.2, 1]}
        >
          <spriteMaterial
            map={tex} transparent opacity={fg.op}
            blending={THREE.AdditiveBlending} depthWrite={false}
            color={fg.color}
          />
        </sprite>
      ))}
    </group>
  )
}

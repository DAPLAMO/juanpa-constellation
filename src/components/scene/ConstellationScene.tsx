'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { GalacticBackground }   from './GalacticBackground'
import { AuroraCurtains }       from './AuroraCurtains'
import { BackgroundStars }      from './BackgroundStars'
import { ConstellationStar, DecorativeStar } from './ConstellationStar'
import { ConstellationLines }   from './ConstellationLines'
import { CameraController }     from './CameraController'
import { FinaleStars }          from './FinaleStars'
import { STARS, getAllNodes }    from '@/data/stars'

const allNodes = getAllNodes()

function getInitialZ(): number {
  if (typeof window === 'undefined') return 22
  const aspect = window.innerWidth / window.innerHeight
  if (aspect < 0.6)  return 38
  if (aspect < 0.85) return 30
  if (aspect < 1.0)  return 25
  return 22
}

export default function ConstellationScene() {
  return (
    <Canvas
      camera={{ fov: 55, near: 0.1, far: 500, position: [0, 0, getInitialZ()] }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ background: '#02030A' }}

    >
      {/* Minimal ambient light — stars are self-illuminated */}
      <ambientLight intensity={0.03} />

      <Suspense fallback={null}>
        {/* Camera controller (no visual output) */}
        <CameraController />

        {/* Deep-space galactic environment */}
        <GalacticBackground />
        <AuroraCurtains />

        {/* Star field */}
        <BackgroundStars />

        {/* All structural/decorative nodes from every letter */}
        {allNodes
          .filter((n) => !n.isContent)
          .map((n, i) => (
            <DecorativeStar
              key={`${n.starId}-${n.nodeIndex}`}
              position={n.position}
              pulseOffset={i * 0.37}
            />
          ))}

        {/* 6 interactive content stars */}
        {STARS.map((star, i) => (
          <ConstellationStar
            key={star.id}
            star={star}
            pulseOffset={i * 0.9}
          />
        ))}

        {/* Letter connecting lines (invisible until finale) */}
        <ConstellationLines />

        {/* Finale merge animation */}
        <FinaleStars />
      </Suspense>
    </Canvas>
  )
}

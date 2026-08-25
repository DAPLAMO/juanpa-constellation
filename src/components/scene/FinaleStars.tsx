'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { STARS } from '@/data/stars'
import { useExperienceStore } from '@/stores/experienceStore'

// During finale-merge, all stars travel to center and fuse into one
export function FinaleStars() {
  const phase = useExperienceStore((s) => s.phase)
  const setPhase = useExperienceStore((s) => s.setPhase)
  const meshesRef = useRef<THREE.Mesh[]>([])
  const fusionRef = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    if (phase !== 'finale-merge') return

    // Animate each star toward origin
    meshesRef.current.forEach((mesh, i) => {
      gsap.to(mesh.position, {
        x: 0, y: 0, z: 0,
        duration: 3.0 + i * 0.05,
        ease: 'power3.inOut',
        delay: 0.5,
      })
      gsap.to((mesh.material as THREE.MeshBasicMaterial), {
        opacity: 0,
        duration: 1.0,
        ease: 'power2.in',
        delay: 3.2,
      })
    })

    // Fade in the single fusion star
    const fusionMat = fusionRef.current?.material as THREE.MeshBasicMaterial | undefined
    if (fusionMat) {
      gsap.to(fusionMat, {
        opacity: 1,
        duration: 1.8,
        ease: 'power2.out',
        delay: 3.0,
        onComplete: () => setPhase('finale-end'),
      })
    }

    // Fallback in case GSAP onComplete doesn't fire
    const timerId = setTimeout(() => setPhase('finale-end'), 5500)
    return () => clearTimeout(timerId)
  }, [phase, setPhase])

  // Pulsing fusion star
  useFrame(({ clock }) => {
    if (!fusionRef.current) return
    const mat = fusionRef.current.material as THREE.MeshBasicMaterial
    if (mat.opacity > 0.01) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2.0) * 0.15
      fusionRef.current.scale.setScalar(pulse)
    }
  })

  if (phase !== 'finale-merge' && phase !== 'finale-end') return null

  return (
    <group>
      {/* Individual content stars that converge */}
      {STARS.map((star, i) => (
        <mesh
          key={star.id}
          ref={(el) => { if (el) meshesRef.current[i] = el }}
          position={new THREE.Vector3(...star.position)}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial
            color="#B8960C"
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Single fusion star */}
      <mesh ref={fusionRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
        />
      </mesh>

      {/* Outer glow for fusion star */}
      <sprite position={[0, 0, 0]} scale={[2.5, 2.5, 1]}>
        <spriteMaterial
          color="#B8960C"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
    </group>
  )
}

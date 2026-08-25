'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { STARS } from '@/data/stars'
import { useExperienceStore } from '@/stores/experienceStore'

// Renders all letter-connecting lines, hidden until finale
export function ConstellationLines() {
  const groupRef = useRef<THREE.Group>(null!)
  const opacityObj = useRef({ value: 0 })  // plain object for GSAP tweening

  const phase = useExperienceStore((s) => s.phase)

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#a8d8f8'),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  )

  // Build line segments for each letter
  const lineObjects = useMemo(() => {
    const objects: THREE.Line[] = []
    for (const star of STARS) {
      for (const [a, b] of star.edges) {
        const posA = star.nodes[a]
        const posB = star.nodes[b]
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...posA),
          new THREE.Vector3(...posB),
        ])
        objects.push(new THREE.Line(geo, lineMaterial.clone()))
      }
    }
    return objects
  }, [lineMaterial])

  // Lines are subtly visible at all times; brighten dramatically on finale
  useEffect(() => {
    if (phase === 'landing') {
      gsap.killTweensOf(opacityObj.current)
      opacityObj.current.value = 0
    } else if (phase === 'entering') {
      gsap.to(opacityObj.current, { value: 0.10, duration: 2.5, ease: 'power1.inOut' })
    } else if (phase === 'finale-lines' || phase === 'finale-merge' || phase === 'finale-end') {
      gsap.to(opacityObj.current, { value: 0.60, duration: 3.5, ease: 'power1.inOut' })
    } else {
      // exploring, traveling, reading, returning
      gsap.to(opacityObj.current, { value: 0.20, duration: 1.5, ease: 'power1.inOut' })
    }
  }, [phase])

  useFrame(() => {
    const opacity = opacityObj.current.value
    lineObjects.forEach((line) => {
      ;(line.material as THREE.LineBasicMaterial).opacity = opacity
    })
  })

  return (
    <group ref={groupRef}>
      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  )
}

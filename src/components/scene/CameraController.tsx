'use client'

import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useExperienceStore } from '@/stores/experienceStore'
import { STARS } from '@/data/stars'
import {
  CAMERA_LANDING,
  CAMERA_OVERVIEW,
  getCameraTravelTarget,
} from '@/data/stars'

// Animatable target for camera lookAt (plain object for GSAP)
const lookAtTarget = { x: 0, y: 0, z: 0 }

// On portrait / narrow screens the constellation would be too tight.
// Pull the camera back proportionally to keep JUANPA comfortably visible.
function getMobileZScale(): number {
  if (typeof window === 'undefined') return 1
  const aspect = window.innerWidth / window.innerHeight
  if (aspect < 0.6)  return 1.55   // phones in portrait
  if (aspect < 0.85) return 1.25   // large phones / tablet portrait
  if (aspect < 1.0)  return 1.1
  return 1
}

export function CameraController() {
  const { camera } = useThree()
  const lookAtVec = useRef(new THREE.Vector3(0, 0, 0))
  const isAnimating = useRef(false)

  const {
    phase,
    setPhase,
    activeStarId,
    markVisited,
    allDiscovered,
  } = useExperienceStore()

  // Keep lookAt vector in sync
  useFrame(() => {
    lookAtVec.current.set(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z)
    camera.lookAt(lookAtVec.current)
  })

  // React to phase changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (phase === 'landing') {
      const [px, py, pz] = CAMERA_LANDING.position
      const zScale = getMobileZScale()
      camera.position.set(px, py, pz * zScale)
      lookAtTarget.x = 0; lookAtTarget.y = 0; lookAtTarget.z = 0
    }

    if (phase === 'entering') {
      // Slow cinematic zoom in from landing position to overview
      const [tx, ty, tz] = CAMERA_OVERVIEW.position
      const zScale = getMobileZScale()
      gsap.killTweensOf(camera.position)
      gsap.to(camera.position, {
        x: tx, y: ty, z: tz * zScale,
        duration: 2.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setPhase('exploring')
        },
      })
      // Fallback: if GSAP onComplete doesn't fire, use setTimeout
      const timerId = setTimeout(() => setPhase('exploring'), 3200)
      return () => clearTimeout(timerId)
    }

    if (phase === 'traveling' && activeStarId) {
      const star = STARS.find((s) => s.id === activeStarId)
      if (!star) return
      const { position, lookAt } = getCameraTravelTarget(star)
      const [px, py, pz] = position
      const [lx, ly, lz] = lookAt

      // Kill any competing GSAP tweens before starting
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(lookAtTarget)

      isAnimating.current = true
      const capturedStarId = activeStarId

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false
          markVisited(capturedStarId)
          setPhase('reading')
        }
      })
      tl.to(camera.position, { x: px, y: py, z: pz, duration: 2.6, ease: 'power2.inOut' })
        .to(lookAtTarget,    { x: lx, y: ly, z: lz, duration: 2.6, ease: 'power2.inOut' }, '<')

      // Fallback
      const timerId = setTimeout(() => {
        isAnimating.current = false
        markVisited(capturedStarId)
        setPhase('reading')
      }, 3000)
      return () => clearTimeout(timerId)
    }

    if (phase === 'returning') {
      const [px, py, pz] = CAMERA_OVERVIEW.position
      const zScale = getMobileZScale()

      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(lookAtTarget)

      const tl = gsap.timeline({
        onComplete: () => {
          const discovered = allDiscovered()
          setPhase(discovered ? 'finale-lines' : 'exploring')
        }
      })
      tl.to(lookAtTarget,    { x: 0, y: 0, z: 0, duration: 2.4, ease: 'power2.inOut' })
        .to(camera.position, { x: px, y: py, z: pz * zScale, duration: 2.6, ease: 'power2.inOut' }, '<0.2')

      // Fallback
      const timerId = setTimeout(() => {
        const discovered = allDiscovered()
        setPhase(discovered ? 'finale-lines' : 'exploring')
      }, 3200)
      return () => clearTimeout(timerId)
    }

    if (phase === 'finale-merge') {
      // Pull back slightly for the merge sequence
      gsap.to(camera.position, {
        x: 0, y: 0, z: 16,
        duration: 3.5,
        ease: 'power2.inOut',
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, activeStarId])

  return null
}

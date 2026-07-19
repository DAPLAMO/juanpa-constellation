'use client'

import { useExperienceStore } from '@/stores/experienceStore'

export function ExploreHint() {
  const phase          = useExperienceStore((s) => s.phase)
  const visitedStarIds = useExperienceStore((s) => s.visitedStarIds)

  if (phase !== 'exploring' || visitedStarIds.size > 0) return null

  return (
    <p className="anim-hint fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-50
                  font-cinzel text-cosmos-text/35 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase
                  pointer-events-none whitespace-nowrap">
      Explora las estrellas
    </p>
  )
}

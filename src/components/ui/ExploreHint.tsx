'use client'

import { useExperienceStore } from '@/stores/experienceStore'

export function ExploreHint() {
  const phase          = useExperienceStore((s) => s.phase)
  const visitedStarIds = useExperienceStore((s) => s.visitedStarIds)

  if (phase !== 'exploring' || visitedStarIds.size > 0) return null

  return (
    <p className="anim-hint fixed bottom-8 left-1/2 -translate-x-1/2 z-50
                  font-cinzel text-cosmos-text/25 text-[10px] tracking-[0.35em] uppercase
                  pointer-events-none">
      Explora las estrellas
    </p>
  )
}

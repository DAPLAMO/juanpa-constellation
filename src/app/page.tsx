'use client'

import dynamic from 'next/dynamic'
import { Landing }      from '@/components/ui/Landing'
import { MemoryCard }   from '@/components/ui/MemoryCard'
import { TimeCapsule }  from '@/components/ui/TimeCapsule'
import { AudioButton }  from '@/components/ui/AudioButton'
import { ExploreHint }  from '@/components/ui/ExploreHint'
import { FinalMessage } from '@/components/ui/FinalMessage'
import { useExperienceStore } from '@/stores/experienceStore'
import { STARS } from '@/data/stars'

// The 3D canvas must be imported with ssr: false (Three.js is browser-only)
const ConstellationScene = dynamic(
  () => import('@/components/scene/ConstellationScene'),
  { ssr: false }
)

export default function Home() {
  const activeStarId = useExperienceStore((s) => s.activeStarId)
  const phase        = useExperienceStore((s) => s.phase)

  // Determine which card component to show
  const activeStar = STARS.find((s) => s.id === activeStarId)
  const showMemory  = phase === 'reading' && activeStar?.type === 'memory'
  const showCapsule = phase === 'reading' && activeStar?.type === 'capsule'

  return (
    <main className="relative w-full h-screen overflow-hidden bg-cosmos-bg">
      {/* ── 3D scene (fills entire viewport) ── */}
      <div className="absolute inset-0">
        <ConstellationScene />
      </div>

      {/* ── UI overlays ── */}
      <Landing />
      {showMemory  && <MemoryCard />}
      {showCapsule && <TimeCapsule />}
      <FinalMessage />
      <ExploreHint />
      <AudioButton />
    </main>
  )
}

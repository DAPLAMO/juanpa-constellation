'use client'

import { create } from 'zustand'
import type { Phase } from '@/types'
import { STARS } from '@/data/stars'

interface ExperienceState {
  // ─── Phase ───────────────────────────────────────────────────────────────
  phase: Phase
  setPhase: (phase: Phase) => void

  // ─── Star interaction ─────────────────────────────────────────────────────
  hoveredStarId: string | null
  setHoveredStarId: (id: string | null) => void

  activeStarId: string | null
  setActiveStarId: (id: string | null) => void

  visitedStarIds: Set<string>
  markVisited: (id: string) => void

  // ─── Audio ────────────────────────────────────────────────────────────────
  audioEnabled: boolean
  toggleAudio: () => void

  // ─── Derived ─────────────────────────────────────────────────────────────
  allDiscovered: () => boolean
}

export const useExperienceStore = create<ExperienceState>((set, get) => ({
  phase: 'landing',
  setPhase: (phase) => set({ phase }),

  hoveredStarId: null,
  setHoveredStarId: (id) => set({ hoveredStarId: id }),

  activeStarId: null,
  setActiveStarId: (id) => set({ activeStarId: id }),

  visitedStarIds: new Set(),
  markVisited: (id) =>
    set((state) => {
      const next = new Set(state.visitedStarIds)
      next.add(id)
      return { visitedStarIds: next }
    }),

  audioEnabled: false,
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),

  allDiscovered: () => {
    const { visitedStarIds } = get()
    return STARS.every((s) => visitedStarIds.has(s.id))
  },
}))

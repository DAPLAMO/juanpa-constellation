'use client'

import { useState } from 'react'
import { useExperienceStore } from '@/stores/experienceStore'
import { STARS } from '@/data/stars'
import type { CapsuleLetter } from '@/types'

export function TimeCapsule() {
  const phase         = useExperienceStore((s) => s.phase)
  const activeStarId  = useExperienceStore((s) => s.activeStarId)
  const setPhase      = useExperienceStore((s) => s.setPhase)
  const setActiveStar = useExperienceStore((s) => s.setActiveStarId)
  const [openedIndex, setOpenedIndex] = useState<number | null>(null)

  const star = STARS.find((s) => s.id === activeStarId)
  if (phase !== 'reading' || !star || star.type !== 'capsule') return null

  const capsules = star.capsules ?? []

  const handleReturn = () => {
    setOpenedIndex(null)
    setPhase('returning')
    setTimeout(() => setActiveStar(null), 3000)
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 anim-card">
      <div
        className="absolute inset-0 anim-card-veil"
        style={{ background: 'radial-gradient(ellipse at center, rgba(4,6,10,0.5) 0%, rgba(4,6,10,0.94) 100%)' }}
      />

      <div className="relative z-10 max-w-xl w-full">
        {openedIndex === null ? (
          /* Lista de sobres */
          <div key="list">
            <div className="anim-card-line h-px mb-10" style={{ background: 'rgba(184,150,12,0.2)' }} />

            <p className="anim-card-sub font-cinzel text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--cosmos-gold)', opacity: 0.7 }}>
              Cápsula del tiempo
            </p>

            <h2 className="anim-card-title font-cinzel text-cosmos-text text-2xl mb-2" style={{ fontWeight: 400 }}>
              Ábreme cuando…
            </h2>

            <p className="anim-card-sub font-inter text-cosmos-text/40 text-xs mb-10">
              Elige el momento que más se acerque a lo que sientes ahora.
            </p>

            <div className="space-y-3">
              {capsules.map((cap, i) => (
                <button
                  key={i}
                  onClick={() => setOpenedIndex(i)}
                  className={`anim-capsule-item-${i} w-full text-left px-5 py-4 border border-cosmos-text/10
                             hover:border-cosmos-gold/40 hover:bg-cosmos-gold/5
                             transition-all duration-500 group`}
                  style={{ opacity: 0 }}
                >
                  <span className="font-cinzel text-cosmos-text/70 text-xs tracking-widest uppercase
                                   group-hover:text-cosmos-text transition-colors duration-400">
                    {cap.trigger}
                  </span>
                </button>
              ))}
            </div>

            <div className="h-px mt-10 mb-6" style={{ background: 'rgba(184,150,12,0.1)' }} />

            <button
              onClick={handleReturn}
              className="anim-card-back font-cinzel text-cosmos-text/30 text-xs tracking-[0.4em] uppercase
                         hover:text-cosmos-text/60 transition-colors duration-500"
            >
              Volver a la constelación
            </button>
          </div>
        ) : (
          /* Carta abierta */
          <OpenedCapsule
            capsule={capsules[openedIndex]}
            onClose={() => setOpenedIndex(null)}
            onReturn={handleReturn}
          />
        )}
      </div>
    </div>
  )
}

function OpenedCapsule({
  capsule, onClose, onReturn,
}: { capsule: CapsuleLetter; onClose: () => void; onReturn: () => void }) {
  return (
    <div className="anim-card" key="open">
      <div className="h-px mb-10" style={{ background: 'rgba(184,150,12,0.2)' }} />

      <p className="anim-card-sub font-cinzel text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(184,150,12,0.6)' }}>
        {capsule.trigger}
      </p>

      <div className="anim-card-text font-inter text-cosmos-text/75 text-sm leading-[2.0] space-y-4">
        {capsule.text.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="h-px mt-10 mb-6" style={{ background: 'rgba(184,150,12,0.1)' }} />

      <div className="flex gap-8">
        <button
          onClick={onClose}
          className="anim-card-back font-cinzel text-cosmos-text/35 text-xs tracking-[0.35em] uppercase
                     hover:text-cosmos-text/65 transition-colors duration-500"
        >
          ← Otras cartas
        </button>
        <button
          onClick={onReturn}
          className="anim-card-back font-cinzel text-cosmos-text/35 text-xs tracking-[0.35em] uppercase
                     hover:text-cosmos-text/65 transition-colors duration-500"
        >
          Volver a la constelación
        </button>
      </div>
    </div>
  )
}

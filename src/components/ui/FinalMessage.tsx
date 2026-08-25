'use client'

import { useEffect } from 'react'
import { useExperienceStore } from '@/stores/experienceStore'

export function FinalMessage() {
  const phase    = useExperienceStore((s) => s.phase)
  const setPhase = useExperienceStore((s) => s.setPhase)

  useEffect(() => {
    if (phase === 'finale-lines') {
      const t = setTimeout(() => setPhase('finale-merge'), 5000)
      return () => clearTimeout(t)
    }
  }, [phase, setPhase])

  return (
    <>
      {/* JUANPA revelado */}
      {phase === 'finale-lines' && (
        <div className="anim-finale-name fixed inset-0 flex items-end justify-center pb-20 pointer-events-none z-40">
          <p className="font-cinzel text-cosmos-text/30 text-xs tracking-[0.6em] uppercase">
            J&nbsp;&nbsp;U&nbsp;&nbsp;A&nbsp;&nbsp;N&nbsp;&nbsp;P&nbsp;&nbsp;A
          </p>
        </div>
      )}

      {/* Mensaje final */}
      {phase === 'finale-end' && (
        <div className="anim-finale-msg fixed inset-0 flex items-center justify-center px-8 pointer-events-none z-50">
          <div className="max-w-md text-center">
            <div className="anim-finale-line h-px mb-12 mx-auto w-24" style={{ background: 'rgba(184,150,12,0.3)' }} />

            <p className="font-cinzel text-cosmos-text/80 text-xs tracking-[0.4em] uppercase mb-6">
              Para Juanpa
            </p>

            <h2 className="font-cinzel text-cosmos-text text-xl md:text-2xl leading-relaxed mb-8" style={{ fontWeight: 400 }}>
              Donde sea que vayas,<br />
              siempre habrá una constelación<br />
              que lleva tu nombre.
            </h2>

            <p className="font-inter text-cosmos-text/40 text-xs leading-loose">
              Gracias por dejar tu huella.
            </p>

            <div className="anim-finale-line h-px mt-12 mx-auto w-24" style={{ background: 'rgba(184,150,12,0.2)' }} />
          </div>
        </div>
      )}
    </>
  )
}

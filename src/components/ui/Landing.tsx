'use client'

import { useState, useEffect } from 'react'
import { useExperienceStore } from '@/stores/experienceStore'

export function Landing() {
  const phase    = useExperienceStore((s) => s.phase)
  const setPhase = useExperienceStore((s) => s.setPhase)
  const [exiting, setExiting] = useState(false)

  const visible = phase === 'landing' && !exiting

  const handleEnter = () => {
    setExiting(true)
    setTimeout(() => {
      setPhase('entering')
    }, 800)
  }

  if (phase !== 'landing') return null

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-end pb-24 pointer-events-none ${exiting ? 'anim-exit' : 'anim-landing'}`}
    >
      {/* Frase */}
      <p
        className="anim-phrase font-cinzel text-cosmos-text text-sm tracking-[0.3em] uppercase mb-8 text-center pointer-events-none"
        style={{ textShadow: '0 0 30px rgba(126,184,212,0.3)' }}
      >
        Hay lugares que no existen en los mapas.
      </p>

      {/* Línea decorativa */}
      <div
        className="anim-line w-px h-8 bg-cosmos-glow mb-8"
      />

      {/* Botón Entrar */}
      <button
        className="anim-enter-btn pointer-events-auto font-cinzel text-cosmos-text text-xs tracking-[0.5em] uppercase
                   border border-cosmos-text/20 px-8 py-3
                   hover:border-cosmos-glow/60 hover:text-cosmos-glow hover:tracking-[0.6em]
                   transition-all duration-700 ease-out"
        onClick={handleEnter}
      >
        Entrar
      </button>
    </div>
  )
}

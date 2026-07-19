'use client'

import { useEffect, useRef } from 'react'
import { useExperienceStore } from '@/stores/experienceStore'

export function AudioButton() {
  const phase        = useExperienceStore((s) => s.phase)
  const audioEnabled = useExperienceStore((s) => s.audioEnabled)
  const toggleAudio  = useExperienceStore((s) => s.toggleAudio)
  const audioRef     = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/audio/ambient.mp3')
    audio.loop = true
    audio.volume = 0.28
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    if (audioEnabled) audioRef.current.play().catch(() => {})
    else audioRef.current.pause()
  }, [audioEnabled])

  if (phase === 'landing') return null

  return (
    <button
      className="anim-audio fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-50
                 font-cinzel text-cosmos-text/40 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase
                 flex items-center gap-2 hover:text-cosmos-text/70 active:text-cosmos-text/70
                 transition-colors duration-500 p-2"
      onClick={toggleAudio}
    >
      <span className="flex items-end gap-[3px] h-3">
        {[1, 0.6, 1, 0.4].map((h, i) => (
          <span
            key={i}
            className="w-[2px] bg-current rounded-full transition-all duration-300"
            style={{ height: `${h * 12}px`, opacity: audioEnabled ? 1 : 0.4 }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{audioEnabled ? 'Ambiente activo' : 'Activar ambiente'}</span>
    </button>
  )
}

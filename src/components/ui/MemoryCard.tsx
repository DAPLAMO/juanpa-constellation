'use client'

import { useState } from 'react'
import { useExperienceStore } from '@/stores/experienceStore'
import { STARS } from '@/data/stars'

export function MemoryCard() {
  const phase         = useExperienceStore((s) => s.phase)
  const activeStarId  = useExperienceStore((s) => s.activeStarId)
  const setPhase      = useExperienceStore((s) => s.setPhase)
  const setActiveStar = useExperienceStore((s) => s.setActiveStarId)
  const [photoIndex, setPhotoIndex] = useState(0)

  const star = STARS.find((s) => s.id === activeStarId)
  if (phase !== 'reading' || !star || star.type !== 'memory') return null

  const hasPhotos     = !!star.photos?.length
  const hasSinglePhoto = !!star.photo && !star.photos

  const handleReturn = () => {
    setPhase('returning')
    setTimeout(() => setActiveStar(null), 3000)
  }

  return (
    <div className="absolute inset-0 overflow-y-auto px-6 anim-card">
      {/* Velo oscuro */}
      <div
        className="fixed inset-0 anim-card-veil"
        style={{ background: 'radial-gradient(ellipse at center, rgba(4,6,10,0.6) 0%, rgba(4,6,10,0.95) 100%)' }}
      />

      {/* Carta — min-h-full + flex para centrar cuando el texto es corto */}
      <div className="relative z-10 min-h-full flex items-center justify-center">
      <div className="max-w-lg w-full py-16">
        <div className="anim-card-line h-px bg-cosmos-glow/30 mb-10" />

        <p className="anim-card-sub font-cinzel text-cosmos-glow text-xs tracking-[0.4em] uppercase mb-4" style={{ opacity: 0.7 }}>
          {star.subtitle}
        </p>

        <h2 className="anim-card-title font-cinzel text-cosmos-text text-2xl md:text-3xl mb-8 leading-tight" style={{ fontWeight: 400 }}>
          {star.title}
        </h2>

        {/* Carrusel de fotos */}
        {hasPhotos && star.photos && (
          <div className="anim-card-photo mb-8">
            <div className="w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={star.photos[photoIndex]}
                alt={star.title}
                className="w-full object-cover"
                style={{ filter: 'brightness(0.85) saturate(0.9)', maxHeight: '220px' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            {star.photos.length > 1 && (
              <div className="flex gap-3 mt-3 justify-center">
                {star.photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className="h-px rounded-full transition-all duration-500 bg-cosmos-text/30"
                    style={{ width: i === photoIndex ? '16px' : '4px', background: i === photoIndex ? 'var(--cosmos-glow)' : undefined }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Foto única */}
        {hasSinglePhoto && star.photo && (
          <div className="anim-card-photo mb-8 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={star.photo}
              alt={star.title}
              className="w-full object-cover"
              style={{ filter: 'brightness(0.85) saturate(0.9)', maxHeight: '220px' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        )}

        {/* Texto */}
        <div className="anim-card-text font-inter text-cosmos-text/75 text-sm leading-[1.9] space-y-4">
          {star.text?.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="h-px bg-cosmos-glow/15 mt-10 mb-8" />

        <button
          onClick={handleReturn}
          className="anim-card-back font-cinzel text-cosmos-text/40 text-xs tracking-[0.4em] uppercase
                     hover:text-cosmos-text/70 transition-colors duration-500"
        >
          Volver a la constelación
        </button>
      </div>
      </div>
    </div>
  )
}

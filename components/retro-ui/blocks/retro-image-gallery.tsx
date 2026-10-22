'use client'

import Image from 'next/image'
import { useState } from 'react'
import { RetroButton } from '../retro-button'
import { RetroWindow } from '../retro-window'

export type RetroGalleryImage = {
  src: string
  alt: string
  title: string
  category?: string
}

const defaultImages: RetroGalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=80', alt: 'Montañas junto a un lago', title: 'Lakeview.jpg', category: 'Nature' },
  { src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=80', alt: 'Bosque verde con niebla', title: 'Forest.jpg', category: 'Nature' },
  { src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900&q=80', alt: 'Ciudad iluminada por la noche', title: 'City.jpg', category: 'Places' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80', alt: 'Playa tropical y océano', title: 'Beach.jpg', category: 'Places' },
  { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80', alt: 'Oficina luminosa', title: 'Workspace.jpg', category: 'Work' },
  { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80', alt: 'Ordenador portátil sobre una mesa', title: 'Laptop.jpg', category: 'Work' },
]

export function RetroImageGallery({ images = defaultImages }: { images?: RetroGalleryImage[] }) {
  const [selected, setSelected] = useState(0)
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...Array.from(new Set(images.map((image) => image.category).filter(Boolean) as string[]))]
  const visibleImages = filter === 'All' ? images : images.filter((image) => image.category === filter)
  const selectedImage = visibleImages[selected] ?? visibleImages[0]

  return (
    <RetroWindow title="PHOTO.GAL" className="w-full max-w-2xl" status={<span>{visibleImages.length} files</span>}>
      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-wrap items-center gap-1.5 border-b-2 border-rt-shadow pb-2">
          {categories.map((category) => (
            <RetroButton key={category} size="sm" variant={filter === category ? 'primary' : 'default'} onClick={() => { setFilter(category); setSelected(0) }}>
              {category}
            </RetroButton>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
          <div className="rt-sunken relative aspect-[4/3] overflow-hidden bg-black">
            {selectedImage ? <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="(min-width: 640px) 480px, 100vw" className="object-cover" /> : null}
          </div>
          <div className="grid grid-cols-2 gap-2 content-start">
            {visibleImages.map((image, index) => (
              <button key={image.src} type="button" onClick={() => setSelected(index)} aria-label={`Ver ${image.title}`} aria-pressed={selectedImage?.src === image.src} className={`rt-raised relative aspect-square overflow-hidden text-left ${selectedImage?.src === image.src ? 'outline outline-2 outline-rt-accent' : ''}`}>
                <Image src={image.src} alt="" fill sizes="100px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-semibold">{selectedImage?.title ?? 'No files'}</span>
          <span>{selectedImage?.category ?? 'Gallery'} · Unsplash</span>
        </div>
      </div>
    </RetroWindow>
  )
}

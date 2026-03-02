"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CollectionsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const categories = [
    { id: "cat-1", name: "Cups and plates", image: "/images/homepage/Cup & Plates Category.png", description: "Exquisite handcrafted vessels for daily ritual and display." },
    { id: "cat-2", name: "Show Pieces", image: "/images/homepage/Show Pieces category.png", description: "Sculptural art redefining heritage craftsmanship." },
    { id: "cat-3", name: "Masks", image: "/images/homepage/Mask category.png", description: "Ceremonial masks embodying ancestral spirits and forms." },
    { id: "cat-4", name: "Carpets", image: "/images/homepage/Carpet category.png", description: "Hand-knotted textiles with sacred geometric patterns." },
    { id: "cat-5", name: "Necklaces", image: "/images/homepage/Necklace Category.png", description: "Traditional adornments crafted with rare heritage beads." },
    { id: "cat-6", name: "Others", image: "/images/homepage/Other Category.png", description: "A curation of diverse tribal artifacts and hidden treasures." }
  ]

  return (
    <section ref={ref} id="collections" className="pb-24 lg:pb-36 pt-0 px-6 lg:px-20 max-w-[1440px] mx-auto w-full">
      {/* Section header */}
      <div
        className={`mb-16 lg:mb-24 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5AB7D] font-sans mb-4">
          Curated Collections
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black leading-tight text-balance">
            Three Worlds of
            <br />
            Artisanship
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-black/80 font-sans leading-relaxed max-w-xl">
            Each collection represents a distinct tradition of craft, preserved
            through generations and reimagined for the contemporary connoisseur.
          </p>
        </div>
      </div>

      {/* Collection cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        {categories.map((category, index) => (
          <Link
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            key={category.id}
            className={`group relative overflow-hidden transition-all duration-1000 block ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
          >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-md bg-zinc-100">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              {/* Overlay with black gradient for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 flex flex-col justify-end">
                <h3 className="text-2xl lg:text-3xl font-serif text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-white/90 font-sans leading-relaxed mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-sans">
                    Explore Category
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

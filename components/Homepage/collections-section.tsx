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
    { id: "cat-1", name: "Cups and plates", image: "/images/homepage/cup-and-plates-category.png", description: "Exquisite handcrafted vessels for daily ritual and display." },
    { id: "cat-2", name: "Show Pieces", image: "/images/homepage/show-pieces-category.png", description: "Sculptural art redefining heritage craftsmanship." },
    { id: "cat-3", name: "Masks", image: "/images/homepage/mask-category.png", description: "Ceremonial masks embodying ancestral spirits and forms." },
    { id: "cat-4", name: "Carpets", image: "/images/homepage/carpet-category.png", description: "Hand-knotted textiles with sacred geometric patterns." },
    { id: "cat-5", name: "Necklaces", image: "/images/homepage/necklace-category.png", description: "Traditional adornments crafted with rare heritage beads." },
    { id: "cat-6", name: "Others", image: "/images/homepage/other-category.png", description: "A curation of diverse tribal artifacts and hidden treasures." }
  ]

  return (
    <section ref={ref} id="collections" className="py-[80px] px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
      {/* Section header */}
      <div
        className={`mb-8 lg:mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:items-start">
          <div className="flex-1">
            <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5AB7D] font-sans mb-4">
              Curated Collections
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black leading-tight text-balance">
              Three Worlds of
              <br />
              Artisanship
            </h2>
          </div>
          <div className="flex-1 flex lg:justify-end">
            <p className="text-[12px] md:text-[14px] lg:text-[16px] text-black/80 font-sans leading-relaxed max-w-xl lg:pt-1">
              As the premier digital gateway to Arunachal Pradesh's artistic heritage, Kraft Treasure connects you directly with tribal master weavers and carvers. Each collection represents a distinct tradition of craft, preserved through generations and reimagined for the contemporary connoisseur, now delivered from the hills to your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* Collection cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((category, index) => (
          <Link prefetch={false}
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            key={category.id}
            className={`group relative overflow-hidden transition-all duration-1000 block ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
          >
            {/* Image */}
            <div className="relative aspect-[3/2] lg:aspect-[4/5] overflow-hidden rounded-sm shadow-md bg-zinc-100">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay with black gradient for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7 flex flex-col justify-end h-full">
                <div className="mt-auto">
                  <h3 className="text-xl lg:text-2xl font-serif text-white mb-1.5 transition-transform duration-500 group-hover:-translate-y-1">
                    {category.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-white/90 font-sans leading-relaxed mb-4 line-clamp-2 transition-transform duration-500 group-hover:-translate-y-1">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-sans">
                      Explore Category
                    </span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

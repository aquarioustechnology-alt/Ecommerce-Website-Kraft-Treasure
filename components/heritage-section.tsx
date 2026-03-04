"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

function CountingNumber({ value, duration = 2000, visible }: { value: string, duration?: number, visible: boolean }) {
  const [count, setCount] = useState(0)
  const target = parseInt(value)
  const isPlus = value.includes("+")

  useEffect(() => {
    if (!visible) return

    let start = 0
    const end = target
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [visible, target, duration])

  return (
    <span>
      {count}{isPlus ? "+" : ""}
    </span>
  )
}

export function HeritageSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="heritage" className="relative py-12 lg:py-16 max-w-[1440px] mx-auto w-full px-6 lg:px-20">
      {/* Container */}
      <div className="relative overflow-hidden w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image side */}
          <div
            className={`relative aspect-square lg:aspect-auto lg:min-h-[600px] overflow-hidden transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <Image
              src="/images/heritage-landscape.jpg"
              alt="Misty mountains and valleys of Arunachal Pradesh"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content side */}
          <div
            className={`bg-card p-8 lg:p-12 xl:p-16 flex flex-col justify-center transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-sans mb-4">
              Global Heritage
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-6 text-balance">
              From the Himalayan
              <br />
              Foothills to the World
            </h2>

            {/* Reduced gap between content sections */}
            <div className="space-y-4 text-[12px] md:text-[14px] lg:text-[16px] text-black/80 font-sans leading-relaxed">
              <p>
                Nestled between the eastern Himalayas and the plains of Assam,
                Arunachal Pradesh is home to 26 major tribes and over 100
                sub-tribes, each carrying distinct artistic traditions that
                predate written history.
              </p>
              <p>
                Our curatorial team works directly with master artisans in
                remote villages accessible only by days of travel, ensuring each
                piece represents the highest expression of its tradition while
                providing fair-trade compensation that sustains entire
                communities.
              </p>
              <p>
                Every artifact comes with complete provenance documentation,
                artisan biography, and a certificate of authenticity verified by
                the Arunachal Pradesh State Museum.
              </p>
            </div>

            {/* Stats - Increased font size and Counter Animation */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
              {[
                { value: "26+", label: "Tribal Communities" },
                { value: "180+", label: "Master Artisans" },
                { value: "12", label: "Countries Served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl lg:text-5xl font-serif text-primary">
                    <CountingNumber value={stat.value} visible={visible} />
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex">
              <Link
                href="/our-story"
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md whitespace-nowrap min-w-[180px]"
              >
                <span className="relative z-20">Know Our Story</span>
                <ArrowRight className="relative w-3.5 h-3.5 transition-transform group-hover:translate-x-2 z-20" />
                <div className="absolute inset-0 bg-[#E31E25] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

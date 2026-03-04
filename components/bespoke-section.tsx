"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function BespokeSection() {
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
    <section ref={ref} id="artisan-stories" className="pb-12 lg:pb-16 pt-8 lg:pt-10 px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
      <div className="relative overflow-hidden bg-[#FFF4B3]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div
            className={`relative min-h-[400px] lg:min-h-[550px] overflow-hidden transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src="/images/homepage/Artisans Image.png"
              alt="Artisans of Arunachal Pradesh"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div
            className={`p-8 lg:p-12 xl:p-16 flex flex-col justify-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-sans mb-6">
              Artisan Stories from Arunachal
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black leading-tight mb-8 text-balance">
              Made by Hands.
              <br />
              Carried by Heritage.
            </h2>
            <p className="text-sm md:text-base text-black/80 font-sans leading-relaxed mb-8 max-w-xl">
              Behind every Kraft Treasure piece is an artisan family from Arunachal Pradesh,
              preserving ancestral skills in small village workshops. Your purchase directly
              supports local livelihoods and helps sustain the living heritage of our tribal
              communities in a modern world.
            </p>

            {/* Process steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-4">
              {[
                {
                  step: "01",
                  title: "Rooted in Community",
                  desc: "Techniques taught within families.",
                },
                {
                  step: "02",
                  title: "Crafted in Small Batches",
                  desc: "Each piece is hand-made authenticity.",
                },
                {
                  step: "03",
                  title: "Shipped with Pride",
                  desc: "Secure packaging for your craft.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <p className="text-4xl lg:text-5xl font-serif text-primary mb-4 opacity-90 transition-all group-hover:scale-110">
                    {item.step}
                  </p>
                  <h3 className="text-sm font-sans text-black font-semibold mb-2 tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-black/70 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

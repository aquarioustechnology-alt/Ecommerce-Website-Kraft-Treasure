"use client"

import { useEffect, useState } from "react"
import NextImage from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const HERO_IMAGES = [
  { src: "/images/homepage/1st-image.png", name: "Traditional Brass Lamp" },
  { src: "/images/homepage/2nd-image.png", name: "Handwoven Tribal Textile" },
  { src: "/images/homepage/3rd-image.png", name: "Bamboo Craft Vessel" },
  { src: "/images/homepage/4th-image.png", name: "Ceremonial Tribal Mask" },
]

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    setLoaded(true)
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  }

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-white md:h-screen">
      <div className="pointer-events-none absolute inset-0 flex flex-col md:flex-row">
        <div className="h-1/2 w-full bg-white md:h-full md:w-1/2" />
        <div className="h-1/2 w-full bg-[#FFF4B3] md:h-full md:w-1/2" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col md:flex-row">
        <div className="flex w-full flex-col items-center justify-center px-6 pb-32 pt-36 text-center md:w-1/2 md:items-start md:py-0 md:text-left lg:px-12">
          <div className="w-full max-w-xl">
            <p
              className={`mb-3 text-[10px] font-sans uppercase tracking-[0.4em] transition-all duration-1000 md:text-xs ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: "0.4s", color: "#C5AB7D" }}
            >
              Authentic Arunachal Pradesh Handicrafts
            </p>

            <h2
              className={`mb-5 text-[40px] font-serif leading-[1.1] tracking-tight text-black transition-all duration-1000 sm:text-5xl md:text-[54px] lg:text-[62px] xl:text-[70px] ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "0.6s" }}
            >
              Where Ancient
              <br />
              <span style={{ color: "#C5AB7D" }}>Artistry</span> Meets
              <br />
              Modern Luxury
            </h2>

            <p
              className={`mb-8 max-w-xl text-[12px] font-sans leading-relaxed text-black/80 transition-all duration-1000 sm:text-[14px] lg:text-[16px] ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: "0.8s" }}
            >
              Discover original tribal crafts from Arunachal Pradesh, bamboo & cane,
              handloom textiles, traditional jewellery, masks, and home
              d{"\u00E9"}cor-sourced directly from artisans and delivered with care.
            </p>

            <div
              className={`flex flex-col justify-center gap-4 transition-all duration-1000 sm:flex-row md:justify-start md:gap-3 lg:gap-4 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: "1s" }}
            >
              <Link
                prefetch={false}
                href="/shop"
                className="group relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden whitespace-nowrap bg-[#D33740] px-6 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500 md:min-w-[215px] md:px-4 xl:min-w-[180px] lg:px-6"
              >
                <span className="relative z-20">Explore Collections</span>
                <ArrowRight className="relative z-20 h-3.5 w-3.5 transition-transform group-hover:translate-x-2" />
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
              </Link>

              <Link
                prefetch={false}
                href="/shop"
                className="group relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-[#D33740] bg-transparent px-6 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-[#D33740] shadow-sm transition-all duration-500 md:min-w-[130px] md:px-4 xl:min-w-[180px] lg:px-6"
              >
                <span className="relative z-20 font-medium transition-colors duration-500 group-hover:text-white">Shop Now</span>
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#D33740] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden md:min-h-screen md:w-1/2">
          <div
            className={`group relative w-full max-w-[380px] aspect-square transition-all duration-700 ease-out lg:max-w-[460px] 2xl:max-w-[500px] ${loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
            style={{ transitionDelay: "0.5s" }}
          >
            {HERO_IMAGES.map((image, index) => (
              <div
                key={image.src}
                className={`absolute inset-0 overflow-hidden rounded-sm shadow-xl transition-opacity duration-1000 ease-in-out ${index === currentImage ? "z-10 opacity-100" : "z-0 opacity-0"}`}
              >
                <Link
                  prefetch={false}
                  href="/shop"
                  className="block h-full w-full cursor-pointer"
                  aria-label={`Explore ${image.name} in the shop`}
                >
                  <NextImage
                    src={image.src}
                    alt={image.name}
                    fill
                    className="scale-110 object-cover transition-transform duration-1000 ease-out group-hover:scale-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />

                  <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8">
                    <p className="mb-2 text-xs font-sans uppercase tracking-[0.3em] text-white">Product</p>
                    <h3 className="text-xl font-serif text-white md:text-lg lg:text-2xl">{image.name}</h3>
                  </div>
                </Link>
              </div>
            ))}

            <div className="pointer-events-none absolute inset-0 z-20 rounded-sm border border-white/10" />

            <div className="absolute bottom-6 right-6 z-30 flex gap-3">
              <button
                type="button"
                onClick={prevImage}
                className="cursor-pointer border border-black/10 bg-white/40 p-4 text-black shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="cursor-pointer border border-black/10 bg-white/40 p-4 text-black shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
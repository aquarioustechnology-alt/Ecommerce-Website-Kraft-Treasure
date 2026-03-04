"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Instagram } from "lucide-react"

export function InstagramFeed() {
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

    const images = [
        "/images/homepage/1st-image.png",
        "/images/homepage/2nd-image.png",
        "/images/homepage/3rd-image.png",
        "/images/homepage/4th-image.png",
    ]

    return (
        <section ref={ref} className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
            <div className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5AB7D] font-sans mb-3">
                    Behind the Scenes
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Shared on Instagram</h2>

                <button className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md whitespace-nowrap min-w-[200px]">
                    <span className="relative z-20">View in Instagram</span>
                    <Instagram className="relative z-20 w-3.5 h-3.5" />
                    <div className="absolute inset-0 bg-[#E31E25] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`relative aspect-square overflow-hidden group transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                        style={{ transitionDelay: `${index * 0.15}s` }}
                    >
                        <Image
                            src={src}
                            alt={`Instagram post ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Smooth Bottom-to-Top Overlay */}
                        <div className="absolute inset-0 bg-black/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-center">
                            <Instagram className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

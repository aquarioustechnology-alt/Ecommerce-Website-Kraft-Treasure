"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CuratedCategories() {
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
        <section ref={ref} className="pb-20 pt-8 px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-[600px] lg:h-[700px]">
                {/* Left Side - Large Portrait */}
                <div
                    className={`relative overflow-hidden group h-[500px] lg:h-full transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                    <Image
                        src="/images/homepage/category-section/necklace.png"
                        alt="Heritage Bead Necklaces"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/100 transition-all duration-500 z-10" />
                    <div className="absolute bottom-8 left-8 right-8 text-white z-20">
                        <p className="text-[10px] tracking-[0.4em] uppercase font-sans mb-3 text-white/90">
                            Handcrafted Adornments
                        </p>
                        <h3 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">Heritage Bead<br />Necklaces</h3>
                        <p className="text-sm font-sans mb-6 text-white/80 tracking-wide">Starting from {"\u20B9"}5,400</p>
                        <Link prefetch={false}
                            href="/shop?category=necklaces"
                            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans border-b border-white/40 pb-1 hover:border-white transition-colors"
                        >
                            Explore Collection <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Right Side - Stacked Rows */}
                <div className="flex flex-col gap-4 lg:gap-6">
                    {/* Top Row */}
                    <div
                        className={`relative flex-1 overflow-hidden group min-h-[300px] transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                    >
                        <Image
                            src="/images/homepage/category-section/bracelet.png"
                            alt="Artisanal Silver Bangles"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/100 transition-all duration-500 z-10" />
                        <div className="absolute bottom-10 left-8 right-8 text-white z-20">
                            <p className="text-[10px] tracking-[0.4em] uppercase font-sans mb-3 text-white/90">
                                Silver Artistry
                            </p>
                            <h3 className="text-2xl md:text-3xl font-serif mb-3">Artisanal Bangles</h3>
                            <p className="text-sm font-sans mb-6 text-white/80 tracking-wide">Starting from {"\u20B9"}3,200</p>
                            <Link prefetch={false}
                                href="/shop?category=bracelets"
                                className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans border-b border-white/40 pb-1 hover:border-white transition-colors"
                            >
                                Browse All <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div
                        className={`relative flex-1 overflow-hidden group min-h-[300px] transition-all duration-1000 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                    >
                        <Image
                            src="/images/homepage/category-section/vessel.png"
                            alt="Sacred Ritual Vessels"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/100 transition-all duration-500 z-10" />
                        <div className="absolute bottom-10 left-8 right-8 text-white z-20">
                            <p className="text-[10px] tracking-[0.4em] uppercase font-sans mb-3 text-white/90">
                                Liturgy & Ritual
                            </p>
                            <h3 className="text-2xl md:text-3xl font-serif mb-3">Gilded Vessels</h3>
                            <p className="text-sm font-sans mb-6 text-white/80 tracking-wide">Starting from {"\u20B9"}2,800</p>
                            <Link prefetch={false}
                                href="/shop?category=ritual"
                                className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans border-b border-white/40 pb-1 hover:border-white transition-colors"
                            >
                                Explore More <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

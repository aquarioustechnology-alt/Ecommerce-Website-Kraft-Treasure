"use client"

import { useEffect, useState } from "react"

import NextImage from "next/image"

export function AuthenticitySection() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <section className="relative bg-[#F9F2EA] py-[80px] px-6 lg:px-12 overflow-hidden">
            {/* Background Decorative Images */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute top-[-10%] left-[-5%] w-1/3 aspect-square rotate-[-12deg]">
                    <NextImage
                        src="/images/homepage/mask-category.png"
                        alt="Arunachal Mask Background"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="absolute bottom-[-10%] right-[-5%] w-1/3 aspect-square rotate-[12deg]">
                    <NextImage
                        src="/images/homepage/show-pieces-category.png"
                        alt="Arunachal Artifacts Background"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Heading - Improved responsiveness */}
                <h2
                    className={`text-[28px] sm:text-[34px] md:text-[38px] lg:text-[44px] xl:text-5xl font-serif text-black leading-tight mb-8 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                    style={{ transitionDelay: "0.2s" }}
                >
                    Authentic Arunachal Pradesh Artifacts - <br className="hidden lg:block" />
                    Handmade Heritage for Modern Homes
                </h2>

                {/* Content - Reduced size by 2px */}
                <p
                    className={`text-[12px] sm:text-[14px] lg:text-[16px] text-black/80 font-sans leading-relaxed transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                    style={{ transitionDelay: "0.4s" }}
                >
                    Arunachal Pradesh is known for its rich tribal craftsmanship where every artifact carries a cultural story,
                    shaped by the hills, forests, and community traditions. From bamboo and cane utility artifacts to
                    handloom textiles, bead jewellery, and ritual-inspired masks, these products are created using
                    time-tested techniques passed across generations. At Kraft Treasure, we bring these genuine
                    Arunachal artifacts online directly sourced from artisan communities, so you can own handmade
                    d{"\u00E9"}cor and lifestyle pieces that feel rooted, sustainable, and truly original.
                </p>
            </div>
        </section>
    )
}

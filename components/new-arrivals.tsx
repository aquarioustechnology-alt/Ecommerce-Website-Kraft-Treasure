"use client"

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { products, formatPrice, convertPrice } from "@/lib/data"
import { cartStore } from "@/lib/store"

const REPLACEMENT_IMAGES = [
    "/images/product-images/IMG-20260215-WA0198.jpg",
    "/images/product-images/IMG-20260215-WA0199.jpg",
    "/images/product-images/IMG-20260215-WA0200.jpg",
    "/images/product-images/IMG-20260215-WA0202.jpg",
    "/images/product-images/IMG-20260215-WA0203.jpg",
    "/images/product-images/IMG-20260215-WA0205.jpg",
]

export function NewArrivals() {
    const [visible, setVisible] = useState(false)
    const ref = useRef<HTMLElement>(null)
    const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

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
        <section ref={ref} className="pt-[30px] pb-12 lg:pb-16 px-6 lg:px-20 bg-zinc-50 max-w-[1440px] mx-auto w-full">
            {/* Header */}
            <div
                className={`mb-8 lg:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                <div>
                    <p className="text-xs tracking-[0.4em] uppercase text-primary font-sans mb-4">
                        Fresh Additions
                    </p>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
                        New Arrivals
                    </h2>
                </div>
                <Link
                    href="/#collections"
                    className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md whitespace-nowrap min-w-[180px]"
                >
                    <span className="relative z-20">Discover More</span>
                    <ArrowRight className="relative z-20 w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
                    <div className="absolute inset-0 bg-[#E31E25] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
                </Link>
            </div>

            {/* Product Grid Carousel */}
            <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-6 lg:-ml-8">
                        {products.slice().reverse().map((product, index) => {
                            const carouselImage = REPLACEMENT_IMAGES[index % REPLACEMENT_IMAGES.length]
                            return (
                                <div
                                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6 lg:pl-8 min-w-0"
                                    key={product.id}
                                >
                                    <Link
                                        href={`/product/${product.slug}`}
                                        className={`group transition-all duration-1000 block ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                            }`}
                                        style={{ transitionDelay: `${0.15 + index * 0.1}s` }}
                                    >
                                        {/* Product Image */}
                                        <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-card">
                                            <Image
                                                src={carouselImage}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                                <span className="text-xs tracking-[0.2em] uppercase text-foreground font-sans border border-foreground/40 px-6 py-3 backdrop-blur-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                                                    View Details
                                                </span>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div>
                                            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans mb-1">
                                                {product.category}
                                            </p>
                                            <h3 className="text-base font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm font-sans text-primary">
                                                {formatPrice(convertPrice(product.price, cart.currency), cart.currency)}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex justify-center gap-4 mt-12">
                    <button
                        onClick={scrollPrev}
                        className="p-3 bg-card border border-border text-foreground hover:bg-muted transition-colors rounded-full shadow-sm"
                        aria-label="Previous item"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="p-3 bg-card border border-border text-foreground hover:bg-muted transition-colors rounded-full shadow-sm"
                        aria-label="Next item"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    )
}

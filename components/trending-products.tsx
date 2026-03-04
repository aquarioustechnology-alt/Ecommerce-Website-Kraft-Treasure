"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingBag, Heart } from "lucide-react"
import { formatPrice, convertPrice } from "@/lib/data"
import { cartStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

const TRENDING_PRODUCTS = [
    {
        id: "tp-1",
        name: "Ancient Green Deity Mask",
        category: "Masks",
        price: 4500,
        slug: "ancient-green-deity-mask",
        image: "/images/Trending Products/Trending Product 1.png",
        hoverImage: "/images/Trending Products/Trending Product 1 Hover.png"
    },
    {
        id: "tp-2",
        name: "Patterned Steel Tongue Drum",
        category: "Show Pieces",
        price: 2800,
        slug: "patterned-steel-tongue-drum",
        image: "/images/Trending Products/Trending Product 2.png",
        hoverImage: "/images/Trending Products/Trending Product 2 Hover.png"
    },
    {
        id: "tp-3",
        name: "Tribal Red Bead Necklace",
        category: "Necklaces",
        price: 9200,
        slug: "tribal-red-bead-necklace",
        image: "/images/Trending Products/Trending Product 3.png",
        hoverImage: "/images/Trending Products/Trending Product 3 Hover.png"
    },
    {
        id: "tp-4",
        name: "Ornate Floral Ritual Bowl",
        category: "Cups and plates",
        price: 5400,
        slug: "ornate-floral-ritual-bowl",
        image: "/images/Trending Products/Trending Product 4.png",
        hoverImage: "/images/Trending Products/Trending Product 4 Hover.png"
    },
    {
        id: "tp-5",
        name: "Sacred Ceremonial Wall Mask",
        category: "Masks",
        price: 3100,
        slug: "sacred-ceremonial-wall-mask",
        image: "/images/Trending Products/Trending Product 5.png",
        hoverImage: "/images/Trending Products/Trending Product 5 Hover.png"
    }
]

export function TrendingProducts() {
    const [visible, setVisible] = useState(false)
    const ref = useRef<HTMLElement>(null)
    const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
    const { toast } = useToast()

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                }
            },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    const handleAddToCart = (e: React.MouseEvent, product: any) => {
        e.preventDefault()
        e.stopPropagation()
        cartStore.addItem(product.id)
        toast({
            title: "Added to Bag",
            description: `${product.name} has been added to your shopping bag.`,
        })
    }

    const toggleWishlist = (e: React.MouseEvent, productId: string, productName: string) => {
        e.preventDefault()
        e.stopPropagation()
        const isInWishlist = cart.wishlist.includes(productId)
        cartStore.toggleWishlist(productId)
        if (isInWishlist) {
            toast({
                title: "Removed from Wishlist",
                description: `${productName} removed from your favorites.`,
            })
        } else {
            toast({
                title: "Added to Wishlist",
                description: `${productName} added to your favorites.`,
            })
        }
    }

    return (
        <section ref={ref} className="pt-10 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
            {/* Header */}
            <div
                className={`mb-12 text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5AB7D] font-sans mb-3">
                    Most Wanted
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black leading-tight">
                    Trending Products
                </h2>
            </div>

            {/* Static Grid - 5 columns on desktop with reduced gap - Gap reduced more */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 mb-8">
                {TRENDING_PRODUCTS.map((product, index) => (
                    <Link
                        href={`/product/${product.slug}`}
                        key={product.id}
                        className={`group transition-all duration-1000 block ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                            }`}
                        style={{ transitionDelay: `${0.15 + index * 0.1}s` }}
                    >
                        {/* Product Image Container */}
                        <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-zinc-50 border border-zinc-100/50">
                            {/* Default Image */}
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            />
                            {/* Hover Image */}
                            <Image
                                src={product.hoverImage}
                                alt={`${product.name} alternate view`}
                                fill
                                className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            />

                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {/* Icons at top right */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                    <button
                                        onClick={(e) => toggleWishlist(e, product.id, product.name)}
                                        className={`p-3 bg-white hover:bg-black hover:text-white transition-colors shadow-sm ${cart.wishlist.includes(product.id) ? 'text-[#E31E25]' : 'text-black'}`}
                                    >
                                        <Heart className={`w-4 h-4 ${cart.wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                                    </button>
                                    <button
                                        onClick={(e) => handleAddToCart(e, product)}
                                        className="p-3 bg-white hover:bg-black hover:text-white transition-colors shadow-sm text-black"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* View Details at bottom */}
                                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="text-center text-[10px] tracking-[0.2em] uppercase text-black font-sans border border-black/10 px-5 py-3 bg-white hover:bg-black hover:text-white transition-colors duration-300 shadow-sm">
                                        View Details
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Info - Reduced Gaps */}
                        <div className="text-center space-y-0.5">
                            <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-sans">
                                {product.category}
                            </p>
                            <h3 className="text-sm lg:text-base font-serif text-foreground hover:text-[#C5AB7D] transition-colors line-clamp-1">
                                {product.name}
                            </h3>
                            <p className="text-base lg:text-lg font-sans text-primary font-semibold">
                                ₹{product.price.toLocaleString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Button below grid - Gap reduced */}
            <div className="flex justify-center">
                <Link
                    href="/shop"
                    className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md whitespace-nowrap min-w-[200px]"
                >
                    <span className="relative z-20">View All Collections</span>
                    <ArrowRight className="relative z-20 w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
                    <div className="absolute inset-0 bg-[#E31E25] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
                </Link>
            </div>
        </section>
    )
}

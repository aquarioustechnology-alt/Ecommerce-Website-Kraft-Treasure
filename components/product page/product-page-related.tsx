"use client"

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Heart } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import type { Product } from "@/lib/data"
import { cartStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { convertPrice, formatPrice } from "@/lib/data"

interface ProductPageRelatedProps {
  relatedProducts: Product[]
}

const REPLACEMENT_IMAGES = [
  {
    image: "/images/Shop/Product 1.png",
    hoverImage: "/images/Shop/Product 1 Hover.png",
  },
  {
    image: "/images/Shop/Product 2.png",
    hoverImage: "/images/Shop/Product 2 Hover.png",
  },
  {
    image: "/images/Shop/Product 3.png",
    hoverImage: "/images/Shop/Product 3 Hover.png",
  },
  {
    image: "/images/Shop/Product 4.png",
    hoverImage: "/images/Shop/Product 4 Hover.png",
  },
  {
    image: "/images/Shop/Product 5.png",
    hoverImage: "/images/Shop/Product 5 Hover.png",
  },
  {
    image: "/images/Shop/Product 6.png",
    hoverImage: "/images/Shop/Product 6 Hover.png",
  },
  {
    image: "/images/Shop/Product 7.png",
    hoverImage: "/images/Shop/Product 7 hover.png",
  },
  {
    image: "/images/Shop/Product 8.png",
    hoverImage: "/images/Shop/Product 8 Hover.png",
  },
  {
    image: "/images/Shop/Product 9.png",
    hoverImage: "/images/Shop/Product 9 Hover.png",
  },
  {
    image: "/images/Shop/Product 10.png",
    hoverImage: "/images/Shop/Product 10 Hover.png",
  },
  {
    image: "/images/Shop/Product 11.png",
    hoverImage: "/images/Shop/Product 11 Hover.png",
  },
  {
    image: "/images/Shop/Product 12.png",
    hoverImage: "/images/Shop/Product 12 Hover.png",
  },
]

export function ProductPageRelated({ relatedProducts }: ProductPageRelatedProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
  const { toast } = useToast()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  })

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

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
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
    <section ref={ref} className="pt-10 pb-[60px] px-6 lg:px-12 max-w-[1440px] mx-auto w-full overflow-hidden">
      {/* Header */}
      <div
        className={`max-w-[1440px] mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="text-left">
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5AB7D] font-sans mb-3">
            You May Also Appreciate
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black leading-tight">
            From the Same Collection
          </h2>
        </div>
        <Link
          href="/shop"
          className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-[#D33740] text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md whitespace-nowrap min-w-[200px]"
        >
          <span className="relative z-20">View All Pieces</span>
          <ArrowRight className="relative z-20 w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
          <div className="absolute inset-0 bg-[#C5AB7D] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
        </Link>
      </div>

      {/* Product Carousel Container (Relative for absolute inner buttons) */}
      <div className="relative max-w-[1440px] mx-auto group/carousel">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 lg:-ml-5">
            {relatedProducts.map((product, index) => {
              const carouselImage = REPLACEMENT_IMAGES[index % REPLACEMENT_IMAGES.length]
              return (
                <div
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] pl-4 lg:pl-5 min-w-0"
                  key={product.id}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className={`group transition-all duration-1000 block ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                      }`}
                    style={{ transitionDelay: `${0.15 + index * 0.1}s` }}
                  >
                    {/* Product Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-zinc-50 border border-zinc-100/50">
                      <Image
                        src={carouselImage.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                      <Image
                        src={carouselImage.hoverImage}
                        alt={`${product.name} alternate view`}
                        fill
                        className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />

                      {/* Actions Overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                          <button
                            onClick={(e) => toggleWishlist(e, product.id, product.name)}
                            className={`p-3 bg-white hover:bg-black hover:text-white transition-colors shadow-sm ${cart.wishlist.includes(product.id) ? "text-[#E31E25]" : "text-black"}`}
                          >
                            <Heart className={`w-4 h-4 ${cart.wishlist.includes(product.id) ? "fill-current" : ""}`} />
                          </button>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="p-3 bg-white hover:bg-black hover:text-white transition-colors shadow-sm text-black"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="text-center text-[10px] tracking-[0.2em] uppercase text-black font-sans border border-black/10 px-5 py-3 bg-white hover:bg-black hover:text-white transition-colors duration-300 shadow-sm">
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center space-y-0.5">
                      <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-sans">
                        {product.category}
                      </p>
                      <h3 className="text-sm lg:text-base font-serif text-foreground hover:text-[#C5AB7D] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-base lg:text-lg font-sans text-primary font-semibold">
                        {formatPrice(convertPrice(product.price, cart.currency), cart.currency)}
                      </p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Carousel Controls - Repositioned inside the Product Area */}
        {/* Desktop Controls (Extreme Left/Right overlapping cards) */}
        <div className="hidden lg:block">
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-[40%] -translate-y-1/2 z-40 p-4 bg-white border border-border text-foreground hover:bg-black hover:text-white transition-all duration-300 shadow-xl"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-[40%] -translate-y-1/2 z-40 p-4 bg-white border border-border text-foreground hover:bg-black hover:text-white transition-all duration-300 shadow-xl"
            aria-label="Next item"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile/Tablet Controls (Below Cards) */}
        <div className="flex lg:hidden justify-center gap-4 mt-12">
          <button
            onClick={scrollPrev}
            className="p-4 bg-white border border-border text-foreground hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="p-4 bg-white border border-border text-foreground hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
            aria-label="Next item"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
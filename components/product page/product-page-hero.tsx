"use client"

import { useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Heart, Shield, ShoppingBag, Truck } from "lucide-react"
import type { Product } from "@/lib/data"
import { convertPrice, formatPrice } from "@/lib/data"
import { cartStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

interface ProductPageHeroProps {
  product: Product
}

export function ProductPageHero({ product }: ProductPageHeroProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
  const { toast } = useToast()

  const price = convertPrice(product.price, cart.currency)
  const formattedPrice = formatPrice(price, cart.currency)
  const isWishlisted = cart.wishlist.includes(product.id)

  const handleAddToCart = () => {
    cartStore.addItem(product.id)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = () => {
    cartStore.toggleWishlist(product.id)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted
        ? `${product.name} removed from your favorites.`
        : `${product.name} added to your favorites.`,
    })
  }

  return (
    <section className="px-6 lg:px-12 pb-14 lg:pb-16 max-w-[1440px] mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] gap-10 lg:gap-14 items-stretch">
        <div className="flex h-full min-h-[520px] lg:min-h-[660px] flex-col">
          <nav aria-label="Breadcrumb" className="mb-5 lg:mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.24em] uppercase font-sans text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-[#D33740]">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={`/shop?category=${encodeURIComponent(product.category)}`}
                  className="transition-colors hover:text-[#D33740]"
                >
                  {product.category}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="flex flex-1 flex-col gap-4">
            <div className="relative flex-1 min-h-[380px] sm:min-h-[520px] lg:min-h-0 overflow-hidden border border-zinc-100/70 bg-zinc-50">
              <Image
                src={product.images[currentImage] ?? product.image}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
              {product.isLimited && product.edition && (
                <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                  <span className="inline-flex border border-[#D33740]/20 bg-white/95 px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-sans text-[#D33740] shadow-sm">
                    {product.edition}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() => setCurrentImage(index)}
                  className={`relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden border transition-all duration-300 ${
                    currentImage === index
                      ? "border-[#D33740] ring-1 ring-[#D33740]/20"
                      : "border-zinc-200 hover:border-[#D33740]/50"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-full min-h-[520px] lg:min-h-[660px] flex-col justify-between lg:py-2">
          <div>
            <h1 className="mb-4 text-[28px] sm:text-[36px] xl:text-[48px] font-serif text-foreground leading-[1.08]">
              {product.name}
            </h1>

            <p className="mb-6 text-[1.9rem] sm:text-[2.15rem] lg:text-[2.4rem] font-sans font-semibold tracking-tight text-primary">
              {formattedPrice}
            </p>

            <p className="mb-8 max-w-2xl text-sm lg:text-[15px] text-muted-foreground font-sans leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <p className="mb-4 text-[10px] tracking-[0.3em] uppercase text-foreground font-sans">
                Details
              </p>
              <ul className="space-y-3">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-sm text-muted-foreground font-sans leading-relaxed">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D33740]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-6">
              <div>
                <p className="mb-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans">
                  Dimensions
                </p>
                <p className="text-sm text-foreground font-sans">{product.dimensions}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans">
                  Material
                </p>
                <p className="text-sm text-foreground font-sans">{product.material}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans">
                  Origin
                </p>
                <p className="text-sm text-foreground font-sans">{product.origin}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans">
                  Availability
                </p>
                <p className="text-sm text-foreground font-sans">
                  {product.inStock ? "In Stock" : "Made to Order"}
                </p>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 min-[520px]:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-[#D33740] text-white px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md whitespace-nowrap min-w-[180px]"
              >
                <span className="relative z-20 flex items-center gap-2">
                  {addedToCart ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                  {addedToCart ? "Added to Bag" : "Add to Bag"}
                </span>
                <div className="absolute inset-0 bg-[#C5AB7D] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2 border border-[#D33740] bg-transparent text-[#D33740] px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-all duration-500 shadow-sm whitespace-nowrap min-w-[180px]"
              >
                <span className="relative z-20 flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </span>
                <div className="absolute inset-0 bg-[#D33740] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
              {[
                { icon: Shield, label: "Authenticity Guaranteed" },
                { icon: Truck, label: "Insured Shipping Across India" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
                  <Icon className="h-3.5 w-3.5 text-[#D33740]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
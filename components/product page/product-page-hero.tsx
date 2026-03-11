"use client"

import { useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Heart, Minus, Plus, Shield, ShoppingBag, Truck } from "lucide-react"
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
  const [quantity, setQuantity] = useState(1)
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
  const { toast } = useToast()
  const router = useRouter()

  const price = convertPrice(product.price, cart.currency)
  const formattedPrice = formatPrice(price, cart.currency)
  const isWishlisted = cart.wishlist.includes(product.id)

  const decreaseQuantity = () => {
    setAddedToCart(false)
    setQuantity((current) => Math.max(1, current - 1))
  }

  const increaseQuantity = () => {
    setAddedToCart(false)
    setQuantity((current) => Math.min(99, current + 1))
  }

  const handlePrimaryAction = () => {
    if (addedToCart) {
      router.push("/checkout")
      return
    }

    cartStore.addItem(product.id, quantity)
    setAddedToCart(true)
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
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-14 lg:px-12 lg:pb-16">
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-14">
        <div className="flex h-full min-h-[520px] flex-col lg:min-h-[660px]">
          <nav aria-label="Breadcrumb" className="mb-5 lg:mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] font-sans uppercase tracking-[0.24em] text-muted-foreground">
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
            <div className="relative min-h-[380px] flex-1 overflow-hidden border border-zinc-100/70 bg-zinc-50 sm:min-h-[520px] lg:min-h-0">
              <Image
                src={product.images[currentImage] ?? product.image}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
              {product.isLimited && product.edition ? (
                <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                  <span className="inline-flex border border-[#D33740]/20 bg-white/95 px-4 py-2 text-[10px] font-sans uppercase tracking-[0.2em] text-[#D33740] shadow-sm">
                    {product.edition}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() => setCurrentImage(index)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden border transition-all duration-300 sm:h-24 sm:w-24 ${
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

        <div className="flex h-full min-h-[520px] flex-col gap-6 lg:min-h-[660px] lg:gap-7 lg:py-2">
          <div className="space-y-5 lg:space-y-6">
            <h1 className="text-[28px] font-serif leading-[1.08] text-foreground sm:text-[36px] xl:text-[48px]">
              {product.name}
            </h1>

            <p className="text-[1.9rem] font-sans font-semibold tracking-tight text-primary sm:text-[2.15rem] lg:text-[2.4rem]">
              {formattedPrice}
            </p>

            <p className="max-w-2xl text-sm font-sans leading-relaxed text-muted-foreground lg:text-[15px]">
              {product.description}
            </p>

            <div>
              <p className="mb-4 text-[10px] font-sans uppercase tracking-[0.3em] text-foreground">
                Details
              </p>
              <ul className="space-y-2.5">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-sm font-sans leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D33740]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-y border-border py-5 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                  Dimensions
                </p>
                <p className="text-sm font-sans text-foreground">{product.dimensions}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                  Material
                </p>
                <p className="text-sm font-sans text-foreground">{product.material}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                  Origin
                </p>
                <p className="text-sm font-sans text-foreground">{product.origin}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                  Availability
                </p>
                <p className="text-sm font-sans text-foreground">
                  {product.inStock ? "In Stock" : "Made to Order"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[640px]:grid-cols-[168px_minmax(0,1fr)_minmax(0,1fr)]">
              <div className="grid h-[56px] grid-cols-3 border border-border bg-white">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="inline-flex h-full w-full items-center justify-center border-r border-border text-foreground transition-colors hover:text-[#D33740]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="inline-flex h-full w-full items-center justify-center border-r border-border text-sm font-sans text-foreground">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="inline-flex h-full w-full items-center justify-center text-foreground transition-colors hover:text-[#D33740]"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handlePrimaryAction}
                className="group relative inline-flex h-[56px] min-w-[180px] items-center justify-center gap-2 overflow-hidden whitespace-nowrap bg-[#D33740] px-6 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500"
              >
                <span className="relative z-20 flex items-center gap-2">
                  {addedToCart ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                  {addedToCart ? "Go to Cart" : "Add to Bag"}
                </span>
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className="group relative inline-flex h-[56px] min-w-[180px] items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-[#D33740] bg-transparent px-6 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-[#D33740] shadow-sm transition-all duration-500"
              >
                <span className="relative z-20 flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </span>
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#D33740] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5">
              {[
                { icon: Shield, label: "Authenticity Guaranteed" },
                { icon: Truck, label: "Insured Shipping Across India" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
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

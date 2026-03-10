"use client"

import { useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/data"
import { cartStore } from "@/lib/store"
import { convertPrice, formatPrice } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

interface ShopProductCardProps {
  product: Product
}

export function ShopProductCard({ product }: ShopProductCardProps) {
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
  const { toast } = useToast()

  const displayPrice = formatPrice(convertPrice(product.price, cart.currency), cart.currency)
  const hoverImage = product.images[1] ?? product.image
  const isWishlisted = cart.wishlist.includes(product.id)

  const handleWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    cartStore.toggleWishlist(product.id)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted
        ? `${product.name} removed from your favorites.`
        : `${product.name} added to your favorites.`,
    })
  }

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!product.inStock) {
      toast({
        title: "Available on Request",
        description: `${product.name} is currently available by request only.`,
      })
      return
    }

    cartStore.addItem(product.id)
    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your shopping bag.`,
    })
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-zinc-50 border border-zinc-100/50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <Image
          src={hoverImage}
          alt={`${product.name} alternate view`}
          fill
          className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <button
              type="button"
              onClick={handleWishlist}
              className={`p-3 bg-white hover:bg-[#D33740] hover:text-white transition-colors shadow-sm ${isWishlisted ? "text-[#E31E25]" : "text-black"}`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="p-3 bg-white hover:bg-[#D33740] hover:text-white transition-colors shadow-sm text-black"
              aria-label={product.inStock ? "Add to bag" : "View availability"}
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

      <div className="text-center space-y-0.5">
        <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-sans">
          {product.category}
        </p>
        <h3 className="text-sm lg:text-base font-serif text-foreground hover:text-[#C5AB7D] transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-base lg:text-lg font-sans text-primary font-semibold">
          {displayPrice}
        </p>
      </div>
    </Link>
  )
}
"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart, ShoppingBag } from "lucide-react"
import { cartStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { trendingHomepageProducts } from "@/components/product page/products"

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
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleAddToCart = (e: React.MouseEvent, productId: string, productName: string) => {
    e.preventDefault()
    e.stopPropagation()
    cartStore.addItem(productId)
    toast({
      title: "Added to Bag",
      description: `${productName} has been added to your shopping bag.`,
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
    <section ref={ref} className="mx-auto w-full max-w-[1440px] px-6 pb-20 pt-10 lg:px-12">
      <div className={`mb-12 text-center transition-all duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        <p className="mb-3 text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5AB7D] md:text-xs">Most Wanted</p>
        <h2 className="text-3xl font-serif leading-tight text-black md:text-4xl lg:text-5xl">Trending Products</h2>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {trendingHomepageProducts.map((item, index) => (
          <Link
            prefetch={false}
            href={`/product/${item.product.slug}`}
            key={item.product.id}
            className={`group block transition-all duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            style={{ transitionDelay: `${0.15 + index * 0.1}s` }}
          >
            <div className="relative mb-4 aspect-[4/5] overflow-hidden border border-zinc-100/50 bg-zinc-50">
              <Image
                src={item.cardImage}
                alt={item.product.name}
                fill
                className="object-cover opacity-100 transition-opacity duration-700 group-hover:opacity-0"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <Image
                src={item.cardHoverImage}
                alt={`${item.product.name} alternate view`}
                fill
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />

              <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute right-4 top-4 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(e, item.product.id, item.product.name)}
                    className={`p-3 shadow-sm transition-colors ${cart.wishlist.includes(item.product.id) ? "bg-white text-[#E31E25]" : "bg-white text-black hover:bg-black hover:text-white"}`}
                  >
                    <Heart className={`h-4 w-4 ${cart.wishlist.includes(item.product.id) ? "fill-current" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, item.product.id, item.product.name)}
                    className="bg-white p-3 text-black shadow-sm transition-colors hover:bg-black hover:text-white"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="border border-black/10 bg-white px-5 py-3 text-center text-[10px] font-sans uppercase tracking-[0.2em] text-black shadow-sm transition-colors duration-300 hover:bg-black hover:text-white">
                    View Details
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-0.5 text-center">
              <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-muted-foreground">{item.product.category}</p>
              <h3 className="line-clamp-1 text-sm font-serif text-foreground transition-colors hover:text-[#C5AB7D] lg:text-base">{item.product.name}</h3>
              <p className="text-base font-semibold text-primary lg:text-lg">{"\u20B9"}{item.product.price.toLocaleString("en-IN")}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          prefetch={false}
          href="/shop"
          className="group relative inline-flex min-w-[200px] items-center justify-center gap-2 overflow-hidden whitespace-nowrap bg-[#D33740] px-8 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500"
        >
          <span className="relative z-20">View All Collections</span>
          <ArrowRight className="relative z-20 h-3.5 w-3.5 transition-transform group-hover:translate-x-2" />
          <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
        </Link>
      </div>
    </section>
  )
}
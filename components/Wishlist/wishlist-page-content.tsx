"use client"

import { useSyncExternalStore } from "react"
import { getProductById } from "@/lib/catalog"
import { cartStore } from "@/lib/store"
import { WishlistEmpty } from "@/components/Wishlist/wishlist-empty"
import { WishlistGrid } from "@/components/Wishlist/wishlist-grid"
import { WishlistHero } from "@/components/Wishlist/wishlist-hero"

export function WishlistPageContent() {
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
  const wishlistProducts = cart.wishlist
    .map((productId) => getProductById(productId))
    .filter((product): product is NonNullable<ReturnType<typeof getProductById>> => Boolean(product))

  return (
    <>
      <WishlistHero count={wishlistProducts.length} />
      <section className="px-6 py-12 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-[1440px]">
          {wishlistProducts.length > 0 ? <WishlistGrid products={wishlistProducts} /> : <WishlistEmpty />}
        </div>
      </section>
    </>
  )
}

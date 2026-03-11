"use client"

import { useEffect, useSyncExternalStore } from "react"
import { getProductById } from "@/lib/catalog"
import { cartStore } from "@/lib/store"
import { MiniCheckoutPanel } from "@/components/Mini checkout/mini-checkout-panel"

export function MiniCheckoutSheet() {
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
  const items = cart.items
    .map((item) => {
      const product = getProductById(item.productId)
      return product ? { product, quantity: item.quantity } : null
    })
    .filter((item): item is { product: NonNullable<ReturnType<typeof getProductById>>; quantity: number } => item !== null)

  useEffect(() => {
    if (!cart.isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cartStore.closeCart()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [cart.isOpen])

  return (
    <div className={`fixed inset-0 z-[90] transition-all duration-300 ${cart.isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
      <button
        type="button"
        onClick={() => cartStore.closeCart()}
        className="absolute inset-0 bg-black/80"
        aria-label="Close mini checkout"
      />
      <MiniCheckoutPanel items={items} currency={cart.currency} onClose={() => cartStore.closeCart()} />
    </div>
  )
}

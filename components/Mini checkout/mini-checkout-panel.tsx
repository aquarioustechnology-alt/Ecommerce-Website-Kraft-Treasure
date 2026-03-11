import { X } from "lucide-react"
import type { Product } from "@/lib/data"
import { convertPrice } from "@/lib/data"
import { MiniCheckoutEmpty } from "@/components/Mini checkout/mini-checkout-empty"
import { MiniCheckoutFooter } from "@/components/Mini checkout/mini-checkout-footer"
import { MiniCheckoutItem } from "@/components/Mini checkout/mini-checkout-item"
import { MiniCheckoutProgress } from "@/components/Mini checkout/mini-checkout-progress"

interface MiniCheckoutPanelProps {
  items: Array<{ product: Product; quantity: number }>
  currency: string
  onClose: () => void
}

export function MiniCheckoutPanel({ items, currency, onClose }: MiniCheckoutPanelProps) {
  const subtotal = items.reduce((sum, item) => sum + convertPrice(item.product.price, currency) * item.quantity, 0)

  return (
    <div className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-[430px] flex-col border-l border-black/10 bg-white shadow-[0_0_40px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between border-b border-black/8 px-5 py-5">
        <h2 className="font-serif text-[34px] leading-none text-black">Shopping Cart</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-black transition-colors hover:text-[#D33740]"
          aria-label="Close mini checkout"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <MiniCheckoutProgress subtotal={subtotal} currency={currency} />

      {items.length === 0 ? (
        <MiniCheckoutEmpty onClose={onClose} />
      ) : (
        <div className="flex-1 overflow-y-auto px-5">
          {items.map((item) => (
            <MiniCheckoutItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              currency={currency}
              onClose={onClose}
            />
          ))}
        </div>
      )}

      <MiniCheckoutFooter subtotal={subtotal} currency={currency} onClose={onClose} />
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X } from "lucide-react"
import type { Product } from "@/lib/data"
import { convertPrice, formatPrice } from "@/lib/data"
import { cartStore } from "@/lib/store"

export function MiniCheckoutItem({
  product,
  quantity,
  currency,
  onClose,
}: {
  product: Product
  quantity: number
  currency: string
  onClose: () => void
}) {
  const unitPrice = convertPrice(product.price, currency)

  return (
    <div className="grid grid-cols-[16px_78px_minmax(0,1fr)] gap-3 border-b border-black/8 py-4">
      <button
        type="button"
        onClick={() => cartStore.removeItem(product.id)}
        className="mt-2 text-black/50 transition-colors hover:text-[#D33740]"
        aria-label={`Remove ${product.name}`}
      >
        <X className="h-4 w-4" />
      </button>

      <Link prefetch={false} href={`/product/${product.slug}`} onClick={onClose} className="relative aspect-[4/5] overflow-hidden bg-[#F3ECDE]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="78px"
        />
      </Link>

      <div className="min-w-0">
        <Link
          prefetch={false}
          href={`/product/${product.slug}`}
          onClick={onClose}
          className="text-[15px] font-medium leading-6 text-black transition-colors hover:text-[#D33740]"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-black/42">{product.category}</p>
        <p className="mt-2 text-[15px] font-medium text-black">{formatPrice(unitPrice, currency)}</p>

        <div className="mt-3 grid h-10 w-[108px] grid-cols-3 border border-black/10 bg-[#FBF7F0]">
          <button
            type="button"
            onClick={() => cartStore.updateQuantity(product.id, quantity - 1)}
            className="inline-flex h-full w-full items-center justify-center border-r border-black/10 text-black transition-colors hover:text-[#D33740]"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="inline-flex h-full w-full items-center justify-center border-r border-black/10 text-sm text-black">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => cartStore.updateQuantity(product.id, quantity + 1)}
            className="inline-flex h-full w-full items-center justify-center text-black transition-colors hover:text-[#D33740]"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

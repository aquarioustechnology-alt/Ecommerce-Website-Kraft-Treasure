import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { convertPrice, formatPrice } from "@/lib/data"
import type { CheckoutLineItem } from "@/components/Checkout/checkout-types"

type CheckoutBagStepProps = {
  cartItems: CheckoutLineItem[]
  currency: string
  onIncrease: (productId: string, quantity: number) => void
  onDecrease: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export function CheckoutBagStep({
  cartItems,
  currency,
  onIncrease,
  onDecrease,
  onRemove,
}: CheckoutBagStepProps) {
  return (
    <section className="space-y-6">
      <div className="border-b border-black/10 pb-5">
        <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.35em] text-[#C5AB7D]">
          Your Cart
        </p>
        <h2 className="text-[30px] font-serif text-foreground md:text-[34px]">
          Review Every Piece Before Checkout
        </h2>
      </div>

      <div className="space-y-6">
        {cartItems.map((item) => {
          const itemTotal = convertPrice(item.product.price, currency) * item.quantity

          return (
            <div
              key={item.productId}
              className="grid grid-cols-[100px_minmax(0,1fr)_32px] gap-4 border-b border-black/10 pb-6 sm:grid-cols-[118px_minmax(0,1fr)_40px] sm:gap-6"
            >
              <Link
                prefetch={false}
                href={`/product/${item.product.slug}`}
                className="relative aspect-[4/5] overflow-hidden bg-card"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100px, 118px"
                />
              </Link>

              <div className="flex min-w-0 flex-col justify-center">
                <p className="mb-1 text-[10px] font-sans uppercase tracking-[0.3em] text-[#C5AB7D]">
                  {item.product.category}
                </p>
                <Link
                  prefetch={false}
                  href={`/product/${item.product.slug}`}
                  className="text-lg font-serif leading-tight text-foreground transition-colors hover:text-[#D33740] md:text-[22px]"
                >
                  {item.product.name}
                </Link>
                <p className="mt-3 text-[20px] font-sans font-semibold text-foreground md:text-[22px]">
                  {formatPrice(itemTotal, currency)}
                </p>

                <div className="mt-4 inline-flex w-fit self-start border border-black/10">
                  <button
                    type="button"
                    onClick={() => onDecrease(item.productId, item.quantity - 1)}
                    className="flex h-11 w-11 items-center justify-center border-r border-black/10 text-muted-foreground transition-colors hover:bg-[#FFF8F4] hover:text-foreground"
                    aria-label={`Decrease quantity of ${item.product.name}`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="flex h-11 w-11 items-center justify-center text-sm font-sans text-foreground">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onIncrease(item.productId, item.quantity + 1)}
                    className="flex h-11 w-11 items-center justify-center border-l border-black/10 text-muted-foreground transition-colors hover:bg-[#FFF8F4] hover:text-foreground"
                    aria-label={`Increase quantity of ${item.product.name}`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemove(item.productId)}
                className="self-start justify-self-end pt-1 text-[#D33740] transition-opacity hover:opacity-70"
                aria-label={`Remove ${item.product.name} from cart`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}


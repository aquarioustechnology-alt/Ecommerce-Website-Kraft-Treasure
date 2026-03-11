import { Truck } from "lucide-react"
import { formatPrice } from "@/lib/data"

export function MiniCheckoutProgress({
  subtotal,
  currency,
}: {
  subtotal: number
  currency: string
}) {
  const freeShippingTarget = currency === "INR" ? 5000 : 80
  const remaining = Math.max(freeShippingTarget - subtotal, 0)
  const progress = Math.min((subtotal / freeShippingTarget) * 100, 100)

  return (
    <div className="border-b border-black/8 px-5 py-5">
      <p className="text-sm leading-6 text-black/72">
        {remaining > 0
          ? `Spend ${formatPrice(remaining, currency)} more to reach free shipping.`
          : "You have unlocked complimentary shipping."}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <div className="relative h-2 flex-1 overflow-hidden bg-[#EFE7D8]">
          <div className="absolute inset-y-0 left-0 bg-[#D33740]" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex h-8 w-8 items-center justify-center border border-[#D33740] text-[#D33740]">
          <Truck className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

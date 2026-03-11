import Link from "next/link"
import { formatPrice } from "@/lib/data"

export function MiniCheckoutFooter({
  subtotal,
  currency,
  onClose,
}: {
  subtotal: number
  currency: string
  onClose: () => void
}) {
  return (
    <div className="border-t border-black/8 bg-[#FBF7F0] px-5 py-5">
      <div className="flex items-center justify-between gap-4 pb-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-black/48">Subtotal</p>
        <p className="text-[22px] font-sans font-semibold leading-none text-black">{formatPrice(subtotal, currency)}</p>
      </div>

      <div className="space-y-3">
        <Link
          prefetch={false}
          href="/checkout"
          onClick={onClose}
          className="group relative flex items-center justify-center overflow-hidden bg-[#140606] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white"
        >
          <span className="relative z-10">Checkout</span>
          <span className="absolute inset-0 -translate-x-[101%] bg-[#D33740] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
        </Link>

        <Link
          prefetch={false}
          href="/shop"
          onClick={onClose}
          className="group relative flex items-center justify-center overflow-hidden border border-black/10 bg-white px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-black"
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Continue Shopping</span>
          <span className="absolute inset-0 -translate-x-[101%] bg-[#140606] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
        </Link>
      </div>
    </div>
  )
}

import Link from "next/link"
import { BadgePercent, NotebookPen, Truck } from "lucide-react"
import { formatPrice } from "@/lib/data"

const UTILITY_ITEMS = [
  { label: "Note", icon: NotebookPen },
  { label: "Discount", icon: BadgePercent },
  { label: "Shipping", icon: Truck },
] as const

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
      <div className="grid grid-cols-3 gap-3 border-b border-black/8 pb-5">
        {UTILITY_ITEMS.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.label} className="flex flex-col items-center gap-2 text-center">
              <Icon className="h-5 w-5 text-black" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-black/62">{item.label}</span>
            </div>
          )
        })}
      </div>

      <div className="flex items-end justify-between gap-4 py-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-black/48">Subtotal</p>
          <p className="mt-2 text-3xl font-serif leading-none text-black">{formatPrice(subtotal, currency)}</p>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          prefetch={false}
          href="/checkout"
          onClick={onClose}
          className="group relative flex items-center justify-center overflow-hidden bg-[#140606] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white"
        >
          <span className="relative z-10">Check Out</span>
          <span className="absolute inset-0 -translate-x-[101%] bg-[#D33740] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
        </Link>

        <Link
          prefetch={false}
          href="/checkout"
          onClick={onClose}
          className="group relative flex items-center justify-center overflow-hidden border border-black/10 bg-white px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-black"
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-white">View Shopping Cart</span>
          <span className="absolute inset-0 -translate-x-[101%] bg-[#140606] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
        </Link>
      </div>
    </div>
  )
}

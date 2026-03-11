import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function CheckoutEmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center lg:px-20">
      <p className="mb-4 text-xs font-sans uppercase tracking-[0.4em] text-[#D33740]">
        Your Collection
      </p>
      <h1 className="mb-4 text-3xl font-serif text-foreground md:text-4xl">
        Your Bag Is Empty
      </h1>
      <p className="mb-8 max-w-md text-sm font-sans leading-7 text-muted-foreground">
        Discover handcrafted pieces from Arunachal Pradesh and build your cart
        before moving to checkout.
      </p>
      <Link
        prefetch={false}
        href="/shop"
        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-8 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500"
      >
        <span className="relative z-20">Continue Shopping</span>
        <ArrowLeft className="relative z-20 h-3.5 w-3.5" />
        <span className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
      </Link>
    </div>
  )
}


import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function CheckoutHeader() {
  return (
    <div className="mb-10">
      <Link
        prefetch={false}
        href="/shop"
        className="mb-5 inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Continue Shopping
      </Link>

      <div className="border-b border-black/10 pb-6">
        <p className="mb-3 text-[10px] font-sans uppercase tracking-[0.35em] text-[#C5AB7D]">
          Secure Checkout
        </p>
        <h1 className="text-4xl font-serif text-foreground md:text-5xl">
          Checkout
        </h1>
      </div>
    </div>
  )
}


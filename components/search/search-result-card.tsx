import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { Product } from "@/lib/data"
import { formatPrice } from "@/lib/data"

export function SearchResultCard({
  product,
  onNavigate,
}: {
  product: Product
  onNavigate?: () => void
}) {
  return (
    <Link
      prefetch={false}
      href={`/product/${product.slug}`}
      onClick={onNavigate}
      className="group grid gap-3 border-b border-black/8 py-3 transition-colors duration-300 hover:border-[#D33740]/40 md:grid-cols-[72px_minmax(0,1fr)]"
    >
      <div className="relative aspect-square overflow-hidden bg-[#f4ecdd]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#B8894A]">{product.category}</p>
          <h3 className="mt-1 font-serif text-[20px] leading-none text-black md:text-[22px]">{product.name}</h3>
          <p className="mt-1 text-sm text-black/56">{product.collection}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[15px] font-medium text-black">{formatPrice(product.price, product.currency)}</p>
          <span className="mt-1 inline-flex items-center justify-end text-black transition-colors duration-300 group-hover:text-[#D33740]">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

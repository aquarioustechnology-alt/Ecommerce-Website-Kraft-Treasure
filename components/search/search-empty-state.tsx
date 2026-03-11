import Link from "next/link"
import { shopCategories } from "@/lib/shop-data"

export function SearchEmptyState({
  query,
  onUseSuggestion,
  onClose,
}: {
  query: string
  onUseSuggestion: (value: string) => void
  onClose: () => void
}) {
  return (
    <div className="border border-dashed border-black/12 bg-[#fbf6ed] p-6">
      <p className="text-[11px] uppercase tracking-[0.24em] text-[#B8894A]">No results</p>
      <p className="mt-3 text-sm leading-6 text-black/62">Nothing matched "{query}". Try one of these categories instead.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {shopCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onUseSuggestion(item)}
            className="border border-black/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:border-[#D33740] hover:text-[#D33740]"
          >
            {item}
          </button>
        ))}
      </div>

      <Link
        prefetch={false}
        href="/shop"
        onClick={onClose}
        className="mt-5 inline-flex border border-black/10 bg-[#140606] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#D33740]"
      >
        View All Products
      </Link>
    </div>
  )
}

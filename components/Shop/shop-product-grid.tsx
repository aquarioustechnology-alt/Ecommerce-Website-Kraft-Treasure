import type { Product } from "@/lib/data"
import { ShopProductCard } from "@/components/Shop/shop-product-card"

interface ShopProductGridProps {
  products: Product[]
  columns: 3 | 4
  onResetFilters: () => void
}

export function ShopProductGrid({ products, columns, onResetFilters }: ShopProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="border border-black/5 bg-[#FCFAF7] p-8 lg:p-12 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#C5AB7D] font-sans mb-3">
          No Match Found
        </p>
        <h2 className="text-2xl md:text-3xl font-serif text-black mb-4">
          No products match the current filters.
        </h2>
        <p className="text-sm md:text-base text-black/70 font-sans max-w-xl mx-auto mb-6">
          Reset the filter rail to return to the full shop listing, or choose a different category from the navigation menu.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center justify-center gap-2 bg-[#D33740] text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md hover:bg-[#C5AB7D]"
        >
          Reset Filters
        </button>
      </section>
    )
  }

  const gridClass = columns === 4
    ? "grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
    : "grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"

  return (
    <section className={gridClass}>
      {products.map((product) => (
        <ShopProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
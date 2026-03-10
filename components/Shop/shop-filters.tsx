import { Check, RotateCcw } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Homepage/select"

interface ShopFiltersProps {
  categories: readonly string[]
  categoryCounts: Record<string, number>
  activeCategory: string | null
  onCategoryChange: (category: string | null) => void
  collections: string[]
  selectedCollection: string
  onCollectionChange: (collection: string) => void
  availability: "all" | "in-stock"
  onAvailabilityChange: (availability: "all" | "in-stock") => void
  hasActiveFilters: boolean
  onReset: () => void
}

export function ShopFilters({
  categories,
  categoryCounts,
  activeCategory,
  onCategoryChange,
  collections,
  selectedCollection,
  onCollectionChange,
  availability,
  onAvailabilityChange,
  hasActiveFilters,
  onReset,
}: ShopFiltersProps) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="border border-black/5 bg-[#FCFAF7] p-6 lg:p-7 shadow-[0_14px_40px_-32px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-black/10">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C5AB7D] font-sans mb-2">
              Filter Rail
            </p>
            <h2 className="text-xl font-serif text-black">Refine Listing</h2>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-sans text-black/60 hover:text-black transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {hasActiveFilters ? "Reset" : "Clear"}
          </button>
        </div>

        <div className="pt-6 space-y-8">
          <section>
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/60 font-sans mb-3">
              Categories
            </p>
            <Select
              value={activeCategory ?? "all"}
              onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-full h-12 rounded-none border-black/10 bg-white text-[11px] tracking-[0.18em] uppercase font-sans shadow-none focus-visible:ring-0 focus-visible:border-[#C5AB7D]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/10 bg-[#FCFAF7]">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category} ({categoryCounts[category] ?? 0})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          <section>
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/60 font-sans mb-3">
              Collections
            </p>
            <Select value={selectedCollection} onValueChange={onCollectionChange}>
              <SelectTrigger className="w-full h-12 rounded-none border-black/10 bg-white text-[11px] tracking-[0.18em] uppercase font-sans shadow-none focus-visible:ring-0 focus-visible:border-[#C5AB7D]">
                <SelectValue placeholder="All Collections" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/10 bg-[#FCFAF7]">
                <SelectItem value="All collections">All Collections</SelectItem>
                {collections.map((collection) => (
                  <SelectItem key={collection} value={collection}>
                    {collection}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          <section>
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/60 font-sans mb-3">
              Availability
            </p>
            <div className="space-y-2">
              {[
                { value: "all", label: "All availability" },
                { value: "in-stock", label: "In stock" },
              ].map((option) => {
                const isActive = availability === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onAvailabilityChange(option.value as "all" | "in-stock")}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left text-[11px] tracking-[0.16em] uppercase font-sans border transition-colors ${
                      isActive
                        ? "border-[#C5AB7D] bg-white text-black"
                        : "border-black/10 bg-white/70 text-black/65 hover:text-black hover:border-black/20"
                    }`}
                  >
                    <span>{option.label}</span>
                    {isActive && <Check className="w-3.5 h-3.5" />}
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </aside>
  )
}
import { LayoutGrid, SlidersHorizontal, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Homepage/select"

interface ShopToolbarProps {
  filteredCount: number
  activeCategory: string | null
  sortBy: "featured" | "price-asc" | "price-desc" | "latest"
  onSortChange: (value: "featured" | "price-asc" | "price-desc" | "latest") => void
  columns: 3 | 4
  onColumnsChange: (value: 3 | 4) => void
  onClearCategory: () => void
}

export function ShopToolbar({
  filteredCount,
  activeCategory,
  sortBy,
  onSortChange,
  columns,
  onColumnsChange,
  onClearCategory,
}: ShopToolbarProps) {
  return (
    <section className="border-y border-black/10 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#C5AB7D] font-sans">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Listing Overview
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-serif text-black">{filteredCount} Pieces Found</h2>
          {activeCategory && (
            <button
              type="button"
              onClick={onClearCategory}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-black/10 bg-[#FCFAF7] text-[10px] tracking-[0.18em] uppercase font-sans text-black/75 hover:text-black hover:border-black/20 transition-colors"
            >
              {activeCategory}
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-5 self-start lg:self-center">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.22em] uppercase text-black/55 font-sans whitespace-nowrap">
            Sort By
          </span>
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as "featured" | "price-asc" | "price-desc" | "latest")}>
            <SelectTrigger className="min-w-[220px] h-12 rounded-none border-black/10 bg-[#FCFAF7] text-[11px] tracking-[0.16em] uppercase font-sans shadow-none focus-visible:ring-0 focus-visible:border-[#C5AB7D]">
              <SelectValue placeholder="Featured Order" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-black/10 bg-[#FCFAF7]">
              <SelectItem value="featured">Featured Order</SelectItem>
              <SelectItem value="latest">Latest Arrivals</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.22em] uppercase text-black/55 font-sans whitespace-nowrap">
            Columns
          </span>
          <div className="inline-flex items-center border border-black/10 bg-[#FCFAF7]">
            {[4, 3].map((option) => {
              const isActive = columns === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onColumnsChange(option as 3 | 4)}
                  className={`inline-flex items-center gap-2 px-4 h-12 text-[11px] tracking-[0.16em] uppercase font-sans transition-colors ${
                    isActive
                      ? "bg-white text-black"
                      : "text-black/55 hover:text-black"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { LayoutGrid, SlidersHorizontal } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Homepage/drawer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Homepage/select"
import { ShopFilters } from "@/components/Shop/shop-filters"

interface ShopMobileControlsProps {
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
  sortBy: "featured" | "price-asc" | "price-desc" | "latest"
  onSortChange: (value: "featured" | "price-asc" | "price-desc" | "latest") => void
  columns: 3 | 4
  onColumnsChange: (value: 3 | 4) => void
}

export function ShopMobileControls({
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
  sortBy,
  onSortChange,
  columns,
  onColumnsChange,
}: ShopMobileControlsProps) {
  return (
    <Drawer>
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[22px] border border-black/10 bg-white/95 p-2 shadow-[0_18px_42px_-18px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <DrawerTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-[14px] bg-[#FCFAF7] px-4 h-11 text-[11px] tracking-[0.16em] uppercase font-sans text-black"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#D33740]" />}
            </button>
          </DrawerTrigger>

          <Select value={sortBy} onValueChange={(value) => onSortChange(value as "featured" | "price-asc" | "price-desc" | "latest")}>
            <SelectTrigger className="w-full h-11 rounded-[14px] border-black/10 bg-[#FCFAF7] text-[11px] tracking-[0.14em] uppercase font-sans shadow-none focus-visible:ring-0 focus-visible:border-[#C5AB7D]">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent className="rounded-[16px] border-black/10 bg-[#FCFAF7]">
              <SelectItem value="featured">Featured Order</SelectItem>
              <SelectItem value="latest">Latest Arrivals</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <div className="inline-flex items-center rounded-[14px] border border-black/10 bg-[#FCFAF7] overflow-hidden">
            {[4, 3].map((option) => {
              const isActive = columns === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onColumnsChange(option as 3 | 4)}
                  className={`inline-flex items-center gap-1.5 px-3 h-11 text-[11px] tracking-[0.14em] uppercase font-sans transition-colors ${
                    isActive ? "bg-white text-black" : "text-black/55"
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

      <DrawerContent className="bg-[#FCFAF7] border-black/10 rounded-t-[24px] max-h-[85vh]">
        <DrawerTitle className="sr-only">Refine shop filters</DrawerTitle>
        <div className="overflow-y-auto p-4 pb-6">
          <ShopFilters
            categories={categories}
            categoryCounts={categoryCounts}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
            collections={collections}
            selectedCollection={selectedCollection}
            onCollectionChange={onCollectionChange}
            availability={availability}
            onAvailabilityChange={onAvailabilityChange}
            hasActiveFilters={hasActiveFilters}
            onReset={onReset}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
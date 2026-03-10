"use client"

import { useEffect, useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ShopHero } from "@/components/Shop/shop-hero"
import { ShopFilters } from "@/components/Shop/shop-filters"
import { ShopToolbar } from "@/components/Shop/shop-toolbar"
import { ShopProductGrid } from "@/components/Shop/shop-product-grid"
import { ShopMobileControls } from "@/components/Shop/shop-mobile-controls"
import { normalizeShopCategory, shopCategories, shopProducts } from "@/lib/shop-data"

interface ShopPageContentProps {
  initialCategory?: string | null
}

export function ShopPageContent({ initialCategory = null }: ShopPageContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const [activeCategory, setActiveCategory] = useState<string | null>(normalizeShopCategory(initialCategory))
  const [selectedCollection, setSelectedCollection] = useState("All collections")
  const [availability, setAvailability] = useState<"all" | "in-stock">("all")
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "latest">("featured")
  const [columns, setColumns] = useState<3 | 4>(4)

  useEffect(() => {
    setActiveCategory(normalizeShopCategory(initialCategory))
  }, [initialCategory])

  const collections = Array.from(new Set(shopProducts.map((product) => product.collection)))
  const categoryCounts = Object.fromEntries(
    shopCategories.map((category) => [category, shopProducts.filter((product) => product.category === category).length])
  ) as Record<string, number>

  const updateCategory = (category: string | null) => {
    const nextCategory = normalizeShopCategory(category)
    const params = new URLSearchParams()

    if (nextCategory) {
      params.set("category", nextCategory)
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    setActiveCategory(nextCategory)

    startTransition(() => {
      router.replace(nextUrl, { scroll: false })
    })
  }

  const resetAllFilters = () => {
    setSelectedCollection("All collections")
    setAvailability("all")
    setSortBy("featured")
    setColumns(4)
    updateCategory(null)
  }

  const filteredProducts = shopProducts.filter((product) => {
    if (activeCategory && product.category !== activeCategory) return false
    if (selectedCollection !== "All collections" && product.collection !== selectedCollection) return false
    if (availability === "in-stock" && !product.inStock) return false
    return true
  })

  const sortedProducts = [...filteredProducts]
  switch (sortBy) {
    case "price-asc":
      sortedProducts.sort((left, right) => left.price - right.price)
      break
    case "price-desc":
      sortedProducts.sort((left, right) => right.price - left.price)
      break
    case "latest":
      sortedProducts.reverse()
      break
    default:
      break
  }

  const hasActiveFilters = Boolean(activeCategory) || selectedCollection !== "All collections" || availability !== "all"

  return (
    <>
      <ShopHero />

      <section className="pb-28 lg:pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
          <div className="hidden lg:block">
            <ShopFilters
              categories={shopCategories}
              categoryCounts={categoryCounts}
              activeCategory={activeCategory}
              onCategoryChange={updateCategory}
              collections={collections}
              selectedCollection={selectedCollection}
              onCollectionChange={setSelectedCollection}
              availability={availability}
              onAvailabilityChange={setAvailability}
              hasActiveFilters={hasActiveFilters}
              onReset={resetAllFilters}
            />
          </div>

          <div className="space-y-8">
            <ShopToolbar
              filteredCount={sortedProducts.length}
              activeCategory={activeCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              columns={columns}
              onColumnsChange={setColumns}
              onClearCategory={() => updateCategory(null)}
            />
            <ShopProductGrid products={sortedProducts} columns={columns} onResetFilters={resetAllFilters} />
          </div>
        </div>
      </section>

      <ShopMobileControls
        categories={shopCategories}
        categoryCounts={categoryCounts}
        activeCategory={activeCategory}
        onCategoryChange={updateCategory}
        collections={collections}
        selectedCollection={selectedCollection}
        onCollectionChange={setSelectedCollection}
        availability={availability}
        onAvailabilityChange={setAvailability}
        hasActiveFilters={hasActiveFilters}
        onReset={resetAllFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        columns={columns}
        onColumnsChange={setColumns}
      />
    </>
  )
}
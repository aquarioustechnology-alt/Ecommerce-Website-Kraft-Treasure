"use client"

import { useDeferredValue, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { shopCategories, shopProducts } from "@/lib/shop-data"
import { cn } from "@/lib/utils"
import { SearchEmptyState } from "@/components/search/search-empty-state"
import { SearchResultCard } from "@/components/search/search-result-card"

function includesSearchTerm(value: string, searchTerm: string) {
  return value.toLowerCase().includes(searchTerm)
}

export function SearchOverlay({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = deferredQuery.trim().toLowerCase()

  const searchResults = normalizedQuery
    ? shopProducts.filter((product) => {
        const searchIndex = [
          product.name,
          product.category,
          product.collection,
          product.origin,
          product.material,
          product.artisan.name,
          product.artisan.tribe,
          product.description,
        ].join(" ").toLowerCase()

        return includesSearchTerm(searchIndex, normalizedQuery)
      }).slice(0, 8)
    : shopProducts.slice(0, 6)

  useEffect(() => {
    if (!open) {
      setQuery("")
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 120)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onOpenChange])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] transition-all duration-300",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/35 backdrop-blur-sm"
        aria-label="Close search"
      />

      <div className="absolute inset-0 mx-auto flex h-full w-full max-w-[1280px] items-center justify-center px-4 py-6 lg:px-8">
        <div
          className={cn(
            "relative flex max-h-[80vh] w-full max-w-[980px] flex-col overflow-hidden border border-black/10 bg-white shadow-[0_24px_90px_-45px_rgba(0,0,0,0.55)] transition-all duration-300",
            open ? "translate-y-0 scale-100" : "-translate-y-4 scale-[0.98]"
          )}
        >
          <div className="flex items-center justify-between border-b border-black/8 px-5 py-4 lg:px-7">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#B8894A]">Search</p>
              <h2 className="mt-2 font-serif text-[30px] leading-none text-black">Find A Piece</h2>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-10 w-10 items-center justify-center border border-black/10 bg-[#faf6ee] text-black transition-colors duration-300 hover:border-[#D33740] hover:text-[#D33740]"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="border-b border-black/8 px-5 py-4 lg:px-7">
            <label className="flex items-center gap-3 border border-black/10 bg-[#faf6ee] px-4 py-3 focus-within:border-[#D33740]">
              <Search className="h-4 w-4 text-black/45" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, categories, artisan names"
                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/35"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              {shopCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setQuery(category)}
                  className="border border-black/10 bg-white px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:border-[#D33740] hover:text-[#D33740]"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[62vh] overflow-y-auto px-5 py-5 lg:px-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-black/56">
                {normalizedQuery ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}` : "Popular pieces"}
              </p>
              <Link
                prefetch={false}
                href="/shop"
                onClick={() => onOpenChange(false)}
                className="text-[11px] uppercase tracking-[0.2em] text-[#D33740] transition-opacity duration-300 hover:opacity-70"
              >
                View all
              </Link>
            </div>

            {normalizedQuery && searchResults.length === 0 ? (
              <SearchEmptyState
                query={query.trim()}
                onUseSuggestion={setQuery}
                onClose={() => onOpenChange(false)}
              />
            ) : (
              <div className="space-y-1">
                {searchResults.map((product) => (
                  <SearchResultCard
                    key={product.id}
                    product={product}
                    onNavigate={() => onOpenChange(false)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

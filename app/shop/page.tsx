import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { ShopPageContent } from "@/components/Shop/shop-page"

export const metadata: Metadata = {
  title: "Shop | Arunachal Luxe Artifacts",
  description: "Browse the full Kraft Treasure catalog with category-led filtering and curated product listings.",
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const category = resolvedSearchParams.category
  const initialCategory = Array.isArray(category) ? (category[0] ?? null) : (category ?? null)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ShopPageContent initialCategory={initialCategory} />
      <SiteFooter />
    </main>
  )
}
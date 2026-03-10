import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { ShopPageContent } from "@/components/Shop/shop-page"

export const metadata: Metadata = {
  title: "Shop | Arunachal Luxe Artifacts",
  description: "Browse the full Kraft Treasure catalog with category-led filtering and curated product listings.",
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ShopPageContent />
      <SiteFooter />
    </main>
  )
}
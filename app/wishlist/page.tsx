import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { WishlistPageContent } from "@/components/Wishlist/wishlist-page-content"

export const metadata: Metadata = {
  title: "Wishlist | Kraft Treasure",
  description: "Review the pieces you have saved on Kraft Treasure.",
}

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <WishlistPageContent />
      <SiteFooter />
    </main>
  )
}

import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { CheckoutPageContent } from "@/components/Checkout/checkout-page-content"

export const metadata: Metadata = {
  title: "Checkout | Arunachal Luxe Artifacts",
  description: "Complete your purchase of museum-quality handcrafted artifacts.",
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CheckoutPageContent />
      <SiteFooter />
    </main>
  )
}


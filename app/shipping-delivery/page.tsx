import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { ShippingDeliveryHero } from "@/components/Shipping & Delivery/shipping-delivery-hero"
import { ShippingDeliverySupport } from "@/components/Shipping & Delivery/shipping-delivery-support"
import { ShippingDeliveryZones } from "@/components/Shipping & Delivery/shipping-delivery-zones"

export const metadata: Metadata = {
  title: "Shipping & Delivery | Kraft Treasure",
  description:
    "Learn about Kraft Treasure shipping timelines, delivery windows, and dispatch support for handcrafted heritage objects.",
}

export default function ShippingDeliveryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ShippingDeliveryHero />
      <ShippingDeliveryZones />
      <ShippingDeliverySupport />
      <SiteFooter />
    </main>
  )
}

import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { ReturnsExchangesHero } from "@/components/Returns & Exchanges/returns-exchanges-hero"
import { ReturnsExchangesProcess } from "@/components/Returns & Exchanges/returns-exchanges-process"
import { ReturnsExchangesSupport } from "@/components/Returns & Exchanges/returns-exchanges-support"

export const metadata: Metadata = {
  title: "Returns & Exchanges | Kraft Treasure",
  description:
    "Understand the Kraft Treasure return and exchange process, eligible conditions, and support touchpoints.",
}

export default function ReturnsExchangesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ReturnsExchangesHero />
      <ReturnsExchangesProcess />
      <ReturnsExchangesSupport />
      <SiteFooter />
    </main>
  )
}

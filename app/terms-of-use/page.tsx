import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { TermsOfUseHero } from "@/components/Terms of Use/terms-of-use-hero"
import { TermsOfUseGuidelines } from "@/components/Terms of Use/terms-of-use-guidelines"
import { TermsOfUseService } from "@/components/Terms of Use/terms-of-use-service"

export const metadata: Metadata = {
  title: "Terms of Use | Kraft Treasure",
  description:
    "Review the Kraft Treasure terms of use for browsing, purchasing, intellectual property, and site conduct.",
}

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <TermsOfUseHero />
      <TermsOfUseGuidelines />
      <TermsOfUseService />
      <SiteFooter />
    </main>
  )
}

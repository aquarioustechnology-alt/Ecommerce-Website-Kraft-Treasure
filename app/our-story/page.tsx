import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { OurStoryCta } from "@/components/our story/our-story-cta"
import { OurStoryCollective } from "@/components/our story/our-story-collective"
import { OurStoryHero } from "@/components/our story/our-story-hero"
import { OurStoryJourney } from "@/components/our story/our-story-journey"
import { OurStoryLedger } from "@/components/our story/our-story-ledger"
import { OurStoryOrigin } from "@/components/our story/our-story-origin"
import { OurStoryValues } from "@/components/our story/our-story-values"

export const metadata: Metadata = {
  title: "Our Story | Kraft Treasure",
  description:
    "Discover the story behind Kraft Treasure, our curatorial approach, and the artisan relationships that shape every heritage object in the collection.",
}

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <OurStoryHero />
      <OurStoryLedger />
      <OurStoryOrigin />
      <OurStoryJourney />
      <OurStoryCollective />
      <OurStoryValues />
      <OurStoryCta />
      <SiteFooter />
    </main>
  )
}

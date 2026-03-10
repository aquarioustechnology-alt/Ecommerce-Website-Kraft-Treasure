import type { Metadata } from "next"
import { ContactConnect } from "@/components/contact/contact-connect"
import { ContactHero } from "@/components/contact/contact-hero"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Contact | Arunachal Luxe Artifacts",
  description: "Get in touch with Kraft Treasure for product enquiries, order support, and curated buying assistance.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ContactHero />
      <ContactConnect />
      <SiteFooter />
    </main>
  )
}
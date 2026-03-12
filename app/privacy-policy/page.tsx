import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { PrivacyPolicyHero } from "@/components/Privacy Policy/privacy-policy-hero"
import { PrivacyPolicyPrinciples } from "@/components/Privacy Policy/privacy-policy-principles"
import { PrivacyPolicyRights } from "@/components/Privacy Policy/privacy-policy-rights"

export const metadata: Metadata = {
  title: "Privacy Policy | Kraft Treasure",
  description:
    "Read the Kraft Treasure privacy policy covering data collection, usage, storage, and customer rights.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <PrivacyPolicyHero />
      <PrivacyPolicyPrinciples />
      <PrivacyPolicyRights />
      <SiteFooter />
    </main>
  )
}

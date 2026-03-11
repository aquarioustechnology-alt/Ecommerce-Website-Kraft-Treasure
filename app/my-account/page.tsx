import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { AccountShell } from "@/components/login/account-shell"

export const metadata: Metadata = {
  title: "My Account | Kraft Treasure",
  description: "View the current Kraft Treasure account experience for collectors.",
}

export default function MyAccountPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <AccountShell />
      <SiteFooter />
    </main>
  )
}

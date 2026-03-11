import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { AuthShell } from "@/components/login/auth-shell"

export const metadata: Metadata = {
  title: "Login | Kraft Treasure",
  description: "Login or register to access the Kraft Treasure collector account experience.",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <AuthShell />
      <SiteFooter />
    </main>
  )
}

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { AccountDashboard } from "@/components/login/account-dashboard"
import { AUTH_EVENT, clearStoredSession, getStoredSession, type StoredSession } from "@/lib/auth"

export function AccountShell() {
  const router = useRouter()
  const [session, setSession] = useState<StoredSession | null | undefined>(undefined)

  useEffect(() => {
    const syncSession = () => {
      setSession(getStoredSession())
    }

    syncSession()
    window.addEventListener("storage", syncSession)
    window.addEventListener(AUTH_EVENT, syncSession)

    return () => {
      window.removeEventListener("storage", syncSession)
      window.removeEventListener(AUTH_EVENT, syncSession)
    }
  }, [])

  if (session === undefined) {
    return (
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#faf5ea_100%)] px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] border border-black/10 bg-white px-8 py-16 text-center">
          <p className="text-[10px] font-sans uppercase tracking-[0.32em] text-[#B8894A]">Loading account</p>
          <h1 className="mt-4 font-serif text-[42px] leading-tight text-black lg:text-[56px]">Preparing Your Account Dashboard.</h1>
        </div>
      </section>
    )
  }

  if (!session) {
    return (
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#faf5ea_100%)] px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[980px] border border-black/10 bg-white p-8 text-center lg:p-12">
          <p className="text-[10px] font-sans uppercase tracking-[0.32em] text-[#B8894A]">Access required</p>
          <h1 className="mt-4 font-serif text-[40px] leading-tight text-black lg:text-[52px]">Login To Open Your Account Area.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-sans leading-7 text-black/64 lg:text-[15px]">
            This page is ready, but there is no active test session in the browser yet. Sign in once or create an account and you will return here immediately.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              prefetch={false}
              href="/login"
              className="group relative inline-flex min-w-[220px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white"
            >
              <span className="relative z-10">Go To Login</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
            </Link>

            <Link
              prefetch={false}
              href="/shop"
              className="inline-flex min-w-[220px] items-center justify-center border border-black/10 bg-white px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-black transition-colors duration-300 hover:border-[#D33740] hover:text-[#D33740]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <AccountDashboard
      session={session}
      onLogout={() => {
        clearStoredSession()
        router.push("/login")
        router.refresh()
      }}
    />
  )
}

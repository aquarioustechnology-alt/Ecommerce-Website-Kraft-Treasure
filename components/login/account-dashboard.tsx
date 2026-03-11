"use client"

import Link from "next/link"
import { CalendarDays, LogOut, Package, Sparkles, UserRound } from "lucide-react"
import type { StoredSession } from "@/lib/auth"
import { getDisplayName } from "@/lib/auth"

const ORDER_SNAPSHOT = [
  {
    label: "Saved preferences",
    value: "Heritage textiles, ritual objects, provenance-led pieces",
  },
  {
    label: "Private assistance",
    value: "Collector support and sourcing conversations available on request",
  },
  {
    label: "Account mode",
    value: "Local test session enabled for this storefront",
  },
] as const

const QUICK_ACTIONS = [
  { label: "Browse The Shop", href: "/shop" },
  { label: "Read Our Story", href: "/our-story" },
  { label: "Contact The Curators", href: "/contact" },
] as const

export function AccountDashboard({
  session,
  onLogout,
}: {
  session: StoredSession
  onLogout: () => void
}) {
  const joinedOn = new Date(session.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8f2e7_18%,#f2eadc_100%)] px-6 py-14 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[34px] border border-black/10 bg-white">
            <div className="border-b border-black/8 bg-[#140606] px-8 py-8 text-white lg:px-10">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#EAC577]">My account</p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.92] lg:text-[72px]">
                Welcome Back, {getDisplayName(session)}.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
                Your account is active in local test mode. Use this space to continue browsing, revisit collections, and move deeper into the catalog.
              </p>
            </div>

            <div className="grid gap-6 p-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:p-10">
              <div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border border-black/8 bg-[#fffaf1] p-5">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#D33740] text-white">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-[#B8894A]">Profile</p>
                    <p className="mt-3 font-serif text-[34px] leading-none text-black">{getDisplayName(session)}</p>
                    <p className="mt-3 text-sm leading-6 text-black/64">{session.email}</p>
                  </div>

                  <div className="border border-black/8 bg-[#fffaf1] p-5">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#140606] text-white">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-[#B8894A]">Session started</p>
                    <p className="mt-3 font-serif text-[34px] leading-none text-black">{joinedOn}</p>
                    <p className="mt-3 text-sm leading-6 text-black/64">Signed in via {session.source === "register" ? "registration" : "login"} form.</p>
                  </div>
                </div>

                <div className="mt-6 border border-black/8 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#D33740] text-white">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#B8894A]">Collector summary</p>
                      <h2 className="mt-2 font-serif text-[38px] leading-none text-black">Your Account Snapshot.</h2>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {ORDER_SNAPSHOT.map((item) => (
                      <div key={item.label} className="border border-black/8 bg-[#faf6ee] p-4">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-black/44">{item.label}</p>
                        <p className="mt-3 text-sm leading-5 text-black/68">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-black/8 bg-[#fffaf1] p-6">
                <div className="flex h-12 w-12 items-center justify-center bg-[#140606] text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-[#B8894A]">Next steps</p>
                <h2 className="mt-3 font-serif text-[38px] leading-none text-black">Where To Go From Here.</h2>
                <p className="mt-4 text-sm leading-6 text-black/64">
                  Keep exploring the live catalog or move into story-led browsing. This section is ready for deeper account features once backend auth is added.
                </p>

                <div className="mt-6 space-y-3">
                  {QUICK_ACTIONS.map((item) => (
                    <Link
                      key={item.label}
                      prefetch={false}
                      href={item.href}
                      className="block border border-black/8 bg-white px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition-colors duration-300 hover:border-[#D33740] hover:text-[#D33740]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white"
                >
                  <span className="relative z-10">Logout</span>
                  <LogOut className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

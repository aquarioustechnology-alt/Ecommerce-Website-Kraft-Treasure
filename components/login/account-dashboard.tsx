"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  KeyRound,
  LogOut,
  MapPin,
  Package,
  UserRound,
  WalletCards,
} from "lucide-react"
import type { StoredSession } from "@/lib/auth"
import { getDisplayName } from "@/lib/auth"

type SectionId = "profile" | "password" | "orders" | "transactions" | "address"

type SectionConfig = {
  id: SectionId
  label: string
  title: string
  description: string
  icon: typeof UserRound
}

const ACCOUNT_SECTIONS: SectionConfig[] = [
  {
    id: "profile",
    label: "My Profile",
    title: "Profile Details",
    description: "Basic information for the current account session.",
    icon: UserRound,
  },
  {
    id: "password",
    label: "Change Password",
    title: "Change Password",
    description: "Update the password fields for this account layout.",
    icon: KeyRound,
  },
  {
    id: "orders",
    label: "My Orders",
    title: "Order History",
    description: "A simple record of recent orders.",
    icon: Package,
  },
  {
    id: "transactions",
    label: "My Transaction",
    title: "Transactions",
    description: "A simple payment history view.",
    icon: WalletCards,
  },
  {
    id: "address",
    label: "My Address",
    title: "Saved Addresses",
    description: "Delivery addresses available for checkout.",
    icon: MapPin,
  },
]

const ORDERS = [
  {
    id: "KT-24018",
    date: "11 Mar 2026",
    status: "Processing",
    amount: "Rs. 19,200",
  },
  {
    id: "KT-23974",
    date: "02 Mar 2026",
    status: "Delivered",
    amount: "Rs. 12,400",
  },
] as const

const TRANSACTIONS = [
  {
    id: "TXN-919201",
    method: "UPI",
    date: "11 Mar 2026",
    amount: "Rs. 19,200",
  },
  {
    id: "TXN-914004",
    method: "Netbanking",
    date: "02 Mar 2026",
    amount: "Rs. 12,400",
  },
] as const

const ADDRESSES = [
  {
    label: "Home",
    line1: "17 Heritage Lane, Near Craft Museum",
    line2: "Guwahati, Assam 781001",
  },
  {
    label: "Studio",
    line1: "42 River View Road, Floor 2",
    line2: "Itanagar, Arunachal Pradesh 791111",
  },
] as const

function PrimaryButton({ label, href }: { label: string; href?: string }) {
  const classes = "group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white shadow-md"

  if (href) {
    return (
      <Link prefetch={false} href={href} className={classes}>
        <span className="relative z-10">{label}</span>
        <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
      </Link>
    )
  }

  return (
    <button type="button" className={classes}>
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
    </button>
  )
}

function ContentHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b border-black/10 pb-5">
      <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B8894A]">
        Account Section
      </p>
      <h2 className="mt-3 font-serif text-[34px] leading-tight text-foreground lg:text-[40px]">
        {title}
      </h2>
      <p className="mt-3 text-sm font-sans leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export function AccountDashboard({
  session,
  onLogout,
}: {
  session: StoredSession
  onLogout: () => void
}) {
  const searchParams = useSearchParams()
  const sectionParam = searchParams.get("section")
  const activeSectionId: SectionId = ACCOUNT_SECTIONS.some(
    (section) => section.id === sectionParam
  )
    ? (sectionParam as SectionId)
    : "profile"
  const activeSection =
    ACCOUNT_SECTIONS.find((section) => section.id === activeSectionId) ||
    ACCOUNT_SECTIONS[0]
  const displayName = getDisplayName(session)
  const accountInitial = displayName.charAt(0).toUpperCase() || "U"

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#faf5ea_100%)] px-6 py-12 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="border border-black/10 bg-white">
            <div className="border-b border-black/10 p-6">
              <div className="flex h-14 w-14 items-center justify-center bg-[#D33740] text-lg font-sans font-semibold uppercase text-white">
                {accountInitial}
              </div>
              <p className="mt-4 text-[10px] font-sans uppercase tracking-[0.28em] text-[#B8894A]">
                My Account
              </p>
              <p className="mt-2 font-serif text-[28px] leading-tight text-foreground">
                {displayName}
              </p>
              <p className="mt-2 text-sm font-sans leading-6 text-muted-foreground">
                {session.email}
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-2">
                {ACCOUNT_SECTIONS.map((section) => {
                  const Icon = section.icon
                  const isActive = section.id === activeSectionId

                  return (
                    <Link
                      prefetch={false}
                      key={section.id}
                      href={`/my-account?section=${section.id}`}
                      className={`flex items-center gap-3 border px-4 py-3 text-sm font-sans transition-colors ${
                        isActive
                          ? "border-[#D33740] bg-[#FFF8F4] text-[#D33740]"
                          : "border-black/10 bg-white text-foreground hover:border-[#D33740]/60 hover:text-[#D33740]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </Link>
                  )
                })}
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
          </aside>

          <div className="border border-black/10 bg-white p-6 lg:p-8">
            <ContentHeader
              title={activeSection.title}
              description={activeSection.description}
            />

            {activeSectionId === "profile" && (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">
                    First Name
                  </p>
                  <div className="border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground">
                    {session.firstName || "User"}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">
                    Last Name
                  </p>
                  <div className="border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground">
                    {session.lastName || "-"}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">
                    Email
                  </p>
                  <div className="border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground">
                    {session.email}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">
                    Account Type
                  </p>
                  <div className="border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground">
                    {session.source === "register" ? "Registered Account" : "Signed In Account"}
                  </div>
                </div>
              </div>
            )}

            {activeSectionId === "password" && (
              <div className="mt-6 grid gap-4 max-w-[720px]">
                <div>
                  <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">
                    Current Password
                  </label>
                  <input type="password" placeholder="Current password" className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">
                    New Password
                  </label>
                  <input type="password" placeholder="New password" className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">
                    Confirm Password
                  </label>
                  <input type="password" placeholder="Confirm password" className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                </div>
                <div className="pt-2">
                  <PrimaryButton label="Save Password" />
                </div>
              </div>
            )}

            {activeSectionId === "orders" && (
              <div className="mt-6 space-y-4">
                {ORDERS.map((order) => (
                  <div key={order.id} className="grid gap-4 border border-black/10 bg-[#FBF8F2] p-5 md:grid-cols-[160px_minmax(0,1fr)_120px] md:items-center">
                    <div>
                      <p className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#B8894A]">
                        Order ID
                      </p>
                      <p className="mt-2 text-sm font-sans font-semibold text-foreground">
                        {order.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-sans text-muted-foreground">
                        {order.date}
                      </p>
                      <p className="mt-2 text-[10px] font-sans uppercase tracking-[0.22em] text-[#D33740]">
                        {order.status}
                      </p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-base font-sans font-semibold text-foreground">
                        {order.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSectionId === "transactions" && (
              <div className="mt-6 space-y-4">
                {TRANSACTIONS.map((transaction) => (
                  <div key={transaction.id} className="grid gap-4 border border-black/10 bg-[#FBF8F2] p-5 md:grid-cols-[180px_140px_minmax(0,1fr)_120px] md:items-center">
                    <div>
                      <p className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#B8894A]">
                        Transaction
                      </p>
                      <p className="mt-2 text-sm font-sans font-semibold text-foreground">
                        {transaction.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-sans text-foreground">
                        {transaction.method}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-sans text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-base font-sans font-semibold text-foreground">
                        {transaction.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSectionId === "address" && (
              <div className="mt-6 space-y-4">
                {ADDRESSES.map((address) => (
                  <div key={address.label} className="border border-black/10 bg-[#FBF8F2] p-5">
                    <p className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#B8894A]">
                      {address.label}
                    </p>
                    <p className="mt-3 text-sm font-sans leading-6 text-muted-foreground">
                      {address.line1}
                      <br />
                      {address.line2}
                    </p>
                  </div>
                ))}
                <div className="pt-2">
                  <PrimaryButton label="Go To Checkout" href="/checkout" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

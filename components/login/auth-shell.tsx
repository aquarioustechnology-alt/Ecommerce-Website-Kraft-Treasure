"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { LoginForm } from "@/components/login/login-form"
import { RegisterForm } from "@/components/login/register-form"
import { AUTH_EVENT, getStoredSession, setStoredSession } from "@/lib/auth"

function normalizeName(value: string) {
  const sanitized = value.trim()
  if (!sanitized) return "Collector"
  return sanitized.charAt(0).toUpperCase() + sanitized.slice(1)
}

export function AuthShell() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    const syncSession = () => {
      setHasSession(Boolean(getStoredSession()))
    }

    syncSession()
    window.addEventListener("storage", syncSession)
    window.addEventListener(AUTH_EVENT, syncSession)

    return () => {
      window.removeEventListener("storage", syncSession)
      window.removeEventListener(AUTH_EVENT, syncSession)
    }
  }, [])

  const enterAccount = (session: { firstName: string; lastName: string; email: string; source: "login" | "register" }) => {
    setIsSubmitting(true)

    setStoredSession({
      ...session,
      createdAt: new Date().toISOString(),
    })

    router.push("/my-account")
    router.refresh()

    window.setTimeout(() => {
      setIsSubmitting(false)
    }, 300)
  }

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f7f1e5_100%)] px-6 py-12 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#B8894A]">Account</p>
            <h1 className="mt-3 font-serif text-[34px] leading-none text-black lg:text-[42px]">Login Or Register</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/62">
              Sign in to access your account area, or create a new profile to continue into My Account.
            </p>
          </div>

          {hasSession ? (
            <Link
              prefetch={false}
              href="/my-account"
              className="group inline-flex items-center gap-2 border border-black/10 bg-[#faf6ee] px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition-colors duration-300 hover:border-[#D33740] hover:text-[#D33740]"
            >
              My Account
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <LoginForm
            isSubmitting={isSubmitting}
            onSubmit={({ email }) => {
              const [firstName, lastName = ""] = email
                .split(/[\s._-]+/)
                .filter(Boolean)
                .map((part) => normalizeName(part))

              enterAccount({
                firstName: firstName || "Collector",
                lastName,
                email,
                source: "login",
              })
            }}
          />

          <RegisterForm
            isSubmitting={isSubmitting}
            onSubmit={({ firstName, lastName, email }) => {
              enterAccount({
                firstName: normalizeName(firstName),
                lastName: normalizeName(lastName),
                email,
                source: "register",
              })
            }}
          />
        </div>
      </div>
    </section>
  )
}

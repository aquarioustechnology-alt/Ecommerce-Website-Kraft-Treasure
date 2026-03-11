"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, KeyRound } from "lucide-react"

type LoginValues = {
  email: string
  password: string
}

export function LoginForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (values: LoginValues) => void
  isSubmitting: boolean
}) {
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!values.email.trim() || !values.password.trim()) {
      setError("Enter your email and password.")
      return
    }

    setError(null)
    onSubmit({ email: values.email.trim(), password: values.password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col border border-black/10 bg-white p-5 lg:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center bg-[#D33740] text-white">
          <KeyRound className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#B8894A]">Login</p>
          <h3 className="mt-1 font-serif text-[28px] leading-none text-black">Sign In</h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-black/58">Enter your login details to open your account dashboard.</p>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-black/48">Email or username</span>
          <input
            type="text"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
            className="w-full border border-black/10 bg-[#faf6ee] px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#D33740]"
            placeholder="user@example.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-black/48">Password</span>
          <input
            type="password"
            value={values.password}
            onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
            className="w-full border border-black/10 bg-[#faf6ee] px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#D33740]"
            placeholder="Password"
          />
        </label>
      </div>

      <div className="mt-4 min-h-5 text-sm text-[#D33740]">{error}</div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative mt-auto inline-flex items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="relative z-10">Login</span>
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
      </button>
    </form>
  )
}

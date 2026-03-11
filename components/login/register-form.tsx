"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, UserPlus } from "lucide-react"

type RegisterValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export function RegisterForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (values: RegisterValues) => void
  isSubmitting: boolean
}) {
  const [values, setValues] = useState<RegisterValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!values.firstName.trim() || !values.email.trim() || !values.password.trim()) {
      setError("Enter your name, email, and password.")
      return
    }

    setError(null)
    onSubmit({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col border border-black/10 bg-[#fffaf1] p-5 lg:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center bg-[#140606] text-white">
          <UserPlus className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#B8894A]">Register</p>
          <h3 className="mt-1 font-serif text-[28px] leading-none text-black">Create Account</h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-black/58">Create your account details here to continue to your personal account page.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-black/48">First name</span>
          <input
            type="text"
            value={values.firstName}
            onChange={(event) => setValues((current) => ({ ...current, firstName: event.target.value }))}
            className="w-full border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#D33740]"
            placeholder="First Name"
          />
        </label>

        <label className="block sm:col-span-1">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-black/48">Last name</span>
          <input
            type="text"
            value={values.lastName}
            onChange={(event) => setValues((current) => ({ ...current, lastName: event.target.value }))}
            className="w-full border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#D33740]"
            placeholder="Last Name"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-black/48">Email or username</span>
          <input
            type="text"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
            className="w-full border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#D33740]"
            placeholder="user@example.com"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-black/48">Password</span>
          <input
            type="password"
            value={values.password}
            onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
            className="w-full border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#D33740]"
            placeholder="Password"
          />
        </label>
      </div>

      <div className="mt-4 min-h-5 text-sm text-[#D33740]">{error}</div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative mt-auto inline-flex items-center justify-center gap-2 overflow-hidden bg-[#140606] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="relative z-10">Register</span>
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        <span className="absolute inset-0 -translate-x-[101%] bg-[#D33740] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
      </button>
    </form>
  )
}

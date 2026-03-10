"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"

const contactMethods = [
  {
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    icon: Phone,
  },
  {
    label: "Email",
    value: "hello@krafttreasure.com",
    href: "mailto:hello@krafttreasure.com",
    icon: Mail,
  },
]

export function ContactConnect() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <section className="px-6 lg:px-12 pb-20 lg:pb-24 max-w-[1440px] mx-auto w-full">
      <div className="grid gap-8 border border-[#E7DED1] bg-[#FBF8F2] p-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-10 lg:p-10 xl:p-12">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="mb-4 text-[10px] tracking-[0.38em] uppercase text-[#D33740] font-sans">
              Reach Us Directly
            </p>
            <h2 className="mb-4 text-3xl lg:text-4xl font-serif text-foreground leading-tight">
              Minimal, direct support for every enquiry
            </h2>
            <p className="max-w-xl text-sm lg:text-[15px] text-muted-foreground font-sans leading-relaxed">
              Share your question and the team can help with product details, availability, shipping clarification, or general purchase support.
            </p>
          </div>

          <div className="grid gap-4">
            {contactMethods.map(({ label, value, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center justify-between gap-4 border border-[#E6DED2] bg-white px-5 py-5 transition-all duration-300 hover:border-[#D33740] hover:shadow-[0_18px_32px_-24px_rgba(211,55,64,0.45)]"
              >
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center border border-[#D33740]/15 bg-[#FFF7F1] text-[#D33740] transition-colors duration-300 group-hover:bg-[#D33740] group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] tracking-[0.24em] uppercase text-muted-foreground font-sans">
                      {label}
                    </p>
                    <p className="text-sm lg:text-base font-sans text-foreground">{value}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-[#E6DED2] p-6 lg:p-8">
          <p className="mb-6 text-[10px] tracking-[0.32em] uppercase text-[#D33740] font-sans">
            Enquiry Form
          </p>

          <div className="grid gap-5">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-sans">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={(event) => {
                  setSubmitted(false)
                  setForm((current) => ({ ...current, name: event.target.value }))
                }}
                className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm text-foreground font-sans transition-colors duration-300 outline-none focus:border-[#D33740]"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-sans">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(event) => {
                  setSubmitted(false)
                  setForm((current) => ({ ...current, email: event.target.value }))
                }}
                className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm text-foreground font-sans transition-colors duration-300 outline-none focus:border-[#D33740]"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-sans">
                Message
              </label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={(event) => {
                  setSubmitted(false)
                  setForm((current) => ({ ...current, message: event.target.value }))
                }}
                className="min-h-[148px] w-full resize-none border border-[#E6DED2] bg-transparent px-4 py-3 text-sm text-foreground font-sans transition-colors duration-300 outline-none focus:border-[#D33740]"
                placeholder="How can we help?"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-[#D33740] text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md whitespace-nowrap min-w-[200px]"
            >
              <span className="relative z-20">Send Enquiry</span>
              <div className="absolute inset-0 bg-[#C5AB7D] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
            </button>

            {submitted && (
              <p className="text-sm text-[#D33740] font-sans">
                Your enquiry has been noted. The team will reach out shortly.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
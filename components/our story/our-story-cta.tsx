import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function OurStoryCta() {
  return (
    <section className="bg-white pb-20 pt-4 lg:pb-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="relative overflow-hidden border border-black/10 bg-[linear-gradient(135deg,#101010_0%,#181818_55%,#2a2220_100%)] px-6 py-10 text-white sm:px-8 lg:px-12 lg:py-14">
          <div aria-hidden className="absolute -right-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#D33740]/30 blur-3xl" />
          <div aria-hidden className="absolute left-1/3 top-0 h-full w-px bg-white/10" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#FFF4B3]">Continue The Story</p>
              <h2 className="mt-4 text-4xl font-serif leading-tight sm:text-5xl lg:text-6xl">
                Explore the collection or start a conversation with our curators.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                Whether you are building a personal collection, sourcing a statement piece, or simply learning the language of these traditions, we can guide the next step.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                prefetch={false}
                href="/shop"
                className="relative group inline-flex min-w-[220px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500 whitespace-nowrap"
              >
                <span className="relative z-20">Browse Collection</span>
                <ArrowRight className="relative z-20 h-3.5 w-3.5 transition-transform group-hover:translate-x-2" />
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
              </Link>
              <Link
                prefetch={false}
                href="/contact"
                className="relative group inline-flex min-w-[220px] items-center justify-center gap-2 overflow-hidden border border-[#FFF4B3] bg-transparent px-6 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-[#FFF4B3] shadow-sm transition-all duration-500 whitespace-nowrap"
              >
                <span className="relative z-20 font-medium transition-colors duration-500 group-hover:text-black">
                  Contact The Team
                </span>
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#FFF4B3] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

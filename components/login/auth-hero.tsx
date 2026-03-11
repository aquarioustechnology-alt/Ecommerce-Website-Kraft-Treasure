import Image from "next/image"
import { Check, Compass, ShieldCheck } from "lucide-react"

const HIGHLIGHTS = [
  {
    icon: Compass,
    title: "Collector access",
    description: "Move from discovery to account access without leaving the same entry point.",
  },
  {
    icon: ShieldCheck,
    title: "Test-mode sign in",
    description: "For now, any non-empty login details will open the My Account experience.",
  },
  {
    icon: Check,
    title: "One-page auth",
    description: "Login and registration stay visible together so the path is obvious on desktop and mobile.",
  },
] as const

export function AuthHero() {
  return (
    <section className="relative overflow-hidden rounded-[34px] bg-[#140606] text-white shadow-[0_30px_100px_-50px_rgba(0,0,0,0.65)]">
      <div className="absolute inset-0">
        <Image
          src="/images/heritage-landscape.jpg"
          alt="Mountain landscape from Arunachal Pradesh"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(12,5,5,0.56)_45%,rgba(12,5,5,0.92)_100%)]" />
      </div>

      <div className="relative flex h-full min-h-[420px] flex-col justify-between p-8 lg:min-h-[760px] lg:p-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#EAC577]">Collector access</p>
          <h2 className="mt-4 max-w-xl font-serif text-5xl leading-[0.92] text-white lg:text-[72px]">
            Enter The Platform With One Clear Account Flow.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/76">
            Sign in to revisit curated pieces, continue your buying journey, and keep your preferences in one place.
          </p>
        </div>

        <div className="grid gap-4">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} className="border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center border border-white/20 bg-[#D33740] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#EAC577]">Platform note</p>
                    <h3 className="mt-2 font-serif text-[30px] leading-none text-white">{item.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/72">{item.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

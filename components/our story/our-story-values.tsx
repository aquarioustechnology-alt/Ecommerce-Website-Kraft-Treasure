import { BadgeCheck, Handshake, Leaf, Sparkles } from "lucide-react"

const values = [
  {
    icon: BadgeCheck,
    title: "Verified provenance",
    description: "We foreground authorship, origin, and narrative documentation so the object stays anchored to its source.",
  },
  {
    icon: Handshake,
    title: "Respectful commerce",
    description: "Fair-value collaboration matters because preservation fails when the maker is under-recognized or underpaid.",
  },
  {
    icon: Leaf,
    title: "Material honesty",
    description: "Natural materials are not just visual choices. They are local knowledge systems shaped by geography and use.",
  },
  {
    icon: Sparkles,
    title: "Modern presentation",
    description: "Luxury for us means rigor, beauty, and curation without turning tradition into costume or trend theatre.",
  },
]

export function OurStoryValues() {
  return (
    <section className="overflow-hidden bg-[#FFF4B3]/28 py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          <div>
            <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#D33740]">What We Stand For</p>
            <h2 className="mt-4 text-4xl font-serif leading-tight text-black sm:text-5xl">
              Four commitments shape every decision on the platform.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-black/65 md:text-base">
              These are not brand adjectives. They are operating rules that help us decide what belongs in the collection and how it should be presented.
            </p>
            <div className="mt-8 border-l-2 border-[#D33740] pl-5">
              <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-black/45">Collector Promise</p>
              <p className="mt-3 text-lg font-serif leading-relaxed text-black">
                Every object should feel culturally grounded before it ever feels luxurious.
              </p>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon

              return (
                <article key={value.title} className="bg-white p-6 lg:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#FFF4B3]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-serif text-black">{value.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-black/65">{value.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

const metrics = [
  {
    value: "26+",
    label: "major tribal lineages referenced",
    detail: "Each with its own material vocabulary, ceremonial codes, and craft memory.",
  },
  {
    value: "180+",
    label: "artisan relationships nurtured",
    detail: "Built through repeat sourcing, documentation, and fair-value collaboration.",
  },
  {
    value: "100%",
    label: "provenance-first curatorial model",
    detail: "We position origin, authorship, and context as essential parts of luxury.",
  },
  {
    value: "1",
    label: "promise behind every object",
    detail: "Nothing is detached from its maker, place, or purpose when it enters our collection.",
  },
]

export function OurStoryLedger() {
  return (
    <section className="bg-black py-14 text-white lg:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div>
          <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#FFF4B3]">Story Ledger</p>
          <h2 className="mt-4 max-w-md text-4xl font-serif leading-tight sm:text-5xl">
            The numbers only matter because they represent people.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">
            Scale is never the headline for us. These markers exist to show the depth of the ecosystem we are responsible for stewarding.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
          {metrics.map((item) => (
            <article key={item.label} className="bg-black p-6 lg:p-8">
              <p className="text-4xl font-serif text-[#FFF4B3] sm:text-5xl">{item.value}</p>
              <p className="mt-3 text-[11px] font-sans uppercase tracking-[0.28em] text-white">{item.label}</p>
              <p className="mt-4 text-sm leading-7 text-white/60">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


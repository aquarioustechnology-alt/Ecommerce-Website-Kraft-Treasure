const steps = [
  {
    number: "01",
    title: "Village discovery",
    description:
      "We identify makers and objects through trusted local relationships, then trace function, ritual use, and regional context before any product decision is made.",
  },
  {
    number: "02",
    title: "Documentation and curation",
    description:
      "Materials, motifs, methods, and authorship are recorded so the object can be presented with integrity rather than generic craft language.",
  },
  {
    number: "03",
    title: "Preservation through presentation",
    description:
      "Photography, writing, and styling are used to elevate the work without erasing the original logic of the piece.",
  },
  {
    number: "04",
    title: "Collector stewardship",
    description:
      "The final buyer receives more than an artifact. They receive its story, provenance, and guidance for long-term care and cultural respect.",
  },
]

export function OurStoryJourney() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div aria-hidden className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/6 lg:block hidden" />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#B08D4E]">The Journey</p>
          <h2 className="mt-4 text-4xl font-serif leading-tight text-black sm:text-5xl">
            How a story moves from the hills to a collector's home.
          </h2>
          <p className="mt-5 text-sm leading-7 text-black/65 md:text-base">
            Our process is deliberately slower than standard commerce. That pace is not inefficiency. It is the structure that keeps meaning intact.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`relative border border-black/10 p-7 lg:p-9 ${index % 2 === 0 ? "bg-[#fcfaf7]" : "bg-black text-white"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-[10px] font-sans uppercase tracking-[0.3em] ${index % 2 === 0 ? "text-[#D33740]" : "text-[#FFF4B3]"}`}>
                    Step {step.number}
                  </p>
                  <h3 className={`mt-3 text-3xl font-serif leading-tight ${index % 2 === 0 ? "text-black" : "text-white"}`}>
                    {step.title}
                  </h3>
                </div>
                <p className={`text-5xl font-serif ${index % 2 === 0 ? "text-black/10" : "text-white/15"}`}>{step.number}</p>
              </div>
              <p className={`mt-5 max-w-xl text-sm leading-7 ${index % 2 === 0 ? "text-black/65" : "text-white/70"}`}>
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

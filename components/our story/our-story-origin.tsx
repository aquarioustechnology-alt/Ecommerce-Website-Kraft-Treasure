import Image from "next/image"

const principles = [
  {
    step: "01",
    title: "Begin With Listening",
    body: "We study how an object is used, who makes it, and which parts of the tradition must remain intact.",
  },
  {
    step: "02",
    title: "Edit With Restraint",
    body: "We refine the presentation without redesigning the culture, symbolism, or logic behind the piece.",
  },
  {
    step: "03",
    title: "Return Value To Source",
    body: "Value flows back through fair compensation, proper attribution, and long-term respect for the maker.",
  },
]

export function OurStoryOrigin() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16">
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#B08D4E]">Why We Began</p>
            <h2 className="mt-4 max-w-xl text-4xl font-serif leading-tight text-black sm:text-5xl">
              Kraft Treasure Started With A Simple Refusal.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-black/70 md:text-base">
              We refused to let heritage objects from Arunachal Pradesh be treated as anonymous souvenirs or stripped-down design references.
              The deeper we traveled, the clearer the gap became: extraordinary craft existed, but its stories were either missing or misrepresented.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[420px] overflow-hidden border border-black/10 bg-white lg:min-h-[460px]">
              <Image
                src="/images/Our Story/Tribal Woman.png"
                alt="Traditional tribal woman portrait"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className="grid gap-4">
              <div className="relative min-h-[240px] overflow-hidden border border-black/10 bg-black">
                <Image
                  src="/images/Our Story/Product Img.png"
                  alt="Curated product detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 22vw"
                />
              </div>
              <div className="border border-black/10 bg-[#FFF4B3]/40 p-6">
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#D33740]">What We Protect</p>
                <p className="mt-4 text-2xl font-serif leading-tight text-black">
                  Material knowledge, regional authorship, and the dignity of slow making.
                </p>
                <p className="mt-4 text-sm leading-5 text-black/65">
                  Our platform exists to make those values visible to buyers who care about more than surface beauty.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {principles.map((item, index) => {
            const cardClasses = [
              "bg-black text-white",
              "bg-white",
              "bg-[#FFF4B3]/45",
            ][index]

            const badgeClasses = [
              "bg-[#FFF4B3] text-black",
              "bg-[#D33740] text-white",
              "bg-black text-[#FFF4B3]",
            ][index]

            const copyClasses = [
              "text-white/72",
              "text-black/65",
              "text-black/68",
            ][index]

            const eyebrowClasses = [
              "text-[#FFF4B3]",
              "text-[#D33740]",
              "text-black/55",
            ][index]

            return (
              <article key={item.title} className={`relative overflow-hidden p-6 lg:p-7 ${cardClasses}`}>
                <div aria-hidden className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black/6 to-transparent" />
                <div className="relative flex items-start gap-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-none text-[11px] font-sans tracking-[0.2em] ${badgeClasses}`}>
                    {item.step}
                  </div>
                  <div>
                    <p className={`text-[10px] font-sans uppercase tracking-[0.3em] ${eyebrowClasses}`}>Curatorial Method</p>
                    <h3 className="mt-3 text-2xl font-serif leading-tight">{item.title}</h3>
                    <p className={`mt-4 text-sm leading-5 ${copyClasses}`}>{item.body}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

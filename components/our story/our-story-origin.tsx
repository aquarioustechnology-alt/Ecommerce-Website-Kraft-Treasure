import Image from "next/image"

const principles = [
  {
    title: "Begin with listening",
    body: "We spend time understanding how a form is used, who makes it, what material intelligence it depends on, and what should never be diluted in translation.",
  },
  {
    title: "Edit with restraint",
    body: "Our role is not to redesign indigenous craft into trend product. It is to frame it well, photograph it honestly, and introduce it to the right audience.",
  },
  {
    title: "Return value to source",
    body: "When a piece enters our collection, compensation must honor labor, skill, rarity, and the continuity of the community that sustains the practice.",
  },
]

export function OurStoryOrigin() {
  return (
    <section className="bg-[#fcfaf7] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 xl:gap-16">
        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#B08D4E]">Why We Began</p>
          <h2 className="mt-4 max-w-xl text-4xl font-serif leading-tight text-black sm:text-5xl">
            Kraft Treasure started with a simple refusal.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-black/70 md:text-base">
            We refused to let heritage objects from Arunachal Pradesh be treated as anonymous souvenirs or stripped-down design references.
            The deeper we traveled, the clearer the gap became: extraordinary craft existed, but its stories were either missing or misrepresented.
          </p>
          <div className="mt-8 space-y-4">
            {principles.map((item, index) => (
              <article key={item.title} className="border border-black/10 bg-white p-6 shadow-[0_24px_60px_-52px_rgba(0,0,0,0.35)]">
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#D33740]">0{index + 1}</p>
                <h3 className="mt-3 text-2xl font-serif text-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/65">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[500px] overflow-hidden border border-black/10 bg-white">
            <Image
              src="/images/homepage/Artisans Image.png"
              alt="Traditional Arunachal artisans at work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-white/75">In The Field</p>
              <p className="mt-2 max-w-sm text-lg font-serif leading-tight">
                Documentation begins where the craft still belongs to everyday life.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative min-h-[240px] overflow-hidden border border-black/10 bg-black">
              <Image
                src="/images/product-basket.jpg"
                alt="Handcrafted basket detail"
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
              <p className="mt-4 text-sm leading-7 text-black/65">
                Our platform exists to make those values visible to buyers who care about more than surface beauty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

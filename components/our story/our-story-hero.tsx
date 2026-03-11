import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const highlights = [
  {
    eyebrow: "Sourced at origin",
    title: "Direct relationships with village artisans",
    description:
      "We work with makers, not middlemen, so each piece carries a human story instead of an anonymous supply chain.",
  },
  {
    eyebrow: "Rooted in place",
    title: "Craft traditions shaped by Arunachal landscapes",
    description:
      "Bamboo, cane, wood, textile, and ritual forms are presented with the context that gives them meaning.",
  },
  {
    eyebrow: "Made to endure",
    title: "Slow luxury built around provenance",
    description:
      "Every acquisition is framed as a collectible cultural object, with authenticity, stewardship, and respect at the center.",
  },
]

export function OurStoryHero() {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[linear-gradient(180deg,#ffffff_0%,#f7f1df_18%,#fffdf7_52%,#f4efe4_100%)] pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div aria-hidden className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-[#FFF4B3]/80 blur-3xl" />
      <div aria-hidden className="absolute right-0 top-12 h-72 w-72 rounded-full bg-[#D33740]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 xl:gap-16">
        <div className="flex items-center">
          <div className="w-full max-w-xl">
            <p className="mb-4 text-[11px] font-sans uppercase tracking-[0.4em] text-[#B08D4E]">
              Our Story
            </p>
            <h1 className="mb-5 text-[40px] font-serif leading-[1.1] tracking-tight text-black sm:text-5xl md:text-[54px] lg:text-[62px] xl:text-[70px]">
              <span className="block">A Living Archive</span>
              <span className="block">Of Mountain Craft.</span>
            </h1>
            <p className="max-w-xl text-[12px] leading-relaxed text-black/80 sm:text-[14px] lg:text-[16px]">
              Kraft Treasure brings the artistry of Arunachal Pradesh into contemporary collecting while preserving the people, place, and cultural memory behind every piece.
            </p>

            <div className="mt-8 flex">
              <Link
                prefetch={false}
                href="/shop"
                className="relative group inline-flex min-w-[220px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500 whitespace-nowrap"
              >
                <span className="relative z-20">Collect The Pieces</span>
                <ArrowRight className="relative z-20 h-3.5 w-3.5 transition-transform group-hover:translate-x-2" />
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[540px]">
          <div className="absolute right-0 top-0 h-[80%] w-[82%] overflow-hidden border border-black/10 bg-white shadow-[0_40px_90px_-45px_rgba(0,0,0,0.35)]">
            <Image
              src="/images/Our Story/Hero 2nd image.png"
              alt="Curated heritage craft portrait"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          </div>

          <div className="absolute left-0 top-[18%] w-[44%] overflow-hidden shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/Our Story/Heo 1st image.png"
                alt="Arunachal heritage detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-[1440px] gap-4 px-6 lg:grid-cols-3 lg:px-12">
        {highlights.map((item, index) => (
          <article
            key={item.title}
            className={`p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 ${
              index === 1 ? "bg-[#fff9ea]" : "bg-white/82"
            }`}
          >
            <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B08D4E]">{item.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-serif leading-tight text-black">{item.title}</h2>
            <p className="mt-4 text-sm leading-6 text-black/65">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

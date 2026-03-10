import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ProductPageArtisans() {
  return (
    <section className="px-6 lg:px-12 py-20 max-w-[1440px] mx-auto w-full">
      <div className="grid overflow-hidden border border-[#E9DEC9] bg-[#FBF6EE] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch">
        <div className="flex flex-col justify-center px-6 py-8 lg:px-10 lg:py-10 xl:px-12 xl:py-12">
          <p className="mb-4 text-[10px] tracking-[0.38em] uppercase text-[#D33740] font-sans">
            Arunachal Pradesh Artisans
          </p>
          <h2 className="mb-4 text-3xl lg:text-4xl font-serif text-foreground leading-tight">
            Living craft traditions carried forward by tribal communities
          </h2>
          <p className="mb-6 max-w-xl text-sm lg:text-[15px] text-muted-foreground font-sans leading-relaxed">
            Kraft Treasure curates from community makers and artisan families across Arunachal Pradesh so each release stays rooted in regional material culture, ritual references, and hand-finished character.
          </p>

          <div className="mb-8 space-y-3">
            {[
              "Direct sourcing from artisan-led clusters and family workshops.",
              "Small-batch pieces selected for provenance, finish, and authenticity.",
              "Collections shaped by heritage context instead of mass-market repetition.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground font-sans leading-relaxed">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D33740]" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div>
            <Link
              href="/our-story"
              className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-[#D33740] text-white px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md whitespace-nowrap min-w-[180px]"
            >
              <span className="relative z-20">Read Our Story</span>
              <ArrowRight className="relative z-20 w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
              <div className="absolute inset-0 bg-[#C5AB7D] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[320px] lg:min-h-full">
          <Image
            src="/images/homepage/Artisans Image.png"
            alt="Tribal artisan communities from Arunachal Pradesh"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        </div>
      </div>
    </section>
  )
}
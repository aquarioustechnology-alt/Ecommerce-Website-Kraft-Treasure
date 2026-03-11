import Image from "next/image"

const craftFamilies = [
  {
    title: "Sacred Wall Banner",
    image: "/images/Our Story/Card 1.png",
    description: "A devotional hanging that carries ceremonial symbolism, color memory, and handcrafted detail.",
  },
  {
    title: "Lidded Tea Vessel",
    image: "/images/Our Story/Card 2.png",
    description: "A refined tabletop object shaped by ornament, utility, and the quiet pleasure of everyday ritual.",
  },
  {
    title: "Turquoise Deity Relief",
    image: "/images/Our Story/Card 3.png",
    description: "A sculptural wall piece where spiritual iconography meets material richness and presence.",
  },
]

export function OurStoryCollective() {
  return (
    <section className="bg-[linear-gradient(180deg,#f8f4ec_0%,#ffffff_100%)] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 xl:gap-12">
        <article className="overflow-hidden border border-black/10 bg-black text-white shadow-[0_40px_90px_-55px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/artisan-portrait.jpg"
              alt="Portrait of an Arunachal artisan"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 32vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          </div>
          <div className="p-7 lg:p-8">
            <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#FFF4B3]">The Collective</p>
            <blockquote className="mt-4 text-3xl font-serif leading-tight text-white">
              "When craft is named properly, the maker is no longer invisible."
            </blockquote>
            <p className="mt-5 text-sm leading-7 text-white/65">
              That belief drives how we photograph, describe, and place every piece in the collection. Visibility is part of preservation.
            </p>
          </div>
        </article>

        <div>
          <div className="max-w-2xl">
            <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#B08D4E]">Craft Families</p>
            <h2 className="mt-4 text-4xl font-serif leading-tight text-black sm:text-5xl">
              Different Materials, One Shared Principle: Make With Memory.
            </h2>
            <p className="mt-5 text-sm leading-7 text-black/65 md:text-base">
              We curate across categories without flattening them into a single aesthetic. Each family of objects arrives with its own history and logic.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {craftFamilies.map((item) => (
              <article key={item.title} className="overflow-hidden border border-black/10 bg-white transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 22vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-serif text-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-5 text-black/65">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

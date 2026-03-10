export function ContactHero() {
  return (
    <section className="px-6 lg:px-12 pt-[84px] pb-10 max-w-[1440px] mx-auto w-full">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
        <div>
          <p className="mb-4 text-[10px] tracking-[0.4em] uppercase text-[#C5AB7D] font-sans">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.06]">
            Contact Us
          </h1>
        </div>

        <p className="max-w-xl text-sm lg:text-[15px] text-muted-foreground font-sans leading-relaxed">
          For product questions, order assistance, or curated buying enquiries, reach out directly and the Kraft Treasure team will get back to you.
        </p>
      </div>
    </section>
  )
}
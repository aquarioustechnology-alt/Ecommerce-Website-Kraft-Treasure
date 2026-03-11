interface WishlistHeroProps {
  count: number
}

export function WishlistHero({ count }: WishlistHeroProps) {
  return (
    <section className="border-b border-black/8 bg-[linear-gradient(180deg,#ffffff_0%,#f8f2e7_100%)] px-6 py-12 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#B8894A]">Saved pieces</p>
        <h1 className="mt-4 font-serif text-[40px] leading-none text-black lg:text-[56px]">Wishlist</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-black/62 lg:text-[15px]">
          Keep track of the pieces you want to revisit, compare, and move into your bag later.
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-black/42">
          {count} {count === 1 ? "piece saved" : "pieces saved"}
        </p>
      </div>
    </section>
  )
}

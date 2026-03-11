import Link from "next/link"

export function WishlistEmpty() {
  return (
    <section className="border border-black/8 bg-[#FCFAF7] px-8 py-14 text-center">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#B8894A]">Wishlist</p>
      <h2 className="mt-4 font-serif text-[34px] leading-none text-black lg:text-[42px]">No Saved Pieces Yet</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/62">
        Save products from the shop to keep them here for a closer look before checkout.
      </p>
      <Link
        prefetch={false}
        href="/shop"
        className="group relative mt-6 inline-flex items-center justify-center overflow-hidden bg-[#D33740] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white"
      >
        <span className="relative z-10">Explore The Shop</span>
        <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
      </Link>
    </section>
  )
}

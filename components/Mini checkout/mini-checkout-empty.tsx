import Link from "next/link"

export function MiniCheckoutEmpty({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center">
      <p className="text-[11px] uppercase tracking-[0.26em] text-[#B8894A]">Your cart</p>
      <h3 className="mt-4 font-serif text-[34px] leading-none text-black">Bag Is Empty</h3>
      <p className="mt-4 max-w-sm text-sm leading-6 text-black/60">
        Add pieces to your bag to review them here before moving to checkout.
      </p>
      <Link
        prefetch={false}
        href="/shop"
        onClick={onClose}
        className="group relative mt-6 inline-flex items-center justify-center overflow-hidden bg-[#140606] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white"
      >
        <span className="relative z-10">Explore The Shop</span>
        <span className="absolute inset-0 -translate-x-[101%] bg-[#D33740] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
      </Link>
    </div>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Send } from "lucide-react"

const LOGO_SRC = "/images/logo/Logo content.png"

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
] as const

const SERVICE_LINKS = [
  "Shipping & Delivery",
  "Returns & Exchanges",
  "Care Instructions",
  "Privacy Policy",
  "Terms of Use",
] as const

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-black px-6 pt-20 pb-[50px] text-white lg:px-20">
      <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
        <div className="lg:col-span-1">
          <div className="origin-left scale-110 mb-8">
            <Image
              src={LOGO_SRC}
              alt="Kraft Treasure Logo"
              width={260}
              height={96}
              className="h-16 w-auto object-contain lg:h-20"
            />
          </div>
          <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/60 transition-opacity hover:opacity-100">
            Authentic heritage craftsmanship from the tribal artisans of Arunachal Pradesh, curated for global connoisseurs of fine traditional art.
          </p>
          <div className="flex items-center gap-4">
            <Link prefetch={false} href="#" className="rounded-none border border-white/10 bg-white/5 p-3 transition-all duration-500 hover:border-[#FFF4B3] hover:bg-[#FFF4B3] hover:text-black">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link prefetch={false} href="#" className="rounded-none border border-white/10 bg-white/5 p-3 transition-all duration-500 hover:border-[#FFF4B3] hover:bg-[#FFF4B3] hover:text-black">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-8 text-[12px] font-medium uppercase tracking-[0.4em] text-white">Quick Links</p>
          <ul className="space-y-4">
            {QUICK_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  prefetch={false}
                  href={item.href}
                  className="inline-block text-sm text-white/50 transition-all duration-300 hover:translate-x-1 hover:text-[#FFF4B3]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-8 text-[12px] font-medium uppercase tracking-[0.4em] text-white">Client Services</p>
          <ul className="space-y-4">
            {SERVICE_LINKS.map((item) => (
              <li key={item}>
                <Link
                  prefetch={false}
                  href="#"
                  className="inline-block text-sm text-white/50 transition-all duration-300 hover:translate-x-1 hover:text-[#FFF4B3]"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-8 text-[12px] font-medium uppercase tracking-[0.4em] text-white">Newsletter</p>
          <p className="mb-6 text-sm text-white/50">
            Subscribe to receive updates on new curated collections and artisan stories.
          </p>
          <form className="relative">
            <input
              type="email"
              placeholder="Your Email Address"
              suppressHydrationWarning
              className="w-full border-b border-white/10 bg-white/5 px-0 py-3 text-sm focus:border-[#E31E25] focus:outline-none transition-colors"
            />
            <button
              type="button"
              suppressHydrationWarning
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white transition-colors hover:text-[#E31E25]"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-10 text-[10px] leading-relaxed text-white/30 italic">
            *Product imagery across our platform has been refined with advanced AI to ensure every intricate tribal detail is captured with museum-level clarity.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 border-t border-white/20 pt-6 sm:flex-row">
        <p className="text-[12px] text-white/80">{"\u00A9"} {currentYear} Kraft Treasure. All rights reserved.</p>
        <div className="flex items-center">
          <Link
            prefetch={false}
            href="https://www.theaquarious.com/"
            target="_blank"
            className="text-[12px] text-white/80 transition-colors hover:text-[#FFF4B3]"
          >
            Designed By Aquarious Technology
          </Link>
        </div>
      </div>
    </footer>
  )
}

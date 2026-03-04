"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Send } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white border-t border-white/10 px-6 lg:px-20 pt-16 lg:pt-24 pb-8 lg:pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
        {/* Brand & Socials */}
        <div className="lg:col-span-1">
          <div className="mb-8">
            <Image
              src="/images/logo/logo-transparent.png"
              alt="Kraft Treasures Logo"
              width={180}
              height={70}
              className="object-contain h-14 lg:h-16 w-auto invert brightness-0"
            />
          </div>
          <p className="text-sm text-white/60 font-sans leading-relaxed mb-8 max-w-xs">
            Authentic heritage craftsmanship from the tribal artisans of Arunachal
            Pradesh, curated for global connoisseurs of fine traditional art.
          </p>
          <div className="flex gap-5 items-center">
            <Link href="#" className="p-3 rounded-full border border-white/10 hover:bg-[#E31E25] hover:border-[#E31E25] transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-3 rounded-full border border-white/10 hover:bg-[#E31E25] hover:border-[#E31E25] transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white font-sans mb-8">
            Quick Links
          </p>
          <ul className="space-y-4">
            {["Home", "Shop", "Our Story", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm text-white/50 font-sans hover:text-[#E31E25] hover:translate-x-1 inline-block transition-all"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Client Services */}
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white font-sans mb-8">
            Client Services
          </p>
          <ul className="space-y-4">
            {[
              "Shipping & Delivery",
              "Returns & Exchanges",
              "Care Instructions",
              "Privacy Policy",
              "Terms of Use"
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-sm text-white/50 font-sans hover:text-[#E31E25] hover:translate-x-1 inline-block transition-all"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white font-sans mb-8">
            Newsletter
          </p>
          <p className="text-sm text-white/50 font-sans mb-6">
            Subscribe to receive updates on new curated collections and artisan stories.
          </p>
          <form className="relative">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full bg-white/5 border-b border-white/10 px-0 py-3 text-sm font-sans focus:outline-none focus:border-[#E31E25] transition-colors"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-[#E31E25] transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] italic text-white/30 font-sans mt-10 leading-relaxed">
            *Product imagery across our platform has been refined with advanced AI
            to ensure every intricate tribal detail is captured with museum-level clarity.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
        <p className="text-[10px] text-white/30 tracking-widest font-sans uppercase">
          {"\u00A9"} {currentYear} Kraft Treasures. All rights reserved.
        </p>
        <div className="flex gap-8 text-[10px] text-white/30 tracking-widest font-sans uppercase">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  )
}

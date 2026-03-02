"use client"

import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white border-t border-white/10 px-6 lg:px-20 py-16 lg:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <Image
              src="/images/logo/logo-transparent.png"
              alt="Kraft Treasure Logo"
              width={140}
              height={55}
              className="object-contain h-10 lg:h-12 w-auto invert brightness-0"
            />
          </div>
          <p className="text-xs text-white/70 font-sans leading-relaxed">
            Heritage craftsmanship from the tribal artisans of Arunachal
            Pradesh, curated for global collectors and connoisseurs.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-sans mb-6">
            Navigate
          </p>
          <ul className="space-y-3">
            {["Collections", "Heritage Story", "Our Artisans", "Bespoke Orders"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/70 font-sans hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Client Services */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-sans mb-6">
            Client Services
          </p>
          <ul className="space-y-3">
            {[
              "Shipping & Delivery",
              "Returns & Authentication",
              "Care Instructions",
              "Corporate Gifting",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-sm text-white/70 font-sans hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-sans mb-6">
            Concierge
          </p>
          <div className="space-y-3 text-sm text-white/70 font-sans">
            <p>concierge@arunachalluxe.com</p>
            <p>+91 360 221 4500</p>
            <p className="leading-relaxed">
              Itanagar, Arunachal Pradesh
              <br />
              India 791111
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
        <p className="text-[10px] text-white/50 tracking-wider font-sans">
          {"\u00A9"} 2026 Arunachal Luxe Artifacts. All rights reserved.
        </p>
        <div className="flex gap-6 text-[10px] text-white/50 tracking-wider font-sans">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Authenticity
          </Link>
        </div>
      </div>
    </footer>
  )
}

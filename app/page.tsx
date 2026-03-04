import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AuthenticitySection } from "@/components/Homepage/authenticity-section"
import { CollectionsSection } from "@/components/collections-section"
import { FeaturedProducts } from "@/components/featured-products"
import { TrendingProducts } from "@/components/trending-products"
import { HeritageSection } from "@/components/heritage-section"
import { BespokeSection } from "@/components/bespoke-section"
import { CuratedCategories } from "@/components/curated-categories"
import { Testimonials } from "@/components/testimonials"
import { HeritageDecors } from "@/components/heritage-decors"
import { InstagramFeed } from "@/components/instagram-feed"
import { TrustedSection } from "@/components/trusted-section"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AuthenticitySection />

      <CollectionsSection />
      <TrendingProducts />

      <HeritageSection />

      {/* Horizontal Marquee Ticker - Above New Arrivals */}
      <div className="relative z-20 mb-12 mt-10 overflow-hidden py-6 border-y border-[#FFF4B3]/50 bg-[#FFF4B3]">
        <div className="relative z-30 flex whitespace-nowrap py-1">
          <div className="animate-marquee flex">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="text-black text-xs md:text-sm tracking-[0.2em] uppercase font-sans mx-12 flex items-center gap-6"
              >
                <span>Discover the Soul of Arunachal Pradesh</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31E25]" />
                <span>Ethically Sourced & Handcrafted</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31E25]" />
                <span>Ancient Traditions, Modern Luxury</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31E25]" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <FeaturedProducts />
      <CuratedCategories />

      <Testimonials />
      <BespokeSection />
      <HeritageDecors />

      <TrustedSection />
      <InstagramFeed />

      {/* Marquee ticker */}
      <div className="py-6 border-y border-border overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="text-sm md:text-base tracking-[0.3em] uppercase text-black/80 font-sans mx-8"
            >
              Heritage Craftsmanship {"  \u2022  "} Museum Quality {"  \u2022  "} Fair Trade Certified {"  \u2022  "} Global Shipping {"  \u2022  "} Certificate of Authenticity {"  \u2022  "} Bespoke Commissions {"  \u2022  "}
            </span>
          ))}
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}


import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/Homepage/hero-section"
import { AuthenticitySection } from "@/components/Homepage/authenticity-section"
import { CollectionsSection } from "@/components/Homepage/collections-section"
import { FeaturedProducts } from "@/components/Homepage/featured-products"
import { TrendingProducts } from "@/components/Homepage/trending-products"
import { HeritageSection } from "@/components/Homepage/heritage-section"
import { BespokeSection } from "@/components/Homepage/bespoke-section"
import { CuratedCategories } from "@/components/Homepage/curated-categories"
import { Testimonials } from "@/components/Homepage/testimonials"
import { HeritageDecors } from "@/components/Homepage/heritage-decors"
import { InstagramFeed } from "@/components/Homepage/instagram-feed"
import { TrustedSection } from "@/components/Homepage/trusted-section"
import { BrandBenefits } from "@/components/Homepage/brand-benefits"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AuthenticitySection />

      <CollectionsSection />
      <TrendingProducts />

      <HeritageSection />

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

      <BrandBenefits />
      <SiteFooter />
    </main>
  )
}
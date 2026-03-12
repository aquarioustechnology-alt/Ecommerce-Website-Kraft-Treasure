import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const tribalSunGuardianShieldProduct: Product = {
  id: "sp008",
  name: "Tribal Sun Guardian Shield",
  slug: "tribal-sun-guardian-shield",
  price: 8500,
  currency: "INR",
  image: "/images/homepage/New Arrivals/Product 2.png",
  images: ["/images/homepage/New Arrivals/Product 2.png", "/images/homepage/New Arrivals/Product 2 Hover.png"],
  category: "Show Pieces",
  collection: "Sacred Display",
  description: "A bold shield-inspired sculpture with a sunburst center, designed to anchor statement walls and curated heritage displays.",
  details: [
    "Statement wall decor format",
    "Raised central medallion",
    "Hand-finished surface variation",
    "Ready for hanging or easel display",
  ],
  dimensions: "36cm diameter x 6cm depth",
  material: "Wood and mixed media finish",
  origin: "Lower Subansiri District",
  artisan: artisans[2],
  inStock: true,
  isLimited: false,

}

export const tribalSunGuardianShieldShowcase: HomepageShowcaseItem = {
  product: tribalSunGuardianShieldProduct,
  cardImage: "/images/homepage/New Arrivals/Product 2.png",
  cardHoverImage: "/images/homepage/New Arrivals/Product 2 Hover.png",
}
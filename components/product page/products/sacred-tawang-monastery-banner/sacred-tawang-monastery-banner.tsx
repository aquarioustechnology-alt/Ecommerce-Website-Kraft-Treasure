import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const sacredTawangMonasteryBannerProduct: Product = {
  id: "sp012",
  name: "Sacred Tawang Monastery Banner",
  slug: "sacred-tawang-monastery-banner",
  price: 3600,
  currency: "INR",
  image: "/images/homepage/New Arrivals/Product 6.png",
  images: ["/images/homepage/New Arrivals/Product 6.png", "/images/homepage/New Arrivals/Product 6 Hover.png"],
  category: "Others",
  collection: "Living Rituals",
  description: "A decorative textile banner with sacred color blocking and monastery-inspired motifs, ideal for layering into niche walls and reading rooms.",
  details: [
    "Soft hanging textile format",
    "Monastery-inspired color palette",
    "Lightweight wall display piece",
    "Ships folded in protective wrap",
  ],
  dimensions: "92cm x 38cm",
  material: "Woven textile with tassel trim",
  origin: "Tawang District",
  artisan: artisans[2],
  inStock: true,
  isLimited: false,

}

export const sacredTawangMonasteryBannerShowcase: HomepageShowcaseItem = {
  product: sacredTawangMonasteryBannerProduct,
  cardImage: "/images/homepage/New Arrivals/Product 6.png",
  cardHoverImage: "/images/homepage/New Arrivals/Product 6 Hover.png",
}
import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const ritualGildedButterLampCupProduct: Product = {
  id: "sp002",
  name: "Ritual Gilded Butter Lamp Cup",
  slug: "ritual-gilded-butter-lamp-cup",
  price: 4200,
  currency: "INR",
  image: "/images/homepage/New Arrivals/Product 5.png",
  images: ["/images/homepage/New Arrivals/Product 5.png", "/images/homepage/New Arrivals/Product 5 Hover.png"],
  category: "Cups and plates",
  collection: "Table Rituals",
  description: "A luminous butter lamp cup with a warm gilt finish, created as a collectible object for intimate altars and layered tablescapes.",
  details: [
    "Reflective metallic finish",
    "Designed for shelf styling and ritual corners",
    "Balanced footed silhouette",
    "Comes with care instructions",
  ],
  dimensions: "11cm diameter x 8cm height",
  material: "Metal alloy with gilded finish",
  origin: "West Kameng District",
  artisan: artisans[1],
  inStock: true,
  isLimited: true,
  edition: "Collector Series - 5 of 20",
}

export const ritualGildedButterLampCupShowcase: HomepageShowcaseItem = {
  product: ritualGildedButterLampCupProduct,
  cardImage: "/images/homepage/New Arrivals/Product 5.png",
  cardHoverImage: "/images/homepage/New Arrivals/Product 5 Hover.png",
}
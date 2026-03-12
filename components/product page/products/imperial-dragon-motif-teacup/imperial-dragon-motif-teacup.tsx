import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const imperialDragonMotifTeacupProduct: Product = {
  id: "sp001",
  name: "Imperial Dragon Motif Teacup",
  slug: "imperial-dragon-motif-teacup",
  price: 1800,
  currency: "INR",
  image: "/images/Shop/Product 1.png",
  images: ["/images/Shop/Product 1.png", "/images/Shop/Product 1 Hover.png"],
  category: "Cups and plates",
  collection: "Table Rituals",
  description: "A hand-finished porcelain teacup inspired by monastery tableware, detailed with a dragon motif that echoes protective Himalayan symbolism.",
  details: [
    "Hand-finished decorative surface",
    "Inspired by monastery table settings",
    "Crafted for display or ceremonial tea service",
    "Packaged in a protective gift box",
  ],
  dimensions: "9cm diameter x 7cm height",
  material: "Porcelain with painted finish",
  origin: "Tawang District",
  artisan: artisans[0],
  inStock: true,
  isLimited: false,

}

export const imperialDragonMotifTeacupShowcase: HomepageShowcaseItem = {
  product: imperialDragonMotifTeacupProduct,
  cardImage: "/images/homepage/New Arrivals/Product 7.png",
  cardHoverImage: "/images/homepage/New Arrivals/Product 7 hover.png",
}
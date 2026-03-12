import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const ancientGreenDeityMaskProduct: Product = {
  id: "sp005",
  name: "Ancient Green Deity Mask",
  slug: "ancient-green-deity-mask",
  price: 4500,
  currency: "INR",
  image: "/images/Shop/Product 5.png",
  images: ["/images/Shop/Product 5.png", "/images/Shop/Product 5 Hover.png"],
  category: "Masks",
  collection: "Spirit and Form",
  description: "A compact ceremonial mask finished in deep green tones, ideal for gallery walls and layered heritage interiors.",
  details: [
    "Compact wall format",
    "Painterly green and gold detailing",
    "Display hook attached on reverse",
    "Pairs well with grouped wall installations",
  ],
  dimensions: "28cm x 18cm x 10cm",
  material: "Wood composite with painted finish",
  origin: "East Siang District",
  artisan: artisans[2],
  inStock: true,
  isLimited: false,

}

export const ancientGreenDeityMaskShowcase: HomepageShowcaseItem = {
  product: ancientGreenDeityMaskProduct,
  cardImage: "/images/homepage/Trending Products/Trending Product 1.png",
  cardHoverImage: "/images/homepage/Trending Products/Trending Product 1 Hover.png",
}
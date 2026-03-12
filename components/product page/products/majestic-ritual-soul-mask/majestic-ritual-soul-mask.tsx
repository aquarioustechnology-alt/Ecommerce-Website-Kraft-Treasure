import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const majesticRitualSoulMaskProduct: Product = {
  id: "sp004",
  name: "Majestic Ritual Soul Mask",
  slug: "majestic-ritual-soul-mask",
  price: 12400,
  currency: "INR",
  image: "/images/Shop/Product 4.png",
  images: ["/images/Shop/Product 4.png", "/images/Shop/Product 4 Hover.png"],
  category: "Masks",
  collection: "Spirit and Form",
  description: "A dramatic wall-ready mask with layered features and saturated pigments, created as a statement piece rooted in ceremonial visual language.",
  details: [
    "Wall display ready",
    "Hand-painted surface accents",
    "Expressive carved features",
    "Protective storage wrapping included",
  ],
  dimensions: "34cm x 22cm x 12cm",
  material: "Carved wood with painted finish",
  origin: "West Siang District",
  artisan: artisans[2],
  inStock: true,
  isLimited: true,
  edition: "Studio Piece - 2 of 8",
}

export const majesticRitualSoulMaskShowcase: HomepageShowcaseItem = {
  product: majesticRitualSoulMaskProduct,
  cardImage: "/images/homepage/New Arrivals/Product 3.png",
  cardHoverImage: "/images/homepage/New Arrivals/Product 3 Hover.png",
}
import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const sacredCeremonialWallMaskProduct: Product = {
  id: "sp014",
  name: "Sacred Ceremonial Wall Mask",
  slug: "sacred-ceremonial-wall-mask",
  price: 3100,
  currency: "INR",
  image: "/images/homepage/Trending Products/Trending Product 5.png",
  images: ["/images/homepage/Trending Products/Trending Product 5.png", "/images/homepage/Trending Products/Trending Product 5 Hover.png"],
  category: "Masks",
  collection: "Spirit and Form",
  description: "A wall-ready ceremonial mask with a bold silhouette, created to bring ritual character and sculptural depth into intimate interior settings.",
  details: [
    "Wall display ready",
    "Hand-painted ceremonial accents",
    "Compact sculptural presence",
    "Protective wrapping included",
  ],
  dimensions: "27cm x 17cm x 9cm",
  material: "Carved wood with painted finish",
  origin: "West Siang District",
  artisan: artisans[2],
  inStock: true,
  isLimited: true,
  edition: "Studio Piece - 1 of 10",
}

export const sacredCeremonialWallMaskShowcase: HomepageShowcaseItem = {
  product: sacredCeremonialWallMaskProduct,
  cardImage: "/images/homepage/Trending Products/Trending Product 5.png",
  cardHoverImage: "/images/homepage/Trending Products/Trending Product 5 Hover.png",
}
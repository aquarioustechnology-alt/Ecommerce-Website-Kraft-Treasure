import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const ornateFloralRitualBowlProduct: Product = {
  id: "sp003",
  name: "Ornate Floral Ritual Bowl",
  slug: "ornate-floral-ritual-bowl",
  price: 5400,
  currency: "INR",
  image: "/images/Shop/Product 3.png",
  images: ["/images/Shop/Product 3.png", "/images/Shop/Product 3 Hover.png"],
  category: "Cups and plates",
  collection: "Table Rituals",
  description: "A richly ornamented bowl designed for festive tables and ritual display, combining floral detailing with a polished ceremonial presence.",
  details: [
    "Decorative floral patterning",
    "Rounded profile for serving or display",
    "Hand-polished finish",
    "Suitable for dry decorative use",
  ],
  dimensions: "18cm diameter x 7cm height",
  material: "Decorative metal alloy",
  origin: "Tawang District",
  artisan: artisans[1],
  inStock: true,
  isLimited: false,

}

export const ornateFloralRitualBowlShowcase: HomepageShowcaseItem = {
  product: ornateFloralRitualBowlProduct,
  cardImage: "/images/homepage/Trending Products/Trending Product 4.png",
  cardHoverImage: "/images/homepage/Trending Products/Trending Product 4 Hover.png",
}
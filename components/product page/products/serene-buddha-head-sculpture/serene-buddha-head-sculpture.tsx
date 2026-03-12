import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const sereneBuddhaHeadSculptureProduct: Product = {
  id: "sp006",
  name: "Serene Buddha Head Sculpture",
  slug: "serene-buddha-head-sculpture",
  price: 9400,
  currency: "INR",
  image: "/images/Shop/Product 6.png",
  images: ["/images/Shop/Product 6.png", "/images/Shop/Product 6 Hover.png"],
  category: "Show Pieces",
  collection: "Sacred Display",
  description: "A contemplative sculpture with quiet surface texture and balanced proportions, suited for consoles, shelves, and meditative corners.",
  details: [
    "Display sculpture with stable base",
    "Weathered hand-finished texture",
    "Made for indoor styling",
    "Packed in foam-lined protective casing",
  ],
  dimensions: "31cm height x 20cm width",
  material: "Resin stone composite",
  origin: "Tawang District",
  artisan: artisans[0],
  inStock: true,
  isLimited: true,
  edition: "Signature Edition - 4 of 15",
}

export const sereneBuddhaHeadSculptureShowcase: HomepageShowcaseItem = {
  product: sereneBuddhaHeadSculptureProduct,
  cardImage: "/images/homepage/New Arrivals/Product 1.png",
  cardHoverImage: "/images/homepage/New Arrivals/Product 1 Hover.png",
}
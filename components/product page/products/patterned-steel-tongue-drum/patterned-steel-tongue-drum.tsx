import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const patternedSteelTongueDrumProduct: Product = {
  id: "sp013",
  name: "Patterned Steel Tongue Drum",
  slug: "patterned-steel-tongue-drum",
  price: 2800,
  currency: "INR",
  image: "/images/homepage/Trending Products/Trending Product 2.png",
  images: ["/images/homepage/Trending Products/Trending Product 2.png", "/images/homepage/Trending Products/Trending Product 2 Hover.png"],
  category: "Show Pieces",
  collection: "Sacred Display",
  description: "A compact steel tongue drum with patterned engraving, curated as a decorative sound object for consoles, shelves, and meditative corners.",
  details: [
    "Pattern-etched top surface",
    "Compact tabletop scale",
    "Decorative and playable format",
    "Soft carry pouch included",
  ],
  dimensions: "19cm diameter x 9cm height",
  material: "Tuned steel",
  origin: "Papum Pare District",
  artisan: artisans[1],
  inStock: true,
  isLimited: false,

}

export const patternedSteelTongueDrumShowcase: HomepageShowcaseItem = {
  product: patternedSteelTongueDrumProduct,
  cardImage: "/images/homepage/Trending Products/Trending Product 2.png",
  cardHoverImage: "/images/homepage/Trending Products/Trending Product 2 Hover.png",
}
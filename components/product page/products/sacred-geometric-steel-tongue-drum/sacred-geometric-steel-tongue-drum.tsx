import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const sacredGeometricSteelTongueDrumProduct: Product = {
  id: "sp007",
  name: "Sacred Geometric Steel Tongue Drum",
  slug: "sacred-geometric-steel-tongue-drum",
  price: 6800,
  currency: "INR",
  image: "/images/Shop/Product 7.png",
  images: ["/images/Shop/Product 7.png", "/images/Shop/Product 7 hover.png"],
  category: "Show Pieces",
  collection: "Sacred Display",
  description: "A sculptural steel tongue drum with geometric surface engraving, curated as both a visual object and a reflective sound instrument.",
  details: [
    "Geometric engraved top surface",
    "Can be used as a decorative instrument",
    "Compact display footprint",
    "Soft storage pouch included",
  ],
  dimensions: "25cm diameter x 13cm height",
  material: "Tuned steel",
  origin: "Papum Pare District",
  artisan: artisans[1],
  inStock: true,
  isLimited: false,

}

export const sacredGeometricSteelTongueDrumShowcase: HomepageShowcaseItem = {
  product: sacredGeometricSteelTongueDrumProduct,
  cardImage: "/images/homepage/New Arrivals/Product 4.png",
  cardHoverImage: "/images/homepage/New Arrivals/Product 4 Hover.png",
}
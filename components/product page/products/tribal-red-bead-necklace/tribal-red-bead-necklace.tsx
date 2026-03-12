import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import type { HomepageShowcaseItem } from "../types"

export const tribalRedBeadNecklaceProduct: Product = {
  id: "sp010",
  name: "Tribal Red Bead Necklace",
  slug: "tribal-red-bead-necklace",
  price: 9200,
  currency: "INR",
  image: "/images/Shop/Product 10.png",
  images: ["/images/Shop/Product 10.png", "/images/Shop/Product 10 Hover.png"],
  category: "Necklaces",
  collection: "Adornment Heritage",
  description: "A vibrant red bead necklace composed for ceremonial presence, balancing bold color with a heritage-inspired layered silhouette.",
  details: [
    "Layered statement necklace",
    "Rich red bead composition",
    "Lightweight for display or styling",
    "Presented in a fabric pouch",
  ],
  dimensions: "Adjustable 46cm to 54cm drop",
  material: "Glass beads and mixed metal findings",
  origin: "East Kameng District",
  artisan: artisans[0],
  inStock: true,
  isLimited: false,

}

export const tribalRedBeadNecklaceShowcase: HomepageShowcaseItem = {
  product: tribalRedBeadNecklaceProduct,
  cardImage: "/images/homepage/Trending Products/Trending Product 3.png",
  cardHoverImage: "/images/homepage/Trending Products/Trending Product 3 Hover.png",
}
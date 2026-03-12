import type { Product } from "@/lib/data"
import { artisans } from "@/lib/data"
import { homepageCatalogProducts } from "@/components/product page/products"

export const shopCategories = [
  "Cups and plates",
  "Show Pieces",
  "Masks",
  "Carpets",
  "Necklaces",
  "Others",
] as const

const categoryAliasMap: Record<string, (typeof shopCategories)[number]> = {
  "cups-and-plates": "Cups and plates",
  cupsandplates: "Cups and plates",
  cups: "Cups and plates",
  plates: "Cups and plates",
  "show-pieces": "Show Pieces",
  showpieces: "Show Pieces",
  showpiece: "Show Pieces",
  masks: "Masks",
  mask: "Masks",
  carpets: "Carpets",
  carpet: "Carpets",
  necklaces: "Necklaces",
  necklace: "Necklaces",
  bracelets: "Necklaces",
  bracelet: "Necklaces",
  others: "Others",
  other: "Others",
  ritual: "Cups and plates",
}

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

export function normalizeShopCategory(value?: string | null) {
  if (!value) return null

  const normalized = slugify(value)
  if (normalized === "all" || normalized === "all-categories") return null
  if (normalized in categoryAliasMap) {
    return categoryAliasMap[normalized]
  }

  return shopCategories.find((category) => slugify(category) === normalized) ?? null
}

const extraShopProducts: Product[] = [
  {
    id: "sp009",
    name: "Monpa Meditation Carpet",
    slug: "monpa-meditation-carpet-shop",
    price: 12800,
    currency: "INR",
    image: "/images/Shop/Product 9.png",
    images: ["/images/Shop/Product 9.png", "/images/Shop/Product 9 Hover.png"],
    category: "Carpets",
    collection: "Woven Ground",
    description: "A richly patterned carpet with a grounded, monastic palette, designed to bring warmth and craft depth to small seating areas and studies.",
    details: [
      "Textured woven surface",
      "Decorative floor or wall use",
      "Patterned border framing",
      "Rolled shipping for flat settling",
    ],
    dimensions: "150cm x 90cm",
    material: "Wool blend textile",
    origin: "Tawang District",
    artisan: artisans[0],
    inStock: true,
    isLimited: true,
    edition: "Loom Batch - 3 of 10",
  },
  {
    id: "sp011",
    name: "Imperial Coral Prayer Necklace",
    slug: "imperial-coral-prayer-necklace",
    price: 10800,
    currency: "INR",
    image: "/images/Shop/Product 11.png",
    images: ["/images/Shop/Product 11.png", "/images/Shop/Product 11 Hover.png"],
    category: "Necklaces",
    collection: "Adornment Heritage",
    description: "A ceremonial necklace with coral-toned beads and metallic accents, curated as a luxurious heirloom-inspired accessory.",
    details: [
      "Coral-toned statement beads",
      "Textured accent spacers",
      "Designed for occasion styling",
      "Storage pouch included",
    ],
    dimensions: "Adjustable 44cm to 52cm drop",
    material: "Resin beads and metal spacers",
    origin: "West Siang District",
    artisan: artisans[1],
    inStock: false,
    isLimited: true,
    edition: "Private Release - 1 of 6",
  },
]

export const shopProducts: Product[] = [...homepageCatalogProducts, ...extraShopProducts]
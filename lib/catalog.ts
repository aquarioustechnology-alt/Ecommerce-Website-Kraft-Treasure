import type { Product } from "@/lib/data"
import { products } from "@/lib/data"
import { shopProducts } from "@/lib/shop-data"

export const catalogProducts: Product[] = [...products, ...shopProducts]

export function getProductById(productId: string) {
  return catalogProducts.find((product) => product.id === productId)
}

export function getProductBySlug(slug: string) {
  return catalogProducts.find((product) => product.slug === slug)
}
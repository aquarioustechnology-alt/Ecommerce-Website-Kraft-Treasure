import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { ProductDetail } from "@/components/product-detail"
import { catalogProducts, getProductBySlug } from "@/lib/catalog"

function normalizeCollectionKey(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim()
}

export function generateStaticParams() {
  return catalogProducts.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Not Found" }
  return {
    title: `${product.name} | Arunachal Luxe Artifacts`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const seenProductIds = new Set<string>([product.id])
  const sameCollection = catalogProducts.filter((item) => {
    if (seenProductIds.has(item.id)) return false
    const isMatch = normalizeCollectionKey(item.collection) === normalizeCollectionKey(product.collection)
    if (isMatch) {
      seenProductIds.add(item.id)
    }
    return isMatch
  })

  const sameCategory = catalogProducts.filter((item) => {
    if (seenProductIds.has(item.id)) return false
    const isMatch = item.category === product.category
    if (isMatch) {
      seenProductIds.add(item.id)
    }
    return isMatch
  })

  const curatedFallback = catalogProducts.filter((item) => !seenProductIds.has(item.id))
  const related = [...sameCollection, ...sameCategory, ...curatedFallback].slice(0, 8)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProductDetail product={product} relatedProducts={related} />
      <SiteFooter />
    </main>
  )
}
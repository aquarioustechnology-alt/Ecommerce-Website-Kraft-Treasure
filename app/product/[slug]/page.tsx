import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { ProductDetail } from "@/components/product-detail"
import { catalogProducts, getProductBySlug } from "@/lib/catalog"

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

  const related = catalogProducts
    .filter((item) => item.collection === product.collection && item.id !== product.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProductDetail product={product} relatedProducts={related} />
      <SiteFooter />
    </main>
  )
}
import type { Product } from "@/lib/data"
import { ProductPageArtisans } from "@/components/product page/product-page-artisans"
import { ProductPageHero } from "@/components/product page/product-page-hero"
import { ProductPageRelated } from "@/components/product page/product-page-related"
import { ProductPageTabs } from "@/components/product page/product-page-tabs"

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  return (
    <div className="pt-[50px]">
      <ProductPageHero product={product} />
      <ProductPageTabs product={product} />
      <ProductPageArtisans />
      {relatedProducts.length > 0 && <ProductPageRelated relatedProducts={relatedProducts} />}
    </div>
  )
}
import type { Product } from "@/lib/data"
import { ShopProductCard } from "@/components/Shop/shop-product-card"

export function WishlistGrid({ products }: { products: Product[] }) {
  return (
    <section className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {products.map((product) => (
        <ShopProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

"use client"

import { CircleCheckBig, PackageCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react"
import type { Product } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Homepage/tabs"

interface ProductPageTabsProps {
  product: Product
}

export function ProductPageTabs({ product }: ProductPageTabsProps) {
  const descriptionBullets = [
    ...product.details,
    `${product.material} construction with a hand-finished surface.`,
    `Designed within the ${product.collection} collection language.`,
  ]

  const shippingBullets = [
    product.inStock
      ? "In-stock pieces are prepared for dispatch within 3 to 5 business days."
      : "Made-to-order pieces move into production confirmation before dispatch timelines are shared.",
    "Orders are packed with protective wrapping suitable for handcrafted and fragile goods.",
    "Shipping support is currently focused on destinations within India.",
    "If an item arrives damaged or incorrect, support can assist with a return or replacement review.",
  ]

  return (
    <section className="px-6 lg:px-12 py-12 lg:py-14 max-w-[1440px] mx-auto w-full">
      <Tabs defaultValue="description" className="w-full gap-0">
        <div className="mb-8 border-b border-[#DED6CA]">
          <TabsList className="h-auto w-full justify-start gap-8 rounded-none border-0 bg-transparent p-0 shadow-none">
            <TabsTrigger
              value="description"
              className="relative h-auto rounded-none border-0 bg-transparent px-0 pb-5 pt-0 text-[11px] tracking-[0.24em] uppercase font-sans text-muted-foreground shadow-none transition-colors duration-300 hover:text-[#D33740] data-[state=active]:bg-transparent data-[state=active]:text-[#D33740] data-[state=active]:shadow-none after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#D33740] after:transition-transform after:duration-300 data-[state=active]:after:scale-x-100"
            >
              Product Description
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="relative h-auto rounded-none border-0 bg-transparent px-0 pb-5 pt-0 text-[11px] tracking-[0.24em] uppercase font-sans text-muted-foreground shadow-none transition-colors duration-300 hover:text-[#D33740] data-[state=active]:bg-transparent data-[state=active]:text-[#D33740] data-[state=active]:shadow-none after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#D33740] after:transition-transform after:duration-300 data-[state=active]:after:scale-x-100"
            >
              Shipping & Returns
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="description" className="pt-0">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl lg:text-3xl font-serif text-foreground leading-tight">
                A collected piece shaped by material, finish, and regional craft character
              </h2>
              <p className="max-w-2xl text-sm lg:text-[15px] text-muted-foreground font-sans leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center text-[#D33740]">
                  <PackageCheck className="h-4 w-4" />
                </div>
                <p className="mb-4 text-[10px] tracking-[0.24em] uppercase text-muted-foreground font-sans">
                  What Defines This Piece
                </p>
                <ul className="space-y-3">
                  {descriptionBullets.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground font-sans leading-relaxed">
                      <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-[#D33740]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-4 text-[10px] tracking-[0.24em] uppercase text-muted-foreground font-sans">
                  Quick Facts
                </p>
                <ul className="space-y-3">
                  {[
                    `Material: ${product.material}`,
                    `Origin: ${product.origin}`,
                    `Dimensions: ${product.dimensions}`,
                    `Collection: ${product.collection}`,
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground font-sans leading-relaxed">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D33740]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="pt-0">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl lg:text-3xl font-serif text-foreground leading-tight">
                Carefully packed, domestically shipped, and supported after delivery
              </h2>
              <p className="max-w-2xl text-sm lg:text-[15px] text-muted-foreground font-sans leading-relaxed">
                Delivery information is kept practical and transparent so handcrafted pieces reach you safely and with the right expectations around packing, timelines, and aftercare support.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center text-[#D33740]">
                  <Truck className="h-4 w-4" />
                </div>
                <p className="mb-4 text-[10px] tracking-[0.24em] uppercase text-muted-foreground font-sans">
                  Shipping Notes
                </p>
                <ul className="space-y-3">
                  {shippingBullets.slice(0, 2).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground font-sans leading-relaxed">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D33740]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center text-[#D33740]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <p className="mb-4 text-[10px] tracking-[0.24em] uppercase text-muted-foreground font-sans">
                  Returns & Support
                </p>
                <ul className="space-y-3">
                  {[...shippingBullets.slice(2), "Support can guide you on delivery checks and condition reporting after receipt."].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground font-sans leading-relaxed">
                      <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-[#D33740]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
"use client"

import { ShieldCheck, Leaf, Gem } from "lucide-react"

export function BrandBenefits() {
    return (
        <section className="bg-white py-12 border-y border-gray-100">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                {/* Item 1 */}
                <div className="flex flex-col items-center text-center flex-1">
                    <div className="mb-4 transition-transform hover:scale-110 duration-300">
                        <Gem className="w-9 h-9 text-[#C5AB7D]" strokeWidth={1} />
                    </div>
                    <h3 className="text-[11px] tracking-[0.2em] uppercase font-sans font-semibold text-black">
                        Authentic Handicraft Products
                    </h3>
                </div>

                {/* Divider 1 */}
                <div className="hidden md:block h-16 w-px bg-gray-200" />

                {/* Item 2 */}
                <div className="flex flex-col items-center text-center flex-1">
                    <div className="mb-4 transition-transform hover:scale-110 duration-300">
                        <ShieldCheck className="w-9 h-9 text-[#C5AB7D]" strokeWidth={1} />
                    </div>
                    <h3 className="text-[11px] tracking-[0.2em] uppercase font-sans font-semibold text-black">
                        Secure Shopping
                    </h3>
                </div>

                {/* Divider 2 */}
                <div className="hidden md:block h-16 w-px bg-gray-200" />

                {/* Item 3 */}
                <div className="flex flex-col items-center text-center flex-1">
                    <div className="mb-4 transition-transform hover:scale-110 duration-300">
                        <Leaf className="w-9 h-9 text-[#C5AB7D]" strokeWidth={1} />
                    </div>
                    <h3 className="text-[11px] tracking-[0.2em] uppercase font-sans font-semibold text-black">
                        Sustainable & Responsible
                    </h3>
                </div>
            </div>
        </section>
    )
}

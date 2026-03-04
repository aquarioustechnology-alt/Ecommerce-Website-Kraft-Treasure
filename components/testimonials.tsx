"use client"

import { useEffect, useRef, useState } from "react"
import { Quote, Star } from "lucide-react"

export function Testimonials() {
    const [visible, setVisible] = useState(false)
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true)
            },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    const reviews = [
        {
            name: "Ananya Sharma",
            text: "The intricate beadwork on the necklace I ordered is breathtaking. You can truly feel the soul of Arunachal in every piece.",
            rating: 5
        },
        {
            name: "Rahul Mukherji",
            text: "Exceptional craftsmanship. The singing bowl has the most resonant frequency I've ever experienced. A true masterpiece.",
            rating: 5
        },
        {
            name: "Priyanka Gogoi",
            text: "Finally, a platform that brings the authentic tribal arts of our region to the world. The quality is peerless and ethical.",
            rating: 5
        }
    ]

    return (
        <section ref={ref} className="pb-20 pt-6 px-6 lg:px-12 max-w-[1440px] mx-auto w-full overflow-hidden">
            <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="text-center mb-10">
                    <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5AB7D] font-sans mb-3">
                        Voices of Appreciation
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif text-black">What Our Connoisseurs Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className={`relative group overflow-hidden flex flex-col items-center text-center p-8 bg-zinc-50 border border-zinc-100/50 transition-all duration-500`}
                            style={{ transitionDelay: `${index * 0.2}s` }}
                        >
                            {/* Hover Background Animation */}
                            <div className="absolute inset-0 bg-[#FFF4B3] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

                            <div className="relative z-10 flex flex-col items-center h-full">
                                <div className="flex gap-1 mb-8">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFF4B3] text-[#FFF4B3] stroke-black/20" />
                                    ))}
                                </div>

                                <p className="text-lg md:text-xl font-serif italic text-black leading-relaxed mb-8 flex-1">
                                    "{review.text}"
                                </p>

                                <div className="mt-auto">
                                    <p className="text-sm font-sans font-semibold tracking-wider text-black uppercase">{review.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

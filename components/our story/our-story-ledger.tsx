"use client"

import { useEffect, useRef, useState } from "react"

const metrics = [
  {
    value: "26+",
    label: "major tribal lineages referenced",
    detail: "Each with its own material vocabulary, ceremonial codes, and craft memory.",
  },
  {
    value: "180+",
    label: "artisan relationships nurtured",
    detail: "Built through repeat sourcing, documentation, and fair-value collaboration.",
  },
  {
    value: "100%",
    label: "provenance-first curatorial model",
    detail: "We position origin, authorship, and context as essential parts of luxury.",
  },
  {
    value: "1",
    label: "promise behind every object",
    detail: "Nothing is detached from its maker, place, or purpose when it enters our collection.",
  },
]

function CountingNumber({ value, duration = 2000, visible }: { value: string; duration?: number; visible: boolean }) {
  const [count, setCount] = useState(0)
  const target = parseInt(value.replace(/\D/g, ""), 10)
  const suffix = value.replace(/[0-9]/g, "")

  useEffect(() => {
    if (!visible) return

    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [visible, target, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function OurStoryLedger() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-black py-14 text-white lg:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div>
          <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#FFF4B3]">Story Ledger</p>
          <h2 className="mt-4 max-w-md text-4xl font-serif leading-tight sm:text-5xl">
            The Numbers Only Matter Because They Represent People.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/65">
            Scale is never the headline for us. These markers exist to show the depth of the ecosystem we are responsible for stewarding.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
          {metrics.map((item) => (
            <article key={item.label} className="bg-black p-6 lg:p-8">
              <p className="text-4xl font-serif text-[#FFF4B3] sm:text-5xl">
                <CountingNumber value={item.value} visible={visible} />
              </p>
              <p className="mt-3 text-[11px] font-sans uppercase tracking-[0.28em] text-white">{item.label}</p>
              <p className="mt-4 text-sm leading-6 text-white/60">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


const SUPPORT_POINTS = [
  "Orders are packed after a final quality and packaging review.",
  "High-value shipments may require a signature at the time of delivery.",
  "Customers should ensure the shipping address and contact number are correct before dispatch.",
  "Delivery exceptions, delays, or failed attempts may be communicated by email or phone.",
] as const

export function ShippingDeliverySupport() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-12 lg:pb-24">
      <div className="max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#556987]">Important Notes</p>
        <p className="mt-4 text-[15px] leading-8 text-[#556987]">
          Delivery commitments on this page are sample content for the current front-end build. Final policy copy can replace these notes later without changing the page structure.
        </p>
        <ul className="mt-5 list-disc space-y-3 pl-5 text-[15px] leading-8 text-black/78 marker:text-[#B27A2A]">
          {SUPPORT_POINTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

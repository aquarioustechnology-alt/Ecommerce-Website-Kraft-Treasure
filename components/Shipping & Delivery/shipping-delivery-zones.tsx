const DELIVERY_POINTS = [
  "Metro deliveries may arrive within 3 to 5 business days after dispatch.",
  "Remote locations may require additional transit time based on courier coverage.",
  "International delivery timelines can vary depending on destination customs clearance.",
  "Tracking details will be shared once the shipment is picked up by the courier partner.",
] as const

export function ShippingDeliveryZones() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-6 lg:px-12">
      <div className="max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#556987]">Delivery Timelines</p>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-8 text-black/78 marker:text-[#B27A2A]">
          {DELIVERY_POINTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

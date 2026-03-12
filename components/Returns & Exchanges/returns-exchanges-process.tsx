const PROCESS_POINTS = [
  "Customers may raise a return or exchange request within the applicable window after delivery.",
  "Requests may be reviewed based on product condition, order details, and the reason shared by the customer.",
  "Approved exchange requests may depend on available stock of the requested product.",
  "Refund or replacement timelines may begin after the returned item is inspected.",
] as const

export function ReturnsExchangesProcess() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-6 lg:px-12">
      <div className="max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#556987]">Request Process</p>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-8 text-black/78 marker:text-[#B27A2A]">
          {PROCESS_POINTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

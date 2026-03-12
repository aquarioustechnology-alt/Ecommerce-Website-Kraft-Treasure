const ELIGIBILITY_POINTS = [
  "Incorrect item received against the confirmed order.",
  "Transit damage reported with supporting proof.",
  "Eligible exchange requests for items that remain in stock.",
] as const

const NON_ELIGIBILITY_POINTS = [
  "Customized or personalized products after approval.",
  "Requests raised after the return window closes.",
  "Products returned without original protective packaging where required.",
] as const

export function ReturnsExchangesSupport() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-12 lg:pb-24">
      <div className="max-w-4xl space-y-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#556987]">Eligible Cases</p>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-8 text-black/78 marker:text-[#B27A2A]">
            {ELIGIBILITY_POINTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#556987]">Cases That May Not Qualify</p>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-8 text-black/78 marker:text-[#B27A2A]">
            {NON_ELIGIBILITY_POINTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

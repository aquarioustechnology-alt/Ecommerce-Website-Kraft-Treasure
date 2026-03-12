const GUIDELINES = [
  "Customers should provide accurate account, billing, and delivery information.",
  "Product availability and pricing may change without notice until an order is confirmed.",
  "Site content, product imagery, descriptions, and branding remain the property of the platform unless stated otherwise.",
  "The website should not be used for misuse, scraping, fraud, or unlawful activity.",
] as const

export function TermsOfUseGuidelines() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-6 lg:px-12">
      <div className="max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#556987]">General Terms</p>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-8 text-black/78 marker:text-[#B27A2A]">
          {GUIDELINES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

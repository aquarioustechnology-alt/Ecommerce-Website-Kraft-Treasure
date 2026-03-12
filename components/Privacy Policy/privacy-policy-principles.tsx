const PRINCIPLES = [
  "We may collect information such as name, email address, phone number, billing address, and shipping address.",
  "We may use customer details to process orders, share delivery updates, respond to support requests, and improve service quality.",
  "Payment and logistics partners may receive limited information required to complete transactions or deliveries.",
  "Reasonable technical and operational safeguards may be used to protect stored customer information.",
] as const

export function PrivacyPolicyPrinciples() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-6 lg:px-12">
      <div className="max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#556987]">How Data May Be Used</p>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-8 text-black/78 marker:text-[#B27A2A]">
          {PRINCIPLES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

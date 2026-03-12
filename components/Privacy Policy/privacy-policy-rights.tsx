const RIGHTS = [
  "Request a review of the contact details associated with an account.",
  "Ask for corrections to inaccurate billing or delivery information.",
  "Contact support regarding communication preferences or marketing updates.",
  "Raise a request about retention, deletion, or access to personal information.",
] as const

export function PrivacyPolicyRights() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-12 lg:pb-24">
      <div className="max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#556987]">Customer Rights</p>
        <p className="mt-4 text-[15px] leading-8 text-[#556987]">
          Customers may contact support for privacy-related questions or to request updates to account information. Replace this placeholder text with approved legal copy when final policy language is ready.
        </p>
        <ul className="mt-5 list-disc space-y-3 pl-5 text-[15px] leading-8 text-black/78 marker:text-[#B27A2A]">
          {RIGHTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

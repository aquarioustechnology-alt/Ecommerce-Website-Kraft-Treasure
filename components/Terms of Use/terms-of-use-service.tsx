const SUPPORT_NOTES = [
  "Orders may be reviewed before confirmation if payment, stock, or delivery details require validation.",
  "Handcrafted items may show natural variation in finish, color, or detailing.",
  "Questions regarding these terms may be raised through the official support or contact page.",
] as const

export function TermsOfUseService() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-12 lg:pb-24">
      <div className="max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#556987]">Additional Notes</p>
        <p className="mt-4 text-[15px] leading-8 text-[#556987]">
          These are sample service and platform notes for the current front-end implementation. The layout is intentionally plain so the legal or policy team can replace the copy directly.
        </p>
        <ul className="mt-5 list-disc space-y-3 pl-5 text-[15px] leading-8 text-black/78 marker:text-[#B27A2A]">
          {SUPPORT_NOTES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import type { CheckoutStep } from "@/components/Checkout/checkout-types"

type CheckoutStepperProps = {
  step: CheckoutStep
  onStepChange: (step: CheckoutStep) => void
}

const steps: Array<{
  id: CheckoutStep
  label: string
  note: string
}> = [
  { id: "bag", label: "Your Cart", note: "Review your selected pieces" },
  { id: "shipping", label: "Shipping", note: "Choose where we should send them" },
  { id: "payment", label: "Payment", note: "Complete the purchase securely" },
]

export function CheckoutStepper({ step, onStepChange }: CheckoutStepperProps) {
  const currentIndex = steps.findIndex((item) => item.id === step)

  return (
    <div className="mb-10 border border-black/10 bg-white">
      <div className="grid gap-0 md:grid-cols-3">
        {steps.map((item, index) => {
          const isActive = item.id === step
          const isComplete = index < currentIndex

          return (
            <div key={item.id} className="border-b border-black/10 last:border-b-0 md:border-b-0 md:border-r md:border-black/10 md:last:border-r-0">
              <button
                type="button"
                onClick={() => onStepChange(item.id)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-[#FFF8F4]"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center border text-xs font-sans font-semibold uppercase tracking-[0.18em] ${
                    isActive
                      ? "border-[#D33740] bg-[#D33740] text-white"
                      : isComplete
                      ? "border-[#D33740] text-[#D33740]"
                      : "border-black/15 text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </span>

                <span className="min-w-0">
                  <span
                    className={`block text-[11px] font-sans uppercase tracking-[0.22em] ${
                      isActive || isComplete ? "text-[#D33740]" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm font-sans text-foreground">
                    {item.note}
                  </span>
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}


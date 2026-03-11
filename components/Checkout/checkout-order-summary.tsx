import { ArrowRight, ShieldCheck } from "lucide-react"
import { convertPrice, formatPrice } from "@/lib/data"
import type {
  CheckoutLineItem,
  CheckoutStep,
} from "@/components/Checkout/checkout-types"

type CheckoutOrderSummaryProps = {
  cartItems: CheckoutLineItem[]
  currency: string
  subtotal: number
  duty: number
  tax: number
  total: number
  step: CheckoutStep
  onAdvance: () => void
}

export function CheckoutOrderSummary({
  cartItems,
  currency,
  subtotal,
  duty,
  tax,
  total,
  step,
  onAdvance,
}: CheckoutOrderSummaryProps) {
  const buttonLabel =
    step === "bag"
      ? "Proceed To Shipping"
      : step === "shipping"
      ? "Continue To Payment"
      : "Place Order"

  return (
    <aside className="sticky top-24 border border-black/10 bg-[#F9F6F1] p-6 lg:p-8">
      <div className="border-b border-black/10 pb-5">
        <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.35em] text-[#C5AB7D]">
          Order Summary
        </p>
        <h2 className="text-[30px] font-serif text-foreground">Order Summary</h2>
      </div>

      <div className="space-y-4 py-6">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-start justify-between gap-3 text-sm font-sans"
          >
            <div className="min-w-0">
              <p className="truncate text-foreground">{item.product.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Qty {item.quantity}
              </p>
            </div>
            <p className="shrink-0 text-foreground">
              {formatPrice(
                convertPrice(item.product.price, currency) * item.quantity,
                currency
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-black/10 pt-5">
        <div className="flex items-center justify-between text-sm font-sans">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            {formatPrice(subtotal, currency)}
          </span>
        </div>

        {currency !== "INR" && (
          <>
            <div className="flex items-center justify-between text-sm font-sans">
              <span className="text-muted-foreground">Import Duty</span>
              <span className="font-medium text-foreground">
                {formatPrice(duty, currency)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-sans">
              <span className="text-muted-foreground">
                Tax {currency === "GBP" || currency === "AED" ? "(VAT)" : "(Sales Tax)"}
              </span>
              <span className="font-medium text-foreground">
                {formatPrice(tax, currency)}
              </span>
            </div>
          </>
        )}

        {currency === "INR" && (
          <div className="flex items-center justify-between text-sm font-sans">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="font-medium text-foreground">
              {formatPrice(tax, currency)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-6">
        <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-foreground">
          Total
        </span>
        <span className="text-[28px] font-sans font-semibold text-foreground">
          {formatPrice(total, currency)}
        </span>
      </div>

      <button
        type="button"
        onClick={onAdvance}
        className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 text-[11px] font-sans uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500"
      >
        <span className="relative z-20">{buttonLabel}</span>
        <ArrowRight className="relative z-20 h-3.5 w-3.5 transition-transform group-hover:translate-x-2" />
        <span className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
      </button>

      <div className="mt-5 flex items-center justify-center gap-2">
        <ShieldCheck className="h-3.5 w-3.5 text-[#D33740]" />
        <p className="text-[10px] font-sans uppercase tracking-[0.16em] text-muted-foreground">
          Secure Checkout
        </p>
      </div>
    </aside>
  )
}


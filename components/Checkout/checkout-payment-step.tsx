"use client"

import { useState } from "react"
import { CreditCard, Landmark, Lock, Smartphone } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Homepage/select"

type PaymentMethod = "upi" | "netbanking" | "card"

type CheckoutPaymentStepProps = {
  paymentMethod: PaymentMethod
  onPaymentMethodChange: (method: PaymentMethod) => void
}

const paymentOptions: Array<{
  id: PaymentMethod
  label: string
  description: string
  icon: typeof Smartphone
}> = [
  {
    id: "upi",
    label: "UPI",
    description: "Pay instantly through any UPI app or ID.",
    icon: Smartphone,
  },
  {
    id: "netbanking",
    label: "Netbanking",
    description: "Select your bank and continue on the bank login page.",
    icon: Landmark,
  },
  {
    id: "card",
    label: "Credit Card / Debit Card",
    description: "Visa, Mastercard, RuPay, and Amex cards.",
    icon: CreditCard,
  },
]

const netbankingBanks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
] as const

export function CheckoutPaymentStep({
  paymentMethod,
  onPaymentMethodChange,
}: CheckoutPaymentStepProps) {
  const [selectedBank, setSelectedBank] = useState<string>(netbankingBanks[0])

  return (
    <section className="space-y-8">
      <div className="border-b border-black/10 pb-5">
        <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.35em] text-[#C5AB7D]">
          Payment
        </p>
        <h2 className="text-[30px] font-serif text-foreground md:text-[34px]">
          Select How You Want To Pay
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {paymentOptions.map((option) => {
          const Icon = option.icon
          const isSelected = option.id === paymentMethod

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onPaymentMethodChange(option.id)}
              className={`flex h-full flex-col gap-4 border p-4 text-left transition-colors ${
                isSelected
                  ? "border-[#D33740] bg-[#FFF8F4]"
                  : "border-black/10 bg-white hover:border-[#D33740]/60"
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center border ${
                  isSelected
                    ? "border-[#D33740] bg-[#D33740] text-white"
                    : "border-black/10 text-[#D33740]"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-sans font-semibold uppercase tracking-[0.12em] text-foreground">
                  {option.label}
                </span>
                <span className="mt-2 block text-sm font-sans leading-5 text-muted-foreground">
                  {option.description}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="space-y-4">
        {paymentMethod === "upi" && (
          <div>
            <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
              UPI ID
            </label>
            <input
              type="text"
              placeholder="username@bank"
              className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300 outline-none focus:border-[#D33740]"
            />
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div>
            <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">
              Select Bank
            </label>
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger className="h-[50px] w-full rounded-none border-[#E6DED2] bg-transparent px-4 text-sm font-sans text-foreground shadow-none focus-visible:border-[#D33740] focus-visible:ring-0">
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-[#E6DED2] bg-white shadow-[0_18px_36px_-24px_rgba(0,0,0,0.25)]">
                {netbankingBanks.map((bank) => (
                  <SelectItem
                    key={bank}
                    value={bank}
                    className="rounded-none px-4 py-3 text-sm font-sans text-foreground focus:bg-[#FFF8F4] focus:text-[#D33740]"
                  >
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-3 text-sm font-sans leading-6 text-muted-foreground">
              After you choose a bank, the payment continues on the bank's secure netbanking page.
            </p>
          </div>
        )}

        {paymentMethod === "card" && (
          <>
            <div>
              <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                Card Number
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300 outline-none focus:border-[#D33740]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300 outline-none focus:border-[#D33740]"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300 outline-none focus:border-[#D33740]"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                Name On Card
              </label>
              <input
                type="text"
                placeholder="Full name on card"
                className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300 outline-none focus:border-[#D33740]"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-black/10 pt-5">
        <Lock className="h-4 w-4 text-[#D33740]" />
        <p className="text-sm font-sans text-muted-foreground">
          All transactions are processed over an encrypted checkout session.
        </p>
      </div>
    </section>
  )
}

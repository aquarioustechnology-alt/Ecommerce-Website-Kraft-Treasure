import { Plus } from "lucide-react"
import type { CheckoutAddress, ShippingFormValues } from "@/components/Checkout/checkout-types"

type CheckoutShippingStepProps = {
  savedAddresses: CheckoutAddress[]
  selectedAddressId: string | null
  shippingForm: ShippingFormValues
  onSelectAddress: (addressId: string) => void
  onUseNewAddress: () => void
  onFieldChange: (field: keyof ShippingFormValues, value: string) => void
}

const fieldRows: Array<{
  label: string
  field: keyof ShippingFormValues
  placeholder: string
  full?: boolean
}> = [
  { label: "First Name", field: "firstName", placeholder: "First Name" },
  { label: "Last Name", field: "lastName", placeholder: "Last Name" },
  { label: "Email", field: "email", placeholder: "user@example.com", full: true },
  { label: "Phone", field: "phone", placeholder: "+91 98765 43210", full: true },
  { label: "Address Line 1", field: "addressLine1", placeholder: "Street address", full: true },
  { label: "Address Line 2", field: "addressLine2", placeholder: "Apartment, suite, landmark", full: true },
  { label: "City", field: "city", placeholder: "City" },
  { label: "State", field: "state", placeholder: "State" },
  { label: "Postal Code", field: "postalCode", placeholder: "Postal Code" },
  { label: "Country", field: "country", placeholder: "Country" },
]

export function CheckoutShippingStep({
  savedAddresses,
  selectedAddressId,
  shippingForm,
  onSelectAddress,
  onUseNewAddress,
  onFieldChange,
}: CheckoutShippingStepProps) {
  return (
    <section className="space-y-8">
      <div className="border-b border-black/10 pb-5">
        <p className="mb-2 text-[10px] font-sans uppercase tracking-[0.35em] text-[#C5AB7D]">
          Shipping
        </p>
        <h2 className="text-[30px] font-serif text-foreground md:text-[34px]">
          Choose A Saved Address Or Add A New One
        </h2>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[11px] font-sans uppercase tracking-[0.24em] text-muted-foreground">
            Saved Addresses
          </p>
          <button
            type="button"
            onClick={onUseNewAddress}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-5 py-3 text-[11px] font-sans uppercase tracking-[0.18em] text-white shadow-md transition-colors duration-500"
          >
            <span className="relative z-20 flex items-center gap-2">
              <Plus className="h-3.5 w-3.5" />
              Add Address
            </span>
            <span className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
          </button>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {savedAddresses.map((address) => {
            const isSelected = address.id === selectedAddressId

            return (
              <button
                key={address.id}
                type="button"
                onClick={() => onSelectAddress(address.id)}
                className={`border p-4 text-left transition-colors ${
                  isSelected
                    ? "border-[#D33740] bg-[#FFF8F4]"
                    : "border-black/10 bg-white hover:border-[#D33740]/60"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-sans font-semibold text-foreground">
                    {address.label}
                  </p>
                  <span
                    className={`border px-2 py-1 text-[10px] font-sans uppercase tracking-[0.18em] ${
                      isSelected
                        ? "border-[#D33740] bg-[#D33740] text-white"
                        : "border-black/10 text-muted-foreground"
                    }`}
                  >
                    {isSelected ? "Selected" : "Use"}
                  </span>
                </div>

                <div className="space-y-1 text-[13px] font-sans leading-5 text-muted-foreground">
                  <p className="truncate">
                    {address.firstName} {address.lastName} · {address.addressLine1}
                    {address.addressLine2 ? `, ${address.addressLine2}` : ""}
                  </p>
                  <p className="truncate">
                    {address.city}, {address.state} {address.postalCode}, {address.country}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="mb-4 text-[11px] font-sans uppercase tracking-[0.24em] text-muted-foreground">
          Shipping Details
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fieldRows.map((field) => (
            <div key={field.field} className={field.full ? "sm:col-span-2" : ""}>
              <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                {field.label}
              </label>
              <input
                type="text"
                value={shippingForm[field.field]}
                onChange={(event) => onFieldChange(field.field, event.target.value)}
                placeholder={field.placeholder}
                className="w-full border border-black/10 bg-white px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:border-[#D33740] focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


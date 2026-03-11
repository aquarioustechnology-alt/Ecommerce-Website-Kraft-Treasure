"use client"

import { useState, useSyncExternalStore } from "react"
import { getProductById } from "@/lib/catalog"
import { calculateDuty, convertPrice } from "@/lib/data"
import { cartStore } from "@/lib/store"
import { CheckoutBagStep } from "@/components/Checkout/checkout-bag-step"
import { CheckoutEmptyState } from "@/components/Checkout/checkout-empty-state"
import { CheckoutHeader } from "@/components/Checkout/checkout-header"
import { CheckoutOrderSummary } from "@/components/Checkout/checkout-order-summary"
import { CheckoutPaymentStep } from "@/components/Checkout/checkout-payment-step"
import { CheckoutShippingStep } from "@/components/Checkout/checkout-shipping-step"
import { CheckoutStepper } from "@/components/Checkout/checkout-stepper"
import type {
  CheckoutAddress,
  CheckoutLineItem,
  CheckoutProduct,
  CheckoutStep,
  ShippingFormValues,
} from "@/components/Checkout/checkout-types"

const savedAddresses: CheckoutAddress[] = [
  {
    id: "home",
    label: "Home",
    firstName: "Aarav",
    lastName: "Mehta",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    addressLine1: "17 Heritage Lane",
    addressLine2: "Near Craft Museum",
    city: "Guwahati",
    state: "Assam",
    postalCode: "781001",
    country: "India",
  },
  {
    id: "studio",
    label: "Studio",
    firstName: "Aarav",
    lastName: "Mehta",
    email: "aarav.studio@example.com",
    phone: "+91 91234 56780",
    addressLine1: "42 River View Road",
    addressLine2: "Floor 2",
    city: "Itanagar",
    state: "Arunachal Pradesh",
    postalCode: "791111",
    country: "India",
  },
]

const emptyShippingForm: ShippingFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
}

function addressToForm(address: CheckoutAddress): ShippingFormValues {
  return {
    firstName: address.firstName,
    lastName: address.lastName,
    email: address.email,
    phone: address.phone,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: address.country,
  }
}

export function CheckoutPageContent() {
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getSnapshot
  )

  const [step, setStep] = useState<CheckoutStep>("bag")
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    savedAddresses[0]?.id ?? null
  )
  const [shippingForm, setShippingForm] = useState<ShippingFormValues>(
    savedAddresses[0] ? addressToForm(savedAddresses[0]) : emptyShippingForm
  )
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "netbanking" | "card">(
    "upi"
  )

  const cartItems: CheckoutLineItem[] = cart.items
    .map((item) => {
      const product = getProductById(item.productId)
      if (!product) return null

      return {
        ...item,
        product: product as CheckoutProduct,
      }
    })
    .filter((item): item is CheckoutLineItem => item !== null)

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + convertPrice(item.product.price, cart.currency) * item.quantity
  }, 0)

  const totalINR = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity
  }, 0)

  const { duty, tax, total } = calculateDuty(totalINR, cart.currency)

  const handleAdvance = () => {
    if (step === "bag") {
      setStep("shipping")
      return
    }

    if (step === "shipping") {
      setStep("payment")
    }
  }

  const handleSelectAddress = (addressId: string) => {
    const selectedAddress = savedAddresses.find((address) => address.id === addressId)
    if (!selectedAddress) return

    setSelectedAddressId(addressId)
    setShippingForm(addressToForm(selectedAddress))
  }

  const handleUseNewAddress = () => {
    setSelectedAddressId(null)
    setShippingForm(emptyShippingForm)
  }

  const handleShippingFieldChange = (
    field: keyof ShippingFormValues,
    value: string
  ) => {
    setShippingForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  if (cartItems.length === 0) {
    return <CheckoutEmptyState />
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-[50px] lg:px-12">
      <CheckoutHeader />
      <CheckoutStepper step={step} onStepChange={setStep} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div>
          {step === "bag" && (
            <CheckoutBagStep
              cartItems={cartItems}
              currency={cart.currency}
              onIncrease={(productId, quantity) =>
                cartStore.updateQuantity(productId, quantity)
              }
              onDecrease={(productId, quantity) =>
                cartStore.updateQuantity(productId, quantity)
              }
              onRemove={(productId) => cartStore.removeItem(productId)}
            />
          )}

          {step === "shipping" && (
            <CheckoutShippingStep
              savedAddresses={savedAddresses}
              selectedAddressId={selectedAddressId}
              shippingForm={shippingForm}
              onSelectAddress={handleSelectAddress}
              onUseNewAddress={handleUseNewAddress}
              onFieldChange={handleShippingFieldChange}
            />
          )}

          {step === "payment" && (
            <CheckoutPaymentStep
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
          )}
        </div>

        <div>
          <CheckoutOrderSummary
            cartItems={cartItems}
            currency={cart.currency}
            subtotal={subtotal}
            duty={duty}
            tax={tax}
            total={total}
            step={step}
            onAdvance={handleAdvance}
          />
        </div>
      </div>
    </div>
  )
}


export type CheckoutStep = "bag" | "shipping" | "payment"

export type CheckoutProduct = {
  id: string
  slug: string
  name: string
  category: string
  image: string
  price: number
  isLimited?: boolean
  edition?: string
}

export type CheckoutLineItem = {
  productId: string
  quantity: number
  product: CheckoutProduct
}

export type CheckoutAddress = {
  id: string
  label: string
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type ShippingFormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
}


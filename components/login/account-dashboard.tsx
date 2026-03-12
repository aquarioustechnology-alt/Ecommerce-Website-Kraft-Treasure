"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { useEffect, useState, type ReactNode } from "react"
import * as FlagIcons from "country-flag-icons/react/3x2"
import {
  CalendarRange,
  Download,
  FileText,
  KeyRound,
  LifeBuoy,
  ListFilter,
  LogOut,
  MapPin,
  Package,
  PencilLine,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
  UserRound,
  WalletCards,
  X,
} from "lucide-react"
import type { StoredSession } from "@/lib/auth"
import { DEFAULT_LAST_NAME, DEFAULT_PHONE, DEFAULT_PHONE_COUNTRY, setStoredSession } from "@/lib/auth"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/Homepage/select"
import { Calendar } from "@/components/Homepage/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Homepage/popover"
import {
  COUNTRY_DIAL_OPTIONS,
  getCountryByDialCode,
  getCountryByIso,
} from "@/lib/country-codes"

type SectionId = "profile" | "password" | "orders" | "transactions" | "address"

type SectionConfig = {
  id: SectionId
  label: string
  title: string
  description: string
  icon: typeof UserRound
}

type OrderRecord = {
  id: string
  placedOn: string
  status: "Processing" | "Shipped" | "Delivered"
  productName: string
  productPrice: string
  quantity: number
  image: string
  material: string
  recipientName: string
  shippingAddress: string[]
  trackingCode: string
  trackingNote: string
  deliveryWindow: string
  paymentSummary: {
    subtotal: string
    shipping: string
    tax: string
    discount: string
    total: string
  }
}

type TransactionRecord = {
  id: string
  orderId: string
  method: string
  date: string
}

type AddressLabel = "Home" | "Work" | "Other"

type AddressRecord = {
  id: string
  label: AddressLabel
  line1: string
  line2: string
  country: "India"
  city: string
  zipCode: string
  landmark: string
}

type ProfileFormState = {
  firstName: string
  lastName: string
  email: string
  phoneCountry: string
  phoneNumber: string
}

type OrderDateRangeFilter = "all" | "mar-1-7" | "mar-8-14" | "mar-2026"
type OrderStatusFilter = "all" | "processing" | "shipped" | "delivered" | "cancellation_requested"

const ACCOUNT_SECTIONS: SectionConfig[] = [
  {
    id: "profile",
    label: "My Profile",
    title: "Profile Details",
    description: "Update the personal details used for orders, invoices, and delivery coordination.",
    icon: UserRound,
  },
  {
    id: "address",
    label: "My Address",
    title: "Saved Addresses",
    description: "Keep your saved delivery addresses ready for future orders.",
    icon: MapPin,
  },
  {
    id: "password",
    label: "Change Password",
    title: "Change Password",
    description: "Keep your account credentials updated from one compact action row.",
    icon: KeyRound,
  },
  {
    id: "orders",
    label: "My Orders",
    title: "Order History",
    description: "Track each order, download invoices, and open detailed order summaries.",
    icon: Package,
  },
  {
    id: "transactions",
    label: "My Transaction",
    title: "Transactions",
    description: "A simple payment history view.",
    icon: WalletCards,
  },
]

const ORDERS: OrderRecord[] = [
  {
    id: "KT-24018",
    placedOn: "11 Mar 2026",
    status: "Processing",
    productName: "Monpa Loom Heritage Shawl",
    productPrice: "Rs. 19,200",
    quantity: 1,
    image: "/images/product-shawl.jpg",
    material: "Handwoven wool with tribal border detailing",
    recipientName: "Sd Rana",
    shippingAddress: ["Sd Rana", "17 Heritage Lane, Near Craft Museum", "Guwahati, Assam 781001", "India"],
    trackingCode: "TRK-IND-553019",
    trackingNote: "Artisan quality check completed. Pickup is scheduled with the courier partner.",
    deliveryWindow: "Expected delivery: 16 Mar 2026",
    paymentSummary: {
      subtotal: "Rs. 18,400",
      shipping: "Rs. 500",
      tax: "Rs. 1,300",
      discount: "Rs. 1,000",
      total: "Rs. 19,200",
    },
  },
  {
    id: "KT-23974",
    placedOn: "02 Mar 2026",
    status: "Delivered",
    productName: "Apatani Ceremonial Clay Vessel",
    productPrice: "Rs. 12,400",
    quantity: 2,
    image: "/images/product-pottery.jpg",
    material: "Hand-shaped fired clay with natural matte finish",
    recipientName: "Sd Rana",
    shippingAddress: ["Sd Rana", "42 River View Road, Floor 2", "Itanagar, Arunachal Pradesh 791111", "India"],
    trackingCode: "TRK-IND-548772",
    trackingNote: "Delivered to the reception desk and signed by the customer.",
    deliveryWindow: "Delivered on 06 Mar 2026",
    paymentSummary: {
      subtotal: "Rs. 11,600",
      shipping: "Rs. 300",
      tax: "Rs. 900",
      discount: "Rs. 400",
      total: "Rs. 12,400",
    },
  },
]

const TRANSACTIONS: TransactionRecord[] = [
  { id: "TXN-919201", orderId: "KT-24018", method: "UPI", date: "11 Mar 2026" },
  { id: "TXN-914004", orderId: "KT-23974", method: "Netbanking", date: "02 Mar 2026" },
]

const ADDRESS_LABEL_OPTIONS: AddressLabel[] = ["Home", "Work", "Other"]

const INDIA_CITY_OPTIONS = [
  "Ahmedabad",
  "Bengaluru",
  "Chennai",
  "Guwahati",
  "Hyderabad",
  "Itanagar",
  "Jaipur",
  "Kolkata",
  "Mumbai",
  "New Delhi",
  "Pune",
] as const

const INITIAL_ADDRESSES: AddressRecord[] = [
  {
    id: "home",
    label: "Home",
    line1: "17 Heritage Lane, Near Craft Museum",
    line2: "Heritage Residency, Block A",
    country: "India",
    city: "Guwahati",
    zipCode: "781001",
    landmark: "Near Craft Museum",
  },
  {
    id: "work",
    label: "Work",
    line1: "42 River View Road, Floor 2",
    line2: "Studio Block",
    country: "India",
    city: "Itanagar",
    zipCode: "791111",
    landmark: "Opposite State Museum",
  },
]

const ORDER_DATE_RANGE_OPTIONS = [
  { value: "all", label: "All Dates" },
  { value: "mar-1-7", label: "01 Mar - 07 Mar 2026" },
  { value: "mar-8-14", label: "08 Mar - 14 Mar 2026" },
  { value: "mar-2026", label: "March 2026" },
] as const

const ORDER_STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancellation_requested", label: "Cancellation Requested" },
] as const

const MONTH_INDEX_BY_LABEL: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
}

function parseDisplayDate(value: string) {
  const [day, month, year] = value.split(" ")
  return new Date(Number(year), MONTH_INDEX_BY_LABEL[month] ?? 0, Number(day))
}

function getOrderDisplayStatus(order: OrderRecord, cancelledOrderIds: string[]) {
  return cancelledOrderIds.includes(order.id) ? "Cancellation Requested" : order.status
}

function matchesOrderDateRange(placedOn: string, startDate?: Date, endDate?: Date) {
  if (!startDate && !endDate) return true

  const placedDate = parseDisplayDate(placedOn)
  let lowerBound = startDate ? new Date(startDate) : undefined
  let upperBound = endDate ? new Date(endDate) : undefined

  if (lowerBound && upperBound && lowerBound.getTime() > upperBound.getTime()) {
    const swappedLower = new Date(upperBound)
    const swappedUpper = new Date(lowerBound)
    lowerBound = swappedLower
    upperBound = swappedUpper
  }

  if (lowerBound) {
    lowerBound.setHours(0, 0, 0, 0)
    if (placedDate < lowerBound) return false
  }

  if (upperBound) {
    upperBound.setHours(23, 59, 59, 999)
    if (placedDate > upperBound) return false
  }

  return true
}

function matchesOrderStatus(status: string, filter: OrderStatusFilter) {
  if (filter === "all") return true

  if (filter === "cancellation_requested") {
    return status === "Cancellation Requested"
  }

  return status.toLowerCase() === filter
}

function PrimaryButton({ label, href, onClick }: { label: string; href?: string; onClick?: () => void }) {
  const classes = "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white shadow-md transition-colors duration-500"
  const content = (
    <>
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
    </>
  )

  if (href) return <Link prefetch={false} href={href} className={classes}>{content}</Link>
  return <button type="button" onClick={onClick} className={classes}>{content}</button>
}

function ContentHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-black/10 pb-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B8894A]">Account Section</p>
        <h2 className="mt-2 font-serif text-[34px] leading-tight text-foreground lg:text-[40px]">{title}</h2>
        <p className="mt-2 text-sm font-sans leading-6 text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="shrink-0 lg:pt-1">{action}</div> : null}
    </div>
  )
}

function DashboardFilterSelect({
  label,
  value,
  onValueChange,
  options,
  icon,
}: {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: readonly { value: string; label: string }[]
  icon: ReactNode
}) {
  const selectedOption = options.find((option) => option.value === value) || options[0]

  return (
    <div className="min-w-[220px]">
      <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger size="default" className="w-full cursor-pointer rounded-none border-black/10 bg-white px-4 py-3 text-left text-sm font-sans text-foreground shadow-none transition-colors duration-500 focus:ring-0 focus-visible:ring-0">
          <span className="flex items-center gap-2 truncate">
            <span className="text-[#B8894A]">{icon}</span>
            <span className="truncate">{selectedOption.label}</span>
          </span>
        </SelectTrigger>
        <SelectContent className="rounded-none border-[#D7CEBF] bg-white shadow-lg">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="py-2.5">{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function DateFilterPicker({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: Date | undefined
  onChange: (value: Date | undefined) => void
  placeholder: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-[188px] min-w-[188px]">
      <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-between border border-black/10 bg-white px-4 py-3 text-sm font-sans text-foreground transition-colors duration-500 hover:border-[#D33740]/60"
          >
            <span className="flex items-center gap-2 truncate">
              <CalendarRange className="h-4 w-4 text-[#B8894A]" />
              <span className={value ? "text-foreground" : "text-muted-foreground"}>
                {value ? format(value, "dd MMM yyyy") : placeholder}
              </span>
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto rounded-none border-[#D7CEBF] bg-white p-0 shadow-lg">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date)
              if (date) setOpen(false)
            }}
            defaultMonth={value || new Date(2026, 2, 1)}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

function DetailField({ label, value, editing, type = "text", onChange }: { label: string; value: string; editing: boolean; type?: "text" | "email" | "tel"; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        readOnly={!editing}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full border px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 ${editing ? "border-[#D7CEBF] bg-white focus:border-[#D33740]" : "border-black/10 bg-[#FBF8F2]"}`}
      />
    </label>
  )
}

function CountryDialCodeLabel({ iso, dialCode }: { iso: string; dialCode: string }) {
  const FlagIcon = FlagIcons[iso as keyof typeof FlagIcons]

  return (
    <span className="flex items-center gap-2">
      {FlagIcon ? (
        <span className="overflow-hidden rounded-[2px] border border-black/10 bg-white">
          <FlagIcon className="h-4 w-6 shrink-0" />
        </span>
      ) : null}
      <span className="font-medium text-foreground">({dialCode})</span>
    </span>
  )
}

function PhoneField({
  phoneCountry,
  phoneNumber,
  editing,
  onPhoneCountryChange,
  onPhoneNumberChange,
}: {
  phoneCountry: string
  phoneNumber: string
  editing: boolean
  onPhoneCountryChange: (value: string) => void
  onPhoneNumberChange: (value: string) => void
}) {
  const selectedCountry = getCountryByIso(phoneCountry) || getCountryByIso(DEFAULT_PHONE_COUNTRY)

  return (
    <div>
      <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Phone Number</span>
      {editing ? (
        <div className="flex flex-nowrap items-stretch gap-3">
          <div className="w-[176px] shrink-0">
            <Select value={phoneCountry} onValueChange={onPhoneCountryChange}>
              <SelectTrigger
                size="default"
                aria-label={selectedCountry ? `${selectedCountry.iso} ${selectedCountry.dialCode}` : "+91"}
                className="h-[56px] min-h-[56px] w-full cursor-pointer rounded-none border-[#D7CEBF] bg-white px-3 text-sm font-sans text-foreground shadow-none transition-colors duration-500 data-[size=default]:h-[56px] focus:ring-0 focus-visible:ring-0"
              >
                <CountryDialCodeLabel iso={selectedCountry?.iso || DEFAULT_PHONE_COUNTRY} dialCode={selectedCountry?.dialCode || "+91"} />
              </SelectTrigger>
              <SelectContent className="max-h-[320px] rounded-none border-[#D7CEBF] bg-white shadow-lg">
                {COUNTRY_DIAL_OPTIONS.map((option) => (
                  <SelectItem key={option.iso} value={option.iso} className="py-2.5">
                    <CountryDialCodeLabel iso={option.iso} dialCode={option.dialCode} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <input
            type="tel"
            value={phoneNumber}
            onChange={(event) => onPhoneNumberChange(event.target.value)}
            className="h-[56px] min-w-0 flex-1 border border-[#D7CEBF] bg-white px-4 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]"
            placeholder="98765 43210"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground">
          <CountryDialCodeLabel iso={selectedCountry?.iso || DEFAULT_PHONE_COUNTRY} dialCode={selectedCountry?.dialCode || "+91"} />
          <span>{phoneNumber}</span>
        </div>
      )}
    </div>
  )
}

function ActionButton({ label, icon: Icon, onClick, tone = "default", disabled = false }: { label: string; icon: typeof Download; onClick?: () => void; tone?: "default" | "danger" | "primary"; disabled?: boolean }) {
  const toneClasses = tone === "primary"
    ? "border-transparent bg-[#140606] text-white hover:border-transparent"
    : tone === "danger"
      ? "border-[#D33740]/20 bg-[#FFF6F6] text-[#D33740] hover:border-[#D33740]"
      : "border-black/10 bg-white text-foreground hover:border-transparent"
  const contentClasses = tone === "primary"
    ? "text-white"
    : tone === "danger"
      ? "text-[#D33740] group-hover:text-white"
      : "text-foreground group-hover:text-white"
  const overlayClasses = tone === "primary" ? "bg-[#C5AB7D]" : "bg-[#D33740]"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap border px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${toneClasses} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className={`relative z-10 flex items-center gap-2 transition-colors duration-500 ${contentClasses}`}>
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className={`absolute inset-0 -translate-x-[101%] transition-transform duration-500 ease-in-out group-hover:translate-x-0 ${overlayClasses}`} />
    </button>
  )
}

function ActionLinkButton({ label, icon: Icon, href }: { label: string; icon: typeof Download; href: string }) {
  return (
    <Link
      prefetch={false}
      href={href}
      className="group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-black/10 bg-white px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-500 hover:border-transparent"
    >
      <span className="relative z-10 flex items-center gap-2 text-foreground transition-colors duration-500 group-hover:text-white">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="absolute inset-0 -translate-x-[101%] bg-[#D33740] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
    </Link>
  )
}

function ActionExternalLinkButton({ label, icon: Icon, href }: { label: string; icon: typeof Download; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-black/10 bg-white px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-500 hover:border-transparent"
    >
      <span className="relative z-10 flex items-center gap-2 text-foreground transition-colors duration-500 group-hover:text-white">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="absolute inset-0 -translate-x-[101%] bg-[#D33740] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
    </a>
  )
}

function HeaderActionButton({ label, icon: Icon, onClick, tone = "neutral" }: { label: string; icon: typeof PencilLine | typeof Plus; onClick: () => void; tone?: "neutral" | "brand" }) {
  const buttonClasses = tone === "brand"
    ? "border-[#D33740] bg-white text-[#D33740] hover:border-[#D33740]"
    : "border-black/10 bg-white text-foreground hover:border-[#D33740]/60"
  const contentClasses = tone === "brand" ? "text-[#D33740] group-hover:text-white" : "text-foreground"
  const overlayClass = tone === "brand" ? "bg-[#D33740]" : "bg-[#C5AB7D]"

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden border px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${buttonClasses}`}
    >
      <span className={`relative z-10 flex items-center gap-2 transition-colors duration-500 ${contentClasses}`}>
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className={`absolute inset-0 -translate-x-[101%] transition-transform duration-500 ease-in-out group-hover:translate-x-0 ${overlayClass}`} />
    </button>
  )
}

function IconActionButton({ icon: Icon, label, onClick, tone = "default" }: { icon: typeof PencilLine | typeof Trash2; label: string; onClick: () => void; tone?: "default" | "danger" }) {
  const buttonClasses = tone === "danger"
    ? "border-[#D33740]/20 bg-[#FFF6F6] text-[#D33740] hover:border-[#D33740]"
    : "border-black/10 bg-white text-foreground hover:border-[#D33740]/60"
  const contentClasses = tone === "danger" ? "text-[#D33740] group-hover:text-white" : "text-foreground"
  const overlayClass = tone === "danger" ? "bg-[#D33740]" : "bg-[#C5AB7D]"

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`group relative inline-flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden border transition-colors duration-500 ${buttonClasses}`}
    >
      <span className={`relative z-10 transition-colors duration-500 ${contentClasses}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className={`absolute inset-0 -translate-x-[101%] transition-transform duration-500 ease-in-out group-hover:translate-x-0 ${overlayClass}`} />
    </button>
  )
}

function SmallActionButton({ label, icon: Icon, onClick, tone = "default" }: { label: string; icon: typeof PencilLine | typeof Trash2; onClick: () => void; tone?: "default" | "danger" }) {
  const classes = tone === "danger"
    ? "border-[#D33740]/20 bg-[#FFF6F6] text-[#D33740] hover:border-[#D33740]"
    : "border-black/10 bg-white text-foreground hover:border-[#D33740]/60"
  const overlayClasses = tone === "danger" ? "bg-[#D33740]" : "bg-[#C5AB7D]"

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden border px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ${classes}`}
    >
      <span className={`relative z-10 flex items-center gap-2 transition-colors duration-500 ${tone === "danger" ? "group-hover:text-white" : ""}`}>
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className={`absolute inset-0 -translate-x-[101%] transition-transform duration-500 ease-in-out group-hover:translate-x-0 ${overlayClasses}`} />
    </button>
  )
}

function StatusBadge({ status }: { status: string }) {
  const classes = status === "Delivered"
    ? "bg-[#EEF8F0] text-[#257443]"
    : status === "Shipped"
      ? "bg-[#EEF4FF] text-[#315CA8]"
      : status === "Cancellation Requested"
        ? "bg-[#FFF2F2] text-[#C43A3A]"
        : "bg-[#FFF8E8] text-[#A56912]"

  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] ${classes}`}>{status}</span>
}

function SummaryRow({ label, value, total = false }: { label: string; value: string; total?: boolean }) {
  return <div className={`flex items-center justify-between gap-4 ${total ? "pt-4 text-base font-semibold text-black" : "text-sm text-black/68"}`}><span>{label}</span><span>{value}</span></div>
}

function splitPhoneNumber(value: string) {
  const match = value.trim().match(/^(\+\d+)\s*(.*)$/)
  if (!match) {
    return { dialCode: "+91", phoneNumber: value.trim() }
  }

  return {
    dialCode: match[1],
    phoneNumber: match[2].trim(),
  }
}

function createProfileState(session: StoredSession): ProfileFormState {
  const parsedPhone = splitPhoneNumber(session.phone || DEFAULT_PHONE)
  const selectedCountry =
    getCountryByIso(session.phoneCountry) ||
    getCountryByDialCode(parsedPhone.dialCode) ||
    getCountryByIso(DEFAULT_PHONE_COUNTRY)

  return {
    firstName: session.firstName || "Collector",
    lastName: session.lastName || DEFAULT_LAST_NAME,
    email: session.email,
    phoneCountry: selectedCountry?.iso || DEFAULT_PHONE_COUNTRY,
    phoneNumber: parsedPhone.phoneNumber,
  }
}

function createEmptyAddress(): AddressRecord {
  return {
    id: `address-${Date.now()}`,
    label: "Home",
    line1: "",
    line2: "",
    country: "India",
    city: "",
    zipCode: "",
    landmark: "",
  }
}


function getTrackingOrderUrl(trackingCode: string) {
  return `https://www.17track.net/en/track?nums=${encodeURIComponent(trackingCode)}`
}

function DetailModal({
  smallLabel,
  heading,
  order,
  status,
  onClose,
  onDownloadInvoice,
  showCancelAction,
  cancelDisabled = false,
  onCancelOrder,
}: {
  smallLabel: string
  heading: string
  order: OrderRecord
  status: string
  onClose: () => void
  onDownloadInvoice: (order: OrderRecord) => void
  showCancelAction: boolean
  cancelDisabled?: boolean
  onCancelOrder?: (orderId: string) => void
}) {
  const cancelLabel = status === "Cancellation Requested" ? "Cancel Requested" : "Cancel Order"

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-6 lg:px-8">
      <button type="button" onClick={onClose} className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" aria-label={`Close ${smallLabel}`} />

      <div className="relative z-10 max-h-[90vh] w-full max-w-[1080px] overflow-y-auto border border-black/10 bg-white shadow-[0_30px_120px_-45px_rgba(0,0,0,0.7)]">
        <div className="flex items-start justify-between gap-4 border-b border-black/10 px-6 py-5 lg:px-8">
          <div>
            <p className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B8894A]">{smallLabel}</p>
            <h3 className="mt-3 font-serif text-[34px] leading-tight text-black lg:text-[40px]">{heading}</h3>
          </div>

          <button type="button" onClick={onClose} className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-black/10 text-foreground transition-colors hover:border-[#D33740] hover:text-[#D33740]" aria-label={`Close ${smallLabel}`}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 border border-black/10 bg-[#FBF8F2] p-4 sm:flex-row sm:items-start">
              <div className="h-[116px] w-[92px] shrink-0 self-start overflow-hidden border border-black/10 bg-white">
                <Image src={order.image} alt={order.productName} width={92} height={116} className="h-full w-full object-cover" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#B8894A]">Order ID {order.id}</span>
                  <StatusBadge status={status} />
                </div>
                <h4 className="mt-3 font-serif text-[24px] leading-tight text-black lg:text-[28px]">{order.productName}</h4>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-sans font-semibold text-black">
                  <span>{order.productPrice}</span>
                  <span>Qty: {order.quantity}</span>
                  <span>Placed on {order.placedOn}</span>
                </div>
              </div>
            </div>

            <div className="border border-black/10 p-5">
              <p className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#B8894A]">Shipping Address</p>
              <div className="mt-4 max-w-[460px] text-sm font-sans leading-6 text-black/68">
                <p className="font-semibold text-black">{order.recipientName}</p>
                <p className="mt-2">{order.shippingAddress.slice(1).join(", ")}</p>
              </div>
            </div>

            <div className="border border-black/10 p-5">
              <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.24em] text-[#B8894A]"><Truck className="h-4 w-4" />Tracking Details</div>
              <p className="mt-4 text-sm font-sans leading-7 text-black/62">Pickup is scheduled with the courier partner.</p>
              <div className="mt-4 grid gap-4 border-t border-black/10 pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Tracking ID</p>
                  <p className="mt-2 text-sm font-sans font-semibold text-black">{order.trackingCode}</p>
                </div>
                <div>
                  <p className="text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Expected Delivery</p>
                  <p className="mt-2 text-sm font-sans font-semibold text-black">{order.deliveryWindow}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-black/10 bg-[#FBF8F2] p-5">
              <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.24em] text-[#B8894A]"><ShieldCheck className="h-4 w-4" />Payment Summary</div>
              <div className="mt-5 space-y-3 border-b border-black/10 pb-4">
                <SummaryRow label="Subtotal" value={order.paymentSummary.subtotal} />
                <SummaryRow label="Shipping" value={order.paymentSummary.shipping} />
                <SummaryRow label="Tax" value={order.paymentSummary.tax} />
                <SummaryRow label="Discount" value={order.paymentSummary.discount} />
              </div>
              <SummaryRow label="Total Paid" value={order.paymentSummary.total} total />
            </div>

            <div className="grid gap-3">
              <ActionButton label="Download Invoice" icon={Download} onClick={() => onDownloadInvoice(order)} />
              <ActionLinkButton label="Need Help" icon={LifeBuoy} href="/contact" />
              {showCancelAction ? (
                <ActionButton label={cancelLabel} icon={X} tone="danger" disabled={cancelDisabled} onClick={() => onCancelOrder?.(order.id)} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export function AccountDashboard({ session, onLogout }: { session: StoredSession; onLogout: () => void }) {
  const searchParams = useSearchParams()
  const sectionParam = searchParams.get("section")
  const activeSectionId: SectionId = ACCOUNT_SECTIONS.some((section) => section.id === sectionParam) ? (sectionParam as SectionId) : "profile"
  const activeSection = ACCOUNT_SECTIONS.find((section) => section.id === activeSectionId) || ACCOUNT_SECTIONS[0]

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileValues, setProfileValues] = useState(() => createProfileState(session))
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)
  const [orderStartDate, setOrderStartDate] = useState<Date | undefined>(undefined)
  const [orderEndDate, setOrderEndDate] = useState<Date | undefined>(undefined)
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatusFilter>("all")
  const [cancelledOrderIds, setCancelledOrderIds] = useState<string[]>([])
  const [savedAddresses, setSavedAddresses] = useState<AddressRecord[]>(INITIAL_ADDRESSES)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [addressDraft, setAddressDraft] = useState<AddressRecord | null>(null)
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  useEffect(() => {
    setProfileValues(createProfileState(session))
  }, [session])

  useEffect(() => {
    if (!selectedOrderId && !selectedTransactionId) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedOrderId, selectedTransactionId])

  const selectedOrder = ORDERS.find((order) => order.id === selectedOrderId) || null
  const filteredOrders = ORDERS.filter((order) => {
    const derivedStatus = getOrderDisplayStatus(order, cancelledOrderIds)
    return matchesOrderDateRange(order.placedOn, orderStartDate, orderEndDate) && matchesOrderStatus(derivedStatus, orderStatusFilter)
  })
  const transactionEntries = TRANSACTIONS
    .map((transaction) => {
      const order = ORDERS.find((candidate) => candidate.id === transaction.orderId)
      return order ? { transaction, order } : null
    })
    .filter((entry): entry is { transaction: TransactionRecord; order: OrderRecord } => Boolean(entry))
  const selectedTransactionEntry = transactionEntries.find((entry) => entry.transaction.id === selectedTransactionId) || null

  const handleProfileSave = () => {
    const fallbackPhone = splitPhoneNumber(DEFAULT_PHONE)
    const selectedCountry = getCountryByIso(profileValues.phoneCountry) || getCountryByIso(DEFAULT_PHONE_COUNTRY)
    const nextDialCode = selectedCountry?.dialCode || fallbackPhone.dialCode
    const nextPhoneNumber = profileValues.phoneNumber.trim() || fallbackPhone.phoneNumber

    setStoredSession({
      ...session,
      firstName: profileValues.firstName.trim() || "Collector",
      lastName: profileValues.lastName.trim() || DEFAULT_LAST_NAME,
      email: profileValues.email.trim() || session.email,
      phone: `${nextDialCode} ${nextPhoneNumber}`,
      phoneCountry: selectedCountry?.iso || DEFAULT_PHONE_COUNTRY,
    })
    setIsEditingProfile(false)
  }

  const handleProfileCancel = () => {
    setProfileValues(createProfileState(session))
    setIsEditingProfile(false)
  }

  const handleInvoiceDownload = (order: OrderRecord) => {
    const invoiceText = [
      `Invoice: ${order.id}`,
      `Product: ${order.productName}`,
      `Quantity: ${order.quantity}`,
      `Amount: ${order.paymentSummary.total}`,
      `Placed On: ${order.placedOn}`,
      `Tracking: ${order.trackingCode}`,
      `Recipient: ${order.recipientName}`,
      `Shipping Address: ${order.shippingAddress.join(", ")}`,
    ].join("\n")

    const blob = new Blob([invoiceText], { type: "text/plain;charset=utf-8" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${order.id}-invoice.txt`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleCancelOrder = (orderId: string) => {
    setCancelledOrderIds((current) => (current.includes(orderId) ? current : [...current, orderId]))
  }

  const startEditingAddress = (address: AddressRecord) => {
    setIsAddingAddress(false)
    setEditingAddressId(address.id)
    setAddressDraft({ ...address })
  }

  const handleAddAddress = () => {
    setIsAddingAddress(true)
    setEditingAddressId(null)
    setAddressDraft(createEmptyAddress())
  }

  const handleAddressChange = (field: Exclude<keyof AddressRecord, "id">, value: string) => {
    setAddressDraft((current) => (current ? { ...current, [field]: value } : current))
  }

  const handleSaveAddress = () => {
    if (!addressDraft) return

    const normalizedAddress: AddressRecord = {
      ...addressDraft,
      label: addressDraft.label,
      line1: addressDraft.line1.trim() || "Address line 1",
      line2: addressDraft.line2.trim(),
      country: "India",
      city: addressDraft.city.trim() || "Guwahati",
      zipCode: addressDraft.zipCode.trim() || "781001",
      landmark: addressDraft.landmark.trim(),
    }

    if (isAddingAddress) {
      setSavedAddresses((current) => [normalizedAddress, ...current])
    } else if (editingAddressId) {
      setSavedAddresses((current) =>
        current.map((address) => (address.id === editingAddressId ? normalizedAddress : address))
      )
    }

    setIsAddingAddress(false)
    setEditingAddressId(null)
    setAddressDraft(null)
  }

  const handleCancelAddress = () => {
    setIsAddingAddress(false)
    setEditingAddressId(null)
    setAddressDraft(null)
  }

  const handleDeleteAddress = (addressId: string) => {
    setSavedAddresses((current) => current.filter((address) => address.id !== addressId))
    if (editingAddressId === addressId) {
      setEditingAddressId(null)
      setAddressDraft(null)
      setIsAddingAddress(false)
    }
  }

  const profileHeaderAction = isEditingProfile ? (
    <div className="flex flex-wrap justify-end gap-3">
      <button
        type="button"
        onClick={handleProfileCancel}
        className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden border border-black/10 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-500 hover:border-[#D33740]/60"
      >
        <span className="relative z-10 transition-colors duration-500">Cancel</span>
        <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
      </button>
      <PrimaryButton label="Save Changes" onClick={handleProfileSave} />
    </div>
  ) : (
    <HeaderActionButton label="Edit Profile" icon={PencilLine} onClick={() => setIsEditingProfile(true)} />
  )

  const ordersHeaderAction = (
    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end lg:justify-end">
      <DateFilterPicker
        label="Start Date"
        value={orderStartDate}
        onChange={setOrderStartDate}
        placeholder="Select start date"
      />
      <DateFilterPicker
        label="End Date"
        value={orderEndDate}
        onChange={setOrderEndDate}
        placeholder="Select end date"
      />
      <DashboardFilterSelect
        label="Status"
        value={orderStatusFilter}
        onValueChange={(value) => setOrderStatusFilter(value as OrderStatusFilter)}
        options={ORDER_STATUS_OPTIONS}
        icon={<ListFilter className="h-4 w-4" />}
      />
    </div>
  )

  const addressHeaderAction = <HeaderActionButton label="Add New Address" icon={Plus} onClick={handleAddAddress} tone="brand" />
  const contentTitle = activeSectionId === "address" && isAddingAddress ? "Add a New Address" : activeSection.title
  const contentDescription = activeSectionId === "address" && isAddingAddress
    ? "Add a delivery address for future orders."
    : activeSection.description

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#faf5ea_100%)] px-6 pt-[50px] pb-12 lg:px-12 lg:pt-[50px] lg:pb-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <aside className="border border-black/10 bg-white p-5 lg:w-[260px] lg:flex-none lg:p-6 xl:w-[280px]">
              <p className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#B8894A]">Account Menu</p>
              <div className="mt-6 space-y-2">
                {ACCOUNT_SECTIONS.map((section) => {
                  const Icon = section.icon
                  const isActive = section.id === activeSectionId

                  return (
                    <Link
                      prefetch={false}
                      key={section.id}
                      href={`/my-account?section=${section.id}`}
                      className={`flex items-center gap-3 border px-4 py-3 text-sm font-sans transition-colors ${isActive ? "border-[#D33740] bg-[#FFF8F4] text-[#D33740]" : "border-black/10 bg-white text-foreground hover:border-[#D33740]/60 hover:text-[#D33740]"}`}
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </Link>
                  )
                })}
              </div>

              <div className="mt-6 border-t border-black/10 pt-6">
                <button
                  type="button"
                  onClick={onLogout}
                  className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white shadow-md transition-colors duration-500"
                >
                  <span className="relative z-10">Logout</span>
                  <LogOut className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
                </button>
              </div>
            </aside>

            <div className="min-w-0 flex-1 border border-black/10 bg-white p-6 lg:p-8 xl:p-10">
              <ContentHeader
                title={contentTitle}
                description={contentDescription}
                action={
                  activeSectionId === "profile"
                    ? profileHeaderAction
                    : activeSectionId === "address"
                      ? (addressDraft ? undefined : addressHeaderAction)
                      : activeSectionId === "orders"
                        ? ordersHeaderAction
                        : undefined
                }
              />

              {activeSectionId === "profile" && (
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <DetailField label="First Name" value={profileValues.firstName} editing={isEditingProfile} onChange={(value) => setProfileValues((current) => ({ ...current, firstName: value }))} />
                  <DetailField label="Last Name" value={profileValues.lastName} editing={isEditingProfile} onChange={(value) => setProfileValues((current) => ({ ...current, lastName: value }))} />
                  <DetailField label="Email" value={profileValues.email} type="email" editing={isEditingProfile} onChange={(value) => setProfileValues((current) => ({ ...current, email: value }))} />
                  <PhoneField
                    phoneCountry={profileValues.phoneCountry}
                    phoneNumber={profileValues.phoneNumber}
                    editing={isEditingProfile}
                    onPhoneCountryChange={(value: string) => setProfileValues((current) => ({ ...current, phoneCountry: value }))}
                    onPhoneNumberChange={(value: string) => setProfileValues((current) => ({ ...current, phoneNumber: value }))}
                  />
                </div>
              )}

              {activeSectionId === "address" && (
                <div className="mt-6">
                  {addressDraft ? (
                    <div className="border border-black/10 bg-white p-6 lg:p-8">
                      <div className="space-y-6">
                        <div>
                          <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Save As</span>
                          <div className="mt-3 flex flex-wrap gap-3">
                            {ADDRESS_LABEL_OPTIONS.map((option) => {
                              const isActive = addressDraft.label === option

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => handleAddressChange("label", option)}
                                  className={`inline-flex cursor-pointer items-center justify-center border px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? "border-[#D33740] bg-[#D33740] text-white" : "border-black/10 bg-white text-foreground hover:border-[#D33740]/60 hover:text-[#D33740]"}`}
                                >
                                  {option}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                          <label className="block">
                            <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Address Line 1</span>
                            <input type="text" value={addressDraft.line1} onChange={(event) => handleAddressChange("line1", event.target.value)} className="w-full border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Address Line 2</span>
                            <input type="text" value={addressDraft.line2} onChange={(event) => handleAddressChange("line2", event.target.value)} className="w-full border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Country</span>
                            <input type="text" value="India" readOnly className="w-full border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground outline-none" />
                          </label>
                          <div>
                            <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">City</span>
                            <Select value={addressDraft.city} onValueChange={(value) => handleAddressChange("city", value)}>
                              <SelectTrigger size="default" className="w-full cursor-pointer rounded-none border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground shadow-none transition-colors duration-500 focus:ring-0 focus-visible:ring-0">
                                <span className={addressDraft.city ? "text-foreground" : "text-muted-foreground"}>{addressDraft.city || "Select city"}</span>
                              </SelectTrigger>
                              <SelectContent className="rounded-none border-[#D7CEBF] bg-white shadow-lg">
                                {INDIA_CITY_OPTIONS.map((city) => (
                                  <SelectItem key={city} value={city} className="py-2.5">{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <label className="block">
                            <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Zip Code</span>
                            <input type="text" value={addressDraft.zipCode} onChange={(event) => handleAddressChange("zipCode", event.target.value)} className="w-full border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                          </label>
                          <label className="block lg:col-span-2">
                            <span className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Landmark/Other Instructions</span>
                            <input type="text" value={addressDraft.landmark} onChange={(event) => handleAddressChange("landmark", event.target.value)} className="w-full border border-black/10 bg-[#FBF8F2] px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                          </label>
                        </div>

                        <div className="flex flex-wrap justify-end gap-3 border-t border-black/10 pt-4">
                          <button
                            type="button"
                            onClick={handleCancelAddress}
                            className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden border border-black/10 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-500 hover:border-[#D33740]/60"
                          >
                            <span className="relative z-10 transition-colors duration-500">Cancel</span>
                            <span className="absolute inset-0 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
                          </button>
                          <PrimaryButton label={isAddingAddress ? "Save Address" : "Update Address"} onClick={handleSaveAddress} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 xl:grid-cols-2">
                      {savedAddresses.map((address) => (
                        <article key={address.id} className="border border-black/10 bg-[#FBF8F2] p-5 lg:p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <p className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#B8894A]">{address.label}</p>
                              <div className="mt-3 space-y-0.5 text-sm font-sans leading-6 text-muted-foreground">
                                <p>{address.line1}</p>
                                {address.line2 ? <p>{address.line2}</p> : null}
                                <p>{address.city}, {address.country} {address.zipCode}</p>
                                {address.landmark ? <p className="text-black/55">Landmark: {address.landmark}</p> : null}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <IconActionButton icon={PencilLine} label="Edit address" onClick={() => startEditingAddress(address)} />
                              <IconActionButton icon={Trash2} label="Delete address" tone="danger" onClick={() => handleDeleteAddress(address.id)} />
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSectionId === "password" && (
                <div className="mt-6">
                  <div className="grid gap-4 lg:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Current Password</label>
                      <input type="password" placeholder="Current password" className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">New Password</label>
                      <input type="password" placeholder="New password" className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground">Confirm Password</label>
                      <input type="password" placeholder="Confirm password" className="w-full border border-[#E6DED2] bg-transparent px-4 py-3 text-sm font-sans text-foreground outline-none transition-colors duration-300 focus:border-[#D33740]" />
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <PrimaryButton label="Save Password" />
                  </div>
                </div>
              )}

              {activeSectionId === "orders" && (
                <div className="mt-6 space-y-5">
                  {filteredOrders.length ? (
                    filteredOrders.map((order) => {
                      const derivedStatus = getOrderDisplayStatus(order, cancelledOrderIds)
                      const isCancellationRequested = cancelledOrderIds.includes(order.id)
                      const cancelDisabled = order.status === "Delivered" || isCancellationRequested
                      return (
                        <article key={order.id} className="border border-black/10 bg-[linear-gradient(180deg,#ffffff_0%,#fbf7f0_100%)] p-5 lg:p-6">
                          <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                              <div className="h-[128px] w-[104px] shrink-0 overflow-hidden border border-black/10 bg-white">
                                <Image src={order.image} alt={order.productName} width={104} height={128} className="h-full w-full object-cover" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                  <span className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#B8894A]">Order ID {order.id}</span>
                                  <StatusBadge status={derivedStatus} />
                                </div>

                                <h3 className="mt-3 font-serif text-[22px] leading-tight text-black sm:text-[24px]">{order.productName}</h3>

                                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-sans font-semibold text-black">
                                  <span>{order.productPrice}</span>
                                  <span>Qty: {order.quantity}</span>
                                  <span>Placed on {order.placedOn}</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                              <ActionButton label="Download Invoice" icon={Download} onClick={() => handleInvoiceDownload(order)} />
                              <ActionButton label={isCancellationRequested ? "Cancel Requested" : "Cancel Order"} icon={X} tone="danger" disabled={cancelDisabled} onClick={() => handleCancelOrder(order.id)} />
                              <ActionLinkButton label="Need Help" icon={LifeBuoy} href="/contact" />
                              <ActionExternalLinkButton label="Tracking Order" icon={Truck} href={getTrackingOrderUrl(order.trackingCode)} />
                              <ActionButton label="View Details" icon={FileText} tone="primary" onClick={() => { setSelectedTransactionId(null); setSelectedOrderId(order.id) }} />
                            </div>
                          </div>
                        </article>
                      )
                    })
                  ) : (
                    <div className="border border-dashed border-black/10 bg-[#FBF8F2] px-6 py-10 text-center">
                      <p className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#B8894A]">No Matching Orders</p>
                      <p className="mt-3 text-sm font-sans text-muted-foreground">Adjust the date range or status filter to see available orders.</p>
                    </div>
                  )}
                </div>
              )}

              {activeSectionId === "transactions" && (
                <div className="mt-6 space-y-4">
                  {transactionEntries.map(({ transaction, order }) => (
                    <article key={transaction.id} className="border border-black/10 bg-[linear-gradient(180deg,#ffffff_0%,#fbf7f0_100%)] p-5 lg:p-6">
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                          <div className="h-[96px] w-[76px] shrink-0 overflow-hidden border border-black/10 bg-white">
                            <Image src={order.image} alt={order.productName} width={76} height={96} className="h-full w-full object-cover" />
                          </div>

                          <div className="min-w-0 flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-sans">
                              <span className="min-w-0 truncate font-semibold text-black">{order.productName}</span>
                              <span className="text-foreground">Qty: {order.quantity}</span>
                              <span className="font-semibold text-black">{order.productPrice}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-sans text-foreground">
                              <span>{transaction.date}</span>
                              <span>{transaction.method}</span>
                              <span className="font-semibold text-foreground">{transaction.id}</span>
                            </div>
                          </div>
                        </div>

                        <div className="xl:shrink-0">
                          <ActionButton label="View Details" icon={FileText} tone="primary" onClick={() => { setSelectedOrderId(null); setSelectedTransactionId(transaction.id) }} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedOrder ? (
        <DetailModal
          smallLabel="Order Details"
          heading={`Order ${selectedOrder.id}`}
          order={selectedOrder}
          status={getOrderDisplayStatus(selectedOrder, cancelledOrderIds)}
          onClose={() => setSelectedOrderId(null)}
          onDownloadInvoice={handleInvoiceDownload}
          showCancelAction
          cancelDisabled={selectedOrder.status === "Delivered" || cancelledOrderIds.includes(selectedOrder.id)}
          onCancelOrder={handleCancelOrder}
        />
      ) : null}

      {selectedTransactionEntry ? (
        <DetailModal
          smallLabel="Transaction Details"
          heading={`Transaction ${selectedTransactionEntry.transaction.id}`}
          order={selectedTransactionEntry.order}
          status={getOrderDisplayStatus(selectedTransactionEntry.order, cancelledOrderIds)}
          onClose={() => setSelectedTransactionId(null)}
          onDownloadInvoice={handleInvoiceDownload}
          showCancelAction={false}
        />
      ) : null}
    </>
  )
}






















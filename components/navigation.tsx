"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import NextImage from "next/image"
import {
  Facebook,
  Instagram,
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react"
import { AUTH_EVENT, getStoredSession } from "@/lib/auth"
import { cartStore } from "@/lib/store"
import { SearchOverlay } from "@/components/search/search-overlay"
import { TopBar } from "./top-bar"

const LOGO_SRC = "/images/logo/Logo content.png"

type PrimaryLink = {
  label: string
  href: string
  isShop: boolean
}

const PRIMARY_LINKS: PrimaryLink[] = [
  { label: "Home", href: "/", isShop: false },
  { label: "Shop", href: "/shop", isShop: true },
  { label: "Our Story", href: "/our-story", isShop: false },
  { label: "Contact", href: "/contact", isShop: false },
]

const SHOP_CATEGORIES = [
  { name: "Cups and plates", image: "/images/homepage/cup-and-plates-category.png" },
  { name: "Show Pieces", image: "/images/homepage/show-pieces-category.png" },
  { name: "Masks", image: "/images/homepage/mask-category.png" },
  { name: "Carpets", image: "/images/homepage/carpet-category.png" },
  { name: "Necklaces", image: "/images/homepage/necklace-category.png" },
  { name: "Others", image: "/images/homepage/other-category.png" },
] as const

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [shopAccordionOpen, setShopAccordionOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [accountHref, setAccountHref] = useState("/login")
  const [accountLabel, setAccountLabel] = useState("Login")
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = cart.wishlist.length

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const syncSession = () => {
      const session = getStoredSession()
      setAccountHref(session ? "/my-account" : "/login")
      setAccountLabel(session ? "My Account" : "Login")
    }

    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setMenuOpen(false)
        setSearchOpen(true)
      }
    }

    syncSession()
    window.addEventListener("storage", syncSession)
    window.addEventListener(AUTH_EVENT, syncSession)
    window.addEventListener("keydown", handleShortcut)

    return () => {
      window.removeEventListener("storage", syncSession)
      window.removeEventListener(AUTH_EVENT, syncSession)
      window.removeEventListener("keydown", handleShortcut)
    }
  }, [])

  return (
    <>
      <div className="relative z-[60]">
        <TopBar />
      </div>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="relative mx-auto w-full max-w-[1440px]">
          <nav className="flex items-center justify-between px-6 py-3 lg:px-12 lg:py-4">
            <div className="flex items-center gap-6 xl:gap-12">
              <Link prefetch={false} href="/" className="transition-opacity hover:opacity-80">
                <NextImage
                  src={LOGO_SRC}
                  alt="Kraft Treasure Logo"
                  width={220}
                  height={80}
                  className="h-11 w-auto object-contain lg:h-14"
                />
              </Link>

              <div className="hidden items-center gap-4 lg:flex xl:gap-8">
                {PRIMARY_LINKS.map((item) => (
                  <div
                    key={item.label}
                    className="relative py-4"
                    onMouseEnter={() => item.isShop && setMegaMenuOpen(true)}
                    onMouseLeave={() => item.isShop && setMegaMenuOpen(false)}
                  >
                    <Link
                      prefetch={false}
                      href={item.href}
                      className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition-colors hover:text-[#E31E25]"
                      onClick={() => setMegaMenuOpen(false)}
                    >
                      {item.label}
                      {item.isShop ? (
                        <ChevronDown
                          className={`ml-0.5 h-3.5 w-3.5 transition-transform duration-300 ${megaMenuOpen ? "rotate-180" : ""}`}
                        />
                      ) : null}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="text-black transition-colors hover:text-[#E31E25]"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]" strokeWidth={1.5} />
              </button>

              <Link
                prefetch={false}
                href={accountHref}
                className="text-black transition-colors hover:text-[#E31E25]"
                aria-label={accountLabel}
              >
                <User className="h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]" strokeWidth={1.5} />
              </Link>

              <button
                type="button"
                className="relative text-black transition-colors hover:text-[#E31E25]"
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Heart className="h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]" strokeWidth={1.5} />
                {wishlistCount > 0 ? (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#E31E25] text-[9px] font-bold text-white lg:h-5 lg:w-5 lg:text-[10px]">
                    {wishlistCount}
                  </span>
                ) : null}
              </button>

              <Link
                prefetch={false}
                href="/checkout"
                className="relative text-black transition-colors hover:text-[#E31E25]"
                aria-label={`Shopping bag with ${itemCount} items`}
              >
                <ShoppingBag className="h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]" strokeWidth={1.5} />
                {itemCount > 0 ? (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#E31E25] text-[9px] font-bold text-white lg:h-5 lg:w-5 lg:text-[10px]">
                    {itemCount}
                  </span>
                ) : null}
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="text-black transition-colors hover:text-[#E31E25] lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>

          <div
            className={`absolute left-0 right-0 top-full z-[45] w-full origin-top overflow-hidden border-b border-gray-100 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 ${
              megaMenuOpen ? "visible scale-y-100 opacity-100" : "invisible scale-y-95 opacity-0"
            }`}
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <div className="mx-auto max-w-[1440px] px-12 py-12">
              <div className="grid grid-cols-6 gap-6">
                {SHOP_CATEGORIES.map((category) => (
                  <Link
                    prefetch={false}
                    key={category.name}
                    href={`/shop?category=${encodeURIComponent(category.name)}`}
                    className="group flex flex-col"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-sm bg-zinc-100">
                      <NextImage
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                    </div>
                    <h4 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">{category.name}</h4>
                    <div className="flex items-center gap-2 px-1 transition-colors group-hover:text-[#E31E25]">
                      <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-black/60 group-hover:text-[#E31E25]">
                        Explore
                      </span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] transition-all duration-700 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />

        <div
          className={`relative flex h-full flex-col px-6 pt-8 transition-transform duration-700 lg:px-20 ${
            menuOpen ? "translate-y-0" : "-translate-y-8"
          }`}
        >
          <div className="mb-12 flex items-center justify-between">
            <Link prefetch={false} href="/" onClick={() => setMenuOpen(false)}>
              <NextImage
                src={LOGO_SRC}
                alt="Kraft Treasure Logo"
                width={190}
                height={68}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="z-[70] flex items-center gap-2 text-black transition-colors hover:text-[#E31E25]"
              aria-label="Close menu"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setSearchOpen(true)
              }}
              className="inline-flex items-center justify-center border border-black/10 bg-white px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-black transition-colors duration-300 hover:border-[#E31E25] hover:text-[#E31E25]"
            >
              Search
            </button>
            <Link
              prefetch={false}
              href={accountHref}
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center border border-black/10 bg-white px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-black transition-colors duration-300 hover:border-[#E31E25] hover:text-[#E31E25]"
            >
              {accountLabel}
            </Link>
          </div>

          <nav className="flex flex-col gap-4" aria-label="Main navigation">
            {PRIMARY_LINKS.map((item) => (
              <div key={item.label}>
                {item.isShop ? (
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setShopAccordionOpen((open) => !open)}
                  >
                    <span className="flex items-center gap-2 text-xl font-serif leading-tight text-black transition-colors duration-300 group-hover:text-[#E31E25] md:text-2xl">
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${shopAccordionOpen ? "rotate-180" : "opacity-40"}`}
                      />
                    </span>
                  </button>
                ) : (
                  <Link
                    prefetch={false}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between gap-4"
                  >
                    <span className="text-xl font-serif leading-tight text-black transition-colors duration-300 group-hover:text-[#E31E25] md:text-2xl">
                      {item.label}
                    </span>
                  </Link>
                )}

                {item.isShop ? (
                  <div
                    className={`overflow-hidden pl-4 transition-all duration-500 ${
                      shopAccordionOpen ? "mt-2 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      {SHOP_CATEGORIES.map((category) => (
                        <Link
                          prefetch={false}
                          key={category.name}
                          href={`/shop?category=${encodeURIComponent(category.name)}`}
                          onClick={() => setMenuOpen(false)}
                          className="py-0.5 text-[13px] text-black/60 transition-colors hover:text-[#E31E25] md:text-sm"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="mt-auto pb-12">
            <Link
              prefetch={false}
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="group relative mb-8 inline-flex w-full items-center justify-center gap-2 overflow-hidden bg-[#D33740] py-4 text-[11px] uppercase tracking-[0.2em] text-white shadow-md transition-colors duration-500"
            >
              <span className="relative z-20">View All Products</span>
              <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
            </Link>

            <div className="mb-8 h-px w-full bg-black opacity-40" />

            <div className="flex gap-6">
              <Link prefetch={false} href="#" className="p-2 text-black transition-colors hover:text-[#E31E25]">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link prefetch={false} href="#" className="p-2 text-black transition-colors hover:text-[#E31E25]">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

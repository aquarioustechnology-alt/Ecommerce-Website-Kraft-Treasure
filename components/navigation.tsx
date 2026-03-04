"use client"

import { useState, useSyncExternalStore, useEffect } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { Menu, X, ShoppingBag, Search, Heart, User, ChevronDown, Facebook, Instagram } from "lucide-react"
import { cartStore } from "@/lib/store"
import { currencies } from "@/lib/data"

import { TopBar } from "./top-bar"

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0)
  const wishlistCount = cart.wishlist.length

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div className="relative z-[60]">
        <TopBar />
      </div>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-[1440px] mx-auto w-full">
          <nav className="flex items-center justify-between px-6 py-3 lg:px-12 lg:py-4">
            {/* Left side - Logo & Desktop Nav */}
            <div className="flex items-center gap-6 xl:gap-12">
              <Link href="/" className="transition-opacity hover:opacity-80">
                <NextImage
                  src="/images/logo/logo-transparent.png"
                  alt="Kraft Treasure Logo"
                  width={140}
                  height={55}
                  className="object-contain h-10 lg:h-12 w-auto"
                  priority
                />
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-4 xl:gap-8">
                {["Home", "Shop", "Our Story", "Contact"].map((item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase font-sans font-medium text-black hover:text-[#E31E25] transition-colors"
                  >
                    {item}
                    {item === "Shop" && <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Search */}
              <button className="text-black hover:text-[#E31E25] transition-colors" aria-label="Search">
                <Search className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" strokeWidth={1.5} />
              </button>

              {/* Login */}
              <Link href="/login" className="text-black hover:text-[#E31E25] transition-colors" aria-label="Login">
                <User className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" strokeWidth={1.5} />
              </Link>

              {/* Wishlist */}
              <button className="relative text-black hover:text-[#E31E25] transition-colors" aria-label={`Wishlist with ${wishlistCount} items`}>
                <Heart className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 lg:w-5 lg:h-5 bg-[#E31E25] text-white text-[9px] lg:text-[10px] font-sans flex items-center justify-center rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <Link
                href="/checkout"
                className="relative text-black hover:text-[#E31E25] transition-colors"
                aria-label={`Shopping bag with ${itemCount} items`}
              >
                <ShoppingBag className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 lg:w-5 lg:h-5 bg-[#E31E25] text-white text-[9px] lg:text-[10px] font-sans flex items-center justify-center rounded-full font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden text-black hover:text-[#E31E25] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-700 ${menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-background/98 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className={`relative h-full flex flex-col px-6 lg:px-20 pt-8 transition-transform duration-700 ${menuOpen ? "translate-y-0" : "-translate-y-8"}`}>
          {/* Top Bar with Logo & Close button */}
          <div className="flex items-center justify-between mb-12">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <NextImage
                src="/images/logo/logo-transparent.png"
                alt="Kraft Treasure Logo"
                width={120}
                height={45}
                className="object-contain h-8 w-auto"
              />
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-black hover:text-[#E31E25] transition-colors z-[70]"
              aria-label="Close menu"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-medium">
                Close
              </span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links - Aligned to top */}
          <nav className="flex flex-col gap-6" aria-label="Main navigation">
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Our Story", href: "/our-story" },
              { label: "Contact", href: "/contact" },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-4"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="text-3xl md:text-4xl font-serif text-black hover:text-[#E31E25] transition-colors duration-300 leading-tight capitalise flex items-center gap-2">
                  {item.label}
                  {item.label === "Shop" && <ChevronDown className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pb-12">
            {/* View All Products Button */}
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-black text-white w-full py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md mb-8"
            >
              <span className="relative z-20">View All Products</span>
              <div className="absolute inset-0 bg-[#E31E25] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
            </Link>

            {/* Divider */}
            <div className="w-full h-px bg-black opacity-40 mb-8" />

            {/* Social Icons */}
            <div className="flex gap-6">
              <Link href="#" className="text-black hover:text-[#E31E25] transition-colors p-2">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-black hover:text-[#E31E25] transition-colors p-2">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

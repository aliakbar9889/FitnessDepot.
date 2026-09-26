
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Menu,
  X,
  LogIn,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";
import { useCartWishlist } from "@/app/context/CartWishlistContext";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const { wishlist, cart } = useCartWishlist();

  const wishlistCount = wishlist?.length || 0;
  const cartCount = cart?.length || 0;

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-800 bg-black shadow-lg">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">

          {/* ================= LEFT ================= */}
          <div className="flex min-w-0 items-center gap-5 sm:gap-8 lg:gap-10">

            {/* LOGO */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex shrink-0 items-center"
            >
              <Image
                src="/logo.webp"
                alt="Fitness Depot Logo"
                width={150}
                height={50}
                priority
                className="h-auto w-[110px] object-contain sm:w-[135px] lg:w-[150px]"
              />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-5 md:flex lg:gap-7">
              <Link
                href="/"
                className="text-sm font-medium text-white transition duration-300 hover:text-yellow-400"
              >
                Home
              </Link>

              <Link
                href="/shop"
                className="text-sm font-medium text-white transition duration-300 hover:text-yellow-400"
              >
                Shop
              </Link>

              <Link
                href="/about"
                className="text-sm font-medium text-white transition duration-300 hover:text-yellow-400"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-sm font-medium text-white transition duration-300 hover:text-yellow-400"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">

            {/* DESKTOP LOGIN */}
            <SignedOut>
              <Link
                href="/sign-in"
                className="hidden items-center gap-1.5 rounded-full border border-gray-700 px-3 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black sm:flex"
              >
                <LogIn size={18} strokeWidth={1.8} />
                <span>Login</span>
              </Link>
            </SignedOut>

            {/* DESKTOP LOGOUT */}
            <SignedIn>
              <SignOutButton redirectUrl="/sign-in">
                <button
                  type="button"
                  className="hidden items-center gap-1.5 rounded-full border border-gray-700 px-3 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black sm:flex"
                >
                  <LogOut size={18} strokeWidth={1.8} />
                  <span>Logout</span>
                </button>
              </SignOutButton>
            </SignedIn>

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-white transition-all duration-300 hover:scale-110 hover:text-yellow-400"
            >
              <Heart size={21} strokeWidth={1.8} />

              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[9px] font-bold text-black">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative text-white transition-all duration-300 hover:scale-110 hover:text-yellow-400"
            >
              <ShoppingCart size={21} strokeWidth={1.8} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[9px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenu(true)}
              className="flex text-white transition-all duration-300 hover:text-yellow-400 md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenu}
            >
              <Menu size={27} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={closeMobileMenu}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-all duration-300 md:hidden ${
          mobileMenu
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* ================= MOBILE SLIDE MENU ================= */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-screen w-[82%] max-w-sm flex-col border-l border-gray-800 bg-black shadow-2xl transition-transform duration-500 ease-out md:hidden ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* MOBILE MENU HEADER */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-800 px-5">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center"
          >
            <Image
              src="/logo.webp"
              alt="Fitness Depot Logo"
              width={125}
              height={42}
              className="h-auto w-[115px] object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            className="rounded-full p-2 text-white transition-all duration-300 hover:bg-gray-800 hover:text-yellow-400"
          >
            <X size={25} strokeWidth={1.8} />
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-7">

          <div className="flex flex-col gap-2">

            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`rounded-lg px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:pl-6 hover:text-yellow-400 ${
                mobileMenu
                  ? "animate-[slideIn_0.35s_ease-out]"
                  : ""
              }`}
            >
              Home
            </Link>

            <Link
              href="/shop"
              onClick={closeMobileMenu}
              className="rounded-lg px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:pl-6 hover:text-yellow-400"
            >
              Shop
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="rounded-lg px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:pl-6 hover:text-yellow-400"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="rounded-lg px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:pl-6 hover:text-yellow-400"
            >
              Contact
            </Link>
          </div>

          {/* DIVIDER */}
          <div className="my-6 h-px bg-gray-800" />

          {/* MOBILE AUTH */}
          <div className="flex flex-col gap-2">

            {/* LOGIN */}
            <SignedOut>
              <Link
                href="/sign-in"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:text-yellow-400"
              >
                <LogIn size={20} strokeWidth={1.8} />
                Login
              </Link>
            </SignedOut>

            {/* LOGOUT */}
            <SignedIn>
              <SignOutButton redirectUrl="/sign-in">
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-base font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:text-yellow-400"
                >
                  <LogOut size={20} strokeWidth={1.8} />
                  Logout
                </button>
              </SignOutButton>
            </SignedIn>

            {/* MOBILE WISHLIST */}
            <Link
              href="/wishlist"
              onClick={closeMobileMenu}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:text-yellow-400"
            >
              <span className="flex items-center gap-3">
                <Heart size={20} strokeWidth={1.8} />
                Wishlist
              </span>

              {wishlistCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1.5 text-[10px] font-bold text-black">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* MOBILE CART */}
            <Link
              href="/cart"
              onClick={closeMobileMenu}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:text-yellow-400"
            >
              <span className="flex items-center gap-3">
                <ShoppingCart size={20} strokeWidth={1.8} />
                Cart
              </span>

              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1.5 text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* MOBILE MENU FOOTER */}
        <div className="shrink-0 border-t border-gray-800 px-5 py-5">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Fitness Depot
          </p>
        </div>
      </aside>

      {/* ================= ANIMATION ================= */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}


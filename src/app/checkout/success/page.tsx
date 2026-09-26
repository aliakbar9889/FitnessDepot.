"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartWishlist } from "@/app/context/CartWishlistContext";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartWishlist();

  return (
    <main className="flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-gray-50 px-3 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white px-5 py-8 text-center shadow-sm sm:px-8 sm:py-10">
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle
            className="h-14 w-14 text-green-500 sm:h-16 sm:w-16"
            strokeWidth={1.5}
          />
        </div>

        {/* Heading */}
        <h1 className="mt-5 text-2xl font-bold leading-tight text-gray-900 sm:mt-6 sm:text-3xl">
          Payment Successful!
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          Thank you for your purchase. Your payment was
          successfully completed.
        </p>

        {/* Button */}
        <Link
          href="/shop"
          onClick={clearCart}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:mt-7 sm:w-auto"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
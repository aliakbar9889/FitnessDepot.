"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useCartWishlist } from "@/app/context/CartWishlistContext";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
};

export default function CartPage() {
  const { cart, removeFromCart, clearCart } =
    useCartWishlist();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] =
    useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error(
          "Error fetching cart products:",
          error
        );

        toast.error("Failed to load cart products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const cartProducts = products.filter((product) =>
    cart.includes(product._id)
  );

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  const shipping =
    cartProducts.length > 0 ? 250 : 0;

  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const outOfStockProduct = cartProducts.find(
      (product) => product.stock <= 0
    );

    if (outOfStockProduct) {
      toast.error(
        `${outOfStockProduct.name} is currently out of stock`
      );
      return;
    }

    try {
      setCheckoutLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout/create-session`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            products: cartProducts,
            shipping,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to start checkout"
        );
      }

      if (!data.url) {
        throw new Error(
          "Stripe checkout URL was not returned"
        );
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to start checkout"
      );

      setCheckoutLoading(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <>
        <main className="flex min-h-[60vh] w-full items-center justify-center bg-white px-4">
          <p className="text-center text-sm font-medium text-gray-500 sm:text-lg">
            Loading cart...
          </p>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={2000}
        />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-3 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 xl:px-12">

        <div className="mx-auto w-full max-w-7xl">

          {/* ================= HEADER ================= */}
          <div className="mb-8 text-center sm:mb-12">

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow-600 sm:text-sm sm:tracking-widest">
              Your Shopping Bag
            </p>

            <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              My Cart
            </h1>

            <p className="mx-auto mt-3 max-w-2xl px-1 text-sm leading-6 text-gray-500 sm:px-0 sm:text-base sm:leading-7">
              Review the products in your cart and get
              ready to complete your purchase. Your
              selected items are waiting for you.
            </p>
          </div>

          {/* ================= EMPTY CART ================= */}
          {cartProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-14 text-center sm:px-6 sm:py-20">

              <ShoppingCart
                className="mx-auto h-12 w-12 text-gray-300 sm:h-14 sm:w-14"
                strokeWidth={1.5}
              />

              <h2 className="mt-5 text-xl font-bold text-gray-900 sm:text-2xl">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                Add some products to your cart and they
                will appear here.
              </p>

              <Link
                href="/shop"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">

              {/* ================= CART PRODUCTS ================= */}
              <div className="min-w-0 space-y-4">

                {cartProducts.map((product) => (
                  <article
                    key={product._id}
                    className="flex min-w-0 flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                  >

                    {/* ================= IMAGE ================= */}
                    <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl bg-white sm:h-32 sm:w-32">

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 639px) 100vw, 128px"
                        className="object-contain p-3"
                      />
                    </div>

                    {/* ================= DETAILS ================= */}
                    <div className="flex min-w-0 flex-1 flex-col">

                      <p className="text-xs font-medium text-yellow-600 sm:text-sm">
                        {product.category}
                      </p>

                      <h2 className="mt-1 line-clamp-2 break-words text-base font-bold leading-6 text-gray-900 sm:text-lg">
                        {product.name}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {product.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">

                        <p className="text-base font-bold text-gray-900 sm:text-lg">
                          Rs.{" "}
                          {product.price.toLocaleString()}
                        </p>

                        <p
                          className={`text-sm font-medium ${
                            product.stock > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </p>
                      </div>
                    </div>

                    {/* ================= REMOVE ================= */}
                    <button
                      type="button"
                      onClick={() => {
                        removeFromCart(product._id);

                        toast.info(
                          "Removed from cart"
                        );
                      }}
                      aria-label={`Remove ${product.name} from cart`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full bg-red-50 text-red-500 transition hover:bg-red-100 sm:self-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </article>
                ))}

                {/* ================= CLEAR CART ================= */}
                <div className="flex justify-start pt-1 sm:justify-end">

                  <button
                    type="button"
                    onClick={() => {
                      clearCart();

                      toast.info(
                        "Cart cleared"
                      );
                    }}
                    className="w-full rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 sm:w-auto"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* ================= ORDER SUMMARY ================= */}
              <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">

                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-4 text-sm sm:mt-6">

                  {/* Subtotal */}
                  <div className="flex items-center justify-between gap-4 text-gray-600">

                    <span>Subtotal</span>

                    <span className="font-medium text-gray-900">
                      Rs.{" "}
                      {subtotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between gap-4 text-gray-600">

                    <span>Shipping</span>

                    <span className="font-medium text-gray-900">
                      Rs.{" "}
                      {shipping.toLocaleString()}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-100 pt-4">

                    <div className="flex items-center justify-between gap-4 text-lg font-bold text-gray-900">

                      <span>Total</span>

                      <span>
                        Rs.{" "}
                        {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= CHECKOUT ================= */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="mt-6 w-full rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {checkoutLoading
                    ? "Redirecting to Checkout..."
                    : "Proceed to Checkout"}
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-gray-400">
                  You will be redirected to Stripe&apos;s
                  secure checkout page.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>

      {/* ================= TOAST ================= */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}


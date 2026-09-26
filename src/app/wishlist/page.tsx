
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { wishlist, removeFromWishlist } = useCartWishlist();

  useEffect(() => {
    const getWishlistProducts = async () => {
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

        const wishlistProducts = data.products.filter(
          (product: Product) => wishlist.includes(product._id)
        );

        setProducts(wishlistProducts);
      } catch (error) {
        console.error("Wishlist error:", error);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    getWishlistProducts();
  }, [wishlist]);

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);

    setProducts((previousProducts) =>
      previousProducts.filter(
        (product) => product._id !== productId
      )
    );

    toast.info("Removed from wishlist");
  };

  if (loading) {
    return (
      <>
        <main className="flex min-h-[60vh] w-full items-center justify-center bg-white px-4">
          <p className="text-center text-sm font-medium text-gray-500 sm:text-base">
            Loading wishlist...
          </p>
        </main>

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
        />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-3 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-7xl">

          {/* Wishlist Header */}
          <div className="mb-8 text-center sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow-600 sm:text-sm sm:tracking-widest">
              Your Favorites
            </p>

            <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              My Wishlist
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Save your favorite fitness equipment in one place
              and easily find the products you want to purchase
              later.
            </p>
          </div>

          {/* Empty Wishlist */}
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-14 text-center sm:px-6 sm:py-20">
              <Heart
                className="mx-auto h-12 w-12 text-gray-300 sm:h-14 sm:w-14"
                strokeWidth={1.5}
              />

              <h2 className="mt-5 text-xl font-bold text-gray-900 sm:text-2xl">
                Your wishlist is empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                Add your favorite products to your wishlist and
                they will appear here.
              </p>

              <Link
                href="/shop"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="w-full space-y-4 sm:space-y-5">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="flex w-full flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                >
                  {/* Product Image */}
                  <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl bg-white sm:h-32 sm:w-32">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 639px) 100vw, 128px"
                      className="object-contain p-3"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-yellow-600">
                      {product.category}
                    </p>

                    <h2 className="mt-1 line-clamp-2 text-base font-bold leading-6 text-gray-900 sm:text-lg">
                      {product.name}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                      {product.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <p className="text-base font-bold text-gray-900 sm:text-lg">
                        Rs. {product.price.toLocaleString()}
                      </p>

                      <p
                        className={`text-xs font-medium sm:text-sm ${
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

                  {/* Remove Button */}
                  <div className="flex w-full justify-end sm:w-auto sm:shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFromWishlist(product._id)
                      }
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 size={17} />
                      <span>Remove</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <ToastContainer
        position="bottom-right"
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


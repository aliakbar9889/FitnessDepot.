"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Eye, X } from "lucide-react";
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
  isFitness: boolean;
};

export default function FitnessEquipmentPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const { wishlist, toggleWishlist, addToCart } =
    useCartWishlist();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const fitnessProducts = products.filter(
    (product) => product.isFitness === true
  );

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <>
        <main className="flex min-h-[60vh] w-full items-center justify-center px-4">
          <p className="text-center text-sm font-medium text-gray-500 sm:text-lg">
            Loading Fitness Equipment...
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

        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-8 w-full max-w-7xl text-center sm:mb-12">

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-yellow-600 sm:text-sm sm:tracking-[0.25em]">
            Train Stronger
          </p>

          <h1 className="px-1 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Fitness Equipment
          </h1>

          <p className="mx-auto mt-3 max-w-2xl px-1 text-sm leading-6 text-gray-500 sm:mt-4 sm:px-0 sm:text-base sm:leading-7">
            Explore our premium fitness equipment designed to improve
            endurance, burn calories, and help you achieve your fitness goals.
          </p>
        </div>

        {/* ================= PRODUCTS ================= */}
        {fitnessProducts.length > 0 ? (
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">

            {fitnessProducts.map((product) => {
              const isWishlisted = wishlist.includes(
                product._id
              );

              return (
                <article
                  key={product._id}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* ================= IMAGE ================= */}
                  <div className="group relative aspect-square w-full shrink-0 overflow-hidden bg-gray-100 sm:aspect-[4/3] lg:aspect-square">

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                      className="bg-white object-contain p-3 transition-transform duration-500 group-hover:scale-105 sm:p-4"
                    />

                    {/* Eye Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                        aria-label={`View ${product.name}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-110 hover:bg-gray-100 sm:h-12 sm:w-12"
                      >
                        <Eye
                          size={20}
                          className="sm:h-[22px] sm:w-[22px]"
                        />
                      </button>
                    </div>

                    {/* Wishlist */}
                    <button
                      type="button"
                      onClick={() => {
                        const wasWishlisted =
                          wishlist.includes(product._id);

                        toggleWishlist(product._id);

                        if (wasWishlisted) {
                          toast.info(
                            "Removed from wishlist"
                          );
                        } else {
                          toast.success(
                            "Added to wishlist ❤️"
                          );
                        }
                      }}
                      aria-label={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
                    >
                      <Heart
                        size={18}
                        className={
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-800"
                        }
                      />
                    </button>
                  </div>

                  {/* ================= CONTENT ================= */}
                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">

                    {/* Category */}
                    <p className="text-xs font-medium text-yellow-600 sm:text-sm">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <h2 className="mt-2 line-clamp-2 min-h-[44px] text-base font-bold leading-6 text-gray-900 sm:min-h-[56px] sm:text-xl sm:leading-7">
                      {product.name}
                    </h2>

                    {/* Description */}
                    <p className="mt-3 line-clamp-3 min-h-[66px] text-sm leading-6 text-gray-500 sm:min-h-[72px]">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-2 sm:mt-4">

                      <span className="text-lg text-yellow-500">
                        ★
                      </span>

                      <span className="text-sm font-medium text-gray-700">
                        {product.rating || "No rating"}
                      </span>
                    </div>

                    {/* ================= PRICE + CART ================= */}
                    <div className="mt-auto flex min-w-0 items-end justify-between gap-3 border-t border-gray-100 pt-4 sm:pt-5">

                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">
                          Price
                        </p>

                        <p className="truncate text-base font-bold text-gray-900 sm:text-xl">
                          Rs.{" "}
                          {product.price.toLocaleString()}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={product.stock <= 0}
                        onClick={() => {
                          addToCart(product._id);

                          toast.success(
                            "Added to cart 🛒"
                          );
                        }}
                        className="flex shrink-0 items-center gap-1.5 rounded-xl bg-black px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 sm:gap-2 sm:px-4 sm:py-3"
                      >
                        <ShoppingCart size={16} />

                        {product.stock <= 0
                          ? "Out of Stock"
                          : "Add"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-16 text-center sm:py-24">

            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              No Fitness Equipment Found
            </h2>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Add products with{" "}
              <code className="rounded bg-gray-100 px-1">
                isFitness: true
              </code>{" "}
              in MongoDB.
            </p>
          </div>
        )}
      </main>

      {/* =====================================================
          PRODUCT MODAL
      ===================================================== */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 px-2 py-3 backdrop-blur-[2px] sm:items-center sm:px-4 sm:py-6"
          onClick={() => setSelectedProduct(null)}
        >

          {/* Modal */}
          <div
            className="relative my-auto w-full max-w-[340px] overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[92vh] sm:max-w-2xl sm:overflow-y-auto md:max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
              className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 shadow-md transition hover:bg-gray-200 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
            >
              <X size={19} />
            </button>

            {/* ================= MODAL CONTENT ================= */}
            <div className="grid min-w-0 grid-cols-1 md:grid-cols-2">

              {/* ================= PRODUCT IMAGE ================= */}
              <div className="relative h-[190px] w-full shrink-0 bg-white sm:h-[300px] md:h-[430px]">

                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain p-4 sm:p-7 md:p-8"
                />
              </div>

              {/* ================= PRODUCT DETAILS ================= */}
              <div className="flex min-w-0 flex-col p-4 sm:p-7 md:justify-center md:p-10">

                {/* Category */}
                <p className="pr-8 text-xs font-semibold uppercase tracking-wide text-yellow-600 sm:text-sm">
                  {selectedProduct.category}
                </p>

                {/* Product Name */}
                <h2 className="mt-2 break-words pr-8 text-xl font-bold leading-tight text-gray-900 sm:mt-3 sm:text-2xl md:text-3xl">
                  {selectedProduct.name}
                </h2>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2 sm:mt-4">

                  <span className="text-lg text-yellow-500">
                    ★
                  </span>

                  <span className="text-sm font-medium text-gray-700">
                    {selectedProduct.rating ||
                      "No rating"}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 max-h-[110px] overflow-y-auto break-words pr-1 text-sm leading-6 text-gray-500 sm:mt-5 sm:max-h-none sm:pr-0 sm:text-base sm:leading-7">
                  {selectedProduct.description}
                </p>

                {/* Price */}
                <div className="mt-4 border-t border-gray-100 pt-4 sm:mt-6 sm:pt-5">

                  <p className="text-xs text-gray-400">
                    Price
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Rs.{" "}
                    {selectedProduct.price.toLocaleString()}
                  </p>
                </div>

                {/* Stock */}
                <p
                  className={`mt-2 text-sm font-medium sm:mt-3 ${
                    selectedProduct.stock > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedProduct.stock > 0
                    ? `${selectedProduct.stock} items available`
                    : "Currently out of stock"}
                </p>

                {/* Add To Cart */}
                <button
                  type="button"
                  disabled={
                    selectedProduct.stock <= 0
                  }
                  onClick={() => {
                    addToCart(selectedProduct._id);

                    toast.success(
                      "Added to cart 🛒"
                    );
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 sm:mt-7 sm:py-3.5"
                >
                  <ShoppingCart size={18} />

                  {selectedProduct.stock <= 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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


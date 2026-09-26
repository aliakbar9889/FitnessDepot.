"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  X,
  Star,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isFitness: boolean;
};

export default function PromoProductSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const { cart, addToCart } = useCartWishlist();

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

        const fitnessProducts = (data.products || []).filter(
          (product: Product) => product.isFitness === true
        );

        setProducts(fitnessProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const slideRight = () => {
    sliderRef.current?.scrollBy({
      left: 280,
      behavior: "smooth",
    });
  };

  const slideLeft = () => {
    sliderRef.current?.scrollBy({
      left: -280,
      behavior: "smooth",
    });
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error("This product is currently out of stock");
      return;
    }

    if (cart.includes(product._id)) {
      toast.info(`${product.name} is already in your cart`);
      return;
    }

    addToCart(product._id);

    toast.success(`${product.name} added to cart`);

    setSelectedProduct(null);
  };

  const eightyPercentCount = Math.ceil(products.length * 0.8);

  const displayedProducts = showAll
    ? products
    : products.slice(0, eightyPercentCount);

  if (loading) {
    return (
      <section className="flex min-h-[320px] w-full items-center justify-center bg-gray-50 px-4 sm:min-h-[420px]">
        <p className="text-sm text-gray-500 sm:text-base">
          Loading products...
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="w-full overflow-hidden bg-white px-3 py-8 sm:px-5 sm:py-10 md:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">

          <div className="relative h-[340px] overflow-hidden rounded-2xl sm:h-[380px] lg:h-full lg:min-h-[380px]">
            <Image
              src="/products/pic1.avif"
              alt="Premium Gym Accessories"
              fill
              sizes="(max-width: 1024px) 100vw, 300px"
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-6">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-xs sm:tracking-[0.25em]">
                Fitness Equipments
              </p>

              <h2 className="max-w-[280px] text-2xl font-bold leading-tight sm:text-3xl">
                Upgrade Your Workout
              </h2>

              <p className="mt-3 max-w-[330px] text-xs leading-5 text-white/80 sm:text-sm sm:leading-6">
                Discover premium gym fitness accessories designed
                to take your training to the next level.
              </p>

              <Link
                href="/cardio"
                className="mt-5 flex w-fit items-center gap-2 border border-white bg-white/10 px-4 py-2.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-white hover:text-black sm:px-5 sm:py-3 sm:text-sm"
              >
                <ShoppingBag size={16} />
                Shop Now
              </Link>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 sm:text-xs sm:tracking-[0.25em]">
                  Fitness Equipments
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  Latest Products
                </h2>
              </div>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <Link
                  href="/cardio"
                  className="flex h-10 flex-1 items-center justify-center rounded-full border border-gray-200 px-4 text-xs font-medium transition hover:bg-black hover:text-white sm:w-32 sm:flex-none sm:text-sm md:w-36"
                >
                  View All
                </Link>

                <button
                  type="button"
                  onClick={slideLeft}
                  aria-label="Previous products"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 transition hover:bg-black hover:text-white"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={slideRight}
                  aria-label="Next products"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 transition hover:bg-black hover:text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {displayedProducts.length > 0 ? (
              <div
                ref={sliderRef}
                className="flex w-full gap-3 overflow-x-auto scroll-smooth pb-4 sm:gap-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {displayedProducts.map((product) => (
                  <article
                    key={product._id}
                    className="group w-[175px] shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-[210px] md:w-[220px]"
                  >
                    <div className="relative h-[155px] w-full overflow-hidden bg-white sm:h-[180px] md:h-[190px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 175px, (max-width: 768px) 210px, 220px"
                        className="object-contain p-2.5 transition duration-500 group-hover:scale-105 sm:p-3"
                      />
                    </div>

                    <div className="p-3 sm:p-4">
                      <p className="truncate text-[10px] text-gray-400 sm:text-xs">
                        {product.category}
                      </p>

                      <h3 className="mt-1 line-clamp-2 min-h-[32px] text-sm font-bold leading-4 text-gray-900 sm:min-h-[40px] sm:text-base sm:leading-5">
                        {product.name}
                      </h3>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                          Rs. {product.price.toLocaleString()}
                        </p>

                        <button
                          type="button"
                          onClick={() => openProductModal(product)}
                          className="shrink-0 text-[10px] font-semibold text-gray-500 transition hover:text-black sm:text-xs"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[220px] items-center justify-center rounded-xl bg-gray-50 px-4 sm:min-h-[300px]">
                <p className="text-center text-sm text-gray-500">
                  No fitness products found.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-2 backdrop-blur-[2px] sm:p-4"
          onClick={closeProductModal}
        >
          <div
            className="relative my-auto max-h-[92vh] w-full max-w-[420px] overflow-y-auto overflow-x-hidden rounded-xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-2xl md:max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeProductModal}
              aria-label="Close product details"
              className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-gray-100 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
            >
              <X size={20} />
            </button>

            <div className="grid min-w-0 grid-cols-1 md:grid-cols-2">
              <div className="relative h-[200px] w-full bg-white sm:h-[300px] md:h-[450px]">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain p-4 sm:p-7 md:p-8"
                />
              </div>

              <div className="flex min-w-0 flex-col p-4 sm:p-7 md:justify-center md:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-yellow-600 sm:text-sm">
                  {selectedProduct.category}
                </p>

                <h2 className="mt-2 break-words text-lg font-bold leading-tight text-gray-900 sm:text-2xl md:text-3xl">
                  {selectedProduct.name}
                </h2>

                <div className="mt-2 flex items-center gap-2 sm:mt-4">
                  <Star className="fill-yellow-400 text-yellow-400" size={17} />

                  <span className="text-xs font-medium text-gray-700 sm:text-sm">
                    {selectedProduct.rating || "No rating"}
                  </span>
                </div>

                <p className="mt-3 break-words text-xs leading-5 text-gray-600 sm:mt-5 sm:text-base sm:leading-7">
                  {selectedProduct.description}
                </p>

                <div className="mt-4 sm:mt-6">
                  <p className="text-[10px] text-gray-400 sm:text-sm">
                    Price
                  </p>

                  <p className="text-lg font-bold text-gray-900 sm:text-2xl">
                    Rs. {selectedProduct.price.toLocaleString()}
                  </p>
                </div>

                <div className="mt-2 sm:mt-4">
                  <p
                    className={`text-xs font-medium sm:text-sm ${
                      selectedProduct.stock > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedProduct.stock > 0
                      ? `${selectedProduct.stock} items available`
                      : "Currently out of stock"}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={selectedProduct.stock <= 0}
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 sm:mt-7 sm:py-3.5"
                >
                  <ShoppingCart size={17} />

                  {selectedProduct.stock <= 0
                    ? "Out of Stock"
                    : cart.includes(selectedProduct._id)
                    ? "Already in Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2200}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        toastClassName="text-sm"
      />
    </>
  );
}


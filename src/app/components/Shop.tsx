
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  ShoppingCart,
  Star,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
};

type Tab = "featured" | "new" | "bestSeller";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("featured");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [pulsedId, setPulsedId] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Cart / Wishlist Context
  const { cart, addToCart } = useCartWishlist();

  // Fetch Products
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
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Filter Products
  const filteredProducts = products.filter((product) => {
    if (activeTab === "featured") {
      return product.isFeatured;
    }

    if (activeTab === "new") {
      return product.isNew;
    }

    if (activeTab === "bestSeller") {
      return product.isBestSeller;
    }

    return true;
  });

  // Tabs
  const tabs: { id: Tab; label: string }[] = [
    {
      id: "featured",
      label: "Featured",
    },
    {
      id: "new",
      label: "New Products",
    },
    {
      id: "bestSeller",
      label: "Best Sellers",
    },
  ];

  // Check Slider Position
  const handleScroll = () => {
    if (sliderRef.current) {
      setShowLeftArrow(sliderRef.current.scrollLeft > 10);
    }
  };

  // Slider Right
  const slideRight = () => {
    sliderRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  // Slider Left
  const slideLeft = () => {
    sliderRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  // Change Tab + Reset Slider
  const handleTabChange = (tabId: Tab) => {
    if (tabId === activeTab) return;

    setActiveTab(tabId);

    setTimeout(() => {
      sliderRef.current?.scrollTo({
        left: 0,
        behavior: "smooth",
      });

      setShowLeftArrow(false);
    }, 0);
  };

  // Wishlist Toggle
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    setPulsedId(productId);

    setTimeout(() => setPulsedId(null), 320);
  };

  // Add To Cart
  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error(`${product.name} is currently out of stock`);
      return;
    }

    if (cart.includes(product._id)) {
      toast.info(`${product.name} is already in your cart`);
      return;
    }

    addToCart(product._id);

    toast.success(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Open Modal
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  // Close Modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Loading State
  if (loading) {
    return (
      <main className="flex min-h-[500px] w-full max-w-full items-center justify-center overflow-hidden bg-white px-4">
        <div className="flex w-full max-w-7xl gap-4 overflow-hidden sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[500px] w-[175px] min-w-[175px] animate-pulse overflow-hidden rounded-2xl bg-gray-100 sm:h-[520px] sm:w-[210px] sm:min-w-[210px] lg:w-[280px] lg:min-w-[280px]"
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="h-64 w-full bg-gray-200 sm:h-72" />

              <div className="space-y-3 px-4 py-4 sm:px-5">
                <div className="h-3 w-1/3 rounded bg-gray-200" />
                <div className="h-5 w-2/3 rounded bg-gray-200" />
                <div className="h-3 w-full rounded bg-gray-200" />
                <div className="h-3 w-4/5 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="w-full max-w-full animate-fade-in overflow-hidden bg-white py-10 sm:px-6 sm:py-12 lg:px-12 lg:py-16">

        {/* Tabs */}
        <div className="mx-auto mb-8 w-full max-w-7xl overflow-x-auto border-b border-gray-200 sm:mb-10">
          <div className="flex min-w-max justify-center gap-5 px-2 sm:gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`relative whitespace-nowrap pb-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300 sm:pb-4 sm:text-sm ${
                  activeTab === tab.id
                    ? "text-yellow-500"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.label}

                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-yellow-500 transition-transform duration-300 ease-out ${
                    activeTab === tab.id
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Products Slider */}
        {filteredProducts.length > 0 ? (
          <div className="relative mx-auto w-full min-w-0 max-w-7xl">

            {/* Left Arrow */}
            <button
              type="button"
              onClick={slideLeft}
              aria-label="Previous products"
              className={`absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white active:scale-95 sm:left-0 sm:h-12 sm:w-12 ${
                showLeftArrow
                  ? "pointer-events-auto opacity-100 sm:-translate-x-1/2"
                  : "pointer-events-none -translate-x-2 opacity-0"
              }`}
            >
              <ChevronLeft size={20} className="sm:h-6 sm:w-6" />
            </button>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={slideRight}
              aria-label="Next products"
              className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white active:scale-95 sm:right-0 sm:h-12 sm:w-12 sm:translate-x-1/2"
            >
              <ChevronRight size={20} className="sm:h-6 sm:w-6" />
            </button>

            {/* Slider */}
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="flex w-full max-w-full gap-3 overflow-x-auto overflow-y-hidden scroll-smooth px-2 pb-5 snap-x snap-mandatory sm:gap-5 sm:px-3 sm:pb-6 lg:gap-6"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {filteredProducts.map((product, index) => {
                const isWishlisted = wishlist.includes(product._id);
                const isPulsing = pulsedId === product._id;
                const isOutOfStock = product.stock <= 0;
                const isInCart = cart.includes(product._id);

                return (
                  <article
                    key={product._id}
                    className="group relative flex h-[470px] w-[175px] min-w-[175px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white opacity-0 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-yellow-100 animate-card-in sm:h-[500px] sm:w-[210px] sm:min-w-[210px] lg:h-[520px] lg:w-[280px] lg:min-w-[280px] xl:w-[300px] xl:min-w-[300px]"
                    style={{
                      animationDelay: `${Math.min(index, 8) * 70}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {/* Product Image */}
                    <div className="group relative h-56 shrink-0 overflow-hidden bg-gray-100 sm:h-64 lg:h-72">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 639px) 175px, (max-width: 1023px) 210px, (max-width: 1279px) 280px, 300px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Black Hover Overlay + Eye */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => openProductModal(product)}
                          aria-label={`View ${product.name}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-xl transition-all duration-300 hover:scale-110 hover:bg-gray-100 active:scale-95 sm:h-12 sm:w-12"
                        >
                          <Eye
                            size={19}
                            className="sm:h-[22px] sm:w-[22px]"
                          />
                        </button>
                      </div>

                      {/* Wishlist */}
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product._id)}
                        aria-label={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 active:scale-90 sm:right-4 sm:top-4 sm:h-11 sm:w-11 ${
                          isWishlisted
                            ? "translate-x-0 opacity-100"
                            : "translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        } ${
                          isPulsing ? "animate-heart-pulse" : ""
                        }`}
                      >
                        <Heart
                          size={18}
                          className={`transition-colors duration-300 sm:h-[21px] sm:w-[21px] ${
                            isWishlisted
                              ? "fill-red-500 text-red-500"
                              : "text-gray-800"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Product Content */}
                    <div className="mb-3 flex flex-1 flex-col px-3 py-3 sm:mb-5 sm:px-5 sm:py-4">
                      <p className="truncate text-xs text-gray-500 sm:text-sm">
                        {product.category}
                      </p>

                      <h2 className="mt-1 line-clamp-1 text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-yellow-600 sm:text-xl">
                        {product.name}
                      </h2>

                      <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-gray-600 sm:min-h-[48px] sm:text-sm sm:leading-6">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="mt-3 flex items-center gap-1.5 sm:mt-4 sm:gap-2">
                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400 sm:h-[18px] sm:w-[18px]"
                        />

                        <span className="text-xs font-medium text-gray-700 sm:text-sm">
                          {product.rating || "No rating"}
                        </span>
                      </div>

                      {/* Price + Button */}
                      <div className="mb-1 mt-auto flex flex-col gap-2 border-t border-gray-100 py-2 sm:mb-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-500 sm:text-xs">
                            Price
                          </p>

                          <p className="truncate text-base font-bold text-gray-900 sm:text-xl">
                            Rs. {product.price.toLocaleString()}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          disabled={isOutOfStock}
                          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-black px-2.5 py-2 text-[10px] font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                        >
                          <ShoppingCart
                            size={14}
                            className="sm:h-[17px] sm:w-[17px]"
                          />

                          {isOutOfStock
                            ? "Unavailable"
                            : isInCart
                            ? "In Cart"
                            : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in px-4 py-16 text-center sm:py-20">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              No Products Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              No products are available in this category.
            </p>
          </div>
        )}
      </main>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 px-2 py-3 sm:items-center sm:px-4 sm:py-6"
          onClick={closeProductModal}
        >
          <div
            className="relative my-auto max-h-[95vh] w-full max-w-[340px] overflow-x-hidden overflow-y-auto rounded-2xl bg-white shadow-2xl animate-modal-in sm:max-w-2xl md:max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeProductModal}
              aria-label="Close product details"
              className="absolute right-2 top-2 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all duration-300 hover:scale-110 hover:bg-gray-100 active:scale-95 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Modal Image */}
              <div className="relative h-[220px] w-full bg-gray-100 sm:h-[350px] md:h-[430px]">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain bg-white p-4 sm:p-6"
                />

                {/* Stock Badge */}
                <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:py-1.5 sm:text-xs ${
                      selectedProduct.stock > 0
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {selectedProduct.stock > 0
                      ? `${selectedProduct.stock} in stock`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex min-w-0 flex-col justify-center p-4 sm:p-8">

                {/* Category */}
                <p className="text-xs font-semibold uppercase tracking-wider text-yellow-600 sm:text-sm">
                  {selectedProduct.category}
                </p>

                {/* Product Name */}
                <h2 className="mt-2 break-words text-xl font-bold leading-tight text-gray-900 sm:mt-3 sm:text-3xl">
                  {selectedProduct.name}
                </h2>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2 sm:mt-4">
                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-xs font-medium text-gray-700 sm:text-sm">
                    {selectedProduct.rating || "No rating"}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 max-h-[110px] overflow-y-auto text-sm leading-6 text-gray-600 sm:mt-5 sm:max-h-none sm:text-base sm:leading-7">
                  {selectedProduct.description}
                </p>

                {/* Price */}
                <div className="mt-5 sm:mt-6">
                  <p className="text-xs text-gray-400 sm:text-sm">
                    Price
                  </p>

                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Rs. {selectedProduct.price.toLocaleString()}
                  </p>
                </div>

                {/* Stock */}
                <div className="mt-3 sm:mt-4">
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

                {/* Add To Cart */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(selectedProduct)}
                  disabled={selectedProduct.stock <= 0}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 sm:mt-7 sm:py-3.5"
                >
                  <ShoppingCart size={18} />

                  {selectedProduct.stock <= 0
                    ? "Out of Stock"
                    : cart.includes(selectedProduct._id)
                    ? "In Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastStyle={{
          fontSize: "14px",
          borderRadius: "12px",
        }}
      />

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes card-in {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes heart-pulse {
          0% {
            transform: scale(1);
          }

          40% {
            transform: scale(1.35);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out both;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.4s ease-out both;
        }

        .animate-card-in {
          animation: card-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-heart-pulse {
          animation: heart-pulse 0.32s ease-out;
        }

        .animate-modal-in {
          animation: modal-in 0.25s ease-out both;
        }
      `}</style>
    </>
  );
}


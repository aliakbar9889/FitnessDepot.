"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Eye,
  X,
  Star,
} from "lucide-react";
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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const { wishlist, toggleWishlist, addToCart } =
    useCartWishlist();

  // Fetch all products
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
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Wishlist toggle with correct message
  const handleWishlist = (productId: string) => {
    const wasWishlisted = wishlist.includes(productId);

    toggleWishlist(productId);

    if (wasWishlisted) {
      toast.info("Removed from wishlist");
    } else {
      toast.success("Added to wishlist ❤️");
    }
  };

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    addToCart(product._id);
    toast.success("Added to cart 🛒");
  };

  if (loading) {
    return (
      <>
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <p className="text-center text-lg font-medium text-gray-500">
            Loading Products...
          </p>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-7xl text-center sm:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-600 sm:text-sm sm:tracking-[0.25em]">
            Premium Fitness Store
          </p>

          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Shop All Products
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            Explore our complete collection of premium gym and
            fitness equipment designed to help you achieve your
            fitness goals.
          </p>
        </div>

        {/* Product Count */}
        <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {products.length}
            </span>{" "}
            Products
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const isWishlisted = wishlist.includes(product._id);
              const isOutOfStock = product.stock <= 0;

              return (
                <article
                  key={product._id}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Product Image */}
                  <div className="group relative aspect-square w-full shrink-0 overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                      className="object-contain bg-white p-3 transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Stock Badge */}
                    <div className="absolute left-3 top-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isOutOfStock
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {isOutOfStock
                          ? "Out of Stock"
                          : `${product.stock} in stock`}
                      </span>
                    </div>

                    {/* Image Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        aria-label={`View ${product.name}`}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-110 hover:bg-gray-100"
                      >
                        <Eye size={22} />
                      </button>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => handleWishlist(product._id)}
                      aria-label={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
                    >
                      <Heart
                        size={20}
                        className={
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-800"
                        }
                      />
                    </button>
                  </div>

                  {/* Product Content */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-xs font-semibold text-yellow-600 sm:text-sm">
                      {product.category}
                    </p>

                    <h2 className="mt-2 line-clamp-2 min-h-[48px] text-lg font-bold leading-6 text-gray-900 sm:min-h-[56px] sm:text-xl sm:leading-7">
                      {product.name}
                    </h2>

                    <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-gray-500">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-2">
                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        {product.rating || "No rating"}
                      </span>
                    </div>

                    {/* Price and Cart */}
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-gray-100 pt-5">
                      <div>
                        <p className="text-xs text-gray-400">
                          Price
                        </p>

                        <p className="text-lg font-bold text-gray-900 sm:text-xl">
                          Rs. {product.price.toLocaleString()}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() => handleAddToCart(product)}
                        className="flex shrink-0 items-center gap-2 rounded-xl bg-black px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 sm:px-4 sm:py-3"
                      >
                        <ShoppingCart size={17} />
                        {isOutOfStock ? "Unavailable" : "Add"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center sm:py-24">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              No Products Found
            </h2>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Products will appear here once they are added.
            </p>
          </div>
        )}
      </main>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-gray-100"
            >
              <X size={22} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Modal Image */}
              <div className="relative min-h-[280px] bg-gray-100 md:min-h-[420px]">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain bg-white p-6"
                />
              </div>

              {/* Modal Content */}
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-yellow-600">
                  {selectedProduct.category}
                </p>

                <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                  {selectedProduct.name}
                </h2>

                <div className="mt-4 flex items-center gap-2">
                  <Star
                    size={19}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {selectedProduct.rating || "No rating"}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
                  {selectedProduct.description}
                </p>

                <div className="mt-6">
                  <p className="text-sm text-gray-400">Price</p>

                  <p className="text-2xl font-bold text-gray-900">
                    Rs. {selectedProduct.price.toLocaleString()}
                  </p>
                </div>

                <div className="mt-4">
                  <p
                    className={`text-sm font-medium ${
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
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  <ShoppingCart size={19} />
                  {selectedProduct.stock <= 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
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
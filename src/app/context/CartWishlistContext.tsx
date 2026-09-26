"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartWishlistContextType = {
  cart: string[];
  wishlist: string[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearCart: () => void;
  clearWishlist: () => void;
};

const CartWishlistContext = createContext<
  CartWishlistContextType | undefined
>(undefined);

export function CartWishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorage se data load karo
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (
          Array.isArray(parsedCart) &&
          parsedCart.every((id) => typeof id === "string")
        ) {
          setCart(parsedCart);
        }
      }

      if (savedWishlist) {
        const parsedWishlist: unknown = JSON.parse(savedWishlist);

        if (
          Array.isArray(parsedWishlist) &&
          parsedWishlist.every((id) => typeof id === "string")
        ) {
          setWishlist(parsedWishlist);
        }
      }
    } catch (error) {
      console.error("Error loading cart/wishlist:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Cart save karo
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  // Wishlist save karo
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  // Cart mein product add karo
  const addToCart = (productId: string) => {
    setCart((previousCart) => {
      if (previousCart.includes(productId)) {
        return previousCart;
      }

      return [...previousCart, productId];
    });
  };

  // Cart se product remove karo
  const removeFromCart = (productId: string) => {
    setCart((previousCart) =>
      previousCart.filter((id) => id !== productId)
    );
  };

  // Wishlist mein add/remove karo
  const toggleWishlist = (productId: string) => {
    setWishlist((previousWishlist) => {
      if (previousWishlist.includes(productId)) {
        return previousWishlist.filter((id) => id !== productId);
      }

      return [...previousWishlist, productId];
    });
  };

  // Wishlist se product remove karo
  const removeFromWishlist = (productId: string) => {
    setWishlist((previousWishlist) =>
      previousWishlist.filter((id) => id !== productId)
    );
  };

  // Complete cart clear karo
  const clearCart = () => {
    setCart([]);
  };

  // Complete wishlist clear karo
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        toggleWishlist,
        removeFromWishlist,
        clearCart,
        clearWishlist,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  const context = useContext(CartWishlistContext);

  if (!context) {
    throw new Error(
      "useCartWishlist must be used inside CartWishlistProvider"
    );
  }

  return context;
}
import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  // Load initial wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("aurelia_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage whenever wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem("aurelia_wishlist", JSON.stringify(wishlist));
    } catch (err) {
      console.log("Failed to persist wishlist:", err.message);
    }
  }, [wishlist]);

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    if (!productId) return false;
    return wishlist.some((item) => (item._id || item.id) === productId);
  };

  // Add item to wishlist
  const addToWishlist = (product) => {
    if (!product || isInWishlist(product._id || product.id)) return;
    const itemToAdd = {
      _id: product._id || product.id,
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      images: product.images || [product.image],
      image: product.image || product.images?.[0] || "",
      category: product.category,
      sizes: product.sizes || ["S", "M", "L", "XL"],
    };
    setWishlist((prev) => [itemToAdd, ...prev]);
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prev) =>
      prev.filter((item) => (item._id || item.id) !== productId)
    );
  };

  // Toggle item in/out of wishlist
  const toggleWishlist = (product) => {
    const id = product._id || product.id;
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
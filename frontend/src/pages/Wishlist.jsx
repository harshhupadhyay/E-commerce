import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
} from "lucide-react";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState({});

  const handleMoveToBag = (product) => {
    const defaultSize = product.sizes?.[0] || "M";
    addToCart(product, defaultSize, false);
    removeFromWishlist(product._id || product.id);
  };

  const handleMoveAllToBag = () => {
    wishlist.forEach((product) => {
      const defaultSize = product.sizes?.[0] || "M";
      addToCart(product, defaultSize, false);
    });
    clearWishlist();
    navigate("/bag");
  };

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#201a15] pb-24">
      {/* 1. TOP BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pt-4 sm:pt-8 pb-3 sm:pb-4 border-b border-[#ede0d7] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-sans-luxury tracking-[0.2em] uppercase text-[#7c766f]">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-[#121110] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Exploring</span>
          </Link>
          <span>/</span>
          <span className="text-[#121110] font-medium">Curated Wishlist</span>
        </div>
        <span className="text-[#72252e] font-semibold">
          {wishlistCount} {wishlistCount === 1 ? "Saved Piece" : "Saved Pieces"}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pt-4 sm:pt-8">
        {/* 2. EDITORIAL PAGE TITLE & ACTIONS */}
        <div className="flex items-end justify-between pb-4 sm:pb-6 border-b border-[#ede0d7] flex-wrap gap-3">
          <div>
            <span className="font-sans-luxury text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#9e7d47] font-semibold block mb-0.5">
              Private Client Selection
            </span>
            <h1 className="font-editorial text-xl sm:text-2xl md:text-4xl text-[#121110] tracking-tight">
              Saved Silhouettes
            </h1>
          </div>

          {wishlistCount > 0 && (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={clearWishlist}
                className="px-3 py-1.5 sm:px-4 sm:py-2 border border-[#ede0d7] text-[#7c766f] hover:text-[#ba1a1a] hover:border-[#ba1a1a] transition-colors text-[10px] sm:text-xs font-sans-luxury uppercase tracking-wider cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={handleMoveAllToBag}
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#121110] text-white hover:bg-[#72252e] transition-colors text-[10.5px] sm:text-xs font-sans-luxury uppercase tracking-widest font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. EMPTY STATE */}
        {wishlistCount === 0 ? (
          <div className="py-12 sm:py-20 text-center max-w-sm sm:max-w-md mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f9ece2] flex items-center justify-center mx-auto mb-3.5 border border-[#ede0d7]">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#9e7d47] stroke-[1.25]" />
            </div>
            <h2 className="font-editorial text-base sm:text-lg md:text-2xl text-[#121110] mb-1.5">
              Your Wishlist is Empty
            </h2>
            <p className="text-[11px] sm:text-xs font-sans-luxury text-[#7c766f] mb-6 leading-relaxed max-w-sm mx-auto">
              Explore our Autumn / Winter collection and save tailored blazers, virgin wool trench coats, and Italian leather accessories by clicking the heart icon on any piece.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-[#121110] text-white text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#72252e] transition-colors shadow-sm"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        ) : (
          /* 4. WISHLIST PRODUCT GRID */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 mt-8">
            {wishlist.map((item) => {
              const id = item._id || item.id;
              const isAdded = addedItems[id];
              const imageSrc =
                item.image ||
                item.images?.[0] ||
                "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600";

              return (
                <div key={id} className="group flex flex-col relative select-none">
                  {/* Photo Container */}
                  <div className="relative w-full aspect-[3/4] bg-[#f9ece2] overflow-hidden rounded border border-[#ede0d7]/70 block">
                    <Link to={`/products/${id}`} className="block w-full h-full">
                      <img
                        src={imageSrc}
                        alt={item.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromWishlist(id)}
                      title="Remove from Wishlist"
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#fff8f4]/90 backdrop-blur-md flex items-center justify-center text-[#72252e] shadow-xs active:scale-90 transition-all z-10 hover:bg-[#ba1a1a] hover:text-white cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Meta Information */}
                  <div className="mt-3 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-sans-luxury uppercase tracking-widest text-[#7c766f] font-semibold truncate block">
                        {item.category || "Atelier Silhouette"}
                      </span>
                      <Link
                        to={`/products/${id}`}
                        className="font-editorial text-sm md:text-base font-medium text-[#121110] mt-0.5 group-hover:text-[#72252e] transition-colors truncate block"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#ede0d7] flex items-center justify-between gap-2">
                      <span className="font-sans-luxury text-sm font-bold text-[#121110]">
                        ₹{item.price?.toLocaleString()}
                      </span>

                      {/* Move to Bag Button */}
                      <button
                        onClick={() => handleMoveToBag(item)}
                        className="px-3 py-1.5 text-[11px] font-sans-luxury uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 bg-[#121110] text-white hover:bg-[#72252e]"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
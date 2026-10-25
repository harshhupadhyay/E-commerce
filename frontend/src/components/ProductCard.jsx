import React, { useState } from "react";
import { Link } from "react-router";
import { Heart, Plus, Check } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const isLiked = isInWishlist(product._id);

  const primaryImage = product.images?.[0] || "";
  const secondaryImage = product.images?.[1] || primaryImage;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] || "M";
    addToCart(product, defaultSize, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Determine badge type
  const isCampaignExclusive = product.price > 6000;
  const isLimited = product.stock <= 5;

  return (
    <article
      className="group flex flex-col relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3:4 High-Fashion Photo Container */}
      <div className="relative w-full aspect-[3/4] bg-[#f9ece2] overflow-hidden rounded border border-[#ede0d7]/70 block">
        {/* Clickable Image Link */}
        <Link to={`/products/${product._id}`} className="block w-full h-full">
          {/* Main Photo (Angle 1) */}
          <img
            src={primaryImage}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
              isHovered && secondaryImage !== primaryImage
                ? "opacity-0 scale-105"
                : "opacity-100 scale-100"
            }`}
            loading="lazy"
          />

          {/* Hover Alternate Angle (Angle 2) */}
          {secondaryImage && secondaryImage !== primaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Campaign Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {isAdmin && (
            <span className="bg-[#121110] text-white px-2 py-0.5 rounded text-[9px] font-sans-luxury uppercase tracking-wider font-bold shadow-xs">
              Stock: {product.stock} pcs
            </span>
          )}
          {isLimited ? (
            <span className="bg-[#72252e] text-white px-2 py-0.5 rounded text-[9px] font-sans-luxury uppercase tracking-widest font-bold shadow-xs">
              Limited Edition
            </span>
          ) : isCampaignExclusive ? (
            <span className="bg-[#fff8f4]/90 backdrop-blur-md text-[#121110] px-2 py-0.5 rounded text-[9px] font-sans-luxury uppercase tracking-widest font-semibold border border-[#ede0d7]">
              Haute Édition
            </span>
          ) : (
            <span className="bg-[#fff8f4]/90 backdrop-blur-md text-[#121110] px-2 py-0.5 rounded text-[9px] font-sans-luxury uppercase tracking-widest font-semibold border border-[#ede0d7]">
              New In
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleLike}
          aria-label="Save to Wishlist"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#fff8f4]/85 backdrop-blur-md flex items-center justify-center text-[#201a15] shadow-xs active:scale-90 transition-all z-10 hover:text-[#72252e]"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? "fill-[#72252e] text-[#72252e]" : "text-[#201a15]"
            }`}
          />
        </button>

        {/* Quick Add To Bag Button */}
        <button
          onClick={handleQuickAdd}
          aria-label="Quick add to bag"
          title="Quick Add to Bag"
          className={`absolute bottom-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#121110] text-white shadow-md flex items-center justify-center transition-all duration-300 z-10 hover:scale-105 active:scale-95 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-90 sm:opacity-0 translate-y-0 sm:translate-y-2"
          } ${added ? "bg-[#059669]" : "hover:bg-[#72252e]"}`}
        >
          {added ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
      </div>

      {/* Meta Information */}
      <div className="mt-2.5 sm:mt-3 flex flex-col flex-1">
        {/* Category tag */}
        <span className="text-[9.5px] sm:text-[10px] font-sans-luxury uppercase tracking-widest text-[#7c766f] font-semibold truncate">
          {product.category}
        </span>

        {/* Product Title */}
        <Link
          to={`/products/${product._id}`}
          className="font-sans-luxury text-[10.5px] sm:text-xs md:text-[13px] font-semibold text-[#201a15] hover:text-[#72252e] transition-colors truncate mt-0.5 block"
        >
          {product.name}
        </Link>

        {/* Price & Available Sizes */}
        <div className="mt-0.5 sm:mt-1 flex items-baseline justify-between gap-1 flex-wrap">
          <span className="font-sans-luxury text-[11px] sm:text-xs md:text-sm font-bold text-[#201a15]">
            ₹{product.price}
          </span>

          <span className="text-[8.5px] sm:text-[9.5px] uppercase font-sans-luxury tracking-wider text-[#7c766f] truncate max-w-[100px] sm:max-w-none">
            {Array.isArray(product.sizes) ? product.sizes.slice(0, 3).join(" • ") : product.sizes}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

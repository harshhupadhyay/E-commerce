import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { resolveImageUrl } from "../utils/imageUrl";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { X, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight, Heart } from "lucide-react";
import gsap from "gsap";

const CartDrawer = () => {
  const {
    cart,
    totalItems,
    totalPrice,
    clearCart,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const { addToWishlist } = useWishlist();

  const handleMoveToWishlist = (item) => {
    addToWishlist({
      _id: item.id,
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      images: [item.image],
      category: item.category,
      sizes: [item.size],
    });
    removeFromCart(item.id, item.size);
  };

  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen && (!drawerRef.current || drawerRef.current.style.transform === "translateX(100%)")) {
    // Keep rendered for smooth entrance/exit animations
  }

  const freeShippingThreshold = 2500;
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isDrawerOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
      }`}
    >
      {/* Dim Backdrop with blur */}
      <div
        ref={backdropRef}
        onClick={() => setIsDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 transition-opacity"
      />

      {/* Slide-Over Drawer */}
      <div
        ref={drawerRef}
        style={{ transform: "translateX(100%)" }}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-[#fff8f4] shadow-2xl flex flex-col z-10 border-l border-[#ede0d7]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#ede0d7] flex items-center justify-between bg-[#fef1e8]/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#201a15]" />
            <h2 className="font-editorial text-xl uppercase tracking-wider text-[#201a15]">
              Shopping Bag
            </h2>
            <span className="text-[11px] font-sans-luxury uppercase tracking-widest bg-[#ede0d7] text-[#201a15] px-2 py-0.5 rounded-full font-semibold">
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close bag"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#4b4640] hover:text-[#201a15] hover:bg-[#ede0d7]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Milestone */}
        <div className="px-5 py-3.5 bg-[#fef1e8] border-b border-[#ede0d7]">
          <div className="flex items-center justify-between text-xs font-sans-luxury uppercase tracking-wider mb-1.5">
            <span className="flex items-center gap-1.5 font-semibold text-[#72252e]">
              <CheckCircle className="w-3.5 h-3.5" />
              {progressPercent >= 100
                ? "Complimentary Global Courier Unlocked"
                : `Add ₹${freeShippingThreshold - totalPrice} for Free Shipping`}
            </span>
            <span className="text-[#4b4640]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1 bg-[#ede0d7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#72252e] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#4b4640]">
              <div className="w-16 h-16 rounded-full bg-[#ede0d7]/70 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-[#7c766f]" />
              </div>
              <p className="font-editorial text-lg text-[#201a15] mb-1">Your bag is empty</p>
              <p className="text-xs font-sans-luxury text-[#7c766f] max-w-[220px] mb-6">
                Explore our curated silhouettes and add pieces to your collection.
              </p>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-6 py-2.5 bg-[#121110] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#72252e] transition-colors"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 p-3 bg-white rounded border border-[#ede0d7] shadow-xs relative group"
              >
                {/* Photo Thumbnail */}
                <div className="w-20 h-26 shrink-0 bg-[#f9ece2] rounded overflow-hidden">
                  <img
                    src={resolveImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#7c766f] font-semibold truncate">
                        {item.category || "Atelier Silhouette"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleMoveToWishlist(item)}
                          className="text-[#7c766f] hover:text-[#72252e] p-0.5 transition-colors cursor-pointer"
                          title="Save to Wishlist & remove from Bag"
                        >
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-[#7c766f] hover:text-[#ba1a1a] p-0.5 transition-colors cursor-pointer"
                          title="Remove from Bag"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-editorial text-sm font-semibold text-[#201a15] truncate mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#7c766f] mt-0.5">
                      Size: <span className="font-medium text-[#201a15]">{item.size}</span>
                    </p>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-end justify-between mt-2 pt-1">
                    <span className="font-sans-luxury font-semibold text-sm text-[#201a15]">
                      ₹{item.price * item.quantity}
                    </span>

                    <div className="flex items-center bg-[#f9ece2] rounded border border-[#ede0d7]">
                      <button
                        onClick={() => decreaseQuantity(item.id, item.size)}
                        className="w-6 h-6 flex items-center justify-center text-[#201a15] hover:text-[#72252e] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#201a15] min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id, item.size)}
                        className="w-6 h-6 flex items-center justify-center text-[#201a15] hover:text-[#72252e] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#ede0d7] bg-[#fef1e8]/50 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#4b4640]">
              <span>Estimated Shipping &amp; Duties</span>
              <span className="text-[#72252e] font-semibold">Included</span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="font-editorial text-lg text-[#201a15]">Total Bill</span>
              <span className="font-sans-luxury text-xl font-bold text-[#201a15]">
                ₹{totalPrice}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <Link
                to="/bag"
                onClick={() => setIsDrawerOpen(false)}
                className="flex-1 py-3 text-center border border-[#121110] text-[#121110] text-xs uppercase tracking-widest font-semibold hover:bg-[#121110] hover:text-white transition-colors"
              >
                View Full Bag
              </Link>
              <Link
                to="/bag"
                onClick={() => setIsDrawerOpen(false)}
                className="flex-1 py-3 bg-[#121110] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#72252e] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

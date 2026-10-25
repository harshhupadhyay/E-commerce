import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import { resolveImageUrl } from "../utils/imageUrl";
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  ShieldCheck,
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Check,
  Building,
  Heart,
} from "lucide-react";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();

  const { addToWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Packaging and Delivery states
  const [giftPackaging, setGiftPackaging] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState("express"); // "express" | "whiteglove"
  const [paymentMethod, setPaymentMethod] = useState("upi"); // "upi" | "card" | "cod"

  // Delivery Destination Form ("Where we want to deliver etc etc")
  const [deliveryAddress, setDeliveryAddress] = useState({
    recipientName: user?.name || "Harshita Upadhyay",
    phoneNumber: "+91 98765 43210",
    streetAddress: "Penthouse 14B, Aurelia Sky Residences, 24th Road",
    landmark: "Near Linking Road",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400050",
    country: "India",
    specialInstructions: "Leave with building reception concierge if unattended.",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("");

  const freeShippingThreshold = 2500;
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);
  const deliverySurcharge = deliveryMethod === "whiteglove" ? 500 : 0;
  const finalTotal = totalPrice + deliverySurcharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = `AN-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);
    setOrderPlaced(true);
    clearCart();
  };

  // ORDER CONFIRMED VIEW
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#fff8f4] py-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto bg-white border border-[#ede0d7] p-8 md:p-12 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center mx-auto mb-4 border border-[#a5d6a7]">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#9e7d47] font-semibold block mb-1">
            Order Confirmed &amp; Dispatched
          </span>
          <h1 className="font-editorial text-3xl md:text-4xl text-[#121110] mb-2">
            Consignment #{confirmedOrderId}
          </h1>
          <p className="text-xs font-sans-luxury text-[#7c766f] max-w-md mx-auto mb-8">
            Thank you for choosing Aurelia &amp; Noir. Your garments are being hand-steamed and encased in archival packaging at our Milan atelier.
          </p>

          {/* Delivery Recap Card */}
          <div className="text-left bg-[#fdfaf7] border border-[#ede0d7] p-5 mb-8 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#ede0d7] text-xs font-sans-luxury uppercase tracking-wider text-[#121110] font-bold">
              <MapPin className="w-4 h-4 text-[#72252e]" />
              <span>Delivery Destination</span>
            </div>

            <div className="text-xs font-sans-luxury text-[#4b4640] space-y-1">
              <p className="font-semibold text-[#121110]">
                {deliveryAddress.recipientName} ({deliveryAddress.phoneNumber})
              </p>
              <p>{deliveryAddress.streetAddress}</p>
              <p>
                {deliveryAddress.landmark && `${deliveryAddress.landmark}, `}
                {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.postalCode}
              </p>
              <p className="font-medium text-[#7c766f]">{deliveryAddress.country}</p>
            </div>

            <div className="pt-2 border-t border-[#ede0d7] flex items-center justify-between text-xs font-sans-luxury">
              <span className="text-[#7c766f]">Delivery Mode:</span>
              <span className="font-semibold text-[#121110]">
                {deliveryMethod === "whiteglove"
                  ? "Next-Day White-Glove Atelier Courier"
                  : "Express Air Courier (2-3 Business Days)"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-sans-luxury">
              <span className="text-[#7c766f]">Payment Mode:</span>
              <span className="font-semibold uppercase text-[#121110]">
                {paymentMethod === "upi"
                  ? "Instant UPI / QR"
                  : paymentMethod === "card"
                  ? "Credit Card Verified"
                  : "Cash on Delivery"}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/profile"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#121110] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#72252e] transition-colors"
            >
              View Client Dossier
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#ede0d7] text-[#121110] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors"
            >
              Continue Exploring
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#201a15] pb-24">
      {/* 1. TOP BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pt-4 sm:pt-8 pb-3 sm:pb-4 border-b border-[#ede0d7] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-sans-luxury tracking-[0.2em] uppercase text-[#7c766f]">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 hover:text-[#121110] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
        <span className="text-[#121110] font-semibold">
          Shopping Bag ({totalItems} {totalItems === 1 ? "Piece" : "Pieces"})
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pt-4 sm:pt-8">
        {/* 2. PAGE HEADER */}
        <div className="flex items-baseline justify-between pb-4 sm:pb-6 border-b border-[#ede0d7]">
          <div>
            <span className="font-sans-luxury text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#9e7d47] font-semibold block mb-0.5">
              Atelier Dispatch &amp; Checkout
            </span>
            <h1 className="font-editorial text-xl sm:text-2xl md:text-4xl text-[#121110] tracking-tight">
              Shopping Bag
            </h1>
          </div>
        </div>

        {/* 3. EMPTY BAG STATE */}
        {cart.length === 0 ? (
          <div className="py-12 sm:py-20 text-center max-w-sm sm:max-w-md mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f9ece2] flex items-center justify-center mx-auto mb-3.5 border border-[#ede0d7]">
              <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-[#7c766f]" />
            </div>
            <h2 className="font-editorial text-base sm:text-lg md:text-2xl text-[#121110] mb-1.5">
              Your Bag is Currently Empty
            </h2>
            <p className="text-[11px] sm:text-xs font-sans-luxury text-[#7c766f] mb-6 leading-relaxed">
              Explore our curated Autumn / Winter runway collection to discover tailored virgin wools, cashmere knitwear, and architectural outerwear.
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
          /* 4. MAIN BAG & DELIVERY GRID */
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
            {/* Left Column: Items carried in Bag & Delivery Destination */}
            <div className="lg:col-span-8 space-y-8">
              {/* Milestone Banner */}
              <div className="p-4 bg-[#fef1e8] border border-[#ede0d7]">
                <div className="flex items-center justify-between text-xs font-sans-luxury uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5 font-bold text-[#72252e]">
                    <CheckCircle className="w-4 h-4" />
                    {progressPercent >= 100
                      ? "Complimentary Worldwide Express Courier Unlocked"
                      : `Add ₹${(freeShippingThreshold - totalPrice).toLocaleString()} for Free Express Delivery`}
                  </span>
                  <span className="text-[#4b4640] font-semibold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#ede0d7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#72252e] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#7c766f] mt-2 flex items-center justify-between">
                  <span>Carbon-neutral dispatch from Milan &amp; European ateliers</span>
                  <span className="font-semibold text-[#121110]">Estimated Delivery: 2-3 Days</span>
                </p>
              </div>

              {/* LIST OF ITEMS CARRIED IN BAG */}
              <div>
                <span className="font-sans-luxury text-[11px] uppercase tracking-[0.25em] text-[#72252e] font-semibold block mb-3">
                  Garments Carried in Bag ({totalItems})
                </span>

                <div className="divide-y divide-[#ede0d7] border border-[#ede0d7] bg-white">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="p-5 flex gap-4 md:gap-6 items-start"
                    >
                      {/* Photo */}
                      <Link
                        to={`/products/${item.id}`}
                        className="w-22 h-28 md:w-26 md:h-34 shrink-0 bg-[#f9ece2] overflow-hidden border border-[#ede0d7]"
                      >
                        <img
                          src={resolveImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] uppercase font-sans-luxury tracking-widest text-[#7c766f] font-semibold truncate">
                              {item.category || "Atelier Silhouette"}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleMoveToWishlist(item)}
                                className="text-[#7c766f] hover:text-[#72252e] p-1 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-sans-luxury"
                                title="Save to Wishlist & remove from Bag"
                              >
                                <Heart className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Save for Later</span>
                              </button>
                              <span className="text-[#ede0d7]">|</span>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-[#7c766f] hover:text-[#ba1a1a] p-1 transition-colors cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <Link
                            to={`/products/${item.id}`}
                            className="font-editorial text-base md:text-lg text-[#121110] hover:text-[#72252e] transition-colors mt-0.5 truncate block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs font-sans-luxury text-[#7c766f] mt-1">
                            Size: <span className="font-semibold text-[#121110]">{item.size}</span>
                          </p>
                        </div>

                        {/* Stepper & Price */}
                        <div className="flex items-end justify-between mt-4 pt-2 border-t border-[#f9ece2]">
                          <div className="flex items-center bg-[#f9ece2] border border-[#ede0d7]">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id, item.size)}
                              className="w-7 h-7 flex items-center justify-center text-[#121110] hover:text-[#72252e] transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold font-sans-luxury text-[#121110] min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id, item.size)}
                              className="w-7 h-7 flex items-center justify-center text-[#121110] hover:text-[#72252e] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-sans-luxury text-base font-bold text-[#121110]">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Packaging Toggle */}
              <div className="p-4 bg-white border border-[#ede0d7] flex items-start gap-3.5">
                <input
                  id="gift"
                  type="checkbox"
                  checked={giftPackaging}
                  onChange={(e) => setGiftPackaging(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#121110] cursor-pointer"
                />
                <label htmlFor="gift" className="text-xs text-[#4b4640] cursor-pointer leading-relaxed">
                  <strong className="block text-[#121110] uppercase tracking-wider text-[11px] font-bold">
                    Signature Atelier Gift Packaging (Complimentary)
                  </strong>
                  Encased in archival acid-free tissue paper, tied with dark grosgrain ribbon, and enclosed in a reusable rigid cotton canvas garment tote.
                </label>
              </div>

              {/* ============================================================= */}
              {/* DELIVERY DESTINATION ("Where we want to deliver etc etc") */}
              {/* ============================================================= */}
              <div className="border border-[#ede0d7] bg-white p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-[#ede0d7]">
                  <MapPin className="w-4 h-4 text-[#72252e]" />
                  <span className="font-sans-luxury text-[11px] uppercase tracking-[0.25em] text-[#121110] font-bold">
                    Delivery Destination &amp; Concierge Address
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Recipient Name */}
                  <div>
                    <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1 font-medium">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      required
                      value={deliveryAddress.recipientName}
                      onChange={handleInputChange}
                      placeholder="e.g. Harshita Upadhyay"
                      className="w-full bg-[#fff8f4] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1 font-medium">
                      Phone Number (For Delivery SMS) *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={deliveryAddress.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#fff8f4] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                    />
                  </div>

                  {/* Street Address */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1 font-medium">
                      Delivery Street Address (House / Apartment / Suite) *
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      required
                      value={deliveryAddress.streetAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. Penthouse 14B, Aurelia Sky Residences, 24th Road"
                      className="w-full bg-[#fff8f4] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                    />
                  </div>

                  {/* Area / Landmark */}
                  <div>
                    <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1 font-medium">
                      Landmark / Area
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={deliveryAddress.landmark}
                      onChange={handleInputChange}
                      placeholder="e.g. Near Linking Road"
                      className="w-full bg-[#fff8f4] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1 font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={deliveryAddress.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className="w-full bg-[#fff8f4] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1 font-medium">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={deliveryAddress.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Maharashtra"
                      className="w-full bg-[#fff8f4] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                    />
                  </div>

                  {/* Postal / PIN code */}
                  <div>
                    <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1 font-medium">
                      Postal Code / PIN *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={deliveryAddress.postalCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 400050"
                      className="w-full bg-[#fff8f4] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                    />
                  </div>

                  {/* Country */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1 font-medium">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={deliveryAddress.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#fff8f4] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110] cursor-pointer"
                    >
                      <option value="India">India</option>
                      <option value="Italy">Italy (Milano Atelier Hub)</option>
                      <option value="France">France (Paris Faubourg)</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                    </select>
                  </div>

                  {/* Special Instructions */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1 font-medium">
                      Delivery &amp; Concierge Instructions
                    </label>
                    <input
                      type="text"
                      name="specialInstructions"
                      value={deliveryAddress.specialInstructions}
                      onChange={handleInputChange}
                      placeholder="e.g. Leave with building security, signature required"
                      className="w-full bg-[#fff8f4] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                    />
                  </div>
                </div>

                {/* Delivery Mode Choice */}
                <div className="pt-4 border-t border-[#ede0d7] space-y-3">
                  <span className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] font-semibold">
                    Select Delivery Courier Method
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                      onClick={() => setDeliveryMethod("express")}
                      className={`p-4 border cursor-pointer transition-all flex items-start gap-3 ${
                        deliveryMethod === "express"
                          ? "border-[#121110] bg-[#fff8f4]"
                          : "border-[#ede0d7] bg-white opacity-80"
                      }`}
                    >
                      <Truck className="w-4 h-4 text-[#72252e] shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#121110]">
                            Express Air Courier
                          </span>
                          <span className="text-xs font-semibold text-[#059669]">Free</span>
                        </div>
                        <p className="text-[11px] text-[#7c766f] mt-0.5">
                          Direct dispatch • Estimated 2-3 business days
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setDeliveryMethod("whiteglove")}
                      className={`p-4 border cursor-pointer transition-all flex items-start gap-3 ${
                        deliveryMethod === "whiteglove"
                          ? "border-[#121110] bg-[#fff8f4]"
                          : "border-[#ede0d7] bg-white opacity-80"
                      }`}
                    >
                      <Building className="w-4 h-4 text-[#9e7d47] shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#121110]">
                            White-Glove Atelier
                          </span>
                          <span className="text-xs font-semibold text-[#121110]">₹500</span>
                        </div>
                        <p className="text-[11px] text-[#7c766f] mt-0.5">
                          Personal courier • Hand-delivered in garment bag
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Payment Mode */}
            <div className="lg:col-span-4">
              <div className="p-6 bg-white border border-[#ede0d7] shadow-sm space-y-6 sticky top-28">
                <h2 className="font-editorial text-xl text-[#121110] uppercase tracking-wider pb-3 border-b border-[#ede0d7]">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs font-sans-luxury text-[#4b4640]">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold text-[#121110]">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Global Express Shipping</span>
                    <span className="text-[#059669] font-semibold">
                      {deliveryMethod === "whiteglove" ? "₹500 (White Glove)" : "Complimentary"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signature Archival Packaging</span>
                    <span className="text-[#059669] font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duties &amp; Import Taxes</span>
                    <span className="text-[#72252e] font-semibold">Included</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-[#ede0d7] flex items-baseline justify-between">
                  <span className="font-editorial text-lg text-[#121110]">Total Due</span>
                  <span className="font-sans-luxury text-2xl font-bold text-[#121110]">
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3 pt-2">
                  <span className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] font-semibold">
                    Payment Preference
                  </span>

                  <div className="space-y-2">
                    {[
                      { id: "upi", label: "Instant UPI / QR Code", icon: QrCode },
                      { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                      { id: "cod", label: "Cash on Delivery", icon: Banknote },
                    ].map((pm) => {
                      const Icon = pm.icon;
                      const isSel = paymentMethod === pm.id;
                      return (
                        <div
                          key={pm.id}
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                            isSel
                              ? "border-[#121110] bg-[#fff8f4] font-semibold text-[#121110]"
                              : "border-[#ede0d7] text-[#4b4640] hover:border-[#121110]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-xs font-sans-luxury">
                            <Icon className="w-4 h-4 text-[#72252e]" />
                            <span>{pm.label}</span>
                          </div>
                          {isSel && <Check className="w-3.5 h-3.5 text-[#121110]" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#121110] text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#72252e] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                >
                  <span>Complete Order &amp; Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#7c766f]">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                  <span>256-Bit Encrypted Atelier Checkout</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;
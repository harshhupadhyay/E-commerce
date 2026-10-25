import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import {
  User,
  MapPin,
  Package,
  Heart,
  Sparkles,
  ChevronRight,
  X,
  Shield,
  LogOut,
  Phone,
  Mail,
  Award,
  Clock,
  ArrowRight,
  Check,
  Edit2,
  Calendar,
  Compass,
  ShoppingBag,
} from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const { cart, totalItems } = useCart();
  const navigate = useNavigate();

  // Active view modal / drawer: null | "personal" | "addresses" | "orders" | "privileges" | "appointments"
  const [activeModal, setActiveModal] = useState(null);

  // Editable personal info state
  const [userName, setUserName] = useState(user?.name || "Harshita");
  const [userPhone, setUserPhone] = useState("+91 98765 43210");
  const [infoSaved, setInfoSaved] = useState(false);

  // Saved addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Primary Residence",
      name: user?.name || "Harshita",
      line1: "Penthouse 14B, Aurelia Residences",
      city: "Bandra West, Mumbai",
      state: "Maharashtra",
      postal: "400050",
      country: "India",
      isDefault: true,
    },
    {
      id: 2,
      type: "Milan Atelier Suite",
      name: user?.name || "Harshita",
      line1: "Via Monte Napoleone 8, Int. 4",
      city: "Milano",
      state: "Lombardia",
      postal: "20121",
      country: "Italy",
      isDefault: false,
    },
  ]);

  // Sample archival orders
  const [orders] = useState([
    {
      id: "AN-ORD-9281",
      date: "21 October 2026",
      status: "In Tailoring at Milan Atelier",
      statusColor: "text-[#9e7d47] bg-[#ffdeac]/30 border-[#9e7d47]/40",
      total: 28400,
      items: [
        {
          name: "The Sculpted Double-Breasted Trench",
          fabric: "Italian Virgin Wool & Mulberry Silk",
          size: "IT 42",
          price: 28400,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDTNU_PwBusw0UfvQpQYjCx1uOlscvn71iO-0VvxctnoDEspcjGojCBhUtNgskADLEChVlNtOA06qZ8qwphDhNEGuSpUuEizGWQOdBpTop2W8P8wXaG6OvKZu6aRp9QdqB7eCAdP47tyshDfrMphevoPa_bnxIezZX1_6zFW1bTF1Xl-NG8176zRZGebQtNpNXgCsDNeT_3Avnn0OFET75C6ZmPOwrFPqjjtWcWQPP0597n7yWuDrzfrw",
        },
      ],
    },
    {
      id: "AN-ORD-8812",
      date: "08 September 2026",
      status: "Delivered via Express Courier",
      statusColor: "text-[#2e7d32] bg-[#e8f5e9] border-[#a5d6a7]",
      total: 19500,
      items: [
        {
          name: "Merino Ribbed Funnel Knit",
          fabric: "Heather Oatmeal 100% Merino",
          size: "IT 40",
          price: 19500,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCgeU64rHU-Ceelmh8oCsVFFeeI8UVt1Sw0ztgCX-QxGtF4jncVK0S7dRLsdWKxRzuZwOCWTA92RvfNmtkRwnmW5PHjwzJAsCnV9PJe4r1xf5B1C0k2ld3QUILjdSgAbJcXTgEmrtHpAPZo3SltRq5sG_6oKWX4GwoWv5seESiY3UEVwm7dRwS3Q_EzgRJnfOyWANh_BWUeD2-4z9GyETPvmYNYvtwa6y-efFc9ua3U5ViCte5fko8m_A",
        },
      ],
    },
  ]);

  const handleSaveInfo = (e) => {
    e.preventDefault();
    setInfoSaved(true);
    setTimeout(() => {
      setInfoSaved(false);
      setActiveModal(null);
    }, 1200);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#201a15] pb-24">
      {/* 1. TOP EDITORIAL BREADCRUMB */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 pt-4 sm:pt-8 pb-3 sm:pb-4 border-b border-[#ede0d7] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-sans-luxury tracking-[0.2em] uppercase text-[#7c766f]">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-[#121110] transition-colors">
            Aurelia &amp; Noir
          </Link>
          <span>/</span>
          <span className="text-[#121110] font-medium">Private Client Dossier</span>
        </div>
        <span className="text-[#9e7d47] font-semibold">Tier I Member</span>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 pt-4 sm:pt-8 space-y-6 sm:space-y-10">
        {/* 2. HERO DOSSIER MEMBERSHIP BANNER (Inspired by Snitch layout, Haute Edition luxury) */}
        <div className="relative overflow-hidden border border-[#ede0d7] bg-[#121110] text-[#fff8f4] grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          {/* Left Column: Client Welcome & Editorial Portrait */}
          <div className="lg:col-span-6 p-5 sm:p-8 md:p-10 flex flex-col justify-between relative z-10 bg-gradient-to-r from-[#121110] via-[#121110]/95 to-transparent">
            <div>
              <span className="font-sans-luxury text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#9e7d47] block mb-1.5 font-medium">
                Private Client Dossier
              </span>
              <h1 className="font-editorial text-2xl sm:text-3xl md:text-5xl text-white tracking-wide">
                Welcome, {user?.name || "Client"}
              </h1>
              <p className="font-sans-luxury text-[11px] sm:text-xs text-[#a8a199] mt-1 sm:mt-2 tracking-wider">
                ID: #AN-{user?._id?.slice(-4).toUpperCase() || "7842"} • Member Since 2026
              </p>
            </div>

            <div className="pt-4 sm:pt-6">
              <span className="inline-block px-2.5 py-1 sm:px-3 sm:py-1 bg-[#fff8f4]/10 text-[#ede0d7] text-[9px] sm:text-[10px] font-sans-luxury uppercase tracking-[0.2em] sm:tracking-[0.25em] border border-white/20">
                Aurelia Atelier Circle • Active
              </span>
            </div>
          </div>

          {/* Right Column: Privilege Status & Unlock Progress (Inspired by SNITCHX) */}
          <div className="lg:col-span-6 p-5 sm:p-8 md:p-10 bg-[#1d1b1a] border-t lg:border-t-0 lg:border-l border-[#2d2a28] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-sans-luxury text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#9e7d47] font-semibold">
                  Membership Tier
                </span>
                <p className="font-editorial text-lg sm:text-xl md:text-2xl text-white mt-1">
                  Atelier Haute Circle
                </p>
              </div>
              <button
                onClick={() => setActiveModal("privileges")}
                className="px-3 py-1.5 bg-white text-[#121110] hover:bg-[#9e7d47] hover:text-white transition-colors text-[10px] font-sans-luxury uppercase tracking-widest font-semibold cursor-pointer"
              >
                View Benefits
              </button>
            </div>

            {/* Progress bar */}
            <div className="pt-6">
              <div className="flex items-center justify-between text-xs font-sans-luxury text-[#ede0d7] mb-2 tracking-wide">
                <span>Current Tier I: Express Global Dispatch</span>
                <span className="text-[#9e7d47] font-medium">Tier II at ₹50,000</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#9e7d47] to-[#e7c184] transition-all duration-700"
                  style={{ width: "68%" }}
                ></div>
              </div>
              <p className="font-sans-luxury text-[11px] text-[#a8a199] mt-2">
                Spend <strong className="text-white">₹16,100</strong> to unlock Private Milan Concierge &amp; Bespoke Hemming.
              </p>
            </div>
          </div>
        </div>

        {/* 3. GROUPED DIRECTORY SECTIONS (Inspired by SNITCH structure) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SECTION A: CLIENT ACCOUNT */}
          <div className="space-y-3">
            <span className="font-sans-luxury text-[11px] uppercase tracking-[0.25em] text-[#72252e] font-semibold block px-1">
              Account Dossier
            </span>

            <div className="bg-white border border-[#ede0d7] divide-y divide-[#ede0d7]">
              {/* Personal Information */}
              <button
                onClick={() => setActiveModal("personal")}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-[#fff8f4] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <User className="w-4 h-4 text-[#7c766f] group-hover:text-[#121110] transition-colors" />
                  <div>
                    <span className="font-sans-luxury text-xs uppercase tracking-[0.16em] text-[#121110] font-medium block">
                      Personal Information
                    </span>
                    <span className="font-sans-luxury text-[11px] text-[#7c766f]">
                      {user?.name || "Client"} • {user?.email}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#cdc5bd] group-hover:text-[#121110] group-hover:translate-x-1 transition-all" />
              </button>

              {/* Saved Addresses */}
              <button
                onClick={() => setActiveModal("addresses")}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-[#fff8f4] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <MapPin className="w-4 h-4 text-[#7c766f] group-hover:text-[#121110] transition-colors" />
                  <div>
                    <span className="font-sans-luxury text-xs uppercase tracking-[0.16em] text-[#121110] font-medium block">
                      Saved Shipping Addresses
                    </span>
                    <span className="font-sans-luxury text-[11px] text-[#7c766f]">
                      {addresses.length} Concierge Locations on record
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#cdc5bd] group-hover:text-[#121110] group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* SECTION B: COMMERCE & ARCHIVE */}
          <div className="space-y-3">
            <span className="font-sans-luxury text-[11px] uppercase tracking-[0.25em] text-[#72252e] font-semibold block px-1">
              Shopping &amp; Atelier Archive
            </span>

            <div className="bg-white border border-[#ede0d7] divide-y divide-[#ede0d7]">
              {/* Order History */}
              <button
                onClick={() => setActiveModal("orders")}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-[#fff8f4] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Package className="w-4 h-4 text-[#7c766f] group-hover:text-[#121110] transition-colors" />
                  <div>
                    <span className="font-sans-luxury text-xs uppercase tracking-[0.16em] text-[#121110] font-medium block">
                      Order History &amp; Garment Tracking
                    </span>
                    <span className="font-sans-luxury text-[11px] text-[#7c766f]">
                      {orders.length} Bespoke Dispatches
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#cdc5bd] group-hover:text-[#121110] group-hover:translate-x-1 transition-all" />
              </button>

              {/* Saved Silhouettes (Wishlist) */}
              <Link
                to="/wishlist"
                className="w-full p-5 flex items-center justify-between text-left hover:bg-[#fff8f4] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Heart className="w-4 h-4 text-[#7c766f] group-hover:text-[#72252e] transition-colors" />
                  <div>
                    <span className="font-sans-luxury text-xs uppercase tracking-[0.16em] text-[#121110] font-medium block">
                      Saved Silhouettes (Wishlist)
                    </span>
                    <span className="font-sans-luxury text-[11px] text-[#7c766f]">
                      Explore curated favorites
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#cdc5bd] group-hover:text-[#121110] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION C: BESPOKE ATELIER SERVICES & ADMIN */}
        <div className="space-y-3 pt-2">
          <span className="font-sans-luxury text-[11px] uppercase tracking-[0.25em] text-[#72252e] font-semibold block px-1">
            Atelier Concierge &amp; Heritage
          </span>

          <div className="bg-white border border-[#ede0d7] divide-y divide-[#ede0d7]">
            {/* Bespoke Fitting Appointments */}
            <button
              onClick={() => setActiveModal("appointments")}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-[#fff8f4] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <Calendar className="w-4 h-4 text-[#7c766f] group-hover:text-[#121110] transition-colors" />
                <div>
                  <span className="font-sans-luxury text-xs uppercase tracking-[0.16em] text-[#121110] font-medium block">
                    Private Fitting Appointments
                  </span>
                  <span className="font-sans-luxury text-[11px] text-[#7c766f]">
                    Milan (Via Monte Napoleone 8) &amp; Paris (Faubourg Saint-Honoré)
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#cdc5bd] group-hover:text-[#121110] group-hover:translate-x-1 transition-all" />
            </button>

            {/* Admin Portal (If Admin) */}
            {user?.role === "admin" && (
              <Link
                to="/admin/products"
                className="w-full p-5 flex items-center justify-between text-left hover:bg-[#fff8f4] transition-colors group cursor-pointer bg-[#fffcf8]"
              >
                <div className="flex items-center gap-4">
                  <Shield className="w-4 h-4 text-[#9e7d47]" />
                  <div>
                    <span className="font-sans-luxury text-xs uppercase tracking-[0.16em] text-[#9e7d47] font-semibold block">
                      Atelier Admin Management Console
                    </span>
                    <span className="font-sans-luxury text-[11px] text-[#7c766f]">
                      Curate products, inventory &amp; seasonal campaigns
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9e7d47] group-hover:translate-x-1 transition-all" />
              </Link>
            )}

            {/* Sign Out */}
            <button
              onClick={handleLogout}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-[#ffdad6]/30 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <LogOut className="w-4 h-4 text-[#ba1a1a]" />
                <span className="font-sans-luxury text-xs uppercase tracking-[0.16em] text-[#ba1a1a] font-medium">
                  Sign Out from Dossier
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#ba1a1a] group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODALS & SLIDE-OUT DOSSIERS */}
      {/* ========================================================================= */}

      {/* Modal 1: Personal Information */}
      {activeModal === "personal" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f4] border border-[#ede0d7] max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-1 text-[#7c766f] hover:text-[#121110]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#9e7d47] block mb-1">
              Client Profile
            </span>
            <h3 className="font-editorial text-2xl text-[#121110] mb-6">
              Personal Information
            </h3>

            <form onSubmit={handleSaveInfo} className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || "client@aurelia.noir"}
                  className="w-full bg-[#f9ece2] border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#7c766f] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-1">
                  Phone (Concierge Delivery Updates)
                </label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full bg-white border border-[#ede0d7] px-3.5 py-2.5 text-xs font-sans-luxury text-[#121110] focus:outline-none focus:border-[#121110]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-xs font-sans-luxury uppercase tracking-widest text-[#7c766f] hover:text-[#121110]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-widest font-semibold transition-colors flex items-center gap-1.5"
                >
                  {infoSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Updated</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Saved Addresses */}
      {activeModal === "addresses" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f4] border border-[#ede0d7] max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-1 text-[#7c766f] hover:text-[#121110]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#9e7d47] block mb-1">
              Dispatch Locations
            </span>
            <h3 className="font-editorial text-2xl text-[#121110] mb-6">
              Saved Shipping Addresses
            </h3>

            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-4 border ${
                    addr.isDefault ? "border-[#121110] bg-white" : "border-[#ede0d7] bg-[#fdfaf7]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-sans-luxury font-bold uppercase tracking-wider text-[#121110]">
                      {addr.type}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-sans-luxury uppercase tracking-widest bg-[#121110] text-white px-2 py-0.5 font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#201a15] font-medium">{addr.name}</p>
                  <p className="text-xs text-[#7c766f]">{addr.line1}</p>
                  <p className="text-xs text-[#7c766f]">
                    {addr.city}, {addr.state} - {addr.postal}
                  </p>
                  <p className="text-xs text-[#7c766f]">{addr.country}</p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-widest font-semibold transition-colors"
              >
                Close Address Manager
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Orders History */}
      {activeModal === "orders" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f4] border border-[#ede0d7] max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-1 text-[#7c766f] hover:text-[#121110]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#9e7d47] block mb-1">
              Atelier Dispatches
            </span>
            <h3 className="font-editorial text-2xl text-[#121110] mb-6">
              Bespoke Order History
            </h3>

            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-[#ede0d7] bg-white p-5">
                  <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-[#ede0d7]">
                    <div>
                      <span className="font-sans-luxury text-[10px] uppercase tracking-widest text-[#7c766f]">
                        Order Ref
                      </span>
                      <p className="font-sans-luxury text-xs font-bold text-[#121110]">
                        {order.id}
                      </p>
                      <p className="text-[11px] text-[#7c766f]">{order.date}</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-sans-luxury uppercase tracking-wider border font-medium ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                      <p className="font-sans-luxury text-xs font-bold text-[#121110] mt-1">
                        Total: ₹{order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="pt-4 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-18 object-cover bg-[#f9ece2]"
                        />
                        <div className="flex-1">
                          <p className="font-editorial text-sm text-[#121110]">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#7c766f]">{item.fabric}</p>
                          <p className="text-[11px] text-[#121110] font-semibold mt-0.5">
                            Size: {item.size} • ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-widest font-semibold transition-colors"
              >
                Return to Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Membership Privileges */}
      {activeModal === "privileges" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f4] border border-[#ede0d7] max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-1 text-[#7c766f] hover:text-[#121110]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#9e7d47] block mb-1">
              Atelier Circle Privileges
            </span>
            <h3 className="font-editorial text-2xl text-[#121110] mb-6">
              Membership Benefits
            </h3>

            <div className="space-y-4">
              <div className="p-3.5 bg-white border border-[#ede0d7] flex items-start gap-3">
                <Check className="w-4 h-4 text-[#9e7d47] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold font-sans-luxury text-[#121110] uppercase tracking-wider">
                    Tier I: Complimentary Express Courier
                  </p>
                  <p className="text-[11px] text-[#7c766f] mt-0.5">
                    Zero shipping charges worldwide on all seasonal orders over ₹2,500.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-[#ede0d7] flex items-start gap-3">
                <Check className="w-4 h-4 text-[#9e7d47] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold font-sans-luxury text-[#121110] uppercase tracking-wider">
                    Tier II (At ₹50,000): Bespoke Hemming &amp; Fitting
                  </p>
                  <p className="text-[11px] text-[#7c766f] mt-0.5">
                    Custom garment alterations and monograms completed by our Milan atelier artisans.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-[#ede0d7] flex items-start gap-3">
                <Check className="w-4 h-4 text-[#9e7d47] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold font-sans-luxury text-[#121110] uppercase tracking-wider">
                    Tier III: Private Milan &amp; Paris Salon Access
                  </p>
                  <p className="text-[11px] text-[#7c766f] mt-0.5">
                    Private evening runway viewings and priority reservation on limited archival drops.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-widest font-semibold transition-colors"
              >
                Close Privileges
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: Private Appointments */}
      {activeModal === "appointments" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff8f4] border border-[#ede0d7] max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-1 text-[#7c766f] hover:text-[#121110]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#9e7d47] block mb-1">
              Atelier Appointments
            </span>
            <h3 className="font-editorial text-2xl text-[#121110] mb-4">
              Schedule Private Fitting
            </h3>
            <p className="text-xs font-sans-luxury text-[#7c766f] mb-6">
              Experience personalized bespoke tailoring at our Milan or Paris flagships, or book a digital concierge session.
            </p>

            <div className="space-y-3">
              <div className="p-4 bg-white border border-[#ede0d7]">
                <p className="font-bold text-xs uppercase tracking-wider text-[#121110]">
                  Milano Flagship Atelier
                </p>
                <p className="text-[11px] text-[#7c766f] mt-0.5">
                  Via Monte Napoleone 8, Milano • Monday to Saturday: 10:00 - 19:30 CET
                </p>
                <p className="text-[11px] text-[#9e7d47] font-semibold mt-1">
                  Private Salon Fitting Suites Available
                </p>
              </div>

              <div className="p-4 bg-white border border-[#ede0d7]">
                <p className="font-bold text-xs uppercase tracking-wider text-[#121110]">
                  Paris Faubourg Atelier
                </p>
                <p className="text-[11px] text-[#7c766f] mt-0.5">
                  14 Rue du Faubourg Saint-Honoré, Paris • Monday to Saturday: 10:30 - 19:00 CET
                </p>
                <p className="text-[11px] text-[#9e7d47] font-semibold mt-1">
                  Haute Tailoring &amp; Silk Alterations
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-widest font-semibold transition-colors"
              >
                Close Concierge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
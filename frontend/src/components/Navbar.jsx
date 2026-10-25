import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import gsap from "gsap";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useFilter } from "../hooks/useFilter";
import { useWishlist } from "../hooks/useWishlist";
import {
  ShoppingBag,
  Search,
  User,
  LogOut,
  Shield,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const ANNOUNCEMENTS = [
  "COMPLIMENTARY GLOBAL EXPRESS COURIER ON ORDERS OVER ₹2,500",
  "AUTUMN / WINTER 2026 RUNWAY COLLECTION • NOW PRESENTED",
  "PRIVATE MILAN & PARIS ATELIER APPOINTMENTS NOW OPEN",
  "SUSTAINABLY SOURCED VIRGIN WOOLS & ITALIAN SILK TAILORING",
];

const POPULAR_SEARCHES = [
  "Blazer",
  "Coat",
  "Dress",
  "Trousers",
  "Loafers",
  "Wool",
  "Denim",
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems, setIsDrawerOpen } = useCart();
  const {
    isMenuOpen,
    setIsMenuOpen,
    search,
    setSearch,
    category,
    setCategory,
    genderFilter,
    setGenderFilter,
    categories,
    totalProducts,
    activeFiltersCount,
    clearFilters,
  } = useFilter();

  const location = useLocation();
  const navigate = useNavigate();

  // Announcement bar rotating index
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  // Header scroll appearance state
  const [isScrolled, setIsScrolled] = useState(false);

  // Dedicated Search Bar Dropdown state (Separate from Menu!)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const headerRef = useRef(null);
  const tickerRef = useRef(null);

  // Accordion open states inside Menu drawer
  const [openWomen, setOpenWomen] = useState(false);
  const [openMen, setOpenMen] = useState(false);

  // Wishlist count state from context
  const { wishlistCount } = useWishlist();

  // 1. Auto-rotate top announcement ticker every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // 2. Track scroll & video section completion
  const isHomePage = location.pathname === "/";
  const [isPastHero, setIsPastHero] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsPastHero(true);
      return;
    }

    const handleScroll = () => {
      const hero = document.getElementById("hero-carousel");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // The navbar MUST stay transparent through the entire video section!
        // Only once the video section has fully scrolled past (rect.bottom <= 80)
        // does the solid navbar become visible.
        setIsPastHero(rect.bottom <= 80);
      } else {
        setIsPastHero(window.scrollY > 680);
      }

      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, location.pathname]);

  // Lock body scroll on mobile when menu drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isSolid = isPastHero || isSearchOpen || isMenuOpen || !isHomePage;

  // 3. GSAP Precision Animation for Satisfying & Connected Transitions
  useEffect(() => {
    if (!headerRef.current) return;

    if (isSolid) {
      // Animate to Solid Editorial Luxury State
      gsap.to(headerRef.current, {
        backgroundColor: "rgba(255, 248, 244, 0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottomColor: "#ede0d7",
        boxShadow: "0 4px 24px -6px rgba(18, 17, 16, 0.08)",
        duration: 0.45,
        ease: "power2.out",
      });

      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          backgroundColor: "#121110",
          borderBottomColor: "#242220",
          duration: 0.4,
          ease: "power2.out",
        });
      }

      gsap.to(".nav-dynamic-text", {
        color: "#121110",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(".nav-sub-text", {
        color: "#7c766f",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(".nav-dynamic-line", {
        backgroundColor: "#121110",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(".nav-badge-bag", {
        backgroundColor: "#121110",
        color: "#fff8f4",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(".nav-badge-wishlist", {
        backgroundColor: "#72252e",
        color: "#ffffff",
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      // Animate to 100% Transparent State over Runway Video
      gsap.to(headerRef.current, {
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
        borderBottomColor: "transparent",
        boxShadow: "none",
        duration: 0.45,
        ease: "power2.out",
      });

      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          borderBottomColor: "transparent",
          duration: 0.4,
          ease: "power2.out",
        });
      }

      gsap.to(".nav-dynamic-text", {
        color: "#ffffff",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(".nav-sub-text", {
        color: "rgba(237, 224, 215, 0.85)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(".nav-dynamic-line", {
        backgroundColor: "#ffffff",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(".nav-badge-bag", {
        backgroundColor: "#ffffff",
        color: "#121110",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(".nav-badge-wishlist", {
        backgroundColor: "#ffdeac",
        color: "#121110",
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [isSolid, isHomePage]);

  // 3. Focus search input when search bar opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, [isSearchOpen]);

  // 4. Close search and menu on route change or Escape key
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
    if (location.pathname !== "/") {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    }
    setTimeout(() => {
      document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleGenderSelect = (gender) => {
    setGenderFilter(gender);
    setCategory("All");
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const womenCategories = categories.filter((c) => c.startsWith("Women's"));
  const menCategories = categories.filter((c) => c.startsWith("Men's"));

  return (
    <>
      <header
        ref={headerRef}
        className={`z-40 border-b ${
          isHomePage ? "fixed top-0 left-0 w-full" : "sticky top-0 w-full"
        }`}
        style={{
          backgroundColor: isSolid ? "rgba(255, 248, 244, 0.96)" : "transparent",
          backdropFilter: isSolid ? "blur(20px)" : "blur(0px)",
          WebkitBackdropFilter: isSolid ? "blur(20px)" : "blur(0px)",
          borderBottomColor: isSolid ? "#ede0d7" : "transparent",
          boxShadow: isSolid ? "0 4px 24px -6px rgba(18, 17, 16, 0.08)" : "none",
        }}
      >
        {/* Tier 1: Luxury Rotating Announcement Ticker */}
        <div
          ref={tickerRef}
          className="px-4 py-1.5 text-center relative overflow-hidden border-b transition-colors"
          style={{
            backgroundColor: isSolid ? "#121110" : "rgba(0, 0, 0, 0.25)",
            borderBottomColor: isSolid ? "#242220" : "transparent",
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left Micro-Label (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-sans-luxury tracking-[0.25em] text-[#ffdeac] uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffdeac] animate-pulse"></span>
              <span>MILANO FLAGSHIP • CET 14:30</span>
            </div>

            {/* Centered Rotating Announcement */}
            <div className="flex-1 flex items-center justify-center gap-3">
              <button
                onClick={() =>
                  setAnnouncementIdx(
                    (prev) =>
                      (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length
                  )
                }
                aria-label="Previous announcement"
                className="text-white/60 hover:text-white transition-colors p-0.5 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <p className="font-sans-luxury text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#ede0d7] font-medium transition-opacity duration-300 truncate max-w-[85vw] md:max-w-none">
                {ANNOUNCEMENTS[announcementIdx]}
              </p>

              <button
                onClick={() =>
                  setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length)
                }
                aria-label="Next announcement"
                className="text-white/60 hover:text-white transition-colors p-0.5 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Micro-Label (Desktop) */}
            <div className="hidden lg:flex items-center gap-3 text-[10px] font-sans-luxury tracking-[0.2em] text-[#ede0d7]/80 uppercase">
              <span>HAUTE ÉDITION // 2026</span>
              <span className="text-[#ffdeac]">EUR / INR</span>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Architectural Brand Header */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 h-14 sm:h-18 md:h-[80px] flex items-center justify-between gap-1 sm:gap-4 relative">
          {/* Left Cluster: Animated Menu & Search */}
          <div className="flex items-center gap-0.5 sm:gap-2 md:gap-3 shrink-0">
            {/* Animated 3-Line Luxury Menu Hamburger */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsSearchOpen(false);
              }}
              aria-label="Toggle navigation menu"
              title="Menu & Silhouettes"
              className="nav-dynamic-text w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center transition-colors cursor-pointer group active:scale-90"
              style={{ color: isSolid ? "#121110" : "#ffffff" }}
            >
              <div className="w-4 sm:w-5 h-3 sm:h-3.5 relative flex flex-col justify-between">
                <span
                  className={`w-4 sm:w-5 h-[1.5px] nav-dynamic-line transition-all duration-300 ease-out origin-center ${
                    isMenuOpen ? "translate-y-[5px] sm:translate-y-[6px] rotate-45" : ""
                  }`}
                  style={{ backgroundColor: isSolid ? "#121110" : "#ffffff" }}
                />
                <span
                  className={`w-3 sm:w-3.5 group-hover:w-4 sm:group-hover:w-5 h-[1.5px] nav-dynamic-line transition-all duration-200 ease-out ${
                    isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                  style={{ backgroundColor: isSolid ? "#121110" : "#ffffff" }}
                />
                <span
                  className={`w-4 sm:w-5 h-[1.5px] nav-dynamic-line transition-all duration-300 ease-out origin-center ${
                    isMenuOpen ? "-translate-y-[5px] sm:-translate-y-[6px] -rotate-45" : ""
                  }`}
                  style={{ backgroundColor: isSolid ? "#121110" : "#ffffff" }}
                />
              </div>
            </button>

            {/* Animated Search Icon Trigger */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMenuOpen(false);
              }}
              aria-label="Toggle search bar"
              title="Search Collection"
              className="nav-dynamic-text w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center transition-colors cursor-pointer group active:scale-90"
              style={{ color: isSolid ? "#121110" : "#ffffff" }}
            >
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                <Search
                  className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[1.4] absolute inset-0 transition-all duration-300 ease-out ${
                    isSearchOpen
                      ? "opacity-0 rotate-90 scale-50"
                      : "opacity-100 rotate-0 scale-100 group-hover:scale-115"
                  }`}
                />
                <X
                  className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[1.4] absolute inset-0 transition-all duration-300 ease-out ${
                    isSearchOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-50"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Center Cluster: Scaled Luxury Wordmark (Guaranteed to fit 320px screens) */}
          <div className="flex flex-col items-center justify-center text-center shrink min-w-0 px-1">
            <Link
              to="/"
              className="group flex flex-col items-center justify-center focus:outline-none"
            >
              <span
                className="nav-dynamic-text font-editorial text-[13px] xs:text-[14px] sm:text-xl md:text-2xl lg:text-[28px] tracking-[0.10em] sm:tracking-[0.22em] uppercase font-normal transition-opacity group-hover:opacity-85 whitespace-nowrap"
                style={{ color: isSolid ? "#121110" : "#ffffff" }}
              >
                AURELIA &amp; NOIR
              </span>
              <span
                className="nav-sub-text font-sans-luxury text-[6.5px] xs:text-[7px] sm:text-[8px] md:text-[9.5px] uppercase tracking-[0.18em] sm:tracking-[0.32em] -mt-0.5 transition-colors whitespace-nowrap"
                style={{ color: isSolid ? "#7c766f" : "rgba(237, 224, 215, 0.85)" }}
              >
                Haute Édition • Milano
              </span>
            </Link>
          </div>

          {/* Right Cluster: Wishlist, Bag & Profile (ALL 100% visible on every mobile width) */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-2.5 md:gap-4 shrink-0">
            {/* Admin Shield Portal (If Admin) */}
            {user?.role === "admin" && (
              <Link
                to="/admin/products"
                title="Atelier Admin Console"
                className="p-1 sm:p-2 text-[#9e7d47] hover:opacity-80 transition-opacity"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.3]" />
              </Link>
            )}

            {/* 1. Animated Shopping Bag Link */}
            <Link
              to="/bag"
              aria-label="Shopping Bag & Checkout"
              title={`Shopping Bag (${totalItems} items)`}
              className="nav-dynamic-text relative group p-1 sm:p-2 cursor-pointer transition-colors"
              style={{ color: isSolid ? "#121110" : "#ffffff" }}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.3] group-hover:-translate-y-0.5 group-active:scale-90 transition-all duration-300" />
              {totalItems > 0 && (
                <span
                  className="nav-badge-bag absolute -top-0.5 -right-0.5 sm:top-0.5 sm:-right-1 min-w-[14px] h-[14px] sm:min-w-[17px] sm:h-[17px] rounded-full text-[8px] sm:text-[9px] font-sans-luxury flex items-center justify-center font-bold px-0.5 sm:px-1 transition-all duration-300 ring-1 sm:ring-2 ring-black/20"
                  style={{
                    backgroundColor: isSolid ? "#121110" : "#ffffff",
                    color: isSolid ? "#fff8f4" : "#121110",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* 2. Animated Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label="Curated Wishlist"
              title={`Curated Wishlist (${wishlistCount} items)`}
              className="nav-dynamic-text relative group p-1 sm:p-2 cursor-pointer transition-colors"
              style={{ color: isSolid ? "#121110" : "#ffffff" }}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.3] group-hover:scale-115 group-active:scale-90 transition-all duration-300" />
              {wishlistCount > 0 && (
                <span
                  className="nav-badge-wishlist absolute -top-0.5 -right-0.5 sm:top-0.5 sm:-right-1 min-w-[14px] h-[14px] sm:min-w-[17px] sm:h-[17px] rounded-full text-[8px] sm:text-[9px] font-sans-luxury flex items-center justify-center font-bold px-0.5 sm:px-1 transition-all duration-300 ring-1 sm:ring-2 ring-black/20"
                  style={{
                    backgroundColor: isSolid ? "#72252e" : "#ffdeac",
                    color: isSolid ? "#ffffff" : "#121110",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* 3. Animated Profile / Client Account Link */}
            <Link
              to={user ? "/profile" : "/login"}
              aria-label="Client Account Dossier"
              title={user ? `${user.name} • Private Client Dossier` : "Sign In to Client Dossier"}
              className="nav-dynamic-text relative group p-1 sm:p-2 cursor-pointer transition-colors"
              style={{ color: isSolid ? "#121110" : "#ffffff" }}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.3] group-hover:scale-115 group-active:scale-90 transition-all duration-300" />
              {user && (
                <span className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#9e7d47] ring-1 ring-black/20"></span>
              )}
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ANIMATED SLIDE-DOWN SEARCH BAR (Exclusively for Search!) */}
        {/* ========================================================================= */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-[#fff8f4]/98 backdrop-blur-2xl border-b border-[#ede0d7] shadow-xl py-3.5 sm:py-5 px-3 sm:px-6 md:px-8 z-30 anim-slide-down">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-[#121110] pb-1.5 sm:pb-2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#7c766f] mr-2 sm:mr-3 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search silhouettes, coats, blazers..."
                  className="w-full bg-transparent font-sans-luxury text-xs sm:text-base md:text-lg text-[#121110] placeholder:text-[#a8a199] focus:outline-none py-1"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="p-1 text-[#7c766f] hover:text-[#121110] mr-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-2.5 py-1 sm:px-4 sm:py-1.5 bg-[#121110] text-white hover:bg-[#72252e] transition-colors text-[10px] sm:text-xs font-sans-luxury uppercase tracking-widest font-semibold cursor-pointer shrink-0 ml-1 sm:ml-2"
                >
                  Search
                </button>
              </form>

              {/* Trending Quick Search Chips */}
              <div className="mt-2.5 sm:mt-3.5 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-[9px] sm:text-[10px] font-sans-luxury uppercase tracking-wider text-[#7c766f] font-semibold">
                  Trending:
                </span>
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearch(item);
                      setIsSearchOpen(false);
                      if (location.pathname !== "/") {
                        navigate(`/?search=${encodeURIComponent(item)}`);
                      }
                      setTimeout(() => {
                        document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="text-[10px] sm:text-[11px] font-sans-luxury px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white hover:bg-[#121110] hover:text-white text-[#4b4640] border border-[#ede0d7] transition-colors cursor-pointer rounded-xs"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* ANIMATED LUXURY EDITORIAL MENU DRAWER (Clean, Spacious, Beautiful!) */}
      {/* ========================================================================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Dimmed Backdrop */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm anim-fade-in transition-opacity"
          />

          {/* Slide-In Menu Panel */}
          <div className="relative w-full sm:max-w-md bg-[#fff8f4] h-full shadow-2xl flex flex-col justify-between z-10 border-r border-[#ede0d7] overflow-hidden anim-slide-left">
            {/* Header */}
            <div className="p-4 sm:p-6 md:p-8 flex items-center justify-between border-b border-[#ede0d7]">
              <div>
                <span className="font-editorial text-lg sm:text-xl tracking-[0.18em] text-[#121110] uppercase block">
                  Aurelia &amp; Noir
                </span>
                <span className="font-sans-luxury text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#7c766f]">
                  Haute Édition • Milano
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 text-[#121110] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Directory (Clean, spacious, uncrowded) */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-5 sm:py-6 space-y-4 sm:space-y-5">
              {/* 01. WOMEN'S COLLECTION */}
              <div>
                <button
                  onClick={() => setOpenWomen(!openWomen)}
                  className="w-full flex items-center justify-between py-1.5 text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] text-[#9e7d47]">01</span>
                    <span className="font-editorial text-base sm:text-lg md:text-xl text-[#121110] group-hover:text-[#72252e] transition-colors">
                      Women's Collection
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#7c766f] transition-transform duration-300 ${
                      openWomen ? "rotate-180 text-[#121110]" : ""
                    }`}
                  />
                </button>

                {/* Subcategories (accordion) */}
                {openWomen && (
                  <div className="pl-6 pt-2 pb-1 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                    <button
                      onClick={() => handleGenderSelect("Women")}
                      className="block text-[11px] font-sans-luxury uppercase tracking-widest text-[#72252e] font-semibold hover:underline"
                    >
                      View All Women's Garments →
                    </button>
                    {womenCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className="block text-xs font-sans-luxury tracking-wider text-[#4b4640] hover:text-[#121110] transition-colors"
                      >
                        {cat.replace("Women's ", "")}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 02. MEN'S COLLECTION */}
              <div>
                <button
                  onClick={() => setOpenMen(!openMen)}
                  className="w-full flex items-center justify-between py-1.5 text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] text-[#9e7d47]">02</span>
                    <span className="font-editorial text-base sm:text-lg md:text-xl text-[#121110] group-hover:text-[#72252e] transition-colors">
                      Men's Collection
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#7c766f] transition-transform duration-300 ${
                      openMen ? "rotate-180 text-[#121110]" : ""
                    }`}
                  />
                </button>

                {/* Subcategories (accordion) */}
                {openMen && (
                  <div className="pl-6 pt-2 pb-1 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                    <button
                      onClick={() => handleGenderSelect("Men")}
                      className="block text-[11px] font-sans-luxury uppercase tracking-widest text-[#72252e] font-semibold hover:underline"
                    >
                      View All Men's Garments →
                    </button>
                    {menCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className="block text-xs font-sans-luxury tracking-wider text-[#4b4640] hover:text-[#121110] transition-colors"
                      >
                        {cat.replace("Men's ", "")}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 06. ATELIER ADMIN PORTAL (If admin) */}
              {user?.role === "admin" && (
                <div className="pt-2 border-t border-[#ede0d7]/70">
                  <Link
                    to="/admin/products"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-between py-1.5 text-left group cursor-pointer text-[#72252e]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px]">★</span>
                      <span className="font-editorial text-base sm:text-lg text-[#72252e] font-semibold">
                        Atelier Admin Console
                      </span>
                    </div>
                    <Shield className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 bg-[#f9ece2] border-t border-[#ede0d7] flex items-center justify-between text-xs font-sans-luxury text-[#7c766f]">
              <span className="uppercase tracking-widest text-[9px] sm:text-[10px]">
                Milano Flagship • Via Monte Napoleone 8
              </span>
              {user && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  className="text-[#ba1a1a] hover:underline uppercase tracking-wider text-[10px] sm:text-[11px]"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

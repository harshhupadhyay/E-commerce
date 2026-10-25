import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import { useFilter } from "../hooks/useFilter";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import Pagination from "../components/Pagination";
import HeroVideoCarousel from "../components/HeroVideoCarousel";
import FilterDrawer from "../components/FilterDrawer";
import LookbookModal from "../components/LookbookModal";
import { SlidersHorizontal, Play, ArrowRight, Sparkles, X, Compass, Check } from "lucide-react";
import gsap from "gsap";

const SILHOUETTES = [
  {
    name: "Women's Tailoring",
    filter: "Women's Suits & Tailoring",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCN_Oyige9SmlTuK_-SW1ZqWS7lYiufZsnuj04RErvqiUSlDMwLj_Y5hoRQ4mJxWCwClpWE9G27legW_IlIkNVE_zOz9nvFeUR9-ZszJMgHrj3YXjelwkkidL_f_XHlGNoMy1ULVC1MtMyrhFBHJg5cIbs6xG3749_Sy0OUjGK5BJ0dV_lExW7EPtogxaEKyjOeGQIBbt-3ZXQYkFar9IP7e1HHs-yfDOnF7MXtHpA0eS5V8pNVhm9u9w",
  },
  {
    name: "Men's Outerwear",
    filter: "Men's Coats & Outerwear",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQdBpEhIxMAyNcdJxtiokoOqWhuFmTdtqWe0jj3wkXkJQfSTYjSwji_5Jd18Ke861ToEfYMrR5flyi5g6CzGG_UBgBGnjiB-NUCL68zyhVpgaQOPBYiVSspSObIf9wLIe12ZoYo3hCXGIPmEy6RdA0uYMYlcYidzIORRipKT2Kldf5k19-UZCOOfVq5gk2lcYS3bYeWlCmK8WCbR3aTaakvCWortmnNK7htkBihCdrdOBgV0K0qgrFQg",
  },
  {
    name: "Cashmere & Knits",
    filter: "Women's Knitwear & Tops",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTAdqd01Y6F2HuebVvuvXVE1DufMwQ__3LMFGB2CsnJm17E1gtFtSzrMFyvpG7SiX8ZQN-UZ_96pVV7oyaBB-IPmfxLRNwq0EMcBsSoeGtEBNnXlu1T8jW9x-4m8CkJnyVlzXQUyqQIEHHEH6mkyNFASqeDc4GnH3Fkpr1N4eybMcIP1S0DlSBWBdO2k7ceYODT8p16ivNxn3Gn1IcVXHes2P0D-dxxOs76qbVAfhjiWx-X3y4Z1r4Qw",
  },
  {
    name: "Leather & Jackets",
    filter: "Men's Leather & Jackets",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaSIzmzw1U0aJ_F0nAdP_-8GVIoK5L5rPXn0N5PxyylUqX33d0sg3iqO0euO5L_NmSwzTflm5f-Rp1KsuQ4GrOvIZl2ncfV2lHgo86D2hvsQiABZToFGSZWJznrBugh834x1tnzQeodY3wfQfXkIeamXtz2FE4vLIXqfnsmjhuqqnuNuQrlGfpawQYriHWvk9H48wusRY7kHQNHaMrb3NfIXixApHh9WXGb17a8ljDw5D8JoLHwloN8g",
  },
  {
    name: "Sculpted Footwear",
    filter: "Men's Shoes & Loafers",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6YNoOSIN5r131ozysBMYlyujkMiVbgMnjqu4YWWxdHWzDxgaJxaCsjVAqE-3O-jDGGmXxEozfK3yezyfkjmu3b3LoBYg0RnLHgX1QvfNjUbur-SbcNWwUqrGw4MUjrcbWapv6P7X4gsuKz0bacYf6LvUT4VImxJUZzWfeiBlY-4Cdo188krKpTYdn11sL0fMT3IXkXHRKRewjglwcG3y_6ijtOqkPWOly0yUm63aosLxnjDgUArsKqw",
  },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const {
    search,
    setSearch,
    category,
    setCategory,
    genderFilter,
    setGenderFilter,
    sort,
    setSort,
    activeFiltersCount,
    setTotalProducts,
    totalProducts,
    clearFilters,
    categories,
  } = useFilter();

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // VIP Salon Signup state
  const [salonEmail, setSalonEmail] = useState("");
  const [salonSubscribed, setSalonSubscribed] = useState(false);

  const gridRef = useRef(null);

  // Sync URL search parameters if arriving with ?category=... or ?search=...
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const urlCategory = searchParams.get("category");
    if (urlSearch !== null) {
      setSearch(urlSearch);
    }
    if (urlCategory !== null) {
      setCategory(urlCategory);
    }
    if (urlSearch !== null || urlCategory !== null) {
      setPage(1);
      setTimeout(() => {
        document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [searchParams]);

  // Fetch products whenever filters or page changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let effectiveCategory = undefined;
        if (category !== "All") {
          effectiveCategory = category;
        } else if (genderFilter !== "All") {
          effectiveCategory = genderFilter;
        }

        const response = await api.get("/products", {
          params: {
            page,
            limit: 20,
            search: search.trim() || undefined,
            category: effectiveCategory,
            sort,
          },
        });

        const { products: fetchedProducts, pagination } = response.data.data;
        setProducts(fetchedProducts || []);
        setTotalPages(pagination?.totalPages || 1);
        setTotalProducts(pagination?.totalProducts || 0);
      } catch (error) {
        console.log("Not able to fetch products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, genderFilter, sort, page]);

  // 3. Staggered GSAP Grid Reveal
  useEffect(() => {
    if (!loading && products.length > 0 && gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [loading, products]);

  const handleCategorySelect = (selectedCat) => {
    setCategory(selectedCat);
    setPage(1);
    // Smooth scroll to collection grid
    document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenderChange = (gender) => {
    setGenderFilter(gender);
    setCategory("All");
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("All");
    setGenderFilter("All");
    setSort("newest");
    setPage(1);
  };

  const handleSalonSignup = (e) => {
    e.preventDefault();
    if (salonEmail.trim()) {
      setSalonSubscribed(true);
      setSalonEmail("");
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO CAMPAIGN VIDEO CAROUSEL */}
      <HeroVideoCarousel
        onExploreClick={() => {
          document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. CURATED DEPARTMENTS // EXPLORE BY SILHOUETTE */}
      <section id="categories" className="max-w-7xl mx-auto w-full py-6 sm:py-12 px-3 sm:px-4 md:px-8">
        <div className="flex items-end justify-between mb-4 sm:mb-6 pb-2.5 border-b border-[#ede0d7]">
          <div>
            <span className="font-sans-luxury text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#72252e] font-semibold">
              Curated Departments
            </span>
            <h2 className="font-editorial text-lg sm:text-xl md:text-2xl text-[#121110] mt-0.5">
              Explore by Silhouette
            </h2>
          </div>

          <button
            onClick={() => handleCategorySelect("All")}
            className="text-[10.5px] sm:text-xs font-sans-luxury uppercase tracking-wider text-[#7c766f] hover:text-[#121110] underline underline-offset-4"
          >
            View All ({totalProducts})
          </button>
        </div>

        {/* Circular Avatar Scroll Bar */}
        <div className="flex gap-3 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth touch-pan-x">
          {SILHOUETTES.map((sil) => {
            const isSelected = category === sil.filter;
            return (
              <button
                key={sil.name}
                onClick={() => handleCategorySelect(sil.filter)}
                className="flex flex-col items-center gap-2 shrink-0 group w-[72px] sm:w-[84px] md:w-[96px] text-center"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-xs ${
                    isSelected ? "ring-2 ring-[#121110] ring-offset-2" : "bg-[#ede0d7]"
                  }`}
                >
                  <img
                    src={sil.image}
                    alt={sil.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] font-sans-luxury tracking-wide leading-tight uppercase ${
                    isSelected ? "font-bold text-[#121110]" : "text-[#4b4640] group-hover:text-[#121110]"
                  }`}
                >
                  {sil.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. MINIMALIST EDITORIAL STATUS & FILTER TRIGGER */}
      <section id="collection-grid" className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-8 pt-2 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 py-3 sm:py-4">
          {/* Active Breadcrumb / Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs">
            <span className="font-sans-luxury text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#7c766f]">
              Archive Catalogue
            </span>

            {category !== "All" && (
              <>
                <span className="text-[#cdc5bd]">/</span>
                <span className="font-editorial text-xs sm:text-sm text-[#121110]">
                  {category}
                </span>
                <button
                  onClick={() => setCategory("All")}
                  className="text-[9px] sm:text-[10px] font-sans-luxury uppercase tracking-wider text-[#72252e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Reset</span>
                  <X className="w-3 h-3" />
                </button>
              </>
            )}

            {genderFilter !== "All" && category === "All" && (
              <>
                <span className="text-[#cdc5bd]">/</span>
                <span className="font-editorial text-xs sm:text-sm text-[#121110]">
                  {genderFilter}'s Wardrobe
                </span>
                <button
                  onClick={() => setGenderFilter("All")}
                  className="text-[9px] sm:text-[10px] font-sans-luxury uppercase tracking-wider text-[#72252e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Reset</span>
                  <X className="w-3 h-3" />
                </button>
              </>
            )}

            {search.trim() && (
              <>
                <span className="text-[#cdc5bd]">/</span>
                <span className="text-[11px] sm:text-xs font-sans-luxury text-[#121110] italic">
                  "{search}"
                </span>
                <button
                  onClick={() => setSearch("")}
                  className="text-[9px] sm:text-[10px] font-sans-luxury uppercase tracking-wider text-[#72252e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Clear</span>
                  <X className="w-3 h-3" />
                </button>
              </>
            )}
          </div>

          {/* Right: Silhouette Count & Dedicated Filter & Sort Trigger */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-4 w-full sm:w-auto">
            {isAdmin && (
              <span className="text-[10px] sm:text-xs font-sans-luxury text-[#7c766f]">
                Showing <strong className="text-[#121110]">{products.length}</strong> of{" "}
                <strong className="text-[#121110]">{totalProducts}</strong> Silhouettes
              </span>
            )}

            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              aria-label="Open filter and sort drawer"
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 border border-[#121110] text-[#121110] hover:bg-[#121110] hover:text-white transition-all text-[10px] sm:text-xs font-sans-luxury uppercase tracking-widest cursor-pointer group shrink-0"
            >
              <SlidersHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Filter &amp; Sort</span>
              {activeFiltersCount > 0 && (
                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#72252e] text-white text-[8px] sm:text-[9px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 4. PRODUCT GRID & SKELETON */}
        {loading ? (
          <ProductSkeleton count={20} />
        ) : products.length === 0 ? (
          <div className="text-center py-16 sm:py-24 bg-white rounded border border-[#ede0d7] p-6 sm:p-8">
            <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-[#7c766f] mx-auto mb-2.5" />
            <h3 className="font-editorial text-lg sm:text-2xl text-[#121110] mb-1.5">No silhouettes found</h3>
            <p className="text-[11px] sm:text-xs font-sans-luxury text-[#7c766f] max-w-sm mx-auto mb-5">
              We couldn't find any products matching your specific query. Try clearing your filters to explore our full archive.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#121110] text-white text-[10.5px] sm:text-xs uppercase tracking-widest font-semibold hover:bg-[#72252e] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 gap-y-5 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-10"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalProducts > 0 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setPage(newPage);
                document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        )}
      </section>

      {/* 5. ATELIER EDITORIAL STORY FEATURE (GRAND LUXURY SPREAD) */}
      <section id="atelier" className="w-full bg-[#121110] text-[#fff8f4] mt-24 py-16 sm:py-24 md:py-32 relative overflow-hidden">
        {/* Subtle Luxury Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#72252e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#9e7d47]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Header Row: Kicker & Serial Number */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 sm:pb-12 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9e7d47]" />
              <span className="font-sans-luxury text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#9e7d47] font-semibold">
                The Atelier Monograph • Autumn / Winter 2026
              </span>
            </div>
            <span className="font-sans-luxury text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#a8a199]">
              Biella &amp; Milan Heritage Ateliers
            </span>
          </div>

          {/* Grand Headline & Editorial Manifesto */}
          <div className="pt-10 sm:pt-14 pb-12 sm:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight text-[#fff8f4]">
                Crafting the <br />
                <span className="italic font-light text-[#ede0d7]">Modern Silhouette</span>
              </h2>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <p className="font-sans-luxury text-xs sm:text-sm text-[#cdc5bd] leading-relaxed font-light">
                A dialogue between unhurried Italian tailoring and architectural proportion. Every piece is drafted over weeks, balancing structured virgin wool shoulders with fluid draping lines designed for modern mobility.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsLookbookOpen(true)}
                  className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#fff8f4] text-[#121110] hover:bg-[#72252e] hover:text-[#fff8f4] transition-all duration-300 font-sans-luxury text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold shadow-xl cursor-pointer"
                >
                  <span>Read The Editorial Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Asymmetric Dual Editorial Visuals Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch pt-4">
            {/* Main Visual Column */}
            <div className="lg:col-span-7 group relative overflow-hidden bg-[#1c1a18] border border-white/10 aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] flex flex-col justify-end p-6 sm:p-10">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85"
                alt="Crafting the Modern Silhouette Runway Archive"
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.92] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-black/30 to-transparent opacity-90 sm:opacity-80" />
              <div className="relative z-10 space-y-2">
                <span className="inline-block px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-white/20 text-[9px] uppercase font-sans-luxury tracking-[0.25em] text-[#9e7d47] font-semibold">
                  Runway Look 07 • Milan Presentation
                </span>
                <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-white">
                  Double-Faced Virgin Wool Cocoon Coat
                </p>
                <p className="text-[11px] font-sans-luxury text-[#cdc5bd] max-w-md hidden sm:block">
                  Hand-finished drop shoulder line cut with precision internal horsehair interlining for lasting architectural drape.
                </p>
              </div>
            </div>

            {/* Secondary Column: Fabric Detail & Atelier Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Secondary Fabric Macro Visual */}
              <div className="relative overflow-hidden bg-[#1c1a18] border border-white/10 aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9] group">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85"
                  alt="Biella Italian Wool Weaving"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] uppercase font-sans-luxury tracking-[0.2em] text-[#fff8f4]">
                  <span>Atelier Macro Series</span>
                  <span className="text-[#9e7d47] font-semibold">Biella, Italy</span>
                </div>
              </div>

              {/* Craft Credentials Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                <div className="p-4 sm:p-5 bg-white/[0.04] border border-white/10 flex items-start gap-4">
                  <span className="font-editorial text-2xl text-[#9e7d47] shrink-0">01</span>
                  <div>
                    <h4 className="font-sans-luxury text-[11px] uppercase tracking-wider font-bold text-white mb-0.5">
                      240+ Hours Patterning
                    </h4>
                    <p className="text-[11px] font-sans-luxury text-[#a8a199] leading-relaxed">
                      Each silhouette undergoes bespoke muslin drape tests until line balance achieves natural poise.
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-white/[0.04] border border-white/10 flex items-start gap-4">
                  <span className="font-editorial text-2xl text-[#9e7d47] shrink-0">02</span>
                  <div>
                    <h4 className="font-sans-luxury text-[11px] uppercase tracking-wider font-bold text-white mb-0.5">
                      100% Virgin Piedmont Wool
                    </h4>
                    <p className="text-[11px] font-sans-luxury text-[#a8a199] leading-relaxed">
                      Loomed exclusively in 130-year-old alpine mills using certified non-mulesed organic yarns.
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-white/[0.04] border border-white/10 flex items-start gap-4">
                  <span className="font-editorial text-2xl text-[#9e7d47] shrink-0">03</span>
                  <div>
                    <h4 className="font-sans-luxury text-[11px] uppercase tracking-wider font-bold text-white mb-0.5">
                      Zero Synthetic Blends
                    </h4>
                    <p className="text-[11px] font-sans-luxury text-[#a8a199] leading-relaxed">
                      Pure organic cupro lining, carved horn buttons, and compostable bast-fiber threads.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Editorial Bar with Lookbook trigger & Anchor */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] sm:text-xs font-sans-luxury uppercase tracking-[0.25em] text-[#a8a199] text-center sm:text-left">
              Archival Monograph • Curated by Aurelia &amp; Noir Design Studio
            </span>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setIsLookbookOpen(true)}
                className="text-xs font-sans-luxury uppercase tracking-[0.2em] font-semibold text-[#ede0d7] hover:text-[#fff8f4] underline underline-offset-4 cursor-pointer"
              >
                Open Lookbook Gallery
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-1.5 text-xs font-sans-luxury uppercase tracking-[0.2em] text-[#9e7d47] hover:text-white cursor-pointer"
              >
                <span>Back to Garments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CURATED BRAND VALUES BAR
      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-[#ede0d7] rounded flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f9ece2] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#121110]" />
            </div>
            <div>
              <h4 className="font-sans-luxury text-xs uppercase tracking-wider font-bold text-[#121110]">
                Artisanal European Fabrics
              </h4>
              <p className="text-xs text-[#7c766f] mt-0.5">
                Loomed exclusively in Biella and Lyon
              </p>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#ede0d7] rounded flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f9ece2] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-[#121110]" />
            </div>
            <div>
              <h4 className="font-sans-luxury text-xs uppercase tracking-wider font-bold text-[#121110]">
                Carbon-Neutral Courier
              </h4>
              <p className="text-xs text-[#7c766f] mt-0.5">
                Zero-emission final mile in major capitals
              </p>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#ede0d7] rounded flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f9ece2] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#121110]" />
            </div>
            <div>
              <h4 className="font-sans-luxury text-xs uppercase tracking-wider font-bold text-[#121110]">
                Complimentary 30-Day Returns
              </h4>
              <p className="text-xs text-[#7c766f] mt-0.5">
                Doorstep courier collection upon request
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* 7. PRIVATE SALON ACCESS (VIP NEWSLETTER) */}
      <section className="max-w-3xl mx-auto w-full px-4 md:px-8 mt-20 text-center">
        <div className="bg-white p-8 md:p-12 border border-[#ede0d7] rounded shadow-xs space-y-4">
          <span className="font-sans-luxury text-[11px] uppercase tracking-[0.25em] text-[#72252e] font-bold">
            By Invitation Only
          </span>

          <h3 className="font-editorial text-3xl text-[#121110]">
            Private Client Access
          </h3>

          <p className="font-sans-luxury text-xs md:text-sm text-[#7c766f] max-w-md mx-auto leading-relaxed">
            Receive privileged preview access to seasonal capsule releases, intimate boutique presentations, and private sales.
          </p>

          <form onSubmit={handleSalonSignup} className="max-w-md mx-auto pt-2 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={salonEmail}
              onChange={(e) => setSalonEmail(e.target.value)}
              className="flex-1 bg-[#f9ece2] text-[#201a15] text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
            />
            <button
              type="submit"
              className="bg-[#121110] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded hover:bg-[#72252e] transition-colors"
            >
              subscribe
            </button>
          </form>

          {salonSubscribed && (
            <p className="text-xs text-[#059669] font-semibold pt-1">
              ✓ Thank you. Your private invitation key will arrive shortly.
            </p>
          )}

          <p className="text-[10px] text-[#7c766f] uppercase tracking-wider">
            Unsubscribe at any time. Read our Privacy Charter.
          </p>
        </div>
      </section>

      {/* 8. Dedicated Luxury Filter & Sort Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        sort={sort}
        setSort={setSort}
        category={category}
        setCategory={setCategory}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        categories={categories}
        activeFiltersCount={activeFiltersCount}
        clearFilters={clearFilters}
        totalProducts={totalProducts}
      />

      {/* 9. Editorial Lookbook Story Modal */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        onExplore={() => {
          document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default Products;

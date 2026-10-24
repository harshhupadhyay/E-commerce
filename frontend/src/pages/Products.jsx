import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import { useFilter } from "../hooks/useFilter";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import Pagination from "../components/Pagination";
import HeroVideoCarousel from "../components/HeroVideoCarousel";
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
    setIsMenuOpen,
    activeFiltersCount,
    setTotalProducts,
    totalProducts,
    clearFilters,
  } = useFilter();

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
      <section id="categories" className="max-w-7xl mx-auto w-full py-14 px-4 md:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#ede0d7]">
          <div>
            <span className="font-sans-luxury text-[11px] uppercase tracking-[0.2em] text-[#72252e] font-semibold">
              Curated Departments
            </span>
            <h2 className="font-editorial text-2xl md:text-3xl text-[#121110] mt-0.5">
              Explore by Silhouette
            </h2>
          </div>

          <button
            onClick={() => handleCategorySelect("All")}
            className="text-xs font-sans-luxury uppercase tracking-wider text-[#7c766f] hover:text-[#121110] underline underline-offset-4"
          >
            View All ({totalProducts})
          </button>
        </div>

        {/* Circular Avatar Scroll Bar */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
          {SILHOUETTES.map((sil) => {
            const isSelected = category === sil.filter;
            return (
              <button
                key={sil.name}
                onClick={() => handleCategorySelect(sil.filter)}
                className="flex flex-col items-center gap-3 shrink-0 group w-[100px] text-center"
              >
                <div
                  className={`w-20 h-20 md:w-22 md:h-22 rounded-full overflow-hidden p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-xs ${
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
                  className={`text-[11px] font-sans-luxury tracking-wider leading-tight uppercase ${
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
      <section id="collection-grid" className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-4 pb-2">
        <div className="flex items-center justify-between py-4 border-b border-[#ede0d7]">
          {/* Active Breadcrumb / Indicator */}
          <div className="flex items-center gap-2.5 flex-wrap text-xs">
            <span className="font-sans-luxury text-[11px] uppercase tracking-[0.22em] text-[#7c766f]">
              Archive Catalogue
            </span>

            {category !== "All" && (
              <>
                <span className="text-[#cdc5bd]">/</span>
                <span className="font-editorial text-sm text-[#121110]">
                  {category}
                </span>
                <button
                  onClick={() => setCategory("All")}
                  className="text-[10px] font-sans-luxury uppercase tracking-wider text-[#72252e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Reset</span>
                  <X className="w-3 h-3" />
                </button>
              </>
            )}

            {genderFilter !== "All" && category === "All" && (
              <>
                <span className="text-[#cdc5bd]">/</span>
                <span className="font-editorial text-sm text-[#121110]">
                  {genderFilter}'s Wardrobe
                </span>
                <button
                  onClick={() => setGenderFilter("All")}
                  className="text-[10px] font-sans-luxury uppercase tracking-wider text-[#72252e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Reset</span>
                  <X className="w-3 h-3" />
                </button>
              </>
            )}

            {search.trim() && (
              <>
                <span className="text-[#cdc5bd]">/</span>
                <span className="text-xs font-sans-luxury text-[#121110] italic">
                  "{search}"
                </span>
                <button
                  onClick={() => setSearch("")}
                  className="text-[10px] font-sans-luxury uppercase tracking-wider text-[#72252e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Clear</span>
                  <X className="w-3 h-3" />
                </button>
              </>
            )}
          </div>

          {/* Right: Piece Count & Minimalist Filter & Sort Trigger */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs font-sans-luxury text-[#7c766f]">
              Showing <strong className="text-[#121110]">{products.length}</strong> of{" "}
              <strong className="text-[#121110]">{totalProducts}</strong> Pieces
            </span>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 border border-[#121110] text-[#121110] hover:bg-[#121110] hover:text-white transition-all text-xs font-sans-luxury uppercase tracking-widest cursor-pointer group"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Filter &amp; Sort</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#72252e] text-white text-[9px] flex items-center justify-center font-bold">
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
          <div className="text-center py-24 bg-white rounded border border-[#ede0d7] p-8">
            <Compass className="w-10 h-10 text-[#7c766f] mx-auto mb-3" />
            <h3 className="font-editorial text-2xl text-[#121110] mb-2">No silhouettes found</h3>
            <p className="text-xs font-sans-luxury text-[#7c766f] max-w-sm mx-auto mb-6">
              We couldn't find any products matching your specific query. Try clearing your filters to explore our full archive.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-[#121110] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#72252e] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10"
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

      {/* 5. ATELIER EDITORIAL STORY FEATURE */}
      <section id="atelier" className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-24">
        <div className="bg-[#f3e6dc] overflow-hidden border border-[#ede0d7] grid grid-cols-1 md:grid-cols-2">
          {/* Photo */}
          <div
            className="w-full h-80 md:h-auto min-h-[360px] bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpdso-rMBs0QaQRx_8j8GrfgfhrP4_oujQDepFwBZgp4WDt1pH_SJjKuN-sDOoRwNyxab28xaft91QVLnVVjBEebtsVuOaduJxpTP8tdeEzEq9uIAQXbWE8UYsWxsJBHIpsVBSAiEbmB-mViOCs9hb6A_jXiPuYGjWnZ1vymU7O-orI1dZQk6pHK5bL3iD73c3AaKQC4rCZkKUrFJaQBottl3bJSm5ooim-jH7J6zEXKFc_HQ4O1gY6Q')`,
            }}
          />

          {/* Text Editorial Note */}
          <div className="p-8 md:p-14 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#72252e]"></span>
              <span className="font-sans-luxury text-[11px] uppercase tracking-[0.25em] text-[#72252e] font-bold">
                The Atelier Note • Vol. IV
              </span>
            </div>

            <h3 className="font-editorial text-3xl md:text-4xl text-[#121110] leading-tight">
              Crafting the Modern Silhouette
            </h3>

            <p className="font-sans-luxury text-sm text-[#4b4640] leading-relaxed">
              Designed between Paris and Milan, our Autumn collection reconciles architectural volume with effortless daily wear. Every garment begins with responsibly gathered raw yarns and unhurried tailoring in historic Italian mills.
            </p>

            <div className="pt-2">
              <button
                onClick={() => alert("Opening full Atelier Vol. IV lookbook...")}
                className="inline-flex items-center gap-2 font-sans-luxury text-xs text-[#121110] uppercase tracking-widest font-bold underline underline-offset-8 hover:text-[#72252e] transition-colors"
              >
                <span>Read The Editorial Story</span>
                <ArrowRight className="w-4 h-4" />
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
    </div>
  );
};

export default Products;

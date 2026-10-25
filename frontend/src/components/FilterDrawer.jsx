import React, { useEffect, useRef } from "react";
import { X, SlidersHorizontal, Check, RotateCcw, ArrowRight } from "lucide-react";
import gsap from "gsap";

const SORT_OPTIONS = [
  { id: "newest", label: "Newest Arrivals", desc: "Latest runway & capsule releases" },
  { id: "price_asc", label: "Price: Low to High", desc: "Curated entry to investment pieces" },
  { id: "price_desc", label: "Price: High to Low", desc: "Haute couture & bespoke atelier" },
];

const GENDER_TABS = [
  { id: "All", label: "All" },
  { id: "Women", label: "Women" },
  { id: "Men", label: "Men" },
];

const FilterDrawer = ({
  isOpen,
  onClose,
  sort,
  setSort,
  category,
  setCategory,
  genderFilter,
  setGenderFilter,
  categories = [],
  activeFiltersCount,
  clearFilters,
  totalProducts = 0,
}) => {
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Filter categories according to active department
  const filteredCategories = categories.filter((cat) => {
    if (genderFilter === "Women") return cat.toLowerCase().startsWith("women");
    if (genderFilter === "Men") return cat.toLowerCase().startsWith("men");
    return true;
  });

  const handleGenderChange = (tabId) => {
    setGenderFilter(tabId);
    // If current category does not match newly selected department, reset category to All
    if (tabId === "Women" && category !== "All" && !category.toLowerCase().startsWith("women")) {
      setCategory("All");
    } else if (tabId === "Men" && category !== "All" && !category.toLowerCase().startsWith("men")) {
      setCategory("All");
    }
  };

  const handleCategoryClick = (cat) => {
    if (category === cat) {
      setCategory("All");
    } else {
      setCategory(cat);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs opacity-0 transition-opacity"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        style={{ transform: "translateX(100%)" }}
        className="absolute top-0 right-0 h-full w-full sm:max-w-md bg-[#fff8f4] shadow-2xl flex flex-col z-10 border-l border-[#ede0d7]"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-[#ede0d7] flex items-center justify-between bg-[#fef1e8]/70">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#121110]" />
            <h2 className="font-editorial text-base sm:text-lg uppercase tracking-wider text-[#121110]">
              Filter &amp; Sort
            </h2>
            {activeFiltersCount > 0 && (
              <span className="text-[9px] font-sans-luxury uppercase tracking-wider bg-[#72252e] text-white px-2 py-0.5 rounded-full font-bold">
                {activeFiltersCount} Active
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close filter drawer"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#4b4640] hover:text-[#121110] hover:bg-[#ede0d7]/70 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4 sm:space-y-5">
          {/* Active Filters Reset Bar */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between bg-[#f9ece2] p-2.5 sm:p-3 rounded border border-[#ede0d7]">
              <span className="text-[11px] sm:text-xs font-sans-luxury text-[#4b4640]">
                {activeFiltersCount} {activeFiltersCount === 1 ? "filter" : "filters"} applied
              </span>
              <button
                onClick={clearFilters}
                className="text-[11px] sm:text-xs font-sans-luxury uppercase tracking-wider text-[#72252e] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}

          {/* 1. Sort Section */}
          <div>
            <h3 className="text-[9.5px] sm:text-[10px] font-sans-luxury uppercase tracking-[0.2em] text-[#7c766f] font-bold mb-2 sm:mb-2.5">
              Sort Silhouettes
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = sort === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSort(opt.id)}
                    className={`w-full p-2.5 sm:p-3 rounded border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#121110] text-white border-[#121110] shadow-xs"
                        : "bg-white text-[#201a15] border-[#ede0d7] hover:border-[#121110]"
                    }`}
                  >
                    <div>
                      <div className="font-sans-luxury text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                        {opt.label}
                      </div>
                      <div
                        className={`text-[10px] sm:text-[11px] font-sans-luxury mt-0.5 ${
                          isSelected ? "text-white/70" : "text-[#7c766f]"
                        }`}
                      >
                        {opt.desc}
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Department Tab Section (Clean single-line labels: All | Women | Men) */}
          <div>
            <h3 className="text-[9.5px] sm:text-[10px] font-sans-luxury uppercase tracking-[0.2em] text-[#7c766f] font-bold mb-2 sm:mb-2.5">
              Department
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {GENDER_TABS.map((tab) => {
                const isSelected = genderFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleGenderChange(tab.id)}
                    className={`py-2 px-1 rounded text-[10.5px] sm:text-xs font-sans-luxury uppercase tracking-wider font-semibold transition-all text-center cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-[#121110] text-white shadow-xs"
                        : "bg-white text-[#201a15] border border-[#ede0d7] hover:border-[#121110]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Categories / Silhouettes Section */}
          <div>
            <div className="flex items-center justify-between mb-2 sm:mb-2.5">
              <h3 className="text-[9.5px] sm:text-[10px] font-sans-luxury uppercase tracking-[0.2em] text-[#7c766f] font-bold">
                Atelier Silhouettes
              </h3>
              {category !== "All" && (
                <button
                  onClick={() => setCategory("All")}
                  className="text-[10px] font-sans-luxury uppercase tracking-wider text-[#72252e] hover:underline cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button
                onClick={() => setCategory("All")}
                className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded text-[10px] sm:text-xs font-sans-luxury uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  category === "All"
                    ? "bg-[#72252e] text-white shadow-xs"
                    : "bg-white text-[#201a15] border border-[#ede0d7] hover:border-[#121110]"
                }`}
              >
                All Silhouettes
              </button>

              {filteredCategories.map((cat) => {
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded text-[10px] sm:text-xs font-sans-luxury tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#121110] text-white font-bold shadow-xs"
                        : "bg-white text-[#201a15] border border-[#ede0d7] hover:border-[#121110]"
                    }`}
                  >
                    <span>{cat}</span>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-3.5 sm:p-5 border-t border-[#ede0d7] bg-[#fef1e8]/70 flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              clearFilters();
            }}
            disabled={activeFiltersCount === 0}
            className={`py-2.5 px-3 border border-[#cdc5bd] text-[10.5px] sm:text-xs font-sans-luxury uppercase tracking-wider font-semibold text-center rounded transition-all shrink-0 ${
              activeFiltersCount === 0
                ? "opacity-50 cursor-not-allowed text-[#7c766f]"
                : "text-[#121110] hover:border-[#121110] hover:bg-white cursor-pointer"
            }`}
          >
            Reset
          </button>

          <button
            onClick={() => {
              onClose();
              document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-1 py-2.5 px-3 bg-[#121110] text-white hover:bg-[#72252e] text-[10.5px] sm:text-xs font-sans-luxury uppercase tracking-widest font-bold text-center rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
          >
            <span>Apply Filters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;

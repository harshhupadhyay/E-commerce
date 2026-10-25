import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  // If there's only 1 page or none, don't show pagination buttons
  if (!totalPages || totalPages <= 1) return null;

  return (
    <nav
      aria-label="Catalogue pagination"
      className="flex items-center justify-center gap-2 sm:gap-4 mt-12 mb-6 select-none"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        aria-label="Go to previous page"
        className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 text-xs font-sans-luxury uppercase tracking-wider transition-all border rounded ${
          page === 1
            ? "border-[#ede0d7] text-[#cdc5bd] cursor-not-allowed bg-transparent"
            : "border-[#121110] text-[#121110] hover:bg-[#121110] hover:text-white bg-white shadow-xs cursor-pointer active:scale-95"
        }`}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="hidden xs:inline">Prev</span>
      </button>

      {/* Page Indicator */}
      <div className="flex items-center gap-1 px-3 py-2 bg-white border border-[#ede0d7] rounded text-xs font-sans-luxury text-[#4b4640] shadow-xs">
        <span className="text-[#7c766f]">Page</span>
        <strong className="text-[#121110] font-semibold">{page}</strong>
        <span className="text-[#cdc5bd]">/</span>
        <strong className="text-[#121110] font-semibold">{totalPages}</strong>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        aria-label="Go to next page"
        className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 text-xs font-sans-luxury uppercase tracking-wider transition-all border rounded ${
          page === totalPages
            ? "border-[#ede0d7] text-[#cdc5bd] cursor-not-allowed bg-transparent"
            : "border-[#121110] text-[#121110] hover:bg-[#121110] hover:text-white bg-white shadow-xs cursor-pointer active:scale-95"
        }`}
      >
        <span className="hidden xs:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
};

export default Pagination;

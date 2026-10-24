import React from "react";

const ProductSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          {/* 3:4 Ratio Image Placeholder */}
          <div className="w-full aspect-[3/4] rounded bg-[#ede0d7] skeleton-shimmer overflow-hidden relative">
            <div className="absolute top-2.5 left-2.5 w-16 h-4 bg-white/40 rounded"></div>
          </div>

          {/* Text Line Placeholders */}
          <div className="space-y-1.5 pt-1">
            <div className="w-20 h-2.5 bg-[#ede0d7] skeleton-shimmer rounded"></div>
            <div className="w-4/5 h-4 bg-[#ede0d7] skeleton-shimmer rounded"></div>
            <div className="flex items-center justify-between pt-1">
              <div className="w-16 h-4 bg-[#ede0d7] skeleton-shimmer rounded"></div>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ede0d7] skeleton-shimmer"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ede0d7] skeleton-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;

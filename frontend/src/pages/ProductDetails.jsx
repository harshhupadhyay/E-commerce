import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { Star, ShieldCheck, Truck, RefreshCw, ChevronDown, Check, ArrowLeft, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import ProductGuideModal from "../components/ProductGuideModal";
import { resolveImageUrl } from "../utils/imageUrl";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Oxblood Burgundy");
  const [openAccordion, setOpenAccordion] = useState("composition");
  const [added, setAdded] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isLiked = isInWishlist(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        const data = response.data.data;
        setProduct(data);
        setActiveImage(0);
        if (data?.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        console.error("Not able to fetch product details:", err.message);
        setError(err.response?.data?.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning("Please select a silhouette size to proceed to bag.");
      return;
    }
    addToCart(product, selectedSize, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 animate-pulse">
        <div className="w-32 h-4 bg-[#ede0d7] rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-[#ede0d7] rounded"></div>
          <div className="space-y-4">
            <div className="w-24 h-4 bg-[#ede0d7] rounded"></div>
            <div className="w-3/4 h-8 bg-[#ede0d7] rounded"></div>
            <div className="w-32 h-6 bg-[#ede0d7] rounded"></div>
            <div className="w-full h-32 bg-[#ede0d7] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-sm text-[#ba1a1a] mb-4">{error || "Product not found."}</p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-[#121110] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#72252e] transition-colors"
        >
          ← Return to Collection
        </Link>
      </div>
    );
  }

  const images = (product.images && product.images.length > 0 ? product.images : [""]).map(resolveImageUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Editorial Breadcrumb Bar */}
      <div className="flex items-center justify-between text-xs font-sans-luxury uppercase tracking-wider text-[#7c766f] mb-8 pb-4 border-b border-[#ede0d7]">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-[#121110] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Archive</span>
          </Link>
          <span>/</span>
          <span className="text-[#201a15] font-semibold truncate max-w-[200px]">
            {product.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleWishlist(product)}
            className="p-1.5 text-[#7c766f] hover:text-[#72252e] transition-colors cursor-pointer"
            title={isLiked ? "Remove from Wishlist" : "Save to Wishlist"}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-[#72252e] text-[#72252e]" : ""}`} />
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Silhouette link copied to clipboard.");
              }
            }}
            className="p-1.5 text-[#7c766f] hover:text-[#121110] transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        {/* Left Column: Interactive Multi-Angle Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
          {/* Main Photo Showcase */}
          <div className="relative w-full aspect-[3/4] bg-[#f9ece2] rounded overflow-hidden border border-[#ede0d7] shadow-xs">
            <img
              src={images[activeImage] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-all duration-500 ease-out"
            />

            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#fff8f4]/90 backdrop-blur-md text-[#121110] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded text-[9px] sm:text-[10px] font-sans-luxury uppercase tracking-widest font-semibold border border-[#ede0d7]">
              Haute Édition • Ref. {product._id?.slice(-6).toUpperCase()}
            </span>

            {/* Slide Index Badge */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-[#121110]/80 backdrop-blur-md text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-sans-luxury tracking-widest">
              {activeImage + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-22 sm:w-18 sm:h-24 shrink-0 rounded overflow-hidden border transition-all ${
                    activeImage === idx
                      ? "border-2 border-[#121110] shadow-sm scale-102"
                      : "border-[#ede0d7] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Angle ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Editorial Product Meta & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-5 sm:space-y-6">
          {/* Brand & Reviews */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-sans-luxury uppercase tracking-[0.22em] text-[#72252e] font-bold">
                Aurelia &amp; Noir Atelier
              </span>

              <div className="flex items-center gap-1 text-[11px] text-[#9e7d47]">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#9e7d47]" />
                  ))}
                </div>
                <span className="font-semibold ml-1 text-[#201a15]">(48)</span>
              </div>
            </div>

            <h1 className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#121110] leading-snug sm:leading-tight pt-1">
              {product.name}
            </h1>
          </div>

          {/* Price & Klarna */}
          <div className="space-y-1 pb-4 border-b border-[#ede0d7]">
            <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
              <span className="font-sans-luxury text-xl sm:text-2xl font-bold text-[#121110]">
                ₹{product.price}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase font-sans-luxury tracking-wider text-[#72252e] font-semibold">
                Taxes &amp; Duties Included
              </span>
            </div>
            <p className="text-xs text-[#7c766f]">
              Or 4 interest-free payments of{" "}
              <strong className="text-[#201a15]">₹{Math.round(product.price / 4)}</strong> with Klarna
            </p>
          </div>

          {/* Color Palette Swatches */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Curated Color: <span className="font-normal text-[#7c766f]">{selectedColor}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {[
                { name: "Oxblood Burgundy", bg: "#541620" },
                { name: "Noir Black", bg: "#161616" },
                { name: "Muted Camel", bg: "#9f7d5c" },
                { name: "Olive Taupe", bg: "#5b584d" },
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    selectedColor === c.name
                      ? "ring-2 ring-[#121110] ring-offset-2 scale-105"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <span className="w-6 h-6 rounded-full" style={{ backgroundColor: c.bg }} />
                </button>
              ))}
            </div>
          </div>

          {/* Size Matrix */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Select Size:
              </span>
              {(() => {
                const cat = (product.category || "").toLowerCase();
                const name = (product.name || "").toLowerCase();
                const isFrag = cat.includes("fragrance") || cat.includes("perfume") || cat.includes("beauty") || name.includes("parfum") || name.includes("eau de");
                const isShoe = cat.includes("shoe") || cat.includes("loafer") || cat.includes("boot") || cat.includes("footwear");
                const isBag = cat.includes("bag") || cat.includes("tote") || cat.includes("clutch");
                const guideLabel = isFrag ? "Olfactory Guide" : isShoe ? "Footwear Sizing" : isBag ? "Dimensions" : "Size Guide";
                return (
                  <button
                    type="button"
                    onClick={() => setIsGuideOpen(true)}
                    className="text-[11px] uppercase tracking-wider text-[#7c766f] hover:text-[#121110] underline underline-offset-4 cursor-pointer"
                  >
                    {guideLabel}
                  </button>
                );
              })()}
            </div>

            <div className="flex gap-2 flex-wrap">
              {product.sizes?.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded text-xs font-sans-luxury font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#121110] text-white shadow-xs"
                        : "bg-[#f9ece2] text-[#201a15] hover:bg-[#ede0d7]"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <p className="font-sans-luxury text-xs text-[#4b4640] leading-relaxed pt-2">
            {product.description}
          </p>

          {/* Stock Availability */}
          <div className="flex items-center gap-2 text-xs font-sans-luxury flex-wrap">
            <span
              className={`w-2 h-2 rounded-full ${
                product.stock > 0 ? "bg-[#059669] animate-pulse" : "bg-[#ba1a1a]"
              }`}
            />
            <span className={product.stock > 0 ? "text-[#059669] font-semibold" : "text-[#ba1a1a]"}>
              {product.stock > 0
                ? isAdmin
                  ? `In Stock (${product.stock} units available in Milan atelier)`
                  : "In Stock (Available in Milan atelier)"
                : "Out of Stock"}
            </span>
            {isAdmin && product.stock > 0 && (
              <span className="px-2 py-0.5 bg-[#ede0d7] text-[#72252e] text-[10px] font-bold uppercase tracking-wider rounded">
                Admin: {product.stock} pieces
              </span>
            )}
          </div>

          {/* Add to Bag CTA Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3.5 sm:py-4 text-xs font-sans-luxury uppercase tracking-[0.2em] font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
              product.stock === 0
                ? "bg-[#cdc5bd] cursor-not-allowed"
                : added
                ? "bg-[#059669]"
                : "bg-[#121110] hover:bg-[#72252e] active:scale-[0.99]"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <span>Add to Bag • ₹{product.price}</span>
            )}
          </button>

          {/* Luxury Accordions */}
          <div className="pt-4 border-t border-[#ede0d7] divide-y divide-[#ede0d7]">
            {/* Accordion 1: Composition & Mills */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion("composition")}
                className="w-full flex items-center justify-between text-left font-sans-luxury text-xs uppercase tracking-wider font-semibold text-[#121110]"
              >
                <span>Composition &amp; Italian Mills</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === "composition" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "composition" && (
                <div className="pt-3 text-xs text-[#4b4640] leading-relaxed space-y-1.5">
                  <p>• 90% Certified Italian Virgin Wool, 10% Cashmere blend.</p>
                  <p>• Genuine dark buffalo horn buttons with engraved atelier logo.</p>
                  <p>• Dry clean only with gentle organic solvents.</p>
                </div>
              )}
            </div>

            {/* Accordion 2: Tailored Fit */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion("fit")}
                className="w-full flex items-center justify-between text-left font-sans-luxury text-xs uppercase tracking-wider font-semibold text-[#121110]"
              >
                <span>Tailored Fit &amp; Model Measurements</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === "fit" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "fit" && (
                <div className="pt-3 text-xs text-[#4b4640] leading-relaxed space-y-1.5">
                  <p>• Architectural silhouette with subtle drop-shoulder drape.</p>
                  <p>• Model is 178 cm / 5'10" and is wearing size S.</p>
                  <p>• Designed for effortless layering over heavy knitwear.</p>
                </div>
              )}
            </div>

            {/* Accordion 3: Delivery & Returns */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex items-center justify-between text-left font-sans-luxury text-xs uppercase tracking-wider font-semibold text-[#121110]"
              >
                <span>Complimentary Delivery &amp; Returns</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "shipping" && (
                <div className="pt-3 text-xs text-[#4b4640] leading-relaxed space-y-1.5">
                  <p>• Carbon-neutral express courier dispatched within 24 hours.</p>
                  <p>• Delivered in signature archival box with canvas garment sleeve.</p>
                  <p>• Complimentary 30-day doorstep return pickup.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Universal Category-Aware Product Guide Modal */}
      <ProductGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetails;

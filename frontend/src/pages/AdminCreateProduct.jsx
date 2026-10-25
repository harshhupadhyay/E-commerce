import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../services/api";
import { ArrowLeft, Upload, X, Shield, Plus } from "lucide-react";

const AdminCreateProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      await api.post("/products", formData);
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create silhouette");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-10">
      {/* Breadcrumb Back */}
      <div className="mb-4 sm:mb-6">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-sans-luxury uppercase tracking-wider text-[#7c766f] hover:text-[#121110] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Product Archive</span>
        </Link>
      </div>

      <div className="bg-white p-4 sm:p-8 md:p-12 rounded border border-[#ede0d7] shadow-xs">
        {/* Header */}
        <div className="pb-5 sm:pb-6 border-b border-[#ede0d7] space-y-1">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#72252e]" />
            <span className="font-sans-luxury text-[9.5px] sm:text-[10px] uppercase tracking-[0.25em] text-[#72252e] font-bold">
              Atelier Archive • New Ingestion
            </span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl text-[#121110] uppercase tracking-wider mt-0.5">
            Create Garment Silhouette
          </h1>
          <p className="text-xs font-sans-luxury text-[#7c766f]">
            Introduce a new tailored piece into the Aurelia &amp; Noir collection catalog.
          </p>
        </div>

        {error && (
          <div className="mt-6 p-3 bg-[#fee2e2] text-[#991b1b] text-xs font-sans-luxury rounded border border-[#fecaca]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Garment Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Garment Title *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Sculpted Wool Double-Breasted Trench"
                className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
              />
            </div>

            {/* Department / Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Department / Category *
              </label>
              <input
                type="text"
                name="category"
                required
                placeholder="e.g. Women's Suits & Tailoring"
                className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                placeholder="4950"
                className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
              />
            </div>

            {/* Stock */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Initial Stock Units *
              </label>
              <input
                type="number"
                name="stock"
                defaultValue="20"
                min="0"
                className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
              />
            </div>

            {/* Sizes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Sizes (Comma separated) *
              </label>
              <input
                type="text"
                name="sizes"
                required
                placeholder="XS, S, M, L, XL"
                className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
              />
            </div>
          </div>

          {/* Editorial Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
              Editorial Description &amp; Fabric Notes *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Structured tailored silhouette crafted from Italian virgin wool loomed in Biella. Features notched wide lapels, horn buttons, and relaxed natural shoulder drape."
              className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury p-4 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110] leading-relaxed"
            />
          </div>

          {/* Photo Upload Area */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
              Photoshoot Assets (Up to 5 images) *
            </label>
            <div className="border-2 border-dashed border-[#ede0d7] rounded-lg p-6 text-center bg-[#fef1e8]/40 hover:bg-[#fef1e8] transition-colors relative">
              <Upload className="w-8 h-8 text-[#7c766f] mx-auto mb-2" />
              <p className="text-xs text-[#201a15] font-semibold">
                Click to upload multi-angle photoshoot images
              </p>
              <p className="text-[11px] text-[#7c766f] mt-0.5">
                PNG, JPG, WEBP up to 10MB each
              </p>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                required
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pt-3">
                {previews.map((src, index) => (
                  <div
                    key={index}
                    className="w-20 h-26 rounded bg-[#ede0d7] overflow-hidden border border-[#ede0d7] shrink-0"
                  >
                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#ede0d7] flex items-center justify-end gap-3">
            <Link
              to="/admin/products"
              className="px-6 py-3 border border-[#ede0d7] rounded text-xs uppercase tracking-wider text-[#7c766f] hover:text-[#121110] font-semibold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#121110] text-white text-xs uppercase tracking-[0.2em] font-bold rounded hover:bg-[#72252e] transition-colors disabled:bg-[#cdc5bd]"
            >
              {loading ? "Publishing Silhouette..." : "Publish to Catalog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateProduct;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import api from "../services/api";
import { ArrowLeft, Upload, Shield, Save } from "lucide-react";
import { resolveImageUrl } from "../utils/imageUrl";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newPreviews, setNewPreviews] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const formData = new FormData(e.target);
    const imageInput = e.target.images;
    if (!imageInput?.files || imageInput.files.length === 0) {
      formData.delete("images");
    }

    try {
      await api.put(`/products/${id}`, formData);
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update silhouette");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-xs font-sans-luxury text-[#7c766f]">
        Loading silhouette details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-xs font-sans-luxury text-[#ba1a1a]">
        {error || "Silhouette not found in archive."}
      </div>
    );
  }

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
              Atelier Archive • Catalog Revision
            </span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl text-[#121110] uppercase tracking-wider mt-0.5">
            Edit Silhouette #{product._id?.slice(-6).toUpperCase()}
          </h1>
          <p className="text-xs font-sans-luxury text-[#7c766f]">
            Update tailoring specifications, inventory volume, or pricing for this garment.
          </p>
        </div>

        {error && (
          <div className="mt-6 p-3 bg-[#fee2e2] text-[#991b1b] text-xs font-sans-luxury rounded border border-[#fecaca]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Garment Title *
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={product.name}
                className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Department / Category *
              </label>
              <input
                type="text"
                name="category"
                required
                defaultValue={product.category}
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
                defaultValue={product.price}
                className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
              />
            </div>

            {/* Stock */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Stock Volume *
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                defaultValue={product.stock}
                className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
              />
            </div>

            {/* Sizes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Sizes *
              </label>
              <input
                type="text"
                name="sizes"
                required
                defaultValue={
                  Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes
                }
                className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury px-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
              Editorial Description &amp; Fabric Notes *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={product.description}
              className="w-full bg-[#f9ece2]/50 text-xs font-sans-luxury p-4 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110] leading-relaxed"
            />
          </div>

          {/* Current Images Display */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
              Archival Photoshoot Angles (Current)
            </label>
            <div className="flex gap-3 overflow-x-auto py-1">
              {product.images?.map((img, index) => (
                <div
                  key={index}
                  className="w-20 h-26 rounded bg-[#ede0d7] overflow-hidden border border-[#ede0d7] shrink-0"
                >
                  <img src={resolveImageUrl(img)} alt="Current" className="w-full h-full object-cover object-top" />
                </div>
              ))}
            </div>
          </div>

          {/* Upload New Images (Optional) */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
              Replace Photoshoot Assets (Optional)
            </label>
            <div className="border-2 border-dashed border-[#ede0d7] rounded-lg p-6 text-center bg-[#fef1e8]/40 hover:bg-[#fef1e8] transition-colors relative">
              <Upload className="w-8 h-8 text-[#7c766f] mx-auto mb-2" />
              <p className="text-xs text-[#201a15] font-semibold">
                Click to replace images with new multi-angle photos
              </p>
              <p className="text-[11px] text-[#7c766f] mt-0.5">
                Leave empty to preserve existing photoshoot assets
              </p>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {newPreviews.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pt-3">
                {newPreviews.map((src, index) => (
                  <div
                    key={index}
                    className="w-20 h-26 rounded bg-[#ede0d7] overflow-hidden border-2 border-[#121110] shrink-0"
                  >
                    <img src={src} alt="New Preview" className="w-full h-full object-cover" />
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
              disabled={saving}
              className="px-8 py-3 bg-[#121110] text-white text-xs uppercase tracking-[0.2em] font-bold rounded hover:bg-[#72252e] transition-colors disabled:bg-[#cdc5bd] flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Changes..." : "Commit Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;

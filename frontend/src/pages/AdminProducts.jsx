import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../services/api";
import { Plus, Edit2, Trash2, Search, ArrowLeft, Shield, AlertTriangle, Package, Tag, Layers } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products", {
        params: {
          page,
          limit: 15,
          search: search.trim() || undefined,
        },
      });
      const data = response.data.data;
      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalProducts(data.pagination?.totalProducts || 0);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = (id, name, img = "") => {
    setDeleteTarget({ id, name, img });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await api.delete(`/products/${deleteTarget.id}`);
      setProducts((prev) => prev.filter((product) => product._id !== deleteTarget.id));
      setTotalProducts((prev) => Math.max(0, prev - 1));
      toast.success("Silhouette Deleted", {
        description: `"${deleteTarget.name}" has been permanently removed.`,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-10">
      {/* Top Breadcrumb */}
      <div className="mb-4 sm:mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-sans-luxury uppercase tracking-wider text-[#7c766f] hover:text-[#121110] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Storefront</span>
        </Link>
      </div>

      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 sm:pb-6 border-b border-[#ede0d7]">
        <div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#72252e]" />
            <span className="font-sans-luxury text-[9.5px] sm:text-[10px] uppercase tracking-[0.25em] text-[#72252e] font-bold">
              Atelier Management • Catalog Control
            </span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#121110] uppercase tracking-tight mt-1">
            Product Archive
          </h1>
          <p className="text-xs font-sans-luxury text-[#7c766f] mt-0.5 sm:mt-1">
            Manage seasonal silhouettes, pricing, inventory stock, and photoshoot assets.
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[#121110] text-white text-xs font-sans-luxury uppercase tracking-widest font-bold rounded hover:bg-[#72252e] transition-colors shadow-xs w-full sm:w-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Silhouette</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-[#f9ece2] rounded border border-[#ede0d7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#7c766f] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search archive by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-white text-xs font-sans-luxury pl-9 pr-4 py-2 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
          />
        </div>

        <span className="text-xs font-sans-luxury text-[#7c766f]">
          Total Catalog Size: <strong className="text-[#121110]">{totalProducts}</strong> Silhouettes
        </span>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-[#fee2e2] text-[#991b1b] text-xs font-sans-luxury rounded border border-[#fecaca]">
          {error}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center text-xs font-sans-luxury text-[#7c766f]">
          Loading atelier catalog...
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center bg-white rounded border border-[#ede0d7] mt-6 p-8">
          <AlertTriangle className="w-8 h-8 text-[#7c766f] mx-auto mb-2" />
          <p className="font-editorial text-lg text-[#121110]">No silhouettes found</p>
          <p className="text-xs text-[#7c766f] mt-1">Try modifying your search query or add a new piece.</p>
        </div>
      ) : (
        <>
          {/* ========================================================================= */}
          {/* 1. MOBILE & TABLET RESPONSIVE CARDS VIEW (< 1024px) */}
          {/* Every price, stock, category, sizes, and action buttons are 100% visible! */}
          {/* ========================================================================= */}
          <div className="block lg:hidden mt-5 space-y-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded border border-[#ede0d7] p-3.5 sm:p-4 shadow-xs hover:border-[#121110] transition-colors"
              >
                {/* Top Section: Photo + Category + Title + ID */}
                <div className="flex gap-3 items-start">
                  {/* Photo Thumbnail */}
                  <div className="w-14 h-18 sm:w-16 sm:h-20 bg-[#f9ece2] rounded overflow-hidden shrink-0 border border-[#ede0d7]">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-[#7c766f]">
                        No img
                      </div>
                    )}
                  </div>

                  {/* Info Cluster */}
                  <div className="min-w-0 flex-1">
                    {/* Category pill */}
                    <span className="inline-block bg-[#f9ece2] text-[#121110] px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold mb-1 truncate max-w-full">
                      {product.category}
                    </span>

                    {/* Product Name (refined font size to never dwarf image) */}
                    <Link
                      to={`/products/${product._id}`}
                      className="text-xs sm:text-[13px] font-sans-luxury font-semibold text-[#121110] hover:text-[#72252e] transition-colors line-clamp-2 leading-snug block"
                    >
                      {product.name}
                    </Link>

                    {/* ID */}
                    <span className="text-[10px] font-mono text-[#7c766f] block mt-0.5">
                      ID: {product._id?.slice(-8)}
                    </span>
                  </div>
                </div>

                {/* Middle Section: Retail Price, Stock & Sizing Matrix */}
                <div className="mt-3 pt-2.5 border-t border-[#ede0d7] grid grid-cols-2 gap-2 text-xs font-sans-luxury">
                  {/* Price */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7c766f] block">
                      Retail Price
                    </span>
                    <strong className="text-xs sm:text-sm text-[#121110] font-bold">
                      ₹{product.price}
                    </strong>
                  </div>

                  {/* Stock Status */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7c766f] block">
                      Stock Status
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        product.stock > 0
                          ? "bg-[#d1fae5] text-[#065f46]"
                          : "bg-[#fee2e2] text-[#991b1b]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          product.stock > 0 ? "bg-[#059669]" : "bg-[#ba1a1a]"
                        }`}
                      />
                      {product.stock > 0 ? `${product.stock} Units` : "Sold Out"}
                    </span>
                  </div>

                  {/* Available Sizing */}
                  <div className="col-span-2 pt-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#7c766f] mr-1.5">
                      Sizes:
                    </span>
                    <span className="text-[11px] font-semibold text-[#121110]">
                      {Array.isArray(product.sizes)
                        ? product.sizes.join(", ")
                        : product.sizes || "—"}
                    </span>
                  </div>
                </div>

                {/* Bottom Section: Action CTAs (Edit & Delete) */}
                <div className="mt-3 pt-2.5 border-t border-[#ede0d7] flex items-center justify-end gap-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#f9ece2] text-[#121110] hover:bg-[#121110] hover:text-white text-[11px] font-sans-luxury uppercase tracking-wider font-semibold rounded border border-[#ede0d7] transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id, product.name, product.images?.[0])}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#fee2e2]/60 text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white text-[11px] font-sans-luxury uppercase tracking-wider font-semibold rounded border border-[#fecaca] transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* 2. DESKTOP LUXURY TABLE VIEW (>= 1024px) */}
          {/* ========================================================================= */}
          <div className="hidden lg:block mt-6 bg-white rounded border border-[#ede0d7] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs font-sans-luxury border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#fef1e8] text-[#121110] uppercase tracking-wider text-[10px] font-bold border-b border-[#ede0d7]">
                  <th className="py-3.5 px-4 w-[34%]">Garment</th>
                  <th className="py-3.5 px-4 w-[20%]">Department / Category</th>
                  <th className="py-3.5 px-4 w-[12%]">Retail Price</th>
                  <th className="py-3.5 px-4 w-[14%]">Stock Status</th>
                  <th className="py-3.5 px-4 w-[12%]">Available Sizes</th>
                  <th className="py-3.5 px-4 w-[8%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede0d7]">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-[#fff8f4] transition-colors">
                    {/* Photo & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-16 bg-[#f9ece2] rounded overflow-hidden shrink-0 border border-[#ede0d7]">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-[#7c766f]">
                              None
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-sm">
                          <Link
                            to={`/products/${product._id}`}
                            className="font-sans-luxury font-semibold text-xs sm:text-[13px] text-[#121110] hover:text-[#72252e] truncate block leading-snug"
                          >
                            {product.name}
                          </Link>
                          <span className="text-[10px] font-mono text-[#7c766f]">
                            ID: {product._id?.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="bg-[#f9ece2] text-[#121110] px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold inline-block truncate max-w-[180px]">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-[#121110]">
                      ₹{product.price}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold ${
                          product.stock > 0
                            ? "bg-[#d1fae5] text-[#065f46]"
                            : "bg-[#fee2e2] text-[#991b1b]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.stock > 0 ? "bg-[#059669]" : "bg-[#ba1a1a]"
                          }`}
                        />
                        {product.stock > 0 ? `${product.stock} Units` : "Sold Out"}
                      </span>
                    </td>

                    {/* Sizes */}
                    <td className="py-3 px-4 text-[#7c766f]">
                      {Array.isArray(product.sizes)
                        ? product.sizes.join(", ")
                        : product.sizes || "—"}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="p-1.5 text-[#4b4640] hover:text-[#121110] hover:bg-[#ede0d7] rounded transition-colors"
                          title="Edit Silhouette"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id, product.name, product.images?.[0])}
                          className="p-1.5 text-[#7c766f] hover:text-[#ba1a1a] hover:bg-[#fee2e2] rounded transition-colors cursor-pointer"
                          title="Delete Silhouette"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-sans-luxury text-[#7c766f]">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-[#ede0d7] rounded bg-white text-[#121110] disabled:opacity-40 hover:bg-[#f9ece2] transition-colors cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-[#ede0d7] rounded bg-white text-[#121110] disabled:opacity-40 hover:bg-[#f9ece2] transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Luxury Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        productName={deleteTarget?.name}
        productImg={deleteTarget?.img}
      />
    </div>
  );
};

export default AdminProducts;

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../services/api";
import { Plus, Edit2, Trash2, Search, ArrowLeft, Shield, AlertTriangle } from "lucide-react";

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

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you wish to delete "${name}" from the atelier catalog?`
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      setTotalProducts((prev) => Math.max(0, prev - 1));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Top Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-sans-luxury uppercase tracking-wider text-[#7c766f] hover:text-[#121110] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </Link>
      </div>

      {/* Header & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#ede0d7]">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#72252e]" />
            <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#72252e] font-bold">
              Atelier Management • Catalog Control
            </span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl text-[#121110] uppercase tracking-tight mt-1">
            Product Archive
          </h1>
          <p className="text-xs font-sans-luxury text-[#7c766f] mt-1">
            Manage seasonal silhouettes, pricing, inventory stock, and photoshoot assets.
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#121110] text-white text-xs font-sans-luxury uppercase tracking-widest font-bold rounded hover:bg-[#72252e] transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Silhouette</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="mt-6 p-4 bg-[#f9ece2] rounded border border-[#ede0d7] flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-[#7c766f] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search archive by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-white text-xs font-sans-luxury pl-9 pr-4 py-2.5 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110]"
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

      {/* Table */}
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
        <div className="mt-6 bg-white rounded border border-[#ede0d7] overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs font-sans-luxury border-collapse">
            <thead>
              <tr className="bg-[#fef1e8] text-[#121110] uppercase tracking-wider text-[10px] font-bold border-b border-[#ede0d7]">
                <th className="py-3.5 px-4">Garment</th>
                <th className="py-3.5 px-4">Department / Category</th>
                <th className="py-3.5 px-4">Retail Price</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-4">Available Sizes</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
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
                      <div className="min-w-0 max-w-xs">
                        <Link
                          to={`/products/${product._id}`}
                          className="font-editorial font-semibold text-sm text-[#121110] hover:text-[#72252e] truncate block"
                        >
                          {product.name}
                        </Link>
                        <span className="text-[10px] text-[#7c766f]">
                          ID: {product._id?.slice(-8)}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="bg-[#f9ece2] text-[#121110] px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold">
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
                    <div className="inline-flex items-center gap-2">
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="p-1.5 text-[#4b4640] hover:text-[#121110] hover:bg-[#ede0d7] rounded transition-colors"
                        title="Edit Silhouette"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="p-1.5 text-[#7c766f] hover:text-[#ba1a1a] hover:bg-[#fee2e2] rounded transition-colors"
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
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex justify-between items-center text-xs font-sans-luxury text-[#7c766f]">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-[#ede0d7] rounded bg-white text-[#121110] disabled:opacity-40 hover:bg-[#f9ece2]"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-[#ede0d7] rounded bg-white text-[#121110] disabled:opacity-40 hover:bg-[#f9ece2]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

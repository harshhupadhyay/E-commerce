import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const CATEGORIES = [
  "All",
  "Shirts",
  "Jackets",
  "Hoodies",
  "Trousers",
  "Jeans",
  "T-Shirts",
  "Blazers",
  "Joggers",
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search, Filter, Sort & Pagination States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch products whenever filters or page change
  useEffect(() => {
    const fetchProducts = async () => {
      
      try {
        setLoading(true);
        const response = await api.get("/products", {

          params: {
            page,
            limit: 6,
            search: search.trim() || undefined,
            category: category !== "All" ? category : undefined,
            sort,
          },
        });

        const { products: fetchedProducts, pagination } = response.data.data;
        setProducts(fetchedProducts);
        setTotalPages(pagination.totalPages || 1);
        setTotalProducts(pagination.totalProducts || 0);
      } catch (error) {
        console.log("Not able to fetch", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, sort, page]);

  return (
    <div>
      <h1>Products ({totalProducts})</h1>

      {/* Controls Bar: Search, Category, Sorting */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{ padding: "8px", minWidth: "220px" }}
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          style={{ padding: "8px" }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          style={{ padding: "8px" }}
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found matching your filters.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Products;

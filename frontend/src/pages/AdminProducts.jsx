import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data.data.products);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      // Remove deleted product from UI
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  if (loading) {
    return <p>Loading admin products...</p>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Product Management (Admin)</h1>
        <Link
          to="/admin/products/create"
          style={{
            padding: "8px 16px",
            backgroundColor: "#000",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          + Add New Product
        </Link>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {products.length === 0 ? (
        <p>No products found. Click "Add New Product" to create one.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td style={{ textAlign: "center" }}>
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width="50"
                      height="50"
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    style={{ marginRight: "10px", color: "blue" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;

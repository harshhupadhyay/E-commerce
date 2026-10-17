import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import api from "../services/api";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 1. Fetch current product data to pre-fill the form
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

  // 2. Submit updated product data

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const formData = new FormData(e.target);
    // If no new images were picked, remove the empty file field

    const imageInput = e.target.images;
    if (!imageInput?.files || imageInput.files.length === 0) {
      formData.delete("images");
    }

    try {
      await api.put(`/products/${id}`, formData);
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>{error || "Product not found"}</p>;

  return (
    <div>
      <Link to="/admin/products">← Back to Admin Products</Link>
      <h1>Edit Product</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name: </label>
          <input type="text" name="name" defaultValue={product.name} required />
        </div>

        <div>
          <label>Description: </label>
          <textarea name="description" defaultValue={product.description} required />
        </div>

        <div>
          <label>Price (₹): </label>
          <input type="number" name="price" defaultValue={product.price} required min="0" />
        </div>

        <div>
          <label>Stock: </label>
          <input type="number" name="stock" defaultValue={product.stock} min="0" />
        </div>

        <div>
          <label>Category: </label>
          <input type="text" name="category" defaultValue={product.category} required />
        </div>

        <div>
          <label>Sizes (e.g. S, M, L): </label>
          <input
            type="text"
            name="sizes"
            defaultValue={Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes}
            required
          />
        </div>

        <div>
          <label>Current Images: </label>
          <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="current"
                width="60"
                height="60"
                style={{ objectFit: "cover", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            ))}
          </div>

          <label>Upload New Images (Optional - leave empty to keep current): </label>
          <input type="file" name="images" multiple accept="image/*" />
        </div>

        <br />
        <button type="submit" disabled={saving}>
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;

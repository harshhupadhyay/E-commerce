import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../services/api";
import ImageModal from "../components/ImageModal";

const AdminCreateProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Create simple preview URLs when user selects files
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Browser automatically grabs all inputs and files from the form
    const formData = new FormData(e.target);

    try {
      await api.post("/products", formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to="/">← Back to Store</Link>
      <h1>Create Product</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name: </label>
          <input type="text" name="name" required />
        </div>

        <div>
          <label>Description: </label>
          <textarea name="description" required />
        </div>

        <div>
          <label>Price (₹): </label>
          <input type="number" name="price" required min="0" />
        </div>

        <div>
          <label>Stock: </label>
          <input type="number" name="stock" defaultValue="0" min="0" />
        </div>

        <div>
          <label>Category: </label>
          <input type="text" name="category" placeholder="e.g. Shirts" required />
        </div>

        <div>
          <label>Sizes (e.g. S, M, L): </label>
          <input type="text" name="sizes" placeholder="S, M, L" required />
        </div>

        <div>
          <label>Images (up to 5): </label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            required
            onChange={handleImageChange}
          />

          {/* Clean Image Previews */}
          {previews.length > 0 && (
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {previews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  width="80"
                  height="80"
                  onClick={() => setSelectedImage(src)}
                  title="Click to see full image"
                  style={{
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>

      {/* Full Screen Image Modal */}
      <ImageModal
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default AdminCreateProduct;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../services/api";
import { useCart } from "../hooks/useCart"; // 1. Import useCart

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. State for the size the user clicked
  const [selectedSize, setSelectedSize] = useState("");
  // 3. Grab the addToCart function
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        const data = response.data.data;
        setProduct(data);
        // Default to first size if available
        if (data?.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        console.error("Not able to fetch single product", err.message);
        setError(err.response?.data?.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please choose a size first!");
      return;
    }
    // Call our context function!
    addToCart(product, selectedSize);
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error || !product) {
    return (
      <div>
        <p>{error || "Product not found."}</p>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">← Back to Products</Link>
      <h1>{product.name}</h1>

      <div>
        {product.images?.map((image, index) => (
          <img
            key={image || index}
            src={image}
            alt={`${product.name} ${index + 1}`}
            width="200"
          />
        ))}
      </div>

      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <p>Stock: {product.stock}</p>

      {/* Size Buttons */}
      <div>
        <p><strong>Select Size:</strong></p>
        {product.sizes?.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{
              marginRight: "8px",
              padding: "6px 12px",
              backgroundColor: selectedSize === size ? "black" : "#ddd",
              color: selectedSize === size ? "white" : "black",
              cursor: "pointer",
            }}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Add to Cart Button */}
      <div style={{ marginTop: "16px" }}>
        <button
          onClick={handleAddToCart}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

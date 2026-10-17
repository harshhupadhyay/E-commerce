import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        // Backend returns: { message: "...", data: product }
        setProduct(response.data.data);
      } catch (err) {
        console.error("Not able to fetch single product", err.message);
        setError(err.response?.data?.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      <p>
        Sizes:{" "}
        {Array.isArray(product.sizes)
          ? product.sizes.join(", ")
          : product.sizes}
      </p>
    </div>
  );
};

export default ProductDetails;

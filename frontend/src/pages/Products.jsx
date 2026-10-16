import React, { useEffect, useState } from "react";
import api from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        console.log(response.data.data);
        setProducts(response.data.data.products);
      } catch (error) {
        console.log("Not able to fetch", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (products.length === 0) {
    return <p>No products available yet.</p>;
  }

  return (
    <div>
      <h1>Products</h1>

      <div>
        {products.map((product) => (
          <div key={product._id}>
            {product.images && product.images[0] && (
              <img src={product.images[0]} alt={product.name} />
            )}
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Sizes: {Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

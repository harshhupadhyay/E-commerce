import { useEffect } from "react";
import api from "../services/api";

const Products = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await api.get("/products");

      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
    </div>
  );
};

export default Products;

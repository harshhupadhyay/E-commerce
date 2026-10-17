import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {product.images && product.images[0] && (
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }}
        />
      )}
      <div>
        <h3 style={{ margin: "10px 0 5px" }}>{product.name}</h3>
        <p style={{ fontWeight: "bold", margin: "5px 0" }}>₹{product.price}</p>
        <p style={{ fontSize: "14px", color: "#666", margin: "4px 0" }}>
          Category: {product.category}
        </p>
        <p style={{ fontSize: "14px", color: "#666", margin: "4px 0" }}>
          Sizes: {Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;

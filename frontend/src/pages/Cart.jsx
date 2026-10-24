import React from "react";
import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  // Grab functions from context
  const { cart, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/">← Go to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart ({cart.length} items)</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
        {cart.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              border: "1px solid #ddd",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            {/* Product Image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
              />
            )}

            {/* Product Info */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 4px" }}>{item.name}</h3>
              <p style={{ margin: "0 0 4px", color: "#666" }}>Size: <strong>{item.size}</strong></p>
              <p style={{ margin: 0, fontWeight: "bold" }}>₹{item.price}</p>
            </div>

            {/* Quantity Stepper with - and + */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => decreaseQuantity(item.id, item.size)}
                style={{ padding: "4px 10px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                -
              </button>

              <span style={{ minWidth: "20px", textAlign: "center", fontWeight: "bold" }}>
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.id, item.size)}
                style={{ padding: "4px 10px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                +
              </button>
            </div>

            {/* Remove All Button */}
            <button
              onClick={() => removeFromCart(item.id, item.size)}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/">← Continue Shopping</Link>
      </div>
    </div>
  );
};

export default Cart;

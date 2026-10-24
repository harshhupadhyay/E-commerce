import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  // 1. The list of items in the cart
  const [cart, setCart] = useState([]);

  // 2. Add an item to the list
   const addToCart = (product, size) => {
    // 1. Check if this product with the same size is already in cart
    const alreadyExists = cart.find(
      (item) => item.id === product._id && item.size === size
    );

    if (alreadyExists) {
      // 2. If it already exists, increase its quantity by 1
      const updatedCart = cart.map((item) => {
        if (item.id === product._id && item.size === size) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      // 3. If it's new, add it to the cart
      const newItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        size: size,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }


  };

   // 3. Remove an item from the cart
    const removeFromCart = (productId, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === productId && item.size === size)
    );
    setCart(updatedCart);
  };

    // 4. Decrease quantity by 1 (or remove if only 1 left)
  const decreaseQuantity = (productId, size) => {
    const existing = cart.find(
      (item) => item.id === productId && item.size === size
    );

    if (existing && existing.quantity > 1) {
      // Reduce by 1
      const updatedCart = cart.map((item) => {
        if (item.id === productId && item.size === size) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      // If quantity is 1, delete it completely
      removeFromCart(productId, size);
    }
  };

  // 5. Increase quantity by 1
  const increaseQuantity = (productId, size) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.size === size) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

    // Calculate total quantity of items (for Navbar)
  let totalItems = 0;
  for (let item of cart) {
    totalItems = totalItems + item.quantity;
  }

  // Calculate total money (for the bill)
  let totalPrice = 0;
  for (let item of cart) {
    totalPrice = totalPrice + (item.price * item.quantity);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart ,removeFromCart,decreaseQuantity,increaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

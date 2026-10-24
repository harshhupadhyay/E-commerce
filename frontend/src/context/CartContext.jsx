import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  // 1. The list of items in the cart (persisted in localStorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Slide-over cart drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 2. Every time the cart changes, automatically save it to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 3. Add an item to the list
  const addToCart = (product, size, openDrawer = true) => {
    const alreadyExists = cart.find(
      (item) => item.id === product._id && item.size === size
    );

    if (alreadyExists) {
      const updatedCart = cart.map((item) => {
        if (item.id === product._id && item.size === size) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      const newItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        category: product.category,
        size: size,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }

    if (openDrawer) {
      setIsDrawerOpen(true);
    }
  };

  // 4. Remove an item from the cart
  const removeFromCart = (productId, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === productId && item.size === size)
    );
    setCart(updatedCart);
  };

  // 5. Decrease quantity by 1 (or remove if only 1 left)
  const decreaseQuantity = (productId, size) => {
    const existing = cart.find(
      (item) => item.id === productId && item.size === size
    );

    if (existing && existing.quantity > 1) {
      const updatedCart = cart.map((item) => {
        if (item.id === productId && item.size === size) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      removeFromCart(productId, size);
    }
  };

  // 6. Increase quantity by 1
  const increaseQuantity = (productId, size) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.size === size) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  // 7. Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total quantity of items
  let totalItems = 0;
  for (let item of cart) {
    totalItems = totalItems + item.quantity;
  }

  // Calculate total money
  let totalPrice = 0;
  for (let item of cart) {
    totalPrice = totalPrice + item.price * item.quantity;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        totalItems,
        totalPrice,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

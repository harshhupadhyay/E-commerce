import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import FilterContextProvider from "./context/FilterContext.jsx";
import WishlistContextProvider from "./context/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <CartContextProvider>
      <WishlistContextProvider>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </WishlistContextProvider>
    </CartContextProvider>
  </AuthContextProvider>,
);

import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart"; // 1. Import useCart

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart(); // 2. Grab the cart array

  return (
    <nav>
      <Link to="/">Clothing Store</Link>

      <div>
        <Link to="/">Products</Link>

        {/* 3. Display how many items are in the cart array */}
        <Link to="/cart">Cart ({cart.length})</Link>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin/products">Admin Products</Link>
            )}
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

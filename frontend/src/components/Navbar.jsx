
import { Link } from "react-router";
import {useAuth} from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Clothing Store</Link>

      <div>
        <Link to="/">Products</Link>

        {user ? (
          <>
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

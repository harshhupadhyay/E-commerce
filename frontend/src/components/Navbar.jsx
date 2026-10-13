import React from 'react'
import { Link } from "react-router";

const Navbar = () => {
   return (
    <nav>
      <Link to="/">Clothing Store</Link>

      <div>
        <Link to="/">Products</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar

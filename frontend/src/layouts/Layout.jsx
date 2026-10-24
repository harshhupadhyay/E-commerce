import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import Preloader from "../components/Preloader";

const Layout = () => {
  const location = useLocation();

  // Scroll to top smoothly upon page navigation
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fff8f4] text-[#201a15] overflow-x-hidden">
      {/* 1. Luxury Entrance Preloader */}
      <Preloader />

      {/* 2. Editorial Header Navigation */}
      <Navbar />

      {/* 3. Slide-over Shopping Bag Drawer */}
      <CartDrawer />

      {/* 4. Main Page Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* 5. Comprehensive Editorial Footer */}
      <Footer />
    </div>
  );
};

export default Layout;

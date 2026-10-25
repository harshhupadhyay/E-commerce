import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import Preloader from "../components/Preloader";
import { Toaster } from "sonner";

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

      {/* 6. Luxury Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#121110",
            color: "#fff8f4",
            border: "1px solid rgba(237, 224, 215, 0.25)",
            fontFamily: "var(--font-sans, system-ui, sans-serif)",
            fontSize: "12px",
            letterSpacing: "0.03em",
            borderRadius: "4px",
            boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.5)",
          },
        }}
      />
    </div>
  );
};

export default Layout;

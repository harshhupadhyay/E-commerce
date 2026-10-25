import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import router from "./routes/AppRouter";
import Lenis from "lenis";

const App = () => {
  useEffect(() => {
    // Initialize Lenis luxury inertial smooth scrolling
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <RouterProvider router={router} />;
};

export default App;

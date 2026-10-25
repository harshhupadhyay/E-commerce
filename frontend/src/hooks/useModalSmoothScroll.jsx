import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * useModalSmoothScroll
 * Provides buttery-smooth luxury inertial scrolling inside modal dialogs
 * using an isolated Lenis instance attached to the dialog container.
 */
export const useModalSmoothScroll = (isOpen) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const lenisInstanceRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    let rafId = null;

    // Small timeout ensures the Radix Dialog Portal and DOM nodes are fully painted
    const initTimer = setTimeout(() => {
      if (!wrapperRef.current || !contentRef.current) return;

      const modalLenis = new Lenis({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.6,
      });

      lenisInstanceRef.current = modalLenis;

      function raf(time) {
        modalLenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }, 60);

    return () => {
      clearTimeout(initTimer);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstanceRef.current) {
        lenisInstanceRef.current.destroy();
        lenisInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  return { wrapperRef, contentRef };
};

export default useModalSmoothScroll;

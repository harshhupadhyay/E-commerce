import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Only show once per session
    const hasLoaded = sessionStorage.getItem("aurelia_preloaded");
    if (hasLoaded) {
      setVisible(false);
      return;
    }

    const fallbackTimer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("aurelia_preloaded", "true");
        setVisible(false);
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .to(progressRef.current, {
        width: "100%",
        duration: 1.0,
        ease: "power2.inOut",
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      });

    return () => {
      clearTimeout(fallbackTimer);
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121110] text-[#fff8f4] select-none"
    >
      <div ref={textRef} className="flex flex-col items-center gap-2 mb-8 text-center px-4">
        <span className="font-sans-luxury text-[11px] uppercase tracking-[0.3em] text-[#9e7d47]">
          Haute Édition • Milan &amp; Paris
        </span>
        <h1 className="font-editorial text-3xl md:text-5xl tracking-[0.18em] uppercase">
          AURELIA &amp; NOIR
        </h1>
        <span className="font-sans-luxury text-[10px] uppercase tracking-[0.22em] text-[#cdc5bd] mt-1">
          Autumn / Winter 2026
        </span>
      </div>

      {/* Luxury Progress Line */}
      <div className="w-48 h-[1px] bg-white/15 overflow-hidden rounded-full">
        <div ref={progressRef} className="h-full bg-[#9e7d47] w-0"></div>
      </div>
    </div>
  );
};

export default Preloader;

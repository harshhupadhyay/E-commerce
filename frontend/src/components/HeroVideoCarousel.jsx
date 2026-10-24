import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";

const CAMPAIGNS = [
  {
    id: 1,
    title: "Architectural Tailoring",
    subtitle: "Autumn / Winter 2026 Collection",
    tag: "Haute Édition Campaign • Dior Edit",
    description:
      "A study in structural precision, weightless virgin wools, and deep burgundy Italian leather.",
    src: "/videos/dior.mp4",
  },
  {
    id: 2,
    title: "Milanese Volume & Drape",
    subtitle: "Autumn / Winter 2026 Collection",
    tag: "Runway Showcase • Gucci Edit",
    description:
      "Fluid double-faced cashmere overcoats and sculpted silhouettes crafted in historic European mills.",
    src: "/videos/guccie.mp4",
  },
];

const HeroVideoCarousel = ({ onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef([]);
  const textRef = useRef(null);

  // Gesture references for mobile touch and laptop trackpad
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const wheelLock = useRef(false);

  // Switch to next / previous video
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAMPAIGNS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAMPAIGNS.length) % CAMPAIGNS.length);
  };

  // Play active video and pause background video
  useEffect(() => {
    CAMPAIGNS.forEach((_, idx) => {
      const vid = videoRefs.current[idx];
      if (vid) {
        if (idx === currentIndex) {
          vid.currentTime = 0;
          vid.muted = isMuted;
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.log("Autoplay caught:", err.message);
            });
          }
        } else {
          vid.pause();
        }
      }
    });

    // Animate text reveal on slide change
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [currentIndex]);

  // Handle Mute / Unmute live without interrupting playback
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    CAMPAIGNS.forEach((_, idx) => {
      const vid = videoRefs.current[idx];
      if (vid) {
        vid.muted = nextMuted;
      }
    });
  };

  // Mobile Touch Gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext(); // Swiped left -> next video
    } else if (diff < -50) {
      handlePrev(); // Swiped right -> prev video
    }
  };

  // Laptop Trackpad Horizontal Swipe
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > 35) {
      if (wheelLock.current) return;
      wheelLock.current = true;
      if (e.deltaX > 35) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelLock.current = false;
      }, 700);
    }
  };

  // Mouse Drag Swipe (for desktop / laptop touchpad)
  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStartX.current - e.clientX;
    if (diff > 60) handleNext();
    else if (diff < -60) handlePrev();
  };

  const currentCampaign = CAMPAIGNS[currentIndex];

  return (
    <section
      id="hero-carousel"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative w-full h-[620px] md:h-[780px] overflow-hidden bg-[#121110] text-white select-none cursor-grab active:cursor-grabbing"
    >
      {/* Video Layers with smooth fade & scale */}
      {CAMPAIGNS.map((campaign, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={campaign.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              isActive
                ? "opacity-100 scale-100 z-10 pointer-events-auto"
                : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
          >
            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              src={campaign.src}
              playsInline
              muted={isMuted}
              preload="auto"
              onEnded={handleNext}
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </div>
        );
      })}

      {/* Cinematic Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/95 via-[#121110]/30 to-black/30 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none" />

      {/* Bottom Content Area */}
      <div className="absolute bottom-10 left-6 right-6 md:left-16 md:right-16 z-30 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
        {/* Editorial Text Info */}
        <div ref={textRef} className="max-w-xl space-y-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="font-sans-luxury text-[11px] md:text-xs text-[#ffdeac] uppercase tracking-[0.25em] font-semibold">
              {currentCampaign.tag}
            </span>
            <span className="w-6 h-[1px] bg-white/30"></span>
            <span className="font-sans-luxury text-[10px] uppercase tracking-widest text-[#ede0d7]/80">
              {currentCampaign.subtitle}
            </span>
          </div>

          <h1 className="font-editorial text-4xl md:text-6xl text-white leading-[1.08] tracking-tight uppercase">
            {currentCampaign.title}
          </h1>

          <p className="font-sans-luxury text-xs md:text-sm text-[#ede0d7]/90 leading-relaxed max-w-md">
            {currentCampaign.description}
          </p>

          {/* Action CTA */}
          <div className="pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExploreClick();
              }}
              className="bg-[#fff8f4] text-[#121110] font-sans-luxury text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-all active:scale-95 hover:bg-[#72252e] hover:text-white shadow-md pointer-events-auto"
            >
              Explore Collection
            </button>
          </div>
        </div>

        {/* Compact Squeezed Mute Button in Bottom-Right Corner */}
        <div className="pointer-events-auto flex items-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            type="button"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
            className="w-7.5 h-7.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-black/75 hover:border-white/40 flex items-center justify-center transition-all duration-200 active:scale-90 shadow-sm cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white/70" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoCarousel;

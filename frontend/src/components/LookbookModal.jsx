import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowRight, Sparkles, Feather, Scissors, ShieldCheck, Compass } from "lucide-react";
import { useModalSmoothScroll } from "../hooks/useModalSmoothScroll";

/**
 * Editorial Lookbook Modal — "Architectural Form & Pure Drape"
 * Expansive, high-fashion editorial monograph showcasing Vol. IV craftsmanship,
 * textile provenance, and runway silhouettes.
 */
const LOOKBOOK_CAPSULES = [
  {
    lookNumber: "Look 01",
    title: "The Cocoon Coat in Double-Faced Wool",
    fabric: "100% Virgin Italian Wool • 620 g/m²",
    description: "Engineered with a floating horsehair canvas chest piece and softened drop shoulders for effortless, weightless structure.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
  },
  {
    lookNumber: "Look 02",
    title: "Architectural Cashmere Wrap & Drape",
    fabric: "Combed Mongolian Cashmere • 4-Ply",
    description: "Unhurried spinning yields cloud-like softness that drapes organically around the collarbones without bulk.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
  },
  {
    lookNumber: "Look 03",
    title: "The Relaxed Tailored Wool Trouser",
    fabric: "Worsted Wool Twill • Biella Lineage",
    description: "Deep double forward pleats and high-rise waistband create a sharp, elongated silhouette designed for natural movement.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
  },
];

const LookbookModal = ({ isOpen, onClose, onExplore }) => {
  const [activeLook, setActiveLook] = useState(0);
  const { wrapperRef, contentRef } = useModalSmoothScroll(isOpen);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Backdrop with Silk Luxury Easing */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md luxury-modal-overlay" />

        {/* Centered Scrollable Viewport Wrapper */}
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-none">
          <Dialog.Content
            ref={wrapperRef}
            data-lenis-prevent
            aria-describedby="lookbook-modal-description"
            className="pointer-events-auto relative w-full max-w-5xl max-h-[85vh] sm:max-h-[88vh] bg-[#faf6f2] text-[#121110] border border-[#ede0d7] shadow-2xl rounded-none p-5 sm:p-8 md:p-10 overflow-y-auto overscroll-contain luxury-scrollbar luxury-modal-content"
          >
            <div ref={contentRef} className="w-full">
          {/* Top Bar: Monograph Header & Close */}
          <div className="flex items-start justify-between border-b border-[#ede0d7] pb-4 sm:pb-6 mb-6 gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#72252e]" />
                <span className="font-sans-luxury text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#72252e] font-bold">
                  The Atelier Monograph • Vol. IV — Milano &amp; Paris
                </span>
              </div>
              <Dialog.Title className="font-editorial text-2xl sm:text-4xl md:text-5xl text-[#121110] font-normal tracking-tight leading-[1.1]">
                Architectural Form &amp; Pure Drape
              </Dialog.Title>
              <p className="font-sans-luxury text-xs sm:text-sm text-[#7c766f] mt-1.5 font-light">
                An editorial study in proportional freedom, raw Italian wools, and unhurried tailoring.
              </p>
            </div>

            <Dialog.Close asChild>
              <button
                aria-label="Close lookbook"
                className="p-2 text-[#7c766f] hover:text-[#121110] hover:bg-[#ede0d7]/50 rounded-full transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description id="lookbook-modal-description" className="sr-only">
            Architectural Form and Pure Drape editorial monograph exploring Vol. IV design philosophy, runway looks, and Italian craftsmanship.
          </Dialog.Description>

          {/* MAIN EDITORIAL BODY */}
          <div className="space-y-8 sm:space-y-12">
            {/* 1. HERO RUNWAY SPREAD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Runway Image Frame */}
              <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] bg-[#121110] overflow-hidden border border-[#ede0d7]">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85"
                  alt="Architectural Form & Pure Drape Runway Presentation"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
                  <span className="text-[9px] uppercase font-sans-luxury tracking-[0.25em] text-[#ffdeac] font-semibold mb-1">
                    Milan Fashion Week Archive • Look 01
                  </span>
                  <p className="font-editorial text-lg sm:text-2xl font-light">
                    The Monolithic Double-Faced Overcoat
                  </p>
                </div>
              </div>

              {/* Editorial Manifesto Quote */}
              <div className="lg:col-span-5 bg-[#f5ede5] border border-[#ede0d7] p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="font-sans-luxury text-[9px] uppercase tracking-[0.25em] text-[#9e7d47] font-bold">
                    Chapter I • The Philosophy of Volume
                  </span>
                  <blockquote className="font-editorial text-lg sm:text-xl text-[#121110] italic leading-snug">
                    "To drape is to construct an intimate architecture between fabric and skin. We do not restrict the body; we sculpt space around it."
                  </blockquote>
                  <p className="font-sans-luxury text-xs text-[#5a544e] leading-relaxed pt-2">
                    In Vol. IV, every silhouette begins as unbleached calico muslin draped directly upon live forms. No synthetic fusible interlinings are ever used; instead, floating horsehair canvas breathes with body warmth.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ede0d7] flex items-center justify-between text-[11px] font-sans-luxury text-[#7c766f]">
                  <span>Atelier Lineage: Biella, Italy</span>
                  <span className="font-semibold text-[#121110]">Autumn / Winter 2026</span>
                </div>
              </div>
            </div>

            {/* 2. THREE CRAFT PILLARS */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#121110]" />
                <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#121110] font-bold">
                  Chapter II • Material Integrity &amp; Provenance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 border border-[#ede0d7] space-y-2 shadow-xs card-luxury">
                  <div className="w-8 h-8 rounded-full bg-[#f9ece2] flex items-center justify-center text-[#72252e]">
                    <Feather className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans-luxury text-xs uppercase tracking-wider font-bold text-[#121110]">
                    Piedmont Virgin Wool
                  </h4>
                  <p className="text-xs font-sans-luxury text-[#7c766f] leading-relaxed">
                    Sourced from certified organic alpine flocks, loomed in 130-year-old Piedmontese water-powered mills without chemical finishes.
                  </p>
                </div>

                <div className="bg-white p-5 border border-[#ede0d7] space-y-2 shadow-xs card-luxury">
                  <div className="w-8 h-8 rounded-full bg-[#f9ece2] flex items-center justify-center text-[#72252e]">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans-luxury text-xs uppercase tracking-wider font-bold text-[#121110]">
                    240+ Hours Patterning
                  </h4>
                  <p className="text-xs font-sans-luxury text-[#7c766f] leading-relaxed">
                    Each garment undergoes iterative balance adjustments until lapel roll, sleeve pitch, and hem weight fall in perfect equilibrium.
                  </p>
                </div>

                <div className="bg-white p-5 border border-[#ede0d7] space-y-2 shadow-xs card-luxury">
                  <div className="w-8 h-8 rounded-full bg-[#f9ece2] flex items-center justify-center text-[#72252e]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans-luxury text-xs uppercase tracking-wider font-bold text-[#121110]">
                    Pure Circularity
                  </h4>
                  <p className="text-xs font-sans-luxury text-[#7c766f] leading-relaxed">
                    Finished with Japanese cotton cupro linings, unbleached buffalo horn buttons, and biodegradable linen sewing threads.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. LOOKBOOK CAPSULE SELECTOR */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#121110]" />
                  <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#121110] font-bold">
                    Chapter III • Runway Capsule Studies
                  </span>
                </div>
                <span className="text-[10px] font-sans-luxury uppercase tracking-widest text-[#7c766f]">
                  Select Look (01 - 03)
                </span>
              </div>

              {/* Look Selector Buttons with Tactile Micro-Animations */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                {LOOKBOOK_CAPSULES.map((cap, idx) => (
                  <button
                    key={cap.lookNumber}
                    onClick={() => setActiveLook(idx)}
                    className={`p-3 text-left border btn-luxury cursor-pointer ${
                      activeLook === idx
                        ? "bg-[#121110] text-white border-[#121110] shadow-sm scale-[1.01]"
                        : "bg-white text-[#121110] border-[#ede0d7] hover:border-[#121110]"
                    }`}
                  >
                    <span className={`block text-[9px] uppercase tracking-widest font-sans-luxury mb-0.5 ${
                      activeLook === idx ? "text-[#ffdeac]" : "text-[#7c766f]"
                    }`}>
                      {cap.lookNumber}
                    </span>
                    <span className="block font-editorial text-xs sm:text-sm truncate">
                      {cap.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Look Showcase with Cross-Fade Micro-Transition */}
              <div
                key={activeLook}
                className="bg-white border border-[#ede0d7] p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-center anim-fade-in card-luxury"
              >
                <div className="md:col-span-5 aspect-[3/4] overflow-hidden bg-[#1c1a18] border border-[#ede0d7]">
                  <img
                    src={LOOKBOOK_CAPSULES[activeLook].image}
                    alt={LOOKBOOK_CAPSULES[activeLook].title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="md:col-span-7 space-y-4">
                  <span className="inline-block px-2.5 py-1 bg-[#f9ece2] text-[#72252e] text-[9.5px] uppercase font-sans-luxury tracking-[0.25em] font-semibold">
                    {LOOKBOOK_CAPSULES[activeLook].lookNumber} • Runway Edition
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#121110]">
                    {LOOKBOOK_CAPSULES[activeLook].title}
                  </h3>
                  <p className="font-sans-luxury text-xs text-[#9e7d47] font-semibold uppercase tracking-wider">
                    {LOOKBOOK_CAPSULES[activeLook].fabric}
                  </p>
                  <p className="font-sans-luxury text-xs sm:text-sm text-[#4b4640] leading-relaxed">
                    {LOOKBOOK_CAPSULES[activeLook].description}
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onExplore?.();
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-widest font-semibold btn-luxury cursor-pointer"
                    >
                      <span>Explore Similar Silhouettes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION FOOTER */}
          <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-[#ede0d7] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="py-2.5 sm:py-0 text-center text-xs font-sans-luxury uppercase tracking-widest text-[#7c766f] hover:text-[#121110] btn-luxury cursor-pointer"
              >
                Close Editorial Monograph
              </button>
            </Dialog.Close>

            <button
              type="button"
              onClick={() => {
                onClose();
                onExplore?.();
              }}
              className="px-6 py-3 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 btn-luxury cursor-pointer shadow-sm"
            >
              <span>Explore The Collection Grid</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          </div>
        </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LookbookModal;

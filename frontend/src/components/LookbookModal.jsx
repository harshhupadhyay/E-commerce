import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Sparkles, Compass, ArrowRight } from "lucide-react";

/**
 * Editorial Lookbook Modal
 * Replaces alert("Opening full Atelier Vol. IV lookbook...") on homepage.
 * Highly responsive across mobile (iOS/Android) and desktop.
 */
const LookbookModal = ({ isOpen, onClose, onExplore }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />

        {/* Content Box with safe mobile positioning */}
        <Dialog.Content
          aria-describedby="lookbook-modal-description"
          className="fixed left-1/2 top-[52%] sm:top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[94vw] max-w-2xl max-h-[84dvh] sm:max-h-[88vh] bg-[#fff8f4] text-[#121110] border border-[#ede0d7] shadow-2xl rounded-sm p-4 sm:p-7 md:p-8 overflow-y-auto no-scrollbar data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#ede0d7] pb-3 sm:pb-4 mb-4 sm:mb-5 gap-3">
            <div className="min-w-0 flex-1">
              <span className="font-sans-luxury text-[8.5px] sm:text-[10px] uppercase tracking-[0.25em] text-[#72252e] font-semibold block mb-1">
                The Atelier Note • Vol. IV Lookbook
              </span>
              <Dialog.Title className="font-editorial text-lg sm:text-2xl md:text-3xl text-[#121110] leading-snug">
                Architectural Form &amp; Pure Drape
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="Close lookbook"
                className="p-1 sm:p-1.5 text-[#7c766f] hover:text-[#121110] hover:bg-[#ede0d7]/40 rounded-full transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description id="lookbook-modal-description" className="sr-only">
            Full editorial lookbook for Autumn/Winter Vol. IV showcasing architectural volume and Italian textile craftsmanship.
          </Dialog.Description>

          {/* Lookbook Body */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-[#121110]">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
                alt="Runway Capsule Editorial"
                className="w-full h-full object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3.5 sm:p-6">
                <div>
                  <span className="text-[8.5px] sm:text-[9.5px] font-sans-luxury uppercase tracking-[0.2em] text-[#ffdeac] block">
                    Milan Fashion Week Presentation
                  </span>
                  <p className="font-editorial text-base sm:text-xl text-white mt-0.5">
                    Autumn / Winter 2026 Collection
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs font-sans-luxury leading-relaxed text-[#4b4640]">
              <div className="bg-[#f9ece2]/60 p-3.5 sm:p-4 rounded border border-[#ede0d7] space-y-1 sm:space-y-1.5">
                <span className="text-[9.5px] sm:text-[10px] uppercase font-bold text-[#121110] tracking-widest block">
                  Textile Provenance
                </span>
                <p className="text-[11px] sm:text-xs">
                  Every piece in Vol. IV is woven from sustainable virgin wools and double-faced silks gathered in historic Piedmont mills. The touch is weightless yet retains structural poise.
                </p>
              </div>

              <div className="bg-[#f9ece2]/60 p-3.5 sm:p-4 rounded border border-[#ede0d7] space-y-1 sm:space-y-1.5">
                <span className="text-[9.5px] sm:text-[10px] uppercase font-bold text-[#121110] tracking-widest block">
                  The Silhouette Vision
                </span>
                <p className="text-[11px] sm:text-xs">
                  Sharp architectural shoulders contrast with drop-waist fluid silhouettes, creating effortless balance between formal atelier craftsmanship and modern everyday life.
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#ede0d7] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="py-2 sm:py-0 text-center text-xs font-sans-luxury uppercase tracking-wider text-[#7c766f] hover:text-[#121110] cursor-pointer"
              >
                Close Story
              </button>
            </Dialog.Close>

            <button
              type="button"
              onClick={() => {
                onClose();
                onExplore?.();
              }}
              className="px-5 py-2.5 sm:py-2.5 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <span>Explore Collection Grid</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LookbookModal;

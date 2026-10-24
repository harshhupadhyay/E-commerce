import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="w-full bg-[#f3e6dc] border-t border-[#ede0d7] text-[#201a15] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Tier 1: 3 Editorial Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#cdc5bd]/40">
          {/* Column 1: Client Concierge */}
          <div>
            <button
              onClick={() => toggleSection("concierge")}
              className="w-full flex items-center justify-between text-left font-sans-luxury text-xs uppercase tracking-widest font-bold pb-2 md:cursor-default"
            >
              <span>Client Concierge</span>
              <ChevronDown
                className={`w-4 h-4 md:hidden transition-transform ${
                  openSection === "concierge" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`space-y-2.5 text-xs text-[#4b4640] pt-2 md:block ${
                openSection === "concierge" ? "block" : "hidden md:block"
              }`}
            >
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Book Personal Appointment
              </p>
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Virtual Atelier Consultation
              </p>
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Bespoke Monogramming
              </p>
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Care &amp; Garment Longevity
              </p>
            </div>
          </div>

          {/* Column 2: Shipping & Delivery */}
          <div>
            <button
              onClick={() => toggleSection("shipping")}
              className="w-full flex items-center justify-between text-left font-sans-luxury text-xs uppercase tracking-widest font-bold pb-2 md:cursor-default"
            >
              <span>Shipping &amp; Delivery</span>
              <ChevronDown
                className={`w-4 h-4 md:hidden transition-transform ${
                  openSection === "shipping" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`space-y-2.5 text-xs text-[#4b4640] pt-2 md:block ${
                openSection === "shipping" ? "block" : "hidden md:block"
              }`}
            >
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Global Express Courier
              </p>
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Duties &amp; Taxes Included
              </p>
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Track Dispatched Consignment
              </p>
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Return Portal Access
              </p>
            </div>
          </div>

          {/* Column 3: The House & Ethics */}
          <div>
            <button
              onClick={() => toggleSection("house")}
              className="w-full flex items-center justify-between text-left font-sans-luxury text-xs uppercase tracking-widest font-bold pb-2 md:cursor-default"
            >
              <span>The House &amp; Ethics</span>
              <ChevronDown
                className={`w-4 h-4 md:hidden transition-transform ${
                  openSection === "house" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`space-y-2.5 text-xs text-[#4b4640] pt-2 md:block ${
                openSection === "house" ? "block" : "hidden md:block"
              }`}
            >
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Paris &amp; Milan Studio
              </p>
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Wool &amp; Silk Transparency Report
              </p>
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Artisanal Guild Collaborations
              </p>
              <p className="hover:text-[#201a15] cursor-pointer transition-colors">
                Annual Circularity Index
              </p>
            </div>
          </div>
        </div>

        {/* Tier 2: Middle Architectural Bar with Socials in Original Brand Colors on Hover */}
        <div className="py-8 border-b border-[#cdc5bd]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Flagship Label */}
          <div className="flex items-center gap-2.5 text-xs text-[#7c766f]">
            <span className="w-2 h-2 rounded-full bg-[#9e7d47] animate-pulse"></span>
            <span className="font-sans-luxury uppercase tracking-[0.22em] font-semibold text-[#201a15] text-[11px]">
              Aurelia &amp; Noir • Milano Flagship
            </span>
          </div>

          {/* Right: Discord, Instagram & Twitter with Official Brand Hover Colors */}
          <div className="flex items-center gap-4">
            

            {/* 1. Discord (Official Brand Color: #5865F2 Blurple) */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord Atelier Community"
              title="Join us on Discord"
              className="group w-10 h-10 rounded-full border border-[#cdc5bd] bg-[#fff8f4] flex items-center justify-center text-[#4b4640] transition-all duration-300 hover:bg-[#5865F2] hover:border-[#5865F2] hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-[#5865F2]/30 active:scale-95"
            >
              <svg
                className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>

            {/* 2. Instagram (Official Sunset Gradient: #f09433 -> #dc2743 -> #bc1888) */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Atelier"
              title="Follow on Instagram"
              className="group w-10 h-10 rounded-full border border-[#cdc5bd] bg-[#fff8f4] flex items-center justify-center text-[#4b4640] transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-[#dc2743]/30 active:scale-95"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-[1.8] transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* 3. X (Official Monochrome Brand: Pure Black #000000 with White X) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter) Haute Édition"
              title="Follow on X"
              className="group w-10 h-10 rounded-full border border-[#cdc5bd] bg-[#fff8f4] flex items-center justify-center text-[#4b4640] transition-all duration-300 hover:bg-black hover:border-black hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-black/35 active:scale-95"
            >
              <svg
                className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Tier 3: Legal & Copyright Notice */}
        <div className="pt-8 text-center text-[10px] uppercase tracking-widest text-[#7c766f] space-y-1">
          <p className="font-semibold text-[#201a15]">
            ©HARSH UPADHYAY ALL RIGHTS RESERVED.
          </p>
          <p className="text-[9px] text-[#7c766f]">
            Artisanal Milanese Tailoring &amp; Fine Leather Goods.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

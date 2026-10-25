import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Sparkles, Ruler, Droplets, Footprints, Briefcase, Shirt, Check } from "lucide-react";

/**
 * Universal Category-Aware Product Guide Modal
 * Adapts automatically to:
 * - Perfume / Fragrance (Olfactory pyramid, bottle volume, application tips)
 * - Footwear / Shoes (EU/UK/US conversion table, insole fit)
 * - Bags & Accessories (Dimensions, strap drop, capacity)
 * - Garments & Tailoring (CM/Inches measurement matrix, model proportions)
 */
const ProductGuideModal = ({ isOpen, onClose, product }) => {
  const [unit, setUnit] = useState("cm"); // "cm" or "in"
  const [activeTab, setActiveTab] = useState("specs"); // "specs" or "care"

  if (!product) return null;

  const productName = (product.name || "").toLowerCase();
  const category = (product.category || "").toLowerCase();

  // Determine Product Family
  const isFragrance =
    category.includes("fragrance") ||
    category.includes("perfume") ||
    category.includes("scent") ||
    category.includes("cologne") ||
    category.includes("beauty") ||
    productName.includes("parfum") ||
    productName.includes("eau de") ||
    productName.includes("cologne") ||
    productName.includes("fragrance");

  const isFootwear =
    category.includes("shoe") ||
    category.includes("loafer") ||
    category.includes("boot") ||
    category.includes("footwear") ||
    category.includes("sneaker") ||
    category.includes("heel") ||
    productName.includes("loafer") ||
    productName.includes("boot") ||
    productName.includes("shoe") ||
    productName.includes("derby");

  const isBagOrAccessory =
    category.includes("bag") ||
    category.includes("tote") ||
    category.includes("clutch") ||
    category.includes("wallet") ||
    category.includes("leather") && !category.includes("jacket") ||
    category.includes("accessories") ||
    productName.includes("bag") ||
    productName.includes("tote") ||
    productName.includes("clutch") ||
    productName.includes("belt");

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Backdrop with Silk Luxury Easing */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm luxury-modal-overlay" />

        {/* Centered Scrollable Viewport Wrapper */}
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-none">
          <Dialog.Content
            data-lenis-prevent
            aria-describedby="product-guide-description"
            className="pointer-events-auto relative w-full max-w-xl max-h-[85vh] sm:max-h-[88vh] bg-[#fff8f4] text-[#121110] border border-[#ede0d7] shadow-2xl rounded-sm p-4 sm:p-6 md:p-8 overflow-y-auto overscroll-contain luxury-scrollbar luxury-modal-content"
          >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#ede0d7] pb-3 sm:pb-4 mb-4 sm:mb-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-sans-luxury text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#72252e] font-semibold flex items-center gap-1.5">
                  {isFragrance ? (
                    <Droplets className="w-3.5 h-3.5" />
                  ) : isFootwear ? (
                    <Footprints className="w-3.5 h-3.5" />
                  ) : isBagOrAccessory ? (
                    <Briefcase className="w-3.5 h-3.5" />
                  ) : (
                    <Shirt className="w-3.5 h-3.5" />
                  )}
                  {isFragrance
                    ? "Olfactory Architecture"
                    : isFootwear
                    ? "Footwear Sizing & Last"
                    : isBagOrAccessory
                    ? "Dimensions & Volume"
                    : "Tailoring & Proportions"}
                </span>
              </div>
              <Dialog.Title className="font-editorial text-lg sm:text-2xl text-[#121110] capitalize leading-snug">
                {product.name}
              </Dialog.Title>
              <Dialog.Description id="product-guide-description" className="text-[11px] sm:text-xs font-sans-luxury text-[#7c766f] mt-0.5">
                {isFragrance
                  ? "Atelier notes, volume specifications, and scent diffusion guidance."
                  : isFootwear
                  ? "International conversion standards and sculpted insole measurements."
                  : isBagOrAccessory
                  ? "Structural dimensions, interior capacity, and strap drop."
                  : "Precise measurement matrix and editorial silhouette recommendations."}
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                aria-label="Close guide"
                className="p-1.5 text-[#7c766f] hover:text-[#121110] hover:bg-[#ede0d7]/40 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Sub-Tab Navigation */}
          <div className="flex items-center justify-between gap-3 mb-5 border-b border-[#ede0d7]/60 pb-2">
            <div className="flex gap-2 text-xs font-sans-luxury uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`pb-1.5 font-semibold transition-colors cursor-pointer ${
                  activeTab === "specs"
                    ? "text-[#121110] border-b-2 border-[#121110]"
                    : "text-[#7c766f] hover:text-[#121110]"
                }`}
              >
                {isFragrance ? "Notes & Volume" : "Sizing Matrix"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("care")}
                className={`pb-1.5 font-semibold transition-colors cursor-pointer ${
                  activeTab === "care"
                    ? "text-[#121110] border-b-2 border-[#121110]"
                    : "text-[#7c766f] hover:text-[#121110]"
                }`}
              >
                Care &amp; Atelier Notes
              </button>
            </div>

            {/* CM / IN Switcher (For Garments & Bags) */}
            {!isFragrance && activeTab === "specs" && (
              <div className="flex items-center bg-[#f9ece2] rounded p-0.5 text-[10px] font-sans-luxury font-bold">
                <button
                  type="button"
                  onClick={() => setUnit("cm")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    unit === "cm" ? "bg-[#121110] text-white shadow-xs" : "text-[#7c766f]"
                  }`}
                >
                  CM
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("in")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    unit === "in" ? "bg-[#121110] text-white shadow-xs" : "text-[#7c766f]"
                  }`}
                >
                  IN
                </button>
              </div>
            )}
          </div>

          {/* TAB 1: SPECS / MATRIX */}
          {activeTab === "specs" && (
            <div className="space-y-5">
              {/* --- 1. PERFUME / FRAGRANCE VIEW --- */}
              {isFragrance ? (
                <div className="space-y-4">
                  {/* Olfactory Pyramid */}
                  <div className="bg-[#f9ece2]/60 p-4 rounded border border-[#ede0d7] space-y-3">
                    <span className="text-[10px] font-sans-luxury uppercase tracking-widest text-[#72252e] font-bold block">
                      The Olfactory Pyramid
                    </span>

                    <div className="space-y-2.5 text-xs font-sans-luxury">
                      <div className="flex items-start gap-3">
                        <span className="w-16 shrink-0 text-[10px] uppercase font-bold text-[#121110] tracking-wider">
                          Top Notes
                        </span>
                        <span className="text-[#4b4640]">
                          Italian Bergamot, Pink Peppercorn, Crisp Solar Florals (0–30 mins)
                        </span>
                      </div>
                      <div className="h-[1px] bg-[#ede0d7]" />
                      <div className="flex items-start gap-3">
                        <span className="w-16 shrink-0 text-[10px] uppercase font-bold text-[#121110] tracking-wider">
                          Heart Notes
                        </span>
                        <span className="text-[#4b4640]">
                          Tuscan Orris Root, Grasse Centifolia Rose, Smoked Saffron (1–4 hrs)
                        </span>
                      </div>
                      <div className="h-[1px] bg-[#ede0d7]" />
                      <div className="flex items-start gap-3">
                        <span className="w-16 shrink-0 text-[10px] uppercase font-bold text-[#121110] tracking-wider">
                          Base Notes
                        </span>
                        <span className="text-[#4b4640]">
                          Aged Amber, Indonesian Patchouli, White Cedarwood (6–12 hrs sillage)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottle Volumes */}
                  <div>
                    <h4 className="text-[11px] font-sans-luxury uppercase tracking-widest font-semibold text-[#121110] mb-2">
                      Bottle Sizing Guide
                    </h4>
                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      <div className="bg-white p-2.5 rounded border border-[#ede0d7]">
                        <span className="text-xs font-bold font-editorial block text-[#121110]">30 ML</span>
                        <span className="text-[10px] font-sans-luxury text-[#7c766f]">Travel Flacon (~350 Sprays)</span>
                      </div>
                      <div className="bg-[#f9ece2] p-2.5 rounded border border-[#121110]/30 ring-1 ring-[#121110]">
                        <span className="text-xs font-bold font-editorial block text-[#121110]">50 ML</span>
                        <span className="text-[10px] font-sans-luxury text-[#72252e] font-semibold">Atelier Standard (~600 Sprays)</span>
                      </div>
                      <div className="bg-white p-2.5 rounded border border-[#ede0d7]">
                        <span className="text-xs font-bold font-editorial block text-[#121110]">100 ML</span>
                        <span className="text-[10px] font-sans-luxury text-[#7c766f]">Permanent Vessel (~1200 Sprays)</span>
                      </div>
                    </div>
                  </div>

                  {/* Concentration */}
                  <div className="flex items-center justify-between text-xs font-sans-luxury bg-white p-3 rounded border border-[#ede0d7]">
                    <span className="text-[#7c766f] uppercase tracking-wider text-[10px]">Concentration</span>
                    <span className="font-bold text-[#121110]">Eau de Parfum (20% Pure Essential Oils)</span>
                  </div>
                </div>
              ) : isFootwear ? (
                /* --- 2. FOOTWEAR / SHOES VIEW --- */
                <div className="space-y-4">
                  <div className="overflow-x-auto no-scrollbar border border-[#ede0d7] rounded bg-white">
                    <table className="w-full text-left text-xs font-sans-luxury">
                      <thead>
                        <tr className="bg-[#f9ece2] text-[10px] uppercase tracking-wider text-[#121110] border-b border-[#ede0d7]">
                          <th className="py-2.5 px-3 font-bold">EU</th>
                          <th className="py-2.5 px-3 font-bold">UK</th>
                          <th className="py-2.5 px-3 font-bold">US</th>
                          <th className="py-2.5 px-3 font-bold">Insole ({unit.toUpperCase()})</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ede0d7]/60">
                        {[
                          { eu: "39", uk: "5.5", us: "6.5", cm: "25.1", in: "9.8" },
                          { eu: "40", uk: "6.5", us: "7.5", cm: "25.8", in: "10.1" },
                          { eu: "41", uk: "7.5", us: "8.5", cm: "26.4", in: "10.4" },
                          { eu: "42", uk: "8.5", us: "9.5", cm: "27.1", in: "10.7" },
                          { eu: "43", uk: "9.5", us: "10.5", cm: "27.8", in: "10.9" },
                          { eu: "44", uk: "10.5", us: "11.5", cm: "28.4", in: "11.2" },
                          { eu: "45", uk: "11.5", us: "12.5", cm: "29.1", in: "11.5" },
                        ].map((row) => (
                          <tr key={row.eu} className="hover:bg-[#f9ece2]/30 transition-colors">
                            <td className="py-2 px-3 font-bold text-[#121110]">{row.eu}</td>
                            <td className="py-2 px-3 text-[#4b4640]">{row.uk}</td>
                            <td className="py-2 px-3 text-[#4b4640]">{row.us}</td>
                            <td className="py-2 px-3 font-medium text-[#72252e]">
                              {unit === "cm" ? `${row.cm} cm` : `${row.in} in`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[11px] font-sans-luxury text-[#7c766f] leading-relaxed bg-[#f9ece2]/50 p-3 rounded border border-[#ede0d7]">
                    <strong className="text-[#121110]">Fit Advisory:</strong> Sculpted on a traditional Milanese last. Fits true to European standards. If you wear between sizes or pair with wool dress socks, we advise sizing up.
                  </p>
                </div>
              ) : isBagOrAccessory ? (
                /* --- 3. BAGS & ACCESSORIES VIEW --- */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded border border-[#ede0d7]">
                      <span className="text-[10px] font-sans-luxury uppercase text-[#7c766f] block mb-0.5">
                        Width × Height × Depth
                      </span>
                      <span className="text-sm font-bold font-editorial text-[#121110]">
                        {unit === "cm" ? "38 × 28 × 12 cm" : "15.0 × 11.0 × 4.7 in"}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded border border-[#ede0d7]">
                      <span className="text-[10px] font-sans-luxury uppercase text-[#7c766f] block mb-0.5">
                        Strap Drop
                      </span>
                      <span className="text-sm font-bold font-editorial text-[#121110]">
                        {unit === "cm" ? "48 – 56 cm (Adjustable)" : "18.9 – 22.0 in (Adjustable)"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#f9ece2]/60 p-4 rounded border border-[#ede0d7] space-y-2">
                    <span className="text-[10px] font-sans-luxury uppercase tracking-widest text-[#72252e] font-bold block">
                      Interior Compartment Capacity
                    </span>
                    <ul className="text-xs font-sans-luxury text-[#4b4640] space-y-1.5 list-disc list-inside">
                      <li>Accommodates up to a 13-inch laptop or tablet in padded compartment.</li>
                      <li>Internal zip pocket for passport, keys, and luxury smartphone.</li>
                      <li>Reinforced base with metal protective feet.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                /* --- 4. GARMENTS & TAILORING VIEW (DEFAULT) --- */
                <div className="space-y-4">
                  <div className="overflow-x-auto no-scrollbar border border-[#ede0d7] rounded bg-white">
                    <table className="w-full text-left text-xs font-sans-luxury">
                      <thead>
                        <tr className="bg-[#f9ece2] text-[10px] uppercase tracking-wider text-[#121110] border-b border-[#ede0d7]">
                          <th className="py-2.5 px-3 font-bold">Size</th>
                          <th className="py-2.5 px-3 font-bold">Chest</th>
                          <th className="py-2.5 px-3 font-bold">Waist</th>
                          <th className="py-2.5 px-3 font-bold">Length</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ede0d7]/60">
                        {[
                          { size: "XS", chestCm: "88-92", chestIn: "34-36", waistCm: "74-78", waistIn: "29-31", lenCm: "71", lenIn: "28" },
                          { size: "S", chestCm: "93-97", chestIn: "36-38", waistCm: "79-83", waistIn: "31-33", lenCm: "73", lenIn: "28.7" },
                          { size: "M", chestCm: "98-102", chestIn: "38-40", waistCm: "84-88", waistIn: "33-35", lenCm: "75", lenIn: "29.5" },
                          { size: "L", chestCm: "103-107", chestIn: "40-42", waistCm: "89-93", waistIn: "35-37", lenCm: "77", lenIn: "30.3" },
                          { size: "XL", chestCm: "108-114", chestIn: "42-45", waistCm: "94-100", waistIn: "37-39", lenCm: "79", lenIn: "31.1" },
                        ].map((row) => (
                          <tr key={row.size} className="hover:bg-[#f9ece2]/30 transition-colors">
                            <td className="py-2 px-3 font-bold text-[#121110]">{row.size}</td>
                            <td className="py-2 px-3 text-[#4b4640]">
                              {unit === "cm" ? `${row.chestCm} cm` : `${row.chestIn} in`}
                            </td>
                            <td className="py-2 px-3 text-[#4b4640]">
                              {unit === "cm" ? `${row.waistCm} cm` : `${row.waistIn} in`}
                            </td>
                            <td className="py-2 px-3 font-medium text-[#72252e]">
                              {unit === "cm" ? `${row.lenCm} cm` : `${row.lenIn} in`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-[#f9ece2]/50 p-3 rounded border border-[#ede0d7] text-[11px] font-sans-luxury text-[#4b4640] space-y-1">
                    <p>
                      <strong className="text-[#121110]">Runway Proportion:</strong> Editorial model is 178cm / 5'10" wearing size <strong>S</strong>.
                    </p>
                    <p className="text-[#7c766f]">
                      Cut with architectural volume and a relaxed European silhouette. Order your typical size for an effortless drape, or size down for a structured tailored look.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CARE & ATELIER NOTES */}
          {activeTab === "care" && (
            <div className="space-y-4 text-xs font-sans-luxury text-[#4b4640]">
              <div className="bg-white p-4 rounded border border-[#ede0d7] space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#72252e] tracking-widest block">
                  Atelier Provenance
                </span>
                <p className="leading-relaxed">
                  {isFragrance
                    ? "Compounded and bottled in Grasse, France using hand-harvested organic botanical absolutes and rare resin extracts."
                    : isFootwear
                    ? "Hand-welted in historic Tuscan workshops using vegetable-tanned full-grain calfskin and stacked leather soles."
                    : isBagOrAccessory
                    ? "Hand-stitched in Florence using edge-painted vegetable tanned calf leather and solid brushed brass hardware."
                    : "Woven in Biella, Northern Italy from sustainably sourced long-staple virgin wool and mulberry silks."}
                </p>
              </div>

              <div className="bg-[#f9ece2]/60 p-4 rounded border border-[#ede0d7] space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#121110] tracking-widest block">
                  Preservation &amp; Care
                </span>
                <ul className="space-y-1.5 list-disc list-inside text-[11px] text-[#4b4640]">
                  {isFragrance ? (
                    <>
                      <li>Store away from direct sunlight and temperature fluctuations.</li>
                      <li>Keep bottle upright in original presentation box to maintain integrity.</li>
                      <li>Avoid rubbing pulse points together upon application.</li>
                    </>
                  ) : isFootwear ? (
                    <>
                      <li>Insert cedar shoe trees immediately after wear to absorb moisture.</li>
                      <li>Apply neutral cream conditioner every 6–8 weeks.</li>
                      <li>Store in provided cotton flannel dust bags.</li>
                    </>
                  ) : isBagOrAccessory ? (
                    <>
                      <li>Protect from prolonged rain and grease-based liquids.</li>
                      <li>Stuff with acid-free tissue paper when not in rotation to hold structure.</li>
                      <li>Store in custom archival cotton dust pouch.</li>
                    </>
                  ) : (
                    <>
                      <li>Specialist luxury dry clean only (hydrocarbon process recommended).</li>
                      <li>Press with warm steam cloth; never apply direct iron to surface.</li>
                      <li>Hang on broad contoured wooden hangers to preserve shoulder structure.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-[#ede0d7] flex items-center justify-end">
            <Dialog.Close asChild>
              <button
                type="button"
                className="px-5 py-2.5 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-widest font-semibold transition-colors rounded cursor-pointer"
              >
                Return to Silhouette
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProductGuideModal;

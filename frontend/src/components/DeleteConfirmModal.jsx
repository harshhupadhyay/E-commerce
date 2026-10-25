import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { resolveImageUrl } from "../utils/imageUrl";

/**
 * Luxury Admin Deletion Confirmation Modal
 * Replaces window.confirm with an editorial archive removal dialog.
 */
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName, productImg }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Backdrop with Silk Luxury Easing */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm luxury-modal-overlay" />

        {/* Centered Scrollable Viewport Wrapper */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto pointer-events-none">
          <Dialog.Content
            aria-describedby="delete-modal-description"
            className="pointer-events-auto relative w-full max-w-md bg-[#fff8f4] text-[#121110] border border-[#ede0d7] shadow-2xl rounded-sm p-5 sm:p-7 luxury-modal-content"
          >
          {/* Header Warning */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#72252e]/10 text-[#72252e] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans-luxury text-[9px] uppercase tracking-[0.25em] text-[#72252e] font-bold block">
                  Archive Removal
                </span>
                <Dialog.Title className="font-editorial text-lg sm:text-xl text-[#121110] leading-tight">
                  Confirm Deletion
                </Dialog.Title>
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                aria-label="Cancel"
                className="p-1 text-[#7c766f] hover:text-[#121110] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Product Silhouette Preview */}
          <div className="my-4 p-3 bg-[#f9ece2]/60 rounded border border-[#ede0d7] flex items-center gap-3">
            {productImg ? (
              <img
                src={resolveImageUrl(productImg)}
                alt={productName}
                className="w-12 h-16 object-cover rounded bg-[#ede0d7] shrink-0"
              />
            ) : (
              <div className="w-12 h-16 rounded bg-[#ede0d7] flex items-center justify-center text-[#7c766f] shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-editorial text-[#121110] font-semibold truncate capitalize">
                {productName}
              </p>
              <p className="text-[10px] font-sans-luxury text-[#7c766f] mt-0.5">
                Permanent catalog deletion
              </p>
            </div>
          </div>

          <Dialog.Description id="delete-modal-description" className="text-xs font-sans-luxury text-[#4b4640] leading-relaxed mb-6">
            Are you sure you wish to remove this silhouette from the atelier database? This action will permanently delist it from the live catalog.
          </Dialog.Description>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#ede0d7]">
            <Dialog.Close asChild>
              <button
                type="button"
                className="px-4 py-2 border border-[#ede0d7] text-[#121110] hover:bg-[#ede0d7]/30 text-[11px] font-sans-luxury uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
              >
                Retain Silhouette
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-[#72252e] text-white hover:bg-[#53181f] text-[11px] font-sans-luxury uppercase tracking-wider font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete from Atelier</span>
            </button>
          </div>
        </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteConfirmModal;

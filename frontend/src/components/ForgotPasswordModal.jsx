import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Mail, ArrowRight, X, Sparkles } from "lucide-react";
import { toast } from "sonner";

/**
 * Luxury Forgot Password Recovery Modal
 * Replaces alert() on Login page with an editorial recovery portal.
 */
const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSent(true);
    toast.success("Recovery dossier dispatched", {
      description: `A secure reset link has been forwarded to ${email}.`,
    });

    setTimeout(() => {
      setSent(false);
      setEmail("");
      onClose();
    }, 1500);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />

        <Dialog.Content
          aria-describedby="forgot-password-description"
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] max-w-md bg-[#fff8f4] text-[#121110] border border-[#ede0d7] shadow-2xl rounded-sm p-6 sm:p-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="font-sans-luxury text-[9px] uppercase tracking-[0.25em] text-[#72252e] font-semibold block mb-1">
                Concierge Access
              </span>
              <Dialog.Title className="font-editorial text-xl sm:text-2xl text-[#121110]">
                Recover Credentials
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="p-1 text-[#7c766f] hover:text-[#121110] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description id="forgot-password-description" className="text-xs font-sans-luxury text-[#4b4640] leading-relaxed mb-5">
            Enter your registered client email below. Our concierge will dispatch an encrypted link to authenticate and reset your security passphrase.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7c766f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@dossier.com"
                className="w-full bg-white text-[#201a15] text-xs font-sans-luxury pl-10 pr-4 py-3 rounded border border-[#ede0d7] focus:outline-none focus:border-[#121110] transition-colors"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2.5 border border-[#ede0d7] text-[#121110] hover:bg-[#ede0d7]/30 text-xs font-sans-luxury uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={sent}
                className="px-5 py-2.5 bg-[#121110] text-white hover:bg-[#72252e] text-xs font-sans-luxury uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <span>{sent ? "Dispatched" : "Send Recovery Link"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ForgotPasswordModal;

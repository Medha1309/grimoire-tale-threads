import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const types = {
    success: "bg-green-950 border-green-900 text-green-100",
    error: "bg-red-950 border-red-900 text-red-100",
    warning: "bg-amber-950 border-amber-900 text-amber-100",
    info: "bg-zinc-900 border-zinc-800 text-zinc-100",
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          className="fixed left-1/2 top-4 z-[200] w-full max-w-md"
        >
          <div className={`rounded-lg border px-4 py-3 shadow-lg ${types[type]}`}>
            <div className="flex items-center gap-3">
              <span className="text-lg">{icons[type]}</span>
              <p className="flex-1 text-sm">{message}</p>
              <button
                onClick={onClose}
                className="text-current opacity-70 transition hover:opacity-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

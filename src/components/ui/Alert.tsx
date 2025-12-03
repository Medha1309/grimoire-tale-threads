import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  isVisible?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  message,
  type = "info",
  isVisible = true,
  onClose,
  className = "",
}) => {
  const styles = {
    success: "bg-green-900/20 border-green-900/50 text-green-300",
    error: "bg-red-900/20 border-red-900/40 text-red-300",
    info: "bg-blue-900/20 border-blue-900/50 text-blue-300",
    warning: "bg-yellow-900/20 border-yellow-900/50 text-yellow-300",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`mb-6 p-3 rounded-lg border text-sm font-sans text-center flex items-center justify-between ${styles[type]} ${className}`}
        >
          <span className="flex-1">{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-3 text-current opacity-70 hover:opacity-100 transition"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

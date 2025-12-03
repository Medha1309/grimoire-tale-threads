import React from "react";
import { motion } from "framer-motion";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  variant?: "default" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-zinc-900/60 hover:bg-zinc-900 border-zinc-900/60 hover:border-zinc-800",
    ghost: "bg-transparent hover:bg-zinc-900/40 border-zinc-800 hover:border-zinc-700",
    danger: "bg-red-950/60 hover:bg-red-950 border-red-950/60 hover:border-red-900",
  };

  const sizes = {
    sm: "p-1.5 text-xs",
    md: "p-2 text-sm",
    lg: "p-3 text-base",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      aria-label={label}
      {...(props as any)}
    >
      {icon}
    </motion.button>
  );
};

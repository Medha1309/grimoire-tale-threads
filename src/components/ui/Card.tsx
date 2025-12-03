import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  variant?: "default" | "glass" | "solid";
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  hover = false,
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-zinc-950/95 border-red-950/40",
    glass: "bg-zinc-950/80 backdrop-blur-xl border-zinc-800/60",
    solid: "bg-zinc-950 border-zinc-900/60",
  };

  const hoverStyles = hover ? "hover:border-zinc-800 hover:bg-zinc-950" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border shadow-2xl ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface ActionCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  title: string;
  description: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded-lg border border-zinc-900/60 bg-zinc-950/80 p-6 text-left transition hover:border-zinc-800 hover:bg-zinc-950 ${className}`}
      {...props}
    >
      <div className="mb-2 text-2xl">{icon}</div>
      <h4 className="mb-1 font-medium text-zinc-300">{title}</h4>
      <p className="text-sm text-zinc-600">{description}</p>
    </button>
  );
};

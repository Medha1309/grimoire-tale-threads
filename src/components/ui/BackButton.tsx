import React from "react";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  label = "Back",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300 ${className}`}
    >
      <span>←</span>
      <span className="font-serif">{label}</span>
    </button>
  );
};

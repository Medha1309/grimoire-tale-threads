import React from "react";
import { BackButton } from "./BackButton";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "7xl";
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  onBack,
  backLabel = "Back",
  className = "",
  maxWidth = "4xl",
}) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "7xl": "max-w-7xl",
  };

  return (
    <section className={`relative min-h-screen bg-black text-zinc-100 px-6 py-16 ${className}`}>
      <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>
        {onBack && <BackButton onClick={onBack} label={backLabel} className="mb-8" />}
        
        {(title || subtitle) && (
          <div className="mb-8">
            {title && <h1 className="mb-2 font-serif text-4xl text-zinc-300">{title}</h1>}
            {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
};

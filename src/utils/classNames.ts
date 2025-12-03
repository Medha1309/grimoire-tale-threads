/**
 * Utility for combining class names
 * Filters out falsy values and joins with spaces
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Common class name patterns for reuse
 */
export const commonClasses = {
  // Layout
  pageSection: "relative min-h-screen bg-black text-zinc-100 px-6 py-16",
  container: {
    sm: "mx-auto max-w-sm",
    md: "mx-auto max-w-md",
    lg: "mx-auto max-w-lg",
    xl: "mx-auto max-w-xl",
    "2xl": "mx-auto max-w-2xl",
    "4xl": "mx-auto max-w-4xl",
    "7xl": "mx-auto max-w-7xl",
  },
  
  // Cards
  card: "rounded-lg border bg-zinc-950/95 backdrop-blur-sm shadow-2xl",
  cardGlass: "rounded-xl border border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
  
  // Text
  heading: "font-serif text-4xl text-zinc-300",
  subheading: "text-sm text-zinc-500",
  
  // Transitions
  transition: "transition-all duration-300",
  hoverScale: "hover:scale-[1.02] active:scale-[0.98]",
  
  // Borders
  borderSubtle: "border border-zinc-900/60",
  borderGlow: "border border-red-950/40",
  
  // Backgrounds
  bgDark: "bg-zinc-950/95",
  bgGlass: "bg-zinc-950/80 backdrop-blur-xl",
  bgBlack: "bg-black/60",
};

/**
 * Responsive utility
 */
export function responsive(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
): string {
  return cn(
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`
  );
}

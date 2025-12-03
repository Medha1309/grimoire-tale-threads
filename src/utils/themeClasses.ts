/**
 * Unified Theme Utility Classes
 * 
 * Use these instead of inline Tailwind classes for consistency.
 * All classes follow the Gothic/Halloween theme with proper contrast.
 */

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Brand logo - blood red
  brand: 'font-serif text-gothic-blood',
  
  // Page titles - dramatic and commanding
  pageTitle: 'font-display text-5xl font-bold leading-tight tracking-widest text-gothic-bone uppercase',
  
  // Section headers
  sectionTitle: 'font-display text-3xl font-semibold leading-snug tracking-wide text-gothic-bone',
  
  // Subsection headers
  subsectionTitle: 'font-display text-2xl font-semibold leading-snug text-gothic-bone',
  
  // Card titles
  cardTitle: 'font-body text-xl font-semibold leading-normal text-gothic-bone',
  
  // Small headers
  smallTitle: 'font-body text-lg font-semibold leading-normal text-gothic-bone',
  
  // Body text
  bodyPrimary: 'font-body text-base font-normal leading-relaxed text-gothic-bone',
  bodySecondary: 'font-body text-base font-normal leading-relaxed text-gothic-fog-light',
  bodyTertiary: 'font-body text-base font-normal leading-relaxed text-gothic-fog',
  bodySmall: 'font-body text-sm font-normal leading-normal text-gothic-fog-light',
  bodyTiny: 'font-body text-xs font-normal leading-normal text-gothic-fog',
  
  // UI elements
  button: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase',
  label: 'font-ui text-sm font-medium leading-normal tracking-wide text-gothic-fog-light',
  caption: 'font-body text-xs font-normal leading-normal text-gothic-fog',
  
  // Special
  emphasis: 'font-body text-base font-medium italic text-gothic-bone',
  decorative: 'font-decorative text-2xl font-normal leading-snug text-gothic-candlelight',
  code: 'font-mono text-sm leading-normal text-gothic-fog-light',
} as const;

// ============================================================================
// BACKGROUNDS
// ============================================================================

export const backgrounds = {
  // Page backgrounds
  page: 'bg-gradient-to-b from-gothic-shadow via-gothic-shadow-light to-gothic-shadow',
  pageWithMidnight: 'bg-gradient-to-b from-gothic-shadow via-gothic-midnight to-gothic-shadow',
  pageBlack: 'bg-gothic-shadow',
  
  // Card backgrounds
  card: 'bg-gothic-shadow-light/80 backdrop-blur-sm',
  cardElevated: 'bg-gothic-shadow-light/90 backdrop-blur-md',
  cardGlass: 'bg-gothic-shadow/30 backdrop-blur-xl',
  cardSolid: 'bg-gothic-midnight',
  
  // Surface backgrounds
  surface: 'bg-gothic-midnight/50',
  surfaceHover: 'hover:bg-gothic-midnight/70',
  surfaceActive: 'active:bg-gothic-midnight/80',
  
  // Overlay backgrounds
  overlay: 'bg-gothic-shadow/80 backdrop-blur-sm',
  overlayDark: 'bg-gothic-shadow/95 backdrop-blur-md',
} as const;

// ============================================================================
// BORDERS
// ============================================================================

export const borders = {
  // Standard borders
  default: 'border border-gothic-fog/20',
  hover: 'border border-gothic-fog/30 hover:border-gothic-fog/50',
  focus: 'border-2 border-gothic-candlelight/60 focus:border-gothic-candlelight',
  active: 'border-2 border-gothic-candlelight',
  
  // Themed borders
  dollhouse: 'border border-dollhouse-primary/30 hover:border-dollhouse-primary/50',
  parlour: 'border border-parlour-primary/30 hover:border-parlour-primary/50',
  chains: 'border border-chains-primary/30 hover:border-chains-primary/50',
  archive: 'border border-archive-primary/30 hover:border-archive-primary/50',
  
  // Glow borders
  glowGold: 'border border-gothic-candlelight/40 shadow-[0_0_20px_rgba(212,175,55,0.3)]',
  glowPink: 'border border-dollhouse-primary/40 shadow-[0_0_20px_rgba(255,182,217,0.3)]',
  glowPurple: 'border border-chains-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]',
  glowGreen: 'border border-archive-primary/40 shadow-[0_0_20px_rgba(0,255,0,0.3)]',
  glowRed: 'border border-gothic-blood/40 shadow-[0_0_20px_rgba(139,0,0,0.3)]',
} as const;

// ============================================================================
// BUTTONS
// ============================================================================

export const buttons = {
  // Primary button (gold/candlelight)
  primary: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase px-6 py-3 rounded-lg bg-gothic-candlelight/20 text-gothic-candlelight border-2 border-gothic-candlelight/60 hover:bg-gothic-candlelight/30 hover:border-gothic-candlelight shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Secondary button (neutral)
  secondary: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase px-6 py-3 rounded-lg bg-gothic-shadow-light/50 text-gothic-fog-light border-2 border-gothic-fog/30 hover:bg-gothic-shadow-light/70 hover:border-gothic-fog/50 hover:text-gothic-bone transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Ghost button (transparent)
  ghost: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase px-6 py-3 rounded-lg bg-transparent text-gothic-fog-light border-2 border-transparent hover:bg-gothic-shadow-light/30 hover:text-gothic-bone transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Danger button (red/blood)
  danger: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase px-6 py-3 rounded-lg bg-gothic-blood/20 text-gothic-blood-light border-2 border-gothic-blood/60 hover:bg-gothic-blood/30 hover:border-gothic-blood-light shadow-[0_0_20px_rgba(139,0,0,0.3)] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Theme-specific buttons
  dollhouse: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase px-6 py-3 rounded-lg bg-dollhouse-primary/20 text-dollhouse-primary border-2 border-dollhouse-primary/60 hover:bg-dollhouse-primary/30 hover:border-dollhouse-primary shadow-[0_0_20px_rgba(255,182,217,0.3)] hover:shadow-[0_0_30px_rgba(255,182,217,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  
  parlour: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase px-6 py-3 rounded-lg bg-parlour-primary/20 text-parlour-primary border-2 border-parlour-primary/60 hover:bg-parlour-primary/30 hover:border-parlour-primary shadow-[0_0_20px_rgba(232,197,71,0.3)] hover:shadow-[0_0_30px_rgba(232,197,71,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  
  chains: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase px-6 py-3 rounded-lg bg-chains-primary/20 text-chains-primary border-2 border-chains-primary/60 hover:bg-chains-primary/30 hover:border-chains-primary shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Small variants
  primarySmall: 'font-ui text-xs font-medium leading-normal tracking-wide uppercase px-4 py-2 rounded-lg bg-gothic-candlelight/20 text-gothic-candlelight border border-gothic-candlelight/60 hover:bg-gothic-candlelight/30 hover:border-gothic-candlelight shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  
  secondarySmall: 'font-ui text-xs font-medium leading-normal tracking-wide uppercase px-4 py-2 rounded-lg bg-gothic-shadow-light/50 text-gothic-fog-light border border-gothic-fog/30 hover:bg-gothic-shadow-light/70 hover:border-gothic-fog/50 hover:text-gothic-bone transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
} as const;

// ============================================================================
// CARDS
// ============================================================================

export const cards = {
  // Standard card
  default: 'bg-gothic-shadow-light/80 backdrop-blur-sm border border-gothic-fog/20 rounded-lg p-6 shadow-lg transition-all duration-300',
  
  // Hoverable card
  hoverable: 'bg-gothic-shadow-light/80 backdrop-blur-sm border border-gothic-fog/30 hover:border-gothic-fog/50 rounded-lg p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer',
  
  // Elevated card
  elevated: 'bg-gothic-shadow-light/90 backdrop-blur-md border border-gothic-fog/20 rounded-xl p-8 shadow-2xl transition-all duration-300',
  
  // Glass card
  glass: 'bg-gothic-shadow/30 backdrop-blur-xl border border-gothic-fog/20 rounded-lg p-6 shadow-lg transition-all duration-300',
  
  // Solid card
  solid: 'bg-gothic-midnight border border-gothic-fog/30 rounded-lg p-6 shadow-lg transition-all duration-300',
  
  // Interactive card
  interactive: 'bg-gothic-shadow-light/80 backdrop-blur-sm border border-gothic-fog/30 hover:border-gothic-candlelight/50 rounded-lg p-6 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-300 cursor-pointer',
} as const;

// ============================================================================
// INPUTS
// ============================================================================

export const inputs = {
  // Text input
  text: 'font-body text-base font-normal leading-relaxed text-[#d4c4a8] w-full px-4 py-3 rounded-lg bg-gradient-to-br from-[#1a1410]/90 to-[#0f0a08]/90 border border-[#8b7355]/30 focus:border-2 focus:border-[#d4c4a8]/60 placeholder:text-[#8b7355]/60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm',
  
  // Textarea
  textarea: 'font-body text-base font-normal leading-relaxed text-[#d4c4a8] w-full px-4 py-3 rounded-lg bg-gradient-to-br from-[#1a1410]/90 to-[#0f0a08]/90 border border-[#8b7355]/30 focus:border-2 focus:border-[#d4c4a8]/60 placeholder:text-[#8b7355]/60 resize-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm',
  
  // Select
  select: 'font-body text-base font-normal leading-relaxed text-[#d4c4a8] w-full px-4 py-3 rounded-lg bg-gradient-to-br from-[#1a1410]/90 to-[#0f0a08]/90 border border-[#8b7355]/30 focus:border-2 focus:border-[#d4c4a8]/60 appearance-none cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm',
  
  // Checkbox/Radio
  checkbox: 'w-5 h-5 rounded border-2 border-[#8b7355]/40 bg-gradient-to-br from-[#1a1410]/90 to-[#0f0a08]/90 text-[#d4c4a8] focus:ring-2 focus:ring-[#d4c4a8]/50 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Search input
  search: 'font-body text-base font-normal leading-relaxed text-[#d4c4a8] w-full px-4 py-3 pl-10 rounded-lg bg-gradient-to-br from-[#1a1410]/90 to-[#0f0a08]/90 border border-[#8b7355]/30 focus:border-2 focus:border-[#d4c4a8]/60 placeholder:text-[#8b7355]/60 transition-all duration-200 backdrop-blur-sm',
} as const;

// ============================================================================
// BADGES & TAGS
// ============================================================================

export const badges = {
  // Default badge
  default: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gothic-fog/20 text-gothic-fog-light border border-gothic-fog/30',
  
  // Primary badge
  primary: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gothic-candlelight/20 text-gothic-candlelight border border-gothic-candlelight/40',
  
  // Success badge
  success: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/40',
  
  // Warning badge
  warning: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/40',
  
  // Danger badge
  danger: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gothic-blood/20 text-gothic-blood-light border border-gothic-blood/40',
  
  // Theme badges
  dollhouse: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-dollhouse-primary/20 text-dollhouse-primary border border-dollhouse-primary/40',
  parlour: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-parlour-primary/20 text-parlour-primary border border-parlour-primary/40',
  chains: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-chains-primary/20 text-chains-primary border border-chains-primary/40',
} as const;

// ============================================================================
// LOADING STATES
// ============================================================================

export const loading = {
  spinner: 'inline-block w-8 h-8 border-2 border-gothic-candlelight border-t-transparent rounded-full animate-spin',
  spinnerSmall: 'inline-block w-5 h-5 border-2 border-gothic-candlelight border-t-transparent rounded-full animate-spin',
  skeleton: 'animate-pulse bg-gothic-fog/10 rounded',
  shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-gothic-bone/10 before:to-transparent',
} as const;

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  fast: 'transition-all duration-150 ease-in-out',
  normal: 'transition-all duration-300 ease-in-out',
  slow: 'transition-all duration-600 ease-in-out',
  colors: 'transition-colors duration-300 ease-in-out',
  transform: 'transition-transform duration-300 ease-in-out',
  opacity: 'transition-opacity duration-300 ease-in-out',
} as const;

// ============================================================================
// HELPER FUNCTION
// ============================================================================

/**
 * Combine multiple utility classes, filtering out falsy values
 * 
 * @example
 * cn('base-class', isActive && 'active-class', 'another-class')
 * // Returns: 'base-class active-class another-class' (if isActive is true)
 */
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  typography,
  backgrounds,
  borders,
  buttons,
  cards,
  inputs,
  badges,
  loading,
  transitions,
  cn,
};

/**
 * Design Tokens
 * Single source of truth for colors, spacing, typography, etc.
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Primary palette - Pink/Rose (Dollhouse theme)
  primary: {
    50: '#fff5f7',
    100: '#ffe3e9',
    200: '#ffc7d4',
    300: '#ffb6d9', // Main pink
    400: '#ff8fb8',
    500: '#ff69b4',
    600: '#e6509a',
    700: '#cc3d80',
    800: '#b32a66',
    900: '#99174d',
  },

  // Secondary palette - Gold/Amber (Gilded Parlour theme)
  secondary: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },

  // Neutral palette - Zinc/Gray
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a1a1a1',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Semantic colors
  success: {
    light: '#86efac',
    DEFAULT: '#22c55e',
    dark: '#166534',
  },
  error: {
    light: '#fca5a5',
    DEFAULT: '#ef4444',
    dark: '#991b1b',
  },
  warning: {
    light: '#fcd34d',
    DEFAULT: '#f59e0b',
    dark: '#92400e',
  },
  info: {
    light: '#93c5fd',
    DEFAULT: '#3b82f6',
    dark: '#1e40af',
  },

  // Theme-specific colors
  auth: {
    background: '#0a0a0a',
    surface: 'rgba(0, 0, 0, 0.3)',
    border: 'rgba(245, 241, 232, 0.1)',
    text: '#f5f1e8',
    textMuted: 'rgba(245, 241, 232, 0.5)',
    accent: '#d4e8d4',
  },

  archive: {
    green: '#0F0',
    greenDim: 'rgba(0, 255, 0, 0.2)',
    greenGlow: 'rgba(0, 255, 0, 0.5)',
  },
};

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    serif: 'Crimson Text, Georgia, serif',
    mono: 'Fira Code, monospace',
    display: 'Parisienne, cursive',
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem' }], // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }], // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// ============================================================================
// BORDERS & RADIUS
// ============================================================================

export const borders = {
  width: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
  },

  radius: {
    none: '0',
    sm: '0.25rem', // 4px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem', // 12px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    '2xl': '2rem', // 32px
    full: '9999px',
  },
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',

  // Theme-specific shadows
  glow: {
    pink: '0 0 20px rgba(255, 182, 217, 0.5)',
    gold: '0 0 20px rgba(234, 179, 8, 0.5)',
    green: '0 0 20px rgba(0, 255, 0, 0.5)',
  },
};

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================================================
// Z-INDEX
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
};

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

export const durations = {
  fast: 150,
  normal: 300,
  slow: 600,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get color with opacity
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  // Handle rgb/rgba colors
  if (color.startsWith('rgb')) {
    return color.replace(/rgba?\(([^)]+)\)/, (_, values) => {
      const [r, g, b] = values.split(',').map((v: string) => v.trim());
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    });
  }
  return color;
};

/**
 * Get responsive value
 */
export const responsive = <T>(values: { sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T }): string => {
  return Object.entries(values)
    .map(([breakpoint, value]) => `@media (min-width: ${breakpoints[breakpoint as keyof typeof breakpoints]}) { ${value} }`)
    .join(' ');
};

/**
 * Parlour Design Tokens - Modern Gothic
 * Crisp, UX-friendly color system with eerie atmosphere
 */

export const parlourColors = {
  // Primary - Bright Gold (40% more saturated)
  gold: {
    50: '#fef9e7',
    100: '#fdf3cf',
    200: '#fbe79f',
    300: '#f9db6f',
    400: '#f7cf3f',
    500: '#e8c547', // Primary gold - brighter!
    600: '#d4af37', // Old gold
    700: '#b8941f',
    800: '#8a6f17',
    900: '#5c4a0f',
  },

  // Accent - Deep Crimson
  crimson: {
    50: '#fce8e9',
    100: '#f9d1d3',
    200: '#f3a3a7',
    300: '#ed757b',
    400: '#e7474f',
    500: '#a31621', // Primary crimson
    600: '#8b1219',
    700: '#730f15',
    800: '#5b0c11',
    900: '#43090d',
  },

  // Neutrals - Higher Contrast
  neutral: {
    white: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
    black: '#000000',
  },

  // Semantic Colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export const parlourEffects = {
  // Glow Effects
  glow: {
    gold: {
      soft: '0 0 10px rgba(232, 197, 71, 0.3)',
      medium: '0 0 20px rgba(232, 197, 71, 0.4)',
      strong: '0 0 30px rgba(232, 197, 71, 0.5)',
    },
    crimson: {
      soft: '0 0 10px rgba(163, 22, 33, 0.3)',
      medium: '0 0 20px rgba(163, 22, 33, 0.4)',
      strong: '0 0 30px rgba(163, 22, 33, 0.5)',
    },
  },

  // Text Shadows
  textShadow: {
    gold: '0 0 20px rgba(232, 197, 71, 0.6)',
    crimson: '0 0 20px rgba(163, 22, 33, 0.6)',
    depth: '0 2px 4px rgba(0, 0, 0, 0.8)',
  },

  // Box Shadows
  boxShadow: {
    card: '0 4px 20px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    cardHover: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 40px rgba(232, 197, 71, 0.15)',
    button: '0 2px 12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(232, 197, 71, 0.2)',
    buttonHover: '0 4px 20px rgba(0, 0, 0, 0.7), 0 0 30px rgba(232, 197, 71, 0.3)',
  },
};

export const parlourTypography = {
  // Font Weights
  weight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Letter Spacing
  tracking: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const parlourBorders = {
  // Border Colors
  color: {
    gold: 'rgba(232, 197, 71, 0.4)',
    goldHover: 'rgba(232, 197, 71, 0.6)',
    crimson: 'rgba(163, 22, 33, 0.4)',
    crimsonHover: 'rgba(163, 22, 33, 0.6)',
    neutral: 'rgba(115, 115, 115, 0.3)',
  },

  // Border Widths
  width: {
    thin: '1px',
    normal: '2px',
    thick: '3px',
  },
};

export default {
  colors: parlourColors,
  effects: parlourEffects,
  typography: parlourTypography,
  borders: parlourBorders,
};

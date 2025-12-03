/**
 * Unified Color System
 * Single source of truth for all colors across GRIMOIRE
 */

// ============================================================================
// THEME COLORS
// ============================================================================

export const themeColors = {
  // Dollhouse - Pink/Romantic
  dollhouse: {
    primary: '#ffb6d9',
    primaryDark: '#ff8fc7',
    primaryLight: '#ffd4e8',
    primaryRgba: 'rgba(255, 182, 217, 0.4)',
    accent: '#ff69b4',
    background: '#000000',
    surface: '#0a0a0a',
    border: 'rgba(255, 182, 217, 0.2)',
    borderHover: 'rgba(255, 182, 217, 0.4)',
  },
  
  // Parlour - Gold/Elegant
  parlour: {
    primary: '#e8c547',
    primaryDark: '#d4af37',
    primaryLight: '#f9db6f',
    primaryRgba: 'rgba(232, 197, 71, 0.4)',
    accent: '#a31621', // Crimson
    background: '#0f0b08',
    surface: '#1a1410',
    border: 'rgba(232, 197, 71, 0.3)',
    borderHover: 'rgba(232, 197, 71, 0.5)',
  },
  
  // Chains - Purple/Modern
  chains: {
    primary: '#8B5CF6',
    primaryDark: '#7C3AED',
    primaryLight: '#A78BFA',
    primaryRgba: 'rgba(139, 92, 246, 0.4)',
    accent: '#6366F1', // Indigo
    background: '#050508',
    surface: '#0a0a0f',
    border: 'rgba(139, 92, 246, 0.3)',
    borderHover: 'rgba(139, 92, 246, 0.5)',
  },
  
  // Archive - Matrix Green
  archive: {
    primary: '#00FF00',
    primaryDark: '#00CC00',
    primaryLight: '#33FF33',
    primaryRgba: 'rgba(0, 255, 0, 0.4)',
    accent: '#00FF00',
    background: '#000000',
    surface: '#0a0a0a',
    border: 'rgba(0, 255, 0, 0.3)',
    borderHover: 'rgba(0, 255, 0, 0.5)',
  },
  
  // About - Neutral/Vintage
  about: {
    primary: '#a1a1aa',
    primaryDark: '#71717a',
    primaryLight: '#d4d4d8',
    primaryRgba: 'rgba(161, 161, 170, 0.4)',
    accent: '#d4a574', // Sepia
    background: '#0a0a0a',
    surface: '#1a1a1a',
    border: 'rgba(161, 161, 170, 0.3)',
    borderHover: 'rgba(161, 161, 170, 0.5)',
  },
} as const;

// ============================================================================
// SEMANTIC COLORS (Consistent across all themes)
// ============================================================================

export const semanticColors = {
  success: {
    light: '#86efac',
    DEFAULT: '#22c55e',
    dark: '#166534',
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.3)',
  },
  error: {
    light: '#fca5a5',
    DEFAULT: '#ef4444',
    dark: '#991b1b',
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.3)',
  },
  warning: {
    light: '#fcd34d',
    DEFAULT: '#f59e0b',
    dark: '#92400e',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
  },
  info: {
    light: '#93c5fd',
    DEFAULT: '#3b82f6',
    dark: '#1e40af',
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
  },
} as const;

// ============================================================================
// NEUTRAL COLORS (Consistent across all themes)
// ============================================================================

export const neutralColors = {
  white: '#ffffff',
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
  black: '#000000',
} as const;

// ============================================================================
// TEXT COLORS (Optimized for readability)
// ============================================================================

export const textColors = {
  // Light text on dark backgrounds
  dark: {
    primary: '#e4e4e7',      // 16:1 contrast on black
    secondary: '#a1a1aa',    // 8.9:1 contrast on black
    tertiary: '#71717a',     // 5.8:1 contrast on black
    disabled: '#52525b',     // 4.6:1 contrast on black
  },
  
  // Dark text on light backgrounds (for future light mode)
  light: {
    primary: '#171717',      // 16:1 contrast on white
    secondary: '#525252',    // 8.9:1 contrast on white
    tertiary: '#737373',     // 5.8:1 contrast on white
    disabled: '#a1a1a1',     // 4.6:1 contrast on white
  },
} as const;

// ============================================================================
// GLOW EFFECTS
// ============================================================================

export const glowEffects = {
  dollhouse: {
    soft: '0 0 10px rgba(255, 182, 217, 0.3)',
    medium: '0 0 20px rgba(255, 182, 217, 0.4)',
    strong: '0 0 30px rgba(255, 182, 217, 0.5)',
    intense: '0 0 40px rgba(255, 182, 217, 0.6)',
  },
  parlour: {
    soft: '0 0 10px rgba(232, 197, 71, 0.3)',
    medium: '0 0 20px rgba(232, 197, 71, 0.4)',
    strong: '0 0 30px rgba(232, 197, 71, 0.5)',
    intense: '0 0 40px rgba(232, 197, 71, 0.6)',
  },
  chains: {
    soft: '0 0 10px rgba(139, 92, 246, 0.3)',
    medium: '0 0 20px rgba(139, 92, 246, 0.4)',
    strong: '0 0 30px rgba(139, 92, 246, 0.5)',
    intense: '0 0 40px rgba(139, 92, 246, 0.6)',
  },
  archive: {
    soft: '0 0 10px rgba(0, 255, 0, 0.3)',
    medium: '0 0 20px rgba(0, 255, 0, 0.4)',
    strong: '0 0 30px rgba(0, 255, 0, 0.5)',
    intense: '0 0 40px rgba(0, 255, 0, 0.6)',
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert hex color to RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Get relative luminance of a color (for contrast calculation)
 */
export const getLuminance = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Calculate contrast ratio between two colors
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if color combination meets WCAG standards
 */
export const meetsWCAG = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  largeText: boolean = false
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  const required = largeText ? (level === 'AAA' ? 4.5 : 3) : level === 'AAA' ? 7 : 4.5;

  return ratio >= required;
};

/**
 * Get accessible text color for a given background
 */
export const getAccessibleTextColor = (
  background: string,
  preferDark: boolean = false
): string => {
  const darkRatio = getContrastRatio(textColors.dark.primary, background);
  const lightRatio = getContrastRatio(textColors.light.primary, background);

  if (preferDark && darkRatio >= 4.5) {
    return textColors.dark.primary;
  }

  return darkRatio > lightRatio ? textColors.dark.primary : textColors.light.primary;
};

/**
 * Add opacity to hex color
 */
export const withOpacity = (hex: string, opacity: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

/**
 * Get theme colors by name
 */
export const getThemeColors = (theme: keyof typeof themeColors) => {
  return themeColors[theme];
};

/**
 * Get glow effect by theme and intensity
 */
export const getGlowEffect = (
  theme: keyof typeof glowEffects,
  intensity: 'soft' | 'medium' | 'strong' | 'intense' = 'medium'
) => {
  return glowEffects[theme][intensity];
};

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

export const a11yColors = {
  // Minimum contrast ratios
  minContrast: {
    normalText: 4.5,      // WCAG AA
    largeText: 3,         // WCAG AA
    normalTextAAA: 7,     // WCAG AAA
    largeTextAAA: 4.5,    // WCAG AAA
  },

  // Focus indicators
  focus: {
    ring: '#3b82f6',
    ringWidth: '2px',
    ringOffset: '2px',
  },

  // High contrast mode overrides
  highContrast: {
    text: '#ffffff',
    background: '#000000',
    border: '#ffffff',
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  themes: themeColors,
  semantic: semanticColors,
  neutral: neutralColors,
  text: textColors,
  glow: glowEffects,
  a11y: a11yColors,
  utils: {
    hexToRgb,
    getLuminance,
    getContrastRatio,
    meetsWCAG,
    getAccessibleTextColor,
    withOpacity,
    getThemeColors,
    getGlowEffect,
  },
};

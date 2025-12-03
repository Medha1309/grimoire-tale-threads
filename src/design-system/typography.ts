/**
 * Unified Typography System
 * Ensures consistent fonts, hierarchy, and readability across all components
 */

// ============================================================================
// FONT FAMILIES
// ============================================================================

export const fontFamilies = {
  // Display - For dramatic headers and titles
  display: '"Playfair Display", Georgia, serif',
  
  // Body - For readable content
  body: '"Cormorant Garamond", "Crimson Text", Georgia, serif',
  
  // UI - For buttons, labels, and functional elements
  ui: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  
  // Decorative - Use sparingly for special accents
  decorative: '"Parisienne", cursive',
  
  // Monospace - For code and technical content
  mono: '"Fira Code", "Courier New", monospace',
} as const;

// ============================================================================
// FONT SIZES & LINE HEIGHTS
// ============================================================================

export const textSizes = {
  // Headings
  h1: {
    fontSize: '3rem',        // 48px
    lineHeight: '1.2',
    fontWeight: '700',
    letterSpacing: '0.02em',
  },
  h2: {
    fontSize: '2.25rem',     // 36px
    lineHeight: '1.25',
    fontWeight: '600',
    letterSpacing: '0.01em',
  },
  h3: {
    fontSize: '1.875rem',    // 30px
    lineHeight: '1.3',
    fontWeight: '600',
    letterSpacing: '0.01em',
  },
  h4: {
    fontSize: '1.5rem',      // 24px
    lineHeight: '1.4',
    fontWeight: '600',
    letterSpacing: 'normal',
  },
  h5: {
    fontSize: '1.25rem',     // 20px
    lineHeight: '1.5',
    fontWeight: '500',
    letterSpacing: 'normal',
  },
  h6: {
    fontSize: '1.125rem',    // 18px
    lineHeight: '1.5',
    fontWeight: '500',
    letterSpacing: 'normal',
  },
  
  // Body text
  body: {
    fontSize: '1rem',        // 16px
    lineHeight: '1.75',      // Optimal for reading
    fontWeight: '400',
    letterSpacing: 'normal',
  },
  bodyLarge: {
    fontSize: '1.125rem',    // 18px
    lineHeight: '1.75',
    fontWeight: '400',
    letterSpacing: 'normal',
  },
  bodySmall: {
    fontSize: '0.875rem',    // 14px
    lineHeight: '1.6',
    fontWeight: '400',
    letterSpacing: 'normal',
  },
  
  // UI elements
  button: {
    fontSize: '0.875rem',    // 14px
    lineHeight: '1.5',
    fontWeight: '500',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
  label: {
    fontSize: '0.875rem',    // 14px
    lineHeight: '1.5',
    fontWeight: '500',
    letterSpacing: '0.02em',
  },
  caption: {
    fontSize: '0.75rem',     // 12px
    lineHeight: '1.5',
    fontWeight: '400',
    letterSpacing: 'normal',
  },
} as const;

// ============================================================================
// FONT WEIGHTS
// ============================================================================

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// ============================================================================
// LETTER SPACING
// ============================================================================

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  relaxed: '0.02em',
  wide: '0.05em',
  wider: '0.1em',
  widest: '0.15em',
} as const;

// ============================================================================
// TEXT STYLES (Composable)
// ============================================================================

export const textStyles = {
  // Page titles - dramatic and commanding
  pageTitle: {
    fontFamily: fontFamilies.display,
    ...textSizes.h1,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase' as const,
  },
  
  // Section headers
  sectionHeader: {
    fontFamily: fontFamilies.display,
    ...textSizes.h2,
    letterSpacing: letterSpacing.wide,
  },
  
  // Subsection headers
  subsectionHeader: {
    fontFamily: fontFamilies.display,
    ...textSizes.h3,
  },
  
  // Card titles
  cardTitle: {
    fontFamily: fontFamilies.body,
    ...textSizes.h4,
  },
  
  // Small headers
  smallHeader: {
    fontFamily: fontFamilies.body,
    ...textSizes.h5,
  },
  
  // Body text - optimized for reading
  body: {
    fontFamily: fontFamilies.body,
    ...textSizes.body,
  },
  
  // Large body text
  bodyLarge: {
    fontFamily: fontFamilies.body,
    ...textSizes.bodyLarge,
  },
  
  // Small body text
  bodySmall: {
    fontFamily: fontFamilies.body,
    ...textSizes.bodySmall,
  },
  
  // Emphasis text
  emphasis: {
    fontFamily: fontFamilies.body,
    ...textSizes.body,
    fontStyle: 'italic' as const,
    fontWeight: fontWeights.medium,
  },
  
  // UI elements
  button: {
    fontFamily: fontFamilies.ui,
    ...textSizes.button,
  },
  
  label: {
    fontFamily: fontFamilies.ui,
    ...textSizes.label,
  },
  
  caption: {
    fontFamily: fontFamilies.body,
    ...textSizes.caption,
  },
  
  // Decorative - use sparingly
  decorative: {
    fontFamily: fontFamilies.decorative,
    fontSize: '1.5rem',
    lineHeight: '1.4',
    fontWeight: fontWeights.regular,
  },
  
  // Monospace
  code: {
    fontFamily: fontFamilies.mono,
    fontSize: '0.875rem',
    lineHeight: '1.6',
  },
} as const;

// ============================================================================
// THEME-SPECIFIC OVERRIDES
// ============================================================================

export const themeTypography = {
  // Dollhouse - Romantic and whimsical
  dollhouse: {
    pageTitle: {
      ...textStyles.pageTitle,
      letterSpacing: letterSpacing.widest,
    },
  },
  
  // Parlour - Elegant and refined
  parlour: {
    pageTitle: {
      ...textStyles.pageTitle,
      fontFamily: fontFamilies.display,
    },
    body: {
      ...textStyles.body,
      letterSpacing: letterSpacing.relaxed,
    },
  },
  
  // Chains - Modern and technical
  chains: {
    pageTitle: {
      ...textStyles.pageTitle,
      fontFamily: fontFamilies.ui,
      letterSpacing: letterSpacing.wide,
    },
  },
  
  // About - Vintage and nostalgic
  about: {
    pageTitle: {
      ...textStyles.pageTitle,
      fontFamily: fontFamilies.display,
    },
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get text style by name
 */
export const getTextStyle = (styleName: keyof typeof textStyles) => {
  return textStyles[styleName];
};

/**
 * Get theme-specific text style
 */
export const getThemeTextStyle = (
  theme: keyof typeof themeTypography,
  styleName: keyof typeof textStyles
) => {
  const themeOverride = themeTypography[theme]?.[styleName as keyof typeof themeTypography[typeof theme]];
  return themeOverride || textStyles[styleName];
};

/**
 * Create responsive text style
 */
export const createResponsiveText = (
  mobile: keyof typeof textSizes,
  desktop: keyof typeof textSizes
) => {
  return {
    ...textSizes[mobile],
    '@media (min-width: 768px)': textSizes[desktop],
  };
};

/**
 * Apply text truncation
 */
export const truncateText = (lines: number = 1) => {
  if (lines === 1) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const,
    };
  }
  
  return {
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  };
};

// ============================================================================
// CSS CLASSES (for Tailwind)
// ============================================================================

export const typographyClasses = {
  // Headings
  h1: 'font-display text-5xl font-bold leading-tight tracking-wide',
  h2: 'font-display text-4xl font-semibold leading-tight tracking-wide',
  h3: 'font-display text-3xl font-semibold leading-snug',
  h4: 'font-body text-2xl font-semibold leading-snug',
  h5: 'font-body text-xl font-medium leading-normal',
  h6: 'font-body text-lg font-medium leading-normal',
  
  // Body
  body: 'font-body text-base font-normal leading-relaxed',
  bodyLarge: 'font-body text-lg font-normal leading-relaxed',
  bodySmall: 'font-body text-sm font-normal leading-normal',
  
  // UI
  button: 'font-ui text-sm font-medium leading-normal tracking-wide uppercase',
  label: 'font-ui text-sm font-medium leading-normal tracking-wide',
  caption: 'font-body text-xs font-normal leading-normal',
  
  // Special
  decorative: 'font-decorative text-2xl font-normal leading-snug',
  code: 'font-mono text-sm leading-normal',
} as const;

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

export const a11yTypography = {
  // Minimum sizes for readability
  minBodySize: '16px',
  minLabelSize: '14px',
  minCaptionSize: '12px',
  
  // Optimal line heights
  bodyLineHeight: 1.75,
  headingLineHeight: 1.3,
  
  // Contrast requirements (WCAG AA)
  minContrast: 4.5, // For normal text
  minContrastLarge: 3,   // For large text (18px+ or 14px+ bold)
  
  // Maximum line length for readability
  maxLineLength: '65ch',
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  families: fontFamilies,
  sizes: textSizes,
  weights: fontWeights,
  spacing: letterSpacing,
  styles: textStyles,
  themes: themeTypography,
  classes: typographyClasses,
  a11y: a11yTypography,
  utils: {
    getTextStyle,
    getThemeTextStyle,
    createResponsiveText,
    truncateText,
  },
};

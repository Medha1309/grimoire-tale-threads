/**
 * Regency Era Typography System
 * Period-accurate fonts and typographic treatments for Bridgerton-level sophistication
 * 
 * Historical Context:
 * - Caslon (1725): The quintessential English typeface of the Georgian era
 * - Baskerville (1757): Transitional serif, elegant and refined
 * - Bodoni (1798): High contrast, used for display
 */

export const regencyTypography = {
  // Font stacks with period-accurate fallbacks
  fonts: {
    // Display - for titles and headers
    display: '"Playfair Display", "Libre Baskerville", "Baskerville", "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif',
    
    // Body - for readable text
    body: '"Crimson Text", "Crimson Pro", "Libre Baskerville", Georgia, "Times New Roman", serif',
    
    // Elegant - for special emphasis
    elegant: '"Cormorant Garamond", "EB Garamond", Garamond, "Garamond Premier Pro", serif',
    
    // UI - for functional elements (modern but refined)
    ui: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  // Period-accurate letter spacing (18th century printing)
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    relaxed: '0.05em',      // Typical for body text
    wide: '0.15em',         // For small caps and titles
    veryWide: '0.25em',     // For dramatic headers
  },

  // Line heights for optimal readability
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,          // Period books used generous leading
    loose: 2,
  },

  // Font weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Sizes with proper hierarchy
  sizes: {
    xs: '0.75rem',      // 12px - footnotes
    sm: '0.875rem',     // 14px - captions
    base: '1rem',       // 16px - body
    lg: '1.125rem',     // 18px - emphasis
    xl: '1.25rem',      // 20px - subheadings
    '2xl': '1.5rem',    // 24px - section headers
    '3xl': '1.875rem',  // 30px - page titles
    '4xl': '2.25rem',   // 36px - display
    '5xl': '3rem',      // 48px - hero
  },
} as const;

// Typography component classes for consistent application
export const regencyTextStyles = {
  // Page title - dramatic and commanding
  pageTitle: {
    fontFamily: regencyTypography.fonts.display,
    fontSize: regencyTypography.sizes['4xl'],
    fontWeight: regencyTypography.weights.regular,
    letterSpacing: regencyTypography.letterSpacing.veryWide,
    lineHeight: regencyTypography.lineHeight.tight,
    textTransform: 'uppercase' as const,
  },

  // Section heading
  sectionHeading: {
    fontFamily: regencyTypography.fonts.display,
    fontSize: regencyTypography.sizes['2xl'],
    fontWeight: regencyTypography.weights.semibold,
    letterSpacing: regencyTypography.letterSpacing.wide,
    lineHeight: regencyTypography.lineHeight.normal,
  },

  // Post title
  postTitle: {
    fontFamily: regencyTypography.fonts.elegant,
    fontSize: regencyTypography.sizes.xl,
    fontWeight: regencyTypography.weights.medium,
    letterSpacing: regencyTypography.letterSpacing.relaxed,
    lineHeight: regencyTypography.lineHeight.normal,
  },

  // Body text - optimized for reading
  body: {
    fontFamily: regencyTypography.fonts.body,
    fontSize: regencyTypography.sizes.base,
    fontWeight: regencyTypography.weights.regular,
    letterSpacing: regencyTypography.letterSpacing.relaxed,
    lineHeight: regencyTypography.lineHeight.relaxed,
  },

  // Emphasis text
  emphasis: {
    fontFamily: regencyTypography.fonts.elegant,
    fontSize: regencyTypography.sizes.base,
    fontWeight: regencyTypography.weights.medium,
    fontStyle: 'italic' as const,
    letterSpacing: regencyTypography.letterSpacing.normal,
  },

  // UI elements (buttons, labels)
  ui: {
    fontFamily: regencyTypography.fonts.ui,
    fontSize: regencyTypography.sizes.sm,
    fontWeight: regencyTypography.weights.medium,
    letterSpacing: regencyTypography.letterSpacing.wide,
    textTransform: 'uppercase' as const,
  },

  // Small caps - period-accurate styling
  smallCaps: {
    fontFamily: regencyTypography.fonts.display,
    fontSize: regencyTypography.sizes.sm,
    fontWeight: regencyTypography.weights.regular,
    letterSpacing: regencyTypography.letterSpacing.wide,
    textTransform: 'uppercase' as const,
    fontVariant: 'small-caps' as const,
  },
} as const;

// CSS custom properties for use in stylesheets
export const regencyTypographyCSS = `
  /* Regency Typography System */
  :root {
    /* Fonts */
    --font-display: ${regencyTypography.fonts.display};
    --font-body: ${regencyTypography.fonts.body};
    --font-elegant: ${regencyTypography.fonts.elegant};
    --font-ui: ${regencyTypography.fonts.ui};

    /* Letter Spacing */
    --letter-spacing-tight: ${regencyTypography.letterSpacing.tight};
    --letter-spacing-normal: ${regencyTypography.letterSpacing.normal};
    --letter-spacing-relaxed: ${regencyTypography.letterSpacing.relaxed};
    --letter-spacing-wide: ${regencyTypography.letterSpacing.wide};
    --letter-spacing-very-wide: ${regencyTypography.letterSpacing.veryWide};

    /* Line Heights */
    --line-height-tight: ${regencyTypography.lineHeight.tight};
    --line-height-normal: ${regencyTypography.lineHeight.normal};
    --line-height-relaxed: ${regencyTypography.lineHeight.relaxed};
    --line-height-loose: ${regencyTypography.lineHeight.loose};
  }
`;

// Helper function to apply text styles
export const applyRegencyTextStyle = (styleName: keyof typeof regencyTextStyles) => {
  return regencyTextStyles[styleName];
};

/**
 * Design System - Central Export
 * Single import point for all design system utilities
 */

// Spacing System
export * from './spacing';
export { default as spacing } from './spacing';

// Color System
export * from './colors';
export { default as colors } from './colors';

// Typography System
export * from './typography';
export { default as typography } from './typography';

// Button System
export * from './button-system';

// Unified Tokens
export * from './unified-tokens';

// Theme-specific tokens
export * from './dollhouse-tokens';
export * from './parlour-tokens';
export * from './retro-tokens';
export * from './costume-themes';

// Re-export commonly used utilities (no duplicates)
export {
  spacing as spacingScale,
  semanticSpacing,
  containers,
  responsiveSpacing,
  touchTargets,
} from './spacing';

export {
  themeColors,
  semanticColors,
  neutralColors,
  textColors,
  glowEffects,
  getThemeColors,
  getContrastRatio,
  meetsWCAG,
  withOpacity,
  getGlowEffect,
  hexToRgb,
  getLuminance,
  getAccessibleTextColor,
} from './colors';

export {
  fontFamilies,
  fontWeights,
  letterSpacing,
  textStyles,
  getTextStyle,
} from './typography';


/**
 * Unified Spacing System
 * Consistent spacing, padding, margins, and gaps across all components
 */

// ============================================================================
// BASE SPACING SCALE (4px increments)
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  7: '1.75rem',  // 28px
  8: '2rem',     // 32px
  9: '2.25rem',  // 36px
  10: '2.5rem',  // 40px
  11: '2.75rem', // 44px
  12: '3rem',    // 48px
  14: '3.5rem',  // 56px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  28: '7rem',    // 112px
  32: '8rem',    // 128px
  36: '9rem',    // 144px
  40: '10rem',   // 160px
  44: '11rem',   // 176px
  48: '12rem',   // 192px
  52: '13rem',   // 208px
  56: '14rem',   // 224px
  60: '15rem',   // 240px
  64: '16rem',   // 256px
  72: '18rem',   // 288px
  80: '20rem',   // 320px
  96: '24rem',   // 384px
} as const;

// ============================================================================
// SEMANTIC SPACING (Context-aware)
// ============================================================================

export const semanticSpacing = {
  // Page-level spacing
  page: {
    mobile: spacing[4],      // 16px
    tablet: spacing[6],      // 24px
    desktop: spacing[8],     // 32px
  },
  
  // Section spacing (between major sections)
  section: {
    mobile: spacing[8],      // 32px
    tablet: spacing[12],     // 48px
    desktop: spacing[16],    // 64px
  },
  
  // Component spacing (internal padding)
  component: {
    xs: spacing[2],          // 8px
    sm: spacing[3],          // 12px
    md: spacing[4],          // 16px
    lg: spacing[6],          // 24px
    xl: spacing[8],          // 32px
  },
  
  // Gap spacing (between elements)
  gap: {
    xs: spacing[2],          // 8px
    sm: spacing[4],          // 16px
    md: spacing[6],          // 24px
    lg: spacing[8],          // 32px
    xl: spacing[12],         // 48px
  },
  
  // Stack spacing (vertical rhythm)
  stack: {
    xs: spacing[2],          // 8px
    sm: spacing[4],          // 16px
    md: spacing[6],          // 24px
    lg: spacing[8],          // 32px
    xl: spacing[12],         // 48px
  },
} as const;

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

export const containers = {
  // Standard containers
  sm: '640px',     // Narrow content (forms, articles)
  md: '768px',     // Medium content (modals, cards)
  lg: '1024px',    // Standard content (most pages)
  xl: '1280px',    // Wide content (dashboards, grids)
  '2xl': '1536px', // Full width (landing pages)
  
  // Semantic containers
  article: '65ch',  // Optimal reading width (45-75 characters)
  form: '640px',    // Form layouts
  modal: '768px',   // Modal dialogs
  page: '1280px',   // Standard page width
  full: '100%',     // Full width
} as const;

// ============================================================================
// RESPONSIVE SPACING UTILITIES
// ============================================================================

export const responsiveSpacing = {
  // Page padding (horizontal)
  pagePadding: 'px-4 sm:px-6 lg:px-8',
  pagePaddingX: 'px-4 sm:px-6 lg:px-8',
  pagePaddingY: 'py-8 sm:py-12 lg:py-16',
  
  // Section spacing (vertical)
  sectionSpacing: 'py-8 sm:py-12 lg:py-16',
  sectionSpacingTop: 'pt-8 sm:pt-12 lg:pt-16',
  sectionSpacingBottom: 'pb-8 sm:pb-12 lg:pb-16',
  
  // Component padding
  componentPadding: 'p-4 sm:p-6',
  componentPaddingLg: 'p-6 sm:p-8',
  componentPaddingX: 'px-4 sm:px-6',
  componentPaddingY: 'py-4 sm:py-6',
  
  // Gap utilities
  gapXs: 'gap-2 sm:gap-3',
  gapSm: 'gap-4 sm:gap-6',
  gapMd: 'gap-6 sm:gap-8',
  gapLg: 'gap-8 sm:gap-12',
  gapXl: 'gap-12 sm:gap-16',
  
  // Stack spacing (vertical)
  stackXs: 'space-y-2 sm:space-y-3',
  stackSm: 'space-y-4 sm:space-y-6',
  stackMd: 'space-y-6 sm:space-y-8',
  stackLg: 'space-y-8 sm:space-y-12',
  stackXl: 'space-y-12 sm:space-y-16',
} as const;

// ============================================================================
// TOUCH TARGETS (Mobile accessibility)
// ============================================================================

export const touchTargets = {
  // Minimum sizes for touch targets
  minimum: '44px',      // WCAG 2.1 Level AAA
  comfortable: '48px',  // Recommended
  large: '56px',        // Large buttons
  
  // Classes
  minTouch: 'min-h-[44px] min-w-[44px]',
  comfortableTouch: 'min-h-[48px] min-w-[48px]',
  largeTouch: 'min-h-[56px] min-w-[56px]',
} as const;

// ============================================================================
// GRID SYSTEMS
// ============================================================================

export const gridSystems = {
  // Column counts
  cols: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  },
  
  // Responsive grids
  responsive: {
    // 1 col mobile, 2 col tablet, 3 col desktop
    standard: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    // 1 col mobile, 2 col tablet, 4 col desktop
    wide: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    // 1 col mobile, 3 col desktop
    simple: 'grid-cols-1 lg:grid-cols-3',
    // 2 col mobile, 4 col desktop
    compact: 'grid-cols-2 lg:grid-cols-4',
  },
} as const;

// ============================================================================
// ALIGNMENT UTILITIES
// ============================================================================

export const alignment = {
  // Flex utilities
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexStart: 'flex items-center justify-start',
  flexEnd: 'flex items-center justify-end',
  flexCol: 'flex flex-col',
  flexColCenter: 'flex flex-col items-center justify-center',
  
  // Grid utilities
  gridCenter: 'grid place-items-center',
  gridStart: 'grid place-items-start',
  gridEnd: 'grid place-items-end',
  
  // Text alignment
  textCenter: 'text-center',
  textLeft: 'text-left',
  textRight: 'text-right',
  textJustify: 'text-justify',
} as const;

// ============================================================================
// LAYOUT PATTERNS
// ============================================================================

export const layoutPatterns = {
  // Page container
  pageContainer: 'relative min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16',
  
  // Content container
  contentContainer: 'max-w-7xl mx-auto',
  
  // Section
  section: 'py-8 sm:py-12 lg:py-16',
  
  // Card
  card: 'p-4 sm:p-6 rounded-lg border backdrop-blur-md',
  cardLarge: 'p-6 sm:p-8 rounded-lg border backdrop-blur-md',
  
  // Form
  form: 'max-w-2xl mx-auto space-y-6',
  formField: 'space-y-2',
  
  // Header
  header: 'mb-8 sm:mb-12 pb-6 border-b',
  headerContent: 'flex items-center justify-between',
  
  // Footer
  footer: 'mt-8 sm:mt-12 pt-6 border-t',
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get spacing value by key
 */
export const getSpacing = (key: keyof typeof spacing) => {
  return spacing[key];
};

/**
 * Get responsive spacing classes
 */
export const getResponsiveSpacing = (
  type: 'page' | 'section' | 'component' | 'gap' | 'stack',
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
) => {
  const key = `${type}${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof responsiveSpacing;
  return responsiveSpacing[key] || responsiveSpacing[`${type}Spacing` as keyof typeof responsiveSpacing];
};

/**
 * Create custom spacing
 */
export const createSpacing = (
  top: keyof typeof spacing,
  right: keyof typeof spacing,
  bottom: keyof typeof spacing,
  left: keyof typeof spacing
) => {
  return {
    paddingTop: spacing[top],
    paddingRight: spacing[right],
    paddingBottom: spacing[bottom],
    paddingLeft: spacing[left],
  };
};

/**
 * Get container width
 */
export const getContainer = (size: keyof typeof containers) => {
  return containers[size];
};

/**
 * Create responsive container
 */
export const createResponsiveContainer = (
  mobile: keyof typeof containers,
  tablet: keyof typeof containers,
  desktop: keyof typeof containers
) => {
  return {
    maxWidth: containers[mobile],
    '@media (min-width: 768px)': {
      maxWidth: containers[tablet],
    },
    '@media (min-width: 1024px)': {
      maxWidth: containers[desktop],
    },
  };
};

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

export const a11ySpacing = {
  // Minimum spacing for readability
  minLineLength: '45ch',
  maxLineLength: '75ch',
  optimalLineLength: '65ch',
  
  // Minimum spacing between interactive elements
  minTouchSpacing: '8px',
  
  // Focus ring spacing
  focusRingOffset: '2px',
  focusRingWidth: '2px',
  
  // Paragraph spacing
  paragraphSpacing: '1.5em',
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  spacing,
  semantic: semanticSpacing,
  containers,
  responsive: responsiveSpacing,
  touchTargets,
  grids: gridSystems,
  alignment,
  patterns: layoutPatterns,
  a11y: a11ySpacing,
  utils: {
    getSpacing,
    getResponsiveSpacing,
    createSpacing,
    getContainer,
    createResponsiveContainer,
  },
};

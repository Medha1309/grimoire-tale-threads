/**
 * Unified Design Tokens
 * Cross-room consistency for timing, depth, and textures
 * Preserves room individuality through color and ornament choices
 */

// ============================================================================
// ANIMATION TIMINGS - Consistent speeds across all rooms
// ============================================================================

export const UNIFIED_TIMINGS = {
  // Micro-interactions (hover, click, focus)
  instant: 0.15,
  
  // Standard UI transitions (tooltips, dropdowns)
  quick: 0.3,
  
  // Page and view transitions
  smooth: 0.6,
  
  // Dramatic reveals (modals, curtains)
  dramatic: 1.2,
  
  // Epic full-screen transitions
  epic: 3.5,
  
  // Ambient background animations
  breathe: 3,    // Subtle pulses, glows
  float: 8,      // Floating elements
  drift: 20,     // Slow background ornaments
} as const;

// ============================================================================
// EASING FUNCTIONS - Consistent motion curves
// ============================================================================

export const UNIFIED_EASING = {
  // Standard easing
  smooth: 'easeInOut',
  
  // Dramatic easing
  dramatic: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
  
  // Spring physics
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 20,
  },
} as const;

// ============================================================================
// DEPTH SYSTEM - Consistent shadows and layering
// ============================================================================

export const UNIFIED_DEPTH = {
  // Card shadows - use these for all card-like elements
  shadows: {
    card: {
      rest: '0 4px 20px rgba(0, 0, 0, 0.5)',
      hover: '0 8px 30px rgba(0, 0, 0, 0.6)',
      active: '0 2px 12px rgba(0, 0, 0, 0.4)',
    },
    
    // Text shadows for readability
    text: {
      subtle: '0 1px 2px rgba(0, 0, 0, 0.8)',
      medium: '0 2px 4px rgba(0, 0, 0, 0.8)',
      strong: '0 4px 8px rgba(0, 0, 0, 0.9)',
    },
    
    // Glow effects - pass room color
    glow: {
      soft: (color: string) => `0 0 10px ${color}`,
      medium: (color: string) => `0 0 20px ${color}`,
      strong: (color: string) => `0 0 30px ${color}`,
      intense: (color: string) => `0 0 40px ${color}`,
    },
    
    // Combined card + glow
    cardGlow: (glowColor: string) => 
      `0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px ${glowColor}`,
    
    cardGlowHover: (glowColor: string) => 
      `0 8px 30px rgba(0, 0, 0, 0.6), 0 0 40px ${glowColor}`,
  },
  
  // Blur effects
  blur: {
    light: 'blur(10px)',
    medium: 'blur(20px)',
    heavy: 'blur(30px)',
  },
  
  // Z-index layering
  zIndex: {
    background: 0,
    backgroundEffects: 1,
    content: 10,
    contentHover: 15,
    overlay: 20,
    modal: 30,
    modalContent: 35,
    cursor: 40,
    curtain: 50,
  },
} as const;

// ============================================================================
// TEXTURE SYSTEM - Consistent grain, vignettes, patterns
// ============================================================================

export const UNIFIED_TEXTURES = {
  // Film grain overlay
  grain: {
    opacity: 0.02,
    opacityVintage: 0.03, // For About page
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
  },
  
  // Vignette overlays
  vignette: {
    subtle: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 100%)',
    medium: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%)',
    strong: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)',
  },
  
  // Ambient glow (top of page)
  ambientGlow: (color: string, opacity: number = 0.2) => ({
    background: `radial-gradient(ellipse 1200px 800px at 50% 0%, ${color}, transparent 60%)`,
    opacity,
  }),
  
  // Decorative patterns
  patterns: {
    damask: (color: string, opacity: number = 0.03) => ({
      backgroundImage: `
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 60px,
          ${color} 60px,
          ${color} 61px
        ),
        repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 60px,
          ${color} 60px,
          ${color} 61px
        )
      `,
      backgroundSize: '60px 60px',
      opacity,
    }),
    
    fabric: (color: string, opacity: number = 0.2) => ({
      backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, ${color} 3px, ${color} 6px)`,
      opacity,
    }),
  },
} as const;

// ============================================================================
// BORDER SYSTEM - Consistent border treatments
// ============================================================================

export const UNIFIED_BORDERS = {
  width: {
    thin: '1px',
    normal: '2px',
    thick: '3px',
  },
  
  radius: {
    sm: '0.5rem',   // 8px
    md: '0.75rem',  // 12px
    lg: '1rem',     // 16px
    xl: '1.5rem',   // 24px
  },
  
  // Room-specific border colors (maintain individuality)
  colors: {
    dollhouse: 'rgba(255, 182, 217, 0.2)',
    dollhouseHover: 'rgba(255, 182, 217, 0.4)',
    
    parlour: 'rgba(139, 115, 85, 0.3)',
    parlourHover: 'rgba(139, 115, 85, 0.5)',
    
    chains: 'rgba(139, 92, 246, 0.3)',
    chainsHover: 'rgba(139, 92, 246, 0.5)',
    
    about: 'rgba(60, 60, 60, 0.3)',
    aboutHover: 'rgba(80, 80, 80, 0.5)',
  },
} as const;

// ============================================================================
// ROOM THEMES - Preserve individuality while using unified systems
// ============================================================================

export const ROOM_THEMES = {
  dollhouse: {
    primary: '#ffb6d9',
    primaryRgba: 'rgba(255, 182, 217, 0.4)',
    background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
    timing: UNIFIED_TIMINGS,
    shadows: UNIFIED_DEPTH.shadows,
    grain: UNIFIED_TEXTURES.grain.opacity,
    vignette: UNIFIED_TEXTURES.vignette.medium,
    border: UNIFIED_BORDERS.colors.dollhouse,
  },
  
  parlour: {
    primary: '#e8c547',
    primaryRgba: 'rgba(232, 197, 71, 0.4)',
    background: 'linear-gradient(180deg, #1a1410 0%, #0f0b08 100%)',
    timing: UNIFIED_TIMINGS,
    shadows: UNIFIED_DEPTH.shadows,
    grain: UNIFIED_TEXTURES.grain.opacity,
    vignette: UNIFIED_TEXTURES.vignette.medium,
    border: UNIFIED_BORDERS.colors.parlour,
  },
  
  chains: {
    primary: '#8B5CF6',
    primaryRgba: 'rgba(139, 92, 246, 0.4)',
    background: 'linear-gradient(180deg, #0a0a0f 0%, #050508 100%)',
    timing: UNIFIED_TIMINGS,
    shadows: UNIFIED_DEPTH.shadows,
    grain: UNIFIED_TEXTURES.grain.opacity,
    vignette: UNIFIED_TEXTURES.vignette.medium,
    border: UNIFIED_BORDERS.colors.chains,
  },
  
  about: {
    primary: '#a1a1aa',
    primaryRgba: 'rgba(161, 161, 170, 0.4)',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
    timing: UNIFIED_TIMINGS,
    shadows: UNIFIED_DEPTH.shadows,
    grain: UNIFIED_TEXTURES.grain.opacityVintage, // Slightly more grain
    vignette: UNIFIED_TEXTURES.vignette.strong,    // Stronger vignette
    border: UNIFIED_BORDERS.colors.about,
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get room theme by name
 */
export const getRoomTheme = (room: keyof typeof ROOM_THEMES) => {
  return ROOM_THEMES[room];
};

/**
 * Create consistent card style
 */
export const createCardStyle = (theme: keyof typeof ROOM_THEMES) => {
  const roomTheme = ROOM_THEMES[theme];
  return {
    boxShadow: UNIFIED_DEPTH.shadows.cardGlow(roomTheme.primaryRgba),
    border: `${UNIFIED_BORDERS.width.thin} solid ${roomTheme.border}`,
    borderRadius: UNIFIED_BORDERS.radius.md,
    transition: `all ${UNIFIED_TIMINGS.quick}s ${UNIFIED_EASING.smooth}`,
  };
};

/**
 * Create consistent hover style
 */
export const createHoverStyle = (theme: keyof typeof ROOM_THEMES) => {
  const roomTheme = ROOM_THEMES[theme];
  return {
    boxShadow: UNIFIED_DEPTH.shadows.cardGlowHover(roomTheme.primaryRgba),
    border: `${UNIFIED_BORDERS.width.thin} solid ${UNIFIED_BORDERS.colors[`${theme}Hover` as keyof typeof UNIFIED_BORDERS.colors]}`,
    transform: 'translateY(-2px)',
  };
};

/**
 * Create background with grain and vignette
 */
export const createBackgroundStyle = (theme: keyof typeof ROOM_THEMES) => {
  const roomTheme = ROOM_THEMES[theme];
  return {
    background: roomTheme.background,
    position: 'relative' as const,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      inset: 0,
      backgroundImage: UNIFIED_TEXTURES.grain.backgroundImage,
      opacity: roomTheme.grain,
      pointerEvents: 'none' as const,
    },
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      inset: 0,
      background: roomTheme.vignette,
      pointerEvents: 'none' as const,
    },
  };
};

/**
 * Get animation duration by type
 */
export const getAnimationDuration = (type: keyof typeof UNIFIED_TIMINGS) => {
  return UNIFIED_TIMINGS[type];
};

/**
 * Create framer-motion transition config
 */
export const createTransition = (
  duration: keyof typeof UNIFIED_TIMINGS,
  easing: keyof typeof UNIFIED_EASING = 'smooth'
) => {
  const durationValue = UNIFIED_TIMINGS[duration];
  const easingValue = UNIFIED_EASING[easing];
  
  if (typeof easingValue === 'object') {
    return { ...easingValue, duration: durationValue };
  }
  
  return { duration: durationValue, ease: easingValue };
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  timings: UNIFIED_TIMINGS,
  easing: UNIFIED_EASING,
  depth: UNIFIED_DEPTH,
  textures: UNIFIED_TEXTURES,
  borders: UNIFIED_BORDERS,
  themes: ROOM_THEMES,
  helpers: {
    getRoomTheme,
    createCardStyle,
    createHoverStyle,
    createBackgroundStyle,
    getAnimationDuration,
    createTransition,
  },
};

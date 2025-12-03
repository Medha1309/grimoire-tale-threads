/**
 * Dollhouse Design Tokens
 * Unified visual language for all dollhouse rooms
 */

export const dollhouseTokens = {
  // Color Palette
  colors: {
    // Primary pink theme
    pink: {
      primary: '#ffb6d9',
      light: '#ffd4e8',
      dark: '#ff8fc7',
      glow: 'rgba(255, 182, 217, 0.4)',
      border: 'rgba(255, 182, 217, 0.3)',
      subtle: 'rgba(255, 182, 217, 0.1)',
    },
    // Archive green theme (exception)
    matrix: {
      primary: '#0F0',
      light: '#0F0',
      dark: '#0A0',
      glow: 'rgba(0, 255, 0, 0.4)',
      border: 'rgba(0, 255, 0, 0.3)',
      subtle: 'rgba(0, 255, 0, 0.1)',
    },
    // Neutral tones
    neutral: {
      bg: '#000000',
      surface: '#0a0a0a',
      border: 'rgba(255, 182, 217, 0.2)',
      text: {
        primary: '#e4e4e7',
        secondary: '#a1a1aa',
        tertiary: '#52525b',
      },
    },
  },

  // Typography - All Grimoire (serif) for cohesion
  typography: {
    fonts: {
      title: 'font-serif', // Grimoire for all text
      body: 'font-serif',  // Grimoire for all text
      mono: 'font-mono',   // Only for code-like elements (Archive)
    },
    sizes: {
      title: {
        xl: 'text-5xl',
        lg: 'text-4xl',
        md: 'text-3xl',
        sm: 'text-2xl',
      },
      body: {
        lg: 'text-lg',
        md: 'text-base',
        sm: 'text-sm',
        xs: 'text-xs',
      },
    },
  },

  // Shadows & Depth
  shadows: {
    card: {
      default: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 182, 217, 0.15)',
      hover: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 182, 217, 0.25)',
      book: '-8px 0 16px rgba(0,0,0,0.8), inset -2px 0 4px rgba(0,0,0,0.5)',
    },
    glow: {
      pink: '0 0 20px rgba(255, 182, 217, 0.3)',
      pinkStrong: '0 0 30px rgba(255, 182, 217, 0.5)',
      matrix: '0 0 20px rgba(0, 255, 0, 0.5)',
    },
    text: {
      pink: '0 0 15px rgba(255, 182, 217, 0.3)',
      pinkStrong: '0 0 25px rgba(255, 182, 217, 0.5)',
    },
  },

  // Borders
  borders: {
    default: 'border-pink-900/30',
    hover: 'border-pink-700/50',
    subtle: 'border-zinc-900/40',
    matrix: 'border-[#0F0]/30',
  },

  // Backgrounds
  backgrounds: {
    page: 'bg-black',
    surface: 'bg-zinc-900/30',
    surfaceHover: 'bg-zinc-900/50',
    overlay: 'bg-black/90',
  },

  // Animations
  animations: {
    candleGlow: {
      keyframes: [
        'opacity: [0.15, 0.25, 0.15]',
        'scale: [1, 1.02, 1]',
      ],
      duration: 3,
      ease: 'easeInOut',
    },
    pulse: {
      keyframes: ['opacity: [0.5, 1, 0.5]'],
      duration: 2,
      ease: 'easeInOut',
    },
    float: {
      keyframes: ['y: [0, -20, 0]', 'rotate: [0, 5, -5, 0]'],
      duration: 8,
      ease: 'easeInOut',
    },
  },

  // Effects
  effects: {
    grain: {
      opacity: 0.02,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
    },
    vignette: {
      background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)',
    },
    blur: {
      light: 'blur(10px)',
      medium: 'blur(20px)',
      heavy: 'blur(30px)',
    },
  },

  // Spacing
  spacing: {
    room: {
      padding: 'px-6 py-16',
      maxWidth: 'max-w-7xl',
    },
    card: {
      padding: 'p-6',
      gap: 'gap-6',
    },
  },
} as const;

// Helper functions
export const getDollhouseColor = (theme: 'pink' | 'matrix' = 'pink') => {
  return theme === 'matrix' ? dollhouseTokens.colors.matrix : dollhouseTokens.colors.pink;
};

export const getDollhouseShadow = (theme: 'pink' | 'matrix' = 'pink', intensity: 'default' | 'strong' = 'default') => {
  if (theme === 'matrix') {
    return dollhouseTokens.shadows.glow.matrix;
  }
  return intensity === 'strong' 
    ? dollhouseTokens.shadows.glow.pinkStrong 
    : dollhouseTokens.shadows.glow.pink;
};

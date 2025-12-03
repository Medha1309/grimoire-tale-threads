/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Primary fonts - optimized for performance
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Cormorant Garamond"', '"Crimson Text"', 'Georgia', 'serif'],
        ui: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        decorative: ['"Parisienne"', 'cursive'],
        mono: ['"Fira Code"', '"Courier New"', 'monospace'],
        
        // Legacy aliases (deprecated - use above)
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
        parisienne: ['"Parisienne"', 'cursive'],
      },
      fontSize: {
        // Consistent hierarchy
        'xs': ['0.75rem', { lineHeight: '1.5' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.6' }],     // 14px
        'base': ['1rem', { lineHeight: '1.75' }],      // 16px - optimal for reading
        'lg': ['1.125rem', { lineHeight: '1.75' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.5' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '1.3' }],    // 30px
        '4xl': ['2.25rem', { lineHeight: '1.25' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1.2' }],        // 48px
        '6xl': ['3.75rem', { lineHeight: '1.1' }],     // 60px
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.02em',
        normal: '0',
        relaxed: '0.02em',
        wide: '0.05em',
        wider: '0.1em',
        widest: '0.15em',
      },
      colors: {
        // Gothic Horror Theme (Primary - use by default)
        gothic: {
          blood: '#8B0000',
          'blood-light': '#a31621',
          bone: '#F5F1E8',
          'bone-dim': '#d4d4d8',
          shadow: '#0a0a0a',
          'shadow-light': '#171717',
          fog: '#71717a',
          'fog-light': '#a1a1aa',
          candlelight: '#d4af37',
          'candlelight-dim': '#b89b3e',
          crimson: '#a31621',
          midnight: '#1a1c24',
          parchment: '#e8dcc4',
        },
        
        // Dollhouse Theme (Pink/Romantic)
        dollhouse: {
          primary: '#FFB6D9',
          'primary-dark': '#ff8fc7',
          'primary-light': '#ffd4e8',
          accent: '#FF69B4',
          lavender: '#E5D4ED',
          cream: '#FFF5F7',
          rose: '#FF8FAB',
          shadow: '#C9A0B5',
        },
        
        // Parlour Theme (Gold/Elegant)
        parlour: {
          primary: '#e8c547',
          'primary-dark': '#d4af37',
          'primary-light': '#f9db6f',
          accent: '#a31621',
          gold: '#b89b3e',
          bronze: '#cd7f32',
        },
        
        // Chains Theme (Purple/Modern)
        chains: {
          primary: '#8B5CF6',
          'primary-dark': '#7C3AED',
          'primary-light': '#A78BFA',
          accent: '#6366F1',
          indigo: '#4F46E5',
        },
        
        // Archive Theme (Matrix Green)
        archive: {
          primary: '#00FF00',
          'primary-dark': '#00CC00',
          'primary-light': '#33FF33',
          glow: 'rgba(0, 255, 0, 0.5)',
        },
        
        // Legacy colors (deprecated - use gothic.* instead)
        'velvet-black': '#0b0a0a',
        'candle-gold': '#b89b3e',
        'bone-white': '#f5f5f5',
        'crimson': '#a53e3e',
        'navy-depth': '#1a1c24',
        'charcoal-shadow': '#141414',
        'parchment': '#2a2b31',
        'doll-pink': '#FFB6D9',
        'doll-lavender': '#E5D4ED',
        'doll-cream': '#FFF5F7',
        'doll-rose': '#FF8FAB',
        'doll-shadow': '#C9A0B5',
        'doll-accent': '#FF69B4',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
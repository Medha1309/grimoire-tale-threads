/**
 * Costume Theme Definitions
 * Each costume has its own color palette, fonts, and styling
 */

import { CostumeTheme } from '../contexts/CostumeContext';

export interface CostumeConfig {
  name: string;
  emoji: string;
  description: string;
  colors: {
    bg: string;
    bgSecondary: string;
    text: string;
    textSecondary: string;
    accent: string;
    accentSecondary: string;
    border: string;
    shadow: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  effects: {
    blur: string;
    glow: string;
    grain: boolean;
    scanlines: boolean;
  };
}

export const COSTUME_THEMES: Record<CostumeTheme, CostumeConfig> = {
  'gothic-detective': {
    name: 'Gothic Detective',
    emoji: '🔍',
    description: 'Dark investigation room with blood-red accents and noir atmosphere',
    colors: {
      bg: '#050505',
      bgSecondary: '#1a1a1a',
      text: '#e8e8e8',
      textSecondary: '#999999',
      accent: '#dc143c',
      accentSecondary: '#8b0000',
      border: '#8b0000',
      shadow: 'rgba(139, 0, 0, 0.8)',
    },
    fonts: {
      heading: "'Courier New', monospace",
      body: "'Georgia', serif",
      mono: "'Courier New', monospace",
    },
    effects: {
      blur: '8px',
      glow: '0 0 30px rgba(220, 20, 60, 0.5)',
      grain: true,
      scanlines: false,
    },
  },

  'windows-98': {
    name: 'Windows 98',
    emoji: '💾',
    description: 'Retro desktop nostalgia with pixelated charm and system colors',
    colors: {
      bg: '#008080',
      bgSecondary: '#c0c0c0',
      text: '#000000',
      textSecondary: '#808080',
      accent: '#000080',
      accentSecondary: '#0000ff',
      border: '#808080',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
    fonts: {
      heading: "'MS Sans Serif', 'Tahoma', sans-serif",
      body: "'MS Sans Serif', 'Tahoma', sans-serif",
      mono: "'Courier New', monospace",
    },
    effects: {
      blur: '0px',
      glow: 'none',
      grain: false,
      scanlines: false,
    },
  },

  'neon-cyberpunk': {
    name: 'Neon Cyberpunk',
    emoji: '⚡',
    description: 'Electric glitch aesthetic with neon glow and digital rain',
    colors: {
      bg: '#0a0015',
      bgSecondary: '#1a0b2e',
      text: '#00f5ff',
      textSecondary: '#ff00ff',
      accent: '#ff006e',
      accentSecondary: '#00f5ff',
      border: '#00f5ff',
      shadow: 'rgba(0, 245, 255, 0.7)',
    },
    fonts: {
      heading: "'Orbitron', 'Courier New', monospace",
      body: "'Share Tech Mono', monospace",
      mono: "'Courier New', monospace",
    },
    effects: {
      blur: '2px',
      glow: '0 0 40px rgba(0, 245, 255, 0.8)',
      grain: false,
      scanlines: true,
    },
  },

  'vintage-sepia': {
    name: 'Vintage Sepia',
    emoji: '📜',
    description: 'Aged photograph aesthetic with warm tones and paper texture',
    colors: {
      bg: '#1f1410',
      bgSecondary: '#3d2817',
      text: '#f4e8d0',
      textSecondary: '#c9b896',
      accent: '#cd853f',
      accentSecondary: '#d2691e',
      border: '#8b7355',
      shadow: 'rgba(42, 24, 16, 0.9)',
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Crimson Text', serif",
      mono: "'Courier Prime', monospace",
    },
    effects: {
      blur: '1px',
      glow: '0 0 15px rgba(244, 232, 208, 0.3)',
      grain: true,
      scanlines: false,
    },
  },

  'haunted-mansion': {
    name: 'Haunted Mansion',
    emoji: '🕯️',
    description: 'Victorian gothic with purple mist and candlelit shadows',
    colors: {
      bg: '#0f0515',
      bgSecondary: '#2d1b3d',
      text: '#e8d5b7',
      textSecondary: '#b8a490',
      accent: '#9d4edd',
      accentSecondary: '#c77dff',
      border: '#6a3d9a',
      shadow: 'rgba(157, 78, 221, 0.8)',
    },
    fonts: {
      heading: "'Cinzel', serif",
      body: "'Crimson Pro', serif",
      mono: "'Courier New', monospace",
    },
    effects: {
      blur: '4px',
      glow: '0 0 35px rgba(157, 78, 221, 0.6)',
      grain: true,
      scanlines: false,
    },
  },
};

export const getCostumeConfig = (theme: CostumeTheme): CostumeConfig => {
  return COSTUME_THEMES[theme];
};

/**
 * Effects Configuration
 * Centralized config for atmospheric effects
 */

export interface ChandelierConfig {
  position: 'left' | 'center' | 'right';
  chainLength: number;
  delay: number;
  swingDuration: number;
  candleCount: number;
}

export const CHANDELIER_PRESETS: Record<string, ChandelierConfig[]> = {
  minimal: [
    { position: 'center', chainLength: 40, delay: 0, swingDuration: 8, candleCount: 3 },
  ],
  standard: [
    { position: 'left', chainLength: 28, delay: 0, swingDuration: 8, candleCount: 5 },
    { position: 'center', chainLength: 52, delay: 2, swingDuration: 10, candleCount: 5 },
    { position: 'right', chainLength: 38, delay: 4, swingDuration: 9, candleCount: 5 },
  ],
};

export interface EyeConfig {
  count: number;
  size: number;
  pupilSize: number;
  glowColor: string;
  trackingSpeed: number;
}

export const EYE_PRESETS: Record<string, EyeConfig> = {
  minimal: {
    count: 2,
    size: 24,
    pupilSize: 12,
    glowColor: 'rgb(217, 119, 6)',
    trackingSpeed: 0.3,
  },
  standard: {
    count: 3,
    size: 28,
    pupilSize: 14,
    glowColor: 'rgb(217, 119, 6)',
    trackingSpeed: 0.5,
  },
  high: {
    count: 5,
    size: 32,
    pupilSize: 16,
    glowColor: 'rgb(217, 119, 6)',
    trackingSpeed: 0.7,
  },
};

export interface SparkleConfig {
  count: number;
  size: number;
  duration: [number, number];
  opacity: [number, number];
}

export const SPARKLE_PRESETS: Record<string, SparkleConfig> = {
  minimal: {
    count: 5,
    size: 10,
    duration: [4, 6],
    opacity: [0.5, 0.7],
  },
  standard: {
    count: 10,
    size: 14,
    duration: [4, 6],
    opacity: [0.6, 0.8],
  },
  high: {
    count: 20,
    size: 16,
    duration: [3, 5],
    opacity: [0.7, 0.9],
  },
};

export interface BackgroundConfig {
  trypophobia: boolean;
  decay: boolean;
  shadows: boolean;
  vignette: boolean;
  cracks: boolean;
}

export const BACKGROUND_PRESETS: Record<string, BackgroundConfig> = {
  minimal: {
    trypophobia: false,
    decay: false,
    shadows: true,
    vignette: true,
    cracks: false,
  },
  standard: {
    trypophobia: true,
    decay: true,
    shadows: true,
    vignette: true,
    cracks: true,
  },
  full: {
    trypophobia: true,
    decay: true,
    shadows: true,
    vignette: true,
    cracks: true,
  },
};

/**
 * Creature Configuration
 * Centralized config for all creature types and variants
 */

export interface SpiderVariant {
  name: string;
  bodyFill: string;
  accent: string;
  glowColor?: string;
}

export const SPIDER_VARIANTS: Record<string, SpiderVariant> = {
  default: {
    name: 'House Spider',
    bodyFill: '#3a3a3a',
    accent: '#4a4a4a',
  },
  widow: {
    name: 'Black Widow',
    bodyFill: '#2a1515',
    accent: '#aa0000',
  },
  pink: {
    name: 'Pink Spider',
    bodyFill: '#ff1493',
    accent: '#ff69b4',
    glowColor: 'rgba(255, 20, 147, 0.6)',
  },
  lavender: {
    name: 'Lavender Spider',
    bodyFill: '#c9a0dc',
    accent: '#e5d4ed',
    glowColor: 'rgba(229, 212, 237, 0.6)',
  },
};

export interface CreatureConfig {
  count: number;
  size: number;
  scale: [number, number]; // [min, max]
  speed: [number, number]; // [min, max] duration
  opacity: [number, number]; // [min, max]
}

export const CREATURE_PRESETS: Record<string, CreatureConfig> = {
  minimal: {
    count: 3,
    size: 28,
    scale: [0.4, 0.6],
    speed: [40, 60],
    opacity: [0.6, 0.8],
  },
  low: {
    count: 5,
    size: 32,
    scale: [0.5, 0.7],
    speed: [35, 55],
    opacity: [0.7, 0.9],
  },
  medium: {
    count: 8,
    size: 36,
    scale: [0.6, 0.8],
    speed: [30, 50],
    opacity: [0.8, 1.0],
  },
  high: {
    count: 12,
    size: 40,
    scale: [0.7, 0.9],
    speed: [25, 45],
    opacity: [0.9, 1.0],
  },
};

export const FLY_PRESETS: Record<string, { count: number; size: [number, number]; speed: [number, number] }> = {
  minimal: { count: 4, size: [1.5, 2.5], speed: [8, 14] },
  low: { count: 6, size: [1.5, 3], speed: [6, 12] },
  medium: { count: 10, size: [1.5, 3.5], speed: [6, 10] },
  high: { count: 15, size: [1.5, 4], speed: [5, 9] },
};

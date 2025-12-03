/**
 * Desktop configuration constants
 * Part of Dollhouse Windows 98 Hybrid Redesign
 */

import type { RoomType, Size, Position, WallpaperType } from '../types/windows98Desktop';

export const DESKTOP_CONFIG = {
  // Window constraints
  MAX_WINDOWS: 5,
  MIN_VISIBLE_PIXELS: 20,
  WINDOW_OFFSET: 40,
  
  // Z-index management
  BASE_Z_INDEX: 1000,
  
  // Taskbar
  TASKBAR_HEIGHT: 40,
  
  // Timing
  SCREENSAVER_DEFAULT_TIMEOUT: 5, // minutes
  ENTRANCE_SEQUENCE_DURATION: 6000, // ms (2s + 3s + 1s)
  SKIP_BUTTON_DELAY: 2000, // ms
  
  // Animation durations
  ANIMATION_DURATION: {
    WINDOW_OPEN: 300,
    WINDOW_CLOSE: 200,
    MINIMIZE: 250,
    MAXIMIZE: 200,
  },
  
  // Minimum window size
  WINDOW_MIN_SIZE: {
    width: 400,
    height: 300,
  } as Size,
} as const;

// Default window sizes for each room type
export const DEFAULT_WINDOW_SIZES: Record<RoomType, Size> = {
  diary: { width: 700, height: 600 },
  scrapbook: { width: 800, height: 650 },
  art: { width: 900, height: 700 },
  archive: { width: 750, height: 600 },
  books: { width: 700, height: 600 },
  terminal: { width: 600, height: 400 },
};

// Desktop icon positions (grid layout) - doors as icons
// Positioned on left side with vertical spacing
export const ICON_POSITIONS: Record<RoomType, Position> = {
  diary: { x: 40, y: 60 },
  scrapbook: { x: 40, y: 180 },
  art: { x: 40, y: 300 },
  archive: { x: 40, y: 420 },
  books: { x: 40, y: 540 },
  terminal: { x: 40, y: 660 },
};

// Icon size for mini doors
export const ICON_SIZE = {
  width: 100,
  height: 140,
} as const;

// Room titles for window chrome
export const ROOM_TITLES: Record<RoomType, string> = {
  diary: 'Diary',
  scrapbook: 'Memory Scrapbook',
  art: 'Art Studio',
  archive: 'Reading Archive',
  books: 'Saved Books',
  terminal: 'Terminal',
};

// Wallpaper configuration
export const WALLPAPERS: Array<{
  id: WallpaperType;
  name: string;
  url: string;
  thumbnail: string;
}> = [
  {
    id: 'gothic-roses',
    name: 'Gothic Roses',
    url: '/wallpapers/gothic-roses.jpg',
    thumbnail: '/wallpapers/gothic-roses-thumb.jpg',
  },
  {
    id: 'pink-matrix',
    name: 'Pink Matrix',
    url: '/wallpapers/pink-matrix.jpg',
    thumbnail: '/wallpapers/pink-matrix-thumb.jpg',
  },
  {
    id: 'vintage-lace',
    name: 'Vintage Lace',
    url: '/wallpapers/vintage-lace.jpg',
    thumbnail: '/wallpapers/vintage-lace-thumb.jpg',
  },
];

// LocalStorage keys
export const STORAGE_KEYS = {
  DESKTOP_STATE: 'dollhouse_desktop_state',
  SKIP_INTRO: 'dollhouse_skip_intro',
  WALLPAPER: 'dollhouse_wallpaper',
  SOUND_ENABLED: 'dollhouse_sound_enabled',
  SCREENSAVER_ENABLED: 'dollhouse_screensaver_enabled',
  SCREENSAVER_TIMEOUT: 'dollhouse_screensaver_timeout',
} as const;

// State version for migration
export const STATE_VERSION = 1;

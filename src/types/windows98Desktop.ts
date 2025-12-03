/**
 * Core types for Windows 98 Desktop Environment
 * Part of Dollhouse Windows 98 Hybrid Redesign
 */

export type RoomType = 'diary' | 'scrapbook' | 'art' | 'archive' | 'books' | 'terminal';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  roomType: RoomType;
  title: string;
  position: Position;
  size: Size;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  previousState?: {
    position: Position;
    size: Size;
  };
}

export interface DesktopState {
  openWindows: WindowState[];
  activeWindowId: string | null;
  isScreensaverActive: boolean;
  lastActivityTime: number;
}

export interface PersistedDesktopState {
  version: number;
  openWindows: {
    id: string;
    roomType: RoomType;
    position: Position;
    size: Size;
    isMinimized: boolean;
    isMaximized: boolean;
  }[];
  activeWindowId: string | null;
  wallpaper: string;
  soundEnabled: boolean;
  screensaverEnabled: boolean;
  screensaverTimeout: number;
  lastSaved: number;
}

export type SequencePhase = 'dollhouse-zoom' | 'matrix-rain' | 'desktop-fadein' | 'complete';

export type WallpaperType = 'gothic-roses' | 'pink-matrix' | 'vintage-lace';

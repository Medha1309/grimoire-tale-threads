/**
 * Desktop state persistence utilities
 * Part of Dollhouse Windows 98 Hybrid Redesign
 */

import type { PersistedDesktopState, WindowState } from '../types/windows98Desktop';
import { STORAGE_KEYS, STATE_VERSION } from '../config/desktopConfig';

/**
 * Serialize desktop state for localStorage
 */
export function serializeDesktopState(
  openWindows: WindowState[],
  activeWindowId: string | null,
  wallpaper: string,
  soundEnabled: boolean,
  screensaverEnabled: boolean,
  screensaverTimeout: number
): PersistedDesktopState {
  return {
    version: STATE_VERSION,
    openWindows: openWindows.map(w => ({
      id: w.id,
      roomType: w.roomType,
      position: w.position,
      size: w.size,
      isMinimized: w.isMinimized,
      isMaximized: w.isMaximized,
    })),
    activeWindowId,
    wallpaper,
    soundEnabled,
    screensaverEnabled,
    screensaverTimeout,
    lastSaved: Date.now(),
  };
}

/**
 * Deserialize desktop state from localStorage
 */
export function deserializeDesktopState(data: string): PersistedDesktopState | null {
  try {
    const parsed = JSON.parse(data) as PersistedDesktopState;
    
    // Validate structure
    if (!isValidPersistedState(parsed)) {
      console.warn('Invalid persisted desktop state structure');
      return null;
    }
    
    // Handle version migration if needed
    if (parsed.version !== STATE_VERSION) {
      return migrateState(parsed);
    }
    
    return parsed;
  } catch (error) {
    console.error('Failed to deserialize desktop state:', error);
    return null;
  }
}

/**
 * Validate persisted state structure
 */
function isValidPersistedState(state: any): state is PersistedDesktopState {
  return (
    state &&
    typeof state === 'object' &&
    typeof state.version === 'number' &&
    Array.isArray(state.openWindows) &&
    (state.activeWindowId === null || typeof state.activeWindowId === 'string') &&
    typeof state.wallpaper === 'string' &&
    typeof state.soundEnabled === 'boolean' &&
    typeof state.screensaverEnabled === 'boolean' &&
    typeof state.screensaverTimeout === 'number' &&
    typeof state.lastSaved === 'number'
  );
}

/**
 * Migrate state between versions
 */
function migrateState(state: PersistedDesktopState): PersistedDesktopState | null {
  // Currently only version 1 exists, but this handles future migrations
  console.warn(`Migrating desktop state from version ${state.version} to ${STATE_VERSION}`);
  
  // For now, just update version and return
  return {
    ...state,
    version: STATE_VERSION,
  };
}

/**
 * Save desktop state to localStorage
 */
export function saveDesktopState(state: PersistedDesktopState): boolean {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEYS.DESKTOP_STATE, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save desktop state:', error);
    
    // Handle quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded, attempting minimal save');
      try {
        // Save only essential data (window types, not positions)
        const minimalState: PersistedDesktopState = {
          ...state,
          openWindows: state.openWindows.map(w => ({
            ...w,
            position: { x: 0, y: 0 },
            size: { width: 0, height: 0 },
          })),
        };
        localStorage.setItem(STORAGE_KEYS.DESKTOP_STATE, JSON.stringify(minimalState));
        return true;
      } catch {
        return false;
      }
    }
    
    return false;
  }
}

/**
 * Load desktop state from localStorage
 */
export function loadDesktopState(): PersistedDesktopState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DESKTOP_STATE);
    if (!data) {
      return null;
    }
    
    return deserializeDesktopState(data);
  } catch (error) {
    console.error('Failed to load desktop state:', error);
    return null;
  }
}

/**
 * Clear desktop state from localStorage
 */
export function clearDesktopState(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.DESKTOP_STATE);
  } catch (error) {
    console.error('Failed to clear desktop state:', error);
  }
}

/**
 * Check if intro should be skipped
 */
export function shouldSkipIntro(): boolean {
  try {
    const value = localStorage.getItem(STORAGE_KEYS.SKIP_INTRO);
    return value === 'true';
  } catch {
    return false;
  }
}

/**
 * Save skip intro preference
 */
export function saveSkipIntro(skip: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SKIP_INTRO, skip.toString());
  } catch (error) {
    console.error('Failed to save skip intro preference:', error);
  }
}

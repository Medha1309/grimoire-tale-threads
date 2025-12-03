/**
 * Performance Settings Hook
 * Manages adaptive performance settings based on device capabilities
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  detectDeviceCapabilities, 
  getPerformanceLevel, 
  getOptimalDelays,
  type DeviceCapabilities,
  type PerformanceLevel 
} from '../utils/deviceDetection';
import { CREATURE_PRESETS, FLY_PRESETS } from '../config/creatures';
import { EYE_PRESETS, SPARKLE_PRESETS, BACKGROUND_PRESETS } from '../config/effects';

export interface PerformanceSettings {
  // Device info
  capabilities: DeviceCapabilities;
  performanceLevel: PerformanceLevel;
  
  // Timing
  delays: {
    throttle: number;
    debounce: number;
    raf: number;
  };
  
  // Creature settings
  creatures: {
    spiderCount: number;
    spiderSize: number;
    flyCount: number;
  };
  
  // Effect settings
  effects: {
    eyeCount: number;
    sparkleCount: number;
    chandelierCount: number;
  };
  
  // Feature flags
  features: {
    animations: boolean;
    blur: boolean;
    shadows: boolean;
    particles: boolean;
    complexEffects: boolean;
  };
  
  // Background settings
  background: {
    trypophobia: boolean;
    decay: boolean;
    shadows: boolean;
    vignette: boolean;
    cracks: boolean;
  };
}

/**
 * Hook to get and manage performance settings
 */
export const usePerformanceSettings = (override?: Partial<PerformanceSettings>): PerformanceSettings => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  
  const settings = useMemo<PerformanceSettings>(() => {
    const capabilities = detectDeviceCapabilities();
    const performanceLevel = getPerformanceLevel(capabilities, prefersReducedMotion);
    const delays = getOptimalDelays(capabilities);
    
    // Get presets based on performance level
    const creaturePreset = CREATURE_PRESETS[performanceLevel.creatures];
    const flyPreset = FLY_PRESETS[performanceLevel.creatures];
    const eyePreset = EYE_PRESETS[performanceLevel.effects];
    const sparklePreset = SPARKLE_PRESETS[performanceLevel.effects];
    const backgroundPreset = BACKGROUND_PRESETS[performanceLevel.effects];
    
    return {
      capabilities,
      performanceLevel,
      delays,
      
      creatures: {
        spiderCount: creaturePreset.count,
        spiderSize: creaturePreset.size,
        flyCount: flyPreset.count,
      },
      
      effects: {
        eyeCount: eyePreset.count,
        sparkleCount: sparklePreset.count,
        chandelierCount: performanceLevel.level === 'minimal' ? 1 : 3,
      },
      
      features: {
        animations: performanceLevel.animations,
        blur: performanceLevel.blur,
        shadows: performanceLevel.shadows,
        particles: performanceLevel.particles,
        complexEffects: performanceLevel.level === 'high',
      },
      
      background: backgroundPreset,
      
      ...override,
    };
  }, [prefersReducedMotion, override]);
  
  return settings;
};

/**
 * Hook for throttled mouse tracking
 */
export const useMouseTracking = (throttleMs: number = 50) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let rafId: number;
    let lastUpdate = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < throttleMs) return;
      
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        lastUpdate = now;
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [throttleMs]);
  
  return mousePos;
};

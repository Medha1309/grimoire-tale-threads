/**
 * Performance Configuration
 * Centralized performance settings based on device capabilities
 */

export interface PerformanceConfig {
  // Particle counts
  spiderCount: number;
  flyCount: number;
  dustCount: number;
  eyeCount: number;
  sparkleCount: number;
  
  // Animation settings
  enableComplexAnimations: boolean;
  enableBlur: boolean;
  enableShadows: boolean;
  enableParticles: boolean;
  
  // Throttling
  throttleMs: number;
  debounceMs: number;
  rafThrottle: boolean;
  
  // Quality
  imageQuality: 'low' | 'medium' | 'high';
  animationQuality: 'low' | 'medium' | 'high';
}

/**
 * Detect device capabilities
 */
export const detectDeviceCapabilities = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(
    navigator.userAgent
  );
  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 4;
  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType || '4g';
  
  const isLowEnd = cores < 4 || memory < 4;
  const isMidRange = cores >= 4 && cores < 8 && memory >= 4 && memory < 8;
  const isHighEnd = cores >= 8 && memory >= 8;
  const isSlowConnection = effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g';
  
  return {
    isMobile,
    isTablet,
    isLowEnd,
    isMidRange,
    isHighEnd,
    cores,
    memory,
    isSlowConnection,
    effectiveType,
  };
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get optimal performance configuration
 */
export const getPerformanceConfig = (): PerformanceConfig => {
  const device = detectDeviceCapabilities();
  const reducedMotion = prefersReducedMotion();
  
  // Reduced motion overrides everything
  if (reducedMotion) {
    return {
      spiderCount: 0,
      flyCount: 0,
      dustCount: 0,
      eyeCount: 0,
      sparkleCount: 0,
      enableComplexAnimations: false,
      enableBlur: false,
      enableShadows: false,
      enableParticles: false,
      throttleMs: 100,
      debounceMs: 300,
      rafThrottle: true,
      imageQuality: 'low',
      animationQuality: 'low',
    };
  }
  
  // Low-end devices
  if (device.isLowEnd || device.isSlowConnection) {
    return {
      spiderCount: 2,
      flyCount: 3,
      dustCount: 2,
      eyeCount: 1,
      sparkleCount: 5,
      enableComplexAnimations: false,
      enableBlur: false,
      enableShadows: false,
      enableParticles: true,
      throttleMs: 100,
      debounceMs: 300,
      rafThrottle: true,
      imageQuality: 'low',
      animationQuality: 'low',
    };
  }
  
  // Mobile/Tablet mid-range
  if (device.isMobile || device.isTablet) {
    return {
      spiderCount: 4,
      flyCount: 6,
      dustCount: 4,
      eyeCount: 2,
      sparkleCount: 12,
      enableComplexAnimations: true,
      enableBlur: true,
      enableShadows: false,
      enableParticles: true,
      throttleMs: 50,
      debounceMs: 200,
      rafThrottle: true,
      imageQuality: 'medium',
      animationQuality: 'medium',
    };
  }
  
  // Desktop mid-range
  if (device.isMidRange) {
    return {
      spiderCount: 6,
      flyCount: 8,
      dustCount: 6,
      eyeCount: 3,
      sparkleCount: 18,
      enableComplexAnimations: true,
      enableBlur: true,
      enableShadows: true,
      enableParticles: true,
      throttleMs: 32,
      debounceMs: 150,
      rafThrottle: true,
      imageQuality: 'high',
      animationQuality: 'high',
    };
  }
  
  // High-end desktop
  return {
    spiderCount: 8,
    flyCount: 12,
    dustCount: 8,
    eyeCount: 5,
    sparkleCount: 25,
    enableComplexAnimations: true,
    enableBlur: true,
    enableShadows: true,
    enableParticles: true,
    throttleMs: 16,
    debounceMs: 100,
    rafThrottle: false,
    imageQuality: 'high',
    animationQuality: 'high',
  };
};

/**
 * Cache the performance config
 */
let cachedConfig: PerformanceConfig | null = null;

export const getCachedPerformanceConfig = (): PerformanceConfig => {
  if (!cachedConfig) {
    cachedConfig = getPerformanceConfig();
  }
  return cachedConfig;
};

/**
 * Reset cached config (useful for testing or settings changes)
 */
export const resetPerformanceConfig = () => {
  cachedConfig = null;
};

export default {
  detectDeviceCapabilities,
  prefersReducedMotion,
  getPerformanceConfig,
  getCachedPerformanceConfig,
  resetPerformanceConfig,
};

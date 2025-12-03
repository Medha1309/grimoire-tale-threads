/**
 * Device Detection and Capability Assessment
 * Determines optimal settings based on device capabilities
 */

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isLowEnd: boolean;
  cores: number;
  memory: number;
  gpu: 'high' | 'medium' | 'low';
  connectionSpeed: 'fast' | 'medium' | 'slow';
}

export interface PerformanceLevel {
  level: 'minimal' | 'low' | 'medium' | 'high';
  creatures: 'minimal' | 'low' | 'medium' | 'high';
  effects: 'minimal' | 'standard' | 'high';
  animations: boolean;
  blur: boolean;
  shadows: boolean;
  particles: boolean;
}

/**
 * Detect device capabilities
 */
export const detectDeviceCapabilities = (): DeviceCapabilities => {
  const ua = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);
  
  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 4;
  
  // GPU tier estimation (rough)
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  let gpu: 'high' | 'medium' | 'low' = 'medium';
  
  if (gl) {
    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      if (/nvidia|amd|radeon|geforce/i.test(renderer)) {
        gpu = 'high';
      } else if (/intel|integrated/i.test(renderer)) {
        gpu = 'low';
      }
    }
  }
  
  // Connection speed (rough estimate)
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  let connectionSpeed: 'fast' | 'medium' | 'slow' = 'medium';
  
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === '4g' || effectiveType === '5g') {
      connectionSpeed = 'fast';
    } else if (effectiveType === '3g') {
      connectionSpeed = 'medium';
    } else {
      connectionSpeed = 'slow';
    }
  }
  
  const isLowEnd = cores < 4 || memory < 4 || gpu === 'low';
  
  return {
    isMobile,
    isTablet,
    isLowEnd,
    cores,
    memory,
    gpu,
    connectionSpeed,
  };
};

/**
 * Get optimal performance level based on device
 */
export const getPerformanceLevel = (
  capabilities?: DeviceCapabilities,
  prefersReducedMotion?: boolean
): PerformanceLevel => {
  const caps = capabilities || detectDeviceCapabilities();
  const reducedMotion = prefersReducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Minimal - for reduced motion or very low-end devices
  if (reducedMotion || (caps.isLowEnd && caps.isMobile)) {
    return {
      level: 'minimal',
      creatures: 'minimal',
      effects: 'minimal',
      animations: false,
      blur: false,
      shadows: false,
      particles: false,
    };
  }
  
  // Low - for low-end devices
  if (caps.isLowEnd) {
    return {
      level: 'low',
      creatures: 'low',
      effects: 'minimal',
      animations: true,
      blur: false,
      shadows: false,
      particles: true,
    };
  }
  
  // Medium - for mobile/tablet or medium devices
  if (caps.isMobile || caps.isTablet || caps.cores < 6) {
    return {
      level: 'medium',
      creatures: 'medium',
      effects: 'standard',
      animations: true,
      blur: true,
      shadows: true,
      particles: true,
    };
  }
  
  // High - for desktop with good specs
  return {
    level: 'high',
    creatures: 'high',
    effects: 'standard',
    animations: true,
    blur: true,
    shadows: true,
    particles: true,
  };
};

/**
 * Get throttle/debounce delays based on device
 */
export const getOptimalDelays = (capabilities?: DeviceCapabilities) => {
  const caps = capabilities || detectDeviceCapabilities();
  
  if (caps.isLowEnd) {
    return {
      throttle: 100,
      debounce: 300,
      raf: 32, // ~30fps
    };
  }
  
  if (caps.isMobile) {
    return {
      throttle: 50,
      debounce: 200,
      raf: 16, // ~60fps
    };
  }
  
  return {
    throttle: 16,
    debounce: 150,
    raf: 16, // ~60fps
  };
};

/**
 * Check if device supports specific features
 */
export const supportsFeature = {
  webgl: () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  },
  
  intersectionObserver: () => 'IntersectionObserver' in window,
  
  requestAnimationFrame: () => 'requestAnimationFrame' in window,
  
  cssFilters: () => {
    const el = document.createElement('div');
    el.style.cssText = 'filter: blur(2px)';
    return !!el.style.length;
  },
  
  cssTransforms3d: () => {
    const el = document.createElement('div');
    el.style.cssText = 'transform: translate3d(0, 0, 0)';
    return !!el.style.length;
  },
};

/**
 * Log device info (development only)
 */
export const logDeviceInfo = () => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const caps = detectDeviceCapabilities();
  const perf = getPerformanceLevel(caps);
  
  console.group('🔍 Device Detection');
  console.log('Capabilities:', caps);
  console.log('Performance Level:', perf);
  console.log('Optimal Delays:', getOptimalDelays(caps));
  console.log('Feature Support:', {
    webgl: supportsFeature.webgl(),
    intersectionObserver: supportsFeature.intersectionObserver(),
    cssFilters: supportsFeature.cssFilters(),
    cssTransforms3d: supportsFeature.cssTransforms3d(),
  });
  console.groupEnd();
};

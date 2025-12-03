/**
 * Optimized Image Component
 * Lazy loading, caching, and responsive images
 */

import React, { useState, useEffect, memo } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { imageCache } from '../../utils/cache';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  eager?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImageComponent: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23111" width="400" height="300"/%3E%3C/svg%3E',
  eager = false,
  onLoad,
  onError,
  className = '',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(fallback);
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setHasError] = useState(false);
  const { elementRef: imgRef, isVisible: isInView } = useIntersectionObserver({ rootMargin: '100px', triggerOnce: false });

  useEffect(() => {
    if (!eager && !isInView) return;

    // Check cache first
    const cached = imageCache.get(src);
    if (cached) {
      setImageSrc(src);
      setIsLoaded(true);
      return;
    }

    // Preload image
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      imageCache.set(src, src);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      onError?.();
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, isInView, eager, onLoad, onError]);

  return (
    <img
      ref={imgRef as React.RefObject<HTMLImageElement>}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...props}
    />
  );
});

OptimizedImageComponent.displayName = 'OptimizedImageComponent';

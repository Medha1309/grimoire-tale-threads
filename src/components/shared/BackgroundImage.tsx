/**
 * BackgroundImage Component
 * Displays background images with optional parallax effect
 */

import React from 'react';

interface BackgroundImageProps {
  src: string;
  alt: string;
  parallax?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  src, 
  alt, 
  parallax = false,
  overlay = true,
  overlayOpacity = 0.7
}) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <picture>
        <source srcSet={`${src}.webp`} type="image/webp" />
        <img
          src={`${src}.jpg`}
          alt={alt}
          className={`w-full h-full object-cover ${parallax ? 'parallax-bg' : ''}`}
          loading="eager"
        />
      </picture>
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
};

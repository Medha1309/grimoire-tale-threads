/**
 * BaseBackground - Reusable base background component
 * Provides consistent structure for all themed backgrounds
 */

import React from 'react';
import { ProgressiveEffects } from '../effects/ProgressiveEffects';

interface BaseBackgroundProps {
  children?: React.ReactNode;
  staticLayers?: React.ReactNode;
  animatedLayers?: React.ReactNode;
  className?: string;
  animationDelay?: number;
  animationPriority?: 'high' | 'medium' | 'low';
}

export const BaseBackground: React.FC<BaseBackgroundProps> = React.memo(({
  children,
  staticLayers,
  animatedLayers,
  className = 'bg-zinc-950',
  animationDelay = 100,
  animationPriority = 'medium',
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Static layers render immediately */}
      {staticLayers}
      
      {/* Animated layers load progressively */}
      {animatedLayers && (
        <ProgressiveEffects delay={animationDelay} priority={animationPriority}>
          {animatedLayers}
        </ProgressiveEffects>
      )}
      
      {/* Additional children */}
      {children}
    </div>
  );
});

BaseBackground.displayName = 'BaseBackground';

/**
 * Shadow Background Layer
 * Corner shadows and creeping darkness
 */

import { memo } from 'react';
import { motion } from 'framer-motion';

interface ShadowLayerProps {
  opacity?: number;
  corners?: boolean;
  creeping?: boolean;
  vignette?: boolean;
  className?: string;
}

export const ShadowLayer = memo<ShadowLayerProps>(({ 
  opacity = 1,
  corners = true,
  creeping = true,
  vignette = true,
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      {/* Corner shadows */}
      {corners && (
        <>
          <div className="absolute top-0 left-0 w-96 h-96" 
               style={{ background: 'radial-gradient(circle at 0% 0%, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)' }} />
          <div className="absolute top-0 right-0 w-96 h-96" 
               style={{ background: 'radial-gradient(circle at 100% 0%, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)' }} />
          <div className="absolute bottom-0 left-0 w-96 h-96" 
               style={{ background: 'radial-gradient(circle at 0% 100%, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96" 
               style={{ background: 'radial-gradient(circle at 100% 100%, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)' }} />
        </>
      )}
      
      {/* Creeping shadow animation */}
      {creeping && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {/* Dark vignette */}
      {vignette && (
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      )}
    </div>
  );
});

ShadowLayer.displayName = 'ShadowLayer';

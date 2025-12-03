/**
 * Trypophobia Background Layer
 * Reusable organic hole pattern background with enhanced white highlights
 */

import { memo } from 'react';

interface TrypophobiaLayerProps {
  opacity?: number;
  animated?: boolean;
  enhanced?: boolean; // New prop for enhanced version with white highlights
  className?: string;
}

export const TrypophobiaLayer = memo<TrypophobiaLayerProps>(({ 
  opacity = 0.4, 
  animated = true,
  enhanced = false,
  className = ''
}) => {
  return (
    <>
      {animated && (
        <style>{`
          @keyframes poresShift {
            0% { background-position: 0 0, 0 0, 0 0; }
            100% { background-position: -8px -6px, 5px -10px, -6px 8px; }
          }
        `}</style>
      )}
      
      <div 
        className={`absolute inset-0 ${className}`}
        style={{ opacity }}
      >
        {/* Main hole pattern */}
        <div 
          className="absolute inset-0"
          style={{
            background: enhanced 
              ? `
                radial-gradient(circle at 15px 15px, #000000 9px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.08) 11px, transparent 13px) 0 0/40px 40px,
                radial-gradient(circle at 25px 28px, #000000 7px, rgba(255,255,255,0.12) 8px, rgba(255,255,255,0.06) 9px, transparent 11px) 0 0/52px 52px,
                radial-gradient(circle at 12px 16px, #000000 6px, rgba(255,255,255,0.1) 7px, rgba(255,255,255,0.05) 8px, transparent 10px) 0 0/38px 38px
              `
              : `
                radial-gradient(circle at 15px 15px, #000000 10px, transparent 11px) 0 0/40px 40px,
                radial-gradient(circle at 25px 28px, #000000 8px, transparent 9px) 0 0/52px 52px,
                radial-gradient(circle at 12px 16px, #000000 7px, transparent 8px) 0 0/38px 38px
              `,
            mixBlendMode: enhanced ? 'normal' : 'multiply',
            animation: animated ? 'poresShift 16s ease-in-out infinite alternate' : 'none',
            willChange: animated ? 'background-position' : 'auto',
          }}
        />
        
        {/* Additional glow layer for enhanced version */}
        {enhanced && (
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: `
                radial-gradient(circle at 15px 15px, transparent 8px, rgba(255,255,255,0.05) 10px, transparent 14px) 0 0/40px 40px,
                radial-gradient(circle at 25px 28px, transparent 6px, rgba(255,255,255,0.04) 8px, transparent 12px) 0 0/52px 52px
              `,
              animation: animated ? 'poresShift 16s ease-in-out infinite alternate reverse' : 'none',
              willChange: animated ? 'background-position' : 'auto',
            }}
          />
        )}
      </div>
    </>
  );
});

TrypophobiaLayer.displayName = 'TrypophobiaLayer';

/**
 * Dollhouse Background Component
 * Extracted background effects for better organization
 * Refactored to use reusable components for consistency
 */

import React from 'react';
import { motion } from 'framer-motion';
import { BaseBackground } from '../shared/backgrounds/BaseBackground';
import { FloatingElement } from '../shared/effects/FloatingElement';

// Reusable FloatingToy component using FloatingElement
const FloatingToy: React.FC<{
  emoji: string;
  position: { left?: string; right?: string; top: string };
  opacity: number;
  filter: string;
  animation: {
    y: number[];
    rotate: number[];
    x?: number[];
  };
  duration: number;
  delay: number;
}> = ({ emoji, position, opacity, filter, animation, duration, delay }) => (
  <FloatingElement
    position={position}
    opacity={opacity}
    filter={filter}
    animation={animation}
    duration={duration}
    delay={delay}
    className="text-4xl"
  >
    {emoji}
  </FloatingElement>
);

export const DollhouseBackground: React.FC = () => {
  const staticLayers = (
    <>
      {/* PAINTED DOLLHOUSE BACKDROP */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 bg-center"
          style={{
            backgroundImage: "url('/assets/dollhouse-haunted.png')",
            backgroundPosition: 'center center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 0.20,
            filter: 'saturate(0.6) brightness(0.9) contrast(1.2) blur(0.3px) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.8)) drop-shadow(0 20px 60px rgba(0, 0, 0, 0.6))',
            mixBlendMode: 'lighten',
          }}
        />
      </div>

      {/* Fallback gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black">
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>
    </>
  );

  const animatedLayers = (
    <>
      {/* FLOATING ELEMENTS - SIDES ONLY - More subtle */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
          {/* LEFT SIDE */}
          <div className="absolute left-0 top-0 bottom-0 w-[12%]">
            <FloatingToy
              emoji="🧸"
              position={{ left: '20%', top: '15%' }}
              opacity={0.35}
              filter="hue-rotate(-30deg) saturate(1.2) brightness(1.3) grayscale(0) drop-shadow(0 0 20px rgba(255, 182, 217, 0.8)) drop-shadow(0 0 12px rgba(255, 182, 217, 0.6))"
              animation={{ y: [0, -30, 0], rotate: [0, -15, 15, 0] }}
              duration={8}
              delay={0}
            />
            <FloatingToy
              emoji="🎀"
              position={{ left: '15%', top: '55%' }}
              opacity={0.4}
              filter="hue-rotate(-30deg) saturate(1.3) brightness(1.4) grayscale(0) drop-shadow(0 0 22px rgba(255, 182, 217, 0.9)) drop-shadow(0 0 14px rgba(255, 182, 217, 0.7))"
              animation={{ y: [0, -20, 0], rotate: [0, 20, -20, 0] }}
              duration={7}
              delay={2}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="absolute right-0 top-0 bottom-0 w-[12%]">
            <FloatingToy
              emoji="🎀"
              position={{ right: '20%', top: '38%' }}
              opacity={0.4}
              filter="hue-rotate(-30deg) saturate(1.3) brightness(1.4) grayscale(0) drop-shadow(0 0 22px rgba(255, 182, 217, 0.9)) drop-shadow(0 0 14px rgba(255, 182, 217, 0.7))"
              animation={{ y: [0, -22, 0], rotate: [0, -20, 20, 0], x: [0, -10, 0] }}
              duration={8.5}
              delay={1.5}
            />
            <FloatingToy
              emoji="🧸"
              position={{ right: '30%', top: '58%' }}
              opacity={0.35}
              filter="hue-rotate(-30deg) saturate(1.2) brightness(1.3) grayscale(0) drop-shadow(0 0 20px rgba(255, 182, 217, 0.8)) drop-shadow(0 0 12px rgba(255, 182, 217, 0.6))"
              animation={{ y: [0, -26, 0], rotate: [0, -12, 12, 0] }}
              duration={7.5}
              delay={2.5}
            />
          </div>
        </div>

      {/* Watching Eyes - More visible */}
      <div className="fixed inset-0 z-[2] pointer-events-none">
          {[
            { left: '8%', top: '12%', delay: 0 },
            { right: '10%', top: '18%', delay: 4 },
          ].map((pos, i) => (
            <motion.div
              key={`eyes-${i}`}
              className="absolute"
              style={pos}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0.25, 0] }}
              transition={{ duration: 12 + i * 2, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
            >
              <div className="flex gap-2">
                <div className="relative w-7 h-7">
                  <div className="absolute inset-0 rounded-full bg-white/40 border border-zinc-800/30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#ff1493]/60">
                      <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-white/70" />
                    </div>
                  </div>
                </div>
                <div className="relative w-6 h-6 mt-1">
                  <div className="absolute inset-0 rounded-full bg-white/40 border border-zinc-800/30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ff1493]/60">
                      <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-white/70" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      {/* Shadow Figures - More visible */}
      {[
        { x: '5%', y: '10%' },
        { x: '90%', y: '15%' },
      ].map((corner, i) => (
        <motion.div
          key={`shadow-${i}`}
          className="fixed z-[1] pointer-events-none"
          style={{ left: corner.x, top: corner.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.3, 0.3, 0],
            scale: [0.8, 1, 1, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "easeInOut",
          }}
        >
          <div 
            className="w-32 h-48 bg-gradient-to-b from-black/80 to-transparent blur-2xl" 
            style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} 
          />
        </motion.div>
      ))}
    </>
  );

  return (
    <BaseBackground
      staticLayers={staticLayers}
      animatedLayers={animatedLayers}
      animationDelay={150}
      animationPriority="medium"
      className="bg-black"
    />
  );
};

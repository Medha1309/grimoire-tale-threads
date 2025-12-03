/**
 * EnhancedScrapbookCard Component
 * Displays scrapbook entries with multiple photos, stickers, and effects
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrapbookEntry } from '../../types/scrapbook';
import { getFilterStyle, PhotoFilter } from './PhotoFilterSelector';
import { PolaroidStaticEffect } from './PolaroidStaticEffect';
import { getMoodSymbol, inferMoodFromText } from '../../utils/moodSymbols';
import { VintagePolaroidEffects } from './VintagePolaroidEffects';

interface EnhancedScrapbookCardProps {
  entry: ScrapbookEntry;
  index: number;
  onClick: () => void;
}

export const EnhancedScrapbookCard: React.FC<EnhancedScrapbookCardProps> = ({ 
  entry, 
  index, 
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = (index % 3 - 1) * 3;
  const primaryPhoto = entry.photos?.[0];
  
  // Infer mood if not set
  const mood = entry.mood || inferMoodFromText(entry.thought || '');
  const moodSymbol = getMoodSymbol(mood);
  
  // Extract first line of thought for preview
  const firstLine = (entry.thought || '').split('\n')[0].slice(0, 50);
  const previewText = firstLine.length < (entry.thought || '').length ? `${firstLine}...` : firstLine;
  
  return (
    <motion.article
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        y: -8,
        zIndex: 10,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ 
        rotate: rotation,
        transformStyle: 'preserve-3d',
      }}
      className="group relative cursor-pointer"
    >
      {/* HYPER-REALISTIC VINTAGE POLAROID CARD */}
      <div className="bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200 p-4 pb-16 rounded-sm shadow-2xl
                      border-4 border-zinc-300 relative overflow-hidden">
        
        {/* Vintage polaroid effects - film dust, scratches, light leaks, fingerprints */}
        <VintagePolaroidEffects seed={parseInt(entry.id) || 0} />
        
        {/* Additional aged paper stains */}
        <div className="absolute inset-0 opacity-15 pointer-events-none"
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 30%, rgba(139,69,19,0.4) 0%, transparent 40%),
                 radial-gradient(circle at 80% 70%, rgba(139,69,19,0.3) 0%, transparent 40%),
                 radial-gradient(circle at 50% 50%, rgba(0,0,0,0.15) 0%, transparent 60%)
               `
             }}
        />

        {/* PINK HORROR - Pink stains in corners */}
        <motion.div
          className="absolute -top-1 -left-1 w-8 h-8 rounded-full z-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,20,147,0.5) 0%, rgba(255,20,147,0.25) 50%, transparent 70%)',
            filter: 'blur(2px)',
            boxShadow: '0 0 8px rgba(255,20,147,0.4)',
          }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Photo(s) with layout */}
        <div className={`mb-4 rounded-sm overflow-hidden relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-700
          ${entry.layout === 'single' ? 'aspect-square' : 'aspect-[4/3]'}`}>
          
          {entry.layout === 'single' && primaryPhoto && (
            <>
              <img 
                src={primaryPhoto.image} 
                alt="Memory" 
                className="w-full h-full object-cover"
                style={{
                  ...getFilterStyle((primaryPhoto.filter || 'none') as any),
                  filter: `${getFilterStyle((primaryPhoto.filter || 'none') as any).filter} contrast(0.95) brightness(0.85) saturate(0.9) blur(0.3px)`,
                  opacity: 0.92,
                }}
              />
              {/* Distorted memory fog overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.08) 60%, rgba(0,0,0,0.15) 100%)',
                  mixBlendMode: 'soft-light',
                }}
              />
            </>
          )}

          {entry.layout === 'double' && (
            <div className="grid grid-cols-2 gap-1 h-full">
              {entry.photos?.slice(0, 2).map((photo) => (
                <div key={photo.id} className="relative w-full h-full">
                  <img 
                    src={photo.image} 
                    alt="Memory" 
                    className="w-full h-full object-cover"
                    style={{
                      ...getFilterStyle((photo.filter || 'none') as PhotoFilter),
                      filter: `${getFilterStyle((photo.filter || 'none') as PhotoFilter).filter} contrast(0.95) brightness(0.85) saturate(0.9) blur(0.3px)`,
                      opacity: 0.92,
                    }}
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.08) 60%, rgba(0,0,0,0.15) 100%)',
                      mixBlendMode: 'soft-light',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {entry.layout === 'triple' && (
            <div className="grid grid-cols-3 gap-1 h-full">
              {entry.photos?.slice(0, 3).map((photo) => (
                <div key={photo.id} className="relative w-full h-full">
                  <img 
                    src={photo.image} 
                    alt="Memory" 
                    className="w-full h-full object-cover"
                    style={{
                      ...getFilterStyle((photo.filter || 'none') as PhotoFilter),
                      filter: `${getFilterStyle((photo.filter || 'none') as PhotoFilter).filter} contrast(0.95) brightness(0.85) saturate(0.9) blur(0.3px)`,
                      opacity: 0.92,
                    }}
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.08) 60%, rgba(0,0,0,0.15) 100%)',
                      mixBlendMode: 'soft-light',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {entry.layout === 'quad' && (
            <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
              {entry.photos?.slice(0, 4).map((photo) => (
                <div key={photo.id} className="relative w-full h-full">
                  <img 
                    src={photo.image} 
                    alt="Memory" 
                    className="w-full h-full object-cover"
                    style={{
                      ...getFilterStyle((photo.filter || 'none') as PhotoFilter),
                      filter: `${getFilterStyle((photo.filter || 'none') as PhotoFilter).filter} contrast(0.95) brightness(0.85) saturate(0.9) blur(0.3px)`,
                      opacity: 0.92,
                    }}
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.08) 60%, rgba(0,0,0,0.15) 100%)',
                      mixBlendMode: 'soft-light',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Stickers overlay */}
          {entry.stickers?.map((sticker) => (
            <motion.div
              key={sticker.id}
              className="absolute pointer-events-none"
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
              }}
              animate={{
                rotate: [sticker.rotation || 0, (sticker.rotation || 0) + 5, sticker.rotation || 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-3xl drop-shadow-lg">{sticker.emoji}</span>
            </motion.div>
          ))}

          {/* Static interference effect on hover */}
          <PolaroidStaticEffect isHovered={isHovered} intensity={0.12} />
          
          {/* Creepy vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />
          
          {/* Scratches on photo */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${30 + Math.random() * 50}px`,
                  transform: `rotate(${Math.random() * 180}deg)`,
                }}
              />
            ))}
          </div>

          {entry.isLocked && (
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm 
                            px-3 py-1.5 rounded-full text-xs text-pink-400 border border-pink-600/50"
                 style={{ boxShadow: '0 0 10px rgba(255,20,147,0.4)' }}>
              🔒 Sealed
            </div>
          )}

          {/* Haunted indicator */}
          {entry.isHaunted && (
            <motion.div
              className="absolute top-4 left-4 bg-purple-900/80 backdrop-blur-sm 
                          px-3 py-1.5 rounded-full text-xs text-purple-300 border border-purple-600/50"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(147,51,234,0.4)',
                  '0 0 20px rgba(147,51,234,0.8)',
                  '0 0 10px rgba(147,51,234,0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👻 Haunted
            </motion.div>
          )}

          {/* Date stamp */}
          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm 
                          px-3 py-1 rounded-sm text-xs text-pink-300/80 font-mono border border-pink-900/40"
               style={{ boxShadow: '0 0 6px rgba(255,20,147,0.3)' }}>
            {formatScrapbookDate(entry.date)}
          </div>

          {/* Scratch-off indicator */}
          {entry.scratchOffs && entry.scratchOffs.length > 0 && !entry.scratchOffs[0].isRevealed && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-zinc-800/90 backdrop-blur-sm 
                            px-3 py-1.5 rounded-full text-xs text-zinc-300 border border-zinc-700/50"
                 style={{ boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
              🔍 Hidden Secret
            </div>
          )}
        </div>

        {/* Mood symbol - poetic indicator */}
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            className="text-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ 
              filter: `drop-shadow(0 0 4px ${moodSymbol.color})`,
            }}
          >
            {moodSymbol.icon}
          </motion.span>
          <span className="text-xs text-zinc-600 font-serif italic">
            {moodSymbol.label}
          </span>
        </div>

        {/* Handwritten preview - fades in like drying ink */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.7 : 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <p className="text-zinc-700 font-serif text-sm leading-relaxed italic"
             style={{
               textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.2)',
             }}>
            "{previewText}"
          </p>
        </motion.div>

        {/* Thought with creepy handwriting effect */}
        <div className="relative">
          <p className="text-zinc-800 font-serif text-lg leading-relaxed line-clamp-2
                        group-hover:text-zinc-900 transition-colors"
             style={{
               textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
             }}>
            {entry.thought}
          </p>
          {/* Ink blot */}
          <div className="absolute -bottom-2 right-4 w-3 h-3 rounded-full bg-zinc-800/20 blur-sm" />
        </div>

        {/* PINK HORROR - Disturbing hover effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 backdrop-blur-sm 
                     flex items-center justify-center pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,20,147,0.25) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        >
          <motion.div 
            className="bg-pink-600/90 text-white px-4 py-2 rounded-sm font-serif text-sm border border-pink-500"
            animate={{
              boxShadow: [
                '0 0 10px rgba(255,20,147,0.6)',
                '0 0 20px rgba(255,20,147,0.9)',
                '0 0 10px rgba(255,20,147,0.6)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Open Memory
          </motion.div>
        </motion.div>

        {/* Torn edge effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 opacity-30"
             style={{
               backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 3px, #000 3px, #000 4px)',
             }}
        />
      </div>

      {/* Floating dust motes */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/20 pointer-events-none"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Dynamic shadow that shifts on hover */}
      <motion.div 
        className="absolute inset-0 bg-black/40 blur-xl -z-10"
        animate={{
          opacity: isHovered ? [0.5, 0.7, 0.5] : [0.3, 0.5, 0.3],
          x: isHovered ? 5 : 0,
          y: isHovered ? 8 : 3,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
};

function formatScrapbookDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

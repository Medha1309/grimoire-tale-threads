/**
 * Memory Chest Component
 * Features & what each room does
 * Heavy wooden chest with physical objects inside
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoomObject {
  emoji: string;
  name: string;
  description: string;
  position: { x: number; y: number };
}

const roomObjects: RoomObject[] = [
  {
    emoji: '📚',
    name: 'Library',
    description: 'Write and publish horror stories. Browse curated tales from other writers.',
    position: { x: 20, y: 15 },
  },
  {
    emoji: '🕯️',
    name: 'Tea Room',
    description: 'Forum for discussing stories. Share thoughts and connect with readers.',
    position: { x: 55, y: 20 },
  },
  {
    emoji: '🏚️',
    name: 'Dollhouse',
    description: 'Private diary with encrypted entries. Keep your secrets safe.',
    position: { x: 25, y: 55 },
  },
  {
    emoji: '📖',
    name: 'Scrapbook',
    description: 'Photo memories within the Dollhouse. Preserve visual moments.',
    position: { x: 60, y: 60 },
  },
  {
    emoji: '👤',
    name: 'Profile',
    description: 'Manage your account, bio, and reading history.',
    position: { x: 15, y: 75 },
  },
  {
    emoji: '🎨',
    name: 'Atmospheric Effects',
    description: 'Spiders, watching eyes, chandeliers, and cinematic animations.',
    position: { x: 70, y: 78 },
  },
];

export const MemoryChest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredObject, setHoveredObject] = useState<number | null>(null);
  const [isChestHovered, setIsChestHovered] = useState(false);

  return (
    <div className="absolute right-[35%] bottom-[20%] w-[320px]">
      {/* Wooden chest */}
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={() => setIsChestHovered(true)}
        onHoverEnd={() => setIsChestHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          y: isChestHovered ? -2 : 0,
        }}
      >
        {/* Chest body */}
        <div
          className="relative w-full h-[180px]"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(50, 40, 30, 0.95) 0%,
                rgba(60, 45, 35, 0.95) 50%,
                rgba(45, 35, 25, 0.95) 100%
              )
            `,
            boxShadow: `
              0 12px 30px rgba(0,0,0,0.9),
              inset 0 2px 0 rgba(80, 65, 50, 0.4),
              inset 0 -2px 0 rgba(20, 15, 10, 0.8)
            `,
            borderRadius: '4px 4px 8px 8px',
          }}
        >
          {/* Wood grain */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 3px,
                  rgba(0,0,0,0.1) 3px,
                  rgba(0,0,0,0.1) 6px
                )
              `,
            }}
          />

          {/* Metal bands */}
          {[30, 50, 70].map((top) => (
            <div
              key={top}
              className="absolute left-0 right-0 h-[6px]"
              style={{
                top: `${top}%`,
                background: 'linear-gradient(180deg, rgba(100,90,80,0.9) 0%, rgba(70,60,50,0.9) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(130,120,110,0.5), 0 2px 4px rgba(0,0,0,0.6)',
              }}
            />
          ))}

          {/* Ornate carvings */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 320 180">
            <path
              d="M 160 20 Q 180 40 160 60 Q 140 40 160 20"
              fill="none"
              stroke="rgba(80,70,60,0.6)"
              strokeWidth="2"
            />
            <circle cx="160" cy="90" r="15" fill="none" stroke="rgba(80,70,60,0.6)" strokeWidth="2" />
          </svg>

          {/* Lock */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-16"
            style={{
              background: 'linear-gradient(135deg, rgba(120,110,100,0.9) 0%, rgba(80,70,60,0.9) 100%)',
              borderRadius: '6px 6px 12px 12px',
              boxShadow: 'inset 0 2px 0 rgba(150,140,130,0.4), 0 4px 8px rgba(0,0,0,0.8)',
            }}
          >
            {/* Keyhole */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 rounded-full bg-black/80" />
              <div className="w-1 h-4 bg-black/80 mx-auto" />
            </div>
          </div>

          {/* Hinges */}
          {[10, 90].map((left) => (
            <div
              key={left}
              className="absolute top-0 w-8 h-12"
              style={{
                left: `${left}%`,
                transform: 'translateX(-50%)',
                background: 'linear-gradient(180deg, rgba(100,90,80,0.9) 0%, rgba(70,60,50,0.9) 100%)',
                borderRadius: '4px',
                boxShadow: 'inset 0 1px 0 rgba(130,120,110,0.5), 0 2px 4px rgba(0,0,0,0.6)',
              }}
            >
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/60" />
              <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/60" />
            </div>
          ))}
        </div>

        {/* Lid (opens when clicked) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[40px] origin-top"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(55, 45, 35, 0.95) 0%,
                rgba(65, 50, 40, 0.95) 50%,
                rgba(50, 40, 30, 0.95) 100%
              )
            `,
            boxShadow: `
              0 -4px 12px rgba(0,0,0,0.8),
              inset 0 -2px 0 rgba(80, 65, 50, 0.4)
            `,
            borderRadius: '8px 8px 0 0',
          }}
          animate={{
            rotateX: isOpen ? -120 : 0,
            y: isOpen ? -20 : 0,
          }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {/* Lid texture */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 3px,
                  rgba(0,0,0,0.1) 3px,
                  rgba(0,0,0,0.1) 6px
                )
              `,
            }}
          />
        </motion.div>

        {/* Warm glow leaking from cracks */}
        <AnimatePresence>
          {(isOpen || isChestHovered) && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Glow from top crack */}
              <div
                className="absolute top-[40px] left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,200,150,0.6), transparent)',
                  filter: 'blur(4px)',
                  boxShadow: '0 0 20px rgba(255,200,150,0.4)',
                }}
              />
              {/* Ambient glow */}
              <div
                className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[200px] h-[100px]"
                style={{
                  background: 'radial-gradient(ellipse, rgba(255,200,150,0.2) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shiver effect on hover */}
        {isChestHovered && !isOpen && (
          <motion.div
            className="absolute inset-0"
            animate={{
              x: [-1, 1, -1],
            }}
            transition={{
              duration: 0.1,
              repeat: 3,
            }}
          />
        )}
      </motion.div>

      {/* Objects inside chest (when open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-[60px] left-0 right-0 h-[140px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {roomObjects.map((obj, i) => (
              <motion.div
                key={i}
                className="absolute cursor-pointer"
                style={{
                  left: `${obj.position.x}%`,
                  top: `${obj.position.y}%`,
                }}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: 20 }}
                transition={{ delay: i * 0.1, type: 'spring', damping: 15 }}
                onHoverStart={() => setHoveredObject(i)}
                onHoverEnd={() => setHoveredObject(null)}
              >
                <motion.div
                  className="text-4xl"
                  animate={{
                    scale: hoveredObject === i ? 1.2 : 1,
                    rotate: hoveredObject === i ? [0, -5, 5, 0] : 0,
                  }}
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
                  }}
                >
                  {obj.emoji}
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredObject === i && (
                    <motion.div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 pointer-events-none"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div
                        className="px-3 py-2 rounded text-xs font-serif"
                        style={{
                          background: 'rgba(240, 235, 225, 0.98)',
                          color: 'rgba(40, 40, 50, 0.9)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                        }}
                      >
                        <div className="font-bold mb-1">{obj.name}</div>
                        <div className="text-zinc-700">{obj.description}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

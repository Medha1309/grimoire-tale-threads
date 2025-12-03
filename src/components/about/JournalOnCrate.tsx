/**
 * Journal on Crate Component
 * "What The Dollhouse Diary Is" section
 * Physical leather journal with realistic interactions
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui';

export const JournalOnCrate: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute left-[10%] bottom-[25%] w-[380px]">
      {/* Wooden crate */}
      <div 
        className="relative w-full h-[120px] mb-4"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(60, 50, 40, 0.95) 0%,
              rgba(50, 40, 30, 0.95) 50%,
              rgba(40, 30, 20, 0.95) 100%
            )
          `,
          boxShadow: `
            inset 0 2px 0 rgba(80, 70, 60, 0.5),
            inset 0 -2px 0 rgba(20, 15, 10, 0.8),
            0 10px 30px rgba(0,0,0,0.8)
          `,
          border: '2px solid rgba(40, 30, 20, 0.8)',
        }}
      >
        {/* Wood planks */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-[2px] bg-black/40"
            style={{ top: `${(i + 1) * 25}%` }}
          />
        ))}
        {/* Nails */}
        {[0, 1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            <div
              className="absolute w-2 h-2 rounded-full bg-zinc-700"
              style={{
                left: '10%',
                top: `${20 + i * 20}%`,
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
              }}
            />
            <div
              className="absolute w-2 h-2 rounded-full bg-zinc-700"
              style={{
                right: '10%',
                top: `${20 + i * 20}%`,
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
              }}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Journal */}
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Journal cover */}
        <div
          className="relative w-full h-[280px] rounded-sm"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(45, 30, 20, 0.98) 0%,
                rgba(55, 35, 25, 0.98) 50%,
                rgba(40, 25, 15, 0.98) 100%
              )
            `,
            boxShadow: `
              0 8px 20px rgba(0,0,0,0.9),
              inset 0 1px 0 rgba(80, 60, 50, 0.3),
              inset 0 -1px 0 rgba(0,0,0,0.8)
            `,
            border: '1px solid rgba(30, 20, 10, 0.9)',
          }}
        >
          {/* Leather texture */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  rgba(0,0,0,0.1) 2px,
                  rgba(0,0,0,0.1) 4px
                ),
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 2px,
                  rgba(0,0,0,0.1) 2px,
                  rgba(0,0,0,0.1) 4px
                )
              `,
            }}
          />

          {/* Embossed title */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 
              className="font-serif text-2xl tracking-wider"
              style={{
                color: 'rgba(200, 180, 160, 0.6)',
                textShadow: `
                  1px 1px 0 rgba(0,0,0,0.8),
                  -1px -1px 0 rgba(100, 80, 60, 0.3)
                `,
              }}
            >
              The Dollhouse
            </h3>
            <h3 
              className="font-serif text-2xl tracking-wider mt-1"
              style={{
                color: 'rgba(200, 180, 160, 0.6)',
                textShadow: `
                  1px 1px 0 rgba(0,0,0,0.8),
                  -1px -1px 0 rgba(100, 80, 60, 0.3)
                `,
              }}
            >
              Diary
            </h3>
          </div>

          {/* Worn edges */}
          <div className="absolute inset-0 rounded-sm border border-black/60" />
          <div 
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(100,80,60,0.4), transparent)',
            }}
          />
        </div>

        {/* Fountain pen */}
        <motion.div
          className="absolute -right-8 top-1/2 w-[140px] h-[8px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, rgba(20,20,25,0.95) 0%, rgba(30,30,35,0.95) 70%, rgba(180,160,140,0.9) 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.8), inset 0 1px 0 rgba(60,60,70,0.3)',
            transform: 'rotate(-25deg)',
          }}
          animate={{
            rotate: isHovered ? -30 : -25,
          }}
        >
          {/* Pen nib */}
          <div
            className="absolute right-0 w-[20px] h-full"
            style={{
              background: 'linear-gradient(90deg, rgba(180,160,140,0.9), rgba(200,180,160,0.95))',
              clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
            }}
          />
          {/* Ink stain */}
          <div
            className="absolute -bottom-2 right-4 w-3 h-3 rounded-full bg-black/40 blur-sm"
          />
        </motion.div>

        {/* Ink smoke on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute -top-4 right-1/4 w-16 h-16 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.2, 1.4], y: [-10, -30, -50] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              style={{
                background: 'radial-gradient(circle, rgba(40,40,50,0.4) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Opened journal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, rotateY: -15 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.9, rotateY: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <Card variant="glass" className="p-0 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left page */}
                  <div 
                    className="p-10 border-r border-zinc-800"
                    style={{
                      background: 'linear-gradient(135deg, rgba(240,235,225,0.95) 0%, rgba(230,225,215,0.95) 100%)',
                    }}
                  >
                    <div 
                      className="font-serif text-zinc-800 leading-relaxed space-y-4"
                      style={{
                        textShadow: '0 1px 1px rgba(0,0,0,0.1)',
                      }}
                    >
                      <p className="text-lg first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                        GRIMOIRE is a Halloween-themed horror writing platform where 
                        storytellers craft and share their darkest tales. Think Wattpad 
                        meets atmospheric horror—a space for writers and readers who 
                        crave spine-chilling narratives.
                      </p>
                      <p>
                        Navigate through different rooms: write stories in the Library, 
                        discuss them in the Tea Room forum, or keep private diary 
                        entries in the Boudoir. Every feature is wrapped in an immersive, 
                        cinematic horror aesthetic.
                      </p>
                    </div>
                  </div>

                  {/* Right page */}
                  <div 
                    className="p-10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(230,225,215,0.95) 0%, rgba(220,215,205,0.95) 100%)',
                    }}
                  >
                    <h4 className="font-serif text-2xl text-zinc-800 mb-6 tracking-wide">The Rooms</h4>
                    <ul className="space-y-3 font-serif text-zinc-700">
                      <li className="flex items-start gap-3">
                        <span className="text-xl">📚</span>
                        <span><strong>Library:</strong> Write and publish horror stories for the community to read</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-xl">🕯️</span>
                        <span><strong>Tea Room:</strong> Forum for discussing stories and sharing thoughts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-xl">🏚️</span>
                        <span><strong>Dollhouse:</strong> Private diary with encrypted entries and scrapbook memories</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-xl">👤</span>
                        <span><strong>Profile:</strong> Manage your account, bio, and reading history</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

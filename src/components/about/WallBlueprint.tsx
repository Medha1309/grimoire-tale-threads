/**
 * Wall Blueprint Component
 * Tech stack & architecture displayed as architectural blueprint
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui';

export const WallBlueprint: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Metal tacks */}
      {[
        { top: '18%', right: '8%' },
        { top: '18%', right: '28%' },
        { top: '48%', right: '8%' },
        { top: '48%', right: '28%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            ...pos,
            background: 'radial-gradient(circle, rgba(120,120,130,0.9) 0%, rgba(80,80,90,0.9) 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.8), inset 0 1px 0 rgba(160,160,170,0.4)',
          }}
        />
      ))}

      {/* Blueprint sheet */}
      <motion.div
        className="absolute right-[10%] top-[20%] w-[420px] h-[500px] cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Aged paper */}
        <div
          className="relative w-full h-full"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(220, 215, 200, 0.95) 0%,
                rgba(210, 205, 190, 0.95) 50%,
                rgba(200, 195, 180, 0.95) 100%
              )
            `,
            boxShadow: `
              0 8px 24px rgba(0,0,0,0.7),
              inset 0 0 40px rgba(180,160,140,0.3)
            `,
          }}
        >
          {/* Paper texture */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 1px,
                  rgba(0,0,0,0.05) 1px,
                  rgba(0,0,0,0.05) 2px
                )
              `,
            }}
          />

          {/* Torn edge at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-4"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.1))',
              clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)',
            }}
          />

          {/* Blueprint content */}
          <div className="absolute inset-8">
            {/* Title */}
            <div className="text-center mb-6">
              <h3 
                className="font-serif text-2xl tracking-wider"
                style={{
                  color: 'rgba(40, 40, 50, 0.8)',
                  textShadow: '1px 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                TECHNICAL ARCHITECTURE
              </h3>
              <div className="mt-2 h-[1px] bg-zinc-800/30" />
            </div>

            {/* Dollhouse cutaway diagram */}
            <svg viewBox="0 0 300 320" className="w-full">
              {/* Roof */}
              <path
                d="M 50 80 L 150 20 L 250 80 L 250 100 L 50 100 Z"
                fill="none"
                stroke="rgba(40,40,50,0.6)"
                strokeWidth="1.5"
              />
              <text x="150" y="65" textAnchor="middle" className="text-[10px] font-serif fill-zinc-700">
                Auth • State • Routing
              </text>

              {/* Upper floor */}
              <rect
                x="50"
                y="100"
                width="200"
                height="70"
                fill="none"
                stroke="rgba(40,40,50,0.6)"
                strokeWidth="1.5"
              />
              <line x1="150" y1="100" x2="150" y2="170" stroke="rgba(40,40,50,0.4)" strokeWidth="1" />
              <text x="100" y="125" textAnchor="middle" className="text-[9px] font-serif fill-zinc-700">
                React 18
              </text>
              <text x="100" y="140" textAnchor="middle" className="text-[8px] font-serif fill-zinc-600">
                TypeScript
              </text>
              <text x="200" y="125" textAnchor="middle" className="text-[9px] font-serif fill-zinc-700">
                Framer Motion
              </text>
              <text x="200" y="140" textAnchor="middle" className="text-[8px] font-serif fill-zinc-600">
                Animations
              </text>

              {/* Middle floor */}
              <rect
                x="50"
                y="170"
                width="200"
                height="70"
                fill="none"
                stroke="rgba(40,40,50,0.6)"
                strokeWidth="1.5"
              />
              <line x1="150" y1="170" x2="150" y2="240" stroke="rgba(40,40,50,0.4)" strokeWidth="1" />
              <text x="100" y="195" textAnchor="middle" className="text-[9px] font-serif fill-zinc-700">
                Firebase
              </text>
              <text x="100" y="210" textAnchor="middle" className="text-[8px] font-serif fill-zinc-600">
                Auth + Firestore
              </text>
              <text x="200" y="195" textAnchor="middle" className="text-[9px] font-serif fill-zinc-700">
                Tailwind CSS
              </text>
              <text x="200" y="210" textAnchor="middle" className="text-[8px] font-serif fill-zinc-600">
                Styling
              </text>

              {/* Ground floor */}
              <rect
                x="50"
                y="240"
                width="200"
                height="70"
                fill="none"
                stroke="rgba(40,40,50,0.6)"
                strokeWidth="1.5"
              />
              <line x1="150" y1="240" x2="150" y2="310" stroke="rgba(40,40,50,0.4)" strokeWidth="1" />
              <text x="100" y="265" textAnchor="middle" className="text-[9px] font-serif fill-zinc-700">
                Vite
              </text>
              <text x="100" y="280" textAnchor="middle" className="text-[8px] font-serif fill-zinc-600">
                Build Tool
              </text>
              <text x="200" y="265" textAnchor="middle" className="text-[9px] font-serif fill-zinc-700">
                Three.js
              </text>
              <text x="200" y="280" textAnchor="middle" className="text-[8px] font-serif fill-zinc-600">
                3D Effects
              </text>

              {/* Arrows showing data flow */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="rgba(40,40,50,0.5)" />
                </marker>
              </defs>
              <path
                d="M 150 280 L 150 220"
                stroke="rgba(40,40,50,0.5)"
                strokeWidth="1"
                markerEnd="url(#arrowhead)"
                strokeDasharray="3,3"
              />
              <path
                d="M 150 210 L 150 150"
                stroke="rgba(40,40,50,0.5)"
                strokeWidth="1"
                markerEnd="url(#arrowhead)"
                strokeDasharray="3,3"
              />
            </svg>

            {/* Handwritten notes */}
            <div className="absolute bottom-4 left-0 right-0 space-y-1">
              <p className="text-[10px] font-serif text-zinc-600 italic">
                * Optimized for 60fps animations
              </p>
              <p className="text-[10px] font-serif text-zinc-600 italic">
                * 122KB gzipped bundle
              </p>
            </div>
          </div>

          {/* Smudges and fingerprints */}
          <div
            className="absolute top-[20%] right-[15%] w-12 h-12 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(80,70,60,0.4) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-[30%] left-[10%] w-8 h-8 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(80,70,60,0.4) 0%, transparent 70%)',
            }}
          />
        </div>
      </motion.div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full"
            >
              <Card variant="glass" className="p-10">
                <h3 className="font-serif text-3xl text-zinc-200 mb-6 tracking-wide">
                  How Data Flows Through The System
                </h3>
                
                <div className="space-y-6 text-zinc-400 font-serif leading-relaxed">
                  <div>
                    <h4 className="text-lg text-zinc-300 mb-2">Frontend Layer</h4>
                    <p>
                      Built with React 18 and TypeScript for type safety. Framer Motion handles 
                      all animations at 60fps. Tailwind CSS provides the styling foundation. 
                      Vite powers lightning-fast builds and hot module replacement.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg text-zinc-300 mb-2">Backend & Database</h4>
                    <p>
                      Firebase Authentication manages user accounts with email/password and Google sign-in. 
                      Firestore stores all user data, stories, forum posts, and diary entries. 
                      Security rules ensure users can only access their own private content.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg text-zinc-300 mb-2">Features & Rooms</h4>
                    <p>
                      The Library lets users write and publish horror stories. The Tea Room 
                      is a forum for discussions. The Boudoir holds private diary entries with 
                      client-side encryption. Each room has its own atmospheric design.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg text-zinc-300 mb-2">Performance</h4>
                    <p>
                      Optimized bundle size (~500-560KB), lazy loading for images and components, 
                      device-aware performance settings, and 60fps animations. The app adapts 
                      to device capabilities automatically.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

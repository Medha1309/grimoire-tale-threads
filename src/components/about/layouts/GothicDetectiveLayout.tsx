/**
 * Gothic Detective Layout - Investigation Board Style
 * Red string connecting evidence, polaroids pinned to cork board
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Feature {
  id: string;
  title: string;
  description: string[];
  route?: string;
  emoji: string;
  category: string;
}

interface Props {
  features: Feature[];
}

export const GothicDetectiveLayout: React.FC<Props> = ({ features }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen p-8">
      {/* Cork board texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #8b7355 0px,
            #a0826d 2px,
            #8b7355 4px
          )`,
        }}
      />

      {/* Red investigation strings connecting items */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {features.map((_, i) => {
          if (i === 0) return null;
          const x1 = 20 + ((i - 1) % 4) * 25;
          const y1 = 20 + Math.floor((i - 1) / 4) * 30;
          const x2 = 20 + (i % 4) * 25;
          const y2 = 20 + Math.floor(i / 4) * 30;
          
          return (
            <motion.line
              key={`string-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#ff006e"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
            />
          );
        })}
      </svg>

      {/* Title - Case File Header */}
      <motion.div
        className="relative z-10 mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-block bg-black/80 px-8 py-4 border-2 border-red-600 shadow-2xl">
          <h1 className="text-4xl font-bold text-red-600 tracking-widest font-mono">
            CASE FILE #2847
          </h1>
          <p className="text-zinc-400 mt-2 font-mono text-sm">GRIMOIRE INVESTIGATION</p>
        </div>
      </motion.div>

      {/* Evidence Board - Scattered Polaroids */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {features.map((feature, i) => {
          const rotation = (Math.random() - 0.5) * 8;
          const xOffset = (Math.random() - 0.5) * 20;
          
          return (
            <motion.div
              key={feature.id}
              className="absolute cursor-pointer"
              style={{
                left: `${10 + (i % 4) * 22 + xOffset}%`,
                top: `${15 + Math.floor(i / 4) * 280}px`,
                rotate: `${rotation}deg`,
                width: '280px',
              }}
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: rotation }}
              transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
              onClick={() => feature.route && navigate(feature.route)}
            >
              {/* Push pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full shadow-lg z-10 border-2 border-red-800" />
              
              {/* Polaroid */}
              <div className="bg-white p-3 pb-12 shadow-2xl">
                <div className="bg-zinc-900 h-40 flex items-center justify-center border-2 border-red-600">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{feature.emoji}</div>
                    <div className="text-red-600 font-bold text-sm">{feature.category.toUpperCase()}</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="font-bold text-black text-sm mb-1">{feature.title}</div>
                  {feature.description.map((line, idx) => (
                    <div key={idx} className="text-xs text-gray-700">{line}</div>
                  ))}
                </div>
              </div>

              {/* Evidence tag */}
              <div className="absolute -bottom-2 -right-2 bg-yellow-100 px-2 py-1 text-xs font-mono border border-yellow-600 shadow-md rotate-3">
                EVIDENCE #{i + 1}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer stamp */}
      <motion.div
        className="fixed bottom-8 right-8 z-10"
        initial={{ opacity: 0, rotate: -45, scale: 0 }}
        animate={{ opacity: 0.8, rotate: -12, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="border-4 border-red-600 rounded-full px-6 py-4 text-center bg-black/50">
          <div className="text-red-600 font-bold text-xl font-mono">CLASSIFIED</div>
          <div className="text-red-600 text-xs font-mono">KIROWEEN 2025</div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Haunted Mansion Layout - Victorian Dollhouse Rooms
 * Each feature is a room in a haunted mansion
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

export const HauntedMansionLayout: React.FC<Props> = ({ features }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#1a0b2e] p-8">
      {/* Candlelight flicker effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          opacity: [0.3, 0.4, 0.35, 0.4, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(157, 78, 221, 0.2) 0%, transparent 60%)',
        }}
      />

      {/* Mansion Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 
          className="text-6xl mb-4 text-[#e8d5b7]"
          style={{
            fontFamily: "'Cinzel', serif",
            textShadow: '0 0 30px rgba(157, 78, 221, 0.6)',
          }}
        >
          GRIMOIRE MANOR
        </h1>
        <p className="text-[#b8a490] text-sm tracking-widest">EST. MMXXV</p>
        <div className="mt-4 text-[#9d4edd] text-xs">
          ⚜ Enter if you dare ⚜
        </div>
      </motion.div>

      {/* Mansion Floor Plan */}
      <div className="max-w-6xl mx-auto">
        {/* Upper Floor */}
        <div className="mb-8">
          <div className="text-center text-[#9d4edd] text-sm mb-4 tracking-widest">
            ═══ UPPER CHAMBERS ═══
          </div>
          <div className="grid grid-cols-4 gap-4">
            {features.slice(0, 4).map((feature, i) => (
              <motion.div
                key={feature.id}
                className="relative cursor-pointer group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                onClick={() => feature.route && navigate(feature.route)}
              >
                {/* Door frame */}
                <div className="relative bg-[#2d1b3d] border-4 border-[#4a2c5e] p-4 h-48 overflow-hidden group-hover:border-[#9d4edd] transition-all">
                  {/* Door number plate */}
                  <div className="absolute top-2 left-2 bg-[#9d4edd] text-white text-xs px-2 py-1 font-bold">
                    {i + 1}
                  </div>

                  {/* Room interior glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#9d4edd]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  {/* Room content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-3">{feature.emoji}</div>
                    <div className="text-[#e8d5b7] font-bold text-sm mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                      {feature.title}
                    </div>
                    <div className="text-[#b8a490] text-xs">
                      {feature.description[0]}
                    </div>
                  </div>

                  {/* Cobwebs */}
                  <div className="absolute top-0 right-0 text-[#4a2c5e] text-2xl opacity-50">
                    🕸️
                  </div>
                </div>

                {/* Door handle */}
                <div className="absolute right-4 top-1/2 w-2 h-8 bg-[#9d4edd] rounded-full shadow-lg" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grand Staircase */}
        <motion.div
          className="relative h-16 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#9d4edd] to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[#9d4edd] text-2xl">⬇</div>
          </div>
        </motion.div>

        {/* Lower Floor */}
        <div>
          <div className="text-center text-[#9d4edd] text-sm mb-4 tracking-widest">
            ═══ LOWER HALLS ═══
          </div>
          <div className="grid grid-cols-4 gap-4">
            {features.slice(4).map((feature, i) => (
              <motion.div
                key={feature.id}
                className="relative cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                onClick={() => feature.route && navigate(feature.route)}
              >
                <div className="relative bg-[#2d1b3d] border-4 border-[#4a2c5e] p-4 h-48 overflow-hidden group-hover:border-[#9d4edd] transition-all">
                  <div className="absolute top-2 left-2 bg-[#9d4edd] text-white text-xs px-2 py-1 font-bold">
                    {i + 5}
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#9d4edd]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />

                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-3">{feature.emoji}</div>
                    <div className="text-[#e8d5b7] font-bold text-sm mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                      {feature.title}
                    </div>
                    <div className="text-[#b8a490] text-xs">
                      {feature.description[0]}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 text-[#4a2c5e] text-2xl opacity-50">
                    🕸️
                  </div>
                </div>

                <div className="absolute right-4 top-1/2 w-2 h-8 bg-[#9d4edd] rounded-full shadow-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating candles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed text-4xl pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🕯️
        </motion.div>
      ))}

      {/* Manor plaque */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#2d1b3d] border-2 border-[#9d4edd] px-6 py-3 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        style={{ boxShadow: '0 0 30px rgba(157, 78, 221, 0.4)' }}
      >
        <div className="text-[#e8d5b7] text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
          Built for Kiroween MMXXV
        </div>
      </motion.div>
    </div>
  );
};

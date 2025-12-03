/**
 * Neon Cyberpunk Layout - Matrix/Terminal Style
 * Glitchy terminal interface with neon accents
 */

import React, { useState, useEffect } from 'react';
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

export const NeonCyberpunkLayout: React.FC<Props> = ({ features }) => {
  const navigate = useNavigate();
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0d0221] p-8 font-mono">
      {/* Scanlines */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00f5ff 2px, #00f5ff 4px)',
        }}
      />

      {/* Grid background */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#ff00ff 1px, transparent 1px),
            linear-gradient(90deg, #ff00ff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Terminal Header */}
      <motion.div
        className="mb-8 border-2 border-cyan-400 bg-black/80 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-cyan-400 text-sm">root@grimoire:~$</div>
        </div>
        
        <motion.div
          className="text-cyan-400"
          animate={glitchActive ? {
            x: [0, -2, 2, -2, 0],
            textShadow: [
              '0 0 10px #00f5ff',
              '2px 0 10px #ff00ff, -2px 0 10px #00f5ff',
              '0 0 10px #00f5ff',
            ],
          } : {}}
          transition={{ duration: 0.1 }}
        >
          <div className="text-2xl font-bold mb-1">{'>'} GRIMOIRE_SYSTEM.EXE</div>
          <div className="text-sm text-pink-500">{'>'} STATUS: ONLINE | KIROWEEN_2025</div>
        </motion.div>
      </motion.div>

      {/* Terminal Content - List View */}
      <div className="max-w-6xl mx-auto">
        <div className="border-2 border-pink-500 bg-black/80 p-6" style={{ boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)' }}>
          <div className="text-cyan-400 mb-4 text-sm">
            {'>'} ls -la /grimoire/features
          </div>

          <div className="space-y-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.id}
                className={`p-3 border cursor-pointer transition-all ${
                  selectedIndex === i
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-pink-500/30 hover:border-pink-500'
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                onClick={() => {
                  setSelectedIndex(i);
                  if (feature.route) {
                    setTimeout(() => navigate(feature.route!), 300);
                  }
                }}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-pink-500 text-xl">{feature.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-bold">{feature.title}</span>
                      <span className="text-pink-500 text-xs px-2 py-1 border border-pink-500">
                        {feature.category}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {feature.description.join(' • ')}
                    </div>
                  </div>
                  <div className="text-cyan-400 text-2xl">{'>'}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Command prompt */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-cyan-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span>{'>'}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Floating data streams */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400 text-xs opacity-20 font-mono"
            style={{
              left: `${20 + i * 20}%`,
              top: '-10%',
            }}
            animate={{
              y: ['0vh', '110vh'],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          >
            {Array.from({ length: 20 }, () => 
              Math.random() > 0.5 ? '1' : '0'
            ).join('')}
          </motion.div>
        ))}
      </div>

      {/* System info footer */}
      <motion.div
        className="fixed bottom-4 left-4 right-4 border border-cyan-400 bg-black/80 p-3 text-xs text-cyan-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex justify-between">
          <span>SYSTEM: GRIMOIRE v2.0.25</span>
          <span>MODULES: {features.length} LOADED</span>
          <span>STATUS: OPERATIONAL</span>
        </div>
      </motion.div>
    </div>
  );
};

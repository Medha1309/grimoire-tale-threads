/**
 * Vintage Sepia Layout - Scrapbook/Photo Album Style
 * Old photograph aesthetic with handwritten notes
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

export const VintageSepiaLayout: React.FC<Props> = ({ features }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#2a1810] p-8">
      {/* Paper texture */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scrapbook Page */}
      <motion.div
        className="max-w-5xl mx-auto bg-[#f4e8d0] p-12 shadow-2xl relative"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 30px,
            rgba(139, 69, 19, 0.1) 30px,
            rgba(139, 69, 19, 0.1) 31px
          )`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Coffee stain */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[#8b4513] opacity-10 blur-md" />

        {/* Title - Handwritten style */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 
            className="text-5xl mb-2 text-[#8b4513]"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Grimoire
          </h1>
          <p className="text-[#8b4513] italic text-sm">A Collection of Dark Tales</p>
          <div className="mt-2 text-xs text-[#8b4513]/60">Est. 2025</div>
        </motion.div>

        {/* Photo Grid - Vintage Photos */}
        <div className="grid grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const rotation = (Math.random() - 0.5) * 4;
            
            return (
              <motion.div
                key={feature.id}
                className="relative cursor-pointer"
                style={{ rotate: `${rotation}deg` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                onClick={() => feature.route && navigate(feature.route)}
              >
                {/* Photo corners */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#8b4513]" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#8b4513]" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#8b4513]" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#8b4513]" />

                {/* Photo */}
                <div className="bg-[#3d2817] p-3 border border-[#8b4513] shadow-lg">
                  <div className="bg-[#2a1810] h-32 flex items-center justify-center border border-[#8b4513]/30">
                    <div className="text-4xl opacity-70">{feature.emoji}</div>
                  </div>
                </div>

                {/* Handwritten caption */}
                <div 
                  className="mt-2 text-center text-[#8b4513] text-sm"
                  style={{ fontFamily: "'Brush Script MT', cursive" }}
                >
                  {feature.title}
                </div>

                {/* Category tag */}
                <div className="absolute -bottom-3 -right-3 bg-[#d2691e] px-2 py-1 text-xs text-white rotate-6 shadow-md">
                  {feature.category}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Handwritten note at bottom */}
        <motion.div
          className="mt-12 p-4 border-l-4 border-[#8b4513] bg-[#f4e8d0]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p 
            className="text-[#8b4513] italic"
            style={{ fontFamily: "'Brush Script MT', cursive", fontSize: '18px' }}
          >
            "A platform where horror stories come alive, built with modern technology 
            yet preserving the timeless art of storytelling..."
          </p>
          <div className="text-right mt-2 text-sm text-[#8b4513]/60">
            - Kiroween 2025
          </div>
        </motion.div>

        {/* Wax seal */}
        <motion.div
          className="absolute bottom-8 right-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 2.5, type: 'spring' }}
        >
          <div className="w-16 h-16 rounded-full bg-[#8b0000] flex items-center justify-center text-white text-2xl shadow-lg">
            G
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/**
 * Comprehensive Polaroid Wall - Complete Feature Showcase
 * Shows all features, tech stack, testing, and development info
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCostume } from '../../contexts/CostumeContext';
import { getCostumeConfig } from '../../design-system/costume-themes';

interface Polaroid {
  id: string;
  title: string;
  description: string[];
  route?: string;
  emoji: string;
  category: 'feature' | 'tech' | 'testing' | 'kiro';
}

const POLAROIDS: Polaroid[] = [
  {
    id: 'library',
    title: 'The Library',
    description: ['Browse horror stories', 'Torch-lit interface', 'Genre atmospheres', 'Bookmark system'],
    route: '/stories',
    emoji: 'LIB',
    category: 'feature',
  },
  {
    id: 'dollhouse',
    title: 'The Dollhouse',
    description: ['Private diary', 'Room navigation', 'Mood tracking', 'Encryption'],
    route: '/dollhouse',
    emoji: 'DH',
    category: 'feature',
  },
  {
    id: 'tearoom',
    title: 'Tea Room',
    description: ['Gothic forum', 'Candle likes', 'Thread discussions', 'Real-time'],
    route: '/forum',
    emoji: 'TEA',
    category: 'feature',
  },
  {
    id: 'chains',
    title: 'Chains',
    description: ['Collaborative writing', 'Live sessions', 'Proposal voting', 'GitHub-style'],
    route: '/chains',
    emoji: 'CHN',
    category: 'feature',
  },
  {
    id: 'artstudio',
    title: 'Art Studio',
    description: ['Drawing canvas', 'Haunted effects', 'Layer system', 'Gallery'],
    route: '/dollhouse',
    emoji: 'ART',
    category: 'feature',
  },
  {
    id: 'scrapbook',
    title: 'Scrapbook',
    description: ['Memory collection', 'Polaroid effects', 'Stickers & filters', 'Scratch-off secrets'],
    route: '/dollhouse',
    emoji: 'SCR',
    category: 'feature',
  },
  {
    id: 'myspace',
    title: 'MySpace Profiles',
    description: ['Retro profiles', 'Top 8 friends', 'Customization', 'Nostalgia'],
    route: '/retro',
    emoji: 'MSP',
    category: 'feature',
  },
  {
    id: 'desktop',
    title: 'Windows 98',
    description: ['Desktop interface', 'Draggable windows', 'Start menu', 'Taskbar'],
    route: '/desktop',
    emoji: 'W98',
    category: 'feature',
  },
  {
    id: 'react',
    title: 'React 18',
    description: ['200+ components', '60+ custom hooks', 'Context providers', 'Error boundaries'],
    emoji: 'RCT',
    category: 'tech',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: ['Strict mode', '15+ type files', 'Path aliases', '100% type coverage'],
    emoji: 'TS',
    category: 'tech',
  },
  {
    id: 'firebase',
    title: 'Firebase',
    description: ['Auth system', 'Firestore DB', 'Storage', '18 collections'],
    emoji: 'FB',
    category: 'tech',
  },
  {
    id: 'animations',
    title: 'Animations',
    description: ['Framer Motion', 'Three.js', 'Canvas API', 'GPU-accelerated'],
    emoji: 'FX',
    category: 'tech',
  },
  {
    id: 'testing',
    title: 'Testing',
    description: ['Vitest', 'React Testing Lib', '30+ test files', '90% pass rate'],
    emoji: 'TST',
    category: 'testing',
  },
  {
    id: 'integration',
    title: 'Integration Tests',
    description: ['Auth flows', 'CRUD operations', 'Navigation', 'User journeys'],
    emoji: 'INT',
    category: 'testing',
  },
  {
    id: 'performance',
    title: 'Performance',
    description: ['Code splitting', 'Lazy loading', 'Device detection', 'Optimized builds'],
    emoji: 'PRF',
    category: 'testing',
  },
  {
    id: 'kiro',
    title: 'Built with Kiro',
    description: ['AI pair programming', 'Spec-driven dev', '6 major specs', '400+ docs'],
    emoji: 'AI',
    category: 'kiro',
  },
];

export const ComprehensivePolaroidWall: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { costume } = useCostume();
  const config = getCostumeConfig(costume);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'feature': return config.colors.accent;
      case 'tech': return config.colors.accentSecondary;
      case 'testing': return '#10b981';
      case 'kiro': return '#9333ea';
      default: return config.colors.accent;
    }
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
      {POLAROIDS.map((polaroid, index) => {
        const categoryColor = getCategoryColor(polaroid.category);
        
        return (
          <motion.div
            key={polaroid.id}
            className="relative cursor-pointer"
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            onHoverStart={() => setHoveredId(polaroid.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => polaroid.route && navigate(polaroid.route)}
          >
            {/* Polaroid Frame */}
            <div
              className="backdrop-blur-lg p-2 pb-8 shadow-2xl transition-all duration-300"
              style={{
                boxShadow: `0 4px 20px ${config.colors.shadow}`,
                border: hoveredId === polaroid.id ? `2px solid ${categoryColor}` : '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: hoveredId === polaroid.id ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Photo Area */}
              <div
                className="w-full h-24 flex flex-col items-center justify-center p-2 backdrop-blur-sm"
                style={{
                  background: `${config.colors.bgSecondary}15`,
                  border: `1px solid ${categoryColor}50`,
                }}
              >
                <div 
                  className="text-xl font-bold mb-1"
                  style={{ color: categoryColor }}
                >
                  {polaroid.emoji}
                </div>
                <div
                  className="text-[0.6rem] font-bold text-center leading-tight"
                  style={{ color: categoryColor }}
                >
                  {polaroid.title.toUpperCase()}
                </div>
              </div>

              {/* Caption */}
              <div className="mt-2 text-center">
                {polaroid.description.slice(0, 2).map((line, i) => (
                  <div
                    key={i}
                    className="text-[0.55rem] leading-tight"
                    style={{
                      color: config.colors.text,
                      fontFamily: config.fonts.mono,
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Category Badge */}
            <div
              className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[0.6rem] font-bold"
              style={{
                background: categoryColor,
                color: 'white',
                boxShadow: `0 0 8px ${categoryColor}`,
              }}
            >
              {polaroid.category}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

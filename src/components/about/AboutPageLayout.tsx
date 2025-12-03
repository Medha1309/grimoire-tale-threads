/**
 * About Page Layout - Professional Portfolio Style
 * Mature, sophisticated presentation that adapts to theme
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCostume } from '../../contexts/CostumeContext';
import { getCostumeConfig } from '../../design-system/costume-themes';

interface Feature {
  id: string;
  title: string;
  description: string;
  route?: string;
  category: string;
  tech?: string[];
}

const FEATURES: Feature[] = [
  {
    id: 'library',
    title: 'The Library',
    description: 'Full-featured reading platform with genre-based atmospheres, bookmarking system, and torch-lit navigation',
    route: '/stories',
    category: 'Core Feature',
    tech: ['React', 'Firebase', 'Framer Motion'],
  },
  {
    id: 'dollhouse',
    title: 'The Dollhouse',
    description: 'Private journaling system with room-based navigation, mood tracking, and end-to-end encryption',
    route: '/dollhouse',
    category: 'Core Feature',
    tech: ['Encryption', 'Local Storage', 'Canvas API'],
  },
  {
    id: 'tearoom',
    title: 'Tea Room',
    description: 'Gothic-themed discussion forum with real-time updates, candle-based reactions, and thread management',
    route: '/forum',
    category: 'Social',
    tech: ['Firestore', 'Real-time DB', 'Moderation'],
  },
  {
    id: 'chains',
    title: 'Tale Threads',
    description: 'Collaborative storytelling with live sessions, proposal voting, and GitHub-style version control',
    route: '/chains',
    category: 'Collaboration',
    tech: ['WebSockets', 'Diff Engine', 'Voting System'],
  },
  {
    id: 'artstudio',
    title: 'Art Studio',
    description: 'Digital canvas with custom brushes, layer system, and haunted visual effects',
    route: '/dollhouse',
    category: 'Creative Tools',
    tech: ['Canvas API', 'WebGL', 'Image Processing'],
  },
  {
    id: 'scrapbook',
    title: 'Memory Scrapbook',
    description: 'Visual collection system with polaroid effects, filters, and scratch-off secrets',
    route: '/dollhouse',
    category: 'Creative Tools',
    tech: ['Image Upload', 'Filters', 'Animations'],
  },
  {
    id: 'myspace',
    title: 'Social Profiles',
    description: 'MySpace-inspired user profiles with Top 8 friends, customization, and retro aesthetics',
    route: '/retro',
    category: 'Social',
    tech: ['Profile System', 'Following', 'Customization'],
  },
  {
    id: 'desktop',
    title: 'Windows 98 Desktop',
    description: 'Fully functional retro desktop interface with draggable windows, start menu, and taskbar',
    route: '/desktop',
    category: 'Retro Experience',
    tech: ['Drag & Drop', 'Window Management', 'Retro UI'],
  },
];

interface AboutPageLayoutProps {
  layoutStyle: string;
}

export const AboutPageLayout: React.FC<AboutPageLayoutProps> = ({ layoutStyle }) => {
  const navigate = useNavigate();
  const { costume } = useCostume();
  const config = getCostumeConfig(costume);

  // DIFFERENT GRID LAYOUTS based on theme
  const getGridLayout = () => {
    switch (layoutStyle) {
      case 'gothic-detective':
        return 'grid-cols-1'; // Single column, dossier style
      case 'windows-98':
        return 'grid-cols-1 md:grid-cols-2'; // Two columns, window panes
      case 'neon-cyberpunk':
        return 'grid-cols-1'; // Single column, terminal list
      case 'vintage-sepia':
        return 'grid-cols-1 md:grid-cols-3'; // Three columns, newspaper
      case 'haunted-mansion':
        return 'grid-cols-2 md:grid-cols-4'; // Four columns, gallery grid
      default:
        return 'grid-cols-1 md:grid-cols-2';
    }
  };

  // DIFFERENT FEATURE CARD STYLES
  const getFeatureCardStyle = (_i: number) => {
    switch (layoutStyle) {
      case 'gothic-detective':
        // Stacked list with numbers
        return {
          layout: 'flex gap-4 items-start',
          showNumber: true,
        };
      case 'windows-98':
        // Boxed cards with borders
        return {
          layout: 'block',
          showNumber: false,
        };
      case 'neon-cyberpunk':
        // Terminal lines with prefixes
        return {
          layout: 'flex gap-3 items-center',
          showNumber: false,
          prefix: '>',
        };
      case 'vintage-sepia':
        // Compact cards, newspaper columns
        return {
          layout: 'block',
          showNumber: false,
          compact: true,
        };
      case 'haunted-mansion':
        // Square cards, gallery style
        return {
          layout: 'block text-center',
          showNumber: false,
          square: true,
        };
      default:
        return { layout: 'block', showNumber: false };
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: config.colors.bg,
        color: config.colors.text,
        fontFamily: config.fonts.body,
      }}
    >
      {/* Hero Section */}
      <motion.section
        className="relative px-6 py-20 border-b"
        style={{ borderColor: config.colors.border }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-6xl font-bold mb-6 tracking-tight"
            style={{ 
              fontFamily: config.fonts.heading,
              color: config.colors.text,
              textShadow: config.effects.glow,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            GRIMOIRE
          </motion.h1>
          
          <motion.p
            className="text-xl"
            style={{ color: config.colors.textSecondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            A Gothic Horror Storytelling Platform
          </motion.p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            style={{ 
              fontFamily: config.fonts.heading,
              color: config.colors.text,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Platform Features
          </motion.h2>

          <div className={`grid ${getGridLayout()} gap-6`}>
            {FEATURES.map((feature, i) => {
              const cardStyle = getFeatureCardStyle(i);
              
              return (
                <motion.article
                  key={feature.id}
                  className={`p-6 border-2 cursor-pointer transition-all ${cardStyle.layout}`}
                  style={{
                    background: config.colors.bgSecondary,
                    borderColor: config.colors.border,
                    aspectRatio: cardStyle.square ? '1' : 'auto',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  onClick={() => feature.route && navigate(feature.route)}
                  whileHover={{
                    borderColor: config.colors.accent,
                    x: layoutStyle === 'neon-cyberpunk' ? 10 : 0,
                  }}
                >
                  {cardStyle.showNumber && (
                    <div
                      className="text-4xl font-bold opacity-20"
                      style={{ 
                        fontFamily: config.fonts.mono,
                        color: config.colors.accent,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  )}

                  {cardStyle.prefix && (
                    <div
                      className="text-2xl font-bold"
                      style={{ color: config.colors.accent }}
                    >
                      {cardStyle.prefix}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className={`flex items-start justify-between ${cardStyle.compact ? 'mb-2' : 'mb-3'}`}>
                      <h3
                        className={`${cardStyle.compact ? 'text-lg' : 'text-xl'} font-bold`}
                        style={{ 
                          fontFamily: config.fonts.heading,
                          color: config.colors.text,
                        }}
                      >
                        {feature.title}
                      </h3>
                      {!cardStyle.compact && (
                        <span
                          className="text-xs px-2 py-1 border whitespace-nowrap ml-2"
                          style={{
                            color: config.colors.accent,
                            borderColor: config.colors.accent,
                          }}
                        >
                          {feature.category}
                        </span>
                      )}
                    </div>

                    <p
                      className={`${cardStyle.compact ? 'text-xs' : 'text-sm'} ${cardStyle.compact ? 'mb-2' : 'mb-4'} leading-relaxed`}
                      style={{ color: config.colors.textSecondary }}
                    >
                      {feature.description}
                    </p>

                    {feature.tech && !cardStyle.compact && (
                      <div className="flex flex-wrap gap-2">
                        {feature.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1"
                            style={{
                              background: config.colors.bg,
                              color: config.colors.textSecondary,
                              fontFamily: config.fonts.mono,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section
        className="px-6 py-16 border-t"
        style={{ borderColor: config.colors.border }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ 
              fontFamily: config.fonts.heading,
              color: config.colors.text,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Technology Stack
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {['React 18', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Vite', 'Vitest'].map((tech, i) => (
              <motion.div
                key={tech}
                className="p-4 text-center border"
                style={{
                  background: config.colors.bgSecondary,
                  borderColor: config.colors.border,
                  color: config.colors.text,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.05 }}
              >
                <span style={{ fontFamily: config.fonts.mono }}>{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="px-6 py-12 text-center border-t"
        style={{ borderColor: config.colors.border }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p style={{ color: config.colors.textSecondary }}>
          Built for Kiroween 2025 • Powered by AI-Assisted Development with Kiro
        </p>
      </motion.footer>
    </div>
  );
};

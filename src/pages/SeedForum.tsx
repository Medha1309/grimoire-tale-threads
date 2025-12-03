/**
 * Seed Forum Page
 * Simple UI to populate forum with demo posts
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { seedForumData, DEMO_POSTS } from '../utils/seedForumData';
import { NavigationProps } from '../types';

export const SeedForum: React.FC<NavigationProps> = ({ go }) => {
  const [seeding, setSeeding] = useState(false);
  const [results, setResults] = useState<{ success: string[]; errors: string[] } | null>(null);

  const handleSeed = async () => {
    setSeeding(true);
    setResults(null);
    
    try {
      const res = await seedForumData();
      setResults(res);
    } catch (error) {
      console.error('Seeding failed:', error);
      setResults({ success: [], errors: ['Seeding failed'] });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl mb-4 tracking-wider"
              style={{ color: '#d4af37', textShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}>
            🕯️ The Tea Room
          </h1>
          <p className="text-zinc-400 font-serif italic">Seed Demo Forum Posts</p>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-8 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 10, 10, 0.9) 100%)',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
          }}
        >
          <h2 className="font-serif text-2xl mb-4" style={{ color: '#d4af37' }}>
            📝 What will be created:
          </h2>
          
          <p className="text-zinc-300 mb-4">
            <strong>{DEMO_POSTS.length} Demo Posts</strong> with engaging content about:
          </p>
          
          <ul className="space-y-2 mb-6">
            {DEMO_POSTS.map((post, idx) => (
              <li key={idx} className="text-zinc-400 pl-4 border-l-2 border-zinc-700">
                <span className="text-zinc-300">{post.title}</span>
                <div className="flex gap-2 mt-1">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded"
                          style={{
                            background: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            color: '#d4af37',
                          }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          
          <p className="text-zinc-500 text-sm italic">
            Each post includes realistic engagement (likes, replies) and relevant tags.
          </p>
        </motion.div>

        {/* Seed Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleSeed}
          disabled={seeding || (results?.success.length ?? 0) > 0}
          className="w-full py-4 rounded-lg font-serif text-lg tracking-wide
                     transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(139, 0, 0, 0.15) 100%)',
            border: '2px solid rgba(212, 175, 55, 0.4)',
            color: '#d4af37',
          }}
          whileHover={!seeding && !results ? { scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.6)' } : {}}
          whileTap={!seeding && !results ? { scale: 0.98 } : {}}
        >
          {seeding ? '⏳ Seeding...' : results ? '✅ Seeding Complete!' : '🌱 Seed Forum with Demo Posts'}
        </motion.button>

        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-lg"
            style={{
              background: results.errors.length > 0 
                ? 'rgba(139, 0, 0, 0.1)' 
                : 'rgba(74, 222, 128, 0.1)',
              border: results.errors.length > 0
                ? '2px solid rgba(139, 0, 0, 0.3)'
                : '2px solid rgba(74, 222, 128, 0.3)',
            }}
          >
            <h3 className="font-serif text-xl mb-4"
                style={{ color: results.errors.length > 0 ? '#ef4444' : '#4ade80' }}>
              {results.errors.length > 0 ? '⚠️ Seeding Completed with Errors' : '🎉 Seeding Complete!'}
            </h3>
            
            {results.success.length > 0 && (
              <div className="mb-4">
                <p className="text-green-400 mb-2">
                  ✅ Created {results.success.length} post{results.success.length !== 1 ? 's' : ''}
                </p>
                <div className="text-xs text-zinc-500 font-mono">
                  {results.success.map(id => (
                    <div key={id}>ID: {id}</div>
                  ))}
                </div>
              </div>
            )}
            
            {results.errors.length > 0 && (
              <div>
                <p className="text-red-400 mb-2">
                  ❌ Failed {results.errors.length} post{results.errors.length !== 1 ? 's' : ''}
                </p>
                <div className="text-xs text-zinc-500">
                  {results.errors.map((err, idx) => (
                    <div key={idx}>{err}</div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-4">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => go?.('forum')}
            className="flex-1 py-3 rounded-lg font-serif tracking-wide
                       transition-all duration-300"
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              color: '#d4af37',
            }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            → Visit The Tea Room
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => go?.('landing')}
            className="flex-1 py-3 rounded-lg font-serif tracking-wide
                       transition-all duration-300"
            style={{
              background: 'rgba(139, 0, 0, 0.1)',
              border: '2px solid rgba(139, 0, 0, 0.3)',
              color: '#8B0000',
            }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(139, 0, 0, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            ← Back Home
          </motion.button>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-lg text-sm"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          <h3 className="font-serif text-lg mb-3" style={{ color: '#d4af37' }}>
            💡 Alternative Method
          </h3>
          <p className="text-zinc-400 mb-2">
            You can also seed from the browser console:
          </p>
          <code className="block bg-black p-3 rounded text-green-400 font-mono text-xs">
            window.seedForum()
          </code>
          <p className="text-zinc-500 mt-2 text-xs italic">
            Open DevTools (F12) → Console → Paste the command above
          </p>
        </motion.div>
      </div>
    </div>
  );
};

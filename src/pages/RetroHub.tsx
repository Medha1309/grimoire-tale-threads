import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const RetroHub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4">
            Retro Hub
          </h1>
          <p className="text-xl text-cyan-300 font-mono">
            Experience nostalgia in digital form
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm 
                     border-2 border-cyan-400 rounded-lg p-8 cursor-pointer"
            onClick={() => navigate('/desktop')}
          >
            <div className="text-4xl mb-4">🖥️</div>
            <h2 className="text-2xl font-bold text-cyan-300 mb-2">Windows 98 Desktop</h2>
            <p className="text-gray-300">
              Step back into the golden age of computing with a fully functional retro desktop experience.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm 
                     border-2 border-pink-400 rounded-lg p-8 cursor-pointer"
            onClick={() => navigate('/forum')}
          >
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-pink-300 mb-2">Gothic Forum</h2>
            <p className="text-gray-300">
              Join discussions in our atmospheric horror fiction community forum.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm 
                     border-2 border-green-400 rounded-lg p-8 cursor-pointer"
            onClick={() => navigate('/chains')}
          >
            <div className="text-4xl mb-4">⛓️</div>
            <h2 className="text-2xl font-bold text-green-300 mb-2">Collaborative Stories</h2>
            <p className="text-gray-300">
              Create and contribute to collaborative horror stories with other writers.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm 
                     border-2 border-yellow-400 rounded-lg p-8 cursor-pointer"
            onClick={() => navigate('/stories')}
          >
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-yellow-300 mb-2">Story Library</h2>
            <p className="text-gray-300">
              Browse our curated collection of dark fiction and horror stories.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                     text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700
                     transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default RetroHub;

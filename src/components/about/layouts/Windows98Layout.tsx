/**
 * Windows 98 Layout - Desktop with draggable windows
 * Classic Windows 98 aesthetic with taskbar and windows
 */

import React, { useState } from 'react';
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

export const Windows98Layout: React.FC<Props> = ({ features }) => {
  const navigate = useNavigate();
  const [_activeWindow, _setActiveWindow] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-teal-600 p-4">
      {/* Desktop Icons */}
      <div className="grid grid-cols-1 gap-4 w-24">
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-12 h-12 bg-gray-300 border-2 border-white shadow-md flex items-center justify-center text-2xl">
            💾
          </div>
          <div className="text-white text-xs mt-1 text-center font-bold drop-shadow-md">
            My Computer
          </div>
        </motion.div>
      </div>

      {/* Main Window - About Grimoire */}
      <motion.div
        className="absolute top-12 left-32 w-[800px] bg-gray-300 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-2 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 border border-gray-600 flex items-center justify-center text-xs">
              📄
            </div>
            <span className="text-white font-bold text-sm">About Grimoire.exe</span>
          </div>
          <div className="flex gap-1">
            <button className="w-5 h-5 bg-gray-300 border-t border-l border-white border-r border-b border-gray-800 text-xs font-bold">_</button>
            <button className="w-5 h-5 bg-gray-300 border-t border-l border-white border-r border-b border-gray-800 text-xs font-bold">□</button>
            <button className="w-5 h-5 bg-gray-300 border-t border-l border-white border-r border-b border-gray-800 text-xs font-bold">×</button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-gray-300 border-b border-gray-400 px-2 py-1 flex gap-4 text-sm">
          <span className="hover:bg-blue-700 hover:text-white px-2">File</span>
          <span className="hover:bg-blue-700 hover:text-white px-2">Edit</span>
          <span className="hover:bg-blue-700 hover:text-white px-2">View</span>
          <span className="hover:bg-blue-700 hover:text-white px-2">Help</span>
        </div>

        {/* Content Area */}
        <div className="p-4 bg-white h-[500px] overflow-y-auto">
          <div className="border-2 border-gray-400 p-4 mb-4 bg-gray-100">
            <h2 className="text-xl font-bold mb-2 text-blue-900">GRIMOIRE</h2>
            <p className="text-sm">A Gothic Horror Storytelling Platform</p>
            <p className="text-xs text-gray-600 mt-2">Built for Kiroween 2025</p>
          </div>

          {/* Feature List - Windows 98 Style */}
          <div className="space-y-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.id}
                className="border-2 border-gray-400 bg-white p-3 cursor-pointer hover:bg-blue-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                onClick={() => feature.route && navigate(feature.route)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 border border-gray-600 flex items-center justify-center text-lg">
                    {feature.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{feature.title}</div>
                    <div className="text-xs text-gray-600">{feature.description[0]}</div>
                  </div>
                  <div className="text-xs text-gray-500">{feature.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-300 border-t-2 border-white px-2 py-1 flex items-center gap-2 text-xs">
          <div className="border-l-2 border-t-2 border-gray-800 border-r-2 border-b-2 border-white px-2 py-1 flex-1">
            Ready
          </div>
          <div className="border-l-2 border-t-2 border-gray-800 border-r-2 border-b-2 border-white px-2 py-1">
            {features.length} items
          </div>
        </div>
      </motion.div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-gray-300 border-t-2 border-white flex items-center px-2 gap-2">
        <button className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-3 py-1 border-t border-l border-white border-r border-b border-gray-800 flex items-center gap-2 text-sm">
          <span className="text-lg">🪟</span>
          Start
        </button>
        
        <div className="flex-1 flex gap-2">
          <div className="bg-white border-l-2 border-t-2 border-gray-800 border-r-2 border-b-2 border-white px-3 py-1 text-sm font-bold">
            About Grimoire.exe
          </div>
        </div>

        <div className="border-l-2 border-t-2 border-gray-800 border-r-2 border-b-2 border-white px-3 py-1 text-sm">
          🔊 🕐 12:00 AM
        </div>
      </div>
    </div>
  );
};

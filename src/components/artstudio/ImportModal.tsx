/**
 * Import Modal - Load project from JSON
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectData } from './types';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: ProjectData) => void;
}

export function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.json')) {
      setError('Please select a valid JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Validate project data
        if (!data.version || !data.layers || !Array.isArray(data.layers)) {
          setError('Invalid project file format');
          return;
        }

        onImport(data);
        onClose();
      } catch (err) {
        setError('Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl border-2 border-rose-400/30 shadow-2xl max-w-md w-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif text-rose-200">Import Project</h2>
                <button
                  onClick={onClose}
                  className="text-rose-400/60 hover:text-rose-400 text-2xl transition"
                >
                  ✕
                </button>
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-xl p-8 text-center transition-all
                  ${isDragging
                    ? 'border-rose-400 bg-rose-900/20'
                    : 'border-rose-400/30 bg-slate-900/30 hover:border-rose-400/50'
                  }
                `}
              >
                <div className="text-6xl mb-4">📂</div>
                <p className="text-rose-200/80 font-medium mb-2">
                  Drop your project file here
                </p>
                <p className="text-rose-200/50 text-sm mb-4">
                  or click to browse
                </p>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2 rounded-lg bg-rose-600/80 text-white hover:bg-rose-600 transition shadow-lg shadow-rose-600/30"
                >
                  Choose File
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-900/30 border border-red-400/30 rounded-lg"
                >
                  <p className="text-red-200 text-sm">⚠️ {error}</p>
                </motion.div>
              )}

              {/* Info */}
              <div className="mt-6 p-3 bg-slate-950/50 rounded-lg border border-rose-400/10">
                <p className="text-rose-200/60 text-sm leading-relaxed">
                  <span className="text-rose-400/70 font-medium">Note:</span> Only project metadata will be restored. Canvas pixel data must be recreated.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

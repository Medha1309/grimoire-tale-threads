/**
 * Export Modal - Save artwork as PNG or project JSON
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layer, ProjectData } from './types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => Promise<string | undefined>;
  layers: Layer[];
}

export function ExportModal({ isOpen, onClose, onExport, layers }: ExportModalProps) {
  const [exportType, setExportType] = useState<'png' | 'json'>('png');
  const [filename, setFilename] = useState('haunted-artwork');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      if (exportType === 'png') {
        const dataUrl = await onExport();
        if (!dataUrl) {
          alert('Failed to export image');
          return;
        }

        // Download PNG
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${filename}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Export project JSON
        const projectData: ProjectData = {
          version: '1.0',
          layers: layers.map(l => ({
            ...l,
            data: null // Canvas data can't be serialized easily
          })),
          width: 1200,
          height: 800,
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };

        const json = JSON.stringify(projectData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
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
                <h2 className="text-2xl font-serif text-rose-200">Export Artwork</h2>
                <button
                  onClick={onClose}
                  className="text-rose-400/60 hover:text-rose-400 text-2xl transition"
                >
                  ✕
                </button>
              </div>

              {/* Export Type */}
              <div className="mb-6">
                <label className="block text-rose-200/80 text-sm font-medium mb-3">
                  Export Format
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setExportType('png')}
                    className={`
                      flex-1 px-4 py-3 rounded-lg border-2 transition-all
                      ${exportType === 'png'
                        ? 'bg-rose-600/30 border-rose-400/50 text-rose-200'
                        : 'bg-slate-800/50 border-slate-700/30 text-rose-200/60 hover:border-rose-400/30'
                      }
                    `}
                  >
                    <div className="text-2xl mb-1">🖼️</div>
                    <div className="text-sm font-medium">PNG Image</div>
                  </button>

                  <button
                    onClick={() => setExportType('json')}
                    className={`
                      flex-1 px-4 py-3 rounded-lg border-2 transition-all
                      ${exportType === 'json'
                        ? 'bg-rose-600/30 border-rose-400/50 text-rose-200'
                        : 'bg-slate-800/50 border-slate-700/30 text-rose-200/60 hover:border-rose-400/30'
                      }
                    `}
                  >
                    <div className="text-2xl mb-1">📄</div>
                    <div className="text-sm font-medium">Project JSON</div>
                  </button>
                </div>
              </div>

              {/* Filename */}
              <div className="mb-6">
                <label className="block text-rose-200/80 text-sm font-medium mb-2">
                  Filename
                </label>
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-rose-400/30 rounded-lg text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                  placeholder="Enter filename..."
                />
                <p className="mt-2 text-rose-200/50 text-xs">
                  File will be saved as: {filename}.{exportType}
                </p>
              </div>

              {/* Info */}
              <div className="mb-6 p-3 bg-slate-950/50 rounded-lg border border-rose-400/10">
                <p className="text-rose-200/60 text-sm leading-relaxed">
                  {exportType === 'png' ? (
                    <>
                      <span className="text-rose-400/70 font-medium">PNG Export:</span> Saves a flattened image of all visible layers.
                    </>
                  ) : (
                    <>
                      <span className="text-rose-400/70 font-medium">JSON Export:</span> Saves project metadata. Note: Canvas pixel data is not included.
                    </>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-lg border border-rose-400/30 text-rose-200 hover:bg-rose-900/20 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting || !filename.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-rose-600/80 text-white hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-600/30"
                >
                  {isExporting ? 'Exporting...' : 'Export'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

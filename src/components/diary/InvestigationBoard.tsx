/**
 * Investigation Board Component
 * Figma-inspired evidence board with drag-drop, layers, and connections
 */

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigationBoard } from '../../hooks/useInvestigationBoard';
import { InvestigationBoard as BoardType } from '../../types/investigationScrapbook';
import { InvestigationToolbar } from './InvestigationToolbar';
import { InvestigationLayersPanel } from './InvestigationLayersPanel';
import { InvestigationCanvas } from './InvestigationCanvas';
import { InvestigationPropertiesPanel } from './InvestigationPropertiesPanel';

interface InvestigationBoardProps {
  initialBoard: BoardType;
  onSave: (board: BoardType) => void;
  onBack: () => void;
}

export const InvestigationBoard: React.FC<InvestigationBoardProps> = ({
  initialBoard,
  onSave,
  onBack,
}) => {
  const { board, viewport, history, actions } = useInvestigationBoard(initialBoard);
  const [showLayers, setShowLayers] = useState(true);
  const [showProperties, setShowProperties] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedElements = board.elements.filter(el => 
    viewport.selectedIds.includes(el.id)
  );

  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col overflow-hidden">
      {/* Top Toolbar - Figma style */}
      <InvestigationToolbar
        board={board}
        viewport={viewport}
        history={history}
        actions={actions}
        onSave={() => onSave(board)}
        onBack={onBack}
        onToggleLayers={() => setShowLayers(!showLayers)}
        onToggleProperties={() => setShowProperties(!showProperties)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Layers Panel */}
        <AnimatePresence>
          {showLayers && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col"
            >
              <InvestigationLayersPanel
                elements={board.elements}
                groups={board.groups}
                selectedIds={viewport.selectedIds}
                onSelectElement={(id, addToSelection) => 
                  actions.selectElements([id], addToSelection)
                }
                onDeleteElement={(id) => actions.deleteElements([id])}
                onToggleVisibility={(id) => {
                  const element = board.elements.find(el => el.id === id);
                  if (element) {
                    actions.updateElement(id, { visible: !element.visible });
                  }
                }}
                onToggleLock={(id) => {
                  const element = board.elements.find(el => el.id === id);
                  if (element) {
                    actions.updateElement(id, { locked: !element.locked });
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center - Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <InvestigationCanvas
            ref={canvasRef}
            board={board}
            viewport={viewport}
            actions={actions}
          />

          {/* Cork Board Background */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div 
              className="w-full h-full opacity-90"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    rgba(139, 90, 43, 0.1) 0px,
                    rgba(139, 90, 43, 0.1) 1px,
                    transparent 1px,
                    transparent 2px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    rgba(139, 90, 43, 0.1) 0px,
                    rgba(139, 90, 43, 0.1) 1px,
                    transparent 1px,
                    transparent 2px
                  )
                `,
                backgroundColor: '#3d2817',
                backgroundBlendMode: 'overlay',
              }}
            />
            
            {/* Cork texture overlay */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(139,90,43,0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(139,90,43,0.3) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2) 0%, transparent 60%)
                `,
              }}
            />

            {/* Creepy ambient effects */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`shadow-${i}`}
                className="absolute w-32 h-32 rounded-full"
                style={{
                  left: `${(i * 40 + 10) % 90}%`,
                  top: `${(i * 30 + 20) % 80}%`,
                  background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Zoom indicator */}
          <div className="absolute bottom-4 right-4 bg-zinc-900/90 backdrop-blur-sm 
                          px-3 py-2 rounded-lg border border-zinc-700 text-xs text-zinc-400">
            {Math.round(viewport.zoom * 100)}%
          </div>

          {/* Selection count */}
          {viewport.selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 
                         bg-[#ff1493]/90 backdrop-blur-sm px-4 py-2 rounded-full 
                         border border-[#ff1493] text-white text-sm font-medium"
            >
              {viewport.selectedIds.length} selected
            </motion.div>
          )}
        </div>

        {/* Right Sidebar - Properties Panel */}
        <AnimatePresence>
          {showProperties && selectedElements.length > 0 && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col"
            >
              <InvestigationPropertiesPanel
                elements={selectedElements}
                onUpdate={(id, updates) => actions.updateElement(id, updates)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-8 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-4 text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          <span>{board.elements.length} elements</span>
          <span>•</span>
          <span>{board.connections.length} connections</span>
          <span>•</span>
          <span className="text-[#ff1493]">{board.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{history.currentAction}</span>
          {history.canUndo && <span>• Ctrl+Z to undo</span>}
        </div>
      </div>
    </div>
  );
};

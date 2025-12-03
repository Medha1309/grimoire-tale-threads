/**
 * Investigation Toolbar Component
 * Figma-inspired top toolbar with tools and actions
 */

import React from 'react';
import { motion } from 'framer-motion';
import { InvestigationBoard, ViewportState } from '../../types/investigationScrapbook';

interface InvestigationToolbarProps {
  board: InvestigationBoard;
  viewport: ViewportState;
  history: {
    canUndo: boolean;
    canRedo: boolean;
    currentAction: string;
    undo: () => void;
    redo: () => void;
  };
  actions: any;
  onSave: () => void;
  onBack: () => void;
  onToggleLayers: () => void;
  onToggleProperties: () => void;
}

export const InvestigationToolbar: React.FC<InvestigationToolbarProps> = ({
  board,
  viewport,
  history,
  actions,
  onSave,
  onBack,
  onToggleLayers,
  onToggleProperties,
}) => {
  const ToolButton: React.FC<{
    icon: string;
    label: string;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    shortcut?: string;
  }> = ({ icon, label, active, disabled, onClick, shortcut }) => (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all
        flex items-center gap-2 relative group
        ${active 
          ? 'bg-[#ff1493] text-white border border-[#ff1493]' 
          : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
      title={label}
    >
      <span>{icon}</span>
      {shortcut && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 
                         bg-zinc-900 px-2 py-1 rounded text-xs opacity-0 
                         group-hover:opacity-100 transition-opacity whitespace-nowrap
                         border border-zinc-700">
          {shortcut}
        </span>
      )}
    </motion.button>
  );

  return (
    <div className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 gap-4">
      {/* Left - Navigation */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700
                     hover:bg-zinc-700 transition-all text-sm font-medium"
        >
          ← Back
        </motion.button>

        <div className="h-8 w-px bg-zinc-700" />

        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-zinc-200">{board.title}</h2>
          <p className="text-xs text-zinc-500">
            {new Date(board.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Center - Tools */}
      <div className="flex items-center gap-2">
        {/* Selection Tools */}
        <ToolButton
          icon="Select"
          label="Select Tool"
          active={viewport.tool === 'select'}
          onClick={() => actions.setTool('select')}
          shortcut="V"
        />
        <ToolButton
          icon="Pan"
          label="Pan Tool"
          active={viewport.tool === 'pan'}
          onClick={() => actions.setTool('pan')}
          shortcut="Space"
        />

        <div className="h-8 w-px bg-zinc-700 mx-1" />

        {/* Add Tools */}
        <ToolButton
          icon="Photo"
          label="Add Photo"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const photoElement: any = {
                    id: `photo-${Date.now()}`,
                    type: 'photo',
                    position: { x: 30, y: 30 },
                    size: { width: 20, height: 20 },
                    rotation: Math.random() * 10 - 5,
                    zIndex: board.elements.length,
                    locked: false,
                    visible: true,
                    opacity: 1,
                    imageUrl: e.target?.result as string,
                    hasThumbTack: true,
                    thumbTackColor: '#ff1493',
                  };
                  actions.addElement(photoElement);
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }}
        />
        <ToolButton
          icon="GIF"
          label="Add GIF"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/gif';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const gifElement: any = {
                    id: `gif-${Date.now()}`,
                    type: 'gif',
                    position: { x: 40, y: 40 },
                    size: { width: 25, height: 25 },
                    rotation: 0,
                    zIndex: board.elements.length,
                    locked: false,
                    visible: true,
                    opacity: 1,
                    gifUrl: e.target?.result as string,
                    hasVHSEffect: true,
                    hasTimestamp: true,
                    surveillanceLabel: 'CAM 01',
                  };
                  actions.addElement(gifElement);
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }}
        />
        <ToolButton
          icon="Note"
          label="Add Note"
          onClick={() => {
            const noteElement: any = {
              id: `note-${Date.now()}`,
              type: 'note',
              position: { x: 50, y: 50 },
              size: { width: 15, height: 10 },
              rotation: Math.random() * 6 - 3,
              zIndex: board.elements.length,
              locked: false,
              visible: true,
              opacity: 1,
              content: 'New note...',
              noteStyle: 'sticky',
              color: '#ffeb3b',
              fontSize: 14,
            };
            actions.addElement(noteElement);
          }}
        />
        <ToolButton
          icon="Connect"
          label="Draw Connection"
          active={viewport.tool === 'connect'}
          onClick={() => actions.setTool('connect')}
        />
        <ToolButton
          icon="Draw"
          label="Annotate"
          active={viewport.tool === 'annotate'}
          onClick={() => actions.setTool('annotate')}
        />

        <div className="h-8 w-px bg-zinc-700 mx-1" />

        {/* History */}
        <ToolButton
          icon="↶"
          label="Undo"
          disabled={!history.canUndo}
          onClick={history.undo}
          shortcut="Ctrl+Z"
        />
        <ToolButton
          icon="↷"
          label="Redo"
          disabled={!history.canRedo}
          onClick={history.redo}
          shortcut="Ctrl+Shift+Z"
        />

        <div className="h-8 w-px bg-zinc-700 mx-1" />

        {/* Zoom */}
        <ToolButton
          icon="−"
          label="Zoom Out"
          onClick={() => actions.setZoom(viewport.zoom - 0.1)}
          shortcut="Ctrl+-"
        />
        <span className="text-xs text-zinc-400 min-w-[3rem] text-center">
          {Math.round(viewport.zoom * 100)}%
        </span>
        <ToolButton
          icon="+"
          label="Zoom In"
          onClick={() => actions.setZoom(viewport.zoom + 0.1)}
          shortcut="Ctrl+="
        />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        <ToolButton
          icon="Layers"
          label="Layers"
          onClick={onToggleLayers}
        />
        <ToolButton
          icon="Props"
          label="Properties"
          onClick={onToggleProperties}
        />

        <div className="h-8 w-px bg-zinc-700" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSave}
          className="px-6 py-2 rounded-lg bg-[#ff1493] text-white border border-[#ff1493]
                     hover:bg-[#ff1493]/90 transition-all text-sm font-semibold"
        >
          💾 Save Case
        </motion.button>
      </div>
    </div>
  );
};

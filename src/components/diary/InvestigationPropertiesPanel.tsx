/**
 * Investigation Properties Panel
 * Figma-style properties panel for selected elements
 */

import React from 'react';
import { InvestigationElement, PhotoElement, GifElement, NoteElement, EVIDENCE_TAGS, SURVEILLANCE_LABELS } from '../../types/investigationScrapbook';

interface InvestigationPropertiesPanelProps {
  elements: InvestigationElement[];
  onUpdate: (id: string, updates: Partial<InvestigationElement>) => void;
}

export const InvestigationPropertiesPanel: React.FC<InvestigationPropertiesPanelProps> = ({
  elements,
  onUpdate,
}) => {
  if (elements.length === 0) return null;

  const element = elements[0]; // For now, show properties of first selected element

  const PropertySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
        {title}
      </h4>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );

  const PropertyRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="flex items-center justify-between gap-3">
      <label className="text-sm text-zinc-300 min-w-[80px]">{label}</label>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-200">Properties</h3>
        <p className="text-xs text-zinc-500 mt-1">
          {elements.length} element{elements.length > 1 ? 's' : ''} selected
        </p>
      </div>

      {/* Properties */}
      <div className="p-4">
        {/* Common Properties */}
        <PropertySection title="Transform">
          <PropertyRow label="X">
            <input
              type="number"
              value={Math.round(element.position.x)}
              onChange={(e) => onUpdate(element.id, {
                position: { ...element.position, x: Number(e.target.value) }
              })}
              className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200"
            />
          </PropertyRow>
          <PropertyRow label="Y">
            <input
              type="number"
              value={Math.round(element.position.y)}
              onChange={(e) => onUpdate(element.id, {
                position: { ...element.position, y: Number(e.target.value) }
              })}
              className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200"
            />
          </PropertyRow>
          <PropertyRow label="Rotation">
            <input
              type="range"
              min="-180"
              max="180"
              value={element.rotation}
              onChange={(e) => onUpdate(element.id, { rotation: Number(e.target.value) })}
              className="w-full"
            />
            <span className="text-xs text-zinc-400 ml-2">{element.rotation}°</span>
          </PropertyRow>
          <PropertyRow label="Opacity">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={element.opacity}
              onChange={(e) => onUpdate(element.id, { opacity: Number(e.target.value) })}
              className="w-full"
            />
            <span className="text-xs text-zinc-400 ml-2">{Math.round(element.opacity * 100)}%</span>
          </PropertyRow>
        </PropertySection>

        {/* Photo-specific Properties */}
        {element.type === 'photo' && (
          <>
            <PropertySection title="Photo">
              <PropertyRow label="Filter">
                <select
                  value={(element as PhotoElement).filter || 'none'}
                  onChange={(e) => onUpdate(element.id, { filter: e.target.value as any })}
                  className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200"
                >
                  <option value="none">None</option>
                  <option value="sepia">Sepia</option>
                  <option value="desaturated">Desaturated</option>
                  <option value="vintage">Vintage</option>
                  <option value="horror">Horror</option>
                  <option value="vhs">VHS</option>
                </select>
              </PropertyRow>
              <PropertyRow label="Evidence Tag">
                <select
                  value={(element as PhotoElement).evidenceTag || ''}
                  onChange={(e) => onUpdate(element.id, { evidenceTag: e.target.value })}
                  className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200"
                >
                  <option value="">None</option>
                  {EVIDENCE_TAGS.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </PropertyRow>
              <PropertyRow label="Thumbtack">
                <input
                  type="checkbox"
                  checked={(element as PhotoElement).hasThumbTack}
                  onChange={(e) => onUpdate(element.id, { hasThumbTack: e.target.checked })}
                  className="w-4 h-4"
                />
              </PropertyRow>
            </PropertySection>
          </>
        )}

        {/* GIF-specific Properties */}
        {element.type === 'gif' && (
          <PropertySection title="Surveillance">
            <PropertyRow label="VHS Effect">
              <input
                type="checkbox"
                checked={(element as GifElement).hasVHSEffect}
                onChange={(e) => onUpdate(element.id, { hasVHSEffect: e.target.checked })}
                className="w-4 h-4"
              />
            </PropertyRow>
            <PropertyRow label="Timestamp">
              <input
                type="checkbox"
                checked={(element as GifElement).hasTimestamp}
                onChange={(e) => onUpdate(element.id, { hasTimestamp: e.target.checked })}
                className="w-4 h-4"
              />
            </PropertyRow>
            <PropertyRow label="Camera Label">
              <select
                value={(element as GifElement).surveillanceLabel || ''}
                onChange={(e) => onUpdate(element.id, { surveillanceLabel: e.target.value })}
                className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200"
              >
                <option value="">None</option>
                {SURVEILLANCE_LABELS.map(label => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
            </PropertyRow>
          </PropertySection>
        )}

        {/* Note-specific Properties */}
        {element.type === 'note' && (
          <PropertySection title="Note">
            <PropertyRow label="Style">
              <select
                value={(element as NoteElement).noteStyle}
                onChange={(e) => onUpdate(element.id, { noteStyle: e.target.value as any })}
                className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200"
              >
                <option value="sticky">Sticky Note</option>
                <option value="typewriter">Typewriter</option>
                <option value="handwritten">Handwritten</option>
                <option value="redacted">Redacted</option>
              </select>
            </PropertyRow>
            <PropertyRow label="Font Size">
              <input
                type="number"
                value={(element as NoteElement).fontSize}
                onChange={(e) => onUpdate(element.id, { fontSize: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200"
              />
            </PropertyRow>
            <PropertyRow label="Color">
              <input
                type="color"
                value={(element as NoteElement).color}
                onChange={(e) => onUpdate(element.id, { color: e.target.value })}
                className="w-full h-8 rounded"
              />
            </PropertyRow>
          </PropertySection>
        )}

        {/* Layer Properties */}
        <PropertySection title="Layer">
          <PropertyRow label="Locked">
            <input
              type="checkbox"
              checked={element.locked}
              onChange={(e) => onUpdate(element.id, { locked: e.target.checked })}
              className="w-4 h-4"
            />
          </PropertyRow>
          <PropertyRow label="Visible">
            <input
              type="checkbox"
              checked={element.visible}
              onChange={(e) => onUpdate(element.id, { visible: e.target.checked })}
              className="w-4 h-4"
            />
          </PropertyRow>
        </PropertySection>
      </div>
    </div>
  );
};

/**
 * EnhancedWritingEditor Component
 * Advanced diary writing interface with all enhancements
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { WritingEnhancements } from './WritingEnhancements';
import { WritingEditorHeader } from './WritingEditorHeader';
import { WritingEditorMetadata } from './WritingEditorMetadata';
import { WritingGoals } from './WritingGoals';
import { FocusMode } from './FocusMode';
import { useAutoSave } from '../../hooks/useAutoSave';
import { countWords } from '../../utils/writingStats';
import { renderRichText } from '../../utils/richTextRenderer';

interface EnhancedWritingEditorProps {
  title: string;
  content: string;
  mood: 'joy' | 'sorrow' | 'calm' | 'unrest';
  isLocked: boolean;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onMoodChange: (mood: 'joy' | 'sorrow' | 'calm' | 'unrest') => void;
  onLockChange: (locked: boolean) => void;
  onSave: () => void | Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
  error?: string | null;
}

export const EnhancedWritingEditor: React.FC<EnhancedWritingEditorProps> = ({
  title,
  content,
  mood,
  isLocked,
  onTitleChange,
  onContentChange,
  onMoodChange,
  onLockChange,
  onSave,
  onCancel,
  isSaving = false,
  error = null,
}) => {
  const [focusModeActive, setFocusModeActive] = useState(false);
  const [showEnhancements, setShowEnhancements] = useState(true);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Rich text formatting functions
  const applyFormatting = React.useCallback((prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    if (selectedText) {
      // Wrap selected text
      const newContent = 
        content.substring(0, start) + 
        prefix + selectedText + suffix + 
        content.substring(end);
      onContentChange(newContent);
      
      // Restore selection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      }, 0);
    } else {
      // Insert at cursor
      const newContent = 
        content.substring(0, start) + 
        prefix + suffix + 
        content.substring(end);
      onContentChange(newContent);
      
      // Place cursor between markers
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      }, 0);
    }
  }, [content, onContentChange]);

  const insertList = React.useCallback((type: 'bullet' | 'number') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const prefix = type === 'bullet' ? '• ' : '1. ';
    const newContent = 
      content.substring(0, start) + 
      '\n' + prefix + 
      content.substring(start);
    onContentChange(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length + 1, start + prefix.length + 1);
    }, 0);
  }, [content, onContentChange]);

  // Keyboard shortcuts for formatting
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          applyFormatting('**');
          break;
        case 'i':
          e.preventDefault();
          applyFormatting('*');
          break;
        case 'k':
          e.preventDefault();
          applyFormatting('`');
          break;
      }
    }
  }, [applyFormatting]);

  // Auto-save functionality
  const autoSave = useAutoSave(content, {
    delay: 3000,
    onSave: async (savedContent) => {
      localStorage.setItem('diary-draft', JSON.stringify({
        title,
        content: savedContent,
        mood,
        isLocked,
        timestamp: new Date().toISOString(),
      }));
    },
    enabled: content.length > 0,
  });

  // Memoized values
  const wordCount = useMemo(() => countWords(content), [content]);
  const hasContent = useMemo(() => Boolean(title.trim() && content.trim()), [title, content]);

  // Handle prompt selection
  const handlePromptSelect = (prompt: string) => {
    const newContent = content ? `${content}\n\n${prompt}\n` : `${prompt}\n`;
    onContentChange(newContent);
  };

  return (
    <>
      <FocusMode
        isActive={focusModeActive}
        content={content}
        onContentChange={onContentChange}
        onExit={() => setFocusModeActive(false)}
      />

      {!focusModeActive && (
        <section className="relative min-h-screen bg-zinc-950 text-zinc-100">
          <div
            className="fixed inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
            }}
          />

          <div className="relative">
            <WritingEditorHeader
              autoSaveStatus={autoSave.status}
              lastSaved={autoSave.lastSaved || undefined}
              isSaving={isSaving}
              hasContent={hasContent}
              onCancel={onCancel}
              onSave={onSave}
              onFocusMode={() => setFocusModeActive(true)}
            />

            <div className="mx-auto max-w-5xl px-6 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="Untitled Entry"
                  className="w-full px-0 py-3 bg-transparent border-none
                           text-4xl md:text-5xl font-serif text-zinc-200 placeholder-zinc-700
                           focus:outline-none focus:ring-0"
                  autoFocus
                />

                <WritingEditorMetadata
                  mood={mood}
                  isLocked={isLocked}
                  showEnhancements={showEnhancements}
                  onMoodChange={onMoodChange}
                  onLockChange={onLockChange}
                  onToggleEnhancements={() => setShowEnhancements(!showEnhancements)}
                />

                {showEnhancements && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    <WritingGoals currentWordCount={wordCount} />
                    <WritingEnhancements
                      content={content}
                      mood={mood}
                      onPromptSelect={handlePromptSelect}
                    />
                  </motion.div>
                )}

                {/* Rich Text Formatting Toolbar */}
                <div className="flex items-center gap-1 pb-3 border-b border-zinc-800/40 mb-4">
                  <button
                    type="button"
                    onClick={() => applyFormatting('**')}
                    className="px-3 py-1.5 text-sm font-bold text-zinc-400 hover:text-[#ffb6d9] hover:bg-zinc-800/30 rounded transition-colors"
                    title="Bold (Ctrl+B)"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormatting('*')}
                    className="px-3 py-1.5 text-sm italic text-zinc-400 hover:text-[#ffb6d9] hover:bg-zinc-800/30 rounded transition-colors"
                    title="Italic (Ctrl+I)"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormatting('~~')}
                    className="px-3 py-1.5 text-sm line-through text-zinc-400 hover:text-[#ffb6d9] hover:bg-zinc-800/30 rounded transition-colors"
                    title="Strikethrough"
                  >
                    S
                  </button>
                  <div className="w-px h-6 bg-zinc-800/40 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertList('bullet')}
                    className="px-3 py-1.5 text-sm text-zinc-400 hover:text-[#ffb6d9] hover:bg-zinc-800/30 rounded transition-colors"
                    title="Bullet List"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    onClick={() => insertList('number')}
                    className="px-3 py-1.5 text-sm text-zinc-400 hover:text-[#ffb6d9] hover:bg-zinc-800/30 rounded transition-colors"
                    title="Numbered List"
                  >
                    1. List
                  </button>
                  <div className="w-px h-6 bg-zinc-800/40 mx-1" />
                  <button
                    type="button"
                    onClick={() => applyFormatting('> ', '')}
                    className="px-3 py-1.5 text-sm text-zinc-400 hover:text-[#ffb6d9] hover:bg-zinc-800/30 rounded transition-colors"
                    title="Quote"
                  >
                    " Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormatting('`')}
                    className="px-3 py-1.5 text-sm font-mono text-zinc-400 hover:text-[#ffb6d9] hover:bg-zinc-800/30 rounded transition-colors"
                    title="Code"
                  >
                    {'</>'}
                  </button>
                  <div className="flex-1" />
                  <span className="text-xs text-zinc-600 font-serif">
                    Markdown supported
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Editor */}
                  <div>
                    <div className="text-xs text-zinc-500 mb-2 font-serif">Editor</div>
                    <textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => onContentChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Write your thoughts here..."
                      className="w-full min-h-[600px] px-4 py-4 bg-zinc-900/30 border border-zinc-800/40 rounded-lg
                               text-lg leading-relaxed font-serif text-zinc-300 placeholder-zinc-700
                               focus:outline-none focus:ring-1 focus:ring-[#ffb6d9]/30 focus:border-[#ffb6d9]/30 resize-none"
                      style={{
                        lineHeight: '1.8',
                        letterSpacing: '0.01em',
                      }}
                    />
                  </div>

                  {/* Live Preview */}
                  <div>
                    <div className="text-xs text-zinc-500 mb-2 font-serif">Preview</div>
                    <div className="min-h-[600px] px-4 py-4 bg-zinc-900/20 border border-zinc-800/20 rounded-lg
                                  text-lg leading-relaxed font-serif text-zinc-300 prose prose-invert max-w-none overflow-y-auto"
                         style={{
                           lineHeight: '1.8',
                           letterSpacing: '0.01em',
                         }}>
                      {content ? renderRichText(content) : (
                        <p className="text-zinc-700">Preview will appear here...</p>
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-red-800/40 bg-red-900/10 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-red-400">⚠️</span>
                      <p className="text-red-300 text-sm font-serif">{error}</p>
                    </div>
                  </motion.div>
                )}

                <div className="h-64" />
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

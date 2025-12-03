/**
 * NovelWritingEditor Component
 * Professional novel writing interface optimized for long-form content
 * Reuses diary components but tailored for book writing
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FocusMode } from '../diary/FocusMode';
import { WritingGoals } from '../diary/WritingGoals';
import { CoverUploader } from './CoverUploader';
import { useAutoSave } from '../../hooks/useAutoSave';
import { countWords } from '../../utils/writingStats';

interface NovelWritingEditorProps {
  title: string;
  content: string;
  genre: 'horror' | 'thriller' | 'mystery' | 'romance';
  cover?: string;
  coverType?: 'image' | 'gif' | 'video';
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onGenreChange: (genre: 'horror' | 'thriller' | 'mystery' | 'romance') => void;
  onCoverChange?: (coverUrl: string, coverType: 'image' | 'gif' | 'video') => void;
  onSave: () => void | Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
  error?: string | null;
}

export const NovelWritingEditor: React.FC<NovelWritingEditorProps> = ({
  title,
  content,
  genre,
  cover,
  coverType: _coverType,
  onTitleChange,
  onContentChange,
  onGenreChange,
  onCoverChange,
  onSave,
  onCancel,
  isSaving = false,
  error = null,
}) => {
  const [focusModeActive, setFocusModeActive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Writing statistics
  const stats = useMemo(() => {
    const words = countWords(content);
    const chars = content.length;
    const charsNoSpaces = content.replace(/\s/g, '').length;
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim()).length;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim()).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed
    
    return { words, chars, charsNoSpaces, paragraphs, sentences, readingTime };
  }, [content]);

  // Rich text formatting
  const applyFormatting = useCallback((prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    if (selectedText) {
      const newContent = 
        content.substring(0, start) + 
        prefix + selectedText + suffix + 
        content.substring(end);
      onContentChange(newContent);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      }, 0);
    } else {
      const newContent = 
        content.substring(0, start) + 
        prefix + suffix + 
        content.substring(end);
      onContentChange(newContent);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      }, 0);
    }
  }, [content, onContentChange]);

  // Insert chapter break
  const insertChapterBreak = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const chapterBreak = '\n\n---\n\n# Chapter \n\n';
    const newContent = 
      content.substring(0, start) + 
      chapterBreak + 
      content.substring(start);
    onContentChange(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + chapterBreak.length - 3, start + chapterBreak.length - 3);
    }, 0);
  }, [content, onContentChange]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        case 's':
          e.preventDefault();
          onSave();
          break;
      }
    }
  }, [applyFormatting, onSave]);

  // Auto-save
  const autoSave = useAutoSave(content, {
    delay: 5000,
    onSave: async (savedContent) => {
      localStorage.setItem('novel-draft', JSON.stringify({
        title,
        content: savedContent,
        genre,
        timestamp: new Date().toISOString(),
      }));
    },
    enabled: content.length > 0,
  });

  const hasContent = useMemo(() => Boolean(title.trim() && content.trim()), [title, content]);

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
          {/* Subtle texture */}
          <div
            className="fixed inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
            }}
          />

          <div className="relative flex h-screen">
            {/* Sidebar - Writing Tools & Stats */}
            <AnimatePresence>
              {showSidebar && (
                <motion.aside
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="w-80 border-r border-zinc-900/40 bg-zinc-950/50 backdrop-blur-sm overflow-y-auto"
                >
                  <div className="p-6 space-y-6">
                    {/* Stats Panel */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-zinc-600 font-serif">
                        Statistics
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <StatCard label="Words" value={stats.words.toLocaleString()} />
                        <StatCard label="Characters" value={stats.chars.toLocaleString()} />
                        <StatCard label="Paragraphs" value={stats.paragraphs} />
                        <StatCard label="Sentences" value={stats.sentences} />
                      </div>
                      <div className="pt-2 border-t border-zinc-900/40">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-600 font-serif">Reading time</span>
                          <span className="text-zinc-400 font-mono">{stats.readingTime} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Writing Goals */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-zinc-600 font-serif">
                        Daily Goal
                      </h3>
                      <WritingGoals currentWordCount={stats.words} />
                    </div>

                    {/* Cover Upload */}
                    {onCoverChange && (
                      <CoverUploader
                        currentCover={cover}
                        onCoverChange={onCoverChange}
                      />
                    )}

                    {/* Genre */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-zinc-600 font-serif">
                        Genre
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {(['horror', 'thriller', 'mystery', 'romance'] as const).map((g) => (
                          <button
                            key={g}
                            onClick={() => onGenreChange(g)}
                            className={`px-3 py-2 rounded-lg text-xs font-serif transition-all
                              ${genre === g
                                ? 'bg-[#6a0000]/20 text-[#ff6b6b] border border-[#6a0000]/40'
                                : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800/50 hover:border-zinc-700'
                              }`}
                          >
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                          </button>
                        ))}
                      </div>
                      
                      {/* Genre Effect Preview */}
                      <div className="mt-3 p-3 rounded-lg bg-zinc-900/30 border border-zinc-800/50">
                        <p className="text-xs text-zinc-500 mb-2 font-serif">Genre Effect Preview:</p>
                        <div className="relative h-16 rounded overflow-hidden bg-zinc-950">
                          {genre === 'horror' && (
                            <motion.div
                              className="absolute inset-0"
                              animate={{
                                background: [
                                  "radial-gradient(circle at 50% 85%, rgba(255,140,0,0.18) 0%, transparent 45%)",
                                  "radial-gradient(circle at 50% 85%, rgba(255,140,0,0.25) 0%, transparent 50%)",
                                  "radial-gradient(circle at 50% 85%, rgba(255,140,0,0.15) 0%, transparent 40%)",
                                ],
                              }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                          )}
                          {genre === 'thriller' && (
                            <motion.div
                              className="absolute inset-0"
                              animate={{
                                background: [
                                  "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 55%)",
                                  "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.28) 0%, transparent 65%)",
                                  "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 55%)",
                                ],
                              }}
                              transition={{ duration: 2.5, repeat: Infinity }}
                            />
                          )}
                          {genre === 'mystery' && (
                            <div
                              className="absolute inset-0"
                              style={{
                                background: "linear-gradient(to top, rgba(100,120,150,0.25) 0%, transparent 65%)",
                              }}
                            />
                          )}
                          {genre === 'romance' && (
                            <motion.div
                              className="absolute inset-0"
                              animate={{
                                background: [
                                  "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.15) 0%, transparent 50%)",
                                  "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.22) 0%, transparent 58%)",
                                  "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.15) 0%, transparent 50%)",
                                ],
                              }}
                              transition={{ duration: 4, repeat: Infinity }}
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-xs text-zinc-600 font-serif">
                              {genre === 'horror' && 'Flickering Candlelight'}
                              {genre === 'thriller' && 'Electric Pulse'}
                              {genre === 'mystery' && 'Rising Fog'}
                              {genre === 'romance' && 'Warm Glow'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Writing Tips */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-zinc-600 font-serif">
                        Craft Tips
                      </h3>
                      <div className="space-y-2 text-xs text-zinc-600 font-serif">
                        <Tip text="Show emotions through actions and body language" />
                        <Tip text="Vary sentence length for rhythm and pacing" />
                        <Tip text="Use specific details to ground readers in the scene" />
                        <Tip text="Let dialogue reveal character and advance plot" />
                      </div>
                    </div>

                    {/* Auto-save status */}
                    <div className="pt-4 border-t border-zinc-900/40">
                      <div className="flex items-center gap-2 text-xs">
                        {autoSave.status === 'saving' && (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-3 h-3 border-2 border-zinc-600 border-t-transparent rounded-full"
                            />
                            <span className="text-zinc-600 font-mono">Saving draft...</span>
                          </>
                        )}
                        {autoSave.status === 'saved' && (
                          <>
                            <div className="w-3 h-3 rounded-full bg-green-500/60" />
                            <span className="text-zinc-600 font-mono">Draft saved</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <header className="border-b border-zinc-900/40 bg-zinc-950/80 backdrop-blur-sm">
                <div className="px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={onCancel}
                      className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <span>←</span>
                      <span className="font-serif">Library</span>
                    </button>
                    <div className="h-4 w-px bg-zinc-800" />
                    <button
                      onClick={() => setShowSidebar(!showSidebar)}
                      className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors font-serif"
                    >
                      {showSidebar ? 'Hide' : 'Show'} Tools
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setFocusModeActive(true)}
                      className="px-4 py-2 text-xs font-serif text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Focus Mode
                    </button>
                    <div className="h-4 w-px bg-zinc-800" />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onCancel}
                      className="px-4 py-2 text-sm font-serif text-zinc-400 hover:text-zinc-300 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onSave}
                      disabled={!hasContent || isSaving}
                      className="px-6 py-2 rounded-lg text-sm font-serif
                               bg-[#6a0000] text-zinc-100 border border-[#8B0000]
                               hover:bg-[#8B0000] transition-colors
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Publishing...' : 'Publish'}
                    </motion.button>
                  </div>
                </div>
              </header>

              {/* Writing Area */}
              <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-4xl px-12 py-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* Title */}
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => onTitleChange(e.target.value)}
                      placeholder="Untitled Novel"
                      className="w-full px-0 py-3 bg-transparent border-none
                               text-4xl md:text-5xl font-serif text-zinc-200 placeholder-zinc-800
                               focus:outline-none focus:ring-0"
                      autoFocus
                    />

                    {/* Formatting Toolbar */}
                    <div className="flex items-center gap-1 pb-3 border-b border-zinc-900/30">
                      <ToolbarButton onClick={() => applyFormatting('**')} title="Bold (Ctrl+B)">
                        <span className="font-bold">B</span>
                      </ToolbarButton>
                      <ToolbarButton onClick={() => applyFormatting('*')} title="Italic (Ctrl+I)">
                        <span className="italic">I</span>
                      </ToolbarButton>
                      <ToolbarButton onClick={() => applyFormatting('~~')} title="Strikethrough">
                        <span className="line-through">S</span>
                      </ToolbarButton>
                      <div className="w-px h-6 bg-zinc-900/40 mx-1" />
                      <ToolbarButton onClick={insertChapterBreak} title="Insert Chapter Break">
                        <span className="text-xs">Chapter</span>
                      </ToolbarButton>
                      <div className="flex-1" />
                      <span className="text-xs text-zinc-700 font-mono">
                        {stats.words} words
                      </span>
                    </div>

                    {/* Content Editor */}
                    <textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => onContentChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Begin your story... Let the words flow onto the page."
                      className="w-full min-h-[700px] px-0 py-4 bg-transparent border-none
                               text-lg leading-relaxed font-serif text-zinc-300 placeholder-zinc-800
                               focus:outline-none focus:ring-0 resize-none"
                      style={{
                        lineHeight: '1.9',
                        letterSpacing: '0.01em',
                      }}
                    />

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
            </div>
          </div>
        </section>
      )}
    </>
  );
};

// Helper Components
const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="px-3 py-2 rounded-lg bg-zinc-900/30 border border-zinc-900/40">
    <div className="text-xs text-zinc-600 font-serif mb-1">{label}</div>
    <div className="text-lg font-mono text-zinc-400">{value}</div>
  </div>
);

const Tip: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-2">
    <span className="text-zinc-800 mt-0.5">•</span>
    <span>{text}</span>
  </div>
);

const ToolbarButton: React.FC<{
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className="px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30 rounded transition-colors"
  >
    {children}
  </button>
);

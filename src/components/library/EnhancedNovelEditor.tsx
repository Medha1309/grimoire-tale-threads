/**
 * EnhancedNovelEditor Component
 * Magical novel writing interface with full CRUD and all features
 * Matches dollhouse aesthetic with pink glow effects
 */

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FocusMode } from '../diary/FocusMode';
import { WritingGoals } from '../diary/WritingGoals';
import { CoverUploader } from './CoverUploader';
import { CollaborationToggle } from './CollaborationToggle';
import type { CollaborationSettings } from './CollaborationToggle';
import { useAutoSave } from '../../hooks/useAutoSave';
import { countWords } from '../../utils/writingStats';
import { renderRichText } from '../../utils/richTextRenderer';
import { Genre, getAllGenres, getGenreAtmosphere } from '../../utils/genreAtmospheres';
import { GenreAtmosphereBackground } from './GenreAtmosphereBackground';
import { useProjectActions } from '../../hooks/useProjectActions';
import { useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';

interface EnhancedNovelEditorProps {
  // Existing story (for edit mode)
  storyId?: string;
  
  // Form data
  title: string;
  content: string;
  genre: Genre;
  cover?: string;
  coverType?: 'image' | 'gif' | 'video';
  blurb?: string;
  
  // Handlers
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onGenreChange: (genre: Genre) => void;
  onCoverChange?: (coverUrl: string, coverType: 'image' | 'gif' | 'video') => void;
  onBlurbChange?: (blurb: string) => void;
  onSave: () => void | Promise<void>;
  onCancel: () => void;
  onDelete?: () => void | Promise<void>;
  
  // State
  isSaving?: boolean;
  error?: string | null;
}

export const EnhancedNovelEditor: React.FC<EnhancedNovelEditorProps> = ({
  storyId,
  title,
  content,
  genre,
  cover,
  coverType: _coverType,
  blurb,
  onTitleChange,
  onContentChange,
  onGenreChange,
  onCoverChange,
  onBlurbChange,
  onSave,
  onCancel,
  onDelete,
  isSaving = false,
  error = null,
}) => {
  const [focusModeActive, setFocusModeActive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [collaborationEnabled, setCollaborationEnabled] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
  const { createProject } = useProjectActions();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Writing statistics
  const stats = useMemo(() => {
    const words = countWords(content);
    const chars = content.length;
    const charsNoSpaces = content.replace(/\s/g, '').length;
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim()).length;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim()).length;
    const readingTime = Math.ceil(words / 200);
    const pages = Math.ceil(words / 250); // Approx 250 words per page
    
    return { words, chars, charsNoSpaces, paragraphs, sentences, readingTime, pages };
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
        blurb,
        timestamp: new Date().toISOString(),
      }));
    },
    enabled: content.length > 0,
  });

  const hasContent = useMemo(() => Boolean(title.trim() && content.trim()), [title, content]);

  // Handle delete
  const handleDelete = async () => {
    if (onDelete) {
      await onDelete();
      setShowDeleteConfirm(false);
    }
  };

  // Handle collaboration toggle
  const handleCollaborationToggle = async (enabled: boolean, settings?: CollaborationSettings) => {
    if (!storyId) return;

    if (enabled && settings) {
      try {
        // Save current story first
        await onSave();
        
        // Create Chain project
        const projectId = await createProject(
          storyId,
          title || 'Untitled',
          genre || 'General',
          settings
        );
        
        setCollaborationEnabled(true);
        showToast('Collaboration enabled! Redirecting to Chain project...', 'success');
        
        // Redirect to project page
        setTimeout(() => {
          navigate(`/chains/projects/${projectId}`);
        }, 1500);
        
      } catch (error) {
        console.error('Error enabling collaboration:', error);
        showToast('Failed to enable collaboration', 'error');
      }
    } else {
      // Disable collaboration
      setCollaborationEnabled(false);
      showToast('Collaboration disabled', 'success');
    }
  };

  // Get current genre atmosphere
  const atmosphere = useMemo(() => getGenreAtmosphere(genre), [genre]);
  const allGenres = useMemo(() => getAllGenres(), []);

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
          {/* Vintage paper texture overlay */}
          <div 
            className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Subtle genre atmosphere (reduced intensity) */}
          <div className="opacity-20">
            <GenreAtmosphereBackground genre={genre} intensity="low" />
          </div>

          <div className="relative flex h-screen">
            {/* Sidebar - Writing Tools & Stats */}
            <AnimatePresence>
              {showSidebar && (
                <motion.aside
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="w-80 border-r border-amber-900/20 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 backdrop-blur-sm overflow-y-auto"
                  style={{
                    boxShadow: '4px 0 20px rgba(0,0,0,0.5), inset -1px 0 0 rgba(212,196,168,0.1)',
                  }}
                >
                  <div className="p-6 space-y-6">
                    {/* Stats Panel - Vintage Counter Style */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-widest text-amber-900/60 font-mono border-b border-amber-900/20 pb-2">
                        ⚙ Statistics
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <StatCard label="Words" value={stats.words.toLocaleString()} />
                        <StatCard label="Pages" value={stats.pages} />
                        <StatCard label="Paragraphs" value={stats.paragraphs} />
                        <StatCard label="Sentences" value={stats.sentences} />
                      </div>
                      <div className="pt-2 border-t border-amber-900/20">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-amber-900/60 font-mono">Reading time</span>
                          <span className="text-amber-200/80 font-mono tabular-nums">{stats.readingTime} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Writing Goals */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-widest text-amber-900/60 font-mono border-b border-amber-900/20 pb-2">
                        ⏱ Daily Goal
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

                    {/* Genre - Vintage Category Selector */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-widest text-amber-900/60 font-mono border-b border-amber-900/20 pb-2">
                        📚 Genre
                      </h3>
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {allGenres.map((g) => {
                          const genreAtmo = getGenreAtmosphere(g);
                          const isSelected = genre === g;
                          return (
                            <button
                              key={g}
                              onClick={() => onGenreChange(g)}
                              className={`px-3 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all
                                ${isSelected
                                  ? 'bg-amber-900/30 text-amber-200 border-2 border-amber-700/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]'
                                  : 'bg-black/30 text-amber-900/60 border border-amber-900/20 hover:border-amber-800/40 hover:text-amber-200/70'
                                }`}
                            >
                              {isSelected && '▸ '}{genreAtmo.name}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Current Genre Info - Vintage Card Style */}
                      <div className="mt-3 p-3 rounded bg-black/40 border border-amber-900/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]">
                        <p className="text-xs font-mono uppercase tracking-wider mb-1 text-amber-200/90">
                          ▸ {atmosphere.name}
                        </p>
                        <p className="text-xs text-amber-900/60 font-mono">
                          {atmosphere.ambiance}
                        </p>
                      </div>
                    </div>

                    {/* Blurb - Vintage Synopsis Card */}
                    {onBlurbChange && (
                      <div className="space-y-3">
                        <h3 className="text-xs uppercase tracking-widest text-amber-900/60 font-mono border-b border-amber-900/20 pb-2">
                          📝 Synopsis
                        </h3>
                        <textarea
                          value={blurb || ''}
                          onChange={(e) => onBlurbChange(e.target.value)}
                          placeholder="[Brief description of your manuscript...]"
                          rows={4}
                          maxLength={300}
                          className="w-full px-3 py-2 bg-black/40 border border-amber-900/30 rounded
                                   text-sm text-amber-100/90 font-mono placeholder-zinc-700
                                   focus:outline-none focus:ring-2 focus:ring-amber-900/30 focus:border-amber-800/40 resize-none
                                   shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] text-amber-900/60 font-mono uppercase tracking-wider">
                            Character Count
                          </p>
                          <p className="text-xs text-amber-200/80 font-mono tabular-nums">
                            {(blurb || '').length}/300
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Collaboration Toggle - Vintage Network Style */}
                    {storyId && (
                      <div className="space-y-3 pt-4 border-t border-amber-900/20">
                        <h3 className="text-xs uppercase tracking-widest text-amber-900/60 font-mono border-b border-amber-900/20 pb-2">
                          🔗 Collaboration
                        </h3>
                        {!title.trim() ? (
                          <p className="text-xs text-amber-900/60 font-mono">
                            [Save manuscript with title first]
                          </p>
                        ) : (
                          <CollaborationToggle
                            isEnabled={collaborationEnabled}
                            onToggle={handleCollaborationToggle}
                          />
                        )}
                      </div>
                    )}

                    {/* Auto-save status - Vintage Indicator */}
                    <div className="pt-4 border-t border-amber-900/20">
                      <div className="flex items-center gap-2 text-xs px-3 py-2 bg-black/40 border border-amber-900/30 rounded">
                        {autoSave.status === 'saving' && (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-3 h-3 border-2 border-amber-700 border-t-transparent rounded-full"
                            />
                            <span className="text-amber-900/60 font-mono uppercase tracking-wider">Saving...</span>
                          </>
                        )}
                        {autoSave.status === 'saved' && (
                          <>
                            <div className="w-3 h-3 rounded-full bg-green-700/80 shadow-[0_0_8px_rgba(21,128,61,0.6)]" />
                            <span className="text-amber-900/60 font-mono uppercase tracking-wider">Saved</span>
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
              {/* Header - Vintage Word Processor Style */}
              <header className="border-b border-amber-900/20 bg-gradient-to-r from-zinc-900/95 to-zinc-800/95 backdrop-blur-sm"
                style={{
                  boxShadow: '0 2px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,196,168,0.05)',
                }}>
                <div className="px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={onCancel}
                      className="flex items-center gap-2 text-sm text-amber-200/70 hover:text-amber-100 transition-colors font-mono"
                    >
                      <span>←</span>
                      <span className="uppercase tracking-wider">Library</span>
                    </button>
                    <div className="h-4 w-px bg-amber-900/30" />
                    <button
                      onClick={() => setShowSidebar(!showSidebar)}
                      className="text-xs text-amber-900/60 hover:text-amber-200/80 transition-colors font-mono uppercase tracking-wider"
                    >
                      [{showSidebar ? '−' : '+'} Tools]
                    </button>
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-xs text-amber-900/60 hover:text-amber-200/80 transition-colors font-mono uppercase tracking-wider"
                    >
                      [{showPreview ? '−' : '+'} Preview]
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setFocusModeActive(true)}
                      className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-amber-900/60 hover:text-amber-200/80 transition-colors"
                    >
                      [Focus]
                    </button>
                    
                    {storyId && onDelete && (
                      <>
                        <div className="h-4 w-px bg-amber-900/30" />
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-red-900/60 hover:text-red-400 transition-colors"
                        >
                          [Delete]
                        </button>
                      </>
                    )}
                    
                    <div className="h-4 w-px bg-amber-900/30" />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onCancel}
                      className="px-4 py-2 text-sm font-mono uppercase tracking-wider text-amber-200/60 hover:text-amber-100 transition-colors
                               border border-amber-900/30 rounded hover:border-amber-800/50"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onSave}
                      disabled={!hasContent || isSaving}
                      className="relative px-6 py-2 rounded text-sm font-mono uppercase tracking-wider
                               bg-gradient-to-b from-amber-800 to-amber-900
                               text-amber-50 border-2 border-amber-700/60
                               shadow-[0_3px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                               hover:from-amber-700 hover:to-amber-800
                               active:shadow-[0_1px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                               active:translate-y-[2px]
                               transition-all
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0"
                    >
                      {isSaving ? 'Publishing...' : storyId ? 'Update' : 'Publish'}
                    </motion.button>
                  </div>
                </div>
              </header>

              {/* Writing Area */}
              <div className="flex-1 overflow-y-auto">
                <div className={`mx-auto px-12 py-12 ${showPreview ? 'max-w-7xl' : 'max-w-4xl'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* Title - Typewriter Style */}
                    <div className="relative">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        placeholder="Untitled Manuscript"
                        className="w-full px-0 py-3 bg-transparent border-none
                                 text-4xl md:text-5xl font-serif text-amber-100/90 placeholder-zinc-800
                                 focus:outline-none focus:ring-0
                                 tracking-wide"
                        style={{
                          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                        }}
                        autoFocus
                      />
                      {/* Underline decoration */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-900/30 to-transparent" />
                    </div>

                    {/* Formatting Toolbar - Vintage Word Processor Style */}
                    <div className="flex items-center gap-1 pb-3 border-b border-amber-900/20 bg-zinc-900/30 -mx-4 px-4 py-2 rounded"
                      style={{
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                      }}>
                      <ToolbarButton onClick={() => applyFormatting('**')} title="Bold (Ctrl+B)">
                        <span className="font-bold">B</span>
                      </ToolbarButton>
                      <ToolbarButton onClick={() => applyFormatting('*')} title="Italic (Ctrl+I)">
                        <span className="italic">I</span>
                      </ToolbarButton>
                      <ToolbarButton onClick={() => applyFormatting('~~')} title="Strikethrough">
                        <span className="line-through">S</span>
                      </ToolbarButton>
                      <div className="w-px h-6 bg-amber-900/30 mx-1" />
                      <ToolbarButton onClick={insertChapterBreak} title="Insert Chapter Break">
                        <span className="text-xs font-mono">§</span>
                      </ToolbarButton>
                      <div className="flex-1" />
                      {/* Vintage counter display */}
                      <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-amber-900/30 rounded font-mono text-xs">
                        <span className="text-amber-900/60">WC:</span>
                        <span className="text-amber-200/80 tabular-nums">{stats.words.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Content Editor (with optional preview) */}
                    <div className={showPreview ? 'grid grid-cols-2 gap-6' : ''}>
                      {/* Editor - Vintage Typewriter Paper Style */}
                      <div className="relative">
                        {showPreview && (
                          <div className="text-xs text-amber-900/60 mb-2 font-mono uppercase tracking-wider">
                            ⌨ Editor
                          </div>
                        )}
                        {/* Paper texture background */}
                        <div className="absolute inset-0 rounded-lg opacity-[0.02] pointer-events-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper)' /%3E%3C/svg%3E")`,
                          }}
                        />
                        <textarea
                          ref={textareaRef}
                          value={content}
                          onChange={(e) => onContentChange(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Once upon a time... [Begin typing your manuscript]"
                          className="w-full min-h-[700px] px-6 py-6 bg-zinc-900/20 border border-amber-900/20 rounded-lg
                                   text-lg leading-relaxed font-serif text-amber-50/90 placeholder-zinc-700
                                   focus:outline-none focus:ring-2 focus:ring-amber-900/30 focus:border-amber-800/40 resize-none
                                   shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"
                          style={{
                            lineHeight: '2',
                            letterSpacing: '0.02em',
                            textShadow: '0 1px 1px rgba(0,0,0,0.3)',
                          }}
                        />
                        {/* Vintage paper edge effect */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-900/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-900/20 to-transparent" />
                      </div>

                      {/* Live Preview - Printed Page Style */}
                      {showPreview && (
                        <div>
                          <div className="text-xs text-amber-900/60 mb-2 font-mono uppercase tracking-wider">
                            📄 Preview
                          </div>
                          <div className="min-h-[700px] px-8 py-8 bg-amber-50/5 border border-amber-900/20 rounded-lg
                                        text-lg leading-relaxed font-serif text-amber-100/90 prose prose-invert max-w-none overflow-y-auto
                                        shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"
                               style={{
                                 lineHeight: '2',
                                 letterSpacing: '0.02em',
                               }}>
                            {content ? renderRichText(content) : (
                              <p className="text-zinc-700 font-mono text-sm">[Preview will render here...]</p>
                            )}
                          </div>
                        </div>
                      )}
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
            </div>
          </div>

          {/* Delete Confirmation Modal - Vintage Warning Dialog */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
                />
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-red-900/60 rounded backdrop-blur-md
                             shadow-[0_0_60px_-10px_rgba(127,29,29,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)]
                             w-full max-w-md p-8"
                  >
                    {/* Warning header */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-red-900/30">
                      <div className="text-3xl">⚠️</div>
                      <h3 className="text-xl font-mono uppercase tracking-wider text-red-400">
                        Warning
                      </h3>
                    </div>
                    
                    <p className="text-amber-200/80 font-mono text-sm mb-2">
                      DELETE MANUSCRIPT?
                    </p>
                    <p className="text-amber-900/60 font-mono text-xs mb-6 leading-relaxed">
                      This operation is irreversible. All data will be permanently erased from the system.
                    </p>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 px-4 py-2 border border-amber-900/40 rounded 
                                 text-amber-200/80 font-mono text-xs uppercase tracking-wider
                                 hover:bg-amber-900/10 hover:border-amber-800/60 transition-colors"
                      >
                        [Cancel]
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex-1 px-4 py-2 rounded text-red-100 font-mono text-xs uppercase tracking-wider
                                 bg-gradient-to-b from-red-900 to-red-950 border-2 border-red-800/60
                                 shadow-[0_3px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                                 hover:from-red-800 hover:to-red-900
                                 active:shadow-[0_1px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                                 active:translate-y-[2px] transition-all"
                      >
                        [Delete]
                      </button>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
        </section>
      )}
    </>
  );
};

// Helper Components - Vintage Style
const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="px-3 py-2 rounded bg-black/40 border border-amber-900/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]">
    <div className="text-[10px] text-amber-900/60 font-mono uppercase tracking-wider mb-1">{label}</div>
    <div className="text-lg font-mono text-amber-200/90 tabular-nums">{value}</div>
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
    className="px-3 py-1.5 text-sm text-amber-900/60 hover:text-amber-200/90 
             hover:bg-amber-900/10 rounded transition-colors
             border border-transparent hover:border-amber-900/30
             active:bg-black/30"
  >
    {children}
  </button>
);

/**
 * Compose Page - Modern Vintage Writing Studio
 * Polished retro-modern aesthetic with smooth UX
 * Nostalgic yet sophisticated writing experience
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationProps } from "../types";
// useAuth available but not currently used
import { BackButton } from "../components/shared/NavigationButtons";
import { useUserStories } from "../hooks/useUserStories";
import { useNavigation } from "../hooks/useNavigation";

interface ComposeProps extends NavigationProps {}

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export const Compose: React.FC<ComposeProps> = ({ go }) => {
  const { createStory } = useUserStories();
  const { goTo } = useNavigation();
  
  const [story, setStory] = useState({
    title: "",
    summary: "",
    genre: "horror",
    chapters: [{ id: "ch1", title: "Chapter 1", content: "" }] as Chapter[],
  });
  
  const [currentChapterId, setCurrentChapterId] = useState("ch1");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [showTips, setShowTips] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Calculate word count
  useEffect(() => {
    const currentChapter = story.chapters.find(ch => ch.id === currentChapterId);
    if (currentChapter) {
      const words = currentChapter.content.trim().split(/\s+/).filter(w => w.length > 0).length;
      setWordCount(words);
    }
  }, [story.chapters, currentChapterId]);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (story.title || story.chapters[0].content) {
        localStorage.setItem('compose-draft', JSON.stringify(story));
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [story]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('compose-draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setStory(parsed);
        setCurrentChapterId(parsed.chapters[0]?.id || "ch1");
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, []);

  const currentChapter = story.chapters.find(ch => ch.id === currentChapterId);

  const handleAddChapter = () => {
    const newId = `ch${story.chapters.length + 1}`;
    const newChapter: Chapter = {
      id: newId,
      title: `Chapter ${story.chapters.length + 1}`,
      content: ""
    };
    setStory(prev => ({
      ...prev,
      chapters: [...prev.chapters, newChapter]
    }));
    setCurrentChapterId(newId);
  };

  const handleChapterChange = (field: "title" | "content", value: string) => {
    setStory(prev => ({
      ...prev,
      chapters: prev.chapters.map(ch =>
        ch.id === currentChapterId ? { ...ch, [field]: value } : ch
      )
    }));
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (story.chapters.length === 1) {
      setToastMessage("You need at least one chapter!");
      setShowToast(true);
      return;
    }
    
    const chapterIndex = story.chapters.findIndex(ch => ch.id === chapterId);
    setStory(prev => ({
      ...prev,
      chapters: prev.chapters.filter(ch => ch.id !== chapterId)
    }));
    
    // Switch to previous chapter or first chapter
    const newChapterId = story.chapters[chapterIndex - 1]?.id || story.chapters[0]?.id;
    setCurrentChapterId(newChapterId);
  };

  const handlePublish = async () => {
    if (!story.title.trim()) {
      setToastMessage("Please add a title!");
      setShowToast(true);
      return;
    }
    
    if (!story.chapters[0].content.trim()) {
      setToastMessage("Please write some content!");
      setShowToast(true);
      return;
    }

    setIsSaving(true);
    try {
      // Combine all chapters into one content string
      const fullContent = story.chapters
        .map(ch => `# ${ch.title}\n\n${ch.content}`)
        .join('\n\n---\n\n');

      await createStory({
        title: story.title,
        content: fullContent,
        genre: story.genre as any,
        blurb: story.summary || undefined,
      });

      setToastMessage("Story published successfully!");
      setShowToast(true);
      localStorage.removeItem('compose-draft');
      
      setTimeout(() => {
        goTo.stories();
      }, 1500);
    } catch (error) {
      console.error('Failed to publish:', error);
      setToastMessage("Failed to publish story");
      setShowToast(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('compose-draft', JSON.stringify(story));
    setToastMessage("Draft saved!");
    setShowToast(true);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveDraft();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handlePublish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [story]);

  // Text formatting helpers
  const applyFormatting = useCallback((prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = currentChapter?.content || '';
    const selectedText = text.substring(start, end);
    
    const newContent = 
      text.substring(0, start) + 
      prefix + selectedText + suffix + 
      text.substring(end);
    
    handleChapterChange("content", newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  }, [currentChapter, handleChapterChange]);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Gothic background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 opacity-90" />
      
      {/* Ambient fog effect */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-transparent to-purple-950/20" />
      </div>
      
      {/* Subtle paper texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Main container */}
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-7xl"
        >
          {/* Header bar - sleek modern vintage */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton onClick={() => go("stories")} variant="ghost" />
              <div>
                <h1 className="text-2xl font-bold tracking-wide"
                  style={{
                    color: '#d4c4a8',
                    textShadow: '0 0 20px rgba(212, 196, 168, 0.3)'
                  }}>
                  Writing Studio
                </h1>
                <p className="text-sm mt-0.5"
                  style={{ color: 'rgba(212, 196, 168, 0.5)' }}>
                  {story.title || "Untitled Story"} • {story.chapters.length} {story.chapters.length === 1 ? 'chapter' : 'chapters'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveDraft}
                className="px-4 py-2 rounded-lg border text-sm font-medium shadow-lg transition-all"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderColor: 'rgba(212, 196, 168, 0.2)',
                  color: 'rgba(212, 196, 168, 0.8)',
                }}
              >
                Save Draft
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePublish}
                disabled={isSaving}
                className="px-6 py-2 rounded-lg text-sm font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{
                  background: 'linear-gradient(to right, #d4af37, #c9a227)',
                  color: '#000',
                }}
              >
                {isSaving ? 'Publishing...' : 'Publish Story'}
              </motion.button>
            </div>
          </div>

          {/* Main editor window */}
          <div className="backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderWidth: '1px',
              borderColor: 'rgba(212, 196, 168, 0.1)',
            }}>
            {/* Toolbar */}
            <div className="border-b px-4 py-3 flex items-center justify-between backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderColor: 'rgba(212, 196, 168, 0.1)',
              }}>
              <div className="flex items-center gap-2">
                <ToolbarButton onClick={() => applyFormatting('**')} title="Bold (Ctrl+B)">
                  <span className="font-bold">B</span>
                </ToolbarButton>
                <ToolbarButton onClick={() => applyFormatting('*')} title="Italic (Ctrl+I)">
                  <span className="italic">I</span>
                </ToolbarButton>
                <ToolbarButton onClick={() => applyFormatting('~~')} title="Strikethrough">
                  <span className="line-through">S</span>
                </ToolbarButton>
                <div className="w-px h-5 mx-1" style={{ backgroundColor: 'rgba(212, 196, 168, 0.2)' }} />
                <ToolbarButton onClick={handleAddChapter} title="Add Chapter">
                  <span>+ Chapter</span>
                </ToolbarButton>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2" style={{ color: 'rgba(212, 196, 168, 0.5)' }}>
                  <span className="text-xs">Words:</span>
                  <span className="font-mono font-bold" style={{ color: '#d4af37' }}>{wordCount}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: 'rgba(212, 196, 168, 0.5)' }}>
                  <span className="text-xs">Characters:</span>
                  <span className="font-mono font-bold" style={{ color: '#d4af37' }}>{currentChapter?.content.length || 0}</span>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="grid lg:grid-cols-[1fr_320px]">
              {/* Main editor */}
              <div className="p-8 min-h-[700px]">
                {/* Story title */}
                <input
                  type="text"
                  value={story.title}
                  onChange={(e) => setStory(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Untitled Story"
                  className="w-full mb-8 px-0 py-3 text-4xl font-bold bg-transparent border-none outline-none transition-colors"
                  style={{ 
                    fontFamily: 'Georgia, serif',
                    color: '#d4c4a8',
                    textShadow: '0 0 20px rgba(212, 196, 168, 0.2)',
                  }}
                />

                {/* Chapter tabs */}
                <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                  {story.chapters.map((ch) => (
                    <motion.button
                      key={ch.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentChapterId(ch.id)}
                      className="relative px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-t-lg transition-all"
                      style={{
                        backgroundColor: currentChapterId === ch.id ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)',
                        color: currentChapterId === ch.id ? '#d4af37' : 'rgba(212, 196, 168, 0.5)',
                      }}
                    >
                      {ch.title}
                      {currentChapterId === ch.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: '#d4af37' }}
                        />
                      )}
                    </motion.button>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddChapter}
                    className="px-3 py-2.5 text-sm font-medium transition-colors"
                    style={{ color: 'rgba(212, 196, 168, 0.5)' }}
                  >
                    + Add
                  </motion.button>
                </div>

                {/* Chapter title editor */}
                {currentChapter && (
                  <motion.div
                    key={currentChapterId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <input
                      type="text"
                      value={currentChapter.title}
                      onChange={(e) => handleChapterChange("title", e.target.value)}
                      className="w-full px-4 py-2.5 text-xl font-semibold border rounded-lg outline-none transition-all"
                      placeholder="Chapter Title"
                      style={{ 
                        fontFamily: 'Georgia, serif',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderColor: 'rgba(212, 196, 168, 0.2)',
                        color: '#d4c4a8',
                      }}
                    />
                  </motion.div>
                )}

                {/* Content editor */}
                {currentChapter && (
                  <motion.div
                    key={`content-${currentChapterId}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    <textarea
                      ref={textareaRef}
                      value={currentChapter.content}
                      onChange={(e) => handleChapterChange("content", e.target.value)}
                      placeholder="Once upon a time..."
                      className="w-full min-h-[500px] px-6 py-5 text-lg leading-relaxed border rounded-xl outline-none resize-none transition-all"
                      style={{
                        fontFamily: 'Georgia, serif',
                        lineHeight: '1.8',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(212, 196, 168, 0.15)',
                        color: '#d4c4a8',
                      }}
                    />
                    {/* Subtle paper lines effect */}
                    <div className="absolute inset-0 pointer-events-none rounded-xl opacity-[0.015]"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 28px, rgba(212, 196, 168, 0.3) 28px, rgba(212, 196, 168, 0.3) 29px)',
                      }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="border-l p-6 space-y-6"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderColor: 'rgba(212, 196, 168, 0.1)',
                }}>
                {/* Story metadata */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#d4af37' }}>
                    Story Details
                  </h3>
                  
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(212, 196, 168, 0.6)' }}>
                      Genre
                    </label>
                    <select
                      value={story.genre}
                      onChange={(e) => setStory(prev => ({ ...prev, genre: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderColor: 'rgba(212, 196, 168, 0.2)',
                        color: '#d4c4a8',
                      }}
                    >
                      <option value="horror">Horror</option>
                      <option value="thriller">Thriller</option>
                      <option value="mystery">Mystery</option>
                      <option value="romance">Romance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(212, 196, 168, 0.6)' }}>
                      Summary
                    </label>
                    <textarea
                      value={story.summary}
                      onChange={(e) => setStory(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="Brief description of your story..."
                      rows={4}
                      className="w-full px-3 py-2 text-sm border rounded-lg outline-none resize-none transition-colors"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderColor: 'rgba(212, 196, 168, 0.2)',
                        color: '#d4c4a8',
                      }}
                    />
                  </div>
                </div>

                {/* Statistics */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#d4af37' }}>
                    Statistics
                  </h3>
                  <div className="space-y-2">
                    <StatRow label="Chapters" value={story.chapters.length} />
                    <StatRow label="Words" value={wordCount} />
                    <StatRow label="Characters" value={currentChapter?.content.length || 0} />
                    <StatRow label="Reading Time" value={`${Math.ceil(wordCount / 200)} min`} />
                  </div>
                </div>

                {/* Chapter management */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#d4af37' }}>
                    Chapters
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-track-transparent"
                    style={{ scrollbarColor: 'rgba(212, 196, 168, 0.3) transparent' }}>
                    {story.chapters.map((ch, idx) => (
                      <div
                        key={ch.id}
                        className="flex items-center justify-between p-2 rounded-lg transition-all border"
                        style={{
                          backgroundColor: currentChapterId === ch.id ? 'rgba(212, 175, 55, 0.1)' : 'rgba(0, 0, 0, 0.3)',
                          borderColor: currentChapterId === ch.id ? 'rgba(212, 175, 55, 0.3)' : 'transparent',
                        }}
                      >
                        <button
                          onClick={() => setCurrentChapterId(ch.id)}
                          className="flex-1 text-left text-sm transition-colors"
                          style={{ color: currentChapterId === ch.id ? '#d4af37' : 'rgba(212, 196, 168, 0.7)' }}
                        >
                          {idx + 1}. {ch.title}
                        </button>
                        {story.chapters.length > 1 && (
                          <button
                            onClick={() => handleDeleteChapter(ch.id)}
                            className="ml-2 transition-colors"
                            style={{ color: 'rgba(212, 196, 168, 0.4)' }}
                            title="Delete chapter"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <AnimatePresence>
                  {showTips && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border rounded-lg p-4"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.05)',
                        borderColor: 'rgba(212, 175, 55, 0.2)',
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-bold" style={{ color: '#d4af37' }}>
                          Quick Tips
                        </h3>
                        <button
                          onClick={() => setShowTips(false)}
                          className="transition-colors"
                          style={{ color: 'rgba(212, 196, 168, 0.5)' }}
                        >
                          ×
                        </button>
                      </div>
                      <ul className="space-y-1 text-xs" style={{ color: 'rgba(212, 196, 168, 0.6)' }}>
                        <li>• Ctrl+S to save draft</li>
                        <li>• Ctrl+Enter to publish</li>
                        <li>• Auto-saves every 2 seconds</li>
                        <li>• Use ** for bold, * for italic</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="border rounded-xl shadow-2xl p-4 min-w-[320px] backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                borderColor: 'rgba(212, 196, 168, 0.3)',
              }}>
              <div className="flex items-center gap-3">
                <p className="flex-1 text-sm font-medium" style={{ color: '#d4c4a8' }}>{toastMessage}</p>
                <button
                  onClick={() => setShowToast(false)}
                  className="transition-colors font-bold"
                  style={{ color: 'rgba(212, 196, 168, 0.5)' }}
                >
                  ×
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Helper Components
const ToolbarButton: React.FC<{
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, title, children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    title={title}
    className="px-3 py-1.5 text-sm rounded-lg transition-all"
    style={{ color: 'rgba(212, 196, 168, 0.6)' }}
  >
    {children}
  </motion.button>
);

const StatRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex items-center justify-between px-3 py-2 rounded-lg"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
    <span className="text-xs" style={{ color: 'rgba(212, 196, 168, 0.5)' }}>{label}</span>
    <span className="text-sm font-mono font-bold" style={{ color: '#d4af37' }}>{value}</span>
  </div>
);

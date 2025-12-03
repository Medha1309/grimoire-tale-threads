import React, { useRef, useState, useEffect } from "react";

type SavedQuote = {
  id: string;
  text: string;
  timestamp: string;
};

type LinearReaderProps = {
  title: string;
  author: string;
  body: string;
  genre?: string;
  onSaveQuote?: (quote: SavedQuote) => void;
  onBack?: () => void;
};

export const LinearReader: React.FC<LinearReaderProps> = ({
  title,
  author,
  body,
  genre,
  onSaveQuote,
  onBack,
}) => {
  const [saved, setSaved] = useState<SavedQuote[]>([]);
  const [tooltip, setTooltip] = useState<{
    text: string;
    top: number;
    left: number;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState(17);
  const [lineHeight, setLineHeight] = useState(1.7);
  const [showSettings, setShowSettings] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showQuotesPanel, setShowQuotesPanel] = useState(true);

  const articleRef = useRef<HTMLDivElement | null>(null);

  // Calculate word count and reading time
  useEffect(() => {
    const words = body.trim().split(/\s+/).length;
    setWordCount(words);
    const estimatedMinutes = Math.ceil(words / 200); // Average reading speed
    setReadingTime(estimatedMinutes);
  }, [body]);

  // Track scroll progress and current paragraph
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      // Track which paragraph is in view
      if (articleRef.current) {
        const paragraphs = articleRef.current.querySelectorAll('p');
        paragraphs.forEach((p, idx) => {
          const rect = p.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= windowHeight / 2) {
            setCurrentParagraph(idx);
          }
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + [ to decrease font size
      if ((e.ctrlKey || e.metaKey) && e.key === '[') {
        e.preventDefault();
        setFontSize(prev => Math.max(14, prev - 1));
      }
      // Ctrl/Cmd + ] to increase font size
      if ((e.ctrlKey || e.metaKey) && e.key === ']') {
        e.preventDefault();
        setFontSize(prev => Math.min(24, prev + 1));
      }
      // Ctrl/Cmd + \ to toggle quotes panel
      if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
        e.preventDefault();
        setShowQuotesPanel(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleMouseUp = () => {
    const root = articleRef.current;
    if (!root) return;

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      setTooltip(null);
      return;
    }

    const text = sel.toString().trim();
    if (!text || text.length < 10) {
      setTooltip(null);
      return;
    }

    // Ensure selection is inside article
    let node: Node | null = sel.anchorNode;
    let inside = false;
    while (node) {
      if (node === root) {
        inside = true;
        break;
      }
      node = node.parentNode;
    }
    if (!inside) {
      setTooltip(null);
      return;
    }

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0) {
      setTooltip(null);
      return;
    }

    setTooltip({
      text,
      top: rect.top + window.scrollY - 36,
      left: rect.left + window.scrollX + rect.width / 2,
    });
  };

  const saveQuote = () => {
    if (!tooltip) return;

    const now = new Date();
    const quote: SavedQuote = {
      id: `q-${Date.now()}`,
      text: tooltip.text,
      timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setSaved((prev) => [quote, ...prev]);
    onSaveQuote?.(quote);

    setTooltip(null);
    window.getSelection()?.removeAllRanges();

    setToast("Quote saved");
    setTimeout(() => setToast(null), 2000);
  };

  const paragraphs = body.split('\n\n').filter(p => p.trim());

  return (
    <div className="min-h-screen bg-black text-slate-100 flex relative">
      {/* Floating toolbar */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {/* Reading stats */}
        <div className="bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-[10px] font-mono text-slate-400 backdrop-blur">
          <div className="flex items-center gap-3">
            <span>{Math.round(scrollProgress)}%</span>
            <span>•</span>
            <span>{readingTime} min</span>
            <span>•</span>
            <span>{wordCount.toLocaleString()} words</span>
          </div>
        </div>

        {/* Settings button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="bg-slate-900/90 border border-slate-700 rounded-lg p-2 hover:border-slate-500 transition-colors backdrop-blur"
          title="Reading settings (Ctrl+,)"
        >
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Toggle quotes panel */}
        <button
          onClick={() => setShowQuotesPanel(!showQuotesPanel)}
          className="hidden lg:block bg-slate-900/90 border border-slate-700 rounded-lg p-2 hover:border-slate-500 transition-colors backdrop-blur"
          title="Toggle quotes panel (Ctrl+\)"
        >
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="fixed top-20 right-4 z-40 bg-slate-900/95 border border-slate-700 rounded-xl p-4 w-64 backdrop-blur shadow-2xl">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Reading Settings</h3>
          
          {/* Font size */}
          <div className="mb-4">
            <label className="text-[10px] font-mono text-slate-500 mb-2 block">
              Font Size: {fontSize}px
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(prev => Math.max(14, prev - 1))}
                className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs hover:border-slate-500 transition-colors"
              >
                A-
              </button>
              <input
                type="range"
                min="14"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="flex-1"
              />
              <button
                onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs hover:border-slate-500 transition-colors"
              >
                A+
              </button>
            </div>
          </div>

          {/* Line height */}
          <div className="mb-4">
            <label className="text-[10px] font-mono text-slate-500 mb-2 block">
              Line Spacing: {lineHeight.toFixed(1)}
            </label>
            <input
              type="range"
              min="1.4"
              max="2.2"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Keyboard shortcuts */}
          <div className="pt-3 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-600 mb-2">Shortcuts:</p>
            <div className="space-y-1 text-[9px] font-mono text-slate-600">
              <div>Ctrl+[ / ] : Font size</div>
              <div>Ctrl+\ : Toggle quotes</div>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SCROLL SPINE */}
      <div className="hidden md:flex w-10 border-r border-slate-900 relative">
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-slate-800/70" />
        <div
          className="absolute left-1/2 w-[2px] bg-amber-500/60 transition-all duration-150 shadow-[0_0_8px_rgba(251,191,36,0.3)]"
          style={{
            top: 0,
            height: `${scrollProgress}%`,
          }}
        />
        {/* Progress percentage indicator */}
        {scrollProgress > 5 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-amber-500/40 rounded-full w-6 h-6 flex items-center justify-center text-[8px] font-mono text-amber-400"
            style={{ top: `${scrollProgress}%` }}
          >
            {Math.round(scrollProgress)}
          </div>
        )}
      </div>

      {/* CENTER READER */}
      <div className="flex-1 flex justify-center px-6 py-10">
        <article
          ref={articleRef}
          onMouseUp={handleMouseUp}
          className="max-w-3xl w-full"
        >
          {/* Header */}
          <header className="mb-12 pb-6 border-b border-slate-900">
            {onBack && (
              <button
                onClick={onBack}
                className="mb-6 text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors"
              >
                ← Back
              </button>
            )}
            <h1 className="text-3xl font-serif text-slate-100 mb-2">{title}</h1>
            <div className="flex items-center gap-3 text-sm font-mono text-slate-500">
              <span>by {author}</span>
              {genre && (
                <>
                  <span>•</span>
                  <span>{genre}</span>
                </>
              )}
            </div>
          </header>

          {/* Body with interactive paragraphs */}
          <div className="space-y-6 select-text">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className={`transition-all duration-300 ${
                  currentParagraph === idx
                    ? 'text-slate-100 opacity-100'
                    : 'text-slate-300 opacity-70'
                }`}
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: lineHeight,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Reading progress indicator */}
          <div className="mt-12 pt-6 border-t border-slate-900">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
              <span>Paragraph {currentParagraph + 1} of {paragraphs.length}</span>
              <span>{Math.round((currentParagraph / paragraphs.length) * 100)}% complete</span>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-900 text-center">
            <p className="text-sm font-mono text-slate-600">End of story</p>
            {onBack && (
              <button
                onClick={onBack}
                className="mt-4 px-6 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-slate-300 hover:border-slate-500 transition-colors"
              >
                Return to Library
              </button>
            )}
          </footer>
        </article>

        {/* FLOATING ACTION: SAVE QUOTE */}
        {tooltip && (
          <button
            onClick={saveQuote}
            className="fixed z-30 -translate-x-1/2 bg-slate-900 border border-slate-600/60 text-slate-200 text-[11px] font-mono px-3 py-1.5 rounded-full shadow-[0_0_18px_rgba(20,25,35,0.8)] hover:border-slate-400 transition"
            style={{
              top: tooltip.top,
              left: tooltip.left,
            }}
          >
            Save Quote
          </button>
        )}

        {/* TOAST */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-600/50 px-4 py-2 text-[11px] font-mono rounded-full text-slate-200 shadow-[0_0_20px_rgba(15,23,42,0.9)]">
            {toast}
          </div>
        )}
      </div>

      {/* RIGHT SAVED QUOTES PANEL */}
      {showQuotesPanel && (
        <div className="hidden lg:flex w-80 border-l border-slate-900 px-6 py-8 flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase">
              Saved Quotes
            </h2>
            <span className="text-[10px] font-mono text-slate-600">
              {saved.length}
            </span>
          </div>
          
          <div className="space-y-3 overflow-auto pr-2 flex-1">
            {saved.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-slate-800 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <p className="text-xs text-slate-600 font-mono">
                  Highlight text to save quotes
                </p>
                <p className="text-[10px] text-slate-700 font-mono mt-2">
                  Your saved passages will appear here
                </p>
              </div>
            )}
            {saved.map((q, idx) => (
              <div
                key={q.id}
                className="group border border-slate-800 rounded-xl p-3 bg-black/40 hover:border-slate-700 hover:bg-slate-900/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[9px] font-mono text-slate-600">
                    Quote {saved.length - idx}
                  </span>
                  <span className="text-[9px] font-mono text-slate-600">
                    {q.timestamp}
                  </span>
                </div>
                <p className="text-sm text-slate-200 italic leading-relaxed">
                  &ldquo;{q.text.length > 150 ? q.text.substring(0, 150) + '...' : q.text}&rdquo;
                </p>
                <button
                  onClick={() => {
                    setSaved(prev => prev.filter(quote => quote.id !== q.id));
                    setToast('Quote removed');
                    setTimeout(() => setToast(null), 2000);
                  }}
                  className="mt-2 text-[9px] font-mono text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Export quotes button */}
          {saved.length > 0 && (
            <button
              onClick={() => {
                const text = saved.map((q, i) => `${i + 1}. "${q.text}" - ${q.timestamp}`).join('\n\n');
                navigator.clipboard.writeText(text);
                setToast('Quotes copied to clipboard');
                setTimeout(() => setToast(null), 2000);
              }}
              className="mt-4 w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-[11px] font-mono text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors"
            >
              Copy All Quotes
            </button>
          )}
        </div>
      )}
    </div>
  );
};

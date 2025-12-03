import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { executeCommand } from '../../utils/terminal/executor';
import { CommandResult } from '../../types/terminal';

interface BoudoirTerminalProps {
  onNavigate: (view: string) => void;
  onCommand?: (command: string) => void;
}

export const BoudoirTerminal: React.FC<BoudoirTerminalProps> = ({ onNavigate, onCommand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandResult[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Available commands for suggestions
  const availableCommands = [
    { cmd: 'help', desc: 'Show all available commands' },
    { cmd: 'open room diary', desc: 'Navigate to diary entries' },
    { cmd: 'open room write', desc: 'Start writing a new entry' },
    { cmd: 'open room scrapbook', desc: 'View your scrapbook' },
    { cmd: 'open room archive', desc: 'Browse archived entries' },
    { cmd: 'open room art', desc: 'Open art studio' },
    { cmd: 'clear', desc: 'Clear terminal output' },
    { cmd: 'ls', desc: 'List available rooms' },
  ];

  // Filter suggestions based on input
  const suggestions = input.trim()
    ? availableCommands.filter(({ cmd }) =>
        cmd.toLowerCase().startsWith(input.toLowerCase())
      )
    : [];

  // Hide hint after first command
  useEffect(() => {
    if (history.length > 0) {
      setShowHint(false);
    }
  }, [history.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmedInput = input.trim();
    
    try {
      // Add to command history
      setCommandHistory((prev) => [...prev, trimmedInput]);
      setHistoryIndex(-1);

      // Execute command
      const result = executeCommand(trimmedInput, { onNavigate });
      
      // Add to display history
      setHistory((prev) => [...prev, result]);
      
      // Expand to show result
      setIsExpanded(true);
      
      // Callback
      onCommand?.(trimmedInput);
      
      // Clear input
      setInput('');

      // Scroll to bottom
      setTimeout(() => {
        const container = document.getElementById('terminal-output');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 50);
    } catch (error) {
      console.error('Terminal error:', error);
      setHistory((prev) => [...prev, {
        command: trimmedInput,
        success: false,
        output: ['Error executing command', String(error)]
      }]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-3xl mx-auto mb-8 group"
    >
      {/* Script terminal */}
      <div 
        className={`relative rounded border shadow-2xl overflow-hidden transition-all duration-300 ${
          isFocused
            ? 'bg-zinc-900/95 border-fog-light/40 shadow-[0_0_30px_rgba(255,182,217,0.15)]'
            : 'bg-black/80 border-zinc-800/60 hover:border-zinc-700/80'
        } backdrop-blur-sm`}
      >
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}
        />

        {/* Terminal content */}
        <div className="relative">
          {/* Collapsible output */}
          <AnimatePresence>
            {isExpanded && history.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-b border-zinc-800/40"
              >
                <div 
                  id="terminal-output" 
                  className="px-4 pt-3 pb-3 space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700/30 scrollbar-track-transparent"
                  style={{ fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Dank Mono", monospace' }}
                >
                  {history.slice(-2).map((result, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-zinc-400 text-xs tracking-wide">
                        <span className="text-zinc-600">$</span> {result.command}
                      </div>
                      {result.output.map((line: string, j: number) => (
                        <div
                          key={j}
                          className={`text-xs pl-3 tracking-wide ${
                            result.success 
                              ? 'text-emerald-400/80' 
                              : 'text-rose-400/80'
                          }`}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input bar */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-3 relative">
            <span 
              className={`text-xs select-none transition-colors ${
                isFocused ? 'text-fog-light/60' : 'text-zinc-600'
              }`}
              style={{ fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Dank Mono", monospace' }}
              title="Current time"
            >
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
            <span 
              className={`text-sm select-none transition-colors ${
                isFocused ? 'text-fog-light' : 'text-zinc-600'
              }`}
              style={{ fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Dank Mono", monospace' }}
              title="Command prompt"
            >
              $
            </span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  setShowHint(false);
                  setIsFocused(true);
                  setShowSuggestions(input.length > 0);
                }}
                onBlur={() => {
                  setIsFocused(false);
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                placeholder="type 'help' or start typing..."
                className={`w-full bg-transparent outline-none text-sm tracking-wide transition-colors ${
                  isFocused 
                    ? 'text-zinc-100 placeholder-zinc-600' 
                    : 'text-zinc-300 placeholder-zinc-700'
                }`}
                style={{ fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Dank Mono", monospace' }}
                autoComplete="off"
                spellCheck={false}
                title="Type commands here. Press up/down arrows to navigate history"
              />
              
              {/* Command suggestions dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-sm border border-fog-light/30 rounded shadow-lg z-50"
                  >
                    {suggestions.slice(0, 5).map(({ cmd, desc }) => (
                      <button
                        key={cmd}
                        type="button"
                        onClick={() => {
                          setInput(cmd);
                          setShowSuggestions(false);
                          inputRef.current?.focus();
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-fog-light/10 transition-colors border-b border-zinc-800/50 last:border-0"
                      >
                        <div className="text-sm text-fog-light font-mono">{cmd}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Expand/collapse button */}
            {history.length > 0 && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`text-xs px-2 py-1 rounded transition-all ${
                  isFocused
                    ? 'text-fog-light hover:bg-fog-light/10'
                    : 'text-zinc-700 hover:text-zinc-500'
                }`}
                title={isExpanded ? 'Hide command output' : 'Show command output'}
              >
                {isExpanded ? '▼' : '▲'}
              </button>
            )}
            
            <motion.span
              animate={{ 
                opacity: isFocused ? [1, 0, 1] : [0.6, 0, 0.6],
                scale: isFocused ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className={`text-sm select-none transition-colors ${
                isFocused ? 'text-fog-light' : 'text-zinc-500'
              }`}
              style={{ fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Dank Mono", monospace' }}
              title="Terminal cursor"
            >
              ▊
            </motion.span>
          </form>
        </div>
      </div>

      {/* Enhanced hint with tooltips */}
      <AnimatePresence>
        {showHint && history.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 space-y-2"
          >
            <p
              className="text-center text-xs text-zinc-600 tracking-wide"
              style={{ fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Dank Mono", monospace' }}
            >
              Type 'help' for all commands or try these:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['open room diary', 'open room write', 'open room scrapbook', 'ls'].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => {
                    setInput(cmd);
                    inputRef.current?.focus();
                  }}
                  className="px-2 py-1 text-xs rounded bg-zinc-900/50 text-zinc-500 hover:text-fog-light hover:bg-zinc-900 border border-zinc-800/50 hover:border-fog-light/30 transition-all"
                  style={{ fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Dank Mono", monospace' }}
                  title={`Click to use: ${cmd}`}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts tooltip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        className="absolute -bottom-8 left-0 right-0 text-center text-xs text-zinc-700 pointer-events-none"
        style={{ fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Dank Mono", monospace' }}
      >
        <span className="inline-flex items-center gap-2">
          <span title="Navigate command history">↑↓ history</span>
          <span className="text-zinc-800">•</span>
          <span title="Submit command">Enter to submit</span>
          <span className="text-zinc-800">•</span>
          <span title="Auto-complete suggestions">Start typing for suggestions</span>
        </span>
      </motion.div>
    </motion.div>
  );
};

// Export with both names for compatibility
export const DollhouseTerminal = BoudoirTerminal;

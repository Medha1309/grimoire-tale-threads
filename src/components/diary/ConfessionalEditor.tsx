/**
 * Confessional Editor - Digital Horror Diary System
 * Two-panel design: History Log (left) + Active Editor (right)
 * Features: Unstable ink, digital flicker, cipher encryption, commit sequence
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
// Framer Motion available for future animations
import { DiaryEntry } from '../../types/diary';
import { HistoryLogPanel } from './HistoryLogPanel';
import { ConfessionChamber } from './ConfessionChamber';

type Mood = 'joy' | 'sorrow' | 'calm' | 'unrest';

interface ConfessionalEditorProps {
  entries: DiaryEntry[];
  onSave: (content: string, mood: Mood, isLocked: boolean) => Promise<void>;
  onUpdate: (entryId: string, content: string, mood: Mood, isLocked: boolean) => Promise<void>;
  onDelete: (entryId: string) => Promise<void>;
  onEntryClick: (entry: DiaryEntry) => void;
  onBack: () => void;
}

export const ConfessionalEditor: React.FC<ConfessionalEditorProps> = ({
  entries,
  onSave,
  onUpdate,
  onDelete,
  onEntryClick,
  onBack,
}) => {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood>('calm');
  const [isLocked, setIsLocked] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Detect typing for unstable ink effect
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    setIsTyping(true);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 800);
  }, []);

  // Handle edit mode
  const handleEdit = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setContent(entry.content);
    setSelectedMood(entry.mood as Mood);
    setIsLocked(entry.isLocked);
  };

  // Handle delete
  const handleDelete = async (entryId: string) => {
    try {
      await onDelete(entryId);
    } catch (error) {
      console.error('Failed to delete entry:', error);
      alert('Failed to delete entry. Please try again.');
    }
  };

  // Commit & Seal action (Create or Update)
  const handleCommit = async () => {
    if (!content.trim()) return;
    
    setIsCommitting(true);
    
    try {
      if (editingEntry) {
        // Update existing entry
        await onUpdate(editingEntry.id, content, selectedMood, isLocked);
      } else {
        // Create new entry
        await onSave(content, selectedMood, isLocked);
      }
      
      // Success sequence
      setShowSuccess(true);
      
      // Reset after animation
      setTimeout(() => {
        setContent('');
        setSelectedMood('calm');
        setIsLocked(false);
        setEditingEntry(null);
        setShowSuccess(false);
        setIsCommitting(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to commit entry:', error);
      setIsCommitting(false);
    }
  };

  // Abandon action
  const handleAbandon = () => {
    if (content.trim() && !confirm(editingEntry ? 'Discard changes?' : 'Abandon this confession? It will be lost forever.')) {
      return;
    }
    setContent('');
    setSelectedMood('calm');
    setIsLocked(false);
    setEditingEntry(null);
  };

  // Filter entries by search
  const filteredEntries = entries.filter(entry => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      entry.content.toLowerCase().includes(searchLower) ||
      entry.mood.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex overflow-hidden">
      {/* Digital corruption overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
          animation: 'grain 0.5s steps(10) infinite',
        }}
      />

      {/* Left Panel: History Log */}
      <HistoryLogPanel
        entries={filteredEntries}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEntryClick={onEntryClick}
        onEntryEdit={handleEdit}
        onEntryDelete={handleDelete}
        onBack={onBack}
      />

      {/* Right Panel: Confession Chamber */}
      <ConfessionChamber
        content={content}
        selectedMood={selectedMood}
        isLocked={isLocked}
        isTyping={isTyping}
        isCommitting={isCommitting}
        showSuccess={showSuccess}
        isEditMode={!!editingEntry}
        onContentChange={handleContentChange}
        onMoodChange={setSelectedMood}
        onLockToggle={setIsLocked}
        onCommit={handleCommit}
        onAbandon={handleAbandon}
      />

      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>
    </div>
  );
};

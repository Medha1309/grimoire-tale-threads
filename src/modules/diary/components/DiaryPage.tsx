/**
 * Diary Module - Main Page Component
 * Complete diary application with all features
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useDiary } from '../hooks/useDiary';
import { DiaryEntry, DiaryMood } from '../types';
import { Sidebar } from './Sidebar';
import { Timeline } from './Timeline';
import { DiaryEditor } from './DiaryEditor';
import { EntryCard } from './EntryCard';
import { EntryDetail } from './EntryDetail';
import { NoiseMode } from './NoiseMode';
import { FloatingHeart } from './FloatingHeart';
import { IDLE_TIMEOUT } from '../constants';

type ViewMode = 'list' | 'editor' | 'detail';

export const DiaryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid || 'guest';
  
  const {
    entries,
    loading,
    error,
    isSaving,
    createEntry,
    updateEntry,
    deleteEntry,
    toggleFavorite,
    scheduleAutoSave,
    filterEntries,
    getStats,
  } = useDiary(userId);

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

  // Filter state
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showingFavorites, setShowingFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Feature toggles
  const [noiseModeEnabled, setNoiseModeEnabled] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);

  // Idle detection for easter egg
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      setShowFloatingHeart(false);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);

  // Check for idle timeout
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > IDLE_TIMEOUT) {
        setShowFloatingHeart(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivity]);

  // Get filtered entries
  const filteredEntries = filterEntries({
    mood: selectedMood as DiaryMood | undefined,
    searchQuery: searchQuery || undefined,
    isFavorite: showingFavorites || undefined,
  });

  // Get stats
  const stats = getStats();

  // Handlers
  const handleNewEntry = useCallback(() => {
    setEditingEntry(null);
    setViewMode('editor');
  }, []);

  const handleSaveEntry = useCallback(async (
    title: string,
    content: string,
    mood: DiaryMood,
    stickers: string[]
  ) => {
    try {
      if (editingEntry) {
        await updateEntry(editingEntry.id, { title, content, mood, stickers });
      } else {
        await createEntry(title, content, mood, stickers);
      }
      setViewMode('list');
      setEditingEntry(null);
    } catch (err) {
      console.error('Failed to save entry:', err);
      alert('Failed to save entry. Please try again.');
    }
  }, [editingEntry, createEntry, updateEntry]);

  const handleAutoSave = useCallback((
    title: string,
    content: string,
    mood: DiaryMood,
    stickers: string[]
  ) => {
    if (editingEntry) {
      scheduleAutoSave({
        id: editingEntry.id,
        title,
        content,
        mood,
        stickers,
      });
    }
  }, [editingEntry, scheduleAutoSave]);

  const handleCancelEdit = useCallback(() => {
    setViewMode('list');
    setEditingEntry(null);
  }, []);

  const handleEntryClick = useCallback((entry: DiaryEntry) => {
    setSelectedEntry(entry);
    setViewMode('detail');
  }, []);

  const handleCloseDetail = useCallback(() => {
    setViewMode('list');
    setSelectedEntry(null);
  }, []);

  const handleEditEntry = useCallback(() => {
    if (selectedEntry) {
      setEditingEntry(selectedEntry);
      setViewMode('editor');
    }
  }, [selectedEntry]);

  const handleDeleteEntry = useCallback(async (entryId: string) => {
    try {
      await deleteEntry(entryId);
      if (viewMode === 'detail') {
        setViewMode('list');
        setSelectedEntry(null);
      }
    } catch (err) {
      console.error('Failed to delete entry:', err);
      alert('Failed to delete entry. Please try again.');
    }
  }, [deleteEntry, viewMode]);

  const handleToggleFavorite = useCallback(async (entryId: string) => {
    try {
      await toggleFavorite(entryId);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  }, [toggleFavorite]);

  const handleFilterMood = useCallback((mood: string | null) => {
    setSelectedMood(mood);
    setShowingFavorites(false);
  }, []);

  const handleShowFavorites = useCallback(() => {
    setShowingFavorites(!showingFavorites);
    setSelectedMood(null);
  }, [showingFavorites]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your diary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Noise Mode Overlay */}
      <NoiseMode enabled={noiseModeEnabled} />

      {/* Floating Heart Easter Egg */}
      <FloatingHeart show={showFloatingHeart} />

      {/* Sidebar */}
      <Sidebar
        stats={stats}
        onNewEntry={handleNewEntry}
        onFilterMood={handleFilterMood}
        onShowFavorites={handleShowFavorites}
        selectedMood={selectedMood}
        showingFavorites={showingFavorites}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Diary</h1>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entries..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Noise Mode Toggle */}
              <button
                onClick={() => setNoiseModeEnabled(!noiseModeEnabled)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  noiseModeEnabled
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Toggle CRT noise effect"
              >
                📺 Noise Mode
              </button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {viewMode === 'list' && (
          <Timeline entries={entries} onEntryClick={handleEntryClick} />
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'list' && (
            <div className="max-w-6xl mx-auto">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    {searchQuery
                      ? 'No entries match your search'
                      : showingFavorites
                      ? 'No favorite entries yet'
                      : selectedMood
                      ? 'No entries with this mood'
                      : 'No entries yet. Start writing!'}
                  </p>
                  {!searchQuery && !showingFavorites && !selectedMood && (
                    <button
                      onClick={handleNewEntry}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Your First Entry
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEntries.map((entry) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      onClick={() => handleEntryClick(entry)}
                      onDelete={() => handleDeleteEntry(entry.id)}
                      onToggleFavorite={() => handleToggleFavorite(entry.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {viewMode === 'editor' && (
            <DiaryEditor
              initialTitle={editingEntry?.title}
              initialContent={editingEntry?.content}
              initialMood={editingEntry?.mood}
              initialStickers={editingEntry?.stickers}
              onSave={handleSaveEntry}
              onCancel={handleCancelEdit}
              onAutoSave={handleAutoSave}
              isSaving={isSaving}
            />
          )}

          {viewMode === 'detail' && selectedEntry && (
            <EntryDetail
              entry={selectedEntry}
              onClose={handleCloseDetail}
              onEdit={handleEditEntry}
              onDelete={() => handleDeleteEntry(selectedEntry.id)}
              onToggleFavorite={() => handleToggleFavorite(selectedEntry.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

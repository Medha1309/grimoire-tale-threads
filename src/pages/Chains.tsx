/**
 * Chains - Chain Lab for Collaborative Stories
 * Clinical, eerie, and sophisticated interface for mature audiences
 * PRODUCTION-READY with Firebase persistence
 * 
 * Now includes two tabs:
 * 1. Reflection Sessions - Real-time collaborative story chains
 * 2. Collaborative Stories - GitHub-style collaborative story projects
 */

import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BackButton } from '../components/shared/NavigationButtons';
import { getButtonClasses } from '../design-system/button-system';
import { useChainSession, useChainSessions } from '../hooks/useChainSession';
import { CollaborativeStoriesView } from '../components/collaborative/CollaborativeStoriesView';
import { Timestamp } from 'firebase/firestore';
import { UI_CONFIG } from '../config/taleThreads';

function djb2Hash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function formatTime(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  return date.toTimeString().slice(0, 5);
}

export const Chains: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Tab management
  const activeTab = searchParams.get('tab') || 'sessions';
  const sessionId = searchParams.get('session') || 'demo-the-digital-haunting';
  
  const { sessions, loading: sessionsLoading, createSession, deleteSession } = useChainSessions();
  const { session, loading: sessionLoading, addSegment, joinSession, deleteSegment, updateSegment } = useChainSession(sessionId);
  
  const [activeId, setActiveId] = useState<string>('');
  const [draft, setDraft] = useState('');
  const [author, setAuthor] = useState(currentUser?.displayName || 'You');
  const [submitting, setSubmitting] = useState(false);
  const [showNewChainModal, setShowNewChainModal] = useState(false);
  const [newChainTitle, setNewChainTitle] = useState('');
  const [newChainDescription, setNewChainDescription] = useState('');
  const [creatingChain, setCreatingChain] = useState(false);
  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Tab switching function
  const switchTab = (tab: 'sessions' | 'projects') => {
    setSearchParams({ tab });
  };

  const segments = session?.segments || [];
  const activeIndex = segments.findIndex((s) => s.id === activeId);

  // Set initial active segment
  useEffect(() => {
    if (session && session.segments.length > 0 && !activeId) {
      setActiveId(session.segments[0].id);
    }
  }, [session, activeId]);

  // Auto-join session when viewing
  useEffect(() => {
    if (session && currentUser && joinSession) {
      const isParticipant = session.participants.some(p => p.userId === currentUser.uid);
      if (!isParticipant) {
        joinSession(currentUser.uid, currentUser.displayName || 'Anonymous');
      }
    }
  }, [session, currentUser, joinSession]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if not typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        e.preventDefault();
        setActiveId(segments[activeIndex - 1].id);
      } else if (e.key === 'ArrowRight' && activeIndex < segments.length - 1) {
        e.preventDefault();
        setActiveId(segments[activeIndex + 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeIndex, segments]);

  const combinedText = useMemo(
    () =>
      [...segments.map((s) => s.content), draft]
        .join('\n')
        .trim()
        .replace(/\s+/g, ' '),
    [segments, draft]
  );

  const wordCount = useMemo(
    () => (combinedText ? combinedText.split(' ').length : 0),
    [combinedText]
  );

  const hash = useMemo(() => djb2Hash(combinedText || 'empty'), [combinedText]);

  async function handleAddSegment() {
    const trimmed = draft.trim();
    if (!trimmed || !currentUser || submitting) return;

    setSubmitting(true);
    try {
      await addSegment({
        author: author || currentUser.displayName || 'Anonymous',
        authorId: currentUser.uid,
        content: trimmed,
      });
      setDraft('');
      // Set the new segment as active after a brief delay
      setTimeout(() => {
        if (session && session.segments.length > 0) {
          setActiveId(session.segments[session.segments.length - 1].id);
        }
      }, 100);
    } catch (error) {
      console.error('Error adding segment:', error);
    } finally {
      setSubmitting(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleAddSegment();
    }
  }

  function handleSessionChange(newSessionId: string) {
    setSearchParams({ session: newSessionId });
    setActiveId('');
  }

  async function handleCreateChain() {
    if (!newChainTitle.trim() || !currentUser || creatingChain) return;

    setCreatingChain(true);
    try {
      console.log('Creating chain session with:', {
        title: newChainTitle.trim(),
        ownerId: currentUser.uid,
        ownerName: currentUser.displayName || 'Anonymous',
      });

      const newSessionId = await createSession({
        title: newChainTitle.trim(),
        description: newChainDescription.trim() || undefined,
        ownerId: currentUser.uid,
        ownerName: currentUser.displayName || 'Anonymous',
        segments: [],
        participants: [
          {
            userId: currentUser.uid,
            displayName: currentUser.displayName || 'Anonymous',
            joinedAt: Timestamp.now(),
          },
        ],
        isPublic: true,
        maxParticipants: 50,
      });

      console.log('Chain session created successfully with ID:', newSessionId);

      // Switch to the new chain
      setSearchParams({ session: newSessionId });
      setShowNewChainModal(false);
      setNewChainTitle('');
      setNewChainDescription('');
    } catch (error) {
      console.error('Error creating chain:', error);
      alert(`Failed to create chain: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setCreatingChain(false);
    }
  }

  async function handleDeleteSegment(segmentId: string) {
    if (!currentUser || !session) return;
    
    const segment = segments.find(s => s.id === segmentId);
    if (!segment) return;

    // Only allow deletion if user is the author or session owner
    if (segment.authorId !== currentUser.uid && session.ownerId !== currentUser.uid) {
      alert('You can only delete your own segments');
      return;
    }

    if (!confirm('Delete this segment?')) return;

    try {
      await deleteSegment(segmentId);
    } catch (error) {
      console.error('Error deleting segment:', error);
      alert('Failed to delete segment');
    }
  }

  function handleStartEdit(segmentId: string, content: string) {
    setEditingSegmentId(segmentId);
    setEditContent(content);
  }

  function handleCancelEdit() {
    setEditingSegmentId(null);
    setEditContent('');
  }

  async function handleSaveEdit() {
    if (!editingSegmentId || !editContent.trim()) return;

    try {
      await updateSegment(editingSegmentId, editContent.trim());
      setEditingSegmentId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating segment:', error);
      alert('Failed to update segment');
    }
  }

  async function handleDeleteSession() {
    if (!session || !currentUser) return;

    if (session.ownerId !== currentUser.uid) {
      alert('Only the session owner can delete the session');
      return;
    }

    if (!confirm(`Delete "${session.title}"? This cannot be undone.`)) return;

    try {
      await deleteSession(sessionId);
      // Navigate to first available session or stay on current
      if (sessions.length > 1) {
        const nextSession = sessions.find(s => s.id !== sessionId);
        if (nextSession) {
          setSearchParams({ session: nextSession.id });
        }
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('Failed to delete session');
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-6">Sign in to access Tale Threads</p>
          <button
            onClick={() => navigate('/login')}
            className={getButtonClasses('primary')}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (sessionsLoading || sessionLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-slate-400 font-mono text-sm">
          Loading Tale Threads...
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-slate-400 font-mono text-sm">
          Initializing Tale Threads...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col items-stretch tale-threads-page">
      
      {/* Three-level header */}
      <header className="border-b border-slate-800/60 bg-gradient-to-r from-[#050509] via-black to-[#050509]">
        {/* Top level: Back button only */}
        <div className="px-6 py-2 border-b border-slate-900/40">
          <BackButton onClick={() => navigate('/')} variant="ghost" />
        </div>
        
        {/* Middle level: Title + Controls */}
        <div className="px-6 py-3 border-b border-slate-900/40">
          <div className="flex items-center justify-between">
            {/* Left: Title with icon */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border border-purple-400/70 shadow-[0_0_15px_rgba(147,51,234,0.35)] flex items-center justify-center text-[11px] font-mono neon-ring hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-shadow cursor-pointer">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-[0.18em] uppercase text-slate-200">
                  Tale Threads
                </h1>
                <p className="text-[11px] text-slate-500 font-mono">
                  Collaborative story chains
                </p>
              </div>
            </div>

            {/* Right: Session controls + Stats (only show for sessions tab) */}
            {activeTab === 'sessions' && (
              <div className="flex items-center gap-4 text-[11px] font-mono">
                {/* Session Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 hidden sm:inline">Chain:</span>
                  <select
                    value={sessionId}
                    onChange={(e) => handleSessionChange(e.target.value)}
                    className="bg-slate-900/80 border border-slate-700/80 rounded px-3 py-1.5 text-slate-300 text-[11px] focus:outline-none focus:border-lime-400/80 hover:border-lime-400/50 transition-colors min-w-[180px] cursor-pointer"
                  >
                    {sessions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* New Thread Button */}
                <button
                  onClick={() => setShowNewChainModal(true)}
                  className="px-3 py-1.5 bg-purple-500/20 border border-purple-400/60 rounded text-purple-300 text-[11px] uppercase tracking-[0.14em] hover:bg-purple-500/30 hover:shadow-[0_0_12px_rgba(147,51,234,0.4)] transition-all whitespace-nowrap"
                >
                  + New
                </button>

                {/* Delete Session Button - Only show for owner */}
                {session && currentUser && session.ownerId === currentUser.uid && (
                  <button
                    onClick={handleDeleteSession}
                    className="px-3 py-1.5 bg-red-500/20 border border-red-400/60 rounded text-red-300 text-[11px] uppercase tracking-[0.14em] hover:bg-red-500/30 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all whitespace-nowrap"
                    title="Delete this session"
                  >
                    Delete
                  </button>
                )}

                {/* Participants */}
                {session && (
                  <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800">
                    <span className="inline-flex h-2 w-2 rounded-full bg-slate-400" />
                    <span className="text-slate-400">
                      {session.participants.length} {session.participants.length === 1 ? 'participant' : 'participants'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom level: Tab Navigation */}
        <div className="px-6">
          <div className="flex items-center gap-1">
            {UI_CONFIG.tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => switchTab(tab.value as 'sessions' | 'projects')}
                className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.14em] border-b-2 transition-all ${
                  activeTab === tab.value
                    ? 'border-purple-400 text-purple-400 bg-purple-500/5'
                    : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                }`}
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Render different content based on active tab */}
        {activeTab === 'projects' ? (
          <div className="flex-1 overflow-y-auto p-6">
            <CollaborativeStoriesView />
          </div>
        ) : (
          // Original Reflection Sessions content
          <>
        {/* LEFT – stitched chain timeline */}
        <aside className="hidden md:flex w-72 border-r border-slate-900/80 bg-gradient-to-b from-[#050509] via-[#050509] to-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.18] mix-blend-screen bg-[radial-gradient(circle_at_0_0,#4ade8030_0,transparent_50%),radial-gradient(circle_at_100%_100%,#22d3ee26_0,transparent_55%)]" />
          <div className="absolute inset-0 pointer-events-none scanlines" />

          <div className="relative z-10 px-4 py-4 flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
              <span>Story Timeline</span>
              <span>{segments.length} {segments.length === 1 ? 'entry' : 'entries'}</span>
            </div>

            <div className="relative mt-1">
              {/* vertical spine */}
              <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-lime-400/50 via-slate-700/70 to-fuchsia-500/50 shadow-[0_0_10px_rgba(190,242,100,0.35)]" />
              <div className="flex flex-col gap-4 pl-8 pr-1 max-h-[calc(100vh-7rem)] overflow-y-auto chains-scroll">
                {segments.map((segment, index) => {
                  const isActive = segment.id === activeId;
                  return (
                    <button
                      key={segment.id}
                      onClick={() => setActiveId(segment.id)}
                      className={`group text-left relative ${
                        isActive ? 'active-glitch' : ''
                      }`}
                    >
                      <div className="absolute -left-[23px] top-2 h-[11px] w-[11px] rounded-full border-[1.5px] border-lime-300/80 bg-black shadow-[0_0_6px_rgba(190,242,100,0.6)] flex items-center justify-center text-[9px] text-lime-300/90">
                        {index + 1}
                      </div>
                      <div
                        className={[
                          'rounded-xl border border-slate-800/90 bg-gradient-to-b from-slate-950/90 via-black/90 to-slate-950/95 px-3.5 py-2.5',
                          'shadow-[0_0_0_1px_rgba(15,23,42,0.9),0_18px_40px_rgba(15,23,42,0.95)]',
                          'transition-all duration-200',
                          isActive
                            ? 'border-lime-400/80 shadow-[0_0_0_1px_rgba(132,204,22,0.8),0_18px_45px_rgba(190,242,100,0.35)] scale-[1.02]'
                            : 'hover:border-slate-500/80 hover:shadow-[0_0_0_1px_rgba(148,163,184,0.7),0_16px_30px_rgba(15,23,42,0.9)] hover:scale-[1.01]',
                        ].join(' ')}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5 group-hover:text-slate-300 transition-colors">
                          <span className="truncate max-w-[8rem]">
                            {segment.author}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600 group-hover:text-slate-500 transition-colors">
                              {formatTime(segment.createdAt)}
                            </span>
                            {currentUser && (segment.authorId === currentUser.uid || session?.ownerId === currentUser.uid) && (
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartEdit(segment.id, segment.content);
                                  }}
                                  className="px-1.5 py-0.5 text-[9px] text-blue-400 hover:text-blue-300 transition-colors border border-blue-400/40 rounded hover:border-blue-400/60"
                                  title="Edit"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteSegment(segment.id);
                                  }}
                                  className="px-1.5 py-0.5 text-[9px] text-red-400 hover:text-red-300 transition-colors border border-red-400/40 rounded hover:border-red-400/60"
                                  title="Delete"
                                >
                                  Del
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] leading-snug text-slate-200 max-h-16 overflow-hidden line-clamp-3 glitch-text group-hover:text-slate-100 transition-colors">
                          {segment.content}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER – editor slab */}
        <section className="flex-1 flex flex-col bg-[radial-gradient(circle_at_top,_#020617_0,_#000_55%,_#020617_100%)] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none scanlines opacity-[0.35]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(132,204,22,0.16)_0,transparent_60%)] opacity-80" />

          <div className="relative z-10 h-full flex flex-col px-4 sm:px-8 py-5 gap-4">
            {/* Mini status strip with navigation */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-1">
              <div className="flex items-center gap-3">
                <span className="uppercase tracking-[0.2em] text-slate-500">
                  active link
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-[10px]">
                    #{activeIndex + 1} / {segments.length}
                  </span>
                  {/* Navigation arrows */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        if (activeIndex > 0) {
                          setActiveId(segments[activeIndex - 1].id);
                        }
                      }}
                      disabled={activeIndex === 0}
                      className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/80 hover:border-lime-400/60 hover:text-lime-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-[10px]"
                      title="Previous segment (Left Arrow)"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => {
                        if (activeIndex < segments.length - 1) {
                          setActiveId(segments[activeIndex + 1].id);
                        }
                      }}
                      disabled={activeIndex === segments.length - 1}
                      className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/80 hover:border-lime-400/60 hover:text-lime-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-[10px]"
                      title="Next segment (Right Arrow)"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-slate-600">
                  Arrow keys to navigate • Ctrl+Enter to add
                </span>
              </div>
            </div>

            {/* Active segment & editor */}
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] gap-4 xl:gap-6 h-full">
              {/* Active preview - Interactive */}
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950/90 via-black to-slate-950/95 shadow-[0_0_0_1px_rgba(15,23,42,0.95),0_32px_70px_rgba(15,23,42,0.98)] relative overflow-hidden hover:border-slate-700/80 hover:shadow-[0_0_0_1px_rgba(15,23,42,0.95),0_32px_80px_rgba(15,23,42,0.98)] transition-all group">
                  <div className="absolute inset-0 pointer-events-none editor-chroma" />
                  <div className="relative p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2.5 text-[11px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors">
                      <span className="flex items-center gap-2">
                        <span className="inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.7)] group-hover:shadow-[0_0_12px_rgba(52,211,153,0.9)] transition-shadow" />
                        <span>
                          {segments[activeIndex]?.author ?? 'Unknown author'}
                        </span>
                      </span>
                      <span className="text-slate-600 group-hover:text-slate-500 transition-colors">
                        {segments[activeIndex]
                          ? formatTime(segments[activeIndex].createdAt)
                          : '--:--'}
                      </span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-slate-100 font-medium tracking-[0.01em] group-hover:text-white transition-colors">
                      {segments[activeIndex]?.content ?? (
                        <span className="text-slate-600">
                          No segment selected.
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* "Algorithm" footer - Interactive */}
                <div className="rounded-xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 flex flex-col gap-1.5 text-[11px] font-mono text-slate-400 hover:border-slate-700/90 transition-colors group">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 uppercase tracking-[0.16em] group-hover:text-slate-400 transition-colors">
                      Story Info
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <div
                      className="hover:text-purple-400 transition-colors"
                      title="Total word count across all entries"
                    >
                      words:{' '}
                      <span className="text-slate-100 font-semibold">
                        {wordCount}
                      </span>
                    </div>
                    <button
                      className="truncate hover:text-purple-400 transition-colors cursor-pointer"
                      title="Click to copy story ID"
                      onClick={() => {
                        navigator.clipboard.writeText(hash);
                        alert('Story ID copied!');
                      }}
                    >
                      story ID:{' '}
                      <span className="text-purple-400 font-semibold">
                        {hash.slice(0, 8)}...
                      </span>
                    </button>
                    <div
                      className="hover:text-purple-400 transition-colors"
                      title="Number of entries in this story"
                    >
                      entries:{' '}
                      <span className="text-slate-100 font-semibold">
                        {segments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor */}
              <div className="flex flex-col h-full">
                <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950 via-black to-slate-950 shadow-[0_0_0_1px_rgba(15,23,42,0.95),0_32px_70px_rgba(15,23,42,0.98)] flex flex-col overflow-hidden relative editor-shell">
                  <div className="absolute inset-0 pointer-events-none editor-noise opacity-[0.3]" />
                  <div className="relative flex items-center justify-between px-4 py-2 border-b border-slate-900/80 bg-slate-950/95 text-[11px] font-mono text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="flex gap-1">
                        <span className="h-[7px] w-[7px] rounded-full bg-red-500/80" />
                        <span className="h-[7px] w-[7px] rounded-full bg-amber-400/80" />
                        <span className="h-[7px] w-[7px] rounded-full bg-emerald-400/80" />
                      </span>
                      <span className="uppercase tracking-[0.16em]">
                        Add Your Part
                      </span>
                    </div>
                    <span className="text-slate-600">
                      <span className="text-slate-300">Writing</span>
                    </span>
                  </div>

                  <div className="relative flex-1 flex flex-col">
                    <textarea
                      className="flex-1 bg-transparent text-[13px] leading-relaxed text-slate-100 placeholder:text-slate-700 font-mono resize-none p-4 sm:p-5 focus:outline-none selection:bg-purple-400/30 chains-scroll"
                      placeholder="Continue the story... Write what happens next. Press Ctrl + Enter to add your entry."
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={submitting}
                    />

                    <div className="border-t border-slate-900/80 bg-slate-950/95 px-4 sm:px-5 py-2.5 flex items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5">
                          <span className="text-slate-600">author:</span>
                          <input
                            className="bg-black/60 border border-slate-800/80 rounded px-2 py-1 text-[11px] text-slate-100 focus:outline-none focus:border-lime-400/80"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            maxLength={24}
                            disabled={submitting}
                          />
                        </label>
                        <span className="hidden sm:inline text-slate-700">
                          chars:{' '}
                          <span className="text-slate-300">
                            {draft.length}
                          </span>
                        </span>
                      </div>

                      <button
                        onClick={handleAddSegment}
                        disabled={!draft.trim() || submitting}
                        className={[
                          'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 border text-[11px] uppercase tracking-[0.14em]',
                          draft.trim() && !submitting
                            ? 'border-purple-400/90 bg-gradient-to-r from-purple-500/80 via-pink-400/80 to-purple-500/80 text-white shadow-[0_0_18px_rgba(147,51,234,0.5)] hover:brightness-110 active:brightness-125 transition-all'
                            : 'border-slate-700/80 text-slate-600 bg-slate-900 cursor-not-allowed',
                        ].join(' ')}
                      >
                        <span>{submitting ? 'Adding...' : 'Add Entry'}</span>
                        <span className="text-[10px]">Ctrl+Enter</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT – tiny graph / "algorithm lens" */}
        <aside className="hidden lg:flex w-80 border-l border-slate-900/80 bg-gradient-to-b from-black via-[#050509] to-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.22] bg-[radial-gradient(circle_at_100%_0,#22d3ee2b_0,transparent_55%),radial-gradient(circle_at_0_100%,#a855f72b_0,transparent_55%)]" />
          <div className="absolute inset-0 pointer-events-none scanlines" />

          <div className="relative z-10 px-4 py-4 flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Story Stats</span>
              <span>overview</span>
            </div>

            {/* Interactive node chain */}
            <div className="mt-2 rounded-2xl border border-slate-800/90 bg-slate-950/95 shadow-[0_0_0_1px_rgba(15,23,42,0.95),0_28px_60px_rgba(15,23,42,0.98)] p-4 flex flex-col gap-3 hover:border-slate-700/90 transition-colors group">
              <svg
                viewBox="0 0 220 120"
                className="w-full h-[120px]"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* edges */}
                {segments.map((seg, idx) => {
                  if (idx === segments.length - 1) return null;
                  const x = 30 + idx * 40;
                  return (
                    <line
                      key={`edge-${seg.id}`}
                      x1={x + 20}
                      y1={60}
                      x2={x + 40}
                      y2={60}
                      stroke="rgba(148,163,184,0.6)"
                      strokeWidth={1.2}
                      strokeDasharray="2 3"
                      className="transition-all group-hover:stroke-slate-400"
                    />
                  );
                })}
                {/* nodes - clickable */}
                {segments.map((seg, idx) => {
                  const x = 30 + idx * 40;
                  const isActive = seg.id === activeId;
                  return (
                    <g 
                      key={seg.id}
                      onClick={() => setActiveId(seg.id)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={x}
                        cy={60}
                        r={isActive ? 10 : 7}
                        fill={
                          isActive
                            ? 'rgba(190,242,100,0.9)'
                            : 'rgba(15,23,42,1)'
                        }
                        stroke={
                          isActive
                            ? 'rgba(190,242,100,1)'
                            : 'rgba(148,163,184,0.9)'
                        }
                        strokeWidth={isActive ? 2.4 : 1.6}
                        className="transition-all hover:stroke-lime-400"
                      />
                      <text
                        x={x}
                        y={60}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="9"
                        fill={isActive ? 'black' : 'rgba(148,163,184,0.9)'}
                        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
                        className="pointer-events-none"
                      >
                        {idx + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <p className="text-[11px] text-slate-400 font-mono leading-relaxed group-hover:text-slate-300 transition-colors">
                The chain is treated as a{' '}
                <span className="text-slate-100">directed path graph</span>.
                Each stitch appends a new node to the tail. No branching—
                just one cursed, linear timeline. <span className="text-lime-400/80">Click nodes to navigate.</span>
              </p>
            </div>

            {/* System Info & Stats */}
            <div className="mt-1 rounded-xl border border-slate-800/90 bg-black/90 px-3.5 py-3 text-[11px] font-mono flex flex-col gap-3">
              {/* Graph Legend */}
              <div className="flex flex-col gap-2">
                <div className="text-slate-500 uppercase tracking-[0.16em] text-[10px] mb-1">
                  Graph Legend
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-[10px] w-[10px] rounded-full bg-lime-400/90 shadow-[0_0_6px_rgba(190,242,100,0.6)]" />
                  <span className="text-slate-400">Active segment (currently viewing)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-[10px] w-[10px] rounded-full border border-slate-500/90 bg-slate-950" />
                  <span className="text-slate-400">Historical segments (committed)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="2" className="opacity-60">
                    <line x1="0" y1="1" x2="20" y2="1" stroke="rgba(148,163,184,0.6)" strokeWidth="1.2" strokeDasharray="2 3" />
                  </svg>
                  <span className="text-slate-400">Chronological connections</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-800/60" />

              {/* How It Works */}
              <div className="flex flex-col gap-2">
                <div className="text-slate-500 uppercase tracking-[0.16em] text-[10px] mb-1">
                  How It Works
                </div>
                <div className="text-slate-400 leading-relaxed">
                  <span className="text-slate-300">Linear Timeline:</span> Each segment appends to the end. No branching—one continuous narrative thread.
                </div>
                <div className="text-slate-400 leading-relaxed">
                  <span className="text-slate-300">Real-Time Sync:</span> Firebase listeners update all participants instantly when new segments are added.
                </div>
                <div className="text-slate-400 leading-relaxed">
                  <span className="text-slate-300">Persistent Storage:</span> All segments saved to Firestore with author attribution and timestamps.
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-800/60" />

              {/* Session Stats - Interactive */}
              <div className="flex flex-col gap-2">
                <div className="text-slate-500 uppercase tracking-[0.16em] text-[10px] mb-1">
                  Session Stats
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex flex-col text-left hover:bg-slate-900/40 rounded p-1.5 transition-colors group">
                    <span className="text-slate-600 text-[10px] group-hover:text-slate-500 transition-colors">Total Segments</span>
                    <span className="text-slate-200 font-semibold group-hover:text-lime-400 transition-colors">{segments.length}</span>
                  </button>
                  <button className="flex flex-col text-left hover:bg-slate-900/40 rounded p-1.5 transition-colors group">
                    <span className="text-slate-600 text-[10px] group-hover:text-slate-500 transition-colors">Participants</span>
                    <span className="text-slate-200 font-semibold group-hover:text-lime-400 transition-colors">{session.participants.length}</span>
                  </button>
                  <button className="flex flex-col text-left hover:bg-slate-900/40 rounded p-1.5 transition-colors group">
                    <span className="text-slate-600 text-[10px] group-hover:text-slate-500 transition-colors">Total Words</span>
                    <span className="text-slate-200 font-semibold group-hover:text-lime-400 transition-colors">{wordCount}</span>
                  </button>
                  <button 
                    className="flex flex-col text-left hover:bg-slate-900/40 rounded p-1.5 transition-colors group"
                    onClick={() => navigator.clipboard.writeText(hash)}
                    title="Click to copy full hash"
                  >
                    <span className="text-slate-600 text-[10px] group-hover:text-slate-500 transition-colors">Chain Hash</span>
                    <span className="text-lime-400 font-semibold text-[10px] group-hover:text-lime-300 transition-colors">{hash.slice(0, 6)}...</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-800/60" />

              {/* Contributors - Interactive */}
              <div className="flex flex-col gap-2">
                <div className="text-slate-500 uppercase tracking-[0.16em] text-[10px] mb-1">
                  Contributors
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {session.participants.map((participant) => (
                    <button
                      key={participant.userId}
                      className="px-2 py-1 bg-slate-900/60 border border-slate-700/60 rounded text-[10px] text-slate-300 hover:border-lime-400/60 hover:text-lime-300 hover:bg-slate-900/80 transition-all cursor-pointer"
                      title={`Joined ${participant.joinedAt.toDate().toLocaleDateString()}`}
                    >
                      {participant.displayName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
        </>
        )}
      </main>

      {/* New Chain Modal */}
      {showNewChainModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-slate-950 via-black to-slate-950 border border-slate-800/80 rounded-2xl shadow-[0_0_0_1px_rgba(15,23,42,0.95),0_32px_70px_rgba(15,23,42,0.98)] max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold tracking-[0.12em] uppercase text-slate-200">
                New Chain
              </h2>
              <button
                onClick={() => {
                  setShowNewChainModal(false);
                  setNewChainTitle('');
                  setNewChainDescription('');
                }}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-[0.16em] mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newChainTitle}
                  onChange={(e) => setNewChainTitle(e.target.value)}
                  placeholder="The Midnight Protocol"
                  className="w-full bg-black/60 border border-slate-800/80 rounded px-3 py-2 text-[13px] text-slate-100 placeholder:text-slate-700 focus:outline-none focus:border-lime-400/80"
                  maxLength={100}
                  disabled={creatingChain}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-[0.16em] mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={newChainDescription}
                  onChange={(e) => setNewChainDescription(e.target.value)}
                  placeholder="A collaborative horror story about..."
                  className="w-full bg-black/60 border border-slate-800/80 rounded px-3 py-2 text-[13px] text-slate-100 placeholder:text-slate-700 focus:outline-none focus:border-lime-400/80 resize-none"
                  rows={3}
                  maxLength={500}
                  disabled={creatingChain}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowNewChainModal(false);
                    setNewChainTitle('');
                    setNewChainDescription('');
                  }}
                  disabled={creatingChain}
                  className="flex-1 px-4 py-2 border border-slate-700/80 text-slate-400 rounded text-[11px] uppercase tracking-[0.14em] hover:border-slate-600 hover:text-slate-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateChain}
                  disabled={!newChainTitle.trim() || creatingChain}
                  className={[
                    'flex-1 px-4 py-2 border text-[11px] uppercase tracking-[0.14em] rounded transition-all',
                    newChainTitle.trim() && !creatingChain
                      ? 'border-lime-400/90 bg-gradient-to-r from-lime-500/80 via-emerald-400/80 to-fuchsia-500/80 text-black shadow-[0_0_18px_rgba(190,242,100,0.5)] hover:brightness-110'
                      : 'border-slate-700/80 text-slate-600 bg-slate-900 cursor-not-allowed',
                  ].join(' ')}
                >
                  {creatingChain ? 'Creating...' : 'Create Chain'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Segment Modal */}
      {editingSegmentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 font-mono uppercase tracking-[0.16em]">
              Edit Segment
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-[0.16em] mb-2">
                  Content
                </label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-black/60 border border-slate-800/80 rounded px-3 py-2 text-[13px] text-slate-100 placeholder:text-slate-700 focus:outline-none focus:border-lime-400/80 resize-none font-mono"
                  rows={6}
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 px-4 py-2 border border-slate-700/80 text-slate-400 rounded text-[11px] uppercase tracking-[0.14em] hover:border-slate-600 hover:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={!editContent.trim()}
                  className={[
                    'flex-1 px-4 py-2 border text-[11px] uppercase tracking-[0.14em] rounded transition-all',
                    editContent.trim()
                      ? 'border-lime-400/90 bg-gradient-to-r from-lime-500/80 via-emerald-400/80 to-fuchsia-500/80 text-black shadow-[0_0_18px_rgba(190,242,100,0.5)] hover:brightness-110'
                      : 'border-slate-700/80 text-slate-600 bg-slate-900 cursor-not-allowed',
                  ].join(' ')}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { TorchEffect, useTorchPosition } from "../components/library/TorchEffect";
import { StoryGrid } from "../components/library/StoryGrid";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../contexts/AuthContext";
import { useStories } from "../hooks/useStories";
import { BackButton } from "../components/shared/NavigationButtons";
import { Genre } from "../utils/genreAtmospheres";
import { typography, buttons, inputs, backgrounds } from "../utils/themeClasses";


// Removed heavy components for performance

export const Stories: React.FC = () => {
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const { goTo } = useNavigation();
  const { currentUser } = useAuth();
  const { torchPos, torchActive } = useTorchPosition();
  const { allStories, loading: storiesLoading } = useStories();
  
  // Bookmark management
  const [bookmarks, setBookmarks] = React.useState<Set<string>>(new Set());
  
  // Filtering and search
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'title'>('recent');

  // Load bookmarks from localStorage
  useEffect(() => {
    const loadBookmarks = () => {
      const saved = localStorage.getItem('bookmarkedStories');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const slugs = parsed.map((b: any) => b.slug);
          setBookmarks(new Set(slugs));
        } catch (e) {
          console.error('Failed to load bookmarks:', e);
        }
      }
    };
    loadBookmarks();
    
    // Listen for storage changes from other tabs
    window.addEventListener('storage', loadBookmarks);
    return () => window.removeEventListener('storage', loadBookmarks);
  }, []);

  // Removed eye positions for performance

  // Filter and sort stories
  const filteredStories = useMemo(() => {
    // Ensure allStories is an array
    let filtered = Array.isArray(allStories) ? allStories : [];

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(s => s.genre === selectedGenre);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.author.toLowerCase().includes(query) ||
        s.blurb?.toLowerCase().includes(query) ||
        s.genre.toLowerCase().includes(query)
      );
    }

    // Sort stories
    const sorted = [...filtered];
    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popular':
        // Sort by views/reads if available, otherwise by creation date
        sorted.sort((a, b) => {
          const viewsA = (a as any).views || (a as any).reads || 0;
          const viewsB = (b as any).views || (b as any).reads || 0;
          return viewsB - viewsA;
        });
        break;
      case 'recent':
      default:
        sorted.sort((a, b) => {
          const dateA = a.createdAt?.toMillis?.() || 0;
          const dateB = b.createdAt?.toMillis?.() || 0;
          return dateB - dateA;
        });
    }

    return sorted;
  }, [allStories, selectedGenre, searchQuery, sortBy]);

  // Memoize mapped story data to prevent recreation on every render
  const mappedStories = useMemo(() => 
    filteredStories.map(s => ({
      slug: s.slug,
      title: s.title,
      author: s.author,
      authorId: s.authorId,
      cover: s.cover,
      coverType: s.coverType,
      genre: s.genre,
      blurb: s.blurb,
    })), [filteredStories]
  );

  const handleStoryClick = useCallback((slug: string) => {
    goTo.storyDetail(slug);
  }, [goTo]);
  
  const handleBookmarkToggle = useCallback((slug: string) => {
    const story = filteredStories.find(s => s.slug === slug);
    if (!story) return;
    
    const saved = localStorage.getItem('bookmarkedStories');
    let bookmarkedStories = saved ? JSON.parse(saved) : [];
    
    const isCurrentlyBookmarked = bookmarkedStories.some((b: any) => b.slug === slug);
    
    if (isCurrentlyBookmarked) {
      // Remove bookmark
      bookmarkedStories = bookmarkedStories.filter((b: any) => b.slug !== slug);
      setBookmarks(prev => {
        const next = new Set(prev);
        next.delete(slug);
        return next;
      });
    } else {
      // Add bookmark
      bookmarkedStories.push({
        slug: story.slug,
        title: story.title,
        author: story.author,
        genre: story.genre,
        blurb: story.blurb,
      });
      setBookmarks(prev => new Set(prev).add(slug));
    }
    
    localStorage.setItem('bookmarkedStories', JSON.stringify(bookmarkedStories));
    
    // Trigger storage event for other tabs/components
    window.dispatchEvent(new Event('storage'));
  }, [filteredStories]);

  const genres: Array<{ value: Genre | 'all'; label: string }> = [
    { value: 'all', label: 'All Genres' },
    { value: 'horror', label: 'Horror' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'romance', label: 'Romance' },
  ];

  return (
    <section className={`relative min-h-screen ${backgrounds.page} px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-hidden`}>
      <TorchEffect active={torchActive} position={torchPos} />

      <div className="mx-auto max-w-7xl relative z-20">
        <header className="mb-8 sm:mb-12 border-b border-gothic-fog/20 pb-6">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <BackButton onClick={goTo.home} variant="ghost" />
            <h2 
              className="font-display text-3xl font-semibold leading-snug tracking-wide"
              style={{
                color: '#d4c4a8',
                textShadow: '0 0 20px rgba(212, 196, 168, 0.3)'
              }}
            >
              THE LIBRARY
            </h2>
            <button
              onClick={() => currentUser ? goTo.compose() : goTo.login()}
              className={`${buttons.primarySmall} hover:scale-105`}
            >
              Write Your Tale
            </button>
          </div>

          {/* Search and Filters */}
          {!storiesLoading && allStories && allStories.length > 0 && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search the ancient tomes..."
                  className={`${inputs.search} pointer-events-auto relative z-30`}
                />
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-900/40 pointer-events-none" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-900/40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-900/40 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-900/40 pointer-events-none" />
                
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${typography.bodySmall} text-gothic-fog hover:text-gothic-candlelight transition-colors duration-200 z-30 pointer-events-auto`}
                  >
                    clear
                  </button>
                )}
              </div>

              {/* Genre and Sort Filters */}
              <div className="flex flex-wrap gap-4">
                {/* Genre Filter */}
                <div className="flex-1 min-w-[200px] relative">
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value as Genre | 'all')}
                    className={`${inputs.select} relative z-30 pointer-events-auto`}
                  >
                    {genres.map(g => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gothic-candlelight/60">▼</div>
                </div>

                {/* Sort Filter */}
                <div className="flex-1 min-w-[200px] relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'title')}
                    className={`${inputs.select} relative z-30 pointer-events-auto`}
                  >
                    <option value="recent">Recently Added</option>
                    <option value="popular">Most Popular</option>
                    <option value="title">Alphabetical</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gothic-candlelight/60">▼</div>
                </div>
              </div>

              {/* Results Count */}
              <div className={typography.bodySmall}>
                {searchQuery || selectedGenre !== 'all' ? (
                  <p>
                    Found {mappedStories.length} {mappedStories.length === 1 ? 'tome' : 'tomes'}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                ) : (
                  <p>{allStories.length} {allStories.length === 1 ? 'story' : 'stories'} available</p>
                )}
              </div>
            </div>
          )}
        </header>

        {storiesLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className={typography.subsectionTitle}>Loading the library...</p>
          </motion.div>
        ) : !allStories || allStories.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className={`${typography.subsectionTitle} mb-4`}>
              The library is empty...
            </p>
            <p className={typography.bodySecondary}>
              No stories have been published yet
            </p>
          </motion.div>
        ) : mappedStories.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className={`${typography.subsectionTitle} mb-4`}>
              No stories found
            </p>
            <p className={`${typography.bodySecondary} mb-6`}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('all');
              }}
              className={buttons.secondary}
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <>
            {!torchActive && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 mb-8">
                <p className={typography.bodyPrimary}>
                  Move your cursor to light the torch and explore the collection...
                </p>
              </motion.div>
            )}

            <section>
              <StoryGrid
                stories={mappedStories}
                bookmarkedSlugs={bookmarks}
                onStoryClick={handleStoryClick}
                onBookmarkToggle={handleBookmarkToggle}
                currentUserId={currentUser?.uid}
              />
            </section>
          </>
        )}
      </div>
    </section>
  );
};

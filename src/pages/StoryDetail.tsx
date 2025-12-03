import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui";
import { CommentsSection } from "../components/CommentsSection";
import { useStoryInteractions } from "../hooks/useStoryInteractions";
import { useNavigation } from "../hooks/useNavigation";
import { useStories } from "../hooks/useStories";
import { useAuth } from "../contexts/AuthContext";
import { BackButton, NextButton, NavigationGroup } from "../components/shared/NavigationButtons";
import { typography, cards, badges, backgrounds } from "../utils/themeClasses";
import { MockCommentsDisplay } from "../components/MockCommentsDisplay";

export const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { goTo } = useNavigation();
  const { currentUser } = useAuth();
  const { getStoryBySlug, allStories, loading: storiesLoading } = useStories();
  const story = getStoryBySlug(slug || '');
  
  const {
    stats,
    commentsCount,
    statsLoading,
    userInteraction,
    interactionLoading,
    toggleLike,
    toggleBookmark,
  } = useStoryInteractions(slug || '');

  // Find next/previous stories in the same genre - MUST be called before any returns
  const { nextStory, previousStory, relatedStories } = useMemo(() => {
    if (!story) {
      return { nextStory: null, previousStory: null, relatedStories: [] };
    }
    
    const sameGenreStories = allStories.filter(s => s.genre === story.genre);
    const currentIndex = sameGenreStories.findIndex(s => s.slug === slug);
    
    const related = allStories
      .filter(s => s.slug !== slug && s.genre === story.genre)
      .slice(0, 3);
    
    return {
      nextStory: currentIndex < sameGenreStories.length - 1 ? sameGenreStories[currentIndex + 1] : null,
      previousStory: currentIndex > 0 ? sameGenreStories[currentIndex - 1] : null,
      relatedStories: related,
    };
  }, [allStories, story, slug]);

  // Only block on story content loading
  if (storiesLoading) {
    return (
      <section className={`relative min-h-screen ${backgrounds.page} px-6 py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className={typography.bodyPrimary}>Loading...</p>
        </div>
      </section>
    );
  }

  if (!story) {
    return (
      <section className={`relative min-h-screen ${backgrounds.page} px-6 py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={typography.subsectionTitle}>Story not found</h2>
          <Button onClick={() => goTo.stories()} className="mt-8">
            ← Back
          </Button>
        </div>
      </section>
    );
  }

  const handleLike = async () => {
    if (!currentUser) {
      goTo.login();
      return;
    }
    
    try {
      await toggleLike();
    } catch (error) {
      console.error('Error liking story:', error);
    }
  };

  const handleBookmark = async () => {
    if (!currentUser) {
      goTo.login();
      return;
    }

    try {
      const wasBookmarked = userInteraction.bookmarked;
      await toggleBookmark();
      
      // Sync with localStorage for Dollhouse integration
      const bookmarked = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
      const exists = bookmarked.find((s: any) => s.slug === story.slug);
      
      if (!wasBookmarked && !exists) {
        // Adding bookmark
        bookmarked.push({
          slug: story.slug,
          title: story.title,
          author: story.author,
          cover: story.cover,
          genre: story.genre,
          blurb: story.blurb,
        });
        localStorage.setItem('bookmarkedStories', JSON.stringify(bookmarked));
        window.dispatchEvent(new Event('storage'));
      } else if (wasBookmarked && exists) {
        // Removing bookmark
        const filtered = bookmarked.filter((s: any) => s.slug !== story.slug);
        localStorage.setItem('bookmarkedStories', JSON.stringify(filtered));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (error) {
      console.error('Error bookmarking story:', error);
    }
  };

  // Buttons are only disabled during interaction loading (for logged-in users)
  const buttonsDisabled = currentUser && interactionLoading;

  return (
    <section className={`relative min-h-screen ${backgrounds.page}`}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Navigation buttons */}
        <NavigationGroup position="between" className="mb-8">
          <BackButton onClick={() => goTo.stories()} variant="ghost" />
          <div className="flex items-center gap-4">
            {previousStory && (
              <BackButton 
                onClick={() => goTo.storyDetail(previousStory.slug)} 
                label={previousStory.title.length > 20 ? previousStory.title.substring(0, 20) + '...' : previousStory.title}
                variant="default"
                className="hidden sm:flex"
              />
            )}
            {nextStory && (
              <NextButton 
                onClick={() => goTo.storyDetail(nextStory.slug)} 
                label={nextStory.title.length > 20 ? nextStory.title.substring(0, 20) + '...' : nextStory.title}
                variant="default"
                className="hidden sm:flex"
              />
            )}
          </div>
        </NavigationGroup>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Cover and title */}
            <div className="mb-8 flex flex-col gap-8 sm:flex-row">
              {story.cover && (
                <div className="relative aspect-[2/3] w-full overflow-hidden sm:w-64 group">
                  {/* Book spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/90 via-zinc-900/70 to-transparent z-10" />
                  
                  {/* Cover image with gothic styling */}
                  <div className="relative h-full w-full overflow-hidden rounded-r-lg"
                    style={{
                      boxShadow: "-6px 0 16px rgba(0,0,0,0.8), 0 4px 24px rgba(0,0,0,0.7), inset -1px 0 4px rgba(0,0,0,0.5)"
                    }}
                  >
                    <img 
                      src={story.cover} 
                      alt={story.title}
                      className="h-full w-full object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Subtle page edges */}
                    <div className="absolute right-1 top-2 bottom-2 w-px bg-gradient-to-b from-amber-100/15 via-amber-50/8 to-amber-100/15" />
                    
                    {/* Subtle hover effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-b from-amber-900/10 to-transparent" />
                  </div>
                </div>
              )}

              <div className="flex-1">
                <h1 className={`mb-4 ${typography.pageTitle}`}>
                  {story.title}
                </h1>
                <p className={`mb-4 ${typography.bodySecondary} flex items-center gap-2`}>
                  <span className="text-amber-800/50 text-sm">by</span>
                  <span className="font-serif text-amber-200/80">{story.author}</span>
                </p>
                
                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className={badges.danger}>Horror</span>
                  <span className={badges.warning}>Moderate Scare</span>
                  <span className={badges.chains}>Mirrors</span>
                  <span className={badges.default}>Complete</span>
                </div>

                {/* Stats - Show immediately with loading placeholders */}
                <div className={`mb-6 flex flex-wrap gap-6 ${typography.bodySmall}`}>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-800/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{statsLoading ? '...' : `${stats.views.toLocaleString()} views`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-red-900/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{statsLoading ? '...' : `${stats.likes} likes`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-800/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>{statsLoading ? '...' : `${stats.bookmarks} bookmarks`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-800/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{statsLoading ? '...' : `${commentsCount} comments`}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => goTo.reader(slug!)}
                    className="flex-1 sm:flex-none"
                  >
                    Start Reading
                  </Button>
                  
                  {/* Edit button - only show for story author (not seed stories) */}
                  {currentUser && story.authorId === currentUser.uid && story.authorId !== '__SEED__' && (
                    <Button 
                      variant="secondary"
                      onClick={() => {
                        // Store edit intent in sessionStorage and navigate to library
                        sessionStorage.setItem('editStorySlug', story.slug);
                        goTo.stories();
                      }}
                      className="flex items-center gap-2"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit Story</span>
                    </Button>
                  )}
                  
                  <Button
                    variant="secondary"
                    onClick={handleBookmark}
                    disabled={buttonsDisabled || false}
                  >
                    <svg className="h-5 w-5" fill={userInteraction.bookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>{userInteraction.bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                  </Button>
                  
                  <Button 
                    variant={userInteraction.liked ? "danger" : "ghost"}
                    onClick={handleLike}
                    disabled={buttonsDisabled || false}
                  >
                    <svg className="h-5 w-5" fill={userInteraction.liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Button>
                  
                  <Button variant="ghost">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={`mb-8 ${cards.default} relative`}>
              {/* Subtle corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-amber-900/20" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-amber-900/20" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-amber-900/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-amber-900/20" />
              
              <h2 className="mb-4 font-serif text-xl text-zinc-300">About This Story</h2>
              <p className="leading-relaxed text-zinc-400">
                {story.blurb}
              </p>
            </div>

            {/* Chapters */}
            {Array.isArray(story.content) && (
              <div className="mb-8 p-6 rounded-lg border border-zinc-900/60 bg-zinc-950/80">
                <h2 className="mb-4 font-serif text-xl text-zinc-300">Chapters ({story.content.length})</h2>
                <div className="space-y-2">
                  {story.content.map((chapter, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo.reader(slug!)}
                      className="flex w-full items-center justify-between rounded border border-zinc-900/60 bg-black/40 px-4 py-3 text-left transition-all hover:border-amber-900/30 hover:bg-black/50"
                    >
                      <span className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                        Chapter {chapter.page}
                      </span>
                      <span className="text-xs text-zinc-600">~2 min read</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mock Comments Display */}
            <MockCommentsDisplay storyId={story.slug} />

            {/* Comments section */}
            <CommentsSection 
              storyId={story.slug} 
              onLoginRequired={() => goTo.login()}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author info */}
            <div className="p-6 rounded-lg border border-zinc-900/60 bg-zinc-950/80">
              <h3 className="mb-4 font-serif text-lg text-zinc-300">About the Author</h3>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 font-serif text-xl border border-amber-900/20">
                  {story.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-zinc-300">{story.author}</p>
                  <p className="text-xs text-zinc-600">Horror Author</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                Follow Author
              </Button>
            </div>

            {/* Related stories */}
            <div className="p-6 rounded-lg border border-zinc-900/60 bg-zinc-950/80">
              <h3 className="mb-4 font-serif text-lg text-zinc-300">More Like This</h3>
              <div className="space-y-4">
                {relatedStories.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => goTo.storyDetail(s.slug)}
                    className="group flex w-full gap-3 text-left transition-colors hover:bg-black/20 rounded p-2 -m-2"
                  >
                    {s.cover && (
                      <div className="relative">
                        <img 
                          src={s.cover} 
                          alt={s.title}
                          className="h-20 w-14 rounded-r object-cover opacity-65 transition-opacity group-hover:opacity-80"
                          style={{
                            boxShadow: "-2px 0 4px rgba(0,0,0,0.5)"
                          }}
                        />
                        {/* Mini book spine */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-r from-black/70 to-transparent" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="mb-1 text-sm font-medium text-zinc-400 transition-colors group-hover:text-zinc-300 line-clamp-2">
                        {s.title}
                      </p>
                      <p className="text-xs text-zinc-600">by {s.author}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

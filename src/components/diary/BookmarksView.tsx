import { memo } from 'react';
import { motion } from 'framer-motion';
import { DollhouseRoomHeader } from './shared/DollhouseRoomHeader';

interface BookmarksViewProps {
  bookmarkedStories: any[];
  onNavigateToRoom: (view: 'home') => void;
  onGoToStory: (slug: string) => void;
  onGoToStories: () => void;
  onRemoveBookmark: (slug: string) => void;
}

export const BookmarksView = memo<BookmarksViewProps>(({
  bookmarkedStories,
  onNavigateToRoom,
  onGoToStory,
  onGoToStories,
  onRemoveBookmark,
}) => {
  return (
    <section className="relative min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DollhouseRoomHeader
          title="Saved Books"
          subtitle="Your bookmarked stories"
          onBack={() => onNavigateToRoom('home')}
          theme="pink"
        />

        {bookmarkedStories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-zinc-400 text-xl font-serif mb-2">
              no saved books yet
            </p>
            <p className="text-zinc-600 text-sm font-serif mb-8">
              bookmark books from the library to save them here
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGoToStories}
              className="px-6 py-3 border border-[#ffb6d9]/40 rounded-lg 
                       text-[#ffb6d9] font-serif text-sm
                       hover:bg-[#ffb6d9]/10 transition-colors"
            >
              Browse Library
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedStories.map((story, index) => (
              <motion.article
                key={story.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onGoToStory(story.slug)}
                className="group relative cursor-pointer"
              >
                {/* Book card */}
                <div
                  className="relative aspect-[2/3] overflow-hidden rounded-r-lg shadow-2xl"
                  style={{
                    background: "linear-gradient(to right, #1a1410 0%, #2a2420 3%, #3a3430 5%, #2a2420 100%)",
                    boxShadow: `-8px 0 16px rgba(0,0,0,0.8), inset -2px 0 4px rgba(0,0,0,0.5)`,
                    borderRight: `2px solid #ffb6d9`,
                  }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-gradient-to-r from-black/60 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/85 via-black/80 to-zinc-950/85">
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveBookmark(story.slug);
                        }}
                        className="text-[#ffb6d9] hover:text-red-400 transition-colors"
                      >
                        🔖
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-0 border-4 border-amber-900/20 m-4 rounded" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <p className="text-lg text-zinc-200 font-serif mb-2">
                      {story.title}
                    </p>
                    <p className="text-sm text-zinc-500 font-serif mb-4">
                      by {story.author}
                    </p>
                    
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#ffb6d9]/50 to-transparent mb-4" />
                    
                    <p className="text-xs text-zinc-400 font-serif line-clamp-3 leading-relaxed px-4">
                      {story.blurb}
                    </p>
                    
                    <div className="mt-4 text-xs text-[#ffb6d9]/40 font-serif">
                      {story.genre}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

BookmarksView.displayName = 'BookmarksView';

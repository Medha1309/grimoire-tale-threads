import React, { useState, memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { Genre, getGenreAtmosphere } from "../../utils/genreAtmospheres";
import { typography } from "../../utils/themeClasses";

interface StoryCardProps {
  slug: string;
  title: string;
  author: string;
  authorId?: string;
  cover?: string;
  coverType?: 'image' | 'gif' | 'video';
  genre?: Genre;
  blurb?: string;
  reads?: number;
  rating?: number;
  onClick: () => void;
  onBookmarkToggle?: (slug: string) => void;
  isBookmarked?: boolean;
  index: number;
  showStats?: boolean; // Control whether to show stats on hover
}

export const StoryCard: React.FC<StoryCardProps> = memo(({
  slug,
  title,
  author,
  cover,
  coverType = 'image',
  genre = "horror",
  blurb = "A tale of darkness and mystery awaits...",
  reads = 0,
  rating = 0,
  onClick,
  onBookmarkToggle,
  isBookmarked = false,
  index,
  showStats = true,
}) => {
  const [showBlurb, setShowBlurb] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const atmosphere = useMemo(() => getGenreAtmosphere(genre), [genre]);
  const colors = useMemo(() => ({
    glow: atmosphere.colors.glow,
    border: atmosphere.colors.primary,
    shadow: `0 0 20px ${atmosphere.colors.glow}`,
  }), [atmosphere]);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  // Plain text card for stories without covers - OPTIMIZED
  if (!cover) {
    return (
      <motion.article
        ref={elementRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: Math.min(index * 0.03, 0.5) }}
        onClick={onClick}
        onMouseEnter={() => { setShowBlurb(true); setIsHovered(true); }}
        onMouseLeave={() => { setShowBlurb(false); setIsHovered(false); }}
        className="group relative cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
        style={{ perspective: "1000px" }}
      >
        {/* Genre glow effect - CSS only */}
        <div
          className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`,
          }}
        />

        <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 shadow-2xl"
          style={{
            borderColor: colors.border,
            background: "linear-gradient(135deg, #1a1410 0%, #2a2420 50%, #1a1410 100%)",
            boxShadow: colors.shadow,
          }}
        >
          {/* Bookmark button */}
          {onBookmarkToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle(slug);
              }}
              className="absolute top-3 right-3 z-30 px-2 py-1 rounded text-xs font-serif transition-all duration-200 hover:scale-110"
              style={{
                background: isBookmarked ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0, 0, 0, 0.6)',
                border: isBookmarked ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(120, 120, 120, 0.3)',
                color: isBookmarked ? '#d4af37' : '#999',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
              }}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this story'}
            >
              {isBookmarked ? 'Saved' : 'Save'}
            </button>
          )}
          {/* Simplified background effects - only on hover */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {genre === "horror" && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: "radial-gradient(circle at 50% 80%, rgba(255,140,0,0.2) 0%, transparent 40%)",
                    animationDuration: "3s",
                  }}
                />
              )}
              
              {genre === "mystery" && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(100,120,150,0.3) 0%, transparent 60%)",
                  }}
                />
              )}
              
              {genre === "thriller" && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(107,33,168,0.3) 0%, transparent 60%)",
                    animationDuration: "2s",
                  }}
                />
              )}

              {genre === "romance" && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.2) 0%, transparent 50%)",
                    animationDuration: "3s",
                  }}
                />
              )}
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 p-6 flex flex-col justify-center h-full">
            <h3 className={`${typography.cardTitle} mb-4 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]`}
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(139,69,19,0.5)",
              }}
            >
              {title}
            </h3>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-800/50 to-transparent mx-auto mb-4" />
            <p className={`${typography.bodySmall} tracking-widest text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}>
              {author}
            </p>
          </div>

          {/* Hover blurb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: showBlurb ? 1 : 0, scale: showBlurb ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none z-20"
            style={{
              background: "linear-gradient(to top, rgba(26, 20, 16, 0.98) 0%, rgba(26, 20, 16, 0.95) 60%, transparent 100%)",
            }}
          >
            <div
              className="p-4 rounded border border-amber-900/30"
              style={{
                background: "rgba(42, 36, 32, 0.9)",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
              }}
            >
              <p className="text-xs text-amber-100/80 leading-relaxed mb-3">{blurb}</p>
              {showStats && (
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 transition-all duration-300"
                    style={{
                      color: 'rgb(120, 53, 15)',
                      textShadow: isHovered ? '0 0 8px rgba(251, 146, 60, 0.6), 0 0 12px rgba(251, 146, 60, 0.4)' : 'none',
                    }}>
                    <span className={isHovered ? 'font-semibold' : ''}>{reads.toLocaleString()}</span> reads
                  </span>
                  <span className="flex items-center gap-1 transition-all duration-300"
                    style={{
                      color: 'rgb(120, 53, 15)',
                      textShadow: isHovered ? '0 0 8px rgba(251, 191, 36, 0.6), 0 0 12px rgba(251, 191, 36, 0.4)' : 'none',
                    }}>
                    <span className={isHovered ? 'font-semibold' : ''}>{rating > 0 ? rating.toFixed(1) : 'New'}</span> rating
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Simplified hover effect - CSS only */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`
            }}
          />
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      ref={elementRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: Math.min(index * 0.03, 0.5) }}
      onClick={onClick}
      onMouseEnter={() => { setShowBlurb(true); setIsHovered(true); }}
      onMouseLeave={() => { setShowBlurb(false); setIsHovered(false); }}
      className="group relative cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
      style={{ perspective: "1000px" }}
    >
      {/* Genre glow effect - CSS only */}
      <div
        className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Book container - removed animation */}
      <div
        className="relative aspect-[2/3] overflow-hidden rounded-r-lg shadow-2xl"
        style={{
          background: "linear-gradient(to right, #1a1410 0%, #2a2420 3%, #3a3430 5%, #2a2420 100%)",
          boxShadow: `-8px 0 16px rgba(0,0,0,0.8), inset -2px 0 4px rgba(0,0,0,0.5), ${colors.shadow}`,
          borderRight: `2px solid ${colors.border}`,
        }}
      >
        {/* Bookmark button */}
        {onBookmarkToggle && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmarkToggle(slug);
            }}
            className="absolute top-3 right-3 z-30 px-2 py-1 rounded text-xs font-serif transition-all duration-200 hover:scale-110"
            style={{
              background: isBookmarked ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0, 0, 0, 0.6)',
              border: isBookmarked ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(120, 120, 120, 0.3)',
              color: isBookmarked ? '#d4af37' : '#999',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
            }}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this story'}
          >
            {isBookmarked ? 'Saved' : 'Save'}
          </button>
        )}
        {/* Book spine */}
        <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-gradient-to-r from-black/60 to-transparent" />

        {/* Book Cover Media */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Cover media (image, GIF, or video) - all with subtle, consistent opacity */}
          {coverType === 'video' ? (
            <video
              ref={videoRef}
              src={cover}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: 0.5,
                filter: "grayscale(50%) contrast(1.1) brightness(0.7)",
                mixBlendMode: "overlay",
              }}
            />
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${cover})`,
                // GIFs and images more visible - capturing movement and atmosphere
                opacity: 0.5,
                filter: "grayscale(50%) contrast(1.1) brightness(0.7)",
                mixBlendMode: "overlay",
              }}
            />
          )}
          
          {/* Lighter overlay for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-black/35 to-zinc-950/45" />
          
          {/* Genre-specific eerie effects - always visible */}
          {genre === "horror" && (
            <>
              {/* Flickering candlelight */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 50% 85%, rgba(255,140,0,0.18) 0%, transparent 45%)",
                    "radial-gradient(circle at 50% 85%, rgba(255,140,0,0.25) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 85%, rgba(255,140,0,0.15) 0%, transparent 40%)",
                    "radial-gradient(circle at 50% 85%, rgba(255,140,0,0.22) 0%, transparent 48%)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Creeping shadow */}
              <motion.div
                className="absolute w-24 h-32 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
                  filter: "blur(12px)",
                }}
                animate={{
                  y: ["70%", "50%", "70%"],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}
          
          {genre === "mystery" && (
            <>
              {/* Rising fog */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(100,120,150,0.25) 0%, transparent 65%)",
                }}
                animate={{
                  y: ["10%", "0%", "10%"],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* Mysterious silhouette */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-28 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
                  clipPath: "polygon(40% 0%, 60% 0%, 70% 100%, 30% 100%)",
                }}
                animate={{
                  opacity: [0, 0.6, 0.6, 0],
                  scale: [0.9, 1, 1, 0.9],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </>
          )}
          
          {genre === "thriller" && (
            <>
              {/* Electric pulse */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 55%)",
                    "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.28) 0%, transparent 65%)",
                    "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 55%)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              {/* Lightning strike */}
              <motion.div
                className="absolute w-1 bg-purple-400/40 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ top: "0%", filter: "blur(2px)" }}
                animate={{
                  height: ["0%", "45%", "45%", "0%"],
                  opacity: [0, 0.7, 0.7, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              />
            </>
          )}

          {genre === "romance" && (
            <>
              {/* Warm glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.15) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.22) 0%, transparent 58%)",
                    "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.15) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              {/* Floating particles */}
              <motion.div
                className="absolute w-1 h-1 rounded-full bg-amber-400/30 left-1/3 pointer-events-none"
                style={{ top: "60%" }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="absolute w-1 h-1 rounded-full bg-amber-400/30 left-2/3 pointer-events-none"
                style={{ top: "70%" }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              />
            </>
          )}
          
          {/* Hover effect - brightens and reveals more of the GIF */}
          {isHovered && (
            <div 
              className="absolute inset-0 transition-opacity duration-400"
              style={{
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 70%)",
              }}
            />
          )}
        </div>

        {/* Ornate border */}
        <div className="absolute inset-0 border-4 border-amber-900/20 m-4 rounded" />

        {/* Title and author */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
          <h3
            className="font-serif text-xl leading-tight text-amber-100/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-all group-hover:text-amber-50/95"
            style={{
              textShadow: "2px 2px 6px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,0.8), 0 0 20px rgba(139,69,19,0.6)",
            }}
          >
            {title}
          </h3>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-amber-800/60 to-transparent" />
          <p className="mt-4 text-xs tracking-widest text-amber-200/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {author}
          </p>
        </div>

        {/* Hover blurb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: showBlurb ? 1 : 0, scale: showBlurb ? 1 : 0.95 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to top, rgba(26, 20, 16, 0.98) 0%, rgba(26, 20, 16, 0.95) 60%, transparent 100%)",
          }}
        >
          <div
            className="p-4 rounded border border-amber-900/30"
            style={{
              background: "rgba(42, 36, 32, 0.9)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
            }}
          >
            <p className="text-xs text-amber-100/80 leading-relaxed mb-3">{blurb}</p>
            {showStats && (
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 transition-all duration-300"
                  style={{
                    color: 'rgb(120, 53, 15)',
                    textShadow: isHovered ? '0 0 8px rgba(251, 146, 60, 0.6), 0 0 12px rgba(251, 146, 60, 0.4)' : 'none',
                  }}>
                  <span className={isHovered ? 'font-semibold' : ''}>{reads.toLocaleString()}</span> reads
                </span>
                <span className="flex items-center gap-1 transition-all duration-300"
                  style={{
                    color: 'rgb(120, 53, 15)',
                    textShadow: isHovered ? '0 0 8px rgba(251, 191, 36, 0.6), 0 0 12px rgba(251, 191, 36, 0.4)' : 'none',
                  }}>
                  <span className={isHovered ? 'font-semibold' : ''}>{rating > 0 ? rating.toFixed(1) : 'New'}</span> rating
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Simplified hover effect - CSS only */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`
          }}
        />

        {/* Page edges - static */}
        <div className="absolute right-0 top-2 bottom-2 w-1 bg-gradient-to-b from-amber-100/10 via-amber-50/5 to-amber-100/10 opacity-60" />
      </div>
    </motion.article>
  );
});

StoryCard.displayName = 'StoryCard';

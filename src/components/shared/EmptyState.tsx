import React from "react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "📭",
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {icon}
      </motion.div>

      <h3 className="text-xl font-serif text-zinc-300 mb-2">{title}</h3>

      {description && (
        <p className="text-zinc-500 text-sm max-w-md mb-6">{description}</p>
      )}

      {action && (
        <motion.button
          onClick={action.onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-red-900 text-zinc-100 rounded-lg font-serif text-sm tracking-wider hover:bg-red-800 transition-colors"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
};

// Preset empty states for common scenarios
export const EmptyStates = {
  NoStories: (onAction?: () => void) => (
    <EmptyState
      icon="📚"
      title="No Stories Yet"
      description="The library is empty. Start writing your first dark tale."
      action={onAction ? { label: "Write Story", onClick: onAction } : undefined}
    />
  ),

  NoPosts: (onAction?: () => void) => (
    <EmptyState
      icon="🕯️"
      title="No Discussions Yet"
      description="The tea room is quiet. Start a conversation about your favorite horror."
      action={onAction ? { label: "Create Thread", onClick: onAction } : undefined}
    />
  ),

  NoDiaryEntries: (onAction?: () => void) => (
    <EmptyState
      icon="📖"
      title="No Entries Yet"
      description="Your diary awaits. Pour your thoughts into the darkness."
      action={onAction ? { label: "Write Entry", onClick: onAction } : undefined}
    />
  ),

  NoScrapbook: (onAction?: () => void) => (
    <EmptyState
      icon="📸"
      title="No Memories Yet"
      description="Capture moments and preserve them in your scrapbook."
      action={onAction ? { label: "Add Memory", onClick: onAction } : undefined}
    />
  ),

  NoBookmarks: () => (
    <EmptyState
      icon="🔖"
      title="No Bookmarks"
      description="You haven't bookmarked any stories yet. Explore the library to find tales worth saving."
    />
  ),

  NoSearchResults: () => (
    <EmptyState
      icon="🔍"
      title="No Results Found"
      description="Try adjusting your search or filters to find what you're looking for."
    />
  ),

  NoComments: (onAction?: () => void) => (
    <EmptyState
      icon="💬"
      title="No Comments Yet"
      description="Be the first to share your thoughts on this story."
      action={onAction ? { label: "Add Comment", onClick: onAction } : undefined}
    />
  ),
};

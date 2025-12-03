import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useNavigation } from "../hooks/useNavigation";
import { useStories } from "../hooks/useStories";
import { useSavedQuotes } from "../hooks/useSavedQuotes";
import { LinearReader } from "../components/reader/LinearReader";

export const Reader: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { goTo } = useNavigation();
  const { getStoryBySlug } = useStories();
  const story = getStoryBySlug(slug || '');
  const { saveQuote } = useSavedQuotes();

  // Convert story content to single string
  const storyBody = useMemo(() => {
    if (!story) return '';
    if (typeof story.content === 'string') return story.content;
    if (Array.isArray(story.content)) {
      return story.content.map((chapter, idx) => {
        const chapterNum = chapter.page || idx + 1;
        return `CHAPTER ${chapterNum}\n\n${chapter.text}`;
      }).join('\n\n\n');
    }
    return '';
  }, [story]);

  const handleSaveQuote = async (quote: { id: string; text: string; timestamp: string }) => {
    if (!story) return;
    await saveQuote(
      quote.text,
      slug || '',
      story.title,
      story.author,
      { notes: '' }
    );
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-mono text-lg text-slate-400 mb-4">Story not found</h2>
          <button 
            onClick={() => goTo.stories()} 
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-slate-300 hover:border-slate-500 transition-colors"
          >
            ← Return to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <LinearReader
      title={story.title}
      author={story.author}
      body={storyBody}
      genre={story.genre}
      onSaveQuote={handleSaveQuote}
      onBack={() => goTo.storyDetail(slug!)}
    />
  );
};

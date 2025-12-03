import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAdminActions } from '../../hooks/useAdminActions';
import { Button } from '../../components/ui';

export const ContentModerationTab: React.FC<{ adminActions: ReturnType<typeof useAdminActions> }> = ({ adminActions }) => {
  const [contentType, setContentType] = useState<'forum_posts' | 'diary_entries' | 'userStories'>('forum_posts');
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadContent();
  }, [contentType]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, contentType),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContent(items);
    } catch (error) {
      console.error('Error loading content:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (contentId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this content?');
    if (!confirmed) return;

    const reason = prompt('Reason for deletion:');
    if (!reason) return;

    const typeMap: Record<string, any> = {
      forum_posts: 'forum_post',
      diary_entries: 'diary_entry',
      userStories: 'story',
    };

    const result = await adminActions.deleteContent(typeMap[contentType], contentId, reason);
    if (result.success) {
      alert(result.message);
      loadContent();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Type Selector */}
      <div className="flex gap-3">
        {[
          { id: 'forum_posts', label: 'Forum Posts' },
          { id: 'diary_entries', label: 'Diary Entries' },
          { id: 'userStories', label: 'Stories' },
        ].map(type => (
          <button
            key={type.id}
            onClick={() => setContentType(type.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-serif transition-colors ${
              contentType === type.id
                ? 'bg-red-900/30 text-red-400 border border-red-900/50'
                : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Content List */}
      {loading ? (
        <div className="text-center text-zinc-500 py-12">Loading content...</div>
      ) : content.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <p className="text-zinc-500">No content found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {content.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg text-zinc-300 mb-2">
                    {item.title || 'Untitled'}
                  </h3>
                  <p className="text-sm text-zinc-500 line-clamp-2 mb-3">
                    {item.content || item.description || 'No content'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-zinc-600">
                    <span>ID: {item.id}</span>
                    <span>Author: {item.authorId || item.userId}</span>
                    <span>
                      Created: {item.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="ghost"
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

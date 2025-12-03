/**
 * SharedEditor - Simple collaborative text editor
 */

import React, { useEffect, useRef } from 'react';
import { useSharedDocument } from '../../hooks/useSharedDocument';
import { parlourColors } from '../../design-system/parlour-tokens';

interface SharedEditorProps {
  sessionId: string;
}

export const SharedEditor: React.FC<SharedEditorProps> = ({ sessionId }) => {
  const { content, loading, lastEditedBy, updateDocument } = useSharedDocument(sessionId);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [localContent, setLocalContent] = React.useState(content);

  // Sync remote content to local
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    updateDocument(newContent);
  };

  const wordCount = localContent.trim().split(/\s+/).filter(Boolean).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-zinc-500 font-serif text-sm">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: parlourColors.neutral[800] }}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-600 font-serif">Collaborative Writing</span>
          {lastEditedBy && (
            <span className="text-xs text-zinc-500 font-serif">
              Last edited by {lastEditedBy}
            </span>
          )}
        </div>
        <div className="text-xs text-zinc-600 font-serif">{wordCount} words</div>
      </div>

      {/* Editor */}
      <textarea
        ref={textareaRef}
        value={localContent}
        onChange={handleChange}
        placeholder="Start writing together..."
        className="flex-1 p-6 bg-transparent text-zinc-100 font-serif resize-none focus:outline-none"
        style={{
          fontSize: '16px',
          lineHeight: '1.8',
        }}
      />
    </div>
  );
};

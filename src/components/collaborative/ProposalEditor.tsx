import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../shared/Button';
import { Modal } from '../shared/Modal';
import { useProposalActions } from '../../hooks/useProposalActions';
import { ProposalType } from '../../types/collaborativeStory';
import { calculateDiff, getDiffSummary } from '../../utils/diffEngine';

// Simple rich text editor icons
const Bold = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
  </svg>
);

const Italic = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4l4 16m-4-8h8" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

interface ProposalEditorProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  originalText: string;
  targetSection?: string;
  initialType?: ProposalType;
}

const PROPOSAL_TYPES: Array<{ value: ProposalType; label: string; description: string }> = [
  {
    value: 'minor_edit',
    label: 'Minor Edit',
    description: 'Small corrections, typos, or style improvements',
  },
  {
    value: 'major_edit',
    label: 'Major Edit',
    description: 'Significant changes to existing content',
  },
  {
    value: 'new_chapter',
    label: 'New Chapter',
    description: 'Add a new chapter or section',
  },
  {
    value: 'character_change',
    label: 'Character Change',
    description: 'Modify character development or dialogue',
  },
  {
    value: 'plot_change',
    label: 'Plot Change',
    description: 'Alter story direction or major plot points',
  },
];

export const ProposalEditor: React.FC<ProposalEditorProps> = ({
  isOpen,
  onClose,
  projectId,
  originalText,
  targetSection,
  initialType = 'minor_edit',
}) => {
  const { createProposal, loading } = useProposalActions();
  const editorRef = useRef<HTMLTextAreaElement>(null);
  
  const [type, setType] = useState<ProposalType>(initialType);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [proposedText, setProposedText] = useState(originalText);
  const [showPreview, setShowPreview] = useState(false);
  const [diffSummary, setDiffSummary] = useState('');

  // Update diff summary when text changes
  useEffect(() => {
    if (proposedText !== originalText) {
      const diff = calculateDiff(originalText, proposedText);
      setDiffSummary(getDiffSummary(diff));
    } else {
      setDiffSummary('No changes');
    }
  }, [originalText, proposedText]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setProposedText(originalText);
      setTitle('');
      setDescription('');
      setType(initialType);
      setShowPreview(false);
    }
  }, [isOpen, originalText, initialType]);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      return;
    }

    try {
      await createProposal(
        projectId,
        type,
        title.trim(),
        description.trim(),
        proposedText,
        targetSection
      );
      onClose();
    } catch (error) {
      // Error is handled by useProposalActions
      console.error('Failed to create proposal:', error);
    }
  };

  const applyFormatting = (format: 'bold' | 'italic') => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = proposedText.substring(start, end);

    if (!selectedText) return;

    let formattedText = '';
    if (format === 'bold') {
      formattedText = `**${selectedText}**`;
    } else if (format === 'italic') {
      formattedText = `*${selectedText}*`;
    }

    const newText =
      proposedText.substring(0, start) +
      formattedText +
      proposedText.substring(end);

    setProposedText(newText);

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formattedText.length);
    }, 0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Proposal"
      size="xl"
    >
      <div className="space-y-6">
        {/* Proposal Type Selection */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-2">
            Proposal Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROPOSAL_TYPES.map((proposalType) => (
              <button
                key={proposalType.value}
                onClick={() => setType(proposalType.value)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  type === proposalType.value
                    ? 'border-lime-500 bg-lime-500/10'
                    : 'border-stone-700 bg-stone-800/50 hover:border-stone-600'
                }`}
              >
                <div className="font-semibold text-stone-200">
                  {proposalType.label}
                </div>
                <div className="text-xs text-stone-400 mt-1">
                  {proposalType.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief summary of your proposal"
            className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the reasoning behind your proposed changes"
            rows={3}
            className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none"
          />
        </div>

        {/* Editor Toolbar */}
        <div className="flex items-center justify-between border-b border-stone-700 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => applyFormatting('bold')}
              className="p-2 rounded hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
              title="Bold"
            >
              <Bold className="w-5 h-5" />
            </button>
            <button
              onClick={() => applyFormatting('italic')}
              className="p-2 rounded hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
              title="Italic"
            >
              <Italic className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-400">{diffSummary}</span>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-3 py-1 rounded bg-stone-700 hover:bg-stone-600 text-stone-200 text-sm transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
        </div>

        {/* Text Editor / Preview */}
        <div className="min-h-[300px]">
          {showPreview ? (
            <div className="prose prose-invert max-w-none p-4 bg-stone-800/50 rounded-lg border border-stone-700">
              <div className="whitespace-pre-wrap">{proposedText}</div>
            </div>
          ) : (
            <textarea
              ref={editorRef}
              value={proposedText}
              onChange={(e) => setProposedText(e.target.value)}
              className="w-full h-[300px] px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none font-mono text-sm"
              placeholder="Enter your proposed text..."
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-stone-700">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading || !title.trim() || !description.trim()}
          >
            {loading ? 'Creating...' : 'Create Proposal'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

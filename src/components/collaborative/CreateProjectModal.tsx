/**
 * CreateProjectModal - Modal for creating a new collaborative project
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProjectActions } from '../../hooks/useProjectActions';
import { useUserStories } from '../../hooks/useUserStories';
import { Button } from '../shared/Button';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { createProject, loading } = useProjectActions();
  const { stories, loading: storiesLoading } = useUserStories();

  const [selectedStoryId, setSelectedStoryId] = useState('');
  const [maxCoAuthors, setMaxCoAuthors] = useState(5);
  const [requireApproval, setRequireApproval] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStoryId) {
      return;
    }

    try {
      const selectedStory = stories.find((s) => s.id === selectedStoryId);
      if (!selectedStory) return;

      const projectId = await createProject(
        selectedStoryId,
        selectedStory.title,
        selectedStory.genre || 'General',
        {
          maxCoAuthors,
          requireApproval,
        }
      );

      onClose();
      navigate(`/chains/project/${projectId}`);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleClose = () => {
    setSelectedStoryId('');
    setMaxCoAuthors(5);
    setRequireApproval(true);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                  Create Collaborative Project
                </h2>
                <p className="text-sm text-zinc-400">
                  Enable version control and collaboration on one of your stories
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Select Story */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Select Story *
                  </label>
                  {storiesLoading ? (
                    <p className="text-sm text-zinc-500">Loading your stories...</p>
                  ) : stories.length === 0 ? (
                    <div className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
                      <p className="text-sm text-zinc-400 mb-3">
                        You need to create a story first
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          handleClose();
                          navigate('/library');
                        }}
                      >
                        Go to Library
                      </Button>
                    </div>
                  ) : (
                    <select
                      value={selectedStoryId}
                      onChange={(e) => setSelectedStoryId(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-600"
                    >
                      <option value="">Choose a story...</option>
                      {stories.map((story) => (
                        <option key={story.id} value={story.id}>
                          {story.title} {story.genre && `(${story.genre})`}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-xs text-zinc-500 mt-2">
                    The story will remain in your Library and be linked to this project
                  </p>
                </div>

                {/* Max Co-Authors */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Maximum Co-Authors: {maxCoAuthors}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={maxCoAuthors}
                    onChange={(e) => setMaxCoAuthors(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <p className="text-xs text-zinc-500 mt-2">
                    How many writers can collaborate on this project
                  </p>
                </div>

                {/* Require Approval */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requireApproval}
                      onChange={(e) => setRequireApproval(e.target.checked)}
                      className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-zinc-300">
                        Require approval for changes
                      </span>
                      <p className="text-xs text-zinc-500">
                        All proposals must be reviewed before merging
                      </p>
                    </div>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                  <Button variant="ghost" onClick={handleClose} disabled={loading}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading || !selectedStoryId}
                  >
                    {loading ? 'Creating...' : 'Create Project'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
